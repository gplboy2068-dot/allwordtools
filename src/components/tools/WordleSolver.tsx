import { useMemo, useRef, useState } from "react";
import { Grid3x3, Loader2, Search, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDictionary } from "@/hooks/use-dictionary";
import { solveWordle, type WordleClues, type WordMatch } from "@/lib/wordsearch";
import { ResultActions } from "@/components/tools/SolverExtras";

export function WordleSolver() {
  const { words, loading, error } = useDictionary();
  const [greens, setGreens] = useState<string[]>(() => {
    if (typeof window === "undefined") return ["", "", "", "", ""];
    const g = (new URLSearchParams(window.location.search).get("g") ?? "").toLowerCase();
    return [0, 1, 2, 3, 4].map((i) => g[i] ?? "");
  });
  const [present, setPresent] = useState(() =>
    typeof window !== "undefined"
      ? (new URLSearchParams(window.location.search).get("y") ?? "")
      : "",
  );
  const [absent, setAbsent] = useState(() =>
    typeof window !== "undefined"
      ? (new URLSearchParams(window.location.search).get("x") ?? "")
      : "",
  );
  const [submitted, setSubmitted] = useState<WordleClues | null>(() => {
    if (typeof window === "undefined") return null;
    const q = new URLSearchParams(window.location.search);
    if (!q.get("g") && !q.get("y") && !q.get("x")) return null;
    const g = (q.get("g") ?? "").toLowerCase();
    return {
      greens: [0, 1, 2, 3, 4].map((i) => g[i] ?? ""),
      yellows: (q.get("y") ?? "")
        .toLowerCase()
        .replace(/[^a-z]/g, "")
        .split("")
        .map((letter) => ({ letter, notAt: [] })),
      absent: (q.get("x") ?? "").toLowerCase().replace(/[^a-z]/g, "").split(""),
    };
  });
  const boxes = useRef<(HTMLInputElement | null)[]>([]);

  const results = useMemo<WordMatch[] | null>(() => {
    if (!words || !submitted) return null;
    return solveWordle(submitted, words);
  }, [words, submitted]);

  const setGreen = (i: number, v: string) => {
    const ch = v
      .toLowerCase()
      .replace(/[^a-z]/g, "")
      .slice(-1);
    setGreens((prev) => {
      const next = [...prev];
      next[i] = ch;
      return next;
    });
    if (ch && i < 4) boxes.current[i + 1]?.focus();
  };

  const handleSolve = () => {
    const clues: WordleClues = {
      greens,
      yellows: present
        .toLowerCase()
        .replace(/[^a-z]/g, "")
        .split("")
        .map((letter) => ({ letter, notAt: [] })),
      absent: absent
        .toLowerCase()
        .replace(/[^a-z]/g, "")
        .split(""),
    };
    if (!greens.some(Boolean) && !clues.yellows.length && !clues.absent.length) {
      toast.error("Add at least one clue to narrow the answer.");
      return;
    }
    setSubmitted(clues);
  };

  const copy = (w: string) => {
    navigator.clipboard?.writeText(w);
    toast.success(`Copied "${w}"`);
  };

  const reset = () => {
    setGreens(["", "", "", "", ""]);
    setPresent("");
    setAbsent("");
    setSubmitted(null);
  };

  return (
    <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-lift sm:p-7">
      <div className="space-y-5">
        <div>
          <Label className="text-xs font-semibold text-muted-foreground">
            Correct letters (green) — type each letter in its exact position
          </Label>
          <div className="mt-2 flex gap-2">
            {greens.map((g, i) => (
              <input
                key={i}
                ref={(el) => {
                  boxes.current[i] = el;
                }}
                value={g}
                onChange={(e) => setGreen(i, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !greens[i] && i > 0) boxes.current[i - 1]?.focus();
                }}
                maxLength={1}
                inputMode="text"
                autoComplete="off"
                spellCheck={false}
                aria-label={`Green letter position ${i + 1}`}
                className="h-14 w-14 rounded-xl border-2 border-border bg-background text-center text-2xl font-bold uppercase text-foreground focus-visible:border-honey focus-visible:outline-none"
              />
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="ws-present" className="text-xs font-semibold text-muted-foreground">
              Present letters (yellow) — in the word, wrong spot
            </Label>
            <Input
              id="ws-present"
              value={present}
              onChange={(e) => setPresent(e.target.value)}
              placeholder="e.g. ra"
              autoComplete="off"
              spellCheck={false}
              className="rounded-xl uppercase tracking-widest"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ws-absent" className="text-xs font-semibold text-muted-foreground">
              Absent letters (grey) — not in the word
            </Label>
            <Input
              id="ws-absent"
              value={absent}
              onChange={(e) => setAbsent(e.target.value)}
              placeholder="e.g. slot"
              autoComplete="off"
              spellCheck={false}
              className="rounded-xl uppercase tracking-widest"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleSolve}
            disabled={loading}
            className="h-12 rounded-2xl px-8 text-base font-semibold"
          >
            {loading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Search className="mr-2 h-5 w-5" />
            )}
            Find answers
          </Button>
        </div>
      </div>

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
                ? `${results.length} possible answer${results.length === 1 ? "" : "s"}`
                : "No answers match"}
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              {results.length > 0 && submitted && (
                <ResultActions
                  words={results.map((r) => r.word)}
                  fileName="wordle-answers.txt"
                  shareParams={{
                    g: submitted.greens.join(""),
                    y: submitted.yellows.map((y) => y.letter).join(""),
                    x: submitted.absent.join(""),
                  }}
                />
              )}
              <Button variant="ghost" size="sm" onClick={reset} className="rounded-full">
                <X className="mr-1.5 h-4 w-4" /> Clear
              </Button>
            </div>
          </div>

          {results.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              No five-letter word fits those clues. Double-check your green, yellow and grey
              letters.
            </p>
          ) : (
            <>
              <p className="mt-3 text-sm text-muted-foreground">
                Ranked best-guess first (most common letters in remaining answers).
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {results.map((r, i) => (
                  <button
                    key={r.word}
                    onClick={() => copy(r.word)}
                    className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-bold uppercase tracking-wider transition-colors hover:border-honey/60 hover:bg-accent ${
                      i === 0
                        ? "gradient-honey border-0 text-honey-foreground"
                        : "border-border/70 bg-secondary/40"
                    }`}
                  >
                    <Grid3x3 className="h-3.5 w-3.5 opacity-70" />
                    {r.word}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
