import { useState, useMemo } from "react";
import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
  Home,
  Lightbulb,
  Sparkles,
  Search,
  X,
  Zap,
  ShieldCheck,
  BookOpen,
  HelpCircle,
  Wrench,
} from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { categories, type Tool } from "@/data/tools";
import { getCategoryReferences } from "@/lib/external-links";
import { buildLocaleHead, inLanguage, BASE_URL } from "@/i18n/seo";
import { localePath } from "@/i18n/paths";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import { useI18n } from "@/i18n/I18nProvider";
import { getLocalizedCategory } from "@/i18n/categories";
import { getLocalizedCategoryFullContent } from "@/i18n/category-content";
import { getLocalizedToolInfo } from "@/i18n/tools-data";

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
    searchPlaceholder: string;
    showingCount: string;
    noToolsMatch: string;
    clearSearch: string;
    navTools: string;
    navGuide: string;
    navTips: string;
    navFaq: string;
    badgeFree: string;
    badgeInstant: string;
    badgeNoSignup: string;
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
    searchPlaceholder: "Filter tools in this category...",
    showingCount: "Showing {visible} of {total} tools",
    noToolsMatch: "No tools match your filter.",
    clearSearch: "Reset filter",
    navTools: "Tools",
    navGuide: "Guide",
    navTips: "Pro Tips",
    navFaq: "FAQs",
    badgeFree: "100% Free & Unlimited",
    badgeInstant: "Instant in Browser",
    badgeNoSignup: "No Sign-up Required",
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
    searchPlaceholder: "Filtrar herramientas en esta categoría...",
    showingCount: "Mostrando {visible} de {total} herramientas",
    noToolsMatch: "Ninguna herramienta coincide con tu búsqueda.",
    clearSearch: "Restablecer filtro",
    navTools: "Herramientas",
    navGuide: "Guía",
    navTips: "Consejos",
    navFaq: "Preguntas",
    badgeFree: "100% Gratis e Ilimitado",
    badgeInstant: "Instantáneo en Navegador",
    badgeNoSignup: "Sin Registro",
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
    searchPlaceholder: "Werkzeuge in dieser Kategorie filtern...",
    showingCount: "{visible} von {total} Werkzeugen angezeigt",
    noToolsMatch: "Keine Werkzeuge entsprechen deiner Suche.",
    clearSearch: "Filter zurücksetzen",
    navTools: "Werkzeuge",
    navGuide: "Leitfaden",
    navTips: "Tipps",
    navFaq: "FAQ",
    badgeFree: "100% Kostenlos & Unbegrenzt",
    badgeInstant: "Sofort im Browser",
    badgeNoSignup: "Keine Anmeldung nötig",
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
    searchPlaceholder: "Filtrar ferramentas nesta categoria...",
    showingCount: "Mostrando {visible} de {total} ferramentas",
    noToolsMatch: "Nenhuma ferramenta encontrada com essa busca.",
    clearSearch: "Limpar filtro",
    navTools: "Ferramentas",
    navGuide: "Guia",
    navTips: "Dicas",
    navFaq: "Perguntas",
    badgeFree: "100% Grátis e Ilimitado",
    badgeInstant: "Instantâneo no Navegador",
    badgeNoSignup: "Sem Registro",
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
    searchPlaceholder: "Фильтр инструментов в этой категории...",
    showingCount: "Показано {visible} из {total} инструментов",
    noToolsMatch: "Инструменты по вашему запросу не найдены.",
    clearSearch: "Сбросить фильтр",
    navTools: "Инструменты",
    navGuide: "Руководство",
    navTips: "Советы",
    navFaq: "Вопросы",
    badgeFree: "100% Бесплатно и Безлимитно",
    badgeInstant: "Мгновенно в браузере",
    badgeNoSignup: "Без регистрации",
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
    searchPlaceholder: "Filter alat di kategori ini...",
    showingCount: "Menampilkan {visible} dari {total} alat",
    noToolsMatch: "Tidak ada alat yang cocok dengan pencarian.",
    clearSearch: "Reset filter",
    navTools: "Alat",
    navGuide: "Panduan",
    navTips: "Tips",
    navFaq: "FAQ",
    badgeFree: "100% Gratis & Tanpa Batas",
    badgeInstant: "Instan di Peramban",
    badgeNoSignup: "Tanpa Perlu Daftar",
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
    searchPlaceholder: "تصفية الأدوات في هذا القسم...",
    showingCount: "عرض {visible} من {total} أدوات",
    noToolsMatch: "لم يتم العثور على أدوات مطابقة لبحثك.",
    clearSearch: "إعادة ضبط التصفية",
    navTools: "الأدوات",
    navGuide: "الدليل",
    navTips: "نصائح",
    navFaq: "الأسئلة الشائعة",
    badgeFree: "مجاني 100% وغير محدود",
    badgeInstant: "فوري في المتصفح",
    badgeNoSignup: "لا يلزم التسجيل",
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
    searchPlaceholder: "इस श्रेणी के टूल्स फ़िल्टर करें...",
    showingCount: "{total} में से {visible} टूल्स दिख रहे हैं",
    noToolsMatch: "आपकी खोज से मेल खाता कोई टूल नहीं मिला।",
    clearSearch: "फ़िल्टर रीसेट करें",
    navTools: "टूल्स",
    navGuide: "गाइड",
    navTips: "प्रो टिप्स",
    navFaq: "सामान्य प्रश्न",
    badgeFree: "100% मुफ़्त और असीमित",
    badgeInstant: "ब्राउज़र में तुरंत परिणाम",
    badgeNoSignup: "साइन-अप की आवश्यकता नहीं",
  },
};

