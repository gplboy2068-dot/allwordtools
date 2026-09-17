import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, Home, Lightbulb, Sparkles } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ToolCard } from "@/components/site/ToolCard";
import { DiscoverMore } from "@/components/site/DiscoverMore";
import { TrustedReferences } from "@/components/site/TrustedReferences";
import { KeywordClusters, BottomCta } from "@/components/site/LinkSections";
import { AdBanner } from "@/components/site/AdBanner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { categories, type Tool } from "@/data/tools";
import { getCategoryReferences } from "@/lib/external-links";
import { buildLocaleHead, inLanguage, BASE_URL } from "@/i18n/seo";
import { localePath } from "@/i18n/paths";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import { useI18n } from "@/i18n/I18nProvider";
import { getLocalizedCategory } from "@/i18n/categories";
import { getLocalizedCategoryFullContent } from "@/i18n/category-content";

const SITE = "AllWordTools.com";

function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function categoryHead(slug: string, locale: string = DEFAULT_LOCALE) {
  const category = getCategory(slug);
  if (!category) {
    return {
      meta: [{ title: `Category not found — ${SITE}` }, { name: "robots", content: "noindex" }],
    };
  }
  const locCat = getLocalizedCategory(category, locale);
  const content = getLocalizedCategoryFullContent(slug, locale);

  const title = content?.metaTitle || `${locCat.title} — ${SITE}`;
  const description = content?.metaDescription || locCat.description;
  const path = `/category/${slug}`;
  const url = `${BASE_URL}${localePath(locale, path)}`;
  const home = `${BASE_URL}${localePath(locale, "/")}`;
  const { meta, links } = buildLocaleHead({ path, locale, title, description });

  return {
    meta,
    links,
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          inLanguage: inLanguage(locale),
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: home },
            {
              "@type": "ListItem",
              position: 2,
              name: locCat.title,
              item: url,
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: locCat.title,
          description,
          url,
          inLanguage: inLanguage(locale),
          isPartOf: { "@type": "WebSite", name: SITE, url: home },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: category.tools.map((t, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: t.name,
              url: `${BASE_URL}${localePath(locale, `/tool/${t.slug}`)}`,
            })),
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: locCat.title,
          itemListElement: category.tools.map((t, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: t.name,
            description: t.description,
          })),
        }),
      },
      ...(content && content.faqs.length > 0
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: content.faqs.map((f) => ({
                  "@type": "Question",
                  name: f.question,
                  acceptedAnswer: { "@type": "Answer", text: f.answer },
                })),
              }),
            },
          ]
        : []),
    ],
  };
}

export const Route = createFileRoute("/category/$category")({
  loader: ({ params }) => {
    if (!getCategory(params.category)) throw notFound();
    return { slug: params.category };
  },
  head: ({ params }) => categoryHead(params.category, DEFAULT_LOCALE),
  component: RootCategoryPage,
  notFoundComponent: CategoryNotFound,
  errorComponent: CategoryError,
});

function RootCategoryPage() {
  const { slug } = Route.useLoaderData();
  return <CategoryPageView slug={slug} />;
}

const UI_LOCALIZATION: Record<
  string,
  {
    toolsCount: string;
    toolsTitleSuffix: string;
    pickToolSub: string;
    aboutCategory: string;
    tips: string;
    faqEyebrow: string;
    faqsTitleSuffix: string;
    exploreMore: string;
    toolsCountSuffix: string;
    browse: string;
    notFound: string;
    notFoundDesc: string;
    backHome: string;
    errorTitle: string;
    errorDesc: string;
    tryAgain: string;
    home: string;
  }
