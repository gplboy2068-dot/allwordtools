import { useMemo, useState } from "react";
import { Copy, Hexagon, Loader2, Search, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDictionary } from "@/hooks/use-dictionary";
import { HistoryChips, ResultActions, SaveWordButton, useSolverHistory } from "@/components/tools/SolverExtras";

type BeeResult = { word: string; score: number; pangram: boolean };

/**
 * NYT Spelling Bee solver: 7 letters, the centre letter is compulsory,
 * words must be 4+ letters and may reuse letters. Pangrams (using all 7
 * letters) are flagged. Scoring follows the game: 4 letters = 1 point,
 * longer words = their length, pangram = +7 bonus.
 */
export function SpellingBeeSolver() {
  const { words, loading, error } = useDictionary();
  const history = useSolverHistory("spelling-bee");
  const [letters, setLetters] = useState<string[]>(["", "", "", "", "", "", ""]);
  const [submitted, setSubmitted] = useState<string | null>(null);

  const setLetter = (i: number, v: string) => {
    const ch = v.toLowerCase().replace(/[^a-z]/g, "").slice(-1);
    setLetters((prev) => {
      const next = [...prev];
      next[i] = ch;
      return next;
    });
  };

  const results = useMemo<BeeResult[] | null>(() => {
    if (!words || !submitted) return null;
    const set = new Set(submitted.split(""));
    const center = submitted[0];
    const out: BeeResult[] = [];
    for (const w of words) {
      if (w.length < 4) continue;
      if (!w.includes(center)) continue;
      let ok = true;
      for (const ch of w) {
        if (!set.has(ch)) {
          ok = false;
          break;
        }
      }
      if (!ok) continue;
      const pangram = [...set].every((l) => w.includes(l));
      out.push({
        word: w,
        pangram,
        score: (w.length === 4 ? 1 : w.length) + (pangram ? 7 : 0),
      });
    }
    out.sort((a, b) => b.score - a.score || b.word.length - a.word.length || a.word.localeCompare(b.word));
    return out.slice(0, 600);
  }, [words, submitted]);

  const totalScore = results?.reduce((a, r) => a + r.score, 0) ?? 0;
  const pangrams = results?.filter((r) => r.pangram) ?? [];

  const solve = () => {
    const cleaned = letters.join("").toLowerCase();
    if (cleaned.length !== 7) {
      toast.error("Enter all 7 letters — the centre letter first.");
      return;
    }
    if (new Set(cleaned.split("")).size !== 7) {
      toast.error("The 7 letters must all be different.");
      return;
    }
    setSubmitted(cleaned);
    history.add(cleaned);
  };

  return (
    <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-lift sm:p-7">
      <p className="text-sm text-muted-foreground">
        Enter today's 7 Spelling Bee letters — <strong className="text-foreground">centre letter first</strong> —
        and we'll find every valid word, with pangrams and the maximum possible score.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {letters.map((ch, i) => (
          <input
            key={i}
            value={ch}
            onChange={(e) => setLetter(i, e.target.value)}
            aria-label={i === 0 ? "Centre letter" : `Letter ${i + 1}`}
            placeholder={i === 0 ? "★" : "·"}
            autoCapitalize="none"
            autoComplete="off"
            spellCheck={false}
            maxLength={1}
            className={`h-13 w-12 rounded-xl border py-3 text-center font-display text-xl font-bold uppercase outline-none focus:border-honey ${
              i === 0 ? "border-honey bg-honey/15 text-honey" : "border-border/70 bg-secondary/40"
            }`}
          />
        ))}
        <Button onClick={solve} disabled={loading} className="ml-1 h-12 rounded-2xl px-6 font-semibold">
          {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Search className="mr-2 h-5 w-5" />}
          Solve the Bee
        </Button>
      </div>
      <HistoryChips
        items={history.items}
        onPick={(v) => {
          setLetters(v.split(""));
          setSubmitted(v);
        }}
        onClear={history.clear}
      />

      {error && (
        <p className="mt-4 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Couldn't load the dictionary. Please refresh and try again.
        </p>
      )}

      {results && (
        <div className="mt-7 border-t border-border/60 pt-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
              <Hexagon className="h-5 w-5 text-honey" />
              {results.length} words · max score {totalScore}
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              {results.length > 0 && (
                <ResultActions words={results.map((r) => r.word)} fileName="spelling-bee-words.txt" />
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setLetters(["", "", "", "", "", "", ""]);
                  setSubmitted(null);
                }}
                className="rounded-full"
              >
                <X className="mr-1.5 h-4 w-4" /> Clear
              </Button>
            </div>
          </div>

          {pangrams.length > 0 && (
            <div className="mt-4 rounded-2xl bg-honey/10 px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-wide text-honey">
                🐝 Pangram{pangrams.length === 1 ? "" : "s"} — uses all 7 letters
              </p>
              <p className="mt-1 font-display text-lg font-semibold capitalize">
                {pangrams.map((p) => p.word).join(" · ")}
              </p>
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            {results.map((r) => (
              <div
                key={r.word}
                onClick={() => {
                  navigator.clipboard?.writeText(r.word);
                  toast.success(`Copied "${r.word}"`);
                }}
                title={`${r.score} points — click to copy`}
                className={`group inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-1.5 text-sm font-medium transition-colors hover:border-honey/60 hover:bg-accent ${
                  r.pangram ? "border-honey/60 bg-honey/10" : "border-border/70 bg-secondary/40"
                }`}
              >
                <span className="capitalize">{r.word}</span>
                <Badge variant="secondary" className="h-5 border border-border/50 px-1.5 text-[11px] tabular-nums">
                  {r.score}
                </Badge>
                <Copy className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                <SaveWordButton word={r.word} />
              </div>
            ))}
          </div>
          {results.length === 600 && (
            <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" /> Showing the 600 highest-scoring words.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
