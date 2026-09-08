import { faqs } from "@/data/faqs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "./SectionHeading";

export function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="faq">
      <SectionHeading
        id="faq"
        eyebrow="Questions & answers"
        title="Frequently asked questions"
        description="Everything you might want to know about using AllWordTools."
        centered
      />
      <Accordion type="single" collapsible className="mt-8 w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border-border/70">
            <AccordionTrigger className="text-left font-display text-base font-semibold">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent forceMount className="text-sm leading-relaxed text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
