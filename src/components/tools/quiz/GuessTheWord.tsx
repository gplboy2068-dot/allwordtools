import { useEffect, useMemo, useState } from "react";
import { Flame, Lightbulb, Puzzle, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { DailyEntry } from "@/lib/quiz-content";
import {
  completeDaily,
  getDailyState,
  loadJSON,
  saveJSON,
  todayStr,
} from "@/lib/engagement";

/**
 * Guess the Word — a Wordle-style daily game played on today's
 * Word of the Day entry. Six tries, letter feedback, one play per day;
 * finishing (win or lose) feeds the site-wide daily streak.
 */

const KEY = "awt-guess-word-v1";
const MAX_TRIES = 6;

interface PlayState {
  date: string;
  guesses: string[];
  won: boolean;
  finished: boolean;
}

type Mark = "hit" | "present" | "miss";

function markGuess(guess: string, target: string): Mark[] {
  const t = target.toLowerCase();
  const g = guess.toLowerCase();
  const marks: Mark[] = Array(t.length).fill("miss");
  const remaining: Record<string, number> = {};
  for (let i = 0; i < t.length; i++) {
    if (g[i] === t[i]) marks[i] = "hit";
    else remaining[t[i]] = (remaining[t[i]] ?? 0) + 1;
  }
  for (let i = 0; i < t.length; i++) {
    if (marks[i] === "hit") continue;
    if (remaining[g[i]] > 0) {
      marks[i] = "present";
      remaining[g[i]]--;
    }
  }
  return marks;
}

export function GuessTheWord({ entry }: { entry: DailyEntry }) {
  const target = entry.word.toLowerCase();
  const [state, setState] = useState<PlayState>(() => {
    const saved = loadJSON<PlayState>(KEY, { date: "", guesses: [], won: false, finished: false });
    return saved.date === todayStr()
      ? saved
      : { date: todayStr(), guesses: [], won: false, finished: false };
  });
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [hintUsed, setHintUsed] = useState(false);
  const [daily, setDaily] = useState(() => getDailyState());

  useEffect(() => {
    saveJSON(KEY, state);
  }, [state]);

  const rows = useMemo(() => {
    const out: { guess: string; marks: Mark[] }[] = state.guesses.map((g) => ({
      guess: g,
      marks: markGuess(g, target),
    }));
    return out;
  }, [state.guesses, target]);

  const submit = () => {
    const guess = input.trim().toLowerCase();
    if (state.finished) return;
    if (!/^[a-z]+$/.test(guess)) {
      setError("Letters only, please.");
      return;
    }
    if (guess.length !== target.length) {
      setError(`The word has ${target.length} letters — your guess has ${guess.length}.`);
      return;
    }
    if (state.guesses.includes(guess)) {
      setError("You already tried that word.");
      return;
    }
    setError(null);
    setInput("");
    const won = guess === target;
    const guesses = [...state.guesses, guess];
    const finished = won || guesses.length >= MAX_TRIES;
    setState({ date: todayStr(), guesses, won, finished });
    if (finished) setDaily(completeDaily());
  };

  const triesLeft = MAX_TRIES - state.guesses.length;

  return (
    <div className="mt-6 rounded-3xl border border-border/70 bg-card p-6 shadow-lift sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-honey">
          <Puzzle className="h-4 w-4" /> Guess the Word — today's game
        </div>
        {daily.streak > 0 && (
          <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-600 dark:text-orange-400">
            <Flame className="h-3.5 w-3.5" /> {daily.streak}-day streak
          </span>
        )}
      </div>

      <p className="mt-3 text-sm text-muted-foreground">
        Today's word is a <strong className="text-foreground">{entry.pos}</strong> with{" "}
        <strong className="text-foreground">{target.length} letters</strong>. Meaning:{" "}
        <em>“{entry.definition}”</em>. You have {MAX_TRIES} tries — green = right letter, right
        place; amber = right letter, wrong place.
      </p>

      <div className="mt-5 space-y-1.5">
        {rows.map((row, ri) => (
          <div key={ri} className="flex flex-wrap gap-1.5">
            {row.guess.split("").map((ch, ci) => (
              <span
                key={ci}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg font-display text-base font-bold uppercase sm:h-10 sm:w-10",
                  row.marks[ci] === "hit" && "bg-emerald-500 text-white",
                  row.marks[ci] === "present" && "bg-amber-500 text-white",
                  row.marks[ci] === "miss" && "bg-secondary text-muted-foreground",
                )}
              >
                {ch}
              </span>
            ))}
          </div>
        ))}
        {!state.finished &&
          Array.from({ length: triesLeft }).map((_, ri) => (
            <div key={`e-${ri}`} className="flex flex-wrap gap-1.5">
              {Array.from({ length: target.length }).map((_, ci) => (
                <span
                  key={ci}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg border sm:h-10 sm:w-10",
                    ri === 0 ? "border-honey/50 bg-honey/5" : "border-border/50",
                  )}
                />
              ))}
            </div>
          ))}
      </div>

      {state.finished ? (
        <div className="mt-5 rounded-2xl bg-secondary/50 p-4 text-center">
          {state.won ? (
            <>
              <p className="inline-flex items-center gap-2 font-display text-lg font-semibold">
                <Trophy className="h-5 w-5 text-honey" /> You got it in {state.guesses.length}{" "}
                {state.guesses.length === 1 ? "try" : "tries"}!
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                The word was <strong className="capitalize text-foreground">{entry.word}</strong>.
                Come back tomorrow for a new word — your streak is safe. 🔥
              </p>
            </>
          ) : (
            <>
              <p className="font-display text-lg font-semibold">Out of tries!</p>
              <p className="mt-1 text-sm text-muted-foreground">
                The word was <strong className="capitalize text-foreground">{entry.word}</strong> —{" "}
                {entry.definition}. A new word arrives tomorrow.
              </p>
            </>
          )}
        </div>
      ) : (
        <form
          className="mt-5"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <div className="flex flex-wrap gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value.replace(/[^a-zA-Z]/g, ""))}
              placeholder={`${target.length}-letter guess…`}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              maxLength={target.length}
              className="h-12 min-w-52 flex-1 rounded-2xl border border-border/70 bg-background px-4 text-base font-semibold uppercase tracking-widest outline-none focus:border-honey"
            />
            <Button type="submit" disabled={!input.trim()} className="h-12 rounded-2xl px-6 font-semibold">
              Guess ({triesLeft} left)
            </Button>
            {state.guesses.length >= 2 && !hintUsed && (
              <Button
                type="button"
                variant="outline"
                className="h-12 rounded-2xl px-4 font-semibold"
                onClick={() => setHintUsed(true)}
              >
                <Lightbulb className="mr-1.5 h-4 w-4" /> Hint
              </Button>
            )}
          </div>
          {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
          {hintUsed && (
            <p className="mt-2 text-sm text-muted-foreground">
              Hint: the word starts with{" "}
              <strong className="uppercase text-foreground">{target[0]}</strong> and sounds like{" "}
              <span className="font-mono">{entry.ipa}</span>
            </p>
          )}
        </form>
      )}
    </div>
  );
}
