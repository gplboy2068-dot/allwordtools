import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import fs from "node:fs";
import path from "node:path";
import { allTools, categories } from "@/data/tools";
import { toolContent } from "@/data/tool-content";
import { getLocale } from "@/i18n/locales";
import type { LocalizedToolContent } from "@/i18n/content";

const MODEL = "deepseek-chat";
const GATEWAY = "https://api.deepseek.com/chat/completions";

async function callAi(
  messages: { role: string; content: string }[],
  customApiKey?: string,
  json = true,
) {
  const apiKey = customApiKey || process.env.DEEPSEEK_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "AI API Key is missing. Please provide an API key in the admin panel or configure DEEPSEEK_API_KEY in environment variables.",
    );
  }

  const res = await fetch(GATEWAY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      ...(json ? { response_format: { type: "json_object" } } : {}),
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`AI API error (${res.status}): ${errorText}`);
  }

  const result = await res.json();
  return result.choices?.[0]?.message?.content || "";
}

function getLocaleJsonPath(locale: string): string {
  return path.resolve(process.cwd(), "src/i18n/content/tools", `${locale.toLowerCase()}.json`);
}

function readLocaleJson(locale: string): Record<string, LocalizedToolContent> {
  const p = getLocaleJsonPath(locale);
  if (!fs.existsSync(p)) return {};
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    return {};
  }
}

function writeLocaleJson(locale: string, data: Record<string, LocalizedToolContent>) {
  const p = getLocaleJsonPath(locale);
  const dir = path.dirname(p);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data, null, 2), "utf8");
}

/* ------------------ 1. Get Translation Coverage ------------------ */

export interface CategoryCoverage {
  categorySlug: string;
  categoryTitle: string;
  totalTools: number;
  translatedCount: number;
  percent: number;
  tools: {
    slug: string;
    name: string;
    isTranslated: boolean;
  }[];
}

export interface LocaleCoverage {
  locale: string;
  localeName: string;
  totalTools: number;
  translatedTools: number;
  overallPercent: number;
  categories: CategoryCoverage[];
}

export const getTranslationStats = createServerFn({ method: "GET" })
  .validator((data: unknown) => z.object({ locale: z.string().default("hi") }).parse(data))
  .handler(async ({ data }): Promise<LocaleCoverage> => {
    const locale = data.locale.toLowerCase();
    const cfg = getLocale(locale);
    const localeName = cfg?.nativeName || cfg?.name || locale;
    const existing = readLocaleJson(locale);

    let totalToolsCount = 0;
    let translatedToolsCount = 0;

    const categoryCoverages: CategoryCoverage[] = categories.map((cat) => {
      const toolList = cat.tools.map((t) => {
        const isTranslated = Boolean(existing[t.slug]?.metaTitle || existing[t.slug]?.heading);
        return {
          slug: t.slug,
          name: t.name,
          isTranslated,
        };
      });

      const translatedCount = toolList.filter((t) => t.isTranslated).length;
      totalToolsCount += cat.tools.length;
      translatedToolsCount += translatedCount;

      return {
        categorySlug: cat.slug,
        categoryTitle: cat.title,
        totalTools: cat.tools.length,
        translatedCount,
        percent: Math.round((translatedCount / cat.tools.length) * 100),
        tools: toolList,
      };
    });

    return {
      locale,
      localeName,
      totalTools: totalToolsCount,
      translatedTools: translatedToolsCount,
      overallPercent: totalToolsCount > 0 ? Math.round((translatedToolsCount / totalToolsCount) * 100) : 0,
      categories: categoryCoverages,
    };
  });

/* ------------------ 2. Translate Single Tool with AI ------------------ */

