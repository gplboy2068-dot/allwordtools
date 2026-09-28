/**
 * Automatic tool-metadata engine.
 *
 * This is the single source of truth for *derived* tool metadata. It takes
 * the minimal `Tool` records defined in `src/data/tools.ts` (slug, name,
 * description, category, isNew, isTrending) and automatically enriches every
 * one of them with the rich metadata the internal-linking engine needs:
 *
 *   tags, keywords, searchIntent, difficulty, popularityScore,
 *   isAI, featured, createdDate, updatedDate
 *
 * Crucially, NOTHING here is hand-authored per tool. Every field is derived
 * from the tool's existing text (slug + name + description + category) using
 * rule tables below. That means a brand-new tool dropped into
 * `src/data/tools.ts` is *automatically* tagged, scored, related and
 * clustered with zero manual wiring — the design goal for scaling from 100
 * to 10,000+ tools.
 *
 * Per-tool overrides are supported via `METADATA_OVERRIDES` for the rare case
 * where the automatic derivation needs a nudge, but they are never required.
 */

import { allTools, categories, popularTools, type Tool } from "@/data/tools";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type SearchIntent =
  "solve" | "generate" | "learn" | "analyze" | "lookup" | "write" | "improve";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type ToolMeta = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  categoryTitle: string;
  tags: string[];
  keywords: string[];
  searchIntent: SearchIntent;
  difficulty: Difficulty;
  popularityScore: number; // 0 – 100
  isAI: boolean;
  isNew: boolean;
  isTrending: boolean;
  featured: boolean;
  createdDate: string;
  updatedDate: string;
};

/* ------------------------------------------------------------------ */
/* Rule tables — the only thing to maintain, and only occasionally     */
/* ------------------------------------------------------------------ */

/**
 * A tag is attached to a tool when ANY of its trigger substrings appears in
 * the tool's searchable text. Add new tags/triggers here to influence
 * relatedness site-wide; every existing and future tool is re-evaluated
 * automatically.
 */
const TAG_RULES: Record<string, string[]> = {
  "word-game": [
    "scrabble",
    "wordle",
    "boggle",
    "hangman",
    "words with friends",
    "text twist",
    "word cookies",
    "wordscapes",
    "codycross",
    "wheel of fortune",
    "little words",
    "strands",
    "ladder",
    "game",
    "play",
  ],
  letters: [
    "letter",
    "letters",
    "character",
    "alphabet",
    "alphabetical",
    "consonant",
    "vowel",
    "sort",
    "repeated",
    "duplicate",
  ],
  anagram: ["anagram", "unscramble", "rearrange", "jumble", "scramble", "twist"],
  scrabble: ["scrabble", "words with friends", "tiles", "rack", "board"],
  crossword: ["crossword", "cody", "clue"],
  grammar: ["grammar", "passive", "active voice", "punctuation", "comma", "spell"],
  writing: [
    "synonym",
    "antonym",
    "rhyme",
    "rhyming",
    "syllable",
    "write",
    "writing",
    "sentence",
    "paragraph",
    "story",
    "poem",
    "essay",
    "prompt",
    "alliteration",
    "assonance",
    "twister",
  ],
  dictionary: [
    "dictionary",
    "meaning",
    "definition",
    "pronunciation",
    "ipa",
    "etymology",
    "origin",
    "phonetic",
  ],
  generator: ["generator", "generate", "random", "name"],
  education: [
    "quiz",
    "learn",
    "vocabulary",
    "spelling",
    "prefix",
    "suffix",
    "word of the day",
    "daily word",
    "flashcard",
    "study",
    "sight",
    "cvc",
    "dolch",
    "grade",
  ],
  solver: ["solver", "solve", "finder", "find", "cheat", "helper"],
  pattern: [
    "pattern",
    "wildcard",
    "missing letter",
    "contains",
    "containing",
    "starting with",
    "ending with",
    "positional",
  ],
  puzzle: [
    "puzzle",
    "cookies",
    "wordscapes",
    "codycross",
    "crossword",
    "riddle",
    "brain-teaser",
    "strands",
    "ladder",
  ],
  phonetics: ["pronunciation", "ipa", "phonetic", "syllable", "speech"],
  counter: ["counter", "count", "frequency", "analyze", "analysis"],
  name: [
    "name",
    "names",
    "knight",
    "robot",
    "alien",
    "witch",
    "demon",
    "vampire",
    "clan",
    "guild",
    "character",
  ],
};

