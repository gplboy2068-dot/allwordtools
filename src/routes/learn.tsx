import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/site/PageLayout";
import { categories, toolIcons, toolsFromSlugs } from "@/data/tools";
import { buildLocaleHead } from "@/i18n/seo";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import { useI18n } from "@/i18n/I18nProvider";

const SITE = "AllWordTools.com";
export const TITLE = `Learn — Word Games, Vocabulary & English Guides — ${SITE}`;
export const DESCRIPTION =
  "The AllWordTools learning hub. Build vocabulary, take word quizzes, learn a new word every day and sharpen your English with free interactive tools and guides.";

const learnSlugs = [
  "word-of-the-day",
  "vocabulary-quiz",
  "spelling-quiz",
  "synonym-quiz",
  "antonym-quiz",
  "ai-vocabulary-builder",
  "ai-flashcards",
  "prefix-quiz",
  "suffix-quiz",
];

const learnTools = toolsFromSlugs(learnSlugs);
const learnCategories = categories.filter((c) =>
  ["word-quizzes", "dictionary-tools", "writing-tools", "grammar-tools", "ai-tools"].includes(
    c.slug,
  ),
);

export const Route = createFileRoute("/learn")({
  head: () =>
    buildLocaleHead({
      path: "/learn",
      locale: DEFAULT_LOCALE,
      title: TITLE,
      description: DESCRIPTION,
    }),
  component: LearnPage,
});

export function LearnPage() {
  const { locale } = useI18n();
  const isDefault = locale === DEFAULT_LOCALE;

  return (
    <PageLayout
      crumb="Learn"
      title="Learning Hub"
      intro="Grow your vocabulary and master English with interactive quizzes, a daily word, AI study tools and clear guides — all free."
    >
      <div className="space-y-14">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight">Start learning now</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {learnTools.map((tool) => {
              const Icon = toolIcons[tool.slug];
              return (
                <Link
                  key={tool.slug}
                  to={isDefault ? "/tool/$tool" : ("/$locale/tool/$tool" as any)}
                  params={isDefault ? { tool: tool.slug } : { locale, tool: tool.slug }}
                  className="group flex flex-col rounded-2xl border border-border/70 bg-card p-5 shadow-soft transition-all hover:-translate-y-1 hover:border-honey/50 hover:shadow-lift"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground group-hover:gradient-honey group-hover:text-honey-foreground">
                    {Icon ? <Icon className="h-5 w-5" /> : null}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
                    {tool.name}
                  </h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {tool.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-honey">
                    Start{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Explore learning categories
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {learnCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.slug}
                  to={isDefault ? "/category/$category" : ("/$locale/category/$category" as any)}
                  params={isDefault ? { category: cat.slug } : { locale, category: cat.slug }}
                  className="group flex items-start gap-4 rounded-2xl border border-border/70 bg-card p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl gradient-ink text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-tight group-hover:text-honey">
                      {cat.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
