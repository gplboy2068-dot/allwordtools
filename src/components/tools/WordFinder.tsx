import { useMemo, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { uiText } from "@/i18n/ui-template";
import { Copy, Loader2, Search, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useDictionary } from "@/hooks/use-dictionary";
import { findWords, type FinderFilters, type WordMatch } from "@/lib/wordsearch";

function groupByLength(results: WordMatch[]) {
  const map = new Map<number, WordMatch[]>();
  for (const r of results) {
    const arr = map.get(r.length) ?? [];
    arr.push(r);
    map.set(r.length, arr);
  }
  return [...map.entries()].sort((a, b) => b[0] - a[0]);
}

export function WordFinder() {
  const { locale } = useI18n();
  const { words, loading, error } = useDictionary();
  const [startsWith, setStartsWith] = useState("");
  const [endsWith, setEndsWith] = useState("");
  const [contains, setContains] = useState("");
  const [length, setLength] = useState(0);
  const [available, setAvailable] = useState("");
  const [submitted, setSubmitted] = useState<FinderFilters | null>(null);

  const results = useMemo(() => {
    if (!words || !submitted) return null;
    return findWords(words, submitted);
  }, [words, submitted]);

  const grouped = useMemo(() => (results ? groupByLength(results) : null), [results]);

  const handleFind = () => {
    if (!startsWith && !endsWith && !contains && !length && !available.trim()) {
      toast.error("Enter at least one filter.");
      return;
    }
    setSubmitted({ startsWith, endsWith, contains, length, availableLetters: available });
  };

  const copy = (w: string) => {
    navigator.clipboard?.writeText(w);
    toast.success(`Copied "${w}"`);
  };

  const reset = () => {
    setStartsWith("");
    setEndsWith("");
    setContains("");
    setLength(0);
    setAvailable("");
    setSubmitted(null);
  };

  return (
    <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-lift sm:p-7">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-1.5">
          <Label htmlFor="wf-starts" className="text-xs font-semibold text-muted-foreground">
            {uiText(locale, "filters.startsWith", "Starts with")}
          </Label>
          <Input
            id="wf-starts"
            value={startsWith}
            onChange={(e) => setStartsWith(e.target.value)}
            placeholder="e.g. pre"
            autoComplete="off"
            spellCheck={false}
            className="rounded-xl"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="wf-ends" className="text-xs font-semibold text-muted-foreground">
            {uiText(locale, "filters.endsWith", "Ends with")}
          </Label>
          <Input
            id="wf-ends"
            value={endsWith}
            onChange={(e) => setEndsWith(e.target.value)}
            placeholder="e.g. ing"
            autoComplete="off"
            spellCheck={false}
            className="rounded-xl"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="wf-contains" className="text-xs font-semibold text-muted-foreground">
            {uiText(locale, "filters.contains", "Contains")}
          </Label>
          <Input
            id="wf-contains"
            value={contains}
            onChange={(e) => setContains(e.target.value)}
            placeholder="e.g. qu"
            autoComplete="off"
            spellCheck={false}
            className="rounded-xl"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="wf-length" className="text-xs font-semibold text-muted-foreground">
            Exact length
          </Label>
          <select
            id="wf-length"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="flex h-10 w-full rounded-xl border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value={0}>Any length</option>
            {Array.from({ length: 14 }, (_, i) => i + 2).map((n) => (
              <option key={n} value={n}>
                {n} letters
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5 sm:col-span-2 lg:col-span-2">
          <Label htmlFor="wf-avail" className="text-xs font-semibold text-muted-foreground">
            Only use these letters (optional, ? = wildcard)
          </Label>
          <Input
            id="wf-avail"
            value={available}
            onChange={(e) => setAvailable(e.target.value)}
            placeholder="e.g. aeriltn?"
            autoComplete="off"
            spellCheck={false}
            className="rounded-xl"
          />
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <Button
          onClick={handleFind}
          disabled={loading}
          className="h-12 rounded-2xl px-8 text-base font-semibold"
        >
          {loading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Search className="mr-2 h-5 w-5" />
          )}
          Find words
        </Button>
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
                ? `${results.length} word${results.length === 1 ? "" : "s"} found`
                : "No words found"}
            </h2>
            <Button variant="ghost" size="sm" onClick={reset} className="rounded-full">
              <X className="mr-1.5 h-4 w-4" /> Clear
            </Button>
          </div>

          {results.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              No words match those filters. Try loosening a filter.
            </p>
          ) : (
            <div className="mt-5 space-y-6">
              {grouped!.map(([len, ws]) => (
                <div key={len}>
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {len}-letter words{" "}
                    <span className="ml-1 font-medium normal-case text-muted-foreground/70">
                      ({ws.length})
                    </span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {ws.map((r) => (
                      <button
                        key={r.word}
                        onClick={() => copy(r.word)}
                        title={`${r.score} points — click to copy`}
                        className="group inline-flex items-center gap-2 rounded-xl border border-border/70 bg-secondary/40 px-3 py-1.5 text-sm font-medium capitalize transition-colors hover:border-honey/60 hover:bg-accent"
                      >
                        {r.word}
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
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
