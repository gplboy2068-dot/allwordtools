import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock,
  Home,
  Sparkles,
  User,
  Wand2,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { blogPosts, getBlogPost, type BlogPost } from "@/data/blog-posts";
import { buildLocaleHead, BASE_URL } from "@/i18n/seo";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import { localePath } from "@/i18n/paths";
import { useI18n } from "@/i18n/I18nProvider";

export function blogPostHead(slug: string, locale: string = DEFAULT_LOCALE) {
  const post = getBlogPost(slug);
  if (!post) {
    return {
      meta: [{ title: "Article Not Found — AllWordTools.com" }, { name: "robots", content: "noindex" }],
    };
  }

  const path = `/blog/${post.slug}`;
  const url = `${BASE_URL}${localePath(locale, path)}`;
  const home = `${BASE_URL}${localePath(locale, "/")}`;
  const blogHome = `${BASE_URL}${localePath(locale, "/blog")}`;

  const { meta, links } = buildLocaleHead({
    path,
    locale,
    title: post.metaTitle,
    description: post.metaDescription,
    type: "article",
  });

  return {
    meta,
    links,
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: home },
            { "@type": "ListItem", position: 2, name: "Blog", item: blogHome },
            { "@type": "ListItem", position: 3, name: post.title, item: url },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.metaDescription,
          url,
          datePublished: "2026-08-01T08:00:00+00:00",
          dateModified: "2026-08-22T08:00:00+00:00",
          author: {
            "@type": "Person",
            name: "Firoz Khan",
            jobTitle: "Full Stack Developer",
            url: `${BASE_URL}/about/firoz-khan`,
            sameAs: [
              "https://www.linkedin.com/in/firoz-khan-1153358a/",
              "https://github.com/fkdigitalmedia",
              "https://www.instagram.com/",
            ],
          },
          publisher: {
            "@type": "Organization",
            name: "FK Digital Media",
            url: `${BASE_URL}/about`,
            logo: {
              "@type": "ImageObject",
              url: `${BASE_URL}/favicon.png`,
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
          },
        }),
      },
    ],
  };
}

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getBlogPost(params.slug);
    if (!post) throw notFound();
    return { slug: params.slug };
  },
  head: ({ params }) => blogPostHead(params.slug, DEFAULT_LOCALE),
  component: RootBlogPostPage,
});

function RootBlogPostPage() {
  const { slug } = Route.useLoaderData();
  return <BlogPostView slug={slug} />;
}

