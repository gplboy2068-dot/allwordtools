/**
 * Cloudflare D1 Database Client & Fallback Layer
 *
 * In Cloudflare Pages / Workers environment, connects to the bound `DB` (D1).
 * In local development or static builds, falls back gracefully to JSON/data files.
 */

export interface D1Database {
  prepare: (query: string) => D1PreparedStatement;
  batch: (statements: D1PreparedStatement[]) => Promise<D1Result[]>;
  exec: (query: string) => Promise<D1ExecResult>;
}

export interface D1PreparedStatement {
  bind: (...values: any[]) => D1PreparedStatement;
  first: <T = unknown>(colName?: string) => Promise<T | null>;
  run: () => Promise<D1Result>;
  all: <T = unknown>() => Promise<D1Result<T>>;
}

export interface D1Result<T = unknown> {
  results?: T[];
  success: boolean;
  error?: string;
  meta?: any;
}

export interface D1ExecResult {
  count: number;
  duration: number;
}

// Global accessor for Cloudflare bindings
declare global {
  var __env: { DB?: D1Database; KV?: any } | undefined;
}

export function getD1(): D1Database | null {
  // @ts-ignore
  if (typeof process !== "undefined" && process.env?.DB) {
    // @ts-ignore
    return process.env.DB;
  }
  // @ts-ignore
  if (typeof globalThis !== "undefined" && (globalThis as any).DB) {
    return (globalThis as any).DB;
  }
  // @ts-ignore
  if (typeof globalThis !== "undefined" && (globalThis as any).__env?.DB) {
    return (globalThis as any).__env.DB;
  }
  return null;
}

/** Check if D1 database is actively connected in the current runtime */
export function isD1Connected(): boolean {
  return getD1() !== null;
}

/** Get localized tool from D1 or fallback */
export async function getToolFromDb(slug: string, locale: string = "en") {
  const db = getD1();
  if (db) {
    try {
      const stmt = db
        .prepare(
          `SELECT t.*, tt.name as loc_name, tt.meta_title, tt.meta_description, tt.heading, tt.subheading,
                  tt.intro_json, tt.howto_title, tt.howto_steps_json, tt.sections_json, tt.examples_json,
                  tt.tips_json, tt.faqs_json
           FROM tools t
           LEFT JOIN tool_translations tt ON t.slug = tt.tool_slug AND tt.locale = ?
           WHERE t.slug = ?`,
        )
        .bind(locale, slug);
      const res = await stmt.first<any>();
      if (res) return res;
    } catch (err) {
      console.warn("D1 query failed, falling back to static files:", err);
    }
  }
  return null;
}

/** Save or update tool translation in D1 */
export async function saveToolToDb(slug: string, locale: string, content: any): Promise<boolean> {
  const db = getD1();
  if (!db) return false;
  try {
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO tool_translations (
        tool_slug, locale, name, meta_title, meta_description, eyebrow, heading, subheading,
        intro_json, howto_title, howto_steps_json, sections_json, examples_json, tips_json, faqs_json, search_intent, keywords_json, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).bind(
      slug,
      locale,
      content.name || "",
      content.metaTitle || "",
      content.metaDescription || "",
      content.eyebrow || "",
      content.heading || "",
      content.subheading || "",
      JSON.stringify(content.intro || []),
      content.howToTitle || "",
      JSON.stringify(content.howToSteps || []),
      JSON.stringify(content.sections || []),
      JSON.stringify(content.examples || []),
      JSON.stringify(content.tips || []),
      JSON.stringify(content.faqs || []),
      content.searchIntent || "",
      JSON.stringify(content.keywords || []),
    );
    await stmt.run();
    return true;
  } catch (err) {
    console.error("Failed to write to D1:", err);
    return false;
  }
}
