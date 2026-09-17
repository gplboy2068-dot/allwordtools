import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { PopularToolsShowcase } from "@/components/home/PopularToolsShowcase";
import { BottomCta } from "@/components/site/LinkSections";
import { Benefits } from "@/components/home/Benefits";
import { SeoContent } from "@/components/home/SeoContent";
import { Faq } from "@/components/home/Faq";
import { AdBanner } from "@/components/site/AdBanner";
import { faqs } from "@/data/faqs";
import { categories } from "@/data/tools";
import { buildLocaleHead } from "@/i18n/seo";
import { DEFAULT_LOCALE } from "@/i18n/locales";

const SITE_NAME = "AllWordTools.com";
const TITLE = "AllWordTools.com — Free Word Game Solvers & English Word Tools";
const DESCRIPTION =
  "Unscramble words, solve anagrams, beat Wordle, Scrabble & crosswords, and find rhymes, synonyms and more with 300+ fast, free word tools. No sign-up required.";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: "/",
    description: DESCRIPTION,
    logo: "/favicon.ico",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: "/",
    description: DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "/?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      ...categories.map((cat, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: cat.title,
        item: `/category/${cat.slug}`,
      })),
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  },
];

export const Route = createFileRoute("/")({
  head: () => {
    const { meta, links } = buildLocaleHead({
      path: "/",
      locale: DEFAULT_LOCALE,
      title: TITLE,
      description: DESCRIPTION,
      keywords:
        "word unscrambler, anagram solver, word finder, wordle solver, scrabble helper, crossword solver, rhyming words, synonyms, word games, word tools",
    });
    return {
      meta,
      links,
      scripts: jsonLd.map((data) => ({
        type: "application/ld+json",
        children: JSON.stringify(data),
      })),
    };
  },
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <CategoryGrid />
        <PopularToolsShowcase />
        <AdBanner />
        <Benefits />
        <SeoContent />
        <Faq />
        <BottomCta />
      </main>
      <Footer />
    </div>
  );
}
