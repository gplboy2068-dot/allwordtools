import { useMemo, useState } from "react";
import { Copy, Loader2, Search, Sparkles, Star, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useDictionary } from "@/hooks/use-dictionary";
import { unscramble, type UnscrambleResult } from "@/lib/unscramble";
import { HistoryChips, ResultActions, SaveWordButton, useSolverHistory } from "@/components/tools/SolverExtras";

export type CircleLetterSolverProps = {
  historyKey?: string;
  placeholder?: string;
  buttonLabel?: string;
  minLength?: number;
  maxLetters?: number;
  helpText?: string;
};

function groupByLength(results: UnscrambleResult[]) {
  const map = new Map<number, UnscrambleResult[]>();
  for (const r of results) {
    const arr = map.get(r.length) ?? [];
    arr.push(r);
    map.set(r.length, arr);
  }
  return [...map.entries()].sort((a, b) => a[0] - b[0]);
}

/**
 * Shared anagram-style solver: enter a pool of letters and get every valid
 * word, grouped by length. Powers the Word Cookies and Wordscapes solvers.
 */
export function CircleLetterSolver({
  historyKey = "circle-solver",
  placeholder = "Enter the letters in your puzzle",
  buttonLabel = "Solve puzzle",
  minLength = 2,
  maxLetters = 12,
  helpText = "Type every letter shown in the puzzle. Use ? for any unknown or blank tile.",
}: CircleLetterSolverProps) {
  const { words, loading, error } = useDictionary();
  const history = useSolverHistory(historyKey);
  const [letters, setLetters] = useState(() =>
    typeof window !== "undefined"
      ? (new URLSearchParams(window.location.search).get("letters") ?? "").slice(0, maxLetters)
      : "",
  );
  const [submitted, setSubmitted] = useState<string | null>(() =>
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("letters")?.toLowerCase().replace(/[^a-z?*]/g, "") || null
      : null,
  );

  const results = useMemo(() => {
    if (!words || submitted === null) return null;
    return unscramble(submitted, words, { minLength }, 800);
  }, [words, submitted, minLength]);

  const tileCount = submitted?.replace(/[^a-z?*]/g, "").length ?? 0;
  const grouped = useMemo(() => (results ? groupByLength(results) : null), [results]);

  const handleSolve = () => {
    const cleaned = letters.toLowerCase().replace(/[^a-z?*]/g, "");
    if (cleaned.length < minLength) {
      toast.error(`Enter at least ${minLength} letters.`);
      return;
    }
    setSubmitted(cleaned);
    history.add(cleaned);
  };

  const copyWord = (w: string) => {
    navigator.clipboard?.writeText(w);
    toast.success(`Copied "${w}"`);
  };

  const reset = () => {
    setLetters("");
    setSubmitted(null);
  };

  return (
    <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-lift sm:p-7">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-honey" />
          <Input
            value={letters}
            onChange={(e) => setLetters(e.target.value.slice(0, maxLetters))}
            onKeyDown={(e) => e.key === "Enter" && handleSolve()}
            placeholder={placeholder}
            aria-label="Puzzle letters"
            autoCapitalize="none"
            autoComplete="off"
            spellCheck={false}
            className="h-14 rounded-2xl pl-12 pr-4 text-lg font-medium tracking-wide"
          />
        </div>
        <Button
          onClick={handleSolve}
          disabled={loading}
          className="h-14 rounded-2xl px-8 text-base font-semibold"
        >
          {loading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Search className="mr-2 h-5 w-5" />
          )}
          {buttonLabel}
        </Button>
      </div>
      <HistoryChips
        items={history.items}
        onPick={(v) => {
          setLetters(v);
          setSubmitted(v);
        }}
        onClear={history.clear}
      />

      <p className="mt-3 text-xs text-muted-foreground">{helpText}</p>

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
                ? `${results.length} word${results.length === 1 ? "" : "s"} found`
                : "No words found"}
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              {results.length > 0 && (
                <ResultActions
                  words={results.map((r) => r.word)}
                  fileName="solver-words.txt"
                  shareParams={submitted ? { letters: submitted } : undefined}
                />
              )}
              <Button variant="ghost" size="sm" onClick={reset} className="rounded-full">
                <X className="mr-1.5 h-4 w-4" /> Clear
              </Button>
            </div>
          </div>

          {results.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              No valid words match those letters. Double-check the tiles and try again.
            </p>
          ) : (
            <div className="mt-5 space-y-6">
              {grouped!.map(([len, ws]) => {
                const isBonus = len === tileCount;
                return (
                  <div key={len}>
                    <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {isBonus && <Star className="h-3.5 w-3.5 text-honey" />}
                      {len}-letter {isBonus ? "bonus words" : "words"}{" "}
                      <span className="font-medium normal-case text-muted-foreground/70">
                        ({ws.length})
                      </span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {ws.map((r) => (
                        <div
                          key={r.word}
                          onClick={() => copyWord(r.word)}
                          title={`${r.score} points — click to copy`}
                          className={`group inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-1.5 text-sm font-medium capitalize transition-colors hover:border-honey/60 hover:bg-accent ${
                            isBonus
                              ? "border-honey/60 bg-honey/10"
                              : "border-border/70 bg-secondary/40"
                          }`}
                        >
                          {r.word}
                          <Badge
                            variant="secondary"
                            className="h-5 border border-border/50 px-1.5 text-[11px] tabular-nums"
                          >
                            {r.score}
                          </Badge>
                          <Copy className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                          <SaveWordButton word={r.word} />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
