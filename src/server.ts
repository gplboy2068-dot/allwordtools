import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

// Near-duplicate tool pairs canonicalized with 301 redirects (2026-10-30):
// these slugs duplicated a canonical tool's behaviour and content —
// daily-word rendered the identical WordOfTheDay component (same word every
// day), opposite-words used the identical antonym mode as antonym-finder,
// and similar-words overlapped synonym-finder's thesaurus job.
// CodyCross Solver vs CodyCross Answers are NOT redirected: they are distinct
// tools (known-letter pattern solver vs clue/answer database search).
const TOOL_REDIRECTS: Record<string, string> = {
  "daily-word": "word-of-the-day",
  "similar-words": "synonym-finder",
  "opposite-words": "antonym-finder",
};

function toolRedirect(request: Request): Response | null {
  if (request.method !== "GET" && request.method !== "HEAD") return null;
  const url = new URL(request.url);
  const match = url.pathname.match(/^(?:\/([a-z]{2}))?\/tool\/([a-z0-9-]+)\/?$/);
  if (!match) return null;
  const target = TOOL_REDIRECTS[match[2]];
  if (!target) return null;
  const prefix = match[1] ? `/${match[1]}` : "";
  url.pathname = `${prefix}/tool/${target}`;
  return new Response(null, {
    status: 301,
    headers: { Location: url.toString(), "Cache-Control": "public, max-age=3600" },
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const redirect = toolRedirect(request);
    if (redirect) return redirect;
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