export function CategoryPageView({ slug }: { slug: string }) {
  const [searchQuery, setSearchQuery] = useState("");
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

  const filteredTools = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return category.tools;
    return category.tools.filter((tool) => {
      const loc = getLocalizedToolInfo(tool, locale);
      return (
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.slug.toLowerCase().includes(query) ||
        loc.name.toLowerCase().includes(query) ||
        loc.description.toLowerCase().includes(query)
      );
    });
  }, [category.tools, searchQuery, locale]);

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
                    to={isDefault ? "/" : "/$locale"}
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

                {/* Trust & Performance Signals */}
                <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5 text-honey" />
                    {t("badgeInstant")}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-honey" />
                    {t("badgeFree")}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-honey" />
                    {t("badgeNoSignup")}
                  </span>
                </div>

                {/* Quick Jump Bar */}
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <a
                    href="#tools"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/80 px-3.5 py-1.5 text-xs font-medium text-foreground shadow-sm transition-all hover:border-honey/60 hover:bg-card hover:text-honey"
                  >
                    <Wrench className="h-3.5 w-3.5 text-honey" />
                    {t("navTools")} ({category.tools.length})
                  </a>
                  {content && (
                    <a
                      href="#about"
                      className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/80 px-3.5 py-1.5 text-xs font-medium text-foreground shadow-sm transition-all hover:border-honey/60 hover:bg-card hover:text-honey"
                    >
                      <BookOpen className="h-3.5 w-3.5 text-honey" />
                      {t("navGuide")}
                    </a>
                  )}
                  {content && content.tips && content.tips.length > 0 && (
                    <a
                      href="#tips"
                      className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/80 px-3.5 py-1.5 text-xs font-medium text-foreground shadow-sm transition-all hover:border-honey/60 hover:bg-card hover:text-honey"
                    >
                      <Lightbulb className="h-3.5 w-3.5 text-honey" />
                      {t("navTips")}
                    </a>
                  )}
                  {content && content.faqs && content.faqs.length > 0 && (
                    <a
                      href="#faq"
                      className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/80 px-3.5 py-1.5 text-xs font-medium text-foreground shadow-sm transition-all hover:border-honey/60 hover:bg-card hover:text-honey"
                    >
                      <HelpCircle className="h-3.5 w-3.5 text-honey" />
                      {t("navFaq")} ({content.faqs.length})
                    </a>
                  )}
                </div>
              </div>
              <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl gradient-ink text-primary-foreground shadow-lift">
                <Icon className="h-10 w-10" />
              </span>
            </div>
          </div>
        </section>

        {/* Tools grid */}
        <section
          id="tools"
          className="mx-auto max-w-7xl scroll-mt-20 px-4 py-14 sm:px-6 lg:px-8"
          aria-labelledby="tools-heading"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="tools-heading" className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                {locCat.title} {t("toolsTitleSuffix")}
              </h2>
              <p className="mt-1 text-muted-foreground">
                {t("pickToolSub")}
              </p>
            </div>

            {/* Instant Filter & Search */}
            <div className="relative w-full sm:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 rounded-xl border-border/80 bg-card/60 pl-9 pr-8 backdrop-blur focus-visible:ring-honey"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  aria-label={t("clearSearch")}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Search Results Count if filtering */}
          {searchQuery.trim() && (
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {t("showingCount")
                  .replace("{visible}", filteredTools.length.toString())
                  .replace("{total}", category.tools.length.toString())}
              </span>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="font-medium text-honey transition-colors hover:underline"
              >
                {t("clearSearch")}
              </button>
            </div>
          )}

          {filteredTools.length > 0 ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTools.map((tool: Tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-dashed border-border/80 bg-card/40 p-12 text-center">
              <p className="text-base font-medium text-foreground">{t("noToolsMatch")}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                &ldquo;{searchQuery}&rdquo;
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="mt-4 rounded-xl border-border/80"
              >
                {t("clearSearch")}
              </Button>
            </div>
          )}
        </section>

        {/* Strategic Ad Banner */}
        <AdBanner />

        {/* Long-form content */}
        {content && (
          <section id="about" className="scroll-mt-20 bg-secondary/40 py-14" aria-labelledby="about-heading">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <span className="text-sm font-semibold uppercase tracking-wider text-honey">
                {content.eyebrow}
              </span>
              <h2
                id="about-heading"
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
                <div id="tips" className="mt-12 scroll-mt-24 rounded-3xl border border-border/70 bg-card p-7 shadow-soft">
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
          <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-14 sm:px-6 lg:px-8" aria-labelledby="faq-heading">
            <span className="text-sm font-semibold uppercase tracking-wider text-honey">
              {t("faqEyebrow")}
            </span>
            <h2
              id="faq-heading"
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
            to={isDefault ? "/" : "/$locale"}
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
