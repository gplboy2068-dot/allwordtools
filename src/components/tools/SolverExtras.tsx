import { useEffect, useState } from "react";
import { Check, Copy, Download, Flame, History, Link2, Puzzle, Star, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  completeDaily,
  copyText,
  downloadText,
  getDailyState,
  isWordSaved,
  loadJSON,
  loadJSONArray,
  saveJSON,
  toggleSavedWord,
  todayStr,
} from "@/lib/engagement";
import { mulberry32, seedFromString, shuffleWith } from "@/lib/quiz-content";

/* ---------------- per-tool search history ---------------- */

export function useSolverHistory(key: string) {
  const storageKey = `awt-history-${key}-v1`;
  const [items, setItems] = useState<string[]>([]);
  useEffect(() => {
    setItems(loadJSONArray<string>(storageKey));
  }, [storageKey]);
  const add = (value: string) => {
    const v = value.trim();
    if (!v) return;
    setItems((prev) => {
      const next = [v, ...prev.filter((x) => x !== v)].slice(0, 6);
      saveJSON(storageKey, next);
      return next;
    });
  };
  const clear = () => {
    setItems([]);
    saveJSON(storageKey, []);
  };
  return { items, add, clear };
}

export function HistoryChips({
  items,
  onPick,
  onClear,
}: {
  items: string[];
  onPick: (v: string) => void;
  onClear: () => void;
}) {
  if (items.length === 0) return null;
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
        <History className="h-3.5 w-3.5" /> Recent:
      </span>
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onPick(item)}
          className="rounded-full border border-border/70 bg-secondary/40 px-3 py-1 text-xs font-semibold uppercase tracking-wide transition-colors hover:border-honey/60 hover:bg-accent"
        >
          {item}
        </button>
      ))}
      <button
        onClick={onClear}
        className="inline-flex items-center gap-0.5 text-xs font-medium text-muted-foreground hover:text-destructive"
      >
        <X className="h-3 w-3" /> Clear
      </button>
    </div>
  );
}

/* ---------------- result actions: copy all / download / share link ---------------- */

