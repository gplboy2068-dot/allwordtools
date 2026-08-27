import { createServerFn } from "@tanstack/react-start";
import { getD1, isD1Connected } from "@/lib/db";
import { allTools, categories } from "@/data/tools";

export interface DbStatusResponse {
  connected: boolean;
  type: "cloudflare_d1" | "file_fallback";
  toolsCount: number;
  categoriesCount: number;
  translationsCount: number;
  latencyMs: number;
  message: string;
}

export const checkDbStatus = createServerFn({ method: "GET" }).handler(
  async (): Promise<DbStatusResponse> => {
    const start = Date.now();
    const db = getD1();

    if (db) {
      try {
        const toolsRes = await db.prepare("SELECT count(*) as count FROM tools").first<{ count: number }>();
        const catRes = await db.prepare("SELECT count(*) as count FROM categories").first<{ count: number }>();
        const transRes = await db.prepare("SELECT count(*) as count FROM tool_translations").first<{ count: number }>();

        const latencyMs = Date.now() - start;

        return {
          connected: true,
          type: "cloudflare_d1",
          toolsCount: toolsRes?.count ?? 0,
          categoriesCount: catRes?.count ?? 0,
          translationsCount: transRes?.count ?? 0,
          latencyMs,
          message: `Connected to Cloudflare D1 SQL Database (${latencyMs}ms response time).`,
        };
      } catch (err: any) {
        return {
          connected: false,
          type: "cloudflare_d1",
          toolsCount: 0,
          categoriesCount: 0,
          translationsCount: 0,
          latencyMs: Date.now() - start,
          message: `Cloudflare D1 error: ${err.message || String(err)}`,
        };
      }
    }

    return {
      connected: false,
      type: "file_fallback",
      toolsCount: allTools.length,
      categoriesCount: categories.length,
      translationsCount: allTools.length * 7,
      latencyMs: Date.now() - start,
      message: "Using Static File Storage (D1 binding not detected in current environment).",
    };
  },
);