/** Base tags guaranteed for every tool in a category. */
const CATEGORY_BASE_TAGS: Record<string, string[]> = {
  "word-solvers": ["solver", "word-game"],
  "letter-tools": ["letters", "pattern"],
  "writing-tools": ["writing"],
  "game-helpers": ["word-game", "solver"],
  "advanced-solvers": ["solver", "pattern"],
  "text-analysis": ["counter", "letters"],
  "dictionary-tools": ["dictionary"],
  "grammar-tools": ["grammar", "writing"],
  "puzzle-solvers": ["puzzle", "solver", "word-game"],
  "random-generators": ["generator"],
  "name-generators": ["generator", "name"],
  "word-quizzes": ["education"],
  "ai-tools": ["ai"],
};

/** Search intent derived per category (with AI-tool name refinement below). */
const CATEGORY_INTENT: Record<string, SearchIntent> = {
  "word-solvers": "solve",
  "letter-tools": "solve",
  "writing-tools": "write",
  "game-helpers": "solve",
  "advanced-solvers": "solve",
  "text-analysis": "analyze",
  "dictionary-tools": "lookup",
  "grammar-tools": "improve",
  "puzzle-solvers": "solve",
  "random-generators": "generate",
  "name-generators": "generate",
  "word-quizzes": "learn",
  "ai-tools": "generate",
};

const CATEGORY_DIFFICULTY: Record<string, Difficulty> = {
  "advanced-solvers": "advanced",
  "grammar-tools": "intermediate",
  "text-analysis": "intermediate",
  "dictionary-tools": "intermediate",
};

/** Optional per-tool nudges — never required, empty by default. */
const METADATA_OVERRIDES: Record<string, Partial<ToolMeta>> = {};

const STOPWORDS = new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "for",
  "with",
  "your",
  "any",
  "into",
  "from",
  "you",
  "get",
  "find",
  "tool",
  "free",
  "online",
  "words",
  "word",
  "of",
  "to",
  "in",
  "on",
  "by",
  "up",
  "new",
]);

/* ------------------------------------------------------------------ */
/* Derivation                                                          */
/* ------------------------------------------------------------------ */

const categoryTitleBySlug = new Map(categories.map((c) => [c.slug, c.title]));

function searchableText(tool: Tool): string {
  const catTitle = categoryTitleBySlug.get(tool.category) ?? "";
  return `${tool.slug} ${tool.name} ${tool.description} ${catTitle}`
    .toLowerCase()
    .replace(/-/g, " ");
}

function deriveTags(tool: Tool, text: string, isAI: boolean): string[] {
  const tags = new Set<string>(CATEGORY_BASE_TAGS[tool.category] ?? []);
  for (const [tag, triggers] of Object.entries(TAG_RULES)) {
    if (triggers.some((t) => text.includes(t))) tags.add(tag);
  }
  if (isAI) tags.add("ai");
  return [...tags];
}

function deriveKeywords(tool: Tool, tags: string[]): string[] {
  const kw = new Set<string>(tags);
  for (const token of tool.name
    .toLowerCase()
    .replace(/[^a-z\s]/g, " ")
    .split(/\s+/)) {
    if (token.length > 2 && !STOPWORDS.has(token)) kw.add(token);
  }
  return [...kw];
}

function deriveIntent(tool: Tool, text: string, isAI: boolean): SearchIntent {
  if (isAI) {
    if (/quiz|flashcard|vocabulary|explain/.test(text)) return "learn";
    if (/story|poem|sentence|example|generate/.test(text)) return "generate";
    return "generate";
  }
  return CATEGORY_INTENT[tool.category] ?? "solve";
}

