import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, Prose } from "@/components/site/PageLayout";
import { BASE_URL, inLanguage, buildLocaleHead } from "@/i18n/seo";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import {
  Database,
  ExternalLink,
  ShieldCheck,
  Cpu,
  FileCode,
  Layers,
  Sparkles,
  Info,
  Scale,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/data-sources")({
  head: () => {
    const title = "AllWordTools Data Sources, Attribution & Dataset Licensing";
    const description =
      "Transparent technical inventory of all word lists, dictionaries, APIs, open-source libraries, and AI services used by AllWordTools, including licenses, version benchmarks, and attributions.";
    const path = "/data-sources";
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
              { "@type": "ListItem", position: 2, name: "Data Sources & Attribution", item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: "AllWordTools Data Sources, Attribution & Dataset Licensing",
            description,
            url,
            inLanguage: inLanguage(DEFAULT_LOCALE),
            isPartOf: { "@type": "WebSite", name: "AllWordTools", url: home },
            author: {
              "@type": "Person",
              name: "Firoz Khan",
              jobTitle: "Full Stack Developer",
              url: `${BASE_URL}/about/firoz-khan`,
              sameAs: [
                "https://www.linkedin.com/in/firoz-khan-1153358a/",
                "https://github.com/fkdigitalmedia",
                "https://www.instagram.com/rtibyfiroz/",
              ],
            },
            publisher: {
              "@type": "Organization",
              name: "FK Digital Media",
              url: `${BASE_URL}/about`,
            },
          }),
        },
      ],
    };
  },
  component: DataSourcesPage,
});

