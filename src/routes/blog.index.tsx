import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, CalendarDays, Clock } from "lucide-react";
import { PageLayout } from "@/components/site/PageLayout";
import { blogPosts, type BlogPost } from "@/data/blog-posts";
import { buildLocaleHead } from "@/i18n/seo";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import { useI18n } from "@/i18n/I18nProvider";

const SITE = "AllWordTools.com";
export const TITLE = `Blog — Word Game Tips, Vocabulary & Writing Guides — ${SITE}`;
export const DESCRIPTION =
  "In-depth guides, strategy breakdowns, and practical tips for word games, vocabulary building, active writing, and AI tools from the AllWordTools team.";

export const Route = createFileRoute("/blog/")({
  head: () =>
    buildLocaleHead({
      path: "/blog",
      locale: DEFAULT_LOCALE,
      title: TITLE,
      description: DESCRIPTION,
    }),
  component: BlogPage,
});

export function BlogPage() {
  const { locale } = useI18n();
  const isDefault = locale === DEFAULT_LOCALE;

  return (
    <PageLayout
      crumb="Blog"
      title="The AllWordTools Blog"
      intro="In-depth strategies, game guides, vocabulary secrets, and writing masterclasses from our editorial team."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {blogPosts.map((post) => (
          <PostCard key={post.slug} post={post} isDefault={isDefault} locale={locale} />
        ))}
      </div>
    </PageLayout>
  );
}

function PostCard({
  post,
  isDefault,
  locale,
}: {
  post: BlogPost;
  isDefault: boolean;
  locale: string;
}) {
  return (
    <Link
      to={isDefault ? "/blog/$slug" : ("/$locale/blog/$slug" as any)}
      params={isDefault ? { slug: post.slug } : { locale, slug: post.slug }}
      className="group flex flex-col justify-between rounded-3xl border border-border/70 bg-card overflow-hidden shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-honey/60 hover:shadow-lift"
    >
      {post.image && (
        <div className="overflow-hidden border-b border-border/50">
          <img
            src={post.image}
            alt={post.title}
            className="w-full aspect-[16/9] object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-6 flex flex-col justify-between flex-1">
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-honey/15 px-3 py-1 text-xs font-semibold text-honey">
            <BookOpen className="h-3.5 w-3.5" /> {post.category}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" /> {post.readTime}
          </span>
        </div>

        <h2 className="mt-4 font-display text-xl font-bold tracking-tight group-hover:text-honey leading-snug">
          {post.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
      </div>

      <div className="mt-6 flex items-center justify-between pt-4 border-t border-border/50 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <CalendarDays className="h-3 w-3" /> {post.publishedDate}
        </span>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-honey group-hover:underline">
          Read full guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
      </div>
    </Link>
  );
}
