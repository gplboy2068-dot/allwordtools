import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, Prose } from "@/components/site/PageLayout";
import { BASE_URL, inLanguage, buildLocaleHead } from "@/i18n/seo";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import { Github, Linkedin, Instagram, ExternalLink, Code2, Layers, Cpu, ShieldCheck, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const PROFILE_NAME = "Firoz Khan";
const JOB_TITLE = "Full Stack Developer";
const BRAND_NAME = "FK Digital Media";

const LINKEDIN_URL = "https://www.linkedin.com/in/firoz-khan-1153358a/";
const GITHUB_URL = "https://github.com/fkdigitalmedia";
const INSTAGRAM_URL = "https://www.instagram.com/";

export const Route = createFileRoute("/about/firoz-khan")({
  head: () => {
    const title = `${PROFILE_NAME} — ${JOB_TITLE} & Creator of AllWordTools`;
    const description =
      "Author and maintainer profile for Firoz Khan, Full Stack Developer and technical maintainer of AllWordTools.com under the FK Digital Media brand.";
    const path = "/about/firoz-khan";
    const { meta, links } = buildLocaleHead({ path, locale: DEFAULT_LOCALE, title, description });
    const home = `${BASE_URL}/`;
    const url = `${BASE_URL}${path}`;

    return {
      meta,
      links,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            inLanguage: inLanguage(DEFAULT_LOCALE),
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: home },
              { "@type": "ListItem", position: 2, name: "About", item: `${BASE_URL}/about` },
              { "@type": "ListItem", position: 3, name: PROFILE_NAME, item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: PROFILE_NAME,
            jobTitle: JOB_TITLE,
            url,
            worksFor: {
              "@type": "Organization",
              name: BRAND_NAME,
              url: `${BASE_URL}/about`,
            },
            sameAs: [LINKEDIN_URL, GITHUB_URL, INSTAGRAM_URL],
          }),
        },
      ],
    };
  },
  component: FirozKhanProfilePage,
});

export function FirozKhanProfilePage() {
  return (
    <PageLayout
      crumb="Firoz Khan"
      title={PROFILE_NAME}
      intro={`${JOB_TITLE} · Technical Creator & Maintainer of AllWordTools`}
    >
      <div className="space-y-10">
        {/* Profile Header Card */}
        <div className="rounded-3xl border border-border/70 bg-card p-6 sm:p-8 shadow-soft">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-secondary/60 px-3.5 py-1 text-xs font-semibold text-honey mb-3">
                <Code2 className="h-3.5 w-3.5" /> Full Stack Developer
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                {PROFILE_NAME}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
                Full Stack Developer responsible for the technical development, architecture, algorithms,
                and ongoing maintenance of <Link to="/" className="font-medium text-foreground hover:underline">AllWordTools.com</Link> under the <span className="font-medium text-foreground">{BRAND_NAME}</span> digital development brand.
              </p>
            </div>

            {/* Verified External Profile Links */}
            <div className="flex flex-wrap md:flex-col gap-2.5 w-full sm:w-auto shrink-0">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-background px-4 py-2 text-xs font-semibold text-foreground hover:border-honey hover:text-honey transition-colors shadow-xs"
              >
                <Linkedin className="h-4 w-4 text-[#0077B5]" />
                LinkedIn
                <ExternalLink className="h-3 w-3 opacity-60 ml-auto" />
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-background px-4 py-2 text-xs font-semibold text-foreground hover:border-honey hover:text-honey transition-colors shadow-xs"
              >
                <Github className="h-4 w-4 text-foreground" />
                GitHub
                <ExternalLink className="h-3 w-3 opacity-60 ml-auto" />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-background px-4 py-2 text-xs font-semibold text-foreground hover:border-honey hover:text-honey transition-colors shadow-xs"
              >
                <Instagram className="h-4 w-4 text-[#E4405F]" />
                Instagram
                <ExternalLink className="h-3 w-3 opacity-60 ml-auto" />
              </a>
            </div>
          </div>
        </div>

        {/* Detailed Narrative Section */}
        <Prose>
          <h2>Role in AllWordTools</h2>
          <p>
            Firoz Khan is the sole software engineer and maintainer of AllWordTools.com. His factual technical responsibilities include:
          </p>
          <ul>
            <li><strong>Full-stack website development:</strong> Architecture, routing, and deployment of the platform using TypeScript, React, TanStack Start/Router, and Cloudflare serverless edge infrastructure.</li>
            <li><strong>Interactive tool development:</strong> Engineering algorithmic solvers including anagram finders, letter unscramblers, wildcard pattern matchers, crossword fill utilities, and frequency counters.</li>
            <li><strong>Frontend implementation:</strong> Crafting responsive, mobile-first user interfaces, layout grids, dark/light themes, and accessible keyboard navigation with Tailwind CSS.</li>
            <li><strong>Backend &amp; API integration:</strong> Implementing server-side functions, edge D1 database bindings, search indexes, and third-party lexical/AI API integrations.</li>
            <li><strong>Performance &amp; code quality:</strong> Ensuring sub-second load times, Cumulative Layout Shift (CLS) mitigation, server-side rendering (SSR), and continuous build optimizations.</li>
            <li><strong>Ongoing maintenance &amp; testing:</strong> Regular testing of solver accuracy against standard word lists and deploying technical updates.</li>
          </ul>

          <h2>About FK Digital Media</h2>
          <p>
            FK Digital Media is the independent digital-development brand associated with Firoz Khan's web projects, including the development and maintenance of online tools and web applications.
          </p>
          <p>
            Operating independently, FK Digital Media focuses on creating fast, utility-focused web tools that solve practical problems for everyday users without mandatory sign-ups, excessive bloat, or paywalls.
          </p>

          <h2>Technical Philosophy &amp; Accuracy</h2>
          <p>
            Firoz Khan approaches AllWordTools strictly from a software engineering and algorithmic perspective:
          </p>
          <ul>
            <li><strong>Independent Project:</strong> AllWordTools is an independent web toolkit and is not officially affiliated with, endorsed by, or sponsored by Hasbro, Mattel, The New York Times, Words With Friends, or Scrabble.</li>
            <li><strong>Transparent Lexical Sourcing:</strong> The website uses publicly available dictionaries, open word frequency lists, and pattern-matching algorithms. Firoz Khan does not claim to be a linguist, lexicographer, or dictionary authority; the tools simply process text according to programmatically defined rules and datasets.</li>
            <li><strong>Data Integrity:</strong> Solvers rank matches mathematically based on letter scores, length, and pattern constraints. Results reflect the underlying datasets utilized by each specific tool.</li>
          </ul>

          <h2>Technical Development Profile</h2>
          <p>
            To view open-source contributions, technical repositories, and software development activity, visit Firoz Khan's developer profile on GitHub:
          </p>
          <p>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-honey hover:underline"
            >
              <Github className="h-4 w-4" />
              View development profile on GitHub ({GITHUB_URL})
            </a>
          </p>

          <h2>Reporting Errors &amp; Contact</h2>
          <p>
            If you encounter a software bug, incorrect solver output, missing word, or have suggestions for new tools, Firoz Khan reviews user submissions directly.
          </p>
          <p>
            Please visit the <Link to="/contact">Contact Page</Link> to report word or tool errors or send technical feedback.
          </p>
        </Prose>
      </div>
    </PageLayout>
  );
}
