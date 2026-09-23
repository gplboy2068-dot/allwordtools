import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, Prose } from "@/components/site/PageLayout";
import { BASE_URL, inLanguage, buildLocaleHead } from "@/i18n/seo";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  Brain,
  CheckCircle2,
  Cpu,
  Database,
  ExternalLink,
  Lock,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/ai-tools")({
  head: () => {
    const title = "AI-Powered Tools & Transparency — AllWordTools";
    const description =
      "Transparent technical explanation of how AI tools on AllWordTools work, which models are used, data handling practices, privacy considerations, and important output limitations.";
    const path = "/ai-tools";
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
              { "@type": "ListItem", position: 2, name: "AI Tools Transparency", item: url },
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
  component: AiToolsTransparencyPage,
});

export function AiToolsTransparencyPage() {
  const aiToolsList = [
    {
      slug: "ai-word-explainer",
      name: "AI Word Explainer",
      purpose: "Generates beginner-friendly explanations, meanings, parts of speech, and bulleted example sentences.",
    },
    {
      slug: "ai-sentence-generator",
      name: "AI Sentence Generator",
      purpose: "Writes natural, varied example sentences demonstrating target words in diverse syntactic contexts.",
    },
    {
      slug: "ai-example-generator",
      name: "AI Example Generator",
      purpose: "Produces concrete illustrative examples for abstract concepts, literary devices, or grammar rules.",
    },
    {
      slug: "ai-story-generator",
      name: "AI Story Generator",
      purpose: "Drafts creative, structured short fiction (250-400 words) from user-specified themes or keywords.",
    },
    {
      slug: "ai-poem-generator",
      name: "AI Poem Generator",
      purpose: "Composes original poetry with rhythm, stanzas, and figurative language on chosen subjects.",
    },
    {
      slug: "ai-vocabulary-builder",
      name: "AI Vocabulary Builder",
      purpose: "Builds themed 10-word vocabulary study lists with definitions, word forms, and contextual sentences.",
    },
    {
      slug: "ai-quiz-generator",
      name: "AI Quiz Generator",
      purpose: "Generates interactive JSON multiple-choice quizzes with explanations on any topic or reading level.",
    },
    {
      slug: "ai-flashcards",
      name: "AI Flashcards",
      purpose: "Creates front-and-back study cards for concepts, foreign vocabulary, or test preparation.",
    },
    {
      slug: "passive-voice-checker",
      name: "Passive Voice Checker",
      purpose: "Analyzes sentence syntax to flag passive voice verbs and provide active voice alternatives.",
    },
    {
      slug: "active-voice-converter",
      name: "Active Voice Converter",
      purpose: "Rewrites text into direct active voice while preserving the original tone and intent.",
    },
    {
      slug: "grammar-checker",
      name: "Grammar Checker",
      purpose: "Reviews subject-verb agreement, tenses, modifiers, and word choice with rule explanations.",
    },
    {
      slug: "spell-checker",
      name: "Spell Checker",
      purpose: "Identifies spelling mistakes and contextual typos without altering surrounding sentence structure.",
    },
    {
      slug: "punctuation-checker",
      name: "Punctuation Checker",
      purpose: "Reviews comma splices, quotation marks, apostrophes, and capitalization according to standard English rules.",
    },
  ];

  return (
    <PageLayout
      crumb="AI Tools"
      title="AI-Powered Tools on AllWordTools"
      intro="Complete transparency on which tools use artificial intelligence, what AI is used for, how your data is handled, and critical limitations to understand."
    >
      <Prose>
        {/* Important Warning Banner */}
        <div className="not-prose my-6 rounded-2xl border border-purple-500/30 bg-purple-500/10 p-5 text-sm text-foreground">
          <div className="flex items-start gap-3">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-purple-600 dark:text-purple-400" />
            <div className="space-y-2">
              <strong className="block text-base font-semibold">
                AI Transparency &amp; Human Review Notice
              </strong>
              <p className="text-muted-foreground leading-relaxed font-medium">
                AI-generated responses can contain incorrect, incomplete, or misleading information.
                Review important results before relying on them.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Outputs from our AI writing and grammar tools are produced by large language models.
                They are intended for creative assistance, study brainstorming, and drafting.
                <strong> They do not replace authoritative lexicographical dictionaries, professional editors, or human subject-matter experts.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* 1. Which Tools Use AI */}
        <h2>1. Which Tools Use Artificial Intelligence</h2>
        <p>
          Out of the 92 utilities on AllWordTools, exactly <strong>13 tools</strong> utilize large language model (LLM) artificial intelligence.
          The remaining 79 tools rely on deterministic algorithms, local word lists, or third-party lexical APIs.
        </p>

        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-border/70 bg-card p-1 shadow-soft">
          <table className="w-full text-left text-xs">
            <thead className="bg-secondary/50 font-semibold text-foreground border-b border-border/70">
              <tr>
                <th className="p-3">Tool Name</th>
                <th className="p-3">Functional AI Purpose</th>
                <th className="p-3">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 text-muted-foreground">
              {aiToolsList.map((t) => (
                <tr key={t.slug} className="hover:bg-secondary/20">
                  <td className="p-3 font-semibold text-foreground">{t.name}</td>
                  <td className="p-3 leading-relaxed">{t.purpose}</td>
                  <td className="p-3">
                    <Link
                      to="/tool/$tool"
                      params={{ tool: t.slug }}
                      className="inline-flex items-center gap-1 font-semibold text-honey hover:underline"
                    >
                      Open <ArrowRight className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 2. What AI Is Used For */}
        <h2>2. What AI Is Used For</h2>
        <p>
          We employ artificial intelligence strictly for tasks that require natural language understanding, creative synthesis, or syntactic restructuring:
        </p>
        <ul>
          <li><strong>Contextual Writing Assistance:</strong> Generating educational example sentences tailored to specific reading levels.</li>
          <li><strong>Grammar &amp; Style Feedback:</strong> Providing descriptive explanations of grammatical rules (such as identifying passive vs. active constructions).</li>
          <li><strong>Creative Ideation:</strong> Drafting short stories, poems, and study flashcards from user-supplied keywords.</li>
        </ul>
        <p>
          We do <strong>not</strong> use AI for deterministic word game solvers (such as the Word Unscrambler, Anagram Solver, or Scrabble Helper).
          Those tools use strict, mathematical permutation algorithms and exact word list filtering to ensure deterministic validity.
        </p>

        {/* 3. AI Data Handling & Privacy */}
        <h2>3. AI Data Handling &amp; Privacy Architecture</h2>
        <p>
          We maintain transparent technical boundaries regarding how user inputs are transmitted and processed:
        </p>

        <div className="not-prose my-6 grid gap-4 sm:grid-cols-2 text-xs">
          <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-soft">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Bot className="h-4 w-4" />
            </span>
            <h3 className="mt-3 font-display text-sm font-semibold text-foreground">
              For AI-Powered Tools (13 Tools)
            </h3>
            <ul className="mt-2 space-y-2 text-muted-foreground leading-relaxed">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                <span>Text entered into prompts is sent via encrypted HTTPS to serverless backend endpoints (TanStack Start server functions).</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                <span>Backend functions transmit the prompt to the <strong>DeepSeek API</strong> (<code>deepseek-chat</code>) using secure server-side credentials.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                <span><strong>No Permanent Storage:</strong> User prompt text is processed transiently to produce the response. It is not saved to any database on AllWordTools servers.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                <span>No API keys or server secrets are ever exposed to the client browser.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-soft">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Cpu className="h-4 w-4" />
            </span>
            <h3 className="mt-3 font-display text-sm font-semibold text-foreground">
              For Client-Side Non-AI Tools (79 Tools)
            </h3>
            <ul className="mt-2 space-y-2 text-muted-foreground leading-relaxed">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Tools like the Letter Counter, Syllable Counter, Word Unscrambler, and Alphabetical Sorter run 100% in your browser.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Your text is evaluated in client-side JavaScript memory and never transmitted over the network to any server.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>No user registration or account login is required to access any tool.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="not-prose my-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 text-sm text-foreground">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
            <div>
              <strong className="block text-base font-semibold">User Data Security Advice</strong>
              <p className="mt-1 text-muted-foreground leading-relaxed">
                Do not enter confidential, sensitive, proprietary, medical, or personally identifiable information into any AI tool prompt.
                Because prompts are evaluated by external model inference APIs, treat AI prompts as semi-public brainstorming queries.
              </p>
            </div>
          </div>
        </div>

        {/* 4. AI Limitations & Expectations */}
        <h2>4. What Users Can Expect &amp; AI Limitations</h2>
        <p>
          Users interacting with AI-powered utilities should understand:
        </p>
        <ul>
          <li><strong>Probabilistic Generation:</strong> LLMs generate text based on statistical token probabilities rather than deterministic rule engines. Output may differ between requests with identical inputs.</li>
          <li><strong>Hallucinations &amp; Factual Errors:</strong> AI models may occasionally generate fictional etymologies, misattribute grammar rules, or invent word definitions that do not exist.</li>
          <li><strong>No Prescriptive Authority:</strong> AI grammar suggestions reflect trained corpus patterns and may conflict with specific academic house styles (such as APA, Chicago, or MLA).</li>
          <li><strong>Always Review:</strong> Always review and edit AI-generated text before publishing, submitting academic assignments, or distributing communications.</li>
        </ul>

        <p>
          For more information on our overall technical architecture, read our full{" "}
          <Link to="/methodology" className="font-semibold text-honey hover:underline">
            Methodology &amp; Word Data Guide
          </Link>{" "}
          or report any AI output anomalies on our{" "}
          <Link to="/report-error" className="font-semibold text-honey hover:underline">
            Error Reporting Page
          </Link>.
        </p>
      </Prose>
    </PageLayout>
  );
}
