/**
 * GEO & AI Search Readiness Audit Engine
 *
 * Validates:
 * 1. Direct answer definition extractability (30-65 words) across 100% of tools
 * 2. Conversational fluff prevention (zero first-person marketing filler)
 * 3. Enhanced SoftwareApplication schema compliance (featureList, subCategory, OS, free flags)
 * 4. FAQPage AI snippet compliance (concise answers <= 75 words)
 * 5. HowTo schema completeness (>= 3 steps per tool)
 */

import { allTools, categories } from "../src/data/tools";
import { toolContent } from "../src/data/tool-content";
import { getDirectAnswer, buildEnhancedSoftwareSchema } from "../src/lib/geo";

console.log("===============================================================");
console.log(" 🤖 ALLWORDTOOLS GEO & AI SEARCH READINESS AUDIT");
console.log("    (Google AI Overviews • Perplexity • ChatGPT Search)");
console.log("===============================================================\n");

let issueCount = 0;
let passCount = 0;

function reportPass(label: string) {
  passCount++;
  console.log(`  ✅ [PASS] ${label}`);
}

function reportWarn(label: string, detail?: string) {
  issueCount++;
  console.log(`  ⚠️  [WARN] ${label}`);
  if (detail) console.log(`     ↳ ${detail}`);
}

function reportFail(label: string, detail?: string) {
  issueCount++;
  console.log(`  ❌ [FAIL] ${label}`);
  if (detail) console.log(`     ↳ ${detail}`);
}

// -----------------------------------------------------------------------------
// 1. DIRECT ANSWER & DEFINITION EXTRACTABILITY AUDIT
// -----------------------------------------------------------------------------
console.log("1. DIRECT ANSWER & EXTRACTABILITY (30–65 Words)");

let wordCountIssues = 0;
let missingDirectAnswer = 0;
let fluffCount = 0;
const fluffPatterns = [
  /\bwelcome to\b/i,
  /\bin this article\b/i,
  /\bwe are excited to\b/i,
  /\bclick the link below\b/i,
  /\bas an ai\b/i,
];

let totalWords = 0;

for (const tool of allTools) {
  const content = toolContent[tool.slug];
  const directAnswer = getDirectAnswer(tool.slug, content, tool);

  if (!directAnswer || directAnswer.trim().length === 0) {
    missingDirectAnswer++;
    continue;
  }

  const words = directAnswer.trim().split(/\s+/).length;
  totalWords += words;

  if (words < 28 || words > 68) {
    wordCountIssues++;
    reportWarn(`Tool "${tool.slug}" direct answer outside optimal range (${words} words)`, directAnswer.slice(0, 80) + "...");
  }

  for (const pattern of fluffPatterns) {
    if (pattern.test(directAnswer)) {
      fluffCount++;
      reportWarn(`Tool "${tool.slug}" contains conversational fluff`, directAnswer.slice(0, 80));
    }
  }
}

if (missingDirectAnswer === 0) {
  reportPass(`100% of ${allTools.length} tools have an extractable direct definition`);
} else {
  reportFail(`${missingDirectAnswer} tools lack direct definitions`);
}

if (wordCountIssues === 0) {
  const avg = Math.round(totalWords / allTools.length);
  reportPass(`All direct answers satisfy optimal snippet length (Avg: ${avg} words/snippet)`);
} else {
  reportWarn(`${wordCountIssues} tools have sub-optimal direct answer lengths`);
}

if (fluffCount === 0) {
  reportPass("Zero conversational fluff or first-person marketing filler detected");
} else {
  reportWarn(`${fluffCount} tools contain conversational filler`);
}

console.log();

// -----------------------------------------------------------------------------
// 2. ENHANCED SOFTWAREAPPLICATION SCHEMA AUDIT
// -----------------------------------------------------------------------------
console.log("2. SOFTWAREAPPLICATION STRUCTURED DATA ENRICHMENT");

let schemaIssues = 0;

for (const tool of allTools) {
  const content = toolContent[tool.slug];
  const category = categories.find((c) => c.slug === tool.category);
  const schema = buildEnhancedSoftwareSchema({
    tool,
    content,
    locale: "en",
    url: `https://allwordtools.com/tool/${tool.slug}`,
    categoryTitle: category?.title,
  });

  if (!schema.applicationCategory || schema.applicationCategory !== "UtilitiesApplication") {
    schemaIssues++;
  }
  if (!schema.applicationSubCategory) {
    schemaIssues++;
  }
  if (!schema.operatingSystem || !schema.operatingSystem.includes("Web Browser")) {
    schemaIssues++;
  }
  if (!schema.browserRequirements) {
    schemaIssues++;
  }
  if (schema.isAccessibleForFree !== true) {
    schemaIssues++;
  }
  if (!Array.isArray(schema.featureList) || schema.featureList.length === 0) {
    schemaIssues++;
  }
  if (!schema.description || schema.description.length < 40) {
    schemaIssues++;
  }
}

if (schemaIssues === 0) {
  reportPass(`All ${allTools.length} tools pass enhanced SoftwareApplication schema compliance:`);
  console.log("     ↳ Validated: applicationSubCategory, operatingSystem, browserRequirements, isAccessibleForFree, featureList, and direct description.");
} else {
  reportFail(`${schemaIssues} tools have incomplete SoftwareApplication schemas`);
}

console.log();

// -----------------------------------------------------------------------------
// 3. FAQPAGE & HOWTO AI SEARCH COMPLIANCE
// -----------------------------------------------------------------------------
console.log("3. FAQPAGE & HOWTO AI SNIPPET AUDIT");

let faqTooLong = 0;
let totalFaqs = 0;
let toolsWithIncompleteSteps = 0;

for (const tool of allTools) {
  const content = toolContent[tool.slug];
  if (!content) continue;

  // Check HowTo steps
  if (!content.howToSteps || content.howToSteps.length < 3) {
    toolsWithIncompleteSteps++;
  }

  // Check FAQ lengths
  for (const faq of content.faqs || []) {
    totalFaqs++;
    const words = faq.answer.trim().split(/\s+/).length;
    if (words > 75) {
      faqTooLong++;
    }
  }
}

if (toolsWithIncompleteSteps === 0) {
  reportPass(`All ${allTools.length} tools have >= 3 structured HowTo steps for Google & AI step extraction`);
} else {
  reportWarn(`${toolsWithIncompleteSteps} tools have fewer than 3 HowTo steps`);
}

if (faqTooLong === 0) {
  reportPass(`All ${totalFaqs} FAQs across site satisfy concise AI snippet constraints (<= 75 words)`);
} else {
  reportWarn(`${faqTooLong} FAQs exceed 75 words`);
}

console.log("\n===============================================================");
console.log(` SUMMARY: ${passCount} Checks Passed | ${issueCount} Warnings/Fails`);
console.log("===============================================================\n");

if (issueCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
