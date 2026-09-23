import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, Prose } from "@/components/site/PageLayout";
import { BASE_URL, inLanguage, buildLocaleHead } from "@/i18n/seo";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import { totalToolCount, categories } from "@/data/tools";
import { Github, Linkedin, Instagram, ExternalLink, Code2, AlertTriangle, ShieldCheck, Mail, Sparkles } from "lucide-react";

const LINKEDIN_URL = "https://www.linkedin.com/in/firoz-khan-1153358a/";
const GITHUB_URL = "https://github.com/fkdigitalmedia";
const INSTAGRAM_URL = "https://www.instagram.com/rtibyfiroz/";

export const Route = createFileRoute("/about")({
  head: () => {
    const title = "About AllWordTools";
    const description =
      "Learn about AllWordTools.com, an independent collection of 92 free word game solvers and language tools created and maintained by Full Stack Developer Firoz Khan under FK Digital Media.";
    const path = "/about";
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
              { "@type": "ListItem", position: 2, name: "About", item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About AllWordTools",
            description,
            url,
            inLanguage: inLanguage(DEFAULT_LOCALE),
            isPartOf: { "@type": "WebSite", name: "AllWordTools", url: home },
            mainEntity: {
              "@type": "Organization",
              name: "FK Digital Media",
              url,
              founder: {
                "@type": "Person",
                name: "Firoz Khan",
                jobTitle: "Full Stack Developer",
                image: `${BASE_URL}/author/firoz-khan.png`,
                url: `${BASE_URL}/about/firoz-khan`,
                sameAs: [LINKEDIN_URL, GITHUB_URL, INSTAGRAM_URL],
              },
            },
          }),
        },
      ],
    };
  },
  component: AboutPage,
});

