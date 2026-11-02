import { useMemo, useState } from "react";
import { Copy, Eraser, Target } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { copyText, loadJSON, saveJSON } from "@/lib/engagement";

const STOPWORDS = new Set(
  "the a an and or but if then else for to of in on at by with is are was were be been being have has had do does did will would can could shall should may might must i you he she it we they them his her its our their this that these those am an as from".split(" "),
);

function fmtMinutes(words: number, wpm: number): string {
  const mins = words / wpm;
  if (mins < 1) return `${Math.max(1, Math.round(mins * 60))} sec`;
  return `${mins.toFixed(mins < 10 ? 1 : 0)} min`;
}

export function WordCounterTool() {
  const [text, setText] = useState("");
  const [goal, setGoal] = useState<number>(() => loadJSON<number>("awt-writing-goal-v1", 500));

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/) : [];
    const wordCount = words.length;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const sentences = (trimmed.match(/[.!?]+(\s|$)/g) ?? []).length || (trimmed ? 1 : 0);
    const paragraphs = trimmed ? trimmed.split(/\n{2,}/).filter(Boolean).length : 0;
    const avgSentence = sentences > 0 ? Math.round(wordCount / sentences) : 0;
    const longest = words.reduce((a, w) => (w.length > a.length ? w : a), "");
    const freq = new Map<string, number>();
    for (const w of words) {
      const key = w.toLowerCase().replace(/[^a-z0-9'-]/g, "");
      if (key.length < 3 || STOPWORDS.has(key)) continue;
      freq.set(key, (freq.get(key) ?? 0) + 1);
    }
    const topWords = [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
    return { wordCount, chars, charsNoSpaces, sentences, paragraphs, avgSentence, longest, topWords };
  }, [text]);

  const cards = [
    { label: "Words", value: stats.wordCount },
    { label: "Characters", value: stats.chars },
    { label: "No spaces", value: stats.charsNoSpaces },
    { label: "Sentences", value: stats.sentences },
    { label: "Paragraphs", value: stats.paragraphs },
    { label: "Avg words / sentence", value: stats.avgSentence },
  ];

  return (
    <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-lift sm:p-7">
      <div className="space-y-1.5">
        <Label htmlFor="wc-text" className="text-xs font-semibold text-muted-foreground">
          Paste or type your text — counting is instant
        </Label>
        <Textarea
          id="wc-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your essay, article, assignment or post here to count its words…"
          className="min-h-44 rounded-xl text-base"
          maxLength={100000}
        />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-border/70 bg-secondary/40 p-3.5 text-center">
            <p className="font-display text-2xl font-bold tabular-nums">{c.value.toLocaleString()}</p>
            <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
        <span>📖 Reading time: <strong className="text-foreground">{fmtMinutes(stats.wordCount, 200)}</strong></span>
        <span>🎙️ Speaking time: <strong className="text-foreground">{fmtMinutes(stats.wordCount, 130)}</strong></span>
        {stats.longest && (
          <span>Longest word: <strong className="text-foreground">{stats.longest}</strong></span>
        )}
      </div>

      <div className="mt-5 rounded-2xl border border-border/70 bg-secondary/30 p-4">
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
            className={`h-full rounded-full transition-all ${goal > 0 && stats.wordCount >= goal ? "bg-emerald-500" : "bg-honey"}`}
            style={{ width: `${goal > 0 ? Math.min(100, (stats.wordCount / goal) * 100) : 0}%` }}
          />
        </div>
        <p className="mt-2 text-xs font-medium text-muted-foreground">
          {goal > 0
            ? stats.wordCount >= goal
              ? `🎉 Goal reached — ${stats.wordCount.toLocaleString()} of ${goal.toLocaleString()} words!`
              : `${stats.wordCount.toLocaleString()} of ${goal.toLocaleString()} words — ${(goal - stats.wordCount).toLocaleString()} to go`
            : "Set a target — essays, NaNoWriMo, blog posts — and watch the bar fill as you type."}
        </p>
      </div>

      {stats.topWords.length > 0 && (
        <div className="mt-5 border-t border-border/60 pt-5">
          <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
            Most used words (keyword density)
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {stats.topWords.map(([w, n]) => (
              <span key={w} className="rounded-full border border-border/70 bg-secondary/40 px-3 py-1.5 text-xs font-semibold">
                {w} · {n}× · {((n / Math.max(1, stats.wordCount)) * 100).toFixed(1)}%
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        <Button variant="outline" size="sm" disabled={!text} onClick={async () => { if (await copyText(text)) toast.success("Text copied"); }} className="rounded-full">
          <Copy className="mr-1.5 h-4 w-4" /> Copy text
        </Button>
        <Button variant="ghost" size="sm" disabled={!text} onClick={() => setText("")} className="rounded-full">
          <Eraser className="mr-1.5 h-4 w-4" /> Clear
        </Button>
      </div>
    </div>
  );
}
