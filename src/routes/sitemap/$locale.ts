import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { categories, allTools } from "@/data/tools";
import { enabledLocales, getLocale } from "@/i18n/locales";
import { localePath } from "@/i18n/paths";
import { BASE_URL } from "@/i18n/seo";

interface Entry {
  path: string;
  changefreq: "weekly" | "monthly" | "yearly";
  priority: string;
}

// The locale-agnostic list of indexable app paths.
function appPaths(): Entry[] {
  return [
    { path: "/", changefreq: "weekly", priority: "1.0" },
    { path: "/tools", changefreq: "weekly", priority: "0.9" },
    { path: "/learn", changefreq: "weekly", priority: "0.7" },
    { path: "/blog", changefreq: "weekly", priority: "0.6" },
    { path: "/about", changefreq: "yearly", priority: "0.4" },
    { path: "/about/firoz-khan", changefreq: "monthly", priority: "0.5" },
    { path: "/methodology", changefreq: "monthly", priority: "0.5" },
    { path: "/data-sources", changefreq: "monthly", priority: "0.5" },
    { path: "/data-limitations", changefreq: "monthly", priority: "0.5" },
    { path: "/ai-tools", changefreq: "monthly", priority: "0.5" },
    { path: "/report-error", changefreq: "monthly", priority: "0.5" },
    { path: "/contact", changefreq: "yearly", priority: "0.4" },
    { path: "/privacy", changefreq: "yearly", priority: "0.3" },
    { path: "/terms", changefreq: "yearly", priority: "0.3" },
    { path: "/cookie-policy", changefreq: "yearly", priority: "0.3" },
    { path: "/disclaimer", changefreq: "yearly", priority: "0.3" },
    { path: "/dmca", changefreq: "yearly", priority: "0.3" },
    ...categories.map((c) => ({
      path: `/category/${c.slug}`,
      changefreq: "weekly" as const,
      priority: "0.8",
    })),
    ...allTools.map((t) => ({
      path: `/tool/${t.slug}`,
      changefreq: "monthly" as const,
      priority: "0.7",
    })),
  ];
}

// Per-locale sitemap with hreflang alternates on every URL. Served at
// /sitemap/<locale> (XML content-type; referenced from the sitemap index).
export const Route = createFileRoute("/sitemap/$locale")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const localeCode = params.locale.replace(/\.xml$/, "");
        const cfg = getLocale(localeCode);
        if (!cfg || !cfg.enabled) {
          return new Response("Not found", { status: 404 });
        }

        const locales = enabledLocales();
        const urls = appPaths().map((e) => {
          const alternates = [
            ...locales.map(
              (l) =>
                `    <xhtml:link rel="alternate" hreflang="${l.code}" href="${BASE_URL}${localePath(l.code, e.path)}"/>`,
            ),
            `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${localePath("en", e.path)}"/>`,
          ].join("\n");

          return [
            `  <url>`,
            `    <loc>${BASE_URL}${localePath(cfg.code, e.path)}</loc>`,
            `    <changefreq>${e.changefreq}</changefreq>`,
            `    <priority>${e.priority}</priority>`,
            alternates,
            `  </url>`,
          ].join("\n");
        });

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