export function ResultActions({
  words,
  fileName,
  shareParams,
}: {
  words: string[];
  fileName: string;
  /** Query params that recreate this result when the link is opened. */
  shareParams?: Record<string, string>;
}) {
  const [copied, setCopied] = useState(false);
  const [linked, setLinked] = useState(false);
  if (words.length === 0) return null;

  const copyAll = async () => {
    if (await copyText(words.join("\n"))) {
      setCopied(true);
      toast.success(`${words.length} words copied`);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  const shareLink = async () => {
    try {
      const url = new URL(window.location.href);
      if (shareParams) {
        for (const [k, v] of Object.entries(shareParams)) url.searchParams.set(k, v);
      }
      if (navigator.share) {
        await navigator.share({ title: document.title, url: url.toString() }).catch(() => {});
      } else if (await copyText(url.toString())) {
        setLinked(true);
        toast.success("Shareable link copied — anyone opening it sees this exact result");
        setTimeout(() => setLinked(false), 2200);
      }
    } catch {
      /* noop */
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline" size="sm" onClick={copyAll} className="rounded-full">
        {copied ? <Check className="mr-1.5 h-4 w-4" /> : <Copy className="mr-1.5 h-4 w-4" />}
        Copy all
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => downloadText(fileName, words.join("\n"))}
        className="rounded-full"
      >
        <Download className="mr-1.5 h-4 w-4" /> .txt
      </Button>
      <Button variant="outline" size="sm" onClick={shareLink} className="rounded-full">
        {linked ? <Check className="mr-1.5 h-4 w-4" /> : <Link2 className="mr-1.5 h-4 w-4" />}
        Share result
      </Button>
    </div>
  );
}

/* ---------------- save-a-word star (My Word List) ---------------- */

export function SaveWordButton({ word, className }: { word: string; className?: string }) {
  const [saved, setSaved] = useState(false);
  useEffect(() => setSaved(isWordSaved(word)), [word]);
  return (
    <button
      type="button"
      aria-label={saved ? `Remove ${word} from My Word List` : `Save ${word} to My Word List`}
      title={saved ? "Saved in My Word List" : "Save to My Word List"}
      onClick={(e) => {
        e.stopPropagation();
        const now = toggleSavedWord(word);
        setSaved(now);
        toast.success(now ? `“${word}” saved to My Word List` : `“${word}” removed`);
      }}
      className={cn(
        "inline-flex h-6 w-6 items-center justify-center rounded-full transition-colors",
        saved ? "text-honey" : "text-muted-foreground/50 hover:text-honey",
        className,
      )}
    >
      <Star className={cn("h-3.5 w-3.5", saved && "fill-honey")} />
    </button>
  );
}

/* ---------------- Daily Unscramble widget ---------------- */

const DAILY_WORDS = [
  "planet", "garden", "bridge", "camera", "dolphin", "emerald", "festival", "guitar",
  "harvest", "island", "jungle", "kitten", "lantern", "magnet", "notebook", "orchard",
  "penguin", "rainbow", "saddle", "temple", "umbrella", "village", "window", "yellow",
  "zephyr", "anchor", "basket", "candle", "desert", "engine", "falcon", "glacier",
  "hammer", "inkpot", "jacket", "kernel", "ladder", "marble", "napkin", "ocean",
];

interface DailyState {
  date: string;
  solved: boolean;
  attempts: number;
}

export function DailyUnscramble() {
  const rng = mulberry32(seedFromString(`awt-unscramble-${todayStr()}`));
  const word = DAILY_WORDS[Math.floor(rng() * DAILY_WORDS.length)];
  const scrambled = shuffleWith(word.split(""), rng).join("");
  const [state, setState] = useState<DailyState>(() => {
    const saved = loadJSON<DailyState>("awt-daily-unscramble-v1", {
      date: "",
      solved: false,
      attempts: 0,
    });
    return saved.date === todayStr() ? saved : { date: todayStr(), solved: false, attempts: 0 };
  });
  const [guess, setGuess] = useState("");
  const [wrong, setWrong] = useState(false);
  const [daily, setDaily] = useState(() => getDailyState());

  const submit = () => {
    const g = guess.trim().toLowerCase();
    if (!g || state.solved) return;
    if (g === word) {
      const next = { ...state, solved: true, attempts: state.attempts + 1 };
      setState(next);
      saveJSON("awt-daily-unscramble-v1", next);
      setDaily(completeDaily());
      toast.success("Daily Unscramble solved! 🔥 Streak updated.");
    } else {
      setWrong(true);
      const next = { ...state, attempts: state.attempts + 1 };
      setState(next);
      saveJSON("awt-daily-unscramble-v1", next);
      setTimeout(() => setWrong(false), 600);
    }
    setGuess("");
  };

  return (
    <div className="mb-6 rounded-3xl border border-honey/40 bg-honey/5 p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-honey">
          <Puzzle className="h-4 w-4" /> Daily Unscramble
        </p>
        {daily.streak > 0 && (
          <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-2.5 py-1 text-[11px] font-bold text-orange-600 dark:text-orange-400">
            <Flame className="h-3 w-3" /> {daily.streak}-day streak
          </span>
        )}
      </div>
      {state.solved ? (
        <p className="mt-3 text-sm">
          ✅ Solved — today's word was <strong className="capitalize">{word}</strong>
          {state.attempts > 1 ? ` (in ${state.attempts} tries)` : " (first try!)"}. A new puzzle
          arrives tomorrow.
        </p>
      ) : (
        <>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {(scrambled === word ? word.split("").reverse() : scrambled.split("")).map((ch, i) => (
              <span
                key={i}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-card font-display text-lg font-bold uppercase shadow-soft"
              >
                {ch}
              </span>
            ))}
          </div>
          <form
            className="mt-3 flex flex-wrap gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <input
              value={guess}
              onChange={(e) => setGuess(e.target.value.replace(/[^a-zA-Z]/g, ""))}
              placeholder={`Unscramble the ${word.length}-letter word…`}
              autoComplete="off"
              spellCheck={false}
              className={cn(
                "h-11 min-w-48 flex-1 rounded-xl border bg-background px-3.5 text-sm font-semibold uppercase tracking-widest outline-none focus:border-honey",
                wrong ? "border-destructive" : "border-border/70",
              )}
            />
            <Button type="submit" disabled={!guess.trim()} className="h-11 rounded-xl px-5 font-semibold">
              Solve
            </Button>
          </form>
          {state.attempts > 0 && (
            <p className="mt-2 text-xs text-muted-foreground">
              {state.attempts} {state.attempts === 1 ? "try" : "tries"} so far — the word is a common
              English word, {word.length} letters.
            </p>
          )}
        </>
      )}
    </div>
  );
}
