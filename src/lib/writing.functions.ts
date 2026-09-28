import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getAiApiKey } from "./ai-config";

/**
 * AI-powered writing assistant used by the Grammar & Style tools:
 * Passive Voice Checker, Active Voice Converter, Grammar Checker,
 * Spell Checker and Punctuation Checker. A single server function runs the
 * task-specific prompt through the DeepSeek API and returns a
 * consistent, structured result the UI can render for every tool.
 */

export const WRITING_TASKS = [
  "passive-voice-checker",
  "active-voice-converter",
  "grammar-checker",
  "spell-checker",
  "punctuation-checker",
] as const;

export type WritingTask = (typeof WRITING_TASKS)[number];

export type WritingIssue = {
  original: string;
  suggestion: string;
  explanation: string;
};

export type WritingResult = {
  corrected: string;
  summary: string;
  issues: WritingIssue[];
};

const InputSchema = z.object({
  text: z.string().min(1).max(8000),
  task: z.enum(WRITING_TASKS),
});

const TASK_PROMPTS: Record<WritingTask, string> = {
  "passive-voice-checker":
    "You are a passive voice checker. Find every sentence written in the passive voice. In `corrected`, return the full text rewritten so all passive sentences become active voice, leaving everything else untouched. In `issues`, list each passive construction: `original` is the passive sentence or clause, `suggestion` is the active-voice rewrite, and `explanation` briefly says why it is passive.",
  "active-voice-converter":
    "You are an active voice converter. Rewrite the text so every sentence uses clear, direct active voice while preserving the original meaning and tone. In `corrected`, return the fully rewritten active-voice text. In `issues`, list each sentence you changed: `original` is the passive/weak sentence, `suggestion` is the active rewrite, and `explanation` says what changed.",
  "grammar-checker":
    "You are an expert grammar checker. Correct grammar, verb tense, subject-verb agreement, articles, word choice and clarity issues. In `corrected`, return the fully corrected text. In `issues`, list each mistake: `original` is the incorrect phrase, `suggestion` is the fix, and `explanation` names the grammar rule involved.",
  "spell-checker":
    "You are a spell checker. Find only misspelled words (do not change grammar or style). In `corrected`, return the text with every misspelling fixed and nothing else changed. In `issues`, list each misspelling: `original` is the misspelled word, `suggestion` is the correct spelling, and `explanation` is a short note.",
  "punctuation-checker":
    "You are a punctuation checker. Fix punctuation only — commas, periods, apostrophes, quotation marks, hyphens, semicolons, capitalization of sentence starts — without rewording. In `corrected`, return the text with corrected punctuation. In `issues`, list each fix: `original` is the phrase with the punctuation problem, `suggestion` is the corrected phrase, and `explanation` says what punctuation rule applies.",
};

function normalize(raw: unknown, fallbackText: string): WritingResult {
  const obj = (raw ?? {}) as Record<string, unknown>;
  const corrected =
    typeof obj.corrected === "string" && obj.corrected.trim().length > 0
      ? obj.corrected
      : fallbackText;
  const summary = typeof obj.summary === "string" ? obj.summary : "";
  const issuesRaw = Array.isArray(obj.issues) ? obj.issues : [];
  const issues: WritingIssue[] = issuesRaw
    .map((i) => {
      const item = (i ?? {}) as Record<string, unknown>;
      return {
        original: typeof item.original === "string" ? item.original : "",
        suggestion: typeof item.suggestion === "string" ? item.suggestion : "",
        explanation: typeof item.explanation === "string" ? item.explanation : "",
      };
    })
    .filter((i) => i.original || i.suggestion);
  return { corrected, summary, issues };
}

export const analyzeWriting = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }): Promise<WritingResult> => {
    const apiKey = getAiApiKey();
    if (!apiKey) {
      throw new Error(
        "AI is not configured for this project. Please set DEEPSEEK_API_KEY in your Cloudflare environment variables or local .env file."
      );
    }

    const system = `${TASK_PROMPTS[data.task]}

Always respond with a single JSON object of this exact shape:
{
  "corrected": string,   // the full corrected/rewritten text
  "summary": string,     // one short sentence summarising the result
  "issues": [            // may be empty if nothing needed changing
    { "original": string, "suggestion": string, "explanation": string }
  ]
}
Do not include anything outside the JSON object. If the text needs no changes, set "corrected" to the original text and "issues" to [].`;

    const res = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: system },
          { role: "user", content: data.text },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (res.status === 429)
      throw new Error("The AI is busy right now — please try again in a moment.");
    if (res.status === 402)
      throw new Error("AI credits have run out. Please add credits to continue.");
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`AI request failed (${res.status}). ${body.slice(0, 200)}`);
    }

    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = json.choices?.[0]?.message?.content ?? "{}";
    let parsed: unknown;
    try {
      parsed = JSON.parse(content);
    } catch {
      parsed = {};
    }
    return normalize(parsed, data.text);
  });
