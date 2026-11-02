import { useMemo, useState } from "react";
import { Copy, Loader2, Search, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useDictionary } from "@/hooks/use-dictionary";
import { solveCrossword, type WordMatch } from "@/lib/wordsearch";
import { HistoryChips, ResultActions, useSolverHistory } from "@/components/tools/SolverExtras";

export type KnownLettersSolverProps = {
  historyKey?: string;
  label?: string;
  placeholder?: string;
  buttonLabel?: string;
  helpText?: string;
};

/**
 * Shared positional-pattern solver: enter known letters and blanks and get
 * every dictionary word of that exact shape. Powers the CodyCross,
 * 7 Little Words and Wheel of Fortune solvers.
 */
export function KnownLettersSolver({
  historyKey = "known-letters",
  label = "Known letters (use a letter for what you know, ? _ or . for each blank)",
  placeholder = "e.g. c?t, ??a??, s?lve?",
  buttonLabel = "Find answers",
  helpText = "Each blank stands for exactly one letter, so the number of squares equals the word length.",
}: KnownLettersSolverProps) {
  const { words, loading, error } = useDictionary();
  const history = useSolverHistory(historyKey);
  const [pattern, setPattern] = useState(() =>
    typeof window !== "undefined"
      ? (new URLSearchParams(window.location.search).get("pattern") ?? "")
      : "",
  );
  const [submitted, setSubmitted] = useState<string | null>(() =>
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("pattern") || null
      : null,
  );

  const results = useMemo(() => {
    if (!words || submitted === null) return null;
    return solveCrossword(submitted, words, 600);
  }, [words, submitted]);

  const patternLength = (submitted ?? "").replace(/[^a-z?_.]/gi, "").length;

  const handleSolve = () => {
    if (!pattern.trim()) {
      toast.error("Enter the known letters and blanks.");
      return;
    }
    setSubmitted(pattern);
    history.add(pattern);
  };

  const copy = (w: string) => {
    navigator.clipboard?.writeText(w);
    toast.success(`Copied "${w}"`);
  };

  const reset = () => {
    setPattern("");
    setSubmitted(null);
  };

  return (
    <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-lift sm:p-7">
      <div className="space-y-1.5">
        <Label htmlFor="kls-pattern" className="text-xs font-semibold text-muted-foreground">
          {label}
        </Label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            id="kls-pattern"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSolve()}
            placeholder={placeholder}
            autoComplete="off"
            spellCheck={false}
            className="rounded-xl font-mono tracking-widest sm:h-12 sm:text-base"
          />
          <Button
            onClick={handleSolve}
            disabled={loading}
            className="h-12 shrink-0 rounded-2xl px-8 text-base font-semibold"
          >
            {loading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Search className="mr-2 h-5 w-5" />
            )}
            {buttonLabel}
          </Button>
        </div>
      </div>
      <HistoryChips
        items={history.items}
        onPick={(v) => {
          setPattern(v);
          setSubmitted(v);
        }}
        onClear={history.clear}
      />

      <p className="mt-3 text-xs text-muted-foreground">
        {helpText} Use <code className="font-mono">?</code>, <code className="font-mono">_</code> or{" "}
        <code className="font-mono">.</code> for any unknown square.
      </p>

      {error && (
        <p className="mt-4 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Couldn't load the dictionary. Please refresh and try again.
        </p>
      )}

      {results && (
        <div className="mt-7 border-t border-border/60 pt-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
              <Sparkles className="h-5 w-5 text-honey" />
              {results.length > 0
                ? `${results.length}${results.length >= 600 ? "+" : ""} match${results.length === 1 ? "" : "es"}${patternLength ? ` (${patternLength} letters)` : ""}`
                : "No matches found"}
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              {results.length > 0 && (
                <ResultActions
                  words={results.map((r) => r.word)}
                  fileName="pattern-matches.txt"
                  shareParams={submitted ? { pattern: submitted } : undefined}
                />
              )}
              <Button variant="ghost" size="sm" onClick={reset} className="rounded-full">
                <X className="mr-1.5 h-4 w-4" /> Clear
              </Button>
            </div>
          </div>

          {results.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              No words fit that pattern. Double-check the known letters and blank count.
            </p>
          ) : (
            <div className="mt-5 flex flex-wrap gap-2">
              {results.map((r: WordMatch) => (
                <button
                  key={r.word}
                  onClick={() => copy(r.word)}
                  title={`${r.score} points — click to copy`}
                  className="group inline-flex items-center gap-2 rounded-xl border border-border/70 bg-secondary/40 px-3 py-1.5 text-sm font-medium capitalize transition-colors hover:border-honey/60 hover:bg-accent"
                >
                  {r.word}
                  <Copy className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
