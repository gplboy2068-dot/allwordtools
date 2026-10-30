import { seoContent } from "@/data/homepage-content";
import { useI18n } from "@/i18n/I18nProvider";
import { getHomeContent } from "@/i18n/home-content";

export function SeoContent() {
  const { locale } = useI18n();
  const localized = getHomeContent(locale);
  const eyebrow = localized?.guideEyebrow ?? "The complete guide";
  const title = localized?.guideTitle ?? "Everything you need to know about word tools";
  const sections = localized
    ? localized.guideSections.map((sec, i) => ({
        id: seoContent[i]?.id ?? `guide-${i}`,
        heading: sec.heading,
        paragraphs: sec.paragraphs,
      }))
    : seoContent;

  return (
    <section className="bg-secondary/40 py-16" aria-labelledby="learn-more">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <span className="text-sm font-semibold uppercase tracking-wider text-honey">{eyebrow}</span>
        <h2
          id="learn-more"
          className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {title}
        </h2>

        <div className="mt-8 space-y-12">
          {sections.map((block) => (
            <article key={block.id} id={block.id}>
              <h3 className="font-display text-2xl font-semibold tracking-tight">
                {block.heading}
              </h3>
              <div className="mt-3 space-y-4">
                {block.paragraphs.map((para, i) => (
                  <p key={i} className="text-base leading-relaxed text-muted-foreground">
                    {para}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
