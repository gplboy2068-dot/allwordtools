import { useState } from "react";
import { Search, Sparkles, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-word-tools.jpg";
import { Button } from "@/components/ui/button";
import { trendingSearches } from "@/data/tools";
import { useI18n } from "@/i18n/I18nProvider";

const quickChips = trendingSearches.slice(0, 5);

export function Hero() {
  const { t } = useI18n();
  const [query, setQuery] = useState("");

  return (
    <section className="relative overflow-hidden gradient-hero">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:py-24 lg:px-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-3.5 py-1.5 text-xs font-semibold text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-honey" />
            {t("hero.badge")}
          </span>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {t("hero.title1")}
            <span className="block text-honey">{t("hero.title2")}</span>
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground text-balance">
            {t("hero.subtitle")}
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            role="search"
          >
            <label htmlFor="hero-search" className="sr-only">
              {t("hero.searchLabel")}
            </label>
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                id="hero-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("hero.searchPlaceholder")}
                className="h-14 w-full rounded-full border border-border bg-card pl-12 pr-4 text-base shadow-soft outline-none transition-colors placeholder:text-muted-foreground focus:border-honey focus:ring-2 focus:ring-honey/30"
              />
            </div>
            <Button type="submit" size="lg" className="h-14 rounded-full px-8 text-base">
              {t("hero.searchButton")}
            </Button>
          </form>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <TrendingUp className="h-3.5 w-3.5" /> {t("hero.popular")}
            </span>
            {quickChips.map((chip) => (
              <button
                key={chip}
                onClick={() => setQuery(chip)}
                className="rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-honey/50 hover:text-foreground"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-[2rem] gradient-honey opacity-20 blur-2xl" />
          <img
            src={heroImage}
            alt="Illustration of letter tiles, a dictionary and a magnifying glass representing word tools"
            width={1600}
            height={1200}
            loading="eager"
            fetchPriority="high"
            className="animate-float rounded-[1.75rem] border border-border/60 shadow-lift"
          />
        </div>
      </div>
    </section>
  );
}
