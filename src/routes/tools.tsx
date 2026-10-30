import { useMemo, useState } from "react";
import { createFileRoute, Link, useLocation } from "@tanstack/react-router";
import { uiText } from "@/i18n/ui-template";
import { ChevronRight, Home, Search, X } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ToolCard } from "@/components/site/ToolCard";
import { KeywordClusters, BottomCta } from "@/components/site/LinkSections";
import { Button } from "@/components/ui/button";
import { allTools, categories } from "@/data/tools";
import { buildLocaleHead, BASE_URL } from "@/i18n/seo";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import { useI18n } from "@/i18n/I18nProvider";
import { getLocalizedCategory } from "@/i18n/categories";
import { getLocalizedToolInfo } from "@/i18n/tools-data";

const SITE = "AllWordTools.com";
export const TITLE = `All Word Tools — Browse Every Tool by Category | ${SITE}`;
export const DESCRIPTION =
  "Browse every AllWordTools tool in one place. Search and filter 92 free word game solvers, letter tools, writing aids, AI tools and more, grouped by 13 categories.";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "All Word Tools",
  description: DESCRIPTION,
  url: `${BASE_URL}/tools`,
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: allTools.length,
    itemListElement: allTools.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      url: `${BASE_URL}/tool/${t.slug}`,
    })),
  },
};

export const Route = createFileRoute("/tools")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  head: () => {
    const { meta, links } = buildLocaleHead({
      path: "/tools",
      locale: DEFAULT_LOCALE,
      title: TITLE,
      description: DESCRIPTION,
    });
    return {
      meta,
      links,
      scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
    };
  },
  component: ToolsPage,
});

export function ToolsPage() {
  const { locale } = useI18n();
  // Root cause of the broken /hi/tools and /es/tools pages (2026-10-30):
  // this component previously called Route.useSearch() from the ENGLISH
  // "/tools" route. Rendered inside the "/$locale/tools" route, that hook
  // has no matching route in context and throws, so every locale /tools
  // page crashed while English worked. Read the raw query string from the
  // location instead — it works identically under both routes, SSR + client.
  const location = useLocation();
  const initialQ = new URLSearchParams(location.searchStr || "").get("q") || "";
  const isDefault = locale === DEFAULT_LOCALE;
  const [query, setQuery] = useState(initialQ);
  const [active, setActive] = useState<string>("all");

  const q = query.trim().toLowerCase();

  const visibleCategories = useMemo(() => {
    return categories
      .filter((cat) => active === "all" || cat.slug === active)
      .map((cat) => ({
        ...cat,
        tools: q
          ? cat.tools.filter((t) => {
              const loc = getLocalizedToolInfo(t, locale);
              return (
                t.name.toLowerCase().includes(q) ||
                t.description.toLowerCase().includes(q) ||
                loc.name.toLowerCase().includes(q) ||
                loc.description.toLowerCase().includes(q)
              );
            })
          : cat.tools,
      }))
      .filter((cat) => cat.tools.length > 0);
  }, [q, active, locale]);

  const resultCount = visibleCategories.reduce((n, c) => n + c.tools.length, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="gradient-hero border-b border-border/60">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <li>
                  <Link
                    to={isDefault ? "/" : "/$locale/"}
                    params={isDefault ? {} : { locale }}
                    className="inline-flex items-center gap-1 hover:text-foreground"
                  >
                    <Home className="h-3.5 w-3.5" /> {uiText(locale, "toolsPage.home", "Home")}
                  </Link>
                </li>
                <ChevronRight className="h-3.5 w-3.5" />
                <li className="font-medium text-foreground">{uiText(locale, "toolsPage.allTools", "All Tools")}</li>
              </ol>
            </nav>

            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              {uiText(locale, "toolsPage.heading", "All Word Tools")}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {uiText(
                locale,
                "toolsPage.subheading",
                "Every one of our {count} free tools, grouped by category. Search, filter and jump straight to the tool you need.",
              ).replace("{count}", String(allTools.length))}
            </p>

            {/* Search */}
            <div className="relative mt-8 max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={uiText(locale, "toolsPage.searchPlaceholder", "Search tools by name or description…")}
                aria-label={uiText(locale, "toolsPage.searchLabel", "Search tools")}
                className="h-14 w-full rounded-full border border-border bg-card pl-12 pr-12 text-base shadow-soft outline-none transition-colors placeholder:text-muted-foreground focus:border-honey focus:ring-2 focus:ring-honey/30"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label={uiText(locale, "toolsPage.clearSearch", "Clear search")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Filters */}
        <div className="sticky top-16 z-30 border-b border-border/60 bg-background/85 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2">
              <FilterChip
                label={uiText(locale, "toolsPage.allToolsChip", "All tools")}
                activeState={active === "all"}
                onClick={() => setActive("all")}
              />
              {categories.map((cat) => {
                const locCat = getLocalizedCategory(cat, locale);
                return (
                  <FilterChip
                    key={cat.slug}
                    label={locCat.title}
                    activeState={active === cat.slug}
                    onClick={() => setActive(cat.slug)}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Results */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="mb-8 text-sm text-muted-foreground">
            {uiText(locale, "toolsPage.showing", "Showing")}{" "}
            <span className="font-semibold text-foreground">{resultCount}</span>{" "}
            {resultCount === 1
              ? uiText(locale, "toolsPage.tool", "tool")
              : uiText(locale, "toolsPage.tools", "tools")}
            {q ? ` ${uiText(locale, "toolsPage.for", "for")} “${query}”` : ""}.
          </p>

          {visibleCategories.length === 0 ? (
            <div className="rounded-3xl border border-border/70 bg-card p-12 text-center">
              <p className="font-display text-xl font-semibold">{uiText(locale, "toolsPage.noToolsFound", "No tools found")}</p>
              <p className="mt-2 text-muted-foreground">
                {uiText(locale, "toolsPage.tryDifferent", "Try a different search term or clear your filters.")}
              </p>
              <Button
                variant="outline"
                className="mt-5 rounded-full"
                onClick={() => {
                  setQuery("");
                  setActive("all");
                }}
              >
                {uiText(locale, "toolsPage.resetFilters", "Reset filters")}
              </Button>
            </div>
          ) : (
            <div className="space-y-14">
              {visibleCategories.map((cat) => {
                const Icon = cat.icon;
                const locCat = getLocalizedCategory(cat, locale);
                return (
                  <div key={cat.slug} id={cat.slug} className="scroll-mt-32">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h2 className="flex items-center gap-3 font-display text-2xl font-semibold tracking-tight">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl gradient-ink text-primary-foreground">
                          <Icon className="h-5 w-5" />
                        </span>
                        {locCat.title}
                        <span className="text-sm font-normal text-muted-foreground">
                          ({cat.tools.length})
                        </span>
                      </h2>
                      <Link
                        to={isDefault ? "/category/$category" : "/$locale/category/$category"}
                        params={isDefault ? { category: cat.slug } : { locale, category: cat.slug }}
                        className="text-sm font-semibold text-honey hover:underline"
                      >
                        {uiText(locale, "toolsPage.viewCategory", "View category →")}
                      </Link>
                    </div>
                    <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {cat.tools.map((tool) => (
                        <ToolCard key={tool.slug} tool={tool} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <KeywordClusters />
        <BottomCta />
      </main>
      <Footer />
    </div>
  );
}

function FilterChip({
  label,
  activeState,
  onClick,
}: {
  label: string;
  activeState: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={
        activeState
          ? "rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground"
          : "rounded-full border border-border/70 bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-honey/50 hover:text-foreground"
      }
    >
      {label}
    </button>
  );
}