export const translateToolWithAi = createServerFn({ method: "POST" })
  .validator((data: unknown) =>
    z
      .object({
        slug: z.string(),
        targetLocale: z.string(),
        apiKey: z.string().optional(),
        customPrompt: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<{ success: boolean; data: LocalizedToolContent }> => {
    const tool = allTools.find((t) => t.slug === data.slug);
    if (!tool) throw new Error(`Tool with slug "${data.slug}" not found.`);

    const sourceContent = toolContent[data.slug];
    const targetCfg = getLocale(data.targetLocale);
    const targetLangName = targetCfg ? `${targetCfg.name} (${targetCfg.nativeName})` : data.targetLocale;

    const systemPrompt = `You are a professional multilingual SEO copywriter and localization expert for AllWordTools.com.
Translate and localize the following word game / English language tool into ${targetLangName}.

STRICT RULES:
1. Return ONLY a valid JSON object matching the requested schema.
2. "metaTitle" MUST be concise, compelling, and STRICTLY LESS THAN 58 CHARACTERS (e.g. "[Local Name] — [Short Benefit] | AllWordTools").
3. "metaDescription" must be a natural, compelling summary (120-150 chars).
4. Localize examples so they make sense for native speakers of ${targetLangName}.
5. Translate all FAQs and How-To steps clearly with high readability.

Expected JSON Shape:
{
  "name": string,              // Localized tool name
  "metaTitle": string,         // Under 58 chars title
  "metaDescription": string,   // SEO description
  "eyebrow": string,           // Category badge
  "heading": string,           // Main page H1
  "subheading": string,        // Subtitle under H1
  "intro": string[],           // 2-3 detailed paragraphs
  "howToTitle": string,        // "How to use..."
  "howToSteps": [
    { "title": string, "detail": string }
  ],
  "sections": [
    { "heading": string, "paragraphs": string[] }
  ],
  "examples": [
    { "input": string, "output": string, "note": string }
  ],
  "tips": string[],
  "faqs": [
    { "question": string, "answer": string }
  ],
  "searchIntent": string,
  "keywords": string[]
}`;

    const userPrompt = `Source Tool Info:
- Slug: ${tool.slug}
- English Name: ${tool.name}
- English Description: ${tool.description}
${
  sourceContent
    ? `
- English Heading: ${sourceContent.heading}
- English Subheading: ${sourceContent.subheading}
- English Intro: ${JSON.stringify(sourceContent.intro)}
- English How-To Steps: ${JSON.stringify(sourceContent.howToSteps)}
- English Examples: ${JSON.stringify(sourceContent.examples)}
- English FAQs: ${JSON.stringify(sourceContent.faqs)}
- English Tips: ${JSON.stringify(sourceContent.tips)}
`
    : ""
}

${data.customPrompt ? `Additional Instructions: ${data.customPrompt}` : ""}`;

    const rawResponse = await callAi(
      [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      data.apiKey,
      true,
    );

    let parsed: LocalizedToolContent;
    try {
      parsed = JSON.parse(rawResponse);
    } catch {
      throw new Error("Failed to parse AI response as JSON. Please try again.");
    }

    // Ensure metaTitle <= 60 chars safeguard
    if (parsed.metaTitle && parsed.metaTitle.length > 60) {
      parsed.metaTitle = parsed.metaTitle.slice(0, 57) + "...";
    }

    // Persist to file
    const existing = readLocaleJson(data.targetLocale);
    existing[data.slug] = parsed;
    writeLocaleJson(data.targetLocale, existing);

    return { success: true, data: parsed };
  });

/* ------------------ 3. Save Manual Tool Translation ------------------ */

export const saveToolTranslation = createServerFn({ method: "POST" })
  .validator((data: unknown) =>
    z
      .object({
        slug: z.string(),
        targetLocale: z.string(),
        content: z.record(z.any()),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<{ success: boolean }> => {
    const existing = readLocaleJson(data.targetLocale);
    existing[data.slug] = data.content as LocalizedToolContent;
    writeLocaleJson(data.targetLocale, existing);
    return { success: true };
  });

/* ------------------ 4. Translate Category with AI (Batch) ------------------ */

export const translateCategoryWithAi = createServerFn({ method: "POST" })
  .validator((data: unknown) =>
    z
      .object({
        categorySlug: z.string(),
        targetLocale: z.string(),
        apiKey: z.string().optional(),
      })
      .parse(data),
  )
  .handler(
    async ({
      data,
    }): Promise<{
      success: boolean;
      translatedCount: number;
      failedSlugs: string[];
    }> => {
      const category = categories.find((c) => c.slug === data.categorySlug);
      if (!category) throw new Error(`Category "${data.categorySlug}" not found.`);

      const failedSlugs: string[] = [];
      let translatedCount = 0;

      for (const tool of category.tools) {
        try {
          await translateToolWithAi({
            data: {
              slug: tool.slug,
              targetLocale: data.targetLocale,
              apiKey: data.apiKey,
            },
          });
          translatedCount++;
        } catch (err) {
          console.error(`Failed translating tool ${tool.slug}:`, err);
          failedSlugs.push(tool.slug);
        }
      }

      return {
        success: translatedCount > 0,
        translatedCount,
        failedSlugs,
      };
    },
  );
