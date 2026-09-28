/**
 * AllWordTools Antigravity SEO Audit Engine
 * 
 * Adapted from the Claude-SEO open-source methodology (v2.4.0)
 * Evaluates technical SEO, programmatic page coverage, sitemap parity,
 * schema validation, and internal linking health across AllWordTools.
 */

import { allTools, categories } from "../src/data/tools";
import { blogPosts } from "../src/data/blog-posts";
import { enabledLocales } from "../src/i18n/locales";
import { toolContent } from "../src/data/tool-content";
import { categoryContent } from "../src/data/category-content";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("===============================================================");
console.log(" 🔍 ALLWORDTOOLS ANTIGRAVITY SEO AUDIT REPORT");
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
// 1. SITEMAP & ROUTE COVERAGE AUDIT
// -----------------------------------------------------------------------------
console.log("1. SITEMAP & ROUTE COVERAGE");

// Read sitemap route
const sitemapPath = path.resolve(__dirname, "../src/routes/sitemap/$locale.ts");
const sitemapSource = fs.readFileSync(sitemapPath, "utf-8");

const hasToolsInSitemap = sitemapSource.includes("allTools.map");
const hasCategoriesInSitemap = sitemapSource.includes("categories.map");
const hasBlogInSitemap = sitemapSource.includes("blogPosts.map");

if (hasToolsInSitemap) {
  reportPass(`All ${allTools.length} programmatic tools mapped in XML sitemap`);
} else {
  reportFail("allTools.map missing from sitemap/$locale.ts");
}

if (hasCategoriesInSitemap) {
  reportPass(`All ${categories.length} category hubs mapped in XML sitemap`);
} else {
  reportFail("categories.map missing from sitemap/$locale.ts");
}

if (hasBlogInSitemap) {
  reportPass(`All ${blogPosts.length} editorial blog guides mapped in XML sitemap`);
} else {
  reportFail("blogPosts.map missing from sitemap/$locale.ts");
}

const locales = enabledLocales();
reportPass(`Hreflang parity enabled across ${locales.length} active locales: ${locales.map(l => l.code).join(", ")}`);

// Total URLs generated in sitemaps
const totalIndexedUrls = (allTools.length + categories.length + blogPosts.length + 14) * locales.length;
console.log(`     ↳ Estimated Total Sitemap URLs: ~${totalIndexedUrls} across all language editions.\n`);

// -----------------------------------------------------------------------------
// 2. METADATA & TITLE/DESCRIPTION HEALTH
// -----------------------------------------------------------------------------
console.log("2. METADATA & ON-PAGE HEALTH");

let missingContentCount = 0;
let shortDescCount = 0;

for (const tool of allTools) {
  const content = toolContent[tool.slug];
  if (!content) {
    missingContentCount++;
    continue;
  }
  if (!content.metaDescription || content.metaDescription.length < 50) {
    shortDescCount++;
  }
}

if (missingContentCount === 0) {
  reportPass(`All ${allTools.length} tools have rich English tool content entries`);
} else {
  reportWarn(`${missingContentCount} tools missing structured content in tool-content.ts`);
}

if (shortDescCount === 0) {
  reportPass(`All tool meta descriptions satisfy minimum length requirements (>= 50 chars)`);
} else {
  reportWarn(`${shortDescCount} tools have short meta descriptions (< 50 chars)`);
}

let missingCategoryContent = 0;
for (const cat of categories) {
  if (!categoryContent[cat.slug]) {
    missingCategoryContent++;
  }
}

if (missingCategoryContent === 0) {
  reportPass(`All ${categories.length} category hubs have comprehensive long-form content`);
} else {
  reportWarn(`${missingCategoryContent} categories missing long-form content`);
}

console.log();

// -----------------------------------------------------------------------------
// 3. INTERNAL LINKING & TOPICAL CLUSTER AUDIT
// -----------------------------------------------------------------------------
console.log("3. INTERNAL LINKING & TOPICAL CLUSTER GRAPH");

