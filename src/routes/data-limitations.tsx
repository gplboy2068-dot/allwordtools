import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, Prose } from "@/components/site/PageLayout";
import { BASE_URL, inLanguage, buildLocaleHead } from "@/i18n/seo";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import {
  AlertTriangle,
  BookA,
  CheckCircle2,
  Cpu,
  Database,
  ExternalLink,
  HelpCircle,
  Layers,
  Scale,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/data-limitations")({
  head: () => {
    const title = "AllWordTools Data Limitations — Word Lists, Dictionaries & Accuracy";
    const description =
      "Transparent technical explanation of AllWordTools data coverage, dictionary boundaries, word list differences, scoring rules, and why no single word list contains every possible word.";
    const path = "/data-limitations";
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
              { "@type": "ListItem", position: 2, name: "Data Limitations", item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: title,
            description,
            url,
            inLanguage: inLanguage(DEFAULT_LOCALE),
            isPartOf: { "@type": "WebSite", name: "AllWordTools", url: home },
          }),
        },
      ],
    };
  },
  component: DataLimitationsPage,
});

export function DataLimitationsPage() {
  return (
    <PageLayout
      crumb="Data Limitations"
      title="AllWordTools Data Limitations"
      intro="A comprehensive guide to understanding our data sources, dictionary boundaries, scoring mechanics, and why word coverage varies across tools."
    >
      <Prose>
        {/* Executive Overview */}
        <h2>1. Overview of Data Variations Across Tools</h2>
        <p>
          At <strong>AllWordTools.com</strong>, our 92 specialized utilities do not rely on a single monolithic database.
          Instead, different tools depend on different:
        </p>
        <ul>
          <li><strong>Word lists</strong> (such as the public domain ENABLE lexicon of ~168,000 words)</li>
          <li><strong>General dictionaries</strong> (such as the Free Dictionary API derived from Wiktionary)</li>
          <li><strong>Deterministic algorithms</strong> (such as string frequency counters and permutation engines)</li>
          <li><strong>External semantic APIs</strong> (such as Datamuse for rhymes and thesaurus associations)</li>
          <li><strong>Artificial intelligence models</strong> (such as DeepSeek for creative writing and grammar assistance)</li>
          <li><strong>Game-specific rule sets</strong> (such as Scrabble, Words With Friends, and Boggle scoring tables)</li>
        </ul>
        <p>
          Because of these technical differences, <strong>accuracy, vocabulary coverage, and result types naturally vary between tools</strong>.
          No single word list or dictionary contains every possible English word, spelling variant, proper noun, technical term,
          regional dialect word, or newly minted neologism.
        </p>

        {/* 2. Understanding Our Results */}
        <h2>2. Understanding Our Results</h2>
        <p>
          To interpret outputs accurately, users should understand which category of result a specific tool produces.
          Our tools output results in five distinct classifications:
        </p>

        <div className="not-prose my-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-xs">
          {/* Card 1: Dictionary Result */}
          <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-4 shadow-soft">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <BookA className="h-4 w-4" />
            </span>
            <div className="mt-3 flex items-center justify-between">
              <h3 className="font-display text-sm font-semibold text-foreground">Dictionary Result</h3>
              <Badge variant="outline" className="text-[10px] border-blue-500/40 text-blue-600 dark:text-blue-400">
                Lexical Source
              </Badge>
            </div>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              Retrieved directly from an external lexical dataset or dictionary (such as the Free Dictionary API).
              Provides formal definitions, parts of speech, pronunciations, and etymologies.
            </p>
          </div>

          {/* Card 2: Word-List Result */}
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 shadow-soft">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Layers className="h-4 w-4" />
            </span>
            <div className="mt-3 flex items-center justify-between">
              <h3 className="font-display text-sm font-semibold text-foreground">Word-List Result</h3>
              <Badge variant="outline" className="text-[10px] border-amber-500/40 text-amber-600 dark:text-amber-400">
                Dataset Inclusion
              </Badge>
            </div>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              Determined strictly by whether a letter sequence exists in the local benchmark word list (e.g. ENABLE).
              Validates game eligibility without providing formal definitions.
            </p>
          </div>

          {/* Card 3: Calculated Result */}
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 shadow-soft">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Cpu className="h-4 w-4" />
            </span>
            <div className="mt-3 flex items-center justify-between">
              <h3 className="font-display text-sm font-semibold text-foreground">Calculated Result</h3>
              <Badge variant="outline" className="text-[10px] border-emerald-500/40 text-emerald-600 dark:text-emerald-400">
                Deterministic
              </Badge>
            </div>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              Produced mathematically or logically using a deterministic algorithm from your input text
              (such as character counting, letter frequency analysis, alphabetical sorting, or BFS graph traversal).
            </p>
          </div>

          {/* Card 4: API Result */}
          <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/5 p-4 shadow-soft">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Database className="h-4 w-4" />
            </span>
            <div className="mt-3 flex items-center justify-between">
              <h3 className="font-display text-sm font-semibold text-foreground">API Result</h3>
              <Badge variant="outline" className="text-[10px] border-indigo-500/40 text-indigo-600 dark:text-indigo-400">
                Live Service
              </Badge>
            </div>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              Retrieved asynchronously from a third-party lexical service (such as Datamuse for rhyming phonemes,
              antonyms, synonyms, and bigram collocations).
            </p>
          </div>

          {/* Card 5: AI Result */}
          <div className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-4 shadow-soft sm:col-span-2 lg:col-span-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Sparkles className="h-4 w-4" />
            </span>
            <div className="mt-3 flex items-center justify-between">
              <h3 className="font-display text-sm font-semibold text-foreground">AI Result</h3>
              <Badge variant="outline" className="text-[10px] border-purple-500/40 text-purple-600 dark:text-purple-400">
                Probabilistic LLM
              </Badge>
            </div>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              Generated dynamically by a large language model (DeepSeek). AI outputs are creative and context-sensitive,
              but probabilistic in nature. <strong>AI-generated results may contain errors and should always be reviewed by a human.</strong>
            </p>
          </div>
        </div>

        {/* 3. Word List Limitations */}
        <h2>3. Word List Limitations</h2>
        <p>
          Competitive word game word lists (such as ENABLE, NASPA NWL, and Collins CSW) are engineered for fairness,
          memorization, and tournament adjudication, rather than exhaustive general communication. Word lists differ significantly in:
        </p>
        <ul>
          <li><strong>Vocabulary Coverage:</strong> Specialized lists prioritize 2-to-8 letter words commonly drawn on game tiles while omitting multi-word phrases.</li>
          <li><strong>Spelling Variants:</strong> American English (e.g. <em>color, honor, analyze</em>) versus British/Commonwealth English (e.g. <em>colour, honour, analyse</em>).</li>
          <li><strong>Inflections &amp; Plurals:</strong> Plurals, conjugations, and comparative forms (-er, -est) may or may not be listed depending on lexicographical standards.</li>
          <li><strong>Proper Nouns &amp; Capitalization:</strong> Standard game word lists exclude proper names, brand trademarks, geographical places, and holiday names.</li>
          <li><strong>Abbreviations &amp; Acronyms:</strong> Short forms (such as <em>NASA, ASAP, Dr.</em>) are strictly excluded from competitive game lists.</li>
          <li><strong>Technical &amp; Slang Terms:</strong> Medical, legal, chemical, and rapidly evolving internet slang may take years to receive official tournament adoption.</li>
        </ul>

        <div className="not-prose my-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 text-sm text-foreground">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
            <div className="space-y-2">
              <strong className="block text-base font-semibold">Crucial Distinctions in Word Existence</strong>
              <p className="text-muted-foreground leading-relaxed">
                <strong>A word being absent from a particular list does not mean that the word does not exist in the English language.</strong> Many valid scientific, medical, and regional words are excluded from game dictionaries.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Similarly, a word appearing in a word list does not mean it is accepted by every dictionary or game.</strong> Obsolete or archaic words accepted in tournament Scrabble may not be recognized by casual word game apps or contemporary standard dictionaries.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Dictionary Limitations */}
        <h2>4. Dictionary Limitations</h2>
        <p>
          Our definition and pronunciation tools rely on public open-source lexical archives:
        </p>
        <ul>
          <li><strong>Variable Definitions:</strong> Lexicographical definitions reflect the perspective of the underlying source (Wiktionary). Word meanings can evolve, and nuanced legal or technical terms may differ from specialized encyclopedias.</li>
          <li><strong>Pronunciation Differences:</strong> Audio recordings and IPA phonetic notation represent General American (GA) or Received Pronunciation (RP). They do not capture every regional accent, vowel merger (e.g. cot-caught merger), or dialect.</li>
          <li><strong>Multiple Meanings:</strong> Many English words are polysemous (possessing multiple distinct meanings). Our tools display primary senses, but rare historical senses may not be prioritized.</li>
        </ul>

        {/* 5. Game Tool Limitations & Non-Affiliation */}
        <h2>5. Game Tool Limitations &amp; Non-Affiliation</h2>
        <p>
          Word game solvers are subject to game-specific constraints:
        </p>
        <ul>
          <li><strong>Accepted Word Lists Differ:</strong> Scrabble, Words With Friends, Wordle, CodyCross, and Wordscapes each maintain distinct, proprietary accepted-word lists.</li>
          <li><strong>Rules Evolve Over Time:</strong> Game publishers update word databases, ban list entries, or change allowable letter bonuses periodically.</li>
          <li><strong>Independent Status:</strong> AllWordTools is an independent website and is not affiliated with, sponsored by, or endorsed by the respective game publishers or trademark owners (including Hasbro, Mattel, Zynga, The New York Times, Fanatee, or PeopleFun).</li>
        </ul>

        {/* 6. Scoring Tool Transparency */}
        <h2>6. Scoring Tool Transparency</h2>
        <p>
          When using game helpers like our <Link to="/tool/$tool" params={{ tool: "scrabble-helper" }}>Scrabble Helper</Link> or{" "}
          <Link to="/tool/$tool" params={{ tool: "words-with-friends-helper" }}>Words With Friends Helper</Link>:
        </p>
        <div className="not-prose my-6 rounded-2xl border border-border/70 bg-card p-5 shadow-soft text-sm">
          <div className="flex items-start gap-3">
            <Scale className="mt-0.5 h-5 w-5 shrink-0 text-honey" />
            <div className="space-y-2">
              <strong className="block text-base font-semibold text-foreground">
                Base Word Score vs. Complete Board Score
              </strong>
              <p className="text-muted-foreground leading-relaxed">
                Our solvers calculate the <strong>base tile point value</strong> of formed words using that game's specific letter scoring table (e.g. Scrabble vs. WWF).
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Our calculators do not simulate the entire physical board layout.</strong> They do not automatically calculate Double Letter (DL), Triple Letter (TL), Double Word (DW), or Triple Word (TW) multipliers, nor parallel interlocking plays on adjacent rows, unless explicitly configured.
              </p>
              <p className="text-muted-foreground leading-relaxed font-medium text-foreground">
                Do not assume a basic word tile score represents a final tournament match score.
              </p>
            </div>
          </div>
        </div>

        {/* 7. Data Correction Workflow */}
        <h2>7. Data Correction Workflow</h2>
        <p>
          When users or maintainers identify potential lexical inaccuracies, we follow a transparent technical workflow:
        </p>
        <ol>
          <li><strong>Report Submission:</strong> User submits a bug, missing word, or score discrepancy via our <Link to="/report-error">Error Reporting Form</Link>.</li>
          <li><strong>Editorial Review:</strong> Maintainer <Link to="/about/firoz-khan">Firoz Khan</Link> reviews the submission and inspects the affected tool.</li>
          <li><strong>Source Verification:</strong> The reported word or rule is cross-referenced against authoritative sources (e.g. official NASPA / WESPA rulebooks or Wiktionary revisions).</li>
          <li><strong>Code/Dataset Adjustment:</strong> If an error is confirmed, the local word list, regex matrix, or algorithm is updated and tested.</li>
          <li><strong>Deployment:</strong> Updated builds are deployed to Cloudflare serverless edge infrastructure.</li>
        </ol>

        {/* Last Updated Information */}
        <div className="not-prose my-6 rounded-xl border border-border/50 bg-secondary/30 p-4 text-xs text-muted-foreground">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span><strong>Primary Word-List Version:</strong> ENABLE Lexicon (Public Domain Benchmark)</span>
            <span><strong>Last Dataset Verification:</strong> September 2026</span>
          </div>
        </div>

        <p>
          For complete details on each individual tool's algorithms, explore our{" "}
          <Link to="/methodology" className="font-semibold text-honey hover:underline">
            Methodology &amp; Word Data Guide
          </Link>
          , review our{" "}
          <Link to="/data-sources" className="font-semibold text-honey hover:underline">
            Data Sources &amp; Attribution Directory
          </Link>
          , or inspect our <Link to="/ai-tools">AI Tools Transparency Page</Link>.
        </p>
      </Prose>
    </PageLayout>
  );
}
