/**
 * Universal AI API Key & Gateway Configuration
 *
 * Supports Node.js, Cloudflare Workers, Cloudflare Pages, Nitro runtime,
 * Vite development, and fallback environments.
 */

export function getAiApiKey(): string | undefined {
  // 1. Check Node.js process.env first
  if (typeof process !== "undefined" && process.env) {
    if (process.env.DEEPSEEK_API_KEY) return process.env.DEEPSEEK_API_KEY;
    if (process.env.VITE_DEEPSEEK_API_KEY) return process.env.VITE_DEEPSEEK_API_KEY;
    if (process.env.AI_API_KEY) return process.env.AI_API_KEY;
    if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  }

  // 2. Check Cloudflare Worker / Nitro global bindings (__env__, __env, env)
  if (typeof globalThis !== "undefined") {
    const g = globalThis as any;

    // Sync Cloudflare Worker env to process.env if available
    const cfEnv = g.__env__ || g.__env || g.env;
    if (cfEnv && typeof process !== "undefined" && process.env) {
      try {
        for (const [k, v] of Object.entries(cfEnv)) {
          if (typeof v === "string" && !process.env[k]) {
            process.env[k] = v;
          }
        }
      } catch {}
    }

    if (g.__env__?.DEEPSEEK_API_KEY) return g.__env__.DEEPSEEK_API_KEY;
    if (g.__env__?.VITE_DEEPSEEK_API_KEY) return g.__env__.VITE_DEEPSEEK_API_KEY;
    if (g.__env?.DEEPSEEK_API_KEY) return g.__env.DEEPSEEK_API_KEY;
    if (g.__env?.VITE_DEEPSEEK_API_KEY) return g.__env.VITE_DEEPSEEK_API_KEY;
    if (g.DEEPSEEK_API_KEY && typeof g.DEEPSEEK_API_KEY === "string") return g.DEEPSEEK_API_KEY;
    if (g.env?.DEEPSEEK_API_KEY) return g.env.DEEPSEEK_API_KEY;

    // Fallbacks
    if (g.__env__?.AI_API_KEY) return g.__env__.AI_API_KEY;
    if (g.__env__?.GEMINI_API_KEY) return g.__env__.GEMINI_API_KEY;
    if (g.__env?.GEMINI_API_KEY) return g.__env.GEMINI_API_KEY;
    if (g.GEMINI_API_KEY && typeof g.GEMINI_API_KEY === "string") return g.GEMINI_API_KEY;
  }

  // 3. Check Vite / client import.meta.env
  try {
    if (typeof import.meta !== "undefined" && (import.meta as any).env) {
      const env = (import.meta as any).env;
      if (env.DEEPSEEK_API_KEY) return env.DEEPSEEK_API_KEY;
      if (env.VITE_DEEPSEEK_API_KEY) return env.VITE_DEEPSEEK_API_KEY;
      if (env.AI_API_KEY) return env.AI_API_KEY;
      if (env.GEMINI_API_KEY) return env.GEMINI_API_KEY;
    }
  } catch {}

  return undefined;
}
