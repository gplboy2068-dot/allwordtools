/**
 * Central internal-linking engine.
 *
 * A single source of truth that automatically computes relevant internal
 * links for every tool, category and page — related tools, "users also
 * used", popular-in-category, next/previous, recommended next, recently
 * added, trending, keyword clusters and related categories.
 *
 * Goal: no orphan pages, strong topical clustering, descriptive anchors,
 * and every tool reachable within three clicks of the homepage — without
 * hardcoding link lists on every page.
 */

import { allTools, categories, popularTools, toolsFromSlugs, type Tool } from "@/data/tools";
import { toolContent } from "@/data/tool-content";
import { getToolMeta, rankRelated, toolMetaList } from "@/lib/tool-metadata";

/* ------------------------------------------------------------------ */
/* Basic lookups                                                       */
/* ------------------------------------------------------------------ */

export function getTool(slug: string): Tool | undefined {
  return allTools.find((t) => t.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getToolCategory(slug: string) {
  const tool = getTool(slug);
  return tool ? getCategory(tool.category) : undefined;
}

/** Resolve slugs to tools, drop unknowns, drop `exclude`, cap at `limit`. */
function resolve(slugs: string[], exclude: string[] = [], limit?: number): Tool[] {
  const seen = new Set(exclude);
  const out: Tool[] = [];
  for (const slug of slugs) {
    if (seen.has(slug)) continue;
    const tool = getTool(slug);
    if (!tool) continue;
    seen.add(slug);
    out.push(tool);
    if (limit && out.length >= limit) break;
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Cross-category adjacency ("Users also used")                        */
/* ------------------------------------------------------------------ */

/**
 * Hand-curated cross-category associations for high-intent tools. These are
 * used first for "Users also used"; anything not listed falls back to a
 * relevance blend of trending + popular tools from other categories.
 */
const usersAlsoUsedMap: Record<string, string[]> = {
  "word-unscrambler": [
    "anagram-solver",
    "word-finder",
    "scrabble-helper",
    "wordle-solver",
    "letter-rearranger",
  ],
  "anagram-solver": [
    "word-unscrambler",
    "word-finder",
    "letter-rearranger",
    "scrabble-helper",
    "text-twist-solver",
  ],
  "word-finder": [
    "word-unscrambler",
    "words-containing",
    "crossword-solver",
    "pattern-solver",
    "scrabble-helper",
  ],
  "wordle-solver": [
    "crossword-solver",
    "word-finder",
    "pattern-solver",
    "words-containing",
    "anagram-solver",
  ],
  "crossword-solver": [
    "wordle-solver",
    "pattern-solver",
    "word-finder",
    "missing-letters-finder",
    "codycross-solver",
  ],
  "scrabble-helper": [
    "words-with-friends-helper",
    "word-unscrambler",
    "word-finder",
    "anagram-solver",
    "boggle-solver",
  ],
  "words-with-friends-helper": [
    "scrabble-helper",
    "word-unscrambler",
    "word-finder",
    "boggle-solver",
    "text-twist-solver",
  ],
  "synonym-finder": [
    "antonym-finder",
    "dictionary",
    "rhyming-words",
    "word-meaning",
    "reverse-dictionary",
  ],
  "antonym-finder": [
    "synonym-finder",
    "dictionary",
    "word-meaning",
    "rhyming-words",
    "reverse-dictionary",
  ],
  "rhyming-words": [
    "syllable-counter",
    "synonym-finder",
    "dictionary",
    "word-of-the-day",
    "random-word-generator",
  ],
  dictionary: [
    "word-meaning",
    "synonym-finder",
    "pronunciation",
    "word-origin",
    "reverse-dictionary",
  ],
  "grammar-checker": [
    "spell-checker",
    "punctuation-checker",
    "passive-voice-checker",
    "active-voice-converter",
    "ai-word-explainer",
  ],
  "letter-counter": [
    "vowel-counter",
    "consonant-counter",
    "letter-frequency-analyzer",
    "words-containing",
    "word-finder",
  ],
  "ai-word-explainer": [
    "dictionary",
    "word-meaning",
    "ai-vocabulary-builder",
    "synonym-finder",
    "ai-example-generator",
  ],
  "riddle-generator": [
    "vocabulary-quiz",
    "sight-word-generator",
    "word-of-the-day",
    "ai-story-generator",
    "spelling-quiz",
  ],
  "sight-word-generator": [
    "cvc-word-generator",
    "spelling-quiz",
    "riddle-generator",
    "syllable-counter",
    "vocabulary-quiz",
  ],
  "cvc-word-generator": [
    "sight-word-generator",
    "vowel-counter",
    "consonant-counter",
    "rhyming-words",
    "riddle-generator",
  ],
  "alphabetical-sorter": [
    "repeated-letter-finder",
    "letter-frequency-analyzer",
    "letter-counter",
    "words-containing",
    "random-word-generator",
  ],
  "repeated-letter-finder": [
    "alphabetical-sorter",
    "letter-frequency-analyzer",
    "vowel-counter",
    "consonant-counter",
    "anagram-solver",
  ],
  "knight-name-generator": [
    "robot-name-generator",
    "character-name-generator",
    "ai-story-generator",
    "guild-name-generator",
    "alliteration-generator",
  ],
  "robot-name-generator": [
    "knight-name-generator",
    "alien-name-generator",
    "ai-story-generator",
    "character-name-generator",
    "team-name-generator",
  ],
  "punctuation-checker": [
    "grammar-checker",
    "spell-checker",
    "active-voice-converter",
    "passive-voice-checker",
    "ai-word-explainer",
  ],
  "strands-solver": [
    "wordle-solver",
    "boggle-solver",
    "crossword-solver",
    "word-unscrambler",
    "seven-little-words-solver",
  ],
  "boggle-solver": [
    "scrabble-helper",
    "words-with-friends-helper",
    "word-unscrambler",
    "strands-solver",
    "text-twist-solver",
  ],
  "prefix-quiz": [
    "suffix-quiz",
    "spelling-quiz",
    "vocabulary-quiz",
    "sight-word-generator",
    "word-origin",
  ],
  "suffix-quiz": [
    "prefix-quiz",
    "spelling-quiz",
    "vocabulary-quiz",
    "words-ending-with",
    "rhyming-words",
  ],
  "codycross-solver": [
    "crossword-solver",
    "wordle-solver",
    "strands-solver",
    "seven-little-words-solver",
    "word-cookies-solver",
  ],
  "seven-little-words-solver": [
    "crossword-solver",
    "codycross-solver",
    "strands-solver",
    "wordle-solver",
    "anagram-solver",
  ],
  "word-cookies-solver": [
    "word-unscrambler",
    "anagram-solver",
    "wordscapes-solver",
    "boggle-solver",
    "text-twist-solver",
  ],
  "wordscapes-solver": [
    "word-cookies-solver",
    "word-unscrambler",
    "anagram-solver",
    "crossword-solver",
    "boggle-solver",
  ],
  "vowel-counter": [
    "consonant-counter",
    "letter-counter",
    "cvc-word-generator",
    "sight-word-generator",
    "syllable-counter",
  ],
  "consonant-counter": [
    "vowel-counter",
    "letter-counter",
    "cvc-word-generator",
    "sight-word-generator",
    "letter-frequency-analyzer",
  ],
  "word-of-the-day": [
    "daily-word",
    "vocabulary-quiz",
    "riddle-generator",
    "dictionary",
    "ai-word-explainer",
  ],
  "daily-word": [
    "word-of-the-day",
    "vocabulary-quiz",
    "spelling-quiz",
    "riddle-generator",
    "synonym-finder",
  ],
};

/* ------------------------------------------------------------------ */
/* Per-tool link sets                                                  */
/* ------------------------------------------------------------------ */

/**
 * Related tools, ranked automatically by the metadata relation engine
 * (shared category, tags, keywords, intent, popularity). Any authored
 * `related` slugs in tool content are floated to the top as a curator boost,
 * but the list stays complete and self-generating for tools with no authored
 * content — so it scales to any number of tools with zero manual wiring.
 */
export function getRelatedTools(slug: string, limit = 4): Tool[] {
  if (!getToolMeta(slug)) {
    // Unknown / not-yet-enriched slug: fall back to category ordering.
    const cat = getToolCategory(slug);
    return cat
      ? resolve(
          cat.tools.map((t) => t.slug),
          [slug],
          limit,
        )
      : [];
  }
  const authored = toolContent[slug]?.related ?? [];
  return resolve(rankRelated(slug, { boost: authored }), [slug], limit);
}

/** Other tools in the same category, ranked by relevance ("Similar tools"). */
export function getSameCategoryTools(slug: string, limit = 6): Tool[] {
  const cat = getToolCategory(slug);
  if (!cat) return [];
  if (!getToolMeta(slug))
    return resolve(
      cat.tools.map((t) => t.slug),
      [slug],
      limit,
    );
  return resolve(rankRelated(slug, { sameCategoryOnly: true }), [slug], limit);
}

/**
 * Cross-category "Users also used" recommendations, ranked automatically.
 * Curated associations (for the highest-intent tools) act as a boost on top
 * of the scored cross-category results — never a hardcoded, closed list.
 */
export function getUsersAlsoUsed(slug: string, limit = 4): Tool[] {
  if (!getToolMeta(slug)) {
    const cat = getToolCategory(slug);
    const cross = [...trendingSlugs(), ...popularTools].filter((s) => {
      const t = getTool(s);
      return t && (!cat || t.category !== cat.slug);
    });
    return resolve(cross, [slug], limit);
  }
  const curated = usersAlsoUsedMap[slug] ?? [];
  return resolve(rankRelated(slug, { crossCategoryOnly: true, boost: curated }), [slug], limit);
}

/** A single strongly-recommended "next" tool to guide the journey. */
export function getRecommendedNext(slug: string): Tool | undefined {
  const related = getRelatedTools(slug, 6);
  const cat = getToolCategory(slug);
  // Prefer a related tool from a *different* category to widen exploration.
  const crossCat = related.find((t) => !cat || t.category !== cat.slug);
  return crossCat ?? related[0] ?? getUsersAlsoUsed(slug, 1)[0];
}

/** Previous / next tool within the same category (ordered navigation). */
export function getNextPrevTool(slug: string): { prev?: Tool; next?: Tool } {
  const cat = getToolCategory(slug);
  if (!cat) return {};
  const idx = cat.tools.findIndex((t) => t.slug === slug);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? cat.tools[idx - 1] : undefined,
    next: idx < cat.tools.length - 1 ? cat.tools[idx + 1] : undefined,
  };
}

/* ------------------------------------------------------------------ */
/* Site-wide link sets (sidebar / CTA / homepage)                      */
/* ------------------------------------------------------------------ */

function trendingSlugs(): string[] {
  return allTools.filter((t) => t.isTrending).map((t) => t.slug);
}

export function getTrendingTools(limit = 6): Tool[] {
  return resolve(trendingSlugs(), [], limit);
}

export function getRecentlyAddedTools(limit = 6): Tool[] {
  // `isNew` tools, newest categories last in the data file — reverse for recency.
  const newSlugs = allTools
    .filter((t) => t.isNew)
    .map((t) => t.slug)
    .reverse();
  return resolve(newSlugs, [], limit);
}

export function getPopularTools(limit = 6): Tool[] {
  return resolve(popularTools, [], limit);
}

export function getAiTools(limit = 8): Tool[] {
  const cat = getCategory("ai-tools");
  return cat
    ? resolve(
        cat.tools.map((t) => t.slug),
        [],
        limit,
      )
    : [];
}

/** Related categories for a given category (everything except itself). */
export function getRelatedCategories(catSlug: string, limit?: number) {
  const related = categories.filter((c) => c.slug !== catSlug);
  return limit ? related.slice(0, limit) : related;
}

/* ------------------------------------------------------------------ */
/* Keyword clusters (contextual supporting links)                      */
/* ------------------------------------------------------------------ */

export type KeywordLink = { label: string } & (
  { kind: "tool"; slug: string } | { kind: "category"; slug: string }
);

/**
 * Auto-generated topical clusters. These are computed from templates against
 * tools that actually exist, so they stay valid as tools are added/removed —
 * no hardcoded, potentially-broken links. Only clusters whose target tool is
 * present are emitted.
 */
function toolCluster(
  title: string,
  entries: { slug: string; label: string }[],
): { title: string; links: KeywordLink[] } | null {
  const links = entries
    .filter((e) => Boolean(getTool(e.slug)))
    .map((e) => ({ kind: "tool", slug: e.slug, label: e.label }) as KeywordLink);
  return links.length ? { title, links } : null;
}

function generatedClusters(): { title: string; links: KeywordLink[] }[] {
  const clusters: ({ title: string; links: KeywordLink[] } | null)[] = [
    toolCluster(
      "Search by word length",
      [2, 3, 4, 5, 6, 7].map((n) => ({
        slug: "letter-pattern-finder",
        label: `${n} Letter Words`,
      })),
    ),
    toolCluster(
      "Words starting with",
      ["A", "B", "C", "S", "T"].map((c) => ({
        slug: "words-starting-with",
        label: `Words Starting With ${c}`,
      })),
    ),
    toolCluster(
      "Words ending with",
      ["ING", "ED", "LY", "ER", "EST"].map((c) => ({
        slug: "words-ending-with",
        label: `Words Ending With ${c}`,
      })),
    ),
    toolCluster("Words with rare letters", [
      { slug: "words-containing", label: "Words With Q" },
      { slug: "words-containing", label: "Words With X" },
      { slug: "words-containing", label: "Words With Z" },
      { slug: "words-containing", label: "Words With J" },
      { slug: "wildcard-solver", label: "Wildcard Pattern Search" },
    ]),
  ];
  return clusters.filter((c): c is { title: string; links: KeywordLink[] } => c !== null);
}

/**
 * Topical keyword clusters — descriptive anchors that link searchers'
 * common queries to the closest matching tool or category. Never "click
 * here"; always a real, human-readable phrase. Combines a few hand-tuned
 * clusters with automatically-generated length/letter/pattern clusters.
 */
export const keywordClusters: { title: string; links: KeywordLink[] }[] = [
  {
    title: "Game solvers",
    links: [
      { kind: "tool", slug: "word-unscrambler", label: "Word Unscrambler Tool" },
      { kind: "tool", slug: "anagram-solver", label: "Free Anagram Solver" },
      { kind: "tool", slug: "wordle-solver", label: "Wordle Answer Helper" },
      { kind: "tool", slug: "scrabble-helper", label: "Scrabble Word Helper" },
      { kind: "tool", slug: "crossword-solver", label: "Crossword Clue Solver" },
      { kind: "tool", slug: "words-with-friends-helper", label: "Words with Friends Cheat" },
      { kind: "tool", slug: "hangman-solver", label: "Hangman Word Guesser" },
    ],
  },
  {
    title: "Writing & vocabulary",
    links: [
      { kind: "tool", slug: "synonym-finder", label: "Synonym Finder" },
      { kind: "tool", slug: "antonym-finder", label: "Antonym Finder" },
      { kind: "tool", slug: "rhyming-words", label: "Rhyming Words" },
      { kind: "tool", slug: "dictionary", label: "English Dictionary" },
      { kind: "tool", slug: "grammar-checker", label: "Grammar Checker" },
      { kind: "tool", slug: "punctuation-checker", label: "Punctuation & Comma Checker" },
      { kind: "tool", slug: "passive-voice-checker", label: "Passive Voice Fixer" },
      { kind: "tool", slug: "active-voice-converter", label: "Active Voice Converter" },
      { kind: "tool", slug: "letter-counter", label: "Letter & Character Counter" },
    ],
  },
  {
    title: "Word Puzzles & Brainteasers",
    links: [
      { kind: "tool", slug: "strands-solver", label: "NYT Strands Solver" },
      { kind: "tool", slug: "boggle-solver", label: "Boggle Word Solver" },
      { kind: "tool", slug: "codycross-solver", label: "CodyCross Crossword Answers" },
      { kind: "tool", slug: "codycross-answers", label: "CodyCross Puzzle Solutions" },
      { kind: "tool", slug: "word-cookies-solver", label: "Word Cookies Cheat" },
      { kind: "tool", slug: "seven-little-words-solver", label: "7 Little Words Solver" },
    ],
  },
  {
    title: "Word Quizzes & Learning",
    links: [
      { kind: "tool", slug: "vocabulary-quiz", label: "Daily Vocabulary Quiz" },
      { kind: "tool", slug: "spelling-quiz", label: "Interactive Spelling Challenge" },
      { kind: "tool", slug: "prefix-quiz", label: "Prefix & Suffix Quiz" },
      { kind: "tool", slug: "sight-word-generator", label: "Dolch Sight Words Practice" },
      { kind: "tool", slug: "riddle-generator", label: "Brain-Teaser Riddles" },
    ],
  },
  {
    title: "Text & Character Analysis",
    links: [
      { kind: "tool", slug: "alphabetical-sorter", label: "Alphabetical List Sorter" },
      { kind: "tool", slug: "repeated-letter-finder", label: "Duplicate Letter Finder" },
      { kind: "tool", slug: "letter-frequency-analyzer", label: "Letter Frequency Chart" },
      { kind: "tool", slug: "vowel-counter", label: "Vowel Counter Online" },
      { kind: "tool", slug: "consonant-counter", label: "Consonant Counter Online" },
    ],
  },
  {
    title: "Creative & Name Generators",
    links: [
      { kind: "tool", slug: "character-name-generator", label: "Fiction Character Names" },
      { kind: "tool", slug: "knight-name-generator", label: "Medieval Knight Names" },
      { kind: "tool", slug: "robot-name-generator", label: "Sci-Fi Robot Names" },
      { kind: "tool", slug: "team-name-generator", label: "Team & Clan Names" },
      { kind: "tool", slug: "guild-name-generator", label: "Guild & Clan Names" },
      { kind: "tool", slug: "witch-name-generator", label: "Witch & Vampire Names" },
      { kind: "tool", slug: "alien-name-generator", label: "Alien & Space Names" },
    ],
  },
  ...generatedClusters(),
];

/** Flat list of "top searches" for compact sidebars. */
export const topSearchLinks: KeywordLink[] = [
  { kind: "tool", slug: "word-unscrambler", label: "Unscramble Words" },
  { kind: "tool", slug: "letter-pattern-finder", label: "5 Letter Words" },
  { kind: "tool", slug: "words-containing", label: "Words With Q No U" },
  { kind: "tool", slug: "words-ending-with", label: "Words Ending In ING" },
  { kind: "tool", slug: "wordle-solver", label: "Wordle Answer Today" },
  { kind: "tool", slug: "scrabble-helper", label: "High-Scoring Scrabble Words" },
  { kind: "tool", slug: "rhyming-words", label: "Rhymes With Love" },
  { kind: "tool", slug: "anagram-solver", label: "Anagram Of A Word" },
];

/* ------------------------------------------------------------------ */
/* Homepage / all-tools helpers                                        */
/* ------------------------------------------------------------------ */

export function getNewTools(limit = 8): Tool[] {
  return resolve(
    allTools
      .filter((t) => t.isNew)
      .map((t) => t.slug)
      .reverse(),
    [],
    limit,
  );
}

/** Featured / "editor's picks" tools, ranked by the metadata engine. */
export function getFeaturedTools(limit = 6): Tool[] {
  const slugs = toolMetaList
    .filter((m) => m.featured)
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .map((m) => m.slug);
  return resolve(slugs, [], limit);
}

/* ------------------------------------------------------------------ */
/* SEO audit — orphan detection                                        */
/* ------------------------------------------------------------------ */

/**
 * Audit utility: a tool is an "orphan" if the automatic engine surfaces no
 * outgoing related links for it. With the scoring engine every enriched tool
 * has related + users-also-used links, so this should always return [] — it
 * exists as a guard for future tools/data changes and CMS integration.
 */
export function findOrphanTools(): string[] {
  return toolMetaList.filter((m) => getRelatedTools(m.slug, 1).length === 0).map((m) => m.slug);
}

export { allTools, categories, toolsFromSlugs };
export { getToolMeta, toolMetaList } from "@/lib/tool-metadata";
export type { Tool };
export type { ToolMeta } from "@/lib/tool-metadata";
