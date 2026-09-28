/**
 * Programmatic Content Quality & Thin/Duplicate Text Audit Engine
 * Evaluates text originality, word counts, boilerplate repetition,
 * and localized content quality across all 92 tools and 13 categories.
 */

import { allTools, categories } from "../src/data/tools";
import { toolContent } from "../src/data/tool-content";
import { categoryContent } from "../src/data/category-content";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("=======================================================================");
console.log(" 📝 PROGRAMMATIC CONTENT QUALITY & THIN/DUPLICATE TEXT AUDIT");
console.log("=======================================================================\n");

// -----------------------------------------------------------------------------
// 1. TOOL PAGE WORD COUNT & DEPTH ANALYSIS
// -----------------------------------------------------------------------------
console.log("1. TOOL PAGE WORD COUNT & CONTENT DEPTH");

interface ToolStat {
  slug: string;
  wordCount: number;
  introWords: number;
  sectionsCount: number;
  faqCount: number;
  stepsCount: number;
}

const toolStats: ToolStat[] = [];
const sentenceFreq = new Map<string, number>();

for (const tool of allTools) {
  const content = toolContent[tool.slug];
  if (!content) {
    toolStats.push({ slug: tool.slug, wordCount: 0, introWords: 0, sectionsCount: 0, faqCount: 0, stepsCount: 0 });
    continue;
  }

  const introText = (content.intro || []).join(" ");
  const sectionsText = (content.sections || []).flatMap(s => [s.heading, ...s.paragraphs]).join(" ");
  const faqText = (content.faqs || []).flatMap(f => [f.question, f.answer]).join(" ");
  const stepsText = (content.howToSteps || []).flatMap(s => [s.title, s.detail]).join(" ");

  const allText = [content.heading, content.subheading, introText, sectionsText, faqText, stepsText].join(" ");
  const words = allText.split(/\s+/).filter(Boolean);

  // Track full sentences for boilerplate detection
  const sentences = allText.split(/[.!?]+/).map(s => s.trim().toLowerCase()).filter(s => s.length > 25);
  for (const s of sentences) {
    sentenceFreq.set(s, (sentenceFreq.get(s) || 0) + 1);
  }

  toolStats.push({
    slug: tool.slug,
    wordCount: words.length,
    introWords: introText.split(/\s+/).filter(Boolean).length,
    sectionsCount: content.sections?.length || 0,
    faqCount: content.faqs?.length || 0,
    stepsCount: content.howToSteps?.length || 0,
  });
}

const sortedByWords = [...toolStats].sort((a, b) => a.wordCount - b.wordCount);
const avgWords = Math.round(toolStats.reduce((sum, s) => sum + s.wordCount, 0) / toolStats.length);
const thinTools = toolStats.filter(s => s.wordCount < 400);

console.log(`  • Total tools analyzed: ${toolStats.length}`);
console.log(`  • Average word count per tool: ${avgWords} words`);
console.log(`  • Lowest word count: ${sortedByWords[0].slug} (${sortedByWords[0].wordCount} words)`);
console.log(`  • Highest word count: ${sortedByWords[sortedByWords.length - 1].slug} (${sortedByWords[sortedByWords.length - 1].wordCount} words)`);

if (thinTools.length === 0) {
  console.log(`  ✅ [PASS] Zero thin content tools: 100% of tools have >= 400 words`);
} else {
  console.log(`  ⚠️  [WARN] ${thinTools.length} tools have < 400 words:`, thinTools.map(t => `${t.slug} (${t.wordCount})`));
}

console.log();

// -----------------------------------------------------------------------------
// 2. REPETITIVE BOILERPLATE & DUPLICATION ACROSS TOOLS
// -----------------------------------------------------------------------------
console.log("2. REPETITIVE BOILERPLATE & CROSS-PAGE PHRASE DUPLICATION");

const repetitiveSentences = Array.from(sentenceFreq.entries())
  .filter(([_, count]) => count >= 5)
  .sort((a, b) => b[1] - a[1]);