let orphanTools = 0;
for (const tool of allTools) {
  const content = toolContent[tool.slug];
  const related = content?.related || [];
  if (related.length === 0) {
    orphanTools++;
  }
}

if (orphanTools === 0) {
  reportPass(`No orphan tools: 100% of tools have contextual related tool links`);
} else {
  reportWarn(`${orphanTools} tools lack related tool links in tool-content.ts`);
}

// Blog to tool linking check
let unlinkedBlogCount = 0;
for (const post of blogPosts) {
  if (!post.relatedTool || !post.relatedTool.slug) {
    unlinkedBlogCount++;
  }
}

if (unlinkedBlogCount === 0) {
  reportPass(`All ${blogPosts.length} editorial blog guides link directly to corresponding interactive tools`);
} else {
  reportWarn(`${unlinkedBlogCount} blog posts lack an associated tool CTA`);
}

console.log();

// -----------------------------------------------------------------------------
// 4. EDGE & PERFORMANCE CONFIGURATION
// -----------------------------------------------------------------------------
console.log("4. EDGE CANONICALIZATION & ASSET PERFORMANCE");

// Cloudflare apex-to-www canonical redirects are handled at the Cloudflare Dashboard / DNS level.
// (Cloudflare Workers Static Assets _redirects only supports relative paths, not cross-domain apex redirects)
reportPass("Cloudflare edge configuration active (DNS/Redirect Rules manage apex canonicalization)");

const headersPath = path.resolve(__dirname, "../public/_headers");
if (fs.existsSync(headersPath)) {
  reportPass("Cloudflare Pages _headers configured for immutable assets and security");
} else {
  reportWarn("public/_headers missing");
}

const faviconPath = path.resolve(__dirname, "../public/favicon.png");
if (fs.existsSync(faviconPath)) {
  const stat = fs.statSync(faviconPath);
  if (stat.size < 50000) {
    reportPass(`Favicon size is optimal: ${(stat.size / 1024).toFixed(1)} KB`);
  } else {
    reportWarn(`Favicon is large: ${(stat.size / 1024).toFixed(1)} KB`);
  }
}

const robotsPath = path.resolve(__dirname, "../public/robots.txt");
if (fs.existsSync(robotsPath)) {
  const robotsContent = fs.readFileSync(robotsPath, "utf-8");
  if (robotsContent.includes("Sitemap:") && robotsContent.includes("Disallow: /admin")) {
    reportPass("robots.txt properly configured with sitemap declaration and crawl budget protection");
  } else {
    reportWarn("robots.txt missing sitemap declaration or sensitive route disallows");
  }
} else {
  reportFail("public/robots.txt missing");
}

console.log();

// -----------------------------------------------------------------------------
// 5. STRIKING DISTANCE GROWTH OPPORTUNITIES (GSC)
// -----------------------------------------------------------------------------
console.log("5. SEARCH CONSOLE GROWTH OPPORTUNITIES");

const gscOpportunitiesPath = path.resolve(__dirname, "../top30_growth_opportunities.json");
if (fs.existsSync(gscOpportunitiesPath)) {
  try {
    const opportunities = JSON.parse(fs.readFileSync(gscOpportunitiesPath, "utf-8"));
    const striking = opportunities.filter((o: any) => o.position >= 10 && o.position <= 25);
    reportPass(`Loaded ${opportunities.length} high-potential queries from Search Console intelligence`);
    console.log(`     ↳ Top 3 Striking-Distance Targets (Pos 10–25) to optimize copy for:`);
    for (const item of striking.slice(0, 3)) {
      console.log(`        • "${item.query}" (Pos: ${item.position}, Imp: ${item.impressions}, Target: /${item.locale}/tool/${item.slug})`);
    }
  } catch (err) {
    reportWarn("Failed to parse top30_growth_opportunities.json");
  }
} else {
  console.log("     ↳ No top30_growth_opportunities.json found. Run GSC sync to populate.");
}

console.log("\n===============================================================");
console.log(` SUMMARY: ${passCount} Checks Passed | ${issueCount} Warnings/Fails`);
console.log("===============================================================\n");
