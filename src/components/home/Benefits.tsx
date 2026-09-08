import {
  Zap,
  GraduationCap,
  Smartphone,
  ShieldCheck,
  Gift,
  Infinity as InfinityIcon,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { useI18n } from "@/i18n/I18nProvider";

const benefits = [
  {
    icon: Zap,
    title: "Instant results",
    description: "Answers appear the moment you press search — no waiting, no reloading.",
  },
  {
    icon: GraduationCap,
    title: "Learn as you play",
    description: "Definitions, scores and related words help you build vocabulary naturally.",
  },
  {
    icon: ShieldCheck,
    title: "Accurate dictionaries",
    description: "Large, well-maintained word lists tuned to each game you play.",
  },
  {
    icon: Smartphone,
    title: "Mobile first",
    description: "A fast, responsive experience on phones, tablets and desktops alike.",
  },
  {
    icon: Gift,
    title: "Always free",
    description: "Every tool is 100% free with no sign-up and no limits.",
  },
  {
    icon: InfinityIcon,
    title: "Constantly growing",
    description: "New solvers and language tools added on a regular basis.",
  },
];

export function Benefits() {
  const { t } = useI18n();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="benefits">
      <SectionHeading
        id="benefits"
        eyebrow={t("benefits.eyebrow") || "Why AllWordTools"}
        title={t("benefits.title") || "Built for players and word lovers"}
        description={
          t("benefits.description") ||
          "Everything you need to win more games and write with confidence, in one place."
        }
        centered
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((b) => {
          const Icon = b.icon;
          return (
            <div
              key={b.title}
              className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft transition-shadow hover:shadow-lift"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{b.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {b.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
