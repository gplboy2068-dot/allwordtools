// ============================================================================
// Localized content model — the CMS-ready seam.
//
// English content lives in src/data/* . This layer lets any language provide
// its OWN native, market-researched content — meta title/description tuned to
// LOCAL keywords, native search intent, localized FAQs, intro, how-to steps,
// long-form sections, and examples that use that language's real words.
//
// Content is authored PER LOCALE in src/i18n/content/tools/<code>.json and
// loaded lazily (code-split) so a page only ever ships the language it needs.
// Any field a locale hasn't authored falls back to the English source, so the
// site is never broken and adding a language's content requires ZERO code
// changes — only data (a JSON file a future admin panel / CMS writes into).
// ============================================================================

import { DEFAULT_LOCALE } from "./locales";
import type { ToolContent } from "@/data/tool-content";

/**
 * A locale's override for a single tool. Every field is optional — whatever is
 * present replaces the English source; whatever is missing falls back to it.
 * `searchIntent` + `keywords` document the local research behind the copy (used
 * by SEO tooling and future CMS surfaces, not rendered directly).
 */
export interface LocalizedToolContent {
  metaTitle?: string;
  metaDescription?: string;
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  quickAnswer?: string;
  intro?: string[];
  howToTitle?: string;
  howToSteps?: { title: string; detail: string }[];
  sections?: { heading: string; paragraphs: string[] }[];
  examples?: { input: string; output: string; note: string }[];
  tips?: string[];
  faqs?: { question: string; answer: string }[];
  /** The dominant local search intent this page targets (informational, etc.). */
  searchIntent?: string;
  /** Native, market-specific keywords the copy is written around. */
  keywords?: string[];
}

export interface LocalizedCategoryContent {
  title?: string;
  description?: string;
  intro?: string;
  faqs?: { question: string; answer: string }[];
}

type LocaleToolMap = Record<string, LocalizedToolContent>;

// One code-split JSON per locale. English needs none (it IS the source).
const TOOL_LOADERS: Record<string, () => Promise<{ default: LocaleToolMap }>> = {
  es: () => import("./content/tools/es.json") as unknown as Promise<{ default: LocaleToolMap }>,
  hi: () => import("./content/tools/hi.json") as unknown as Promise<{ default: LocaleToolMap }>,
  ar: () => import("./content/tools/ar.json") as unknown as Promise<{ default: LocaleToolMap }>,
  de: () => import("./content/tools/de.json") as unknown as Promise<{ default: LocaleToolMap }>,
  pt: () => import("./content/tools/pt.json") as unknown as Promise<{ default: LocaleToolMap }>,
  id: () => import("./content/tools/id.json") as unknown as Promise<{ default: LocaleToolMap }>,
  ru: () => import("./content/tools/ru.json") as unknown as Promise<{ default: LocaleToolMap }>,
};

const toolCache = new Map<string, LocaleToolMap>();

/** Load (and cache) a locale's full tool-content map. English -> empty. */
export async function loadLocaleToolContent(locale: string): Promise<LocaleToolMap> {
  const code = locale.toLowerCase();
  if (code === DEFAULT_LOCALE) return {};
  const cached = toolCache.get(code);
  if (cached) return cached;
  const loader = TOOL_LOADERS[code];
  if (!loader) return {};
  try {
    const mod = await loader();
    toolCache.set(code, mod.default ?? {});
    return mod.default ?? {};
  } catch {
    return {};
  }
}

/** Localized override for one tool in one locale (null when none authored). */
export async function getLocalizedTool(
  slug: string,
  locale: string,
): Promise<LocalizedToolContent | null> {
  if (locale === DEFAULT_LOCALE) return null;
  const map = await loadLocaleToolContent(locale);
  return map[slug] ?? null;
}

/** Merge a locale override over the English base (override wins field-by-field). */
export function mergeToolContent(
  base: ToolContent | undefined,
  override: LocalizedToolContent | null | undefined,
): (ToolContent & LocalizedToolContent) | undefined {
  if (!base) return base;
  if (!override) return base;
  return { ...base, ...override };
}

// ---------------------------------------------------------------------------
// Category overrides (kept in-code for now; same fallback contract).
// ---------------------------------------------------------------------------
const CATEGORY_OVERRIDES: Record<string, Record<string, LocalizedCategoryContent>> = {
  // es: { "word-games": { title: "Juegos de palabras", description: "…" } },
};

export function getLocalizedCategoryContent<T extends object>(
  slug: string,
  locale: string,
  base: T,
): T & LocalizedCategoryContent {
  if (locale === DEFAULT_LOCALE) return base as T & LocalizedCategoryContent;
  const override = CATEGORY_OVERRIDES[locale]?.[slug];
  return override ? { ...base, ...override } : (base as T & LocalizedCategoryContent);
}

/** Whether a locale has any authored tool content (useful for reporting). */
export async function hasLocalizedToolContent(locale: string): Promise<boolean> {
  const map = await loadLocaleToolContent(locale);
  return Object.keys(map).length > 0;
}
