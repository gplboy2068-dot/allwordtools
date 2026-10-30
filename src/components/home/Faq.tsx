import { faqs } from "@/data/faqs";
import { SectionHeading } from "./SectionHeading";
import { useI18n } from "@/i18n/I18nProvider";
import { getHomeContent } from "@/i18n/home-content";

/**
 * The homepage's SINGLE FAQ block, in Q:/A: format. The FAQPage JSON-LD in
 * the route head is emitted once and matches exactly these questions and
 * answers. (The old accordion "Questions & answers" section duplicated it.)
 */
export function Faq() {
  const { locale } = useI18n();
  const localized = getHomeContent(locale);
  const title = localized?.faqTitle ?? "Frequently Asked Questions";
  const description =
    localized?.faqDescription ?? "Everything you might want to know about using AllWordTools.";
  const items = localized?.faqs ?? faqs;

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="faq">
      <SectionHeading id="faq" title={title} description={description} centered />
      <div className="mt-8 space-y-6">
        {items.map((faq, i) => (
          <div key={i}>
            <p className="font-display text-base font-semibold">Q: {faq.question}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              A: {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
