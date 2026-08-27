import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/tools";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";
import { useI18n } from "@/i18n/I18nProvider";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import { getLocalizedCategory } from "@/i18n/categories";
import { getLocalizedToolInfo } from "@/i18n/tools-data";

export function CategoryGrid() {
  const { locale, t } = useI18n();
  const isDefault = locale === DEFAULT_LOCALE;

  return (
    <section
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      aria-labelledby="browse-categories"
    >
      <SectionHeading
        id="browse-categories"
        eyebrow={t("categories.eyebrow")}
        title={t("categories.title")}
        description={t("categories.description")}
        centered
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const topTools = cat.tools.slice(0, 6);
          const localizedCat = getLocalizedCategory(cat, locale);

          return (
            <div
              key={cat.slug}
              className="group flex flex-col rounded-3xl border border-border/70 bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-ink text-primary-foreground shadow-soft">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                  {t("categories.toolsCount", { count: cat.tools.length })}
                </span>
              </div>

              <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">
                <Link
                  to={isDefault ? "/category/$category" : "/$locale/category/$category"}
                  params={isDefault ? { category: cat.slug } : { locale, category: cat.slug }}
                  className="hover:text-honey"
                >
                  {localizedCat.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {localizedCat.description}
              </p>

              <ul className="mt-4 space-y-1.5">
                {topTools.map((tool) => {
                  const localizedTool = getLocalizedToolInfo(tool, locale);
                  return (
                    <li key={tool.slug}>
                      <Link
                        to={isDefault ? "/tool/$tool" : "/$locale/tool/$tool"}
                        params={isDefault ? { tool: tool.slug } : { locale, tool: tool.slug }}
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-honey"
                      >
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-honey/60" />
                        {localizedTool.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <Button
                asChild
                variant="ghost"
                className="mt-5 justify-start px-0 text-honey hover:bg-transparent"
              >
                <Link
                  to={isDefault ? "/category/$category" : "/$locale/category/$category"}
                  params={isDefault ? { category: cat.slug } : { locale, category: cat.slug }}
                  className="inline-flex items-center gap-1.5"
                >
                  {t("categories.viewAll", {
                    count: cat.tools.length,
                    category: localizedCat.title,
                  })}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
