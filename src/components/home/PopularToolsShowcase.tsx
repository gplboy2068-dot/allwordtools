import { Link } from "@tanstack/react-router";
import { ArrowRight, Bot, Clock, Flame, Star } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { ToolCard } from "@/components/site/ToolCard";
import { getAiTools, getNewTools, getPopularTools, getTrendingTools } from "@/lib/internal-links";
import { useI18n } from "@/i18n/I18nProvider";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import { getLocalizedToolInfo } from "@/i18n/tools-data";

export function PopularToolsShowcase() {
  const { locale, t } = useI18n();
  const isDefault = locale === DEFAULT_LOCALE;

  const popular = getPopularTools(4);
  const trending = getTrendingTools(6);
  const recent = getNewTools(6);
  const ai = getAiTools(6);

  const linkCls =
    "inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-honey";

  const groups = [
    { title: t("popular.trending"), icon: Flame, tools: trending },
    { title: t("popular.new"), icon: Clock, tools: recent },
    { title: t("popular.ai"), icon: Bot, tools: ai },
  ];

  return (
    <section
      aria-labelledby="popular-tools"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <SectionHeading
        id="popular-tools"
        eyebrow={t("popular.eyebrow")}
        title={t("popular.title")}
        description={t("popular.description")}
        centered
      />

      {/* Popular tools as cards */}
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {popular.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>

      {/* Trending / New / AI link columns */}
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {groups.map((group) => {
          const Icon = group.icon;
          return (
            <div
              key={group.title}
              className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft"
            >
              <h3 className="flex items-center gap-2 font-display text-base font-semibold">
                <Icon className="h-4 w-4 text-honey" /> {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.tools.map((tool) => {
                  const localizedTool = getLocalizedToolInfo(tool, locale);
                  return (
                    <li key={tool.slug}>
                      <Link
                        to={isDefault ? "/tool/$tool" : "/$locale/tool/$tool"}
                        params={isDefault ? { tool: tool.slug } : { locale, tool: tool.slug }}
                        className={linkCls}
                      >
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-honey/60" />
                        {localizedTool.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          to={isDefault ? "/tools" : "/$locale/tools"}
          params={isDefault ? {} : { locale }}
          className="inline-flex items-center gap-1.5 rounded-full gradient-ink px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
        >
          <Star className="h-4 w-4" /> {t("popular.browseAll")}
        </Link>
        <Link
          to={isDefault ? "/learn" : "/$locale/learn"}
          params={isDefault ? {} : { locale }}
          className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-honey/60"
        >
          {t("popular.visitHub")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
