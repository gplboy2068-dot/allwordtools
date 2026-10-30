import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Flame, LayoutGrid, Search, Star, Sparkles } from "lucide-react";
import {
  getPopularTools,
  getRecentlyAddedTools,
  getTrendingTools,
  getAiTools,
  topSearchLinks,
  categories,
} from "@/lib/internal-links";
import { useI18n } from "@/i18n/I18nProvider";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import { uiText } from "@/i18n/ui-template";
import { getLocalizedToolInfo } from "@/i18n/tools-data";
import { getLocalizedCategory } from "@/i18n/categories";

interface ColDef {
  title: string;
  icon: React.ReactNode;
  type: "tools" | "categories" | "keywordLinks";
  items: any[];
}

/**
 * The "sidebar" content — rendered as a responsive band so it works within
 * the existing single-column tool layout without a UI redesign. Surfaces
 * Popular Tools, Recently Added, Trending, Categories and Top Searches so
 * no tool page is ever an orphan.
 */
export function DiscoverMore({ excludeSlug }: { excludeSlug?: string }) {
  const { locale } = useI18n();
  const isDefault = locale === DEFAULT_LOCALE;
  const isCodyCrossAnswers = excludeSlug === "codycross-answers";

  const popularHelpers = categories.find((c) => c.slug === "game-helpers")?.tools.slice(0, 5) ?? [];
  const trendingPuzzles = categories.find((c) => c.slug === "puzzle-solvers")?.tools.filter((t) => t.isTrending && t.slug !== excludeSlug).slice(0, 5) ?? [];
  const recentTools = getRecentlyAddedTools(6).filter((t) => t.slug !== excludeSlug).slice(0, 5);
  const aiToolsList = getAiTools(6).slice(0, 5);

  const colDef: ColDef[] = isCodyCrossAnswers
    ? [
        {
          title: uiText(locale, "discover.popularGameHelpers", "Popular Game Helpers"),
          icon: <Star className="h-4 w-4 text-honey" />,
          type: "tools",
          items: popularHelpers,
        },
        {
          title: uiText(locale, "discover.trendingPuzzleTools", "Trending Puzzle Tools"),
          icon: <Flame className="h-4 w-4 text-honey" />,
          type: "tools",
          items: trendingPuzzles,
        },
        {
          title: uiText(locale, "discover.recentlyAdded", "Recently Added"),
          icon: <Clock className="h-4 w-4 text-honey" />,
          type: "tools",
          items: recentTools,
        },
        {
          title: uiText(locale, "discover.aiTools", "AI Tools"),
          icon: <Sparkles className="h-4 w-4 text-honey" />,
          type: "tools",
          items: aiToolsList,
        },
        {
          title: uiText(locale, "discover.browseCategories", "Browse Categories"),
          icon: <LayoutGrid className="h-4 w-4 text-honey" />,
          type: "categories",
          items: categories.slice(0, 5),
        },
      ]
    : [
        {
          title: uiText(locale, "discover.popularTools", "Popular Tools"),
          icon: <Star className="h-4 w-4 text-honey" />,
          type: "tools",
          items: getPopularTools(6).filter((t) => t.slug !== excludeSlug).slice(0, 5),
        },
        {
          title: uiText(locale, "discover.recentlyAdded", "Recently Added"),
          icon: <Clock className="h-4 w-4 text-honey" />,
          type: "tools",
          items: getRecentlyAddedTools(6).filter((t) => t.slug !== excludeSlug).slice(0, 5),
        },
        {
          title: uiText(locale, "discover.trending", "Trending"),
          icon: <Flame className="h-4 w-4 text-honey" />,
          type: "tools",
          items: getTrendingTools(6).filter((t) => t.slug !== excludeSlug).slice(0, 5),
        },
        {
          title: uiText(locale, "discover.categories", "Categories"),
          icon: <LayoutGrid className="h-4 w-4 text-honey" />,
          type: "categories",
          items: categories.slice(0, 5),
        },
        {
          title: uiText(locale, "discover.topSearches", "Top Searches"),
          icon: <Search className="h-4 w-4 text-honey" />,
          type: "keywordLinks",
          items: topSearchLinks.slice(0, 6),
        },
      ];

  const linkCls =
    "inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-honey";

  return (
    <section
      aria-labelledby="discover-more"
      className="border-t border-border/60 bg-secondary/30 py-14"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <span className="text-sm font-semibold uppercase tracking-wider text-honey">
          {uiText(locale, "discover.discoverMore", "Discover more")}
        </span>
        <h2
          id="discover-more"
          className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          {uiText(locale, "discover.handyShortcuts", "Handy shortcuts across the site")}
        </h2>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {colDef.map((col) => (
            <div key={col.title}>
              <h3 className="flex items-center gap-2 font-display text-sm font-semibold">
                {col.icon} {col.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {col.type === "tools" &&
                  col.items.map((t: any) => (
                    <li key={t.slug}>
                      <Link
                        to={isDefault ? "/tool/$tool" : "/$locale/tool/$tool"}
                        params={isDefault ? { tool: t.slug } : { locale, tool: t.slug }}
                        className={linkCls}
                      >
                        {getLocalizedToolInfo(t, locale).name}
                      </Link>
                    </li>
                  ))}
                {col.type === "categories" && (
                  <>
                    {col.items.map((c: any) => (
                      <li key={c.slug}>
                        <Link
                          to={isDefault ? "/category/$category" : "/$locale/category/$category"}
                          params={isDefault ? { category: c.slug } : { locale, category: c.slug }}
                          className={linkCls}
                        >
                          {getLocalizedCategory(c, locale).title}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        to={isDefault ? "/tools" : "/$locale/tools"}
                        params={isDefault ? {} : { locale }}
                        className="text-sm font-semibold text-honey hover:underline"
                      >
                        {uiText(locale, "discover.viewAllTools", "View all tools →")}
                      </Link>
                    </li>
                  </>
                )}
                {col.type === "keywordLinks" &&
                  col.items.map((k: any) => (
                    <li key={k.label}>
                      {k.kind === "tool" ? (
                        <Link
                          to={isDefault ? "/tool/$tool" : "/$locale/tool/$tool"}
                          params={isDefault ? { tool: k.slug } : { locale, tool: k.slug }}
                          className={linkCls}
                        >
                          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-honey/60" />
                          {k.label}
                        </Link>
                      ) : (
                        <Link
                          to={isDefault ? "/category/$category" : "/$locale/category/$category"}
                          params={isDefault ? { category: k.slug } : { locale, category: k.slug }}
                          className={linkCls}
                        >
                          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-honey/60" />
                          {k.label}
                        </Link>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
