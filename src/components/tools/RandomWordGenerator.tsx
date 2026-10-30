import { useMemo, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { uiText } from "@/i18n/ui-template";
import { Copy, Dices, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AiGenerateButton } from "@/components/tools/ai/AiGenerateButton";
import { useDictionary } from "@/hooks/use-dictionary";

function pickRandom<T>(pool: T[], count: number): T[] {
  if (pool.length <= count) return [...pool];
  const chosen = new Set<number>();
  const out: T[] = [];
  while (out.length < count && chosen.size < pool.length) {
    const i = Math.floor(Math.random() * pool.length);
    if (!chosen.has(i)) {
      chosen.add(i);
      out.push(pool[i]);
    }
  }
  return out;
}

export function RandomWordGenerator() {
  const { locale } = useI18n();
  const { words, loading, error } = useDictionary();
  const [count, setCount] = useState(5);
  const [minLen, setMinLen] = useState(0);
  const [maxLen, setMaxLen] = useState(0);
  const [startsWith, setStartsWith] = useState("");
  const [results, setResults] = useState<string[] | null>(null);

  const wordArray = useMemo(() => (words ? [...words] : null), [words]);

  const generate = () => {
    if (!wordArray) return;
    const prefix = startsWith
      .trim()
      .toLowerCase()
      .replace(/[^a-z]/g, "");
    const min = minLen || 1;
    const max = maxLen || 99;
    const pool = wordArray.filter((w) => {
      if (w.length < min || w.length > max) return false;
      if (prefix && !w.startsWith(prefix)) return false;
      return true;
    });
    if (pool.length === 0) {
      toast.error("No words match those settings. Loosen the filters.");
      setResults([]);
      return;
    }
    setResults(pickRandom(pool, Math.max(1, Math.min(50, count))));
  };

  const copy = (w: string) => {
    navigator.clipboard?.writeText(w);
    toast.success(`Copied "${w}"`);
  };

  const copyAll = () => {
    if (!results?.length) return;
    navigator.clipboard?.writeText(results.join(", "));
    toast.success("All words copied");
  };

  const reset = () => {
    setStartsWith("");
    setMinLen(0);
    setMaxLen(0);
    setCount(5);
    setResults(null);
  };

  const lengthOptions = Array.from({ length: 15 }, (_, i) => i + 1);

  return (
    <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-lift sm:p-7">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-1.5">
          <Label htmlFor="rwg-count" className="text-xs font-semibold text-muted-foreground">
            How many words
          </Label>
          <Input
            id="rwg-count"
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="rounded-xl"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="rwg-start" className="text-xs font-semibold text-muted-foreground">
            {uiText(locale, "filters.startsWithOptional", "Starts with (optional)")}
          </Label>
          <Input
            id="rwg-start"
            value={startsWith}
            onChange={(e) => setStartsWith(e.target.value)}
            placeholder="e.g. st"
            autoComplete="off"
            spellCheck={false}
            className="rounded-xl"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="rwg-min" className="text-xs font-semibold text-muted-foreground">
            {uiText(locale, "filters.minLength", "Min length")}
          </Label>
          <select
            id="rwg-min"
            value={minLen}
            onChange={(e) => setMinLen(Number(e.target.value))}
            className="flex h-10 w-full rounded-xl border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value={0}>Any</option>
            {lengthOptions.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="rwg-max" className="text-xs font-semibold text-muted-foreground">
            Max length
          </Label>
          <select
            id="rwg-max"
            value={maxLen}
            onChange={(e) => setMaxLen(Number(e.target.value))}
            className="flex h-10 w-full rounded-xl border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value={0}>Any</option>
            {lengthOptions.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <Button
          onClick={generate}
          disabled={loading}
          className="h-12 rounded-2xl px-8 text-base font-semibold"
        >
          {loading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Dices className="mr-2 h-5 w-5" />
          )}
          Generate words
        </Button>
      </div>

      <AiGenerateButton
        instruction="Generate real English words. Return single words only, no definitions."
        count={count}
        onResults={setResults}
        themePlaceholder="Optional theme (e.g. nature, emotions, long words)…"
      />

      {error && (
        <p className="mt-4 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Couldn't load the dictionary. Please refresh and try again.
        </p>
      )}

      {results && results.length > 0 && (
        <div className="mt-7 border-t border-border/60 pt-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
              <Dices className="h-5 w-5 text-honey" /> Your random words
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={copyAll} className="rounded-full">
                <Copy className="mr-1.5 h-4 w-4" /> Copy all
              </Button>
              <Button variant="ghost" size="sm" onClick={reset} className="rounded-full">
                <X className="mr-1.5 h-4 w-4" /> Clear
              </Button>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {results.map((w, i) => (
              <button
                key={`${w}-${i}`}
                onClick={() => copy(w)}
                title="Click to copy"
                className="group inline-flex items-center gap-2 rounded-xl border border-border/70 bg-secondary/40 px-3 py-1.5 text-sm font-medium capitalize transition-colors hover:border-honey/60 hover:bg-accent"
              >
                {w}
                <Copy className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
