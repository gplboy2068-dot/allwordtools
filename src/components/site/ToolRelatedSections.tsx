import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { ToolCard } from "@/components/site/ToolCard";
import { ToolLinkList } from "@/components/site/ToolLinkList";
import { toolIcons } from "@/data/tools";
import { useI18n } from "@/i18n/I18nProvider";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import { uiText } from "@/i18n/ui-template";
import { getLocalizedToolInfo } from "@/i18n/tools-data";
import { getLocalizedCategory } from "@/i18n/categories";
import {
  getNextPrevTool,
  getRecommendedNext,
  getRelatedTools,
  getSameCategoryTools,
  getToolCategory,
  getUsersAlsoUsed,
} from "@/lib/internal-links";

/**
 * Automatically-generated internal-linking sections for every tool page.
 * Given a slug, it derives Related Tools, a Recommended Next tool,
 * Previous/Next navigation, "Users Also Used" and "More In This Category"
 * — 15–30 relevant, descriptive internal links with zero manual wiring.
 */
export function ToolRelatedSections({ slug }: { slug: string }) {
  const { locale } = useI18n();
  const isDefault = locale === DEFAULT_LOCALE;
  const category = getToolCategory(slug);
  const related = getRelatedTools(slug, 4);
  const usersAlsoUsed = getUsersAlsoUsed(slug, 6);
  const sameCategory = getSameCategoryTools(slug, 6);
  const recommended = getRecommendedNext(slug);
  const { prev, next } = getNextPrevTool(slug);
  const RecIcon = recommended ? (toolIcons[recommended.slug] ?? Sparkles) : Sparkles;

  return (
    <section className="border-t border-border/60 bg-secondary/30 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Related tools (cards) */}
        {related.length > 0 && (
          <>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-sm font-semibold uppercase tracking-wider text-honey">
                  {uiText(locale, "related.keepExploring", "Keep exploring")}
                </span>
                <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  {uiText(locale, "related.relatedTools", "Related tools")}
                </h2>
              </div>
              {category && (
                <Link
                  to={isDefault ? "/category/$category" : "/$locale/category/$category"}
                  params={isDefault ? { category: category.slug } : { locale, category: category.slug }}
                  className="hidden items-center gap-1.5 text-sm font-medium text-honey hover:underline sm:inline-flex"
                >
                  {uiText(locale, "related.allCategory", "All {title}").replace("{title}", getLocalizedCategory(category, locale).title)}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((t) => (
                <ToolCard key={t.slug} tool={t} />
              ))}
            </div>
          </>
        )}

        {/* Recommended next tool */}
        {recommended && (
          <div className="mt-10 flex flex-col items-start gap-4 rounded-3xl border border-honey/40 bg-card p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl gradient-honey text-honey-foreground">
                <RecIcon className="h-6 w-6" />
              </span>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-honey">
                  {uiText(locale, "related.recommendedNext", "Recommended next")}
                </span>
                <p className="font-display text-lg font-semibold">{getLocalizedToolInfo(recommended, locale).name}</p>
                <p className="text-sm text-muted-foreground">{getLocalizedToolInfo(recommended, locale).description}</p>
              </div>
            </div>
            <Link
              to={isDefault ? "/tool/$tool" : "/$locale/tool/$tool"}
              params={isDefault ? { tool: recommended.slug } : { locale, tool: recommended.slug }}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full gradient-honey px-5 py-2.5 text-sm font-semibold text-honey-foreground shadow-soft transition-transform hover:-translate-y-0.5"
            >
              {uiText(locale, "related.open", "Open {name}").replace("{name}", getLocalizedToolInfo(recommended, locale).name)}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* Link columns: users also used + more in category */}
        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          <ToolLinkList title={uiText(locale, "related.usersAlsoUsed", "Users also used")} tools={usersAlsoUsed} columns={1} />
          <ToolLinkList
            title={category ? `${uiText(locale, "related.more", "More")} ${getLocalizedCategory(category, locale).title}` : uiText(locale, "related.moreTools", "More tools")}
            tools={sameCategory}
            columns={1}
          />
        </div>

        {/* Previous / Next navigation */}
        {(prev || next) && (
          <div className="mt-12 grid gap-4 border-t border-border/60 pt-8 sm:grid-cols-2">
            {prev ? (
              <Link
                to={isDefault ? "/tool/$tool" : "/$locale/tool/$tool"}
                params={isDefault ? { tool: prev.slug } : { locale, tool: prev.slug }}
                className="group flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-5 shadow-soft transition-all hover:border-honey/50"
              >
                <ArrowLeft className="h-4 w-4 text-honey transition-transform group-hover:-translate-x-1" />
                <span>
                  <span className="block text-xs uppercase tracking-wider text-muted-foreground">
                    {uiText(locale, "related.previousTool", "Previous tool")}
                  </span>
                  <span className="font-display text-sm font-semibold">{getLocalizedToolInfo(prev, locale).name}</span>
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                to={isDefault ? "/tool/$tool" : "/$locale/tool/$tool"}
                params={isDefault ? { tool: next.slug } : { locale, tool: next.slug }}
                className="group flex items-center justify-end gap-3 rounded-2xl border border-border/70 bg-card p-5 text-right shadow-soft transition-all hover:border-honey/50"
              >
                <span>
                  <span className="block text-xs uppercase tracking-wider text-muted-foreground">
                    {uiText(locale, "related.nextTool", "Next tool")}
                  </span>
                  <span className="font-display text-sm font-semibold">{getLocalizedToolInfo(next, locale).name}</span>
                </span>
                <ArrowRight className="h-4 w-4 text-honey transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
