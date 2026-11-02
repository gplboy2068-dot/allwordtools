import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { AlertCircle, ArrowRight, Check, CheckCircle2, Columns2, Copy, Loader2, Sparkles, Wand2, X } from "lucide-react";
import { toast } from "sonner";
import { analyzeWriting, type WritingResult, type WritingTask } from "@/lib/writing.functions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type TaskConfig = {
  placeholder: string;
  actionLabel: string;
  emptyLabel: string;
  cleanLabel: string;
  issuesLabel: (n: number) => string;
};

const CONFIG: Record<WritingTask, TaskConfig> = {
  "passive-voice-checker": {
    placeholder:
      "Paste your text here…\n\nExample: The report was written by the manager and the results were reviewed by the team.",
    actionLabel: "Check passive voice",
    emptyLabel: "No passive voice found — your writing is nicely direct.",
    cleanLabel: "Active-voice rewrite",
    issuesLabel: (n) => `${n} passive sentence${n === 1 ? "" : "s"} found`,
  },
  "active-voice-converter": {
    placeholder:
      "Paste your text here…\n\nExample: Mistakes were made and the deadline was missed by the team.",
    actionLabel: "Convert to active voice",
    emptyLabel: "Your text is already in active voice.",
    cleanLabel: "Active-voice version",
    issuesLabel: (n) => `${n} sentence${n === 1 ? "" : "s"} converted`,
  },
  "grammar-checker": {
    placeholder:
      "Paste your text here…\n\nExample: She dont have no time for they're meeting tomorrow.",
    actionLabel: "Check grammar",
    emptyLabel: "No grammar issues found — looks great!",
    cleanLabel: "Corrected text",
    issuesLabel: (n) => `${n} issue${n === 1 ? "" : "s"} found`,
  },
  "spell-checker": {
    placeholder:
      "Paste your text here…\n\nExample: I recieved a seperate package that was definately mispelled.",
    actionLabel: "Check spelling",
    emptyLabel: "No spelling mistakes found.",
    cleanLabel: "Corrected text",
    issuesLabel: (n) => `${n} misspelling${n === 1 ? "" : "s"} found`,
  },
  "punctuation-checker": {
    placeholder:
      "Paste your text here…\n\nExample: lets eat grandma its been a long day and were tired",
    actionLabel: "Check punctuation",
    emptyLabel: "No punctuation problems found.",
    cleanLabel: "Corrected text",
    issuesLabel: (n) => `${n} punctuation fix${n === 1 ? "" : "es"}`,
  },
};

