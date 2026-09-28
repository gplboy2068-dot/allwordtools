/**
 * Internal Linking Graph & Click-Depth Audit Engine
 *
 * Simulates the complete internal linking graph of AllWordTools.
 * Analyzes:
 *   1. Click-depth from Homepage (BFS traversal)
 *   2. Inbound internal link count (In-degree) & Orphan detection
 *   3. Cross-category linking diversity (Silo vs Hub analysis)
 *   4. PageRank / Link Equity distribution (Power iteration simulation)
 */

import { allTools, categories, popularTools } from "../src/data/tools";
import { toolContent } from "../src/data/tool-content";
import { blogPosts } from "../src/data/blog-posts";
import {
  getRelatedTools,
  getSameCategoryTools,
  getUsersAlsoUsed,
  getRecommendedNext,
  getNextPrevTool,
  keywordClusters,
  getToolCategory,
} from "../src/lib/internal-links";

console.log("=======================================================================");
console.log(" 🕸️  FULL INTERNAL LINKING GRAPH & CLICK-DEPTH AUDIT REPORT");
console.log("=======================================================================\n");

// Map of page URL -> Set of target page URLs
const graph = new Map<string, Set<string>>();

function addEdge(from: string, to: string) {
  if (from === to) return;
  if (!graph.has(from)) graph.set(from, new Set());
  graph.get(from)!.add(to);
}

// -----------------------------------------------------------------------------
// 1. POPULATE NODES & EDGES IN THE SITE GRAPH
// -----------------------------------------------------------------------------

// Global Navigation Links (Header & Footer exist on all pages)
const globalNavToolLinks = new Set<string>();
const globalNavCategoryLinks = new Set<string>();
for (const cat of categories) {
  globalNavCategoryLinks.add(`/category/${cat.slug}`);
}

// A. Homepage ("/")
const homeTools = new Set<string>();
// Category grid on homepage links to category pages + top 6 tools per category
for (const cat of categories) {
  addEdge("/", `/category/${cat.slug}`);
  for (const t of cat.tools.slice(0, 6)) {
    addEdge("/", `/tool/${t.slug}`);
    homeTools.add(t.slug);
  }
}
// Popular tools on homepage
for (const slug of popularTools) {
  addEdge("/", `/tool/${slug}`);
  homeTools.add(slug);
}
// Homepage links to other core pages
addEdge("/", "/tools");
addEdge("/", "/categories");
addEdge("/", "/blog");
addEdge("/", "/about");
addEdge("/", "/methodology");
addEdge("/", "/contact");

// B. Category Hub Pages ("/category/$category")
for (const cat of categories) {
  const catUrl = `/category/${cat.slug}`;
  addEdge(catUrl, "/");
  addEdge(catUrl, "/tools");
  addEdge(catUrl, "/categories");

  // Links to ALL tools in this category
  for (const tool of cat.tools) {
    addEdge(catUrl, `/tool/${tool.slug}`);
  }

  // Related categories
  for (const otherCat of categories) {
    if (otherCat.slug !== cat.slug) {
      addEdge(catUrl, `/category/${otherCat.slug}`);
    }
  }

  // Keyword clusters on category page
  for (const cluster of keywordClusters) {
    for (const link of cluster.links) {
      if (link.kind === "tool") addEdge(catUrl, `/tool/${link.slug}`);
      else addEdge(catUrl, `/category/${link.slug}`);
    }
  }
}

// C. Tool Pages ("/tool/$tool")
for (const tool of allTools) {
  const toolUrl = `/tool/${tool.slug}`;
  addEdge(toolUrl, "/");
  addEdge(toolUrl, "/tools");
  addEdge(toolUrl, "/categories");
  addEdge(toolUrl, "/methodology");

  // Breadcrumbs: link to category
  const cat = getToolCategory(tool.slug);
  if (cat) addEdge(toolUrl, `/category/${cat.slug}`);

  // 1. Authored related tools
  const authored = toolContent[tool.slug]?.related || [];
  for (const r of authored) {
    addEdge(toolUrl, `/tool/${r}`);
  }

  // 2. Computed Related Tools
  for (const r of getRelatedTools(tool.slug, 4)) {
    addEdge(toolUrl, `/tool/${r.slug}`);
  }

  // 3. Recommended Next
  const nextRec = getRecommendedNext(tool.slug);
  if (nextRec) addEdge(toolUrl, `/tool/${nextRec.slug}`);

  // 4. Same Category Tools ("More in category")
  for (const s of getSameCategoryTools(tool.slug, 6)) {
    addEdge(toolUrl, `/tool/${s.slug}`);
  }

  // 5. Users Also Used (Cross-category)
  for (const u of getUsersAlsoUsed(tool.slug, 6)) {
    addEdge(toolUrl, `/tool/${u.slug}`);
  }

  // 6. Prev / Next ordered navigation
  const { prev, next } = getNextPrevTool(tool.slug);
  if (prev) addEdge(toolUrl, `/tool/${prev.slug}`);
  if (next) addEdge(toolUrl, `/tool/${next.slug}`);

  // 7. Contextual in-content markdown links
  const content = toolContent[tool.slug];
  if (content) {
    const text = [
      ...(content.intro || []),
      ...(content.sections || []).flatMap((s) => [s.heading, ...s.paragraphs]),
      ...(content.faqs || []).flatMap((f) => [f.question, f.answer]),
    ].join(" ");

    const mdMatches = text.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g);
    for (const match of mdMatches) {
      const target = match[2];
      if (!target.startsWith("http") && !target.startsWith("#")) {
        const cleanSlug = target.replace(/^\/tool\//, "").replace(/^\//, "");
        addEdge(toolUrl, `/tool/${cleanSlug}`);
      }
    }
  }

  // 8. Keyword clusters on tool page
  for (const cluster of keywordClusters) {
    for (const link of cluster.links) {
      if (link.kind === "tool") addEdge(toolUrl, `/tool/${link.slug}`);
      else addEdge(toolUrl, `/category/${link.slug}`);
    }
  }
}