export function AboutPage() {
  return (
    <PageLayout
      crumb="About"
      title="About AllWordTools"
      intro="An independent collection of free word game solvers, language helpers, and writing utilities."
    >
      <Prose>
        <h2>What AllWordTools Is</h2>
        <p>
          <strong>AllWordTools.com</strong> is an independent web toolkit providing {totalToolCount} free online word game solvers,
          letter finders, vocabulary aids, text analysis utilities, and creative writing helpers across {categories.length} distinct categories.
        </p>
        <p>
          Whether you are unscrambling letters for a casual game of Scrabble, finding five-letter combinations for Wordle,
          counting syllables for a poem, or checking word definitions, AllWordTools organizes these utilities into a fast,
          accessible platform without requiring user registration, desktop installations, or paid subscriptions.
        </p>

        <h2>Who Creates and Maintains It</h2>
        <p>
          AllWordTools.com is created, developed, and technically maintained by <strong>Firoz Khan</strong>,
          a Full Stack Developer, under his independent digital-development brand <strong>FK Digital Media</strong>.
        </p>

        <h2>About Firoz Khan</h2>
        <div className="not-prose my-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
          <img
            src="/author/firoz-khan.png"
            alt="Firoz Khan — Full Stack Developer"
            className="h-20 w-20 rounded-xl object-cover border border-border shrink-0 bg-secondary"
          />
          <div>
            <h3 className="font-display text-base font-semibold text-foreground">Firoz Khan</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Full Stack Developer &amp; Maintainer · FK Digital Media</p>
            <div className="mt-2 flex items-center gap-3 text-xs">
              <Link to="/about/firoz-khan" className="font-medium text-honey hover:underline">
                View Full Author Profile &rarr;
              </Link>
            </div>
          </div>
        </div>
        <p>
          <strong>Firoz Khan</strong> is a Full Stack Developer who engineers web applications and interactive software utilities.
          His technical role in AllWordTools encompasses full-stack website architecture, frontend UI development, algorithmic
          solver implementation, database queries, performance tuning, and continuous maintenance.
        </p>
        <p>
          Firoz approaches the website strictly from a software engineering and algorithmic perspective. He does not claim
          credentials as a linguist, lexicographer, academic professor, or tournament official. Instead, he focuses on
          writing efficient search algorithms that match user inputs against structured datasets accurately and rapidly.
        </p>
        <p>
          Learn more on his dedicated author page:{" "}
          <Link to="/about/firoz-khan" className="font-semibold text-honey hover:underline">
            Firoz Khan — Author &amp; Maintainer Profile
          </Link>.
        </p>

        <h2>About FK Digital Media</h2>
        <p>
          <strong>FK Digital Media</strong> is the independent digital-development brand associated with Firoz Khan's web projects,
          including the development and maintenance of online tools and web applications.
        </p>
        <p>
          Under the FK Digital Media banner, projects are built with an emphasis on speed, clean user interfaces, privacy-friendly
          architecture, and practical utility.
        </p>

        <h2>What We Build</h2>
        <p>
          The platform currently offers {totalToolCount} tools grouped into {categories.length} organized categories:
        </p>
        <ul>
          <li><strong>Word Solvers:</strong> Unscramblers, anagram solvers, crossword helpers, and Wordle assistants.</li>
          <li><strong>Letter Tools:</strong> Search words by starting, ending, or containing letters, count characters, and match wildcard patterns.</li>
          <li><strong>Writing Tools:</strong> Rhyme finders, syllable counters, synonym finders, and antonym generators.</li>
          <li><strong>Game Helpers:</strong> Scoring and board helpers for Scrabble, Words With Friends, Boggle, and Text Twist.</li>
          <li><strong>Advanced Solvers:</strong> Regex pattern search, missing letter finders, letter rearrangers, and reverse dictionary lookups.</li>
          <li><strong>Text Analysis:</strong> Letter frequency analyzers, vowel/consonant counters, and alphabetical sorters.</li>
          <li><strong>Dictionary &amp; Reference:</strong> Word meanings, IPA pronunciations, word origins, and example sentences.</li>
          <li><strong>Grammar &amp; Style:</strong> Voice converters, passive voice checkers, and punctuation review tools.</li>
          <li><strong>Puzzle Solvers:</strong> Solvers for Word Cookies, Wordscapes, CodyCross, and 7 Little Words.</li>
          <li><strong>Generators &amp; Quizzes:</strong> Random word, topic, letter generators, and vocabulary testing quizzes.</li>
          <li><strong>AI Writing Tools:</strong> AI word explainers, sentence creators, story prompts, and flashcard generators.</li>
        </ul>
        <p>
          You can inspect the entire catalog on our <Link to="/tools">All Tools directory</Link>.
        </p>

        <h2>How Our Tools Work</h2>
        <p>
          The majority of solvers on AllWordTools rely on deterministic algorithms written in TypeScript and JavaScript.
          When you enter a search term, the tool translates your query into algorithmic rules (such as anagram permutations,
          regular expression wildcard filters, or letter count matrices) and queries curated lexical datasets to find valid matches.
        </p>
        <p>
          Matches are sorted according to explicit criteria: letter length, Scrabble tile point values, or alphabetical order.
        </p>

        <h2>Word Lists &amp; Data Transparency</h2>
        <p>
          To generate results, AllWordTools incorporates publicly available lexical datasets, open-source word lists (such as ENABLE,
          TWL-derived lists, and SOWPODS/CSW-compatible game lists), and phonetic/pronunciation data.
        </p>
        <p>
          <strong>Independent Status:</strong> AllWordTools is an independent project. It is not affiliated with, endorsed by, or sponsored
          by Hasbro, Mattel, The New York Times, Zynga, or any board game publisher. Mentions of trademarks such as "Scrabble,"
          "Words With Friends," or "Wordle" are used solely for descriptive purposes to identify compatible gameplay rules.
        </p>
        <p>
          For an exhaustive technical breakdown of every dataset, calculation method, game scoring rule, and limitation across all 92 tools, visit our{" "}
          <Link to="/methodology" className="font-semibold text-honey hover:underline">
            Methodology &amp; Word Data Guide
          </Link>{" "}
          and read our{" "}
          <Link to="/data-limitations" className="font-semibold text-honey hover:underline">
            Data Limitations Guide
          </Link>.
        </p>

        <h2>Accuracy &amp; Testing</h2>
        <p>
          Results are generated from the word lists, datasets, algorithms, and rules used by the selected tool.
          While algorithms are regularly tested against standard benchmarks to ensure correct scoring and pattern matching,
          no automated tool can guarantee 100% completeness for every localized dictionary variant or dialect.
        </p>
        <p>
          Users are advised to verify critical results independently for formal examinations, tournament rule disputes, or academic work.
          Please read our full <Link to="/data-limitations">Data Limitations</Link> and <Link to="/disclaimer">Disclaimer</Link> for additional details.
        </p>

        <h2>AI Tools Transparency</h2>
        <p>
          Our creative writing and educational section includes tools powered by artificial intelligence (such as the{" "}
          <Link to="/tool/$tool" params={{ tool: "ai-word-explainer" }}>AI Word Explainer</Link> and{" "}
          <Link to="/tool/$tool" params={{ tool: "ai-story-generator" }}>AI Story Generator</Link>).
        </p>
        <ul>
          <li><strong>Automated Generation:</strong> AI outputs are produced by large language models and may occasionally produce inaccurate, outdated, or biased information.</li>
          <li><strong>Review Output:</strong> Always review and edit AI-generated text before relying on it for study or publication.</li>
          <li><strong>Confidentiality:</strong> Do not submit sensitive, confidential, or private personal information into AI tool input prompts. Submitted text is processed by external AI API providers.</li>
        </ul>
        <p>
          Learn more about our AI architecture on our dedicated{" "}
          <Link to="/ai-tools" className="font-semibold text-honey hover:underline">
            AI Tools Transparency Page
          </Link>.
        </p>

        <h2>Privacy &amp; Data Processing</h2>
        <p>
          We believe in transparent technical disclosure regarding how your data is handled:
        </p>
        <ul>
          <li><strong>Client-Side Algorithmic Tools:</strong> Core solvers (such as the Letter Counter, Syllable Counter, and Alphabetical Sorter) process your input entirely in your browser. Your input text is not stored on our servers.</li>
          <li><strong>Server-Assisted &amp; AI Tools:</strong> Tools that require extensive dictionary indexing or AI model inference transmit query parameters to backend serverless functions or authorized third-party APIs to return results.</li>
          <li><strong>No Mandatory Accounts:</strong> AllWordTools does not require you to create an account or provide personal contact details to access any tool.</li>
        </ul>
        <p>
          For full details on cookies, advertising, and analytics, please consult our <Link to="/privacy">Privacy Policy</Link> and <Link to="/cookie-policy">Cookie Policy</Link>.
        </p>

        <h2>Report an Error / Word Issue</h2>
        <p>
          Language evolves, and software can contain bugs. If you notice any of the following:
        </p>
        <ul>
          <li>An incorrect or misspelled word</li>
          <li>A missing valid word for a specific game dictionary</li>
          <li>An incorrect definition or pronunciation</li>
          <li>An inaccurate syllable count or game score</li>
          <li>A broken feature or unexpected solver error</li>
        </ul>
        <p>
          Please let us know so we can investigate and update the dataset or code. Visit our dedicated{" "}
          <Link to="/report-error" className="font-semibold text-honey hover:underline">
            Report a Word or Tool Error Page
          </Link>{" "}
          to submit details directly to Firoz Khan.
        </p>

        <h2>Contact &amp; Verified Social Links</h2>
        <p>
          For technical inquiries, bug reports, business discussions, or feedback, you can reach out via:
        </p>
        <ul>
          <li><strong>Direct Email:</strong> <a href="mailto:hello@allwordtools.com" className="font-semibold text-honey hover:underline">hello@allwordtools.com</a></li>
          <li><strong>Contact &amp; Error Form:</strong> <Link to="/contact">Contact Page</Link> or <Link to="/report-error">Report an Error</Link></li>
          <li><strong>GitHub Profile:</strong> <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:underline">{GITHUB_URL}</a></li>
          <li><strong>LinkedIn:</strong> <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:underline">{LINKEDIN_URL}</a></li>
          <li><strong>Instagram:</strong> <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:underline">{INSTAGRAM_URL}</a></li>
        </ul>
      </Prose>
    </PageLayout>
  );
}