console.log(`  • Sentences repeated across 5 or more tools: ${repetitiveSentences.length}`);
if (repetitiveSentences.length > 0) {
  console.log("  ⚠️  Top repetitive boilerplate sentences identified:");
  for (const [sent, count] of repetitiveSentences.slice(0, 8)) {
    console.log(`     ↳ Repeated in ${count} tools: "${sent.slice(0, 80)}..."`);
  }
} else {
  console.log("  ✅ [PASS] No widespread sentence-level duplication detected");
}

console.log();

// -----------------------------------------------------------------------------
// 3. CATEGORY HUB CONTENT QUALITY & DUPLICATION
// -----------------------------------------------------------------------------
console.log("3. CATEGORY HUB CONTENT QUALITY & LOCALE TEMPLATE DUPLICATION");

const categoryStats = categories.map(cat => {
  const content = categoryContent[cat.slug];
  if (!content) return { slug: cat.slug, words: 0, faqs: 0, tips: 0 };
  const allText = [
    content.heading,
    content.subheading,
    ...(content.intro || []),
    ...(content.sections || []).flatMap(s => [s.heading, ...s.paragraphs]),
    ...(content.tips || []),
    ...(content.faqs || []).flatMap(f => [f.question, f.answer])
  ].join(" ");
  return {
    slug: cat.slug,
    words: allText.split(/\s+/).filter(Boolean).length,
    faqs: content.faqs?.length || 0,
    tips: content.tips?.length || 0,
  };
});

const avgCatWords = Math.round(categoryStats.reduce((sum, c) => sum + c.words, 0) / categoryStats.length);
console.log(`  • Total category hubs: ${categories.length}`);
console.log(`  • Average words per English category: ${avgCatWords} words`);
for (const cat of categoryStats) {
  console.log(`     ↳ /category/${cat.slug.padEnd(20)}: ${cat.words} words | ${cat.faqs} FAQs | ${cat.tips} Tips`);
}

// Check category-content.ts localized templates
const locCatPath = path.resolve(__dirname, "../src/i18n/category-content.ts");
if (fs.existsSync(locCatPath)) {
  const raw = fs.readFileSync(locCatPath, "utf-8");
  if (raw.includes("CATEGORY_LANGUAGE_TEMPLATES")) {
    console.log("\n  ⚠️  [CRITICAL RISK] `CATEGORY_LANGUAGE_TEMPLATES` detected in src/i18n/category-content.ts:");
    console.log("     ↳ All 13 category hubs share the EXACT SAME generic intro, tips, and FAQ answers in non-English locales!");
    console.log("     ↳ Risk: Search engines flag identical boilerplate category pages across locales as duplicate/thin content.");
  }
}

console.log();

// -----------------------------------------------------------------------------
// 4. INTERNATIONAL LOCALIZATION PARITY & TRANSLATION COVERAGE
// -----------------------------------------------------------------------------
console.log("4. INTERNATIONAL TRANSLATION COVERAGE & NATIVE DEPTH");

const locales = ["es", "hi", "ar", "de", "pt", "id", "ru"];
const toolsDir = path.resolve(__dirname, "../src/i18n/content/tools");

for (const loc of locales) {
  const filePath = path.join(toolsDir, `${loc}.json`);
  if (!fs.existsSync(filePath)) {
    console.log(`  ❌ [MISSING] Locale file missing: ${loc}.json`);
    continue;
  }
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const translatedKeys = Object.keys(data);
    const coverage = ((translatedKeys.length / allTools.length) * 100).toFixed(1);
    
    // Check average word count of localized intro
    let totalIntroWords = 0;
    for (const key of translatedKeys) {
      const item = data[key];
      const intro = Array.isArray(item.intro) ? item.intro.join(" ") : (item.intro || "");
      totalIntroWords += intro.split(/\s+/).filter(Boolean).length;
    }
    const avgIntroWords = translatedKeys.length > 0 ? Math.round(totalIntroWords / translatedKeys.length) : 0;

    console.log(`  • Locale [${loc}]: ${translatedKeys.length}/${allTools.length} tools translated (${coverage}%) | Avg intro: ${avgIntroWords} words`);
  } catch (err) {
    console.log(`  ❌ [ERROR] Could not parse ${loc}.json`);
  }
}

console.log("\n=======================================================================");
console.log(" END OF AUDIT REPORT");
console.log("=======================================================================\n");