> = {
  en: {
    toolsCount: "{count} free tools in this category",
    toolsTitleSuffix: "tools",
    pickToolSub: "Pick a tool to get started — each one is fast, free and works on any device.",
    aboutCategory: "About {title}",
    tips: "Pro tips",
    faqEyebrow: "Questions & answers",
    faqsTitleSuffix: "FAQs",
    exploreMore: "Explore more categories",
    toolsCountSuffix: "{count} tools",
    browse: "Browse",
    notFound: "Category not found",
    notFoundDesc: "We couldn't find that category. Explore all of our word tools instead.",
    backHome: "Back to home",
    errorTitle: "This page didn't load",
    errorDesc: "Something went wrong. Please try again.",
    tryAgain: "Try again",
    home: "Home",
  },
  es: {
    toolsCount: "{count} herramientas gratuitas en esta categoría",
    toolsTitleSuffix: "herramientas",
    pickToolSub: "Elige una herramienta para comenzar; cada una es rápida, gratuita y funciona en cualquier dispositivo.",
    aboutCategory: "Acerca de {title}",
    tips: "Consejos profesionales",
    faqEyebrow: "Preguntas y respuestas",
    faqsTitleSuffix: "Preguntas frecuentes",
    exploreMore: "Explorar más categorías",
    toolsCountSuffix: "{count} herramientas",
    browse: "Explorar",
    notFound: "Categoría no encontrada",
    notFoundDesc: "No pudimos encontrar esa categoría. Explora todas nuestras herramientas de palabras en su lugar.",
    backHome: "Volver al inicio",
    errorTitle: "Esta página no cargó",
    errorDesc: "Algo salió mal. Por favor intenta de nuevo.",
    tryAgain: "Intentar de nuevo",
    home: "Inicio",
  },
  de: {
    toolsCount: "{count} kostenlose Tools in dieser Kategorie",
    toolsTitleSuffix: "Werkzeuge",
    pickToolSub: "Wähle ein Werkzeug, um loszulegen – jedes ist schnell, kostenlos und funktioniert auf jedem Gerät.",
    aboutCategory: "Über {title}",
    tips: "Profi-Tipps",
    faqEyebrow: "Fragen & Antworten",
    faqsTitleSuffix: "Häufig gestellte Fragen",
    exploreMore: "Weitere Kategorien erkunden",
    toolsCountSuffix: "{count} Werkzeuge",
    browse: "Durchsuchen",
    notFound: "Kategorie nicht gefunden",
    notFoundDesc: "Wir konnten diese Kategorie nicht finden. Erkunde stattdessen alle unsere Wortwerkzeuge.",
    backHome: "Zurück zur Startseite",
    errorTitle: "Diese Seite konnte nicht geladen werden",
    errorDesc: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
    tryAgain: "Erneut versuchen",
    home: "Startseite",
  },
  pt: {
    toolsCount: "{count} ferramentas gratuitas nesta categoria",
    toolsTitleSuffix: "ferramentas",
    pickToolSub: "Escolha uma ferramenta para começar — cada uma é rápida, gratuita e funciona em qualquer dispositivo.",
    aboutCategory: "Sobre {title}",
    tips: "Dicas profissionais",
    faqEyebrow: "Perguntas e respostas",
    faqsTitleSuffix: "Perguntas frequentes",
    exploreMore: "Explorar mais categorias",
    toolsCountSuffix: "{count} ferramentas",
    browse: "Navegar",
    notFound: "Categoria não encontrada",
    notFoundDesc: "Não conseguimos encontrar essa categoria. Explore todas as nossas ferramentas de palavras.",
    backHome: "Voltar para o início",
    errorTitle: "Esta página não carregou",
    errorDesc: "Algo deu errado. Por favor, tente novamente.",
    tryAgain: "Tente novamente",
    home: "Início",
  },
  ru: {
    toolsCount: "{count} бесплатных инструментов в этой категории",
    toolsTitleSuffix: "инструменты",
    pickToolSub: "Выберите инструмент, чтобы начать — каждый из них быстрый, бесплатный и работает на любом устройстве.",
    aboutCategory: "О категории {title}",
    tips: "Советы профессионалов",
    faqEyebrow: "Вопросы и ответы",
    faqsTitleSuffix: "Часто задаваемые вопросы",
    exploreMore: "Изучить другие категории",
    toolsCountSuffix: "инструментов: {count}",
    browse: "Обзор",
    notFound: "Категория не найдена",
    notFoundDesc: "Мы не смогли найти эту категорию. Попробуйте изучить все наши словесные инструменты.",
    backHome: "Назад на главную",
    errorTitle: "Эта страница не загрузилась",
    errorDesc: "Что-то пошло не так. Пожалуйста, попробуйте еще раз.",
    tryAgain: "Попробовать еще раз",
    home: "Главная",
  },
  id: {
    toolsCount: "{count} alat gratis di kategori ini",
    toolsTitleSuffix: "alat",
    pickToolSub: "Pilih alat untuk memulai — masing-masing cepat, gratis, dan berfungsi di perangkat apa pun.",
    aboutCategory: "Tentang {title}",
    tips: "Tips profesional",
    faqEyebrow: "Pertanyaan & jawaban",
    faqsTitleSuffix: "Pertanyaan Sering Diajukan",
    exploreMore: "Jelajahi kategori lainnya",
    toolsCountSuffix: "{count} alat",
    browse: "Jelajahi",
    notFound: "Kategori tidak ditemukan",
    notFoundDesc: "Kami tidak dapat menemukan kategori tersebut. Silakan jelajahi semua alat kata kami.",
    backHome: "Kembali ke beranda",
    errorTitle: "Halaman ini tidak dapat dimuat",
    errorDesc: "Terjadi kesalahan. Silakan coba lagi.",
    tryAgain: "Coba lagi",
    home: "Beranda",
  },
  ar: {
    toolsCount: "{count} أدوات مجانية في هذه الفئة",
    toolsTitleSuffix: "أدوات",
    pickToolSub: "اختر أداة للبدء - كل منها سريع ومجاني ويعمل على أي جهاز.",
    aboutCategory: "حول {title}",
    tips: "نصائح للمحترفين",
    faqEyebrow: "أسئلة وأجوبة",
    faqsTitleSuffix: "الأسئلة الشائعة",
    exploreMore: "استكشف المزيد من الفئات",
    toolsCountSuffix: "{count} أدوات",
    browse: "تصفح",
    notFound: "لم يتم العثور على الفئة",
    notFoundDesc: "لم نتمكن من العثور على تلك الفئة. استكشف جميع أدوات الكلمات لدينا بدلاً من ذلك.",
    backHome: "العودة للرئيسية",
    errorTitle: "لم يتم تحميل هذه الصفحة",
    errorDesc: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
    tryAgain: "إعادة المحاولة",
    home: "الرئيسية",
  },
  hi: {
    toolsCount: "इस श्रेणी में {count} मुफ़्त टूल्स",
    toolsTitleSuffix: "टूल्स",
    pickToolSub: "शुरू करने के लिए कोई भी टूल चुनें — प्रत्येक टूल तेज़, मुफ़्त है और किसी भी डिवाइस पर काम करता है।",
    aboutCategory: "{title} के बारे में",
    tips: "प्रो टिप्स",
    faqEyebrow: "प्रश्न और उत्तर",
    faqsTitleSuffix: "अक्सर पूछे जाने वाले प्रश्न (FAQ)",
    exploreMore: "अन्य श्रेणियां एक्सप्लोर करें",
    toolsCountSuffix: "{count} टूल्स",
    browse: "ब्राउज़ करें",
    notFound: "श्रेणी नहीं मिली",
    notFoundDesc: "हमें वह श्रेणी नहीं मिली। इसके बजाय हमारे सभी शब्द टूल्स देखें।",
    backHome: "होमपेज पर वापस",
    errorTitle: "यह पेज लोड नहीं हो सका",
    errorDesc: "कुछ गलत हो गया। कृपया दोबारा प्रयास करें।",
    tryAgain: "पुनः प्रयास करें",
    home: "होम",
  },
};