function derivePopularity(tool: Tool): number {
  let score = 40;
  const rank = popularTools.indexOf(tool.slug);
  if (rank !== -1) score += 45 - rank * 3; // top of popular list scores highest
  if (tool.isTrending) score += 22;
  if (tool.isNew) score += 6;
  return Math.max(0, Math.min(100, score));
}

function enrich(tool: Tool): ToolMeta {
  const text = searchableText(tool);
  const isAI = tool.category === "ai-tools";
  const tags = deriveTags(tool, text, isAI);
  const meta: ToolMeta = {
    id: tool.slug,
    slug: tool.slug,
    name: tool.name,
    description: tool.description,
    category: tool.category,
    categoryTitle: categoryTitleBySlug.get(tool.category) ?? "",
    tags,
    keywords: deriveKeywords(tool, tags),
    searchIntent: deriveIntent(tool, text, isAI),
    difficulty: CATEGORY_DIFFICULTY[tool.category] ?? "beginner",
    popularityScore: derivePopularity(tool),
    isAI,
    isNew: Boolean(tool.isNew),
    isTrending: Boolean(tool.isTrending),
    featured: Boolean(tool.isTrending) || popularTools.includes(tool.slug),
    createdDate: tool.isNew ? "2026-06-01" : "2025-01-01",
    updatedDate: "2026-07-10",
  };
  return { ...meta, ...METADATA_OVERRIDES[tool.slug] };
}

/* ------------------------------------------------------------------ */
/* Public surface                                                      */
/* ------------------------------------------------------------------ */

/** Every tool, fully enriched — computed once at module load. */
export const toolMetaList: ToolMeta[] = allTools.map(enrich);

const metaBySlug = new Map(toolMetaList.map((m) => [m.slug, m]));

export function getToolMeta(slug: string): ToolMeta | undefined {
  return metaBySlug.get(slug);
}

/* ------------------------------------------------------------------ */
/* Relatedness scoring — the automatic relation algorithm             */
/* ------------------------------------------------------------------ */

/**
 * Weighted relevance score between two tools. Higher = more related.
 * Combines shared category, shared tags, shared keywords, matching search
 * intent, AI affinity, popularity and trending status. This single function
 * powers Related Tools, Users Also Used and Recommended Next across the site.
 */
export function relationScore(base: ToolMeta, candidate: ToolMeta): number {
  if (base.slug === candidate.slug) return -Infinity;

  let score = 0;
  if (base.category === candidate.category) score += 6;

  const baseTags = new Set(base.tags);
  const sharedTags = candidate.tags.filter((t) => baseTags.has(t)).length;
  score += sharedTags * 3;

  const baseKw = new Set(base.keywords);
  const sharedKw = candidate.keywords.filter((k) => baseKw.has(k)).length;
  score += sharedKw * 1.5;

  if (base.searchIntent === candidate.searchIntent) score += 2;
  if (base.isAI && candidate.isAI) score += 2;

  score += candidate.popularityScore / 50; // gentle popularity tiebreak (≤ 2)
  if (candidate.isTrending) score += 0.5;

  return score;
}

/**
 * Rank all other tools by relevance to `slug`. Optional `boost` slugs (e.g.
 * hand-curated associations) are floated to the top without discarding the
 * automatic ordering. Returns slugs, most-relevant first.
 */
export function rankRelated(
  slug: string,
  opts: { boost?: string[]; sameCategoryOnly?: boolean; crossCategoryOnly?: boolean } = {},
): string[] {
  const base = getToolMeta(slug);
  if (!base) return [];
  const boost = new Set(opts.boost ?? []);

  return toolMetaList
    .filter((m) => {
      if (m.slug === slug) return false;
      if (opts.sameCategoryOnly && m.category !== base.category) return false;
      if (opts.crossCategoryOnly && m.category === base.category) return false;
      return true;
    })
    .map((m) => ({
      slug: m.slug,
      score: relationScore(base, m) + (boost.has(m.slug) ? 1000 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .map((x) => x.slug);
}