export function WritingAssistant({ task }: { task: WritingTask }) {
  const run = useServerFn(analyzeWriting);
  const cfg = CONFIG[task];
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<WritingResult | null>(null);
  const [submittedText, setSubmittedText] = useState("");
  const [compare, setCompare] = useState(false);
  const [applied, setApplied] = useState<Set<number>>(new Set());

  const canRun = text.trim().length > 0 && !loading;

  async function handleRun() {
    if (!canRun) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await run({ data: { text: text.trim(), task } });
      setResult(res);
      setSubmittedText(text.trim());
      setApplied(new Set());
      setCompare(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setText("");
    setResult(null);
    setError(null);
    setSubmittedText("");
    setApplied(new Set());
  }

  function useCorrected() {
    if (!result) return;
    setText(result.corrected);
    setResult(null);
    setSubmittedText("");
    setApplied(new Set());
    toast.success("Corrected text loaded into the editor — check again any time");
  }

  function applyFix(index: number, original: string, suggestion: string) {
    if (!text.includes(original)) {
      toast.error("That exact text is no longer in the editor (already edited?)");
      return;
    }
    setText(text.replace(original, suggestion));
    setApplied((prev) => new Set(prev).add(index));
    toast.success("Fix applied to your text above");
  }

  const hasIssues = result && result.issues.length > 0;

  return (
    <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-lift sm:p-7">
      <div className="space-y-1.5">
        <Label htmlFor="wa-text" className="text-xs font-semibold text-muted-foreground">
          Your text
        </Label>
        <Textarea
          id="wa-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={cfg.placeholder}
          className="min-h-44 rounded-xl text-base"
          spellCheck={false}
          maxLength={8000}
        />
        <p className="text-right text-xs text-muted-foreground">{text.length}/8000</p>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Button onClick={handleRun} disabled={!canRun} className="rounded-full">
          {loading ? (
            <>
              <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> Analysing…
            </>
          ) : (
            <>
              <Sparkles className="mr-1.5 h-4 w-4" /> {cfg.actionLabel}
            </>
          )}
        </Button>
        {(text || result) && (
          <Button variant="ghost" onClick={reset} className="rounded-full" disabled={loading}>
            <X className="mr-1.5 h-4 w-4" /> Clear
          </Button>
        )}
      </div>

      {error && (
        <div className="mt-5 flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {result && (
        <div className="mt-7 space-y-6 border-t border-border/60 pt-6">
          {/* Corrected output */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
                <CheckCircle2 className="h-5 w-5 text-honey" />
                {cfg.cleanLabel}
              </h2>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => setCompare(!compare)} className="rounded-full">
                  <Columns2 className="mr-1.5 h-4 w-4" /> {compare ? "Hide compare" : "Before / after"}
                </Button>
                <Button size="sm" onClick={useCorrected} className="rounded-full">
                  <Wand2 className="mr-1.5 h-4 w-4" /> Use corrected text
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard?.writeText(result.corrected);
                    toast.success("Copied to clipboard");
                  }}
                  className="rounded-full"
                >
                  <Copy className="mr-1.5 h-4 w-4" /> Copy
                </Button>
              </div>
            </div>
            {result.summary && (
              <p className="mt-2 text-sm text-muted-foreground">{result.summary}</p>
            )}
            {compare ? (
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <div>
                  <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    Before (your text)
                  </p>
                  <Textarea readOnly value={submittedText} className="min-h-32 rounded-xl bg-destructive/5 text-base" />
                </div>
                <div>
                  <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    After (corrected)
                  </p>
                  <Textarea readOnly value={result.corrected} className="min-h-32 rounded-xl bg-emerald-500/5 text-base" />
                </div>
              </div>
            ) : (
              <Textarea
                readOnly
                value={result.corrected}
                className="mt-3 min-h-32 rounded-xl bg-secondary/40 text-base"
              />
            )}
          </div>

          {/* Issues list */}
          {hasIssues ? (
            <div>
              <h3 className="font-display text-lg font-semibold">
                {cfg.issuesLabel(result.issues.length)}
              </h3>
              <ul className="mt-4 space-y-3">
                {result.issues.map((issue, i) => (
                  <li
                    key={i}
                    className="rounded-2xl border border-border/70 bg-background p-4 shadow-soft"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <span className="rounded-md bg-destructive/10 px-2 py-0.5 font-medium text-destructive line-through decoration-destructive/50">
                        {issue.original}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="rounded-md bg-honey/15 px-2 py-0.5 font-semibold text-foreground">
                        {issue.suggestion}
                      </span>
                    </div>
                    {issue.explanation && (
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {issue.explanation}
                      </p>
                    )}
                    <div className="mt-3">
                      {applied.has(i) ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          <Check className="h-3.5 w-3.5" /> Applied — re-run the check to refresh
                        </span>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => applyFix(i, issue.original, issue.suggestion)}
                          className="rounded-full"
                        >
                          <Wand2 className="mr-1.5 h-3.5 w-3.5" /> Apply this fix
                        </Button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-xl border border-honey/30 bg-honey/10 p-4 text-sm font-medium text-foreground">
              <CheckCircle2 className="h-4 w-4 text-honey" />
              {cfg.emptyLabel}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