export function CategoryPageView({ slug }: { slug: string }) {
  const { locale } = useI18n();
  const isDefault = locale === DEFAULT_LOCALE;
  const category = getCategory(slug)!;
  const locCat = getLocalizedCategory(category, locale);
  const content = getLocalizedCategoryFullContent(slug, locale);
  const Icon = category.icon;
  const related = categories.filter((c) => c.slug !== category.slug);
  const references = getCategoryReferences(slug);

  const t = (key: keyof typeof UI_LOCALIZATION.en) => {
    return UI_LOCALIZATION[locale]?.[key] ?? UI_LOCALIZATION.en[key];
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="gradient-hero border-b border-border/60">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <li>
                  <Link
                    to={isDefault ? "/" : "/$locale/"}
                    params={isDefault ? {} : { locale }}
                    className="inline-flex items-center gap-1 hover:text-foreground"
                  >
                    <Home className="h-3.5 w-3.5" /> {t("home")}
                  </Link>
                </li>
                <ChevronRight className="h-3.5 w-3.5" />
                <li className="font-medium text-foreground">{locCat.title}</li>
              </ol>
            </nav>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-3.5 py-1.5 text-xs font-semibold text-muted-foreground backdrop-blur">
                  <Sparkles className="h-3.5 w-3.5 text-honey" />
                  {t("toolsCount").replace("{count}", category.tools.length.toString())}
                </span>
                <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl">
                  {content.heading}
                </h1>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-balance">
                  {content.subheading}
                </p>
              </div>
              <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl gradient-ink text-primary-foreground shadow-lift">
                <Icon className="h-10 w-10" />
              </span>
            </div>
          </div>
        </section>

        {/* Tools grid */}
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8" aria-labelledby="tools">
          <h2 id="tools" className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            {locCat.title} {t("toolsTitleSuffix")}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {t("pickToolSub")}
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {category.tools.map((tool: Tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>

        {/* Strategic Ad Banner */}
        <AdBanner />

        {/* Long-form content */}
        {content && (
          <section className="bg-secondary/40 py-14" aria-labelledby="about">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <span className="text-sm font-semibold uppercase tracking-wider text-honey">
                {content.eyebrow}
              </span>
              <h2
                id="about"
                className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                {t("aboutCategory").replace("{title}", locCat.title)}
              </h2>
              <div className="mt-6 space-y-4">
                {content.intro.map((p, i) => (
                  <p key={i} className="text-base leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-10 space-y-10">
                {content.sections.map((s) => (
                  <article key={s.heading}>
                    <h3 className="font-display text-2xl font-semibold tracking-tight">
                      {s.heading}
                    </h3>
                    <div className="mt-3 space-y-4">
                      {s.paragraphs.map((p, i) => (
                        <p key={i} className="text-base leading-relaxed text-muted-foreground">
                          {p}
                        </p>
                      ))}
                    </div>
                  </article>
                ))}
              </div>

              {/* Tips */}
              {content.tips && content.tips.length > 0 && (
                <div className="mt-12 rounded-3xl border border-border/70 bg-card p-7 shadow-soft">
                  <h3 className="flex items-center gap-2 font-display text-xl font-semibold">
                    <Lightbulb className="h-5 w-5 text-honey" /> {t("tips")}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {content.tips.map((tip, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full gradient-honey text-xs font-bold text-honey-foreground">
                          {i + 1}
                        </span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* FAQ */}
        {content && content.faqs && content.faqs.length > 0 && (
          <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8" aria-labelledby="faq">
            <span className="text-sm font-semibold uppercase tracking-wider text-honey">
              {t("faqEyebrow")}
            </span>
            <h2
              id="faq"
              className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              {locCat.title} {t("faqsTitleSuffix")}
            </h2>
            <Accordion type="single" collapsible className="mt-6 w-full">
              {content.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-border/70">
                  <AccordionTrigger className="text-left font-display text-base font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}

        {/* Related categories */}
        <section className="bg-secondary/40 py-14" aria-labelledby="related">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2
              id="related"
              className="font-display text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              {t("exploreMore")}
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((cat) => {
                const CatIcon = cat.icon;
                const locRelCat = getLocalizedCategory(cat, locale);
                return (
                  <Link
                    key={cat.slug}
                    to={isDefault ? "/category/$category" : "/$locale/category/$category"}
                    params={isDefault ? { category: cat.slug } : { locale, category: cat.slug }}
                    className="group flex items-start gap-4 rounded-2xl border border-border/70 bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-honey/50 hover:shadow-lift"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl gradient-ink text-primary-foreground">
                      <CatIcon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold">{locRelCat.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {t("toolsCountSuffix").replace("{count}", cat.tools.length.toString())}
                      </p>
                      <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-honey">
                        {t("browse")}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Trusted external references */}
        <TrustedReferences references={references} className="py-4" />

        {/* Contextual keyword clusters */}
        <KeywordClusters />

        {/* Sidebar-style discovery band */}
        <DiscoverMore excludeSlug={slug} />

        {/* Bottom CTA */}
        <BottomCta />
      </main>
      <Footer />
    </div>
  );
}

export function CategoryNotFound() {
  const { locale } = useI18n();
  const isDefault = locale === DEFAULT_LOCALE;
  const t = (key: keyof typeof UI_LOCALIZATION.en) => {
    return UI_LOCALIZATION[locale]?.[key] ?? UI_LOCALIZATION.en[key];
  };
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-semibold">{t("notFound")}</h1>
        <p className="mt-3 text-muted-foreground">{t("notFoundDesc")}</p>
        <Button asChild className="mt-6 rounded-full">
          <Link
            to={isDefault ? "/" : "/$locale/"}
            params={isDefault ? {} : { locale }}
          >
            {t("backHome")}
          </Link>
        </Button>
      </div>
      <Footer />
    </div>
  );
}

export function CategoryError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  const { locale } = useI18n();
  const t = (key: keyof typeof UI_LOCALIZATION.en) => {
    return UI_LOCALIZATION[locale]?.[key] ?? UI_LOCALIZATION.en[key];
  };
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold">{t("errorTitle")}</h1>
        <p className="mt-3 text-muted-foreground">{t("errorDesc")}</p>
        <Button
          className="mt-6 rounded-full"
          onClick={() => {
            router.invalidate();
            reset();
          }}
        >
          {t("tryAgain")}
        </Button>
      </div>
      <Footer />
    </div>
  );
}
