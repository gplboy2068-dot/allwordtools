import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, Prose } from "@/components/site/PageLayout";
import { BASE_URL, inLanguage, buildLocaleHead } from "@/i18n/seo";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import { allTools, categories, totalToolCount } from "@/data/tools";
import { TOOL_METHODOLOGY, type ToolMethodology } from "@/data/tool-methodology";
import {
  Database,
  Cpu,
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Layers,
  ArrowRight,
  ExternalLink,
  Table as TableIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/methodology")({
  head: () => {
    const title = "Word Data, Dictionary & Algorithm Methodology — AllWordTools";
    const description =
      "Transparent technical documentation explaining where word data comes from, how our 92 tools calculate scores, which APIs and AI models are used, and how word validity is determined.";
    const path = "/methodology";
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
              { "@type": "ListItem", position: 2, name: "Methodology & Data", item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: "AllWordTools Word Data, Dictionary & Tool Methodology",
            description,
            url,
            inLanguage: inLanguage(DEFAULT_LOCALE),
            isPartOf: { "@type": "WebSite", name: "AllWordTools", url: home },
            author: {
              "@type": "Person",
              name: "Firoz Khan",
              jobTitle: "Full Stack Developer",
              url: `${BASE_URL}/about/firoz-khan`,
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
  component: MethodologyPage,
});

export function MethodologyPage() {
  const [filterQuery, setFilterQuery] = useState("");
  const [selectedSource, setSelectedSource] = useState<string>("all");

  const filteredTools = useMemo(() => {
    return allTools.filter((tool) => {
      const m = TOOL_METHODOLOGY[tool.slug];
      if (!m) return false;
      const matchesQuery =
        tool.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
        tool.slug.toLowerCase().includes(filterQuery.toLowerCase()) ||
        m.source.toLowerCase().includes(filterQuery.toLowerCase()) ||
        m.processing.toLowerCase().includes(filterQuery.toLowerCase());

      const matchesSource =
        selectedSource === "all" ||
        (selectedSource === "enable" && m.source.includes("ENABLE")) ||
        (selectedSource === "datamuse" && m.source.includes("Datamuse")) ||
        (selectedSource === "dictionary" && m.source.includes("Free Dictionary")) ||
        (selectedSource === "ai" && m.source.includes("AI")) ||
        (selectedSource === "deterministic" &&
          (m.source.includes("Deterministic") || m.source.includes("Heuristic"))) ||
        (selectedSource === "curated" && m.source.includes("Curated"));

      return matchesQuery && matchesSource;
    });
  }, [filterQuery, selectedSource]);

  return (
    <PageLayout
      crumb="Methodology"
      title="Word Data & Tool Methodology"
      intro="A comprehensive and transparent technical guide detailing where word data comes from, how algorithms operate, which tools use AI or third-party APIs, and how word validity is determined."
    >
      <Prose>
        {/* Executive Summary */}
        <h2>1. Overview &amp; Independent Operation</h2>
        <p>
          <strong>AllWordTools.com</strong> is an independent software toolkit engineered and maintained by{" "}
          <Link to="/about/firoz-khan" className="font-semibold text-honey hover:underline">
            Firoz Khan
          </Link>{" "}
          under <strong>FK Digital Media</strong>. The platform hosts exactly {totalToolCount} word game solvers,
          vocabulary aids, and language tools across {categories.length} categories.
        </p>
        <p>
          We operate with complete engineering transparency: we do not claim ownership of standard English words,
          we do not invent proprietary dictionaries, and we explicitly document the origin, calculation methods,
          and limitations of every tool in our catalog.
        </p>

        {/* Legal Disclaimer Box */}
        <div className="not-prose my-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 text-sm text-foreground">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
            <div className="space-y-2">
              <strong className="block text-base font-semibold">
                Independent Status &amp; Trademark Disclaimers
              </strong>
              <p className="text-muted-foreground leading-relaxed">
                AllWordTools.com is strictly an independent utility. We have no affiliation, sponsorship, endorsement,
                or licensing partnership with <strong>Hasbro Inc.</strong> or <strong>Mattel Inc.</strong> (owners of Scrabble),{" "}
                <strong>Zynga Inc. / Take-Two Interactive</strong> (owners of Words With Friends),{" "}
                <strong>The New York Times Company</strong> (owners of Wordle and Strands),{" "}
                <strong>Fanatee Inc.</strong> (CodyCross), <strong>PeopleFun</strong> (Wordscapes), or{" "}
                <strong>Blue Ox Family Games</strong> (7 Little Words).
              </p>
              <p className="text-muted-foreground leading-relaxed">
                All trademarks, game names, board designs, and registered intellectual property belong exclusively to their
                respective owners and are referenced solely for descriptive, comparative, and educational purposes under nominative fair use.
              </p>
            </div>
          </div>
        </div>

        <h2>2. Where Our Word Data Comes From</h2>
        <p>
          AllWordTools relies on five distinct categories of lexical datasets and services. Each tool is built
          around the specific dataset best suited to its functional task:
        </p>

        <h3>A. ENABLE Public Domain Lexicon (~168,000 Words)</h3>
        <p>
          The primary foundation for our word unscramblers, anagram solvers, crossword helpers, and letter-position finders
          is the <strong>ENABLE</strong> (Enhanced North American Benchmark Lexicon) word list.
        </p>
        <ul>
          <li><strong>Source File:</strong> Hosted as a static asset (<code>/dictionaries/enable.txt</code>) and cached client-side in the user's browser memory upon tool initialization.</li>
          <li><strong>Vocabulary Size:</strong> Approximately 168,000 verified English words ranging from 2 to 28 letters.</li>
          <li><strong>Licensing:</strong> Public domain, widely accepted since 1997 as the standard reference benchmark for computer word-game algorithms.</li>
          <li><strong>Exclusions:</strong> Excludes proper nouns, hyphenated words, abbreviations, and words with apostrophes.</li>
        </ul>

        <h3>B. Datamuse Semantic &amp; Phonetic API</h3>
        <p>
          Writing utilities requiring phonetic rhyming data, semantic relationships, or thesaurus connections connect
          client-side to the free <strong>Datamuse API</strong> (<code>api.datamuse.com</code>).
        </p>
        <ul>
          <li><strong>Endpoints Used:</strong> <code>rel_syn</code> (synonyms), <code>rel_ant</code> (strict antonyms), <code>rel_rhy</code> (perfect rhymes), <code>rel_nry</code> (approximate rhymes), <code>ml</code> (reverse dictionary concept matching), and <code>rel_bga/rel_bgb</code> (bigram collocations).</li>
          <li><strong>Underlying Data:</strong> Synthesizes the Carnegie Mellon University (CMU) Pronouncing Dictionary, WordNet 3.0, and large-scale Google Books Ngram corpus statistics.</li>
          <li><strong>Architecture:</strong> Queries execute asynchronously directly from your browser with no intermediate API keys required.</li>
        </ul>

        <h3>C. Free Dictionary API</h3>
        <p>
          Our reference tools (Dictionary, Word Meaning, Pronunciation, IPA Converter, Word Origin, and Example Sentences)
          query the open-source <strong>Free Dictionary API</strong> (<code>api.dictionaryapi.dev</code>).
        </p>
        <ul>
          <li><strong>Underlying Data:</strong> Parsed from English Wiktionary, containing definitions, IPA transcriptions, volunteer-contributed human audio recordings, and etymological roots.</li>
          <li><strong>Coverage:</strong> Covers over 300,000 modern English vocabulary terms, idioms, and grammatical classifications.</li>
        </ul>

        <h3>D. Curated Offline Banks &amp; Benchmarks</h3>
        <p>
          Tools designed for education, creative brainstorming, and entertainment use curated offline word banks bundled directly with the application:
        </p>
        <ul>
          <li><strong>Literary &amp; Phonics Tools:</strong> Dolch and Fry sight word benchmark lists (Pre-K to 3rd grade), 3-letter CVC phonetic word lists, and phonetic tongue twisters.</li>
          <li><strong>Name Generators:</strong> Curated databases of historical, fictional, and pet names organized by genre (fantasy, sci-fi, gothic, medieval).</li>
          <li><strong>Word Quizzes:</strong> Graded question banks with plausible distractors, Latin/Greek roots, prefixes, and suffixes.</li>
        </ul>

        <h3>E. DeepSeek Large Language Model (AI Tools)</h3>
        <p>
          Creative writing and grammar analysis tools (such as the AI Word Explainer, AI Story Generator, Grammar Checker,
          and Passive Voice Checker) use serverless backend functions connecting to <strong>DeepSeek</strong> (<code>deepseek-chat</code>).
        </p>
        <ul>
          <li><strong>Model:</strong> DeepSeek Chat via secure serverless Cloudflare Workers / Nitro handlers.</li>
          <li><strong>Data Handling:</strong> User prompts are transmitted securely via TLS and processed transiently to generate output. Input text is not stored in our databases or used for training.</li>
          <li><strong>Probabilistic Nature:</strong> AI outputs are non-deterministic. Users should review and verify AI-generated text before relying on it for formal or academic purposes.</li>
        </ul>

        <h2>3. Processing Taxonomy: How Results Are Generated</h2>
        <p>
          To understand our tool performance and privacy model, tools fall into three operational categories:
        </p>

        <div className="not-prose my-6 grid gap-4 sm:grid-cols-3 text-xs">
          <div className="rounded-xl border border-border/70 bg-card p-4 shadow-soft">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Cpu className="h-4 w-4" />
            </span>
            <h4 className="mt-3 font-display text-sm font-semibold text-foreground">
              Purely Deterministic (Local)
            </h4>
            <p className="mt-1 text-muted-foreground leading-relaxed">
              Executed 100% in your browser. Inputs are evaluated against local string rules, regex matrices, or the in-memory ENABLE list. Zero server calls.
            </p>
          </div>

          <div className="rounded-xl border border-border/70 bg-card p-4 shadow-soft">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Database className="h-4 w-4" />
            </span>
            <h4 className="mt-3 font-display text-sm font-semibold text-foreground">
              Live Lexical APIs
            </h4>
            <p className="mt-1 text-muted-foreground leading-relaxed">
              Browser sends asynchronous HTTP requests to Datamuse or Free Dictionary API to retrieve phonetic, semantic, or definition records.
            </p>
          </div>

          <div className="rounded-xl border border-border/70 bg-card p-4 shadow-soft">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Sparkles className="h-4 w-4" />
            </span>
            <h4 className="mt-3 font-display text-sm font-semibold text-foreground">
              Serverless AI Inference
            </h4>
            <p className="mt-1 text-muted-foreground leading-relaxed">
              Tasks requiring contextual reasoning or natural language synthesis route through secure serverless functions invoking DeepSeek LLM models.
            </p>
          </div>
        </div>

        <h2>4. Game Scoring Formulas &amp; Rules</h2>
        <p>
          Scoring in word games depends on letter valuation tables, board placement multipliers, and length bonuses.
          Our solvers implement the exact point tables specified below:
        </p>

        <h3>Scrabble vs. Words With Friends Letter Values</h3>
        <p>
          Notice that tile point values differ significantly between games. For example, the letter <strong>B</strong> is
          worth 3 points in Scrabble but 4 points in Words With Friends; <strong>J</strong> is 8 points in Scrabble but
          10 points in Words With Friends:
        </p>

        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-border/70 bg-card p-1 shadow-soft">
          <table className="w-full text-left text-xs">
            <thead className="bg-secondary/50 font-semibold text-foreground border-b border-border/70">
              <tr>
                <th className="p-3">Letters</th>
                <th className="p-3">Scrabble Tile Value</th>
                <th className="p-3">Words With Friends Tile Value</th>
                <th className="p-3">Key Difference Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 text-muted-foreground">
              <tr>
                <td className="p-3 font-mono font-bold text-foreground">A, E, I, O, R, S, T</td>
                <td className="p-3">1 point</td>
                <td className="p-3">1 point</td>
                <td className="p-3">Identical common vowels and consonants</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-foreground">L, N, U</td>
                <td className="p-3">1 point</td>
                <td className="p-3 font-semibold text-amber-600 dark:text-amber-400">2 points</td>
                <td className="p-3">+1 pt higher in Words With Friends</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-foreground">D</td>
                <td className="p-3">2 points</td>
                <td className="p-3">2 points</td>
                <td className="p-3">Identical</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-foreground">G</td>
                <td className="p-3">2 points</td>
                <td className="p-3 font-semibold text-amber-600 dark:text-amber-400">3 points</td>
                <td className="p-3">+1 pt higher in Words With Friends</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-foreground">B, C, M, P</td>
                <td className="p-3">3 points</td>
                <td className="p-3 font-semibold text-amber-600 dark:text-amber-400">4 points</td>
                <td className="p-3">+1 pt higher in Words With Friends</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-foreground">F, W, Y</td>
                <td className="p-3">4 points</td>
                <td className="p-3">4 points (Y is 3 pts in WWF)</td>
                <td className="p-3">Y is 4 pts in Scrabble, 3 pts in WWF</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-foreground">H, V</td>
                <td className="p-3">H=4, V=4</td>
                <td className="p-3">H=3, V=5</td>
                <td className="p-3">H is 1 pt lower, V is 1 pt higher in WWF</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-foreground">K</td>
                <td className="p-3">5 points</td>
                <td className="p-3">5 points</td>
                <td className="p-3">Identical</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-foreground">J, X</td>
                <td className="p-3">J=8, X=8</td>
                <td className="p-3">J=10, X=8</td>
                <td className="p-3">J is 10 pts in WWF, 8 in Scrabble</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-foreground">Q, Z</td>
                <td className="p-3">10 points</td>
                <td className="p-3">10 points</td>
                <td className="p-3">Maximum value tiles in both games</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-foreground">Blank Tile (?)</td>
                <td className="p-3">0 points</td>
                <td className="p-3">0 points</td>
                <td className="p-3">Acts as wildcard; earns 0 raw letter points</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Board Multipliers &amp; The 50-Point Bingo Rule</h3>
        <p>
          Our solvers rank words by raw tile sum. When placing a word on an actual board:
        </p>
        <ul>
          <li><strong>Double/Triple Letter Squares:</strong> Multiply the value of the individual letter tile occupying that square before applying word multipliers.</li>
          <li><strong>Double/Triple Word Squares:</strong> Multiply the total score of the entire word after all letter multipliers have been calculated.</li>
          <li><strong>Bingo Bonus (Scrabble):</strong> In standard Scrabble, using all 7 tiles from your rack in a single play awards a <strong>50-point bonus</strong> added after word multipliers. In Words With Friends, using all 7 tiles awards a <strong>35-point bonus</strong>.</li>
        </ul>

        <h3>Boggle Scoring Formula</h3>
        <p>
          In our <Link to="/tool/$tool" params={{ tool: "boggle-solver" }}>Boggle Solver</Link>, words traced through adjacent
          grid cells (horizontally, vertically, or diagonally without cell reuse) are scored strictly by word length:
        </p>
        <ul>
          <li><strong>3 &amp; 4 letters:</strong> 1 point</li>
          <li><strong>5 letters:</strong> 2 points</li>
          <li><strong>6 letters:</strong> 3 points</li>
          <li><strong>7 letters:</strong> 5 points</li>
          <li><strong>8 letters or more:</strong> 11 points</li>
        </ul>

        <h3>Wordle Guess Heuristic</h3>
        <p>
          In our <Link to="/tool/$tool" params={{ tool: "wordle-solver" }}>Wordle Solver</Link>, candidate words are filtered by
          exact green positions, present yellow letters, and excluded grey letters. Remaining candidates are ranked using a
          <strong>positional letter frequency heuristic</strong> that rewards words with common unrevealed consonants and vowels
          while penalizing duplicate letters to maximize information gain per turn.
        </p>

        <h3>Word Ladder Shortest-Path Guarantee (BFS)</h3>
        <p>
          In our <Link to="/tool/$tool" params={{ tool: "word-ladder-solver" }}>Word Ladder Solver</Link>, words differing by
          exactly one letter form edges in an unweighted graph. The solver executes <strong>Breadth-First Search (BFS)</strong>,
          which mathematically guarantees finding the shortest possible transformation sequence between the start and end word.
        </p>

        <h2>5. Word Validity Standard</h2>
        <div className="not-prose my-6 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5 text-sm text-foreground">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
            <div>
              <strong className="block text-base font-semibold">
                Universal Word Validity Standard
              </strong>
              <p className="mt-1 text-muted-foreground leading-relaxed">
                <em>"Word validity is determined by the specific word list or dataset used by this tool."</em>
              </p>
            </div>
          </div>
        </div>
        <p>
          A frequent source of confusion among players is why a word valid in one game may be rejected in another.
          There is no single "universal" English dictionary:
        </p>
        <ul>
          <li><strong>Collins Scrabble Words (CSW/SOWPODS):</strong> Used in international Scrabble tournaments outside North America, containing ~280,000 words including British and Commonwealth vocabulary.</li>
          <li><strong>NASPA Word List (NWL / formerly TWL):</strong> Used in official North American Scrabble tournaments, containing ~192,000 words.</li>
          <li><strong>ENABLE:</strong> A public-domain North American benchmark containing ~168,000 words. It shares roughly 98% overlap with tournament word lists but excludes trademarked brand names and certain contested vulgarities.</li>
          <li><strong>Zynga WWF Dictionary:</strong> A proprietary dictionary curated by Zynga that periodically adds modern slang and internet terminology not recognized in competitive Scrabble.</li>
          <li><strong>NYT Wordle Answer List:</strong> Curated by New York Times editors, deliberately restricted to common, non-obscure five-letter English words.</li>
        </ul>
        <p>
          Because of these distinctions, AllWordTools clearly specifies which word list is being searched. For competitive
          tournament play, always consult the designated sanctioning body's printed or official digital lexicon.
        </p>

        <h2>6. Complete 92-Tool Technical Catalog</h2>
        <p>
          The table below documents the exact data source, processing mechanism, and result classification for every
          single tool on AllWordTools:
        </p>

        {/* Interactive Filter for the 92-Tool Table */}
        <div className="not-prose my-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Filter by tool name, source, or method..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="pl-9 text-xs rounded-full"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 text-xs">
            {[
              { id: "all", label: "All (92)" },
              { id: "enable", label: "ENABLE Lexicon" },
              { id: "datamuse", label: "Datamuse API" },
              { id: "dictionary", label: "Dictionary API" },
              { id: "ai", label: "DeepSeek AI" },
              { id: "deterministic", label: "Algorithmic" },
              { id: "curated", label: "Curated Banks" },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setSelectedSource(btn.id)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  selectedSource === btn.id
                    ? "bg-honey text-honey-foreground font-semibold"
                    : "bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        <div className="not-prose overflow-x-auto rounded-xl border border-border/70 bg-card p-1 shadow-soft">
          <table className="w-full text-left text-xs">
            <thead className="bg-secondary/50 font-semibold text-foreground border-b border-border/70">
              <tr>
                <th className="p-3">Tool Name</th>
                <th className="p-3">Data Source</th>
                <th className="p-3">Processing Method</th>
                <th className="p-3">Result Type</th>
                <th className="p-3">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 text-muted-foreground">
              {filteredTools.map((tool) => {
                const m = TOOL_METHODOLOGY[tool.slug];
                if (!m) return null;
                return (
                  <tr key={tool.slug} className="hover:bg-secondary/20">
                    <td className="p-3 font-medium text-foreground">
                      {tool.name}
                      <span className="block text-[11px] text-muted-foreground">{tool.category}</span>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline" className="text-[10px] font-normal border-border/80">
                        {m.source}
                      </Badge>
                    </td>
                    <td className="p-3 text-[11px]">{m.processing}</td>
                    <td className="p-3 text-[11px]">{m.resultType}</td>
                    <td className="p-3">
                      <Link
                        to="/tool/$tool"
                        params={{ tool: tool.slug }}
                        className="inline-flex items-center gap-1 font-semibold text-honey hover:underline"
                      >
                        Open
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <h2>7. Licensing, Attribution &amp; Open Standards</h2>
        <p>
          AllWordTools respects and complies with all relevant open-data licenses and API terms of service:
        </p>
        <ul>
          <li><strong>ENABLE Word List:</strong> Created by Alan Frank and Graham Toal; distributed in the public domain for research, academic, and recreational word-game software development.</li>
          <li><strong>Datamuse API:</strong> Accessible under Datamuse service terms for non-commercial and commercial application queries, with attribution and rate compliance.</li>
          <li><strong>Free Dictionary API:</strong> Open API utilizing Wiktionary data under the Creative Commons Attribution-ShareAlike 3.0 Unported (CC BY-SA) license.</li>
          <li><strong>CMU Pronouncing Dictionary:</strong> Public domain speech synthesis and rhyming lexicon maintained by the Speech Group at Carnegie Mellon University.</li>
        </ul>

        <h2>8. Limitations, Dialects &amp; Error Reporting</h2>
        <p>
          Language is inherently dynamic, regional, and evolving. Users should keep the following limitations in mind:
        </p>
        <ul>
          <li><strong>Spelling Conventions:</strong> English word lists default to standard North American orthography with standard international loanwords. British/Commonwealth double-L variants (e.g. <em>cancelled</em> vs. <em>canceled</em>) or <em>-ise/-ize</em> variations are noted where relevant.</li>
          <li><strong>Slang &amp; Neologisms:</strong> Internet neologisms, memes, and emerging colloquialisms are incorporated only after gaining documented lexical acceptance.</li>
          <li><strong>AI Hallucinations:</strong> Output from AI writing generators is generated probabilistically. Always proofread and verify AI-generated definitions, stories, and grammar feedback before formal publication. Learn more on our <Link to="/ai-tools">AI Tools Transparency Page</Link>.</li>
        </ul>
        <p>
          For a complete breakdown of data boundaries and result categories, visit our dedicated{" "}
          <Link to="/data-limitations" className="font-semibold text-honey hover:underline">
            Data Limitations Guide
          </Link>.
        </p>

        <h3>Report an Error or Missing Word</h3>
        <p>
          If you discover a missing valid word, an incorrect syllable count, a game score discrepancy, or an algorithmic error,
          we actively encourage your feedback. Our codebase and lexical files are maintained on a continuous schedule.
        </p>
        <p>
          Please submit details via our dedicated{" "}
          <Link to="/report-error" className="font-semibold text-honey hover:underline">
            Report a Word or Tool Error Page
          </Link>{" "}
          or inspect our maintainer background on the{" "}
          <Link to="/about/firoz-khan" className="font-semibold text-honey hover:underline">
            Firoz Khan Maintainer Profile
          </Link>.
        </p>
      </Prose>
    </PageLayout>
  );
}
