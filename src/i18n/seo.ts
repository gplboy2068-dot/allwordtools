// ============================================================================
// Per-locale SEO helpers — hreflang, canonical, Open Graph & JSON-LD language.
//
// Every localized route calls buildLocaleHead() so that:
//  • canonical + og:url self-reference the CURRENT locale's URL,
//  • <link rel="alternate" hreflang="..."> is emitted for EVERY enabled locale
//    plus x-default -> English,
//  • og:locale / html lang reflect the active language.
//
// Paths are absolute and prefixed with the production domain.
// ============================================================================

import { DEFAULT_LOCALE, enabledLocales, getLocale } from "./locales";
import { localePath } from "./paths";

export const BASE_URL = "https://www.allwordtools.com";

/** Centralized canonical URL builder ensuring www production domain and normalized path. */
export function getCanonicalUrl(path: string, locale: string = DEFAULT_LOCALE): string {
  const cfg = getLocale(locale) ?? getLocale(DEFAULT_LOCALE)!;
  return `${BASE_URL}${localePath(cfg.code, path)}`;
}

export interface LocaleHeadInput {
  /** Locale-agnostic app path, e.g. "/tool/word-unscrambler" or "/". */
  path: string;
  locale: string;
  title: string;
  description: string;
  /** Absolute https URL of a share image (optional). */
  image?: string;
  /** og:type — "website" (default) or "article" etc. */
  type?: string;
  keywords?: string;
  robots?: string;
}

export interface HeadMeta {
  title?: string;
  name?: string;
  property?: string;
  content?: string;
}
export interface HeadLink {
  rel: string;
  href: string;
  hrefLang?: string;
}

/**
 * Pages that exist ONLY in English for now (2026-10-30): their locale URLs
 * serve the English body, so — exactly like the blog — they must not claim
 * to be translations. buildLocaleHead gives their locale URLs an English
 * canonical + "noindex, follow", and hreflang for these paths (on every
 * locale, including English) lists only en + x-default. Remove a path from
 * this set once its content is genuinely translated (as /about was).
 */
export const ENGLISH_ONLY_PATHS = new Set([
  "/learn",
  "/about/firoz-khan",
  "/methodology",
  "/data-sources",
  "/data-limitations",
  "/ai-tools",
  "/report-error",
  "/contact",
  "/privacy",
  "/terms",
  "/cookie-policy",
  "/disclaimer",
  "/dmca",
]);

export function isEnglishOnlyPath(path: string): boolean {
  return ENGLISH_ONLY_PATHS.has(path);
}

/** hreflang alternates for a path across all enabled locales (+ x-default). */
export function hreflangLinks(path: string): HeadLink[] {
  if (isEnglishOnlyPath(path)) {
    const en = `${BASE_URL}${localePath(DEFAULT_LOCALE, path)}`;
    return [
      { rel: "alternate", hrefLang: "en", href: en },
      { rel: "alternate", hrefLang: "x-default", href: en },
    ];
  }
  const links: HeadLink[] = enabledLocales().map((l) => ({
    rel: "alternate",
    hrefLang: l.code,
    href: `${BASE_URL}${localePath(l.code, path)}`,
  }));
  links.push({ rel: "alternate", hrefLang: "x-default", href: `${BASE_URL}${localePath(DEFAULT_LOCALE, path)}` });
  return links;
}

export function buildLocaleHead(input: LocaleHeadInput): {
  meta: HeadMeta[];
  links: HeadLink[];
} {
  const cfg = getLocale(input.locale) ?? getLocale(DEFAULT_LOCALE)!;
  const englishOnly = isEnglishOnlyPath(input.path);
  const isLocaleCopy = englishOnly && cfg.code !== DEFAULT_LOCALE;
  // Untranslated locale copies canonicalize to the English URL.
  const url = isLocaleCopy
    ? `${BASE_URL}${localePath(DEFAULT_LOCALE, input.path)}`
    : `${BASE_URL}${localePath(cfg.code, input.path)}`;

  const meta: HeadMeta[] = [
    { title: input.title },
    { name: "description", content: input.description },
    {
      name: "robots",
      content: isLocaleCopy ? "noindex, follow" : (input.robots ?? "index, follow"),
    },
    { property: "og:title", content: input.title },
    { property: "og:description", content: input.description },
    { property: "og:type", content: input.type ?? "website" },
    { property: "og:url", content: url },
    { property: "og:site_name", content: "AllWordTools.com" },
    { property: "og:locale", content: cfg.ogLocale },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: input.title },
    { name: "twitter:description", content: input.description },
  ];

  // og:locale:alternate for the other enabled locales.
  for (const l of enabledLocales()) {
    if (l.code !== cfg.code) {
      meta.push({ property: "og:locale:alternate", content: l.ogLocale });
    }
  }

  if (input.keywords) meta.push({ name: "keywords", content: input.keywords });
  if (input.image) {
    meta.push({ property: "og:image", content: input.image });
    meta.push({ name: "twitter:image", content: input.image });
  }

  const links: HeadLink[] = [{ rel: "canonical", href: url }, ...hreflangLinks(input.path)];

  return { meta, links };
}

/** JSON-LD language tag helper. */
export function inLanguage(locale: string): string {
  return getLocale(locale)?.intl ?? "en-US";
}
