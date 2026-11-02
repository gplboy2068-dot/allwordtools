import { useMemo, useState } from "react";
import { Copy, Target, Type, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { loadJSON, saveJSON } from "@/lib/engagement";

type Stats = {
  characters: number;
  charactersNoSpaces: number;
  letters: number;
  words: number;
  sentences: number;
  paragraphs: number;
  spaces: number;
  lines: number;
};

function analyse(text: string): { stats: Stats; frequency: [string, number][] } {
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const letters = (text.match(/[a-zA-Z]/g) ?? []).length;
  const spaces = (text.match(/ /g) ?? []).length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const sentences = (text.match(/[.!?]+(\s|$)/g) ?? []).length;
  const paragraphs = text.trim()
    ? text
        .trim()
        .split(/\n{2,}/)
        .filter(Boolean).length
    : 0;
  const lines = text ? text.split(/\n/).length : 0;

  const counts: Record<string, number> = {};
  for (const ch of text.toLowerCase()) {
    if (ch >= "a" && ch <= "z") counts[ch] = (counts[ch] ?? 0) + 1;
  }
  const frequency = Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

  return {
    stats: { characters, charactersNoSpaces, letters, words, sentences, paragraphs, spaces, lines },
    frequency,
  };
}

const STAT_LABELS: { key: keyof Stats; label: string }[] = [
  { key: "characters", label: "Characters" },
  { key: "charactersNoSpaces", label: "No spaces" },
  { key: "letters", label: "Letters" },
  { key: "words", label: "Words" },
  { key: "sentences", label: "Sentences" },
  { key: "paragraphs", label: "Paragraphs" },
  { key: "spaces", label: "Spaces" },
  { key: "lines", label: "Lines" },
];

export function LetterCounter() {
  const [text, setText] = useState("");
  const [goal, setGoal] = useState<number>(() => loadJSON<number>("awt-writing-goal-v1", 500));
  const { stats, frequency } = useMemo(() => analyse(text), [text]);
  const maxFreq = frequency.length ? frequency[0][1] : 0;

  return (
    <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-lift sm:p-7">
      <div className="space-y-1.5">
        <Label htmlFor="lc-text" className="text-xs font-semibold text-muted-foreground">
          Paste or type your text
        </Label>
        <Textarea
          id="lc-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste text here to count letters, words, characters and more…"
          className="min-h-40 rounded-xl text-base"
          spellCheck={false}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <Button
          variant="outline"
          size="sm"
          disabled={!text}
          onClick={() => {
            navigator.clipboard?.writeText(text);
            toast.success("Text copied");
          }}
          className="rounded-full"
        >
          <Copy className="mr-1.5 h-4 w-4" /> Copy text
        </Button>
        <Button
          variant="ghost"
          size="sm"
          disabled={!text}
          onClick={() => setText("")}
          className="rounded-full"
        >
          <X className="mr-1.5 h-4 w-4" /> Clear
        </Button>
      </div>

      <div className="mt-6 rounded-2xl border border-border/70 bg-secondary/30 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="inline-flex items-center gap-2 text-sm font-semibold">
            <Target className="h-4 w-4 text-honey" /> Writing goal
          </p>
          <label className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            Target words
            <Input
              type="number"
              min={1}
              max={100000}
              value={goal || ""}
              onChange={(e) => {
                const v = Math.max(0, Number(e.target.value) || 0);
                setGoal(v);
                saveJSON("awt-writing-goal-v1", v);
              }}
              className="h-8 w-24 rounded-lg text-sm"
            />
          </label>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-secondary">
          <div
            className={`h-full rounded-full transition-all ${goal > 0 && stats.words >= goal ? "bg-emerald-500" : "bg-honey"}`}
            style={{ width: `${goal > 0 ? Math.min(100, (stats.words / goal) * 100) : 0}%` }}
          />
        </div>
        <p className="mt-2 text-xs font-medium text-muted-foreground">
          {goal > 0
            ? stats.words >= goal
              ? `🎉 Goal reached — ${stats.words.toLocaleString()} of ${goal.toLocaleString()} words!`
              : `${stats.words.toLocaleString()} of ${goal.toLocaleString()} words (${Math.round((stats.words / goal) * 100)}%) — ${(goal - stats.words).toLocaleString()} to go`
            : "Set a target to track your progress as you write."}{" "}
          · Reading time ≈ {Math.max(1, Math.round(stats.words / 200))} min · Speaking time ≈{" "}
          {Math.max(1, Math.round(stats.words / 130))} min
        </p>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STAT_LABELS.map(({ key, label }) => (
          <div
            key={key}
            className="rounded-2xl border border-border/70 bg-secondary/40 p-4 text-center"
          >
            <p className="font-display text-2xl font-semibold tabular-nums text-foreground">
              {stats[key].toLocaleString()}
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {label}
            </p>
          </div>
        ))}
      </div>

      {frequency.length > 0 && (
        <div className="mt-7 border-t border-border/60 pt-6">
          <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
            <Type className="h-5 w-5 text-honey" /> Letter frequency
          </h2>
          <div className="mt-4 space-y-2">
            {frequency.map(([letter, count]) => (
              <div key={letter} className="flex items-center gap-3">
                <span className="w-5 text-sm font-semibold uppercase tabular-nums text-foreground">
                  {letter}
                </span>
                <div className="h-3 flex-1 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full gradient-honey"
                    style={{ width: `${maxFreq ? (count / maxFreq) * 100 : 0}%` }}
                  />
                </div>
                <span className="w-10 text-right text-sm tabular-nums text-muted-foreground">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