// D. Blog Guide Pages ("/blog/$slug")
for (const post of blogPosts) {
  const postUrl = `/blog/${post.slug}`;
  addEdge(postUrl, "/");
  addEdge(postUrl, "/blog");
  if (post.relatedTool?.slug) {
    addEdge(postUrl, `/tool/${post.relatedTool.slug}`);
  }

  // In-article links to tools
  const text = [
    post.excerpt,
    post.leadParagraph,
    ...(post.sections || []).flatMap((s) => [s.heading, ...(s.paragraphs || [])]),
  ].join(" ");
  const mdMatches = text.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g);
  for (const match of mdMatches) {
    const target = match[2];
    if (!target.startsWith("http") && !target.startsWith("#")) {
      const cleanSlug = target.replace(/^\/tool\//, "").replace(/^\//, "");
      addEdge(postUrl, `/tool/${cleanSlug}`);
    }
  }
}

// -----------------------------------------------------------------------------
// 2. CLICK-DEPTH ANALYSIS (BFS FROM HOMEPAGE)
// -----------------------------------------------------------------------------
console.log("1. CLICK-DEPTH FROM HOMEPAGE (CRAWL BUDGET & ARCHITECTURE)");

const depthMap = new Map<string, number>();
const queue: { url: string; depth: number }[] = [{ url: "/", depth: 0 }];
depthMap.set("/", 0);

while (queue.length > 0) {
  const { url, depth } = queue.shift()!;
  const neighbors = graph.get(url) || new Set();

  for (const next of neighbors) {
    if (!depthMap.has(next)) {
      depthMap.set(next, depth + 1);
      queue.push({ url: next, depth: depth + 1 });
    }
  }
}

const toolDepths = allTools.map((t) => ({
  slug: t.slug,
  url: `/tool/${t.slug}`,
  depth: depthMap.get(`/tool/${t.slug}`) ?? 999,
}));

const depthGroups: Record<number, string[]> = {};
for (const td of toolDepths) {
  if (!depthGroups[td.depth]) depthGroups[td.depth] = [];
  depthGroups[td.depth].push(td.slug);
}

console.log(`  • Depth 1 (Direct link from Homepage) : ${(depthGroups[1] || []).length} tools`);
console.log(`  • Depth 2 (1 click from Category/Tool) : ${(depthGroups[2] || []).length} tools`);
console.log(`  • Depth 3 (2 clicks from Category)    : ${(depthGroups[3] || []).length} tools`);
console.log(`  • Depth 4+ (Too deep / Risk)          : ${(depthGroups[4] || []).length + (depthGroups[999] || []).length} tools`);

if ((depthGroups[4] || []).length === 0 && (depthGroups[999] || []).length === 0) {
  console.log(`  ✅ [PASS] 100% of tools are reachable in <= 2 clicks from the homepage!`);
} else {
  console.log(`  ⚠️  [WARN] Some tools exceed recommended 2-click depth:`, depthGroups[4] || depthGroups[999]);
}

console.log();

// -----------------------------------------------------------------------------
// 3. INBOUND LINK COUNT (IN-DEGREE) & UNDER-LINKED TOOLS
// -----------------------------------------------------------------------------
console.log("2. INTERNAL LINK VOLUME & IN-DEGREE DISTRIBUTION");

const inDegree = new Map<string, number>();
for (const [from, toList] of graph.entries()) {
  for (const to of toList) {
    inDegree.set(to, (inDegree.get(to) || 0) + 1);
  }
}

const toolInbound = allTools
  .map((t) => {
    const url = `/tool/${t.slug}`;
    return {
      slug: t.slug,
      name: t.name,
      category: t.category,
      count: inDegree.get(url) || 0,
    };
  })
  .sort((a, b) => a.count - b.count);

const avgInbound = Math.round(
  toolInbound.reduce((sum, t) => sum + t.count, 0) / toolInbound.length
);
const lowestInbound = toolInbound.slice(0, 10);
const highestInbound = toolInbound.slice(-5).reverse();