export function BlogPostView({ slug }: { slug: string }) {
  const post = getBlogPost(slug)!;
  const { locale } = useI18n();
  const isDefault = locale === DEFAULT_LOCALE;

  const related = post.relatedPosts
    .map((s) => getBlogPost(s))
    .filter((p): p is BlogPost => Boolean(p));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="gradient-hero border-b border-border/60">
          <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
                <li>
                  <Link
                    to={isDefault ? "/" : ("/$locale" as any)}
                    params={isDefault ? {} : { locale }}
                    className="inline-flex items-center gap-1 hover:text-foreground"
                  >
                    <Home className="h-3.5 w-3.5" /> Home
                  </Link>
                </li>
                <ChevronRight className="h-3.5 w-3.5" />
                <li>
                  <Link
                    to={isDefault ? "/blog" : ("/$locale/blog" as any)}
                    params={isDefault ? {} : { locale }}
                    className="hover:text-foreground"
                  >
                    Blog
                  </Link>
                </li>
                <ChevronRight className="h-3.5 w-3.5" />
                <li className="font-medium text-foreground truncate max-w-[200px] sm:max-w-xs">
                  {post.category}
                </li>
              </ol>
            </nav>

            <div className="inline-flex items-center gap-2 rounded-full bg-honey/15 px-3.5 py-1 text-xs font-semibold text-honey mb-4">
              <BookOpen className="h-3.5 w-3.5" /> {post.category}
            </div>

            <h1 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl leading-tight">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                <Link
                  to={isDefault ? "/about/firoz-khan" : ("/$locale/about/firoz-khan" as any)}
                  params={isDefault ? {} : { locale }}
                  className="font-medium text-foreground hover:underline"
                >
                  {post.author}
                </Link>
                <span className="text-muted-foreground/60">(Full Stack Developer)</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" /> {post.publishedDate}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {post.readTime}
              </span>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Lead paragraph */}
          <p className="text-xl leading-relaxed text-foreground/90 font-medium pb-8 border-b border-border/60">
            {post.leadParagraph}
          </p>

          {/* Interactive Tool CTA Card */}
          <div className="my-10 rounded-2xl border border-honey/40 bg-gradient-to-br from-honey/10 via-honey/5 to-transparent p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-honey mb-2">
                  <Sparkles className="h-3.5 w-3.5" /> Free Interactive Tool
                </span>
                <h3 className="font-display text-xl font-bold">{post.relatedTool.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{post.relatedTool.description}</p>
              </div>
              <Button asChild className="shrink-0 rounded-full font-semibold shadow-md">
                <Link
                  to={isDefault ? "/tool/$tool" : ("/$locale/tool/$tool" as any)}
                  params={isDefault ? { tool: post.relatedTool.slug } : { locale, tool: post.relatedTool.slug }}
                >
                  {post.relatedTool.ctaText} <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Main Content Sections */}
          <div className="space-y-12">
            {post.sections.map((section, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl pt-4">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {p}
                  </p>
                ))}

                {section.subsections && (
                  <div className="mt-6 space-y-4 rounded-xl border border-border/80 bg-muted/30 p-5">
                    {section.subsections.map((sub, sIdx) => (
                      <div key={sIdx} className="space-y-1.5">
                        <h4 className="font-semibold text-foreground text-sm sm:text-base">
                          {sub.title}
                        </h4>
                        <p className="text-sm leading-relaxed text-muted-foreground">{sub.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Key Takeaways Box */}
          <div className="mt-14 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600">
                <CheckCircle2 className="h-5 w-5" />
              </span>
              <h3 className="font-display text-xl font-bold">Key Takeaways</h3>
            </div>
            <ul className="space-y-2.5">
              {post.keyTakeaways.map((takeaway, tIdx) => (
                <li key={tIdx} className="flex items-start gap-2 text-sm sm:text-base text-muted-foreground">
                  <span className="text-honey font-bold">•</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Author Attribution Card */}
          <div className="mt-12 rounded-2xl border border-border/70 bg-card p-6 shadow-soft">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-honey">
                  Written &amp; Maintained By
                </span>
                <h4 className="font-display text-lg font-bold text-foreground mt-0.5">
                  <Link
                    to={isDefault ? "/about/firoz-khan" : ("/$locale/about/firoz-khan" as any)}
                    params={isDefault ? {} : { locale }}
                    className="hover:underline"
                  >
                    Firoz Khan
                  </Link>
                </h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed max-w-lg">
                  Full Stack Developer and creator of AllWordTools.com under FK Digital Media. Builds fast, accessible online word solvers and web developer utilities.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button asChild variant="outline" size="sm" className="rounded-full text-xs">
                  <Link
                    to={isDefault ? "/about/firoz-khan" : ("/$locale/about/firoz-khan" as any)}
                    params={isDefault ? {} : { locale }}
                  >
                    View Profile
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Tool CTA */}
          <div className="mt-12 text-center p-8 rounded-2xl bg-muted/40 border border-border/60">
            <h3 className="font-display text-xl font-bold">Ready to try it yourself?</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
              Test your words, solve puzzles, and practice with our free browser-based tools.
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <Button asChild className="rounded-full">
                <Link
                  to={isDefault ? "/tool/$tool" : ("/$locale/tool/$tool" as any)}
                  params={isDefault ? { tool: post.relatedTool.slug } : { locale, tool: post.relatedTool.slug }}
                >
                  Launch {post.relatedTool.name}
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to={isDefault ? "/blog" : ("/$locale/blog" as any)} params={isDefault ? {} : { locale }}>
                  More Guides
                </Link>
              </Button>
            </div>
          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <div className="mt-16 pt-10 border-t border-border/60">
              <h3 className="font-display text-2xl font-bold tracking-tight mb-6">
                Related Guides & Articles
              </h3>
              <div className="grid gap-6 sm:grid-cols-2">
                {related.map((rPost) => (
                  <Link
                    key={rPost.slug}
                    to={isDefault ? "/blog/$slug" : ("/$locale/blog/$slug" as any)}
                    params={isDefault ? { slug: rPost.slug } : { locale, slug: rPost.slug }}
                    className="group flex flex-col justify-between rounded-2xl border border-border/60 bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:border-honey/60 hover:shadow-card"
                  >
                    <div>
                      <span className="text-xs font-semibold text-honey">{rPost.category}</span>
                      <h4 className="mt-2 font-display text-lg font-semibold tracking-tight group-hover:text-honey line-clamp-2">
                        {rPost.title}
                      </h4>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                        {rPost.excerpt}
                      </p>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-honey">
                      Read guide <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}
