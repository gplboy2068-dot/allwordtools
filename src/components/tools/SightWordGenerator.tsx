import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, Copy, Shuffle, Sparkles, Volume2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateSightWords, SIGHT_LEVELS } from "@/lib/literary-content";
import { speakWord } from "@/lib/engagement";
import { cn } from "@/lib/utils";

export function SightWordGenerator() {
  const [level, setLevel] = useState("all");
  const [count, setCount] = useState(12);
  const [results, setResults] = useState<string[] | null>(null);
  const [flashMode, setFlashMode] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [known, setKnown] = useState<Set<number>>(new Set());

  const generate = () => {
    setResults(generateSightWords(level, Math.max(1, Math.min(50, count))));
    setCardIndex(0);
    setKnown(new Set());
  };

  const markKnown = (knowIt: boolean) => {
    if (!results) return;
    setKnown((prev) => {
      const next = new Set(prev);
      if (knowIt) next.add(cardIndex);
      else next.delete(cardIndex);
      return next;
    });
    if (cardIndex < results.length - 1) setCardIndex(cardIndex + 1);
  };

  const copyAll = () => {
    if (!results?.length) return;
    navigator.clipboard?.writeText(results.join(" "));
    toast.success("All words copied");
  };

  return (
    <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-lift sm:p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="sw-level" className="text-xs font-semibold text-muted-foreground">
            Grade level
          </Label>
          <select
            id="sw-level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="flex h-10 w-full rounded-xl border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {SIGHT_LEVELS.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="sw-count" className="text-xs font-semibold text-muted-foreground">
            How many words
          </Label>
          <Input
            id="sw-count"
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="rounded-xl"
          />
        </div>
      </div>

      <p className="mt-3 text-sm text-muted-foreground">
        Generate high-frequency Dolch sight words by grade level — the words young readers should
        recognise instantly. Ideal for flashcards, spelling lists and reading practice.
      </p>

      <div className="mt-5">
        <Button onClick={generate} className="h-12 rounded-2xl px-8 text-base font-semibold">
          <Sparkles className="mr-2 h-5 w-5" /> Generate sight words
        </Button>
      </div>

      {results && results.length > 0 && (
        <div className="mt-7 border-t border-border/60 pt-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
              <Sparkles className="h-5 w-5 text-honey" /> Your sight words
            </h2>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={flashMode ? "default" : "outline"}
                size="sm"
                onClick={() => setFlashMode(!flashMode)}
                className="rounded-full"
              >
                {flashMode ? "Show grid" : "Flashcard mode"}
              </Button>
              <Button variant="outline" size="sm" onClick={copyAll} className="rounded-full">
                <Copy className="mr-1.5 h-4 w-4" /> Copy all
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setResults(null)}
                className="rounded-full"
              >
                <X className="mr-1.5 h-4 w-4" /> Clear
              </Button>
            </div>
          </div>
          {flashMode ? (
            <div className="mt-5">
              <button
                onClick={() => speakWord(results[cardIndex])}
                title="Tap to hear the word"
                className="flex w-full flex-col items-center justify-center rounded-3xl border border-honey/40 bg-honey/5 px-6 py-12 transition-colors hover:bg-honey/10"
              >
                <span className="font-display text-5xl font-bold lowercase sm:text-6xl">
                  {results[cardIndex]}
                </span>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                  <Volume2 className="h-4 w-4" /> Tap card to hear it
                </span>
              </button>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={cardIndex === 0}
                  onClick={() => setCardIndex(cardIndex - 1)}
                  className="rounded-full"
                >
                  <ChevronLeft className="mr-1 h-4 w-4" /> Prev
                </Button>
                <span className="text-sm font-semibold text-muted-foreground">
                  Card {cardIndex + 1} of {results.length} · ✓ {known.size} known
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setResults((r) => (r ? [...r].sort(() => Math.random() - 0.5) : r));
                      setCardIndex(0);
                      setKnown(new Set());
                    }}
                    className="rounded-full"
                  >
                    <Shuffle className="mr-1 h-4 w-4" /> Shuffle
                  </Button>
                  <Button
                    size="sm"
                    disabled={cardIndex >= results.length - 1}
                    onClick={() => setCardIndex(cardIndex + 1)}
                    className="rounded-full"
                  >
                    Next <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-3 flex justify-center gap-2">
                <Button
                  size="sm"
                  onClick={() => markKnown(true)}
                  className={cn("rounded-full", known.has(cardIndex) && "bg-emerald-600 hover:bg-emerald-600")}
                >
                  <Check className="mr-1.5 h-4 w-4" /> I know this word
                </Button>
                <Button size="sm" variant="outline" onClick={() => markKnown(false)} className="rounded-full">
                  Still learning
                </Button>
              </div>
              {known.size === results.length && (
                <p className="mt-4 rounded-2xl bg-emerald-500/10 px-4 py-3 text-center text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                  🎉 All {results.length} words known — amazing reading! Generate a new set to keep
                  going.
                </p>
              )}
            </div>
          ) : (
          <div className="mt-5 grid gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {results.map((word, i) => (
              <button
                key={`${word}-${i}`}
                onClick={() => {
                  navigator.clipboard?.writeText(word);
                  toast.success(`Copied "${word}"`);
                }}
                title="Click to copy"
                className="group inline-flex items-center justify-between gap-2 rounded-xl border border-border/70 bg-secondary/40 px-4 py-2.5 text-left text-sm font-medium transition-colors hover:border-honey/60 hover:bg-accent"
              >
                <span>{word}</span>
                <Copy className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            ))}
          </div>
          )}
        </div>
      )}
    </div>
  );
}
