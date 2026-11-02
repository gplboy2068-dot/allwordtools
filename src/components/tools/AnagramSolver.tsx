import { useMemo, useState } from "react";
import { DailyUnscramble, HistoryChips, ResultActions, useSolverHistory } from "@/components/tools/SolverExtras";
import { Copy, Loader2, Repeat, Search, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useDictionary } from "@/hooks/use-dictionary";
import {
  findAnagrams,
  findMultiWordAnagrams,
  type AnagramResult,
  type MultiWordAnagram,
} from "@/lib/anagram";

export function AnagramSolver() {
  const { words, loading, error } = useDictionary();
  const history = useSolverHistory("anagram");
  const [letters, setLetters] = useState(() =>
    typeof window !== "undefined"
      ? (new URLSearchParams(window.location.search).get("letters") ?? "").slice(0, 15)
      : "",
  );
  const [multiWord, setMultiWord] = useState(false);
  const [submitted, setSubmitted] = useState<string | null>(() =>
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("letters")?.toLowerCase().replace(/[^a-z?*]/g, "") || null
      : null,
  );
  const [submittedMulti, setSubmittedMulti] = useState(false);

  const single = useMemo<AnagramResult[] | null>(() => {
    if (!words || submitted === null) return null;
    return findAnagrams(submitted, words);
  }, [words, submitted]);

  const multi = useMemo<MultiWordAnagram[] | null>(() => {
    if (!words || submitted === null || !submittedMulti) return null;
    return findMultiWordAnagrams(submitted, words);
  }, [words, submitted, submittedMulti]);

  const handleSolve = () => {
    const cleaned = letters.toLowerCase().replace(/[^a-z?*]/g, "");
    if (cleaned.length < 2) {
      toast.error("Enter at least two letters.");
      return;
    }
    setSubmitted(cleaned);
    setSubmittedMulti(multiWord);
    history.add(cleaned);
  };

  const copy = (text: string) => {
    navigator.clipboard?.writeText(text);
    toast.success(`Copied "${text}"`);
  };

  const reset = () => {
    setLetters("");
    setSubmitted(null);
    setSubmittedMulti(false);
  };

  return (
    <div>
      <DailyUnscramble />
    <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-lift sm:p-7">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Repeat className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-honey" />
          <Input
            value={letters}
            onChange={(e) => setLetters(e.target.value.slice(0, 15))}
            onKeyDown={(e) => e.key === "Enter" && handleSolve()}
            placeholder="Enter letters or a word (use ? for blanks)"
            aria-label="Letters to find anagrams for"
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
          Solve
        </Button>
      </div>

      <HistoryChips
        items={history.items}
        onPick={(v) => {
          setLetters(v);
          setSubmitted(v);
          setSubmittedMulti(multiWord);
        }}
        onClear={history.clear}
      />

      <div className="mt-4 flex items-center gap-3">
        <Switch id="multiWord" checked={multiWord} onCheckedChange={setMultiWord} />
        <Label htmlFor="multiWord" className="cursor-pointer text-sm text-muted-foreground">
          Include two-word anagrams (uses all letters across two words)
        </Label>
      </div>

      {error && (
        <p className="mt-4 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Couldn't load the dictionary. Please refresh and try again.
        </p>
      )}

      {single && (
        <div className="mt-7 border-t border-border/60 pt-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
              <Sparkles className="h-5 w-5 text-honey" />
              {single.length > 0
                ? `${single.length} anagram${single.length === 1 ? "" : "s"} found`
                : "No anagrams found"}
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              {single.length > 0 && (
                <ResultActions
                  words={single.map((r) => r.word)}
                  fileName="anagrams.txt"
                  shareParams={submitted ? { letters: submitted } : undefined}
                />
              )}
              <Button variant="ghost" size="sm" onClick={reset} className="rounded-full">
                <X className="mr-1.5 h-4 w-4" /> Clear
              </Button>
            </div>
          </div>

          {single.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              No single-word anagram uses exactly those letters. Try enabling two-word anagrams
              above.
            </p>
          ) : (
            <div className="mt-5 flex flex-wrap gap-2">
              {single.map((r) => (
                <button
                  key={r.word}
                  onClick={() => copy(r.word)}
                  title={`${r.score} points — click to copy`}
                  className="group inline-flex items-center gap-2 rounded-xl border border-border/70 bg-secondary/40 px-3 py-1.5 text-sm font-medium transition-colors hover:border-honey/60 hover:bg-accent"
                >
                  <span className="capitalize">{r.word}</span>
                  <Badge
                    variant="secondary"
                    className="h-5 border border-border/50 px-1.5 text-[11px] tabular-nums"
                  >
                    {r.score}
                  </Badge>
                  <Copy className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              ))}
            </div>
          )}

          {multi && (
            <div className="mt-8">
              <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
                <Repeat className="h-5 w-5 text-honey" />
                {multi.length > 0
                  ? `${multi.length} two-word anagram${multi.length === 1 ? "" : "s"}`
                  : "No two-word anagrams found"}
              </h3>
              {multi.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {multi.map((r) => (
                    <button
                      key={r.display}
                      onClick={() => copy(r.display)}
                      title={`${r.score} points — click to copy`}
                      className="group inline-flex items-center gap-2 rounded-xl border border-border/70 bg-secondary/40 px-3 py-1.5 text-sm font-medium capitalize transition-colors hover:border-honey/60 hover:bg-accent"
                    >
                      {r.display}
                      <Copy className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
    </div>
  );
}