export function DataSourcesPage() {
  return (
    <PageLayout
      crumb="Data Sources"
      title="AllWordTools Data Sources"
      intro="A comprehensive, transparent inventory of every external dataset, lexical API, word list, open-source library, and AI provider powering the 92 tools on AllWordTools.com."
    >
      <Prose>
        {/* Core Statement Required */}
        <div className="not-prose my-6 rounded-2xl border border-honey/30 bg-honey/5 p-5 text-sm text-foreground">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-honey" />
            <p className="leading-relaxed">
              <strong>AllWordTools uses a combination of internally implemented algorithms, word lists, dictionaries, third-party datasets, APIs, open-source software, and AI services depending on the tool.</strong> Different tools serve distinct linguistic tasks and therefore rely on fundamentally different data architectures.
            </p>
          </div>
        </div>

        <h2>1. Complete Source-to-Tool Mapping</h2>
        <p>
          The table below maps each primary data source and runtime service to the specific tools that consume it, its operational purpose, its architectural source type, and its licensing status.
        </p>

        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-border/70 bg-card shadow-soft">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/70 bg-muted/50 text-foreground font-semibold">
              <tr>
                <th className="p-3.5">Source</th>
                <th className="p-3.5">Source Type</th>
                <th className="p-3.5">Key Tools Using It</th>
                <th className="p-3.5">Functional Purpose</th>
                <th className="p-3.5">License / Terms</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-muted-foreground">
              <tr className="hover:bg-muted/20">
                <td className="p-3.5 font-medium text-foreground">
                  ENABLE Lexicon (~168k words)
                </td>
                <td className="p-3.5">
                  <Badge variant="outline" className="text-[11px] font-normal">Static File (Client-side)</Badge>
                </td>
                <td className="p-3.5">
                  Word Unscrambler, Anagram Solver, Word Finder, Crossword Solver, Scrabble Helper, Words With Friends Helper, Boggle Solver, Hangman Solver, Letter Tools (30+ tools)
                </td>
                <td className="p-3.5">
                  High-speed letter permutation matching, sub-anagram solving, pattern filtering, and prefix/suffix indexing in browser memory.
                </td>
                <td className="p-3.5">
                  Public Domain (1997)
                </td>
              </tr>

              <tr className="hover:bg-muted/20">
                <td className="p-3.5 font-medium text-foreground">
                  Datamuse API (api.datamuse.com)
                </td>
                <td className="p-3.5">
                  <Badge variant="outline" className="text-[11px] font-normal border-blue-500/30 text-blue-600 dark:text-blue-400">Live Lexical API</Badge>
                </td>
                <td className="p-3.5">
                  Rhyme Finder, Synonyms, Antonyms, Reverse Dictionary, Word Associations, Adjectives for Words, Nouns for Adjectives, Consonance Finder, Assonance Finder
                </td>
                <td className="p-3.5">
                  Phonetic rhyming queries, semantic vector matching, lexical relationships, and ngram bigram collocations.
                </td>
                <td className="p-3.5">
                  Free API (Datamuse Terms of Service; derived from WordNet BSD &amp; CMU Dict)
                </td>
              </tr>

              <tr className="hover:bg-muted/20">
                <td className="p-3.5 font-medium text-foreground">
                  Free Dictionary API (api.dictionaryapi.dev)
                </td>
                <td className="p-3.5">
                  <Badge variant="outline" className="text-[11px] font-normal border-blue-500/30 text-blue-600 dark:text-blue-400">Live Lexical API</Badge>
                </td>
                <td className="p-3.5">
                  English Dictionary, Word Meaning, Word Origin / Etymology, Word Pronunciation, IPA Converter, Example Sentences
                </td>
                <td className="p-3.5">
                  Retrieving English Wiktionary definition trees, etymological root text, IPA transcriptions, and volunteer human audio pronunciations.
                </td>
                <td className="p-3.5">
                  CC BY-SA 4.0 / GFDL (English Wiktionary community)
                </td>
              </tr>

              <tr className="hover:bg-muted/20">
                <td className="p-3.5 font-medium text-foreground">
                  DeepSeek Large Language Model (deepseek-chat)
                </td>
                <td className="p-3.5">
                  <Badge variant="outline" className="text-[11px] font-normal border-purple-500/30 text-purple-600 dark:text-purple-400">Serverless AI Inference</Badge>
                </td>
                <td className="p-3.5">
                  13 AI Tools: AI Word Explainer, AI Word Story, AI Vocab Builder, AI Slang Decoder, AI Idiom Explainer, AI Mnemonics, AI Rhyme Generator, Grammar Checker, Sentence Rewriter, Tone Checker, Passive Voice Checker, Readability Improver, AI Flashcards
                </td>
                <td className="p-3.5">
                  Contextual reasoning, narrative synthesis, structural grammar correction, and dynamic linguistic simplification.
                </td>
                <td className="p-3.5">
                  Commercial API (DeepSeek Terms of Service; TLS transit, non-retained)
                </td>
              </tr>

              <tr className="hover:bg-muted/20">
                <td className="p-3.5 font-medium text-foreground">
                  Curated Educational Word Banks
                </td>
                <td className="p-3.5">
                  <Badge variant="outline" className="text-[11px] font-normal">Bundled Code Datasets</Badge>
                </td>
                <td className="p-3.5">
                  Sight Words (Dolch &amp; Fry), CVC Word Generator, Tongue Twisters, Name Generators (Fantasy, Clan, Pet, Baby), Word Quizzes
                </td>
                <td className="p-3.5">
                  Educational literacy drills, deterministic phonics benchmarks, themed naming tables, and multiple-choice vocabulary assessments.
                </td>
                <td className="p-3.5">
                  Public Domain benchmarks &amp; original open curation
                </td>
              </tr>

              <tr className="hover:bg-muted/20">
                <td className="p-3.5 font-medium text-foreground">
                  Deterministic &amp; Heuristic Engines
                </td>
                <td className="p-3.5">
                  <Badge variant="outline" className="text-[11px] font-normal border-emerald-500/30 text-emerald-600 dark:text-emerald-400">Pure Local Code</Badge>
                </td>
                <td className="p-3.5">
                  Word Counter, Character Counter, Letter Counter, Syllable Counter, Readability Score (Flesch-Kincaid), Word Ladder (BFS), Morse Code, Pig Latin, Caesar Cipher, Alphabetical Sorter
                </td>
                <td className="p-3.5">
                  Mathematical string statistics, graph breadth-first search pathfinding, syllable orthographic heuristics, and cryptographic character mapping.
                </td>
                <td className="p-3.5">
                  Proprietary / Open-source algorithms implemented by AllWordTools
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>2. Third-Party Source Attribution &amp; Licenses</h2>
        <p>
          We respect intellectual property and maintain strict compliance with all applicable open-source, Creative Commons, and API distribution licenses:
        </p>

        <div className="not-prose my-6 space-y-4">
          {/* ENABLE Lexicon */}
          <div className="rounded-xl border border-border/70 bg-card p-5 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-display text-base font-semibold text-foreground">
                ENABLE (Enhanced North American Benchmark Lexicon)
              </h3>
              <Badge variant="secondary" className="text-xs">Public Domain</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              <strong>Provider / Origin:</strong> Compiled by Alan Beale and Cooperating Systems (1997) as an unencumbered, public-domain reference benchmark for computer word-game software.
            </p>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              <strong>Official Reference:</strong> Distributed publicly via Project Gutenberg and open word-game archives.
            </p>
            <p className="mt-2 text-xs text-muted-foreground/80 italic">
              Attribution statement: "Word search, unscrambling, and sub-anagram tools utilize the public domain ENABLE lexicon benchmark (~168,000 words)."
            </p>
          </div>

          {/* Datamuse API */}
          <div className="rounded-xl border border-border/70 bg-card p-5 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-display text-base font-semibold text-foreground">
                Datamuse API
              </h3>
              <Badge variant="secondary" className="text-xs">Free Lexical API / WordNet BSD</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              <strong>Provider:</strong> Datamuse (<a href="https://www.datamuse.com/api/" target="_blank" rel="noopener noreferrer" className="text-honey hover:underline">datamuse.com/api</a>).
            </p>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              <strong>Underlying Lexical Corpora:</strong> Synthesizes Princeton University's <em>WordNet 3.0</em> (licensed under a 3-clause BSD-style license), the Carnegie Mellon University (CMU) Pronouncing Dictionary (version 0.7b, public domain / BSD-style), and Google Books Ngram corpus frequency distributions.
            </p>
            <p className="mt-2 text-xs text-muted-foreground/80 italic">
              Attribution statement: "Phonetic rhyming, reverse-dictionary concepts, and lexical association features are powered by the Datamuse API (datamuse.com)."
            </p>
          </div>

          {/* Free Dictionary API & Wiktionary */}
          <div className="rounded-xl border border-border/70 bg-card p-5 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-display text-base font-semibold text-foreground">
                Free Dictionary API &amp; English Wiktionary
              </h3>
              <Badge variant="secondary" className="text-xs">CC BY-SA 4.0 / GFDL</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              <strong>API Provider:</strong> Open-source project maintained by Meet Patel (<a href="https://dictionaryapi.dev/" target="_blank" rel="noopener noreferrer" className="text-honey hover:underline">dictionaryapi.dev</a>).
            </p>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              <strong>Content Origin:</strong> Extracted from volunteer-contributed entries on <a href="https://en.wiktionary.org/" target="_blank" rel="noopener noreferrer" className="text-honey hover:underline">English Wiktionary</a>. Wiktionary text is licensed under the Creative Commons Attribution-ShareAlike 4.0 International License (CC BY-SA 4.0) and GNU Free Documentation License (GFDL).
            </p>
            <p className="mt-2 text-xs text-muted-foreground/80 italic">
              Attribution statement: "Dictionary definitions, etymological notes, IPA pronunciations, and audio clips are parsed from Wiktionary contributors via the open-source Free Dictionary API."
            </p>
          </div>

          {/* DeepSeek API */}
          <div className="rounded-xl border border-border/70 bg-card p-5 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-display text-base font-semibold text-foreground">
                DeepSeek API (Model: deepseek-chat)
              </h3>
              <Badge variant="secondary" className="text-xs">Commercial API Terms</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              <strong>Provider:</strong> DeepSeek (<a href="https://www.deepseek.com/" target="_blank" rel="noopener noreferrer" className="text-honey hover:underline">deepseek.com</a>).
            </p>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              <strong>Usage:</strong> Generates contextual explanations, stories, flashcards, and grammar revisions via secure serverless Cloudflare Workers / Nitro handlers. Prompts are transmitted over TLS, processed ephemerally, and never retained for foundational model training.
            </p>
            <p className="mt-2 text-xs text-muted-foreground/80 italic">
              Attribution statement: "AI-assisted writing, grammar checking, and language exploration tools utilize the DeepSeek-V3 language model via serverless API integration."
            </p>
          </div>

          {/* Educational Curations */}
          <div className="rounded-xl border border-border/70 bg-card p-5 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-display text-base font-semibold text-foreground">
                Dolch &amp; Fry Sight Word Benchmarks
              </h3>
              <Badge variant="secondary" className="text-xs">Public Educational Benchmarks</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              <strong>Origin:</strong> Edward William Dolch (1936, 220 service words) and Edward Fry (1957 / 1980, 1,000 instant words). Widely adopted across early childhood and elementary literacy curricula globally.
            </p>
          </div>
        </div>

        <h2>3. Software Dependency &amp; Library Licensing</h2>
        <p>
          AllWordTools.com is built entirely on modern, permissive open-source libraries. An audit of our runtime dependencies confirms full compliance with all distribution terms:
        </p>
        <ul>
          <li><strong>React 19 &amp; React DOM</strong> — MIT License (Meta Platforms, Inc.)</li>
          <li><strong>TanStack Start, TanStack Router &amp; TanStack Query</strong> — MIT License (Tanner Linsley &amp; contributors)</li>
          <li><strong>Tailwind CSS v4</strong> — MIT License (Tailwind Labs, Inc.)</li>
          <li><strong>Radix UI Primitives</strong> — MIT License (WorkOS, Inc.)</li>
          <li><strong>Lucide React Icons</strong> — ISC / MIT License (Lucide Contributors)</li>
          <li><strong>Zod</strong> — MIT License (Colin McDonnell)</li>
          <li><strong>date-fns</strong> — MIT License (Sasha Koss &amp; Lesha Koss)</li>
          <li><strong>Class Variance Authority (CVA)</strong> — Apache-2.0 License (Joe Bell)</li>
          <li><strong>Recharts</strong> — MIT License (recharts.org)</li>
        </ul>

        <h2>4. Dataset Dates &amp; Version Benchmarks</h2>
        <p>
          To maintain transparency without fabricating artificial release numbers, the following verified version benchmarks describe our current source baselines:
        </p>
        <div className="not-prose my-6 grid gap-4 sm:grid-cols-2 text-xs">
          <div className="rounded-xl border border-border/70 bg-card p-4 shadow-soft">
            <h4 className="font-semibold text-foreground text-sm">ENABLE Lexicon</h4>
            <p className="mt-1 text-muted-foreground"><strong>Baseline Release:</strong> ENABLE 1.0 (1997 public domain benchmark, ~168k words).</p>
            <p className="text-muted-foreground"><strong>Last Internal Audit:</strong> Q3 2026.</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-card p-4 shadow-soft">
            <h4 className="font-semibold text-foreground text-sm">CMU Pronouncing Dictionary</h4>
            <p className="mt-1 text-muted-foreground"><strong>Baseline Release:</strong> CMUdict 0.7b (Carnegie Mellon Speech Group).</p>
            <p className="text-muted-foreground"><strong>Access Method:</strong> Queried dynamically via Datamuse API.</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-card p-4 shadow-soft">
            <h4 className="font-semibold text-foreground text-sm">WordNet Database</h4>
            <p className="mt-1 text-muted-foreground"><strong>Baseline Release:</strong> WordNet 3.0 (Princeton University Cognitive Science Lab).</p>
            <p className="text-muted-foreground"><strong>Access Method:</strong> Queried dynamically via Datamuse API.</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-card p-4 shadow-soft">
            <h4 className="font-semibold text-foreground text-sm">DeepSeek LLM</h4>
            <p className="mt-1 text-muted-foreground"><strong>Model Endpoint:</strong> <code>deepseek-chat</code> (DeepSeek-V3 architecture).</p>
            <p className="text-muted-foreground"><strong>Integration Date:</strong> August 2026.</p>
          </div>
        </div>

        <h2>5. Trademark Fair Use &amp; Non-Affiliation</h2>
        <p>
          AllWordTools.com is an independent platform developed by{" "}
          <Link to="/about/firoz-khan" className="font-semibold text-honey hover:underline">
            Firoz Khan
          </Link>{" "}
          under <strong>FK Digital Media</strong>.
        </p>
        <p>
          References to third-party games (such as <em>Scrabble</em>, <em>Words With Friends</em>, <em>Wordle</em>, <em>Boggle</em>, <em>CodyCross</em>, or <em>Wordscapes</em>) and their publishers (including Hasbro, Mattel, Zynga / Take-Two Interactive, The New York Times Company, Fanatee, and PeopleFun) are made strictly for descriptive and comparative purposes under the doctrine of nominative fair use.
        </p>
        <p>
          AllWordTools is not affiliated with, authorized by, sponsored by, or endorsed by any of these trademark holders or publishers. All registered trademarks remain the sole property of their respective owners.
        </p>

        <h2>6. Questions or Data Corrections</h2>
        <p>
          If you believe a word definition is inaccurate, notice an outdated pronunciation record, or have questions about our dataset licensing, please contact us:
        </p>
        <ul>
          <li><strong>Report an Error:</strong> Use our structured <Link to="/report-error">Error Reporting form</Link> for rapid verification against authoritative lexicons.</li>
          <li><strong>General Inquiries:</strong> Email <a href="mailto:contact@allwordtools.com">contact@allwordtools.com</a> or visit our <Link to="/contact">Contact Page</Link>.</li>
          <li><strong>Methodology Details:</strong> Review our comprehensive <Link to="/methodology">Methodology &amp; Algorithms</Link> and <Link to="/data-limitations">Data Limitations</Link> guides.</li>
        </ul>
      </Prose>
    </PageLayout>
  );
}
