// ============================================================================
// /$locale/ — localized homepage (e.g. /es, /ar, /hi).
//
// Reuses the exact same page sections as the English homepage; the UI chrome
// and hero translate via the i18n context provided by the /$locale layout.
// SEO (title/description/hreflang/canonical/JSON-LD) is fully per-locale.
// ============================================================================

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
import { getDictionarySync } from "@/i18n/getDictionary";
import { buildLocaleHead, inLanguage } from "@/i18n/seo";
import { localePath } from "@/i18n/paths";

const SITE_NAME = "AllWordTools.com";

export const Route = createFileRoute("/$locale/")({
  head: ({ params }) => {
    const locale = params.locale;
    const dict = getDictionarySync(locale);
    const title = `${dict.hero.title1} ${dict.hero.title2} — ${SITE_NAME}`;
    const description = dict.hero.subtitle;

    const { meta, links } = buildLocaleHead({ path: "/", locale, title, description });

    return {
      meta,
      links,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE_NAME,
            url: localePath(locale, "/"),
            description,
            inLanguage: inLanguage(locale),
          }),
        },
      ],
    };
  },
  component: LocalizedHome,
});

function LocalizedHome() {
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
