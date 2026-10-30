import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";
import { Header } from "@/components/site/Header";
import { useI18n } from "@/i18n/I18nProvider";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import { uiText } from "@/i18n/ui-template";
import { Footer } from "@/components/site/Footer";

export function PageLayout({
  title,
  intro,
  crumb,
  children,
}: {
  title: string;
  intro?: string;
  crumb: string;
  children: ReactNode;
}) {
  const { locale } = useI18n();
  const isDefault = locale === DEFAULT_LOCALE;
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="gradient-hero border-b border-border/60">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <li>
                  <Link
                    to={isDefault ? "/" : "/$locale/"}
                    params={isDefault ? {} : { locale }}
                    className="inline-flex items-center gap-1 hover:text-foreground"
                  >
                    <Home className="h-3.5 w-3.5" /> {uiText(locale, "toolsPage.home", "Home")}
                  </Link>
                </li>
                <ChevronRight className="h-3.5 w-3.5" />
                <li className="font-medium text-foreground">{crumb}</li>
              </ol>
            </nav>
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              {title}
            </h1>
            {intro && (
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {intro}
              </p>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">{children}</section>
      </main>
      <Footer />
    </div>
  );
}

/** Simple prose block for legal/company copy. */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-6 text-base leading-relaxed text-muted-foreground [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_a]:font-medium [&_a]:text-honey [&_a:hover]:underline">
      {children}
    </div>
  );
}
