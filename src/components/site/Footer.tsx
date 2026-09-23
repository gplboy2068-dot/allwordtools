import { Link } from "@tanstack/react-router";
import { SpellCheck2 } from "lucide-react";
import { categories, popularTools, toolsFromSlugs } from "@/data/tools";
import { openCookieSettings } from "@/lib/cookie-consent";
import { useI18n } from "@/i18n/I18nProvider";
import { DEFAULT_LOCALE } from "@/i18n/locales";

const footerPopular = toolsFromSlugs(popularTools);
const muted = "text-muted-foreground transition-colors hover:text-foreground";

export function Footer() {
  const { locale, t } = useI18n();
  const isDefault = locale === DEFAULT_LOCALE;
  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Brand band */}
        <div className="mb-12 max-w-md">
          <Link
            to={isDefault ? "/" : "/$locale/"}
            params={isDefault ? {} : { locale }}
            className="flex items-center gap-2.5"
            aria-label="AllWordTools home"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl gradient-ink text-primary-foreground">
              <SpellCheck2 className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-semibold tracking-tight">
              AllWord<span className="text-honey">Tools</span>
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            AllWordTools is an independent collection of online word and language tools.
          </p>
          <div className="mt-3 text-xs text-muted-foreground">
            <span>Maintained by </span>
            <Link
              to={isDefault ? "/about/firoz-khan" : "/$locale/about/firoz-khan"}
              params={isDefault ? {} : { locale }}
              className="font-medium text-foreground hover:underline"
            >
              Firoz Khan
            </Link>
            <span> (Full Stack Developer) · </span>
            <span className="font-medium text-foreground">FK Digital Media</span>
          </div>
          <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
            <a
              href="https://github.com/fkdigitalmedia"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <span>·</span>
            <a
              href="https://www.linkedin.com/in/firoz-khan-1153358a/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
            <span>·</span>
            <a
              href="https://www.instagram.com/rtibyfiroz/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>

        {/* Exactly five link columns */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* 1. Company */}
          <div>
            <h3 className="font-display text-sm font-semibold">{t("footer.company")}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  to={isDefault ? "/about" : "/$locale/about"}
                  params={isDefault ? {} : { locale }}
                  className={muted}
                >
                  {t("footer.about")}
                </Link>
              </li>
              <li>
                <Link
                  to={isDefault ? "/about/firoz-khan" : "/$locale/about/firoz-khan"}
                  params={isDefault ? {} : { locale }}
                  className={muted}
                >
                  Author &amp; Maintainer
                </Link>
              </li>
              <li>
                <Link
                  to={isDefault ? "/methodology" : "/$locale/methodology"}
                  params={isDefault ? {} : { locale }}
                  className={muted}
                >
                  Methodology &amp; Data
                </Link>
              </li>
              <li>
                <Link
                  to={isDefault ? "/data-limitations" : "/$locale/data-limitations"}
                  params={isDefault ? {} : { locale }}
                  className={muted}
                >
                  Data Limitations
                </Link>
              </li>
              <li>
                <Link
                  to={isDefault ? "/ai-tools" : "/$locale/ai-tools"}
                  params={isDefault ? {} : { locale }}
                  className={muted}
                >
                  AI Transparency
                </Link>
              </li>
              <li>
                <Link
                  to={isDefault ? "/blog" : "/$locale/blog"}
                  params={isDefault ? {} : { locale }}
                  className={muted}
                >
                  {t("footer.blog")}
                </Link>
              </li>
              <li>
                <Link
                  to={isDefault ? "/learn" : "/$locale/learn"}
                  params={isDefault ? {} : { locale }}
                  className={muted}
                >
                  {t("footer.learn")}
                </Link>
              </li>
              <li>
                <Link
                  to={isDefault ? "/contact" : "/$locale/contact"}
                  params={isDefault ? {} : { locale }}
                  className={muted}
                >
                  {t("footer.contact")}
                </Link>
              </li>
              <li>
                <Link
                  to={isDefault ? "/report-error" : "/$locale/report-error"}
                  params={isDefault ? {} : { locale }}
                  className="text-xs text-honey hover:underline"
                >
                  Report an Error
                </Link>
              </li>
            </ul>
          </div>

          {/* 2. Popular Tools */}
          <div>
            <h3 className="font-display text-sm font-semibold">{t("footer.popularTools")}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footerPopular.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    to={isDefault ? "/tool/$tool" : "/$locale/tool/$tool"}
                    params={isDefault ? { tool: tool.slug } : { locale, tool: tool.slug }}
                    className={muted}
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to={isDefault ? "/tools" : "/$locale/tools"}
                  params={isDefault ? {} : { locale }}
                  className="font-semibold text-honey hover:underline"
                >
                  {t("footer.viewAllTools")}
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Categories */}
          <div>
            <h3 className="font-display text-sm font-semibold">{t("footer.categories")}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {categories.slice(0, 7).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={isDefault ? "/category/$category" : "/$locale/category/$category"}
                    params={isDefault ? { category: cat.slug } : { locale, category: cat.slug }}
                    className={muted}
                  >
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Resources */}
          <div>
            <h3 className="font-display text-sm font-semibold">{t("footer.resources")}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  to={isDefault ? "/tools" : "/$locale/tools"}
                  params={isDefault ? {} : { locale }}
                  className={muted}
                >
                  {t("footer.allTools")}
                </Link>
              </li>
              <li>
                <Link
                  to={isDefault ? "/category/$category" : "/$locale/category/$category"}
                  params={isDefault ? { category: "ai-tools" } : { locale, category: "ai-tools" }}
                  className={muted}
                >
                  {t("footer.aiTools")}
                </Link>
              </li>
              <li>
                <Link
                  to={isDefault ? "/tool/$tool" : "/$locale/tool/$tool"}
                  params={isDefault ? { tool: "word-of-the-day" } : { locale, tool: "word-of-the-day" }}
                  className={muted}
                >
                  {t("footer.wordOfDay")}
                </Link>
              </li>
              <li>
                <Link
                  to={isDefault ? "/learn" : "/$locale/learn"}
                  params={isDefault ? {} : { locale }}
                  className={muted}
                >
                  {t("footer.learningHub")}
                </Link>
              </li>
              <li>
                <a href="/sitemap.xml" className={muted}>
                  {t("footer.sitemap")}
                </a>
              </li>
            </ul>
          </div>

          {/* 5. Legal */}
          <div>
            <h3 className="font-display text-sm font-semibold">{t("footer.legal")}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  to={isDefault ? "/privacy" : "/$locale/privacy"}
                  params={isDefault ? {} : { locale }}
                  className={muted}
                >
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link
                  to={isDefault ? "/terms" : "/$locale/terms"}
                  params={isDefault ? {} : { locale }}
                  className={muted}
                >
                  {t("footer.terms")}
                </Link>
              </li>
              <li>
                <Link
                  to={isDefault ? "/cookie-policy" : "/$locale/cookie-policy"}
                  params={isDefault ? {} : { locale }}
                  className={muted}
                >
                  {t("footer.cookiePolicy")}
                </Link>
              </li>
              <li>
                <Link
                  to={isDefault ? "/disclaimer" : "/$locale/disclaimer"}
                  params={isDefault ? {} : { locale }}
                  className={muted}
                >
                  {t("footer.disclaimer")}
                </Link>
              </li>
              <li>
                <Link
                  to={isDefault ? "/about" : "/$locale/about"}
                  params={isDefault ? {} : { locale }}
                  className={muted}
                >
                  {t("footer.about")}
                </Link>
              </li>
              <li>
                <Link
                  to={isDefault ? "/contact" : "/$locale/contact"}
                  params={isDefault ? {} : { locale }}
                  className={muted}
                >
                  {t("footer.contact")}
                </Link>
              </li>
              <li>
                <Link
                  to={isDefault ? "/dmca" : "/$locale/dmca"}
                  params={isDefault ? {} : { locale }}
                  className={muted}
                >
                  {t("footer.dmca")}
                </Link>
              </li>
              <li>
                <a href="/sitemap.xml" className={muted}>
                  {t("footer.sitemap")}
                </a>
              </li>
              <li>
                <button type="button" onClick={openCookieSettings} className={muted}>
                  {t("footer.cookieSettings")}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>{t("footer.rights", { year: new Date().getFullYear() })}</p>
          <p>{t("footer.madeFor")}</p>
        </div>
      </div>
    </footer>
  );
}