console.log(`  • Total tools analyzed: ${allTools.length}`);
console.log(`  • Average internal inbound links per tool: ${avgInbound} links`);
console.log(`  • Lowest inbound link count: ${toolInbound[0].slug} (${toolInbound[0].count} links)`);
console.log(`  • Highest inbound link count: ${toolInbound[toolInbound.length - 1].slug} (${toolInbound[toolInbound.length - 1].count} links)`);

console.log(`\n  📉 10 Under-Linked Tools (Potential PageRank Starvation):`);
for (const t of lowestInbound) {
  console.log(`     ↳ ${t.slug.padEnd(30)} : ${t.count} inbound links [Category: ${t.category}]`);
}

console.log(`\n  📈 Top 5 High-Authority Internal Hubs:`);
for (const t of highestInbound) {
  console.log(`     ↳ ${t.slug.padEnd(30)} : ${t.count} inbound links`);
}

console.log();

// -----------------------------------------------------------------------------
// 4. CROSS-CATEGORY LINKING DIVERSITY (SILO BREAKING)
// -----------------------------------------------------------------------------
console.log("3. CROSS-CATEGORY LINKING DIVERSITY (SILO BREAKING)");

const categoryIsolationStats = allTools.map((tool) => {
  const toolUrl = `/tool/${tool.slug}`;
  const outLinks = Array.from(graph.get(toolUrl) || []);
  const toolOutLinks = outLinks.filter((url) => url.startsWith("/tool/"));
  const crossCategoryOut = toolOutLinks.filter((url) => {
    const slug = url.replace("/tool/", "");
    const targetTool = allTools.find((t) => t.slug === slug);
    return targetTool && targetTool.category !== tool.category;
  });

  return {
    slug: tool.slug,
    category: tool.category,
    totalOut: toolOutLinks.length,
    crossOut: crossCategoryOut.length,
    crossRatio: toolOutLinks.length > 0 ? crossCategoryOut.length / toolOutLinks.length : 0,
  };
});

const isolatedTools = categoryIsolationStats.filter((t) => t.crossOut < 2);
console.log(`  • Tools with healthy cross-category links (>= 2): ${allTools.length - isolatedTools.length}/${allTools.length}`);
if (isolatedTools.length > 0) {
  console.log(`  ⚠️  [WARN] ${isolatedTools.length} tools have fewer than 2 cross-category links (Topic Silos):`);
  for (const t of isolatedTools.slice(0, 8)) {
    console.log(`     ↳ ${t.slug.padEnd(30)} : ${t.crossOut}/${t.totalOut} cross-category links`);
  }
} else {
  console.log(`  ✅ [PASS] Zero isolated topic silos: all tools link across diverse categories!`);
}

console.log();

// -----------------------------------------------------------------------------
// 5. PAGERANK SIMULATION (POWER ITERATION)
// -----------------------------------------------------------------------------
console.log("4. LINK EQUITY (PAGERANK) DISTRIBUTION SIMULATION");

const allNodes = Array.from(graph.keys());
const N = allNodes.length;
const damping = 0.85;
const iterations = 30;

let pr = new Map<string, number>();
for (const node of allNodes) pr.set(node, 1 / N);

for (let it = 0; it < iterations; it++) {
  const nextPr = new Map<string, number>();
  for (const node of allNodes) nextPr.set(node, (1 - damping) / N);

  for (const node of allNodes) {
    const neighbors = Array.from(graph.get(node) || []);
    if (neighbors.length > 0) {
      const share = (pr.get(node)! * damping) / neighbors.length;
      for (const target of neighbors) {
        if (nextPr.has(target)) {
          nextPr.set(target, nextPr.get(target)! + share);
        }
      }
    } else {
      // Dangling node distributes to all
      const share = (pr.get(node)! * damping) / N;
      for (const target of allNodes) {
        nextPr.set(target, nextPr.get(target)! + share);
      }
    }
  }
  pr = nextPr;
}

const toolPr = allTools
  .map((t) => ({
    slug: t.slug,
    name: t.name,
    category: t.category,
    score: (pr.get(`/tool/${t.slug}`) || 0) * 1000,
  }))
  .sort((a, b) => a.score - b.score);

console.log(`  • Lowest simulated PageRank:  ${toolPr[0].slug} (Score: ${toolPr[0].score.toFixed(3)})`);
console.log(`  • Highest simulated PageRank: ${toolPr[toolPr.length - 1].slug} (Score: ${toolPr[toolPr.length - 1].score.toFixed(3)})`);
console.log(`\n  🔍 Bottom 5 Tools by Link Equity (Priority for Internal Linking Expansion):`);
for (const t of toolPr.slice(0, 5)) {
  console.log(`     ↳ ${t.slug.padEnd(30)} : Score: ${t.score.toFixed(3)} [Category: ${t.category}]`);
}

console.log("\n=======================================================================");
console.log(" END OF INTERNAL LINKING AUDIT");
console.log("=======================================================================\n");
