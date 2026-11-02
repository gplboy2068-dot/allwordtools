import { useMemo, useState } from "react";
import { Copy, Loader2, Search, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useDictionary } from "@/hooks/use-dictionary";
import { unscramble, type UnscrambleResult } from "@/lib/unscramble";
import { HistoryChips, ResultActions, SaveWordButton, useSolverHistory } from "@/components/tools/SolverExtras";

/**
 * Word Maker — make words from letters (the "word generator from letters"
 * pattern): every word that can be built from the given letters, grouped
 * by length, with the full-length words (using every letter) highlighted.
 */
export function WordMaker() {
  const { words, loading, error } = useDictionary();
  const history = useSolverHistory("word-maker");
  const [letters, setLetters] = useState(() =>
    typeof window !== "undefined"
      ? (new URLSearchParams(window.location.search).get("letters") ?? "").slice(0, 15)
      : "",
  );
  const [submitted, setSubmitted] = useState<string | null>(() =>
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("letters")?.toLowerCase().replace(/[^a-z?*]/g, "") || null
      : null,
  );

  const results = useMemo<UnscrambleResult[] | null>(() => {
    if (!words || submitted === null) return null;
    return unscramble(submitted, words, { minLength: 2 }, 3000);
  }, [words, submitted]);

  const grouped = useMemo(() => {
    if (!results) return null;
    const map = new Map<number, UnscrambleResult[]>();
    for (const r of results) {
      const arr = map.get(r.length) ?? [];
      arr.push(r);
      map.set(r.length, arr);
    }
    return [...map.entries()].sort((a, b) => b[0] - a[0]);
  }, [results]);

  const letterCount = submitted?.replace(/[^a-z]/gi, "").length ?? 0;

  const solve = (raw?: string) => {
    const cleaned = (raw ?? letters).toLowerCase().replace(/[^a-z?*]/g, "");
    if (cleaned.replace(/[?*]/g, "").length < 2) {
      toast.error("Enter at least two letters.");
      return;
    }
    setSubmitted(cleaned);
    history.add(cleaned);
  };

  return (
    <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-lift sm:p-7">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Sparkles className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-honey" />
          <Input
            value={letters}
            onChange={(e) => setLetters(e.target.value.slice(0, 15))}
            onKeyDown={(e) => e.key === "Enter" && solve()}
            placeholder="Enter letters to make words from (use ? for a blank)"
            aria-label="Letters to make words from"
            autoCapitalize="none"
            autoComplete="off"
            spellCheck={false}
            className="h-14 rounded-2xl pl-12 pr-4 text-lg font-medium tracking-wide"
          />
        </div>
        <Button onClick={() => solve()} disabled={loading} className="h-14 rounded-2xl px-8 text-base font-semibold">
          {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Search className="mr-2 h-5 w-5" />}
          Make words
        </Button>
      </div>

      <HistoryChips
        items={history.items}
        onPick={(v) => {
          setLetters(v);
          solve(v);
        }}
        onClear={history.clear}
      />

      <p className="mt-3 text-xs text-muted-foreground">
        We build every English word hiding in your letters — including the small words inside big
        ones — grouped by length. Perfect for Scrabble, Words With Friends, anagrams and word games.
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
                ? `${results.length} word${results.length === 1 ? "" : "s"} made from “${submitted}”`
                : "No words can be made"}
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              {results.length > 0 && (
                <ResultActions
                  words={results.map((r) => r.word)}
                  fileName="made-words.txt"
                  shareParams={submitted ? { letters: submitted } : undefined}
                />
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setLetters("");
                  setSubmitted(null);
                }}
                className="rounded-full"
              >
                <X className="mr-1.5 h-4 w-4" /> Clear
              </Button>
            </div>
          </div>

          {results.length > 0 && grouped && (
            <div className="mt-5 space-y-6">
              {grouped.map(([len, ws]) => (
                <div key={len}>
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {len}-letter words ({ws.length})
                    {len === letterCount && (
                      <span className="ml-2 rounded-full bg-honey/15 px-2 py-0.5 text-[10px] font-bold normal-case text-honey">
                        ★ uses all your letters
                      </span>
                    )}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {ws.map((r) => (
                      <div
                        key={r.word}
                        onClick={() => {
                          navigator.clipboard?.writeText(r.word);
                          toast.success(`Copied "${r.word}"`);
                        }}
                        title={`${r.score} Scrabble points — click to copy`}
                        className="group inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border/70 bg-secondary/40 px-3 py-1.5 text-sm font-medium transition-colors hover:border-honey/60 hover:bg-accent"
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
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
