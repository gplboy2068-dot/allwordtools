import { Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Grid3x3, Sparkles } from "lucide-react";
import { keywordClusters } from "@/lib/internal-links";
import { useI18n } from "@/i18n/I18nProvider";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import { uiText } from "@/i18n/ui-template";
import { getLocalizedToolInfo } from "@/i18n/tools-data";
import { allTools } from "@/data/tools";

/**
 * Contextual keyword-cluster links. Turns common search phrases into
 * descriptive internal links pointing at the closest matching tool —
 * strengthening topical authority without spammy anchors.
 */
const CLUSTER_TITLE_KEYS: Record<string, string> = {
  "Game solvers": "clusters.gameSolvers",
  "Writing & vocabulary": "clusters.writingVocabulary",
  "Word Puzzles & Brainteasers": "clusters.puzzles",
  "Word Quizzes & Learning": "clusters.quizzes",
  "Text & Character Analysis": "clusters.textAnalysis",
  "Creative & Name Generators": "clusters.creative",
};

export function KeywordClusters() {
  const { locale } = useI18n();
  const isDefault = locale === DEFAULT_LOCALE;
  return (
    <section
      aria-labelledby="keyword-clusters"
      className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"
    >
      <span className="text-sm font-semibold uppercase tracking-wider text-honey">
        {uiText(locale, "links.relatedSearches", "Related searches")}
      </span>
      <h2
        id="keyword-clusters"
        className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl"
      >
        {uiText(locale, "links.exploreRelated", "Explore related word searches")}
      </h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {keywordClusters.map((cluster) => (
          <div
            key={cluster.title}
            className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft"
          >
            <h3 className="font-display text-base font-semibold">{CLUSTER_TITLE_KEYS[cluster.title] ? uiText(locale, CLUSTER_TITLE_KEYS[cluster.title], cluster.title) : cluster.title}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {cluster.links.map((link) => (
                <li key={link.label}>
                  {link.kind === "tool" ? (
                    <Link
                      to={isDefault ? "/tool/$tool" : "/$locale/tool/$tool"}
                      params={isDefault ? { tool: link.slug } : { locale, tool: link.slug }}
                      className="inline-flex items-center rounded-full border border-border/60 bg-secondary/50 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-honey/60 hover:text-honey"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <Link
                      to={isDefault ? "/category/$category" : "/$locale/category/$category"}
                      params={isDefault ? { category: link.slug } : { locale, category: link.slug }}
                      className="inline-flex items-center rounded-full border border-border/60 bg-secondary/50 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-honey/60 hover:text-honey"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * Bottom call-to-action band shown at the end of every major page:
 * "Continue exploring" links to the all-tools hub, all categories and the
 * learning hub, ensuring outgoing links and zero dead ends.
 */
export function BottomCta() {
  const { locale } = useI18n();
  const isDefault = locale === DEFAULT_LOCALE;
  return (
    <section
      aria-labelledby="continue-exploring"
      className="border-t border-border/60 bg-secondary/40 py-14"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-honey">
            {uiText(locale, "links.continueExploring", "Continue exploring")}
          </span>
          <h2
            id="continue-exploring"
            className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            {uiText(locale, "links.moreFreeTools", "More free word tools await")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            {uiText(locale, "links.bottomCtaText", "You may also like our full toolkit, every category and the learning hub — all free and no sign-up.")}
          </p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          <Link
            to={isDefault ? "/tools" : "/$locale/tools"}
            params={isDefault ? {} : { locale }}
            className="group flex items-start gap-4 rounded-2xl border border-border/70 bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-honey/50 hover:shadow-lift"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl gradient-ink text-primary-foreground">
              <Grid3x3 className="h-5 w-5" />
            </span>
            <span>
              <span className="block font-display text-base font-semibold">{uiText(locale, "links.allWordTools", "All Word Tools")}</span>
              <span className="mt-1 block text-sm text-muted-foreground">
                {uiText(locale, "links.browseAllToolsDesc", "Browse every free tool in one place")}
              </span>
              <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-honey">
                {uiText(locale, "links.viewAllTools", "View all tools")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </span>
          </Link>

          <Link
            to={isDefault ? "/" : "/$locale/"}
            params={isDefault ? {} : { locale }}
            hash="browse-categories"
            className="group flex items-start gap-4 rounded-2xl border border-border/70 bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-honey/50 hover:shadow-lift"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl gradient-ink text-primary-foreground">
              <Compass className="h-5 w-5" />
            </span>
            <span>
              <span className="block font-display text-base font-semibold">{uiText(locale, "links.browseCategories", "Browse Categories")}</span>
              <span className="mt-1 block text-sm text-muted-foreground">
                {uiText(locale, "links.browseCategoriesDesc", "Find tools grouped by what you need")}
              </span>
              <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-honey">
                {uiText(locale, "links.exploreCategories", "Explore categories")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </span>
          </Link>

          <Link
            to={isDefault ? "/learn" : "/$locale/learn"}
            params={isDefault ? {} : { locale }}
            className="group flex items-start gap-4 rounded-2xl border border-border/70 bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-honey/50 hover:shadow-lift"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl gradient-ink text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </span>
            <span>
              <span className="block font-display text-base font-semibold">{uiText(locale, "links.learningHub", "Learning Hub")}</span>
              <span className="mt-1 block text-sm text-muted-foreground">
                {uiText(locale, "links.learningHubDesc", "Quizzes, word of the day and guides")}
              </span>
              <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-honey">
                {uiText(locale, "links.startLearning", "Start learning")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
