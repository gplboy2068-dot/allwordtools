import { useState } from "react";
import { Check, Eye, HelpCircle, RefreshCw, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateRiddles, type Riddle } from "@/lib/literary-content";

export function RiddleGenerator() {
  const [count, setCount] = useState(5);
  const [results, setResults] = useState<Riddle[] | null>(null);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [guesses, setGuesses] = useState<Record<number, string>>({});
  const [verdicts, setVerdicts] = useState<Record<number, boolean>>({});

  const generate = () => {
    setResults(generateRiddles(Math.max(1, Math.min(20, count))));
    setRevealed(new Set());
    setGuesses({});
    setVerdicts({});
  };

  const normalize = (t: string) =>
    t.toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\b(a|an|the)\b/g, " ").replace(/\s+/g, " ").trim();

  const checkGuess = (i: number, answer: string) => {
    const g = normalize(guesses[i] ?? "");
    if (!g) return;
    const a = normalize(answer);
    const ok = g === a || (g.length >= 3 && a.includes(g)) || (a.length >= 3 && g.includes(a));
    setVerdicts((prev) => ({ ...prev, [i]: ok }));
    if (ok) setRevealed((prev) => new Set(prev).add(i));
  };

  const solvedCount = Object.values(verdicts).filter(Boolean).length;

  const toggle = (i: number) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });
  };

  return (
    <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-lift sm:p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="riddle-count" className="text-xs font-semibold text-muted-foreground">
            How many riddles
          </Label>
          <Input
            id="riddle-count"
            type="number"
            min={1}
            max={20}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="rounded-xl"
          />
        </div>
      </div>

      <p className="mt-3 text-sm text-muted-foreground">
        Generate a fresh batch of brain-teasing riddles with hidden answers — perfect for parties,
        classrooms, quizzes and family fun. Tap a riddle to reveal its answer.
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button onClick={generate} className="h-12 rounded-2xl px-8 text-base font-semibold">
          <Sparkles className="mr-2 h-5 w-5" /> Generate riddles
        </Button>
        {results && (
          <Button variant="outline" onClick={generate} className="h-12 rounded-2xl px-6">
            <RefreshCw className="mr-2 h-4 w-4" /> New batch
          </Button>
        )}
      </div>

      {results && results.length > 0 && (
        <div className="mt-7 space-y-3 border-t border-border/60 pt-6">
          <p className="text-sm font-semibold text-muted-foreground">
            🎯 Guess mode: type your answer before revealing —{" "}
            <span className="text-foreground">
              {solvedCount} of {results.length} solved
            </span>
          </p>
          {results.map((riddle, i) => (
            <div key={i} className="rounded-2xl border border-border/70 bg-secondary/40 p-4">
              <p className="flex items-start gap-2 text-sm font-medium leading-relaxed">
                <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-honey" />
                {riddle.question}
              </p>
              {!revealed.has(i) && (
                <form
                  className="mt-3 flex flex-wrap items-center gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    checkGuess(i, riddle.answer);
                  }}
                >
                  <input
                    value={guesses[i] ?? ""}
                    onChange={(e) =>
                      setGuesses((prev) => ({ ...prev, [i]: e.target.value }))
                    }
                    placeholder="Your guess…"
                    autoComplete="off"
                    spellCheck={false}
                    className="h-9 min-w-40 flex-1 rounded-lg border border-border/70 bg-background px-3 text-sm outline-none focus:border-honey"
                  />
                  <Button type="submit" size="sm" variant="outline" className="rounded-lg" disabled={!guesses[i]?.trim()}>
                    Check guess
                  </Button>
                  {verdicts[i] === false && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-destructive">
                      <X className="h-3.5 w-3.5" /> Not quite — try again or reveal
                    </span>
                  )}
                </form>
              )}
              {verdicts[i] && revealed.has(i) && (
                <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <Check className="h-3.5 w-3.5" /> You guessed it!
                </p>
              )}
              {revealed.has(i) ? (
                <p className="mt-3 rounded-xl bg-accent px-3 py-2 text-sm font-semibold text-foreground">
                  {riddle.answer}
                </p>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggle(i)}
                  className="mt-2 rounded-full text-muted-foreground"
                >
                  <Eye className="mr-1.5 h-4 w-4" /> Reveal answer
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
