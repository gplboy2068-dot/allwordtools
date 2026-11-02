import { useMemo, useState } from "react";
import { DailyUnscramble, HistoryChips, ResultActions, SaveWordButton, useSolverHistory } from "@/components/tools/SolverExtras";
import { useI18n } from "@/i18n/I18nProvider";
import { uiText } from "@/i18n/ui-template";
import { Copy, Loader2, Search, Shuffle, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useDictionary } from "@/hooks/use-dictionary";
import { unscramble, type UnscrambleResult } from "@/lib/unscramble";

type Grouped = { length: number; words: UnscrambleResult[] }[];

function groupByLength(results: UnscrambleResult[]): Grouped {
  const map = new Map<number, UnscrambleResult[]>();
  for (const r of results) {
    const arr = map.get(r.length) ?? [];
    arr.push(r);
    map.set(r.length, arr);
  }
  return [...map.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([length, words]) => ({ length, words }));
}

export function WordUnscrambler() {
  const { locale } = useI18n();
  const { words, loading, error } = useDictionary();
  const history = useSolverHistory("unscrambler");
  const [letters, setLetters] = useState(() =>
    typeof window !== "undefined"
      ? (new URLSearchParams(window.location.search).get("letters") ?? "").slice(0, 15)
      : "",
  );
  const [startsWith, setStartsWith] = useState("");
  const [endsWith, setEndsWith] = useState("");
  const [contains, setContains] = useState("");
  const [minLength, setMinLength] = useState(2);
  const [submitted, setSubmitted] = useState<string | null>(() =>
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("letters")?.toLowerCase().replace(/[^a-z?*]/g, "") || null
      : null,
  );

  const results = useMemo(() => {
    if (!words || submitted === null) return null;
    return unscramble(submitted, words, { startsWith, endsWith, contains, minLength });
  }, [words, submitted, startsWith, endsWith, contains, minLength]);

  const grouped = useMemo(() => (results ? groupByLength(results) : null), [results]);

  const handleUnscramble = () => {
    const cleaned = letters.toLowerCase().replace(/[^a-z?*]/g, "");
    if (!cleaned) {
      toast.error("Enter some letters to unscramble.");
      return;
    }
    setSubmitted(cleaned);
    history.add(cleaned);
  };

  const copyWord = (word: string) => {
    navigator.clipboard?.writeText(word);
    toast.success(`Copied "${word}"`);
  };

  const reset = () => {
    setLetters("");
    setStartsWith("");
    setEndsWith("");
    setContains("");
    setMinLength(2);
    setSubmitted(null);
  };

  return (
    <div>
      <DailyUnscramble />
    <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-lift sm:p-7">
      {/* Primary input */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Shuffle className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-honey" />
          <Input
            value={letters}
            onChange={(e) => setLetters(e.target.value.slice(0, 15))}
            onKeyDown={(e) => e.key === "Enter" && handleUnscramble()}
            placeholder="Enter your letters (use ? for blanks)"
            aria-label="Letters to unscramble"
            autoCapitalize="none"
            autoComplete="off"
            spellCheck={false}
            className="h-14 rounded-2xl pl-12 pr-4 text-lg font-medium tracking-wide"
          />
        </div>
        <Button
          onClick={handleUnscramble}
          disabled={loading}
          className="h-14 rounded-2xl px-8 text-base font-semibold"
        >
          {loading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Search className="mr-2 h-5 w-5" />
          )}
          Unscramble
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

      {/* Filters */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-1.5">
          <Label htmlFor="startsWith" className="text-xs font-semibold text-muted-foreground">
            {uiText(locale, "filters.startsWith", "Starts with")}
          </Label>
          <Input
            id="startsWith"
            value={startsWith}
            onChange={(e) => setStartsWith(e.target.value)}
            placeholder="e.g. st"
            autoComplete="off"
            spellCheck={false}
            className="rounded-xl"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="endsWith" className="text-xs font-semibold text-muted-foreground">
            {uiText(locale, "filters.endsWith", "Ends with")}
          </Label>
          <Input
            id="endsWith"
            value={endsWith}
            onChange={(e) => setEndsWith(e.target.value)}
            placeholder="e.g. ing"
            autoComplete="off"
            spellCheck={false}
            className="rounded-xl"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="contains" className="text-xs font-semibold text-muted-foreground">
            {uiText(locale, "filters.contains", "Contains")}
          </Label>
          <Input
            id="contains"
            value={contains}
            onChange={(e) => setContains(e.target.value)}
            placeholder="e.g. ea"
            autoComplete="off"
            spellCheck={false}
            className="rounded-xl"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="minLength" className="text-xs font-semibold text-muted-foreground">
            {uiText(locale, "filters.minLength", "Min length")}
          </Label>
          <select
            id="minLength"
            value={minLength}
            onChange={(e) => setMinLength(Number(e.target.value))}
            className="flex h-10 w-full rounded-xl border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {[2, 3, 4, 5, 6, 7].map((n) => (
              <option key={n} value={n}>
                {n}+ letters
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Couldn't load the dictionary. Please refresh and try again.
        </p>
      )}

      {/* Results */}
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
                  fileName="unscrambled-words.txt"
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
              No valid words match those letters and filters. Try removing a filter or adding more
              letters.
            </p>
          ) : (
            <div className="mt-5 space-y-6">
              {grouped!.map((group) => (
                <div key={group.length}>
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {group.length}-letter words
                    <span className="ml-2 font-medium normal-case text-muted-foreground/70">
                      ({group.words.length})
                    </span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.words.map((r) => (
                      <div
                        key={r.word}
                        onClick={() => copyWord(r.word)}
                        title={`${r.score} points — click to copy`}
                        className="group inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border/70 bg-secondary/40 px-3 py-1.5 text-sm font-medium transition-colors hover:border-honey/60 hover:bg-accent"
                      >
                        <span className="capitalize">{r.word}</span>
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
              ))}
            </div>
          )}
        </div>
      )}
    </div>
    </div>
  );
}
