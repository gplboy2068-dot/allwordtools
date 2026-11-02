import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CalendarDays,
  Check,
  Ear,
  Flame,
  Heart,
  Infinity as InfinityIcon,
  ListChecks,
  MousePointerClick,
  RotateCcw,
  Share2,
  SpellCheck2,
  Timer,
  Trophy,
  Volume2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import { uiText } from "@/i18n/ui-template";
import { Button } from "@/components/ui/button";
import {
  mulberry32,
  pickSpellingItems,
  seedFromString,
  shuffleWith,
  SPELLING,
  type SpellItem,
  type SpellLevel,
} from "@/lib/quiz-content";

/* ------------------------------------------------------------------ */
/* Types & persistence                                                */
/* ------------------------------------------------------------------ */

type Mode = "classic" | "listen" | "daily" | "endless";
type Screen = "menu" | "play" | "result";

interface Stats {
  best: Partial<Record<Mode, number>>;
  bestStreak: number;
  games: number;
  dailyLast: string | null; // YYYY-MM-DD (local)
  dailyStreak: number;
  dailyDoneToday: boolean;
}

const STATS_KEY = "awt-spelling-stats-v1";

function todayStr(): string {
  const d = new Date();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function loadStats(): Stats {
  const base: Stats = {
    best: {},
    bestStreak: 0,
    games: 0,
    dailyLast: null,
    dailyStreak: 0,
    dailyDoneToday: false,
  };
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return base;
    const parsed = { ...base, ...JSON.parse(raw) };
    parsed.dailyDoneToday = parsed.dailyLast === todayStr();
    return parsed;
  } catch {
    return base;
  }
}

function saveStats(s: Stats) {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(s));
  } catch {
    /* private mode etc. */
  }
}

/* ------------------------------------------------------------------ */
/* Audio                                                              */
/* ------------------------------------------------------------------ */

function speakWord(word: string) {
  try {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(word);
    u.lang = "en-US";
    u.rate = 0.82;
    synth.speak(u);
  } catch {
    /* audio unavailable */
  }
}

const hasSpeech = () =>
  typeof window !== "undefined" && "speechSynthesis" in window;

/* ------------------------------------------------------------------ */
/* Question model                                                     */
/* ------------------------------------------------------------------ */

interface Q {
  item: SpellItem;
  options: string[];
}

function toQuestions(items: SpellItem[], rng: () => number = Math.random): Q[] {
  return items.map((item) => ({
    item,
    options: shuffleWith([item.correct, ...item.wrong.slice(0, 3)], rng),
  }));
}

const TIME_LIMIT: Record<Mode, number> = {
  classic: 20,
  listen: 45,
  daily: 20,
  endless: 25,
};

const MODE_META: Record<
  Mode,
  { title: string; blurb: string; icon: typeof ListChecks }
> = {
  classic: {
    title: "Classic Quiz",
    blurb: "Pick the correct spelling before the timer runs out.",
    icon: MousePointerClick,
  },
  listen: {
    title: "Listen & Type",
    blurb: "Hear the word, type the spelling. Real spelling-bee style.",
    icon: Ear,
  },
  daily: {
    title: "Daily Challenge",
    blurb: "The same 10 words for everyone today. Keep your streak alive!",
    icon: CalendarDays,
  },
  endless: {
    title: "Endless Streak",
    blurb: "3 lives. Words get harder as you go. How far can you get?",
    icon: InfinityIcon,
  },
};

const ALL_LEVELS: SpellLevel[] = ["easy", "medium", "hard"];

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export function SpellingQuiz() {
  const { locale } = useI18n();
  const t = (key: string, fallback: string) => uiText(locale, key, fallback);
  const [screen, setScreen] = useState<Screen>("menu");
  const [mode, setMode] = useState<Mode>("classic");
  const [level, setLevel] = useState<SpellLevel>("medium");
  const [stats, setStats] = useState<Stats>(() => loadStats());
  const [speechOk] = useState(hasSpeech);

  const [questions, setQuestions] = useState<Q[]>([]);
  const [index, setIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [runBestStreak, setRunBestStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [log, setLog] = useState<{ item: SpellItem; given: string; ok: boolean }[]>([]);

  const [picked, setPicked] = useState<string | null>(null); // classic/daily/endless answer
  const [typed, setTyped] = useState(""); // listen mode input
  const [revealed, setRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [shared, setShared] = useState(false);
  const timerRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const current = questions[index];
  const answered = revealed;
  const isLastFixed = mode !== "endless" && index === questions.length - 1;

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  /* ---------------- game setup ---------------- */

  const startGame = useCallback(
    (m: Mode, lv: SpellLevel, customItems?: SpellItem[]) => {
      let qs: Q[];
      if (customItems) {
        qs = toQuestions(customItems);
      } else if (m === "daily") {
        const rng = mulberry32(seedFromString(`awt-daily-${todayStr()}`));
        qs = toQuestions(pickSpellingItems(10, ALL_LEVELS, rng), rng);
      } else if (m === "endless") {
        qs = toQuestions(pickSpellingItems(10, ["easy"]));
      } else {
        qs = toQuestions(pickSpellingItems(10, [lv]));
      }
      setMode(m);
      setQuestions(qs);
      setIndex(0);
      setPoints(0);
      setCorrectCount(0);
      setStreak(0);
      setRunBestStreak(0);
      setLives(3);
      setLog([]);
      setPicked(null);
      setTyped("");
      setRevealed(false);
      setShared(false);
      setScreen("play");
    },
    [],
  );

  const endlessNextBatch = useCallback((afterIndex: number, currentCorrect: number) => {
    // Difficulty ramps: first 10 easy, next 10 easy+medium, then medium+hard, then hard.
    const count = afterIndex + 1;
    const levels: SpellLevel[] =
      count < 10
        ? ["easy"]
        : count < 20
          ? ["easy", "medium"]
          : count < 30
            ? ["medium", "hard"]
            : ["hard"];
    void currentCorrect;
    return toQuestions(pickSpellingItems(10, levels));
  }, []);

  /* ---------------- timer ---------------- */

  useEffect(() => {
    if (screen !== "play" || !current || revealed) return;
    let remaining = TIME_LIMIT[mode];
    setTimeLeft(remaining);
    clearTimer();
    timerRef.current = window.setInterval(() => {
      remaining = Math.max(0, +(remaining - 0.1).toFixed(2));
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearTimer();
        // time out = wrong answer
        setRevealed(true);
        setStreak(0);
        setLog((l) => [
          ...l,
          { item: current.item, given: mode === "listen" ? "(no answer)" : "(time out)", ok: false },
        ]);
        if (mode === "endless") setLives((v) => Math.max(0, v - 1));
      }
    }, 100);
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, index, mode, questions]);

  useEffect(() => {
    if (screen === "play" && mode === "listen" && current && !revealed) {
      speakWord(current.item.correct);
      inputRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, index, mode, questions]);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  /* ---------------- answering ---------------- */

  const awardPoints = useCallback(
    (timeBonus: boolean) => {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setRunBestStreak((b) => Math.max(b, newStreak));
      const time = timeBonus ? Math.ceil(timeLeft) * 2 : 0;
      setPoints((p) => p + 100 + Math.min(50, (newStreak - 1) * 10) + time);
      setCorrectCount((c) => c + 1);
    },
    [streak, timeLeft],
  );

  const registerWrong = useCallback(
    (given: string) => {
      if (!current) return;
      setStreak(0);
      setLog((l) => [...l, { item: current.item, given, ok: false }]);
      if (mode === "endless") setLives((v) => Math.max(0, v - 1));
    },
    [current, mode],
  );

  const choose = (option: string) => {
    if (revealed || !current) return;
    clearTimer();
    setPicked(option);
    setRevealed(true);
    if (option === current.item.correct) {
      awardPoints(true);
      setLog((l) => [...l, { item: current.item, given: option, ok: true }]);
    } else {
      registerWrong(option);
    }
  };

  const submitTyped = () => {
    if (revealed || !current) return;
    const guess = typed.trim();
    if (!guess) return;
    clearTimer();
    setRevealed(true);
    if (guess.toLowerCase() === current.item.correct.toLowerCase()) {
      awardPoints(true);
      setLog((l) => [...l, { item: current.item, given: guess, ok: true }]);
    } else {
      registerWrong(guess);
    }
  };

  /* ---------------- finishing ---------------- */

  const finish = useCallback(() => {
    setStats((prev) => {
      const next: Stats = { ...prev, games: prev.games + 1, best: { ...prev.best } };
      next.best[mode] = Math.max(next.best[mode] ?? 0, points);
      next.bestStreak = Math.max(next.bestStreak, runBestStreak);
      if (mode === "daily") {
        const today = todayStr();
        if (prev.dailyLast !== today) {
          const y = new Date();
          y.setDate(y.getDate() - 1);
          const yStr = `${y.getFullYear()}-${`${y.getMonth() + 1}`.padStart(2, "0")}-${`${y.getDate()}`.padStart(2, "0")}`;
          next.dailyStreak = prev.dailyLast === yStr ? prev.dailyStreak + 1 : 1;
          next.dailyLast = today;
          next.dailyDoneToday = true;
        }
      }
      saveStats(next);
      return next;
    });
    setScreen("result");
  }, [mode, points, runBestStreak]);

  const next = () => {
    if (mode === "endless") {
      if (lives <= 0) {
        finish();
        return;
      }
      let qs = questions;
      if (index + 1 >= questions.length) {
        qs = [...questions, ...endlessNextBatch(index, correctCount)];
        setQuestions(qs);
      }
      setIndex((i) => i + 1);
    } else if (isLastFixed) {
      finish();
      return;
    } else {
      setIndex((i) => i + 1);
    }
    setPicked(null);
    setTyped("");
    setRevealed(false);
  };

  /* ---------------- derived ---------------- */

  const mistakes = useMemo(() => log.filter((l) => !l.ok), [log]);
  const totalAnswered = log.length;
  const accuracy = totalAnswered ? Math.round((correctCount / totalAnswered) * 100) : 0;

  const badge =
    mode === "endless"
      ? totalAnswered >= 25
        ? "Marathon Speller 🏅"
        : totalAnswered >= 15
          ? "Endurance Expert 🎖️"
          : totalAnswered >= 8
            ? "Streak Starter 🔥"
            : "Keep Going 🌱"
      : accuracy === 100
        ? "Spelling Champion 🏆"
        : accuracy >= 80
          ? "Word Wizard ✨"
          : accuracy >= 60
            ? "Sharp Speller ✏️"
            : "Keep Practising 🌱";

  const shareResult = async () => {
    const text =
      mode === "daily"
        ? `📅 Daily Spelling Challenge: I scored ${points} points (${correctCount}/${totalAnswered}) on AllWordTools! Day streak: ${stats.dailyStreak} 🔥 Can you beat me?`
        : `I scored ${points} points (${correctCount}/${totalAnswered} correct) on the AllWordTools Spelling Quiz — ${badge}! Can you beat me?`;
    const url = "https://www.allwordtools.com/tool/spelling-quiz";
    try {
      if (navigator.share) {
        await navigator.share({ title: "Spelling Quiz — AllWordTools", text, url });
        return;
      }
      throw new Error("no share");
    } catch {
      try {
        await navigator.clipboard.writeText(`${text} ${url}`);
        setShared(true);
      } catch {
        /* clipboard unavailable */
      }
    }
  };

  /* ---------------- MENU ---------------- */

  if (screen === "menu") {
    return (
      <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-lift sm:p-7">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-honey/15 text-honey">
            <SpellCheck2 className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold sm:text-2xl">Choose your challenge</h2>
            <p className="text-sm text-muted-foreground">
              {SPELLING.length} tricky words · timer on · build a streak for bonus points
            </p>
          </div>
        </div>

        {(stats.games > 0 || stats.dailyStreak > 0) && (
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold">
            {stats.dailyStreak > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-3 py-1.5 text-orange-600 dark:text-orange-400">
                <Flame className="h-3.5 w-3.5" /> {stats.dailyStreak}-day streak
              </span>
            )}
            {stats.bestStreak > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 text-muted-foreground">
                <Trophy className="h-3.5 w-3.5" /> Best streak: {stats.bestStreak}
              </span>
            )}
            {stats.games > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 text-muted-foreground">
                <ListChecks className="h-3.5 w-3.5" /> {stats.games} games played
              </span>
            )}
            {(Object.keys(stats.best) as Mode[]).map(
              (m) =>
                stats.best[m] !== undefined && (
                  <span
                    key={m}
                    className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 text-muted-foreground"
                  >
                    Best {MODE_META[m].title}: {stats.best[m]} pts
                  </span>
                ),
            )}
          </div>
        )}

        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Difficulty (Classic & Listen modes)
          </p>
          <div className="mt-2 flex gap-2">
            {(["easy", "medium", "hard"] as SpellLevel[]).map((lv) => (
              <button
                key={lv}
                onClick={() => setLevel(lv)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold capitalize transition-colors",
                  level === lv
                    ? "border-honey bg-honey/15 text-honey"
                    : "border-border/70 bg-secondary/40 text-muted-foreground hover:border-honey/50",
                )}
              >
                {lv}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {(Object.keys(MODE_META) as Mode[]).map((m) => {
            const meta = MODE_META[m];
            const Icon = meta.icon;
            const disabled = m === "listen" && !speechOk;
            return (
              <button
                key={m}
                disabled={disabled}
                onClick={() => startGame(m, level)}
                className={cn(
                  "rounded-2xl border border-border/70 bg-secondary/30 p-4 text-left transition-colors",
                  disabled
                    ? "cursor-not-allowed opacity-50"
                    : "hover:border-honey/60 hover:bg-accent",
                )}
              >
                <div className="flex items-center justify-between">
                  <Icon className="h-6 w-6 text-honey" />
                  {m === "daily" &&
                    (stats.dailyDoneToday ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                        <Check className="h-3 w-3" /> {t("game.doneToday", "Done today")}
                      </span>
                    ) : (
                      <span className="rounded-full bg-honey/15 px-2.5 py-1 text-[11px] font-bold text-honey">
                        {t("game.newToday", "New today")}
                      </span>
                    ))}
                  {m !== "daily" && stats.best[m] !== undefined && (
                    <span className="text-[11px] font-bold text-muted-foreground">
                      {t("game.best", "Best")}: {stats.best[m]} {t("game.pts", "pts")}
                    </span>
                  )}
                </div>
                <p className="mt-2.5 font-display text-base font-semibold">
                  {t(m === "listen" ? "game.listen" : `game.${m}`, meta.title)}
                </p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {disabled
                    ? "Your browser does not support audio playback for this mode."
                    : t(m === "listen" ? "game.listenBlurb" : `game.${m}Blurb`, meta.blurb)}
                </p>
                <p className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                  <Timer className="h-3.5 w-3.5" /> {TIME_LIMIT[m]}s per word
                  {m === "endless" && (
                    <>
                      {" "}· <Heart className="h-3.5 w-3.5 text-destructive" /> 3 lives
                    </>
                  )}
                </p>
              </button>
            );
          })}
        </div>

        <p className="mt-5 text-center text-xs text-muted-foreground">
          Scoring: 100 points per correct word + up to 50 streak bonus + speed bonus for fast answers.
        </p>
      </div>
    );
  }

  /* ---------------- RESULT ---------------- */

  if (screen === "result") {
    return (
      <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-lift sm:p-8">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-honey/15 text-honey">
            <Trophy className="h-8 w-8" />
          </div>
          <h2 className="mt-4 font-display text-2xl font-semibold">{badge}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {MODE_META[mode].title}
            {mode === "classic" || mode === "listen" ? ` · ${level} level` : ""}
            {mode === "daily" && stats.dailyStreak > 0
              ? ` · 🔥 ${stats.dailyStreak}-day streak`
              : ""}
          </p>
          <p className="mt-5 font-display text-5xl font-bold text-honey">{points}</p>
          <p className="text-sm text-muted-foreground">points</p>
          <div className="mx-auto mt-5 grid max-w-md grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl bg-secondary/50 p-3">
              <p className="font-display text-lg font-bold">
                {correctCount}/{totalAnswered}
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Correct
              </p>
            </div>
            <div className="rounded-2xl bg-secondary/50 p-3">
              <p className="font-display text-lg font-bold">{accuracy}%</p>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Accuracy
              </p>
            </div>
            <div className="rounded-2xl bg-secondary/50 p-3">
              <p className="font-display text-lg font-bold inline-flex items-center gap-1">
                <Flame className="h-4 w-4 text-orange-500" />
                {runBestStreak}
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Best streak
              </p>
            </div>
          </div>
          {stats.best[mode] !== undefined && stats.best[mode]! >= points && points > 0 && (
            <p className="mt-3 text-xs font-semibold text-muted-foreground">
              Your best in this mode: {stats.best[mode]} points
            </p>
          )}
        </div>

        {mistakes.length > 0 && (
          <div className="mt-7 border-t border-border/60 pt-5">
            <h3 className="font-display text-base font-semibold">
              Review your mistakes ({mistakes.length})
            </h3>
            <ul className="mt-3 divide-y divide-border/50">
              {mistakes.map((m, i) => (
                <li key={i} className="flex items-center justify-between gap-3 py-2.5">
                  <div className="text-sm">
                    <span className="font-semibold">{m.item.correct}</span>
                    <span className="text-muted-foreground"> — {m.item.hint}</span>
                    <p className="text-xs text-destructive">You answered: {m.given}</p>
                  </div>
                  <button
                    onClick={() => speakWord(m.item.correct)}
                    disabled={!speechOk}
                    className="shrink-0 rounded-full border border-border/70 p-2 text-muted-foreground transition-colors hover:border-honey/60 hover:text-honey disabled:opacity-40"
                    aria-label={`Hear ${m.item.correct}`}
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
            {mistakes.length >= 2 && (
              <Button
                variant="outline"
                className="mt-3 rounded-2xl"
                onClick={() => startGame("classic", level, mistakes.map((m) => m.item))}
              >
                <RotateCcw className="mr-2 h-4 w-4" /> Practise your mistakes (
                {mistakes.length} words)
              </Button>
            )}
          </div>
        )}

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button onClick={() => startGame(mode, level)} className="h-12 rounded-2xl px-6 font-semibold">
            <RotateCcw className="mr-2 h-5 w-5" /> Play again
          </Button>
          <Button
            variant="outline"
            onClick={() => setScreen("menu")}
            className="h-12 rounded-2xl px-6 font-semibold"
          >
            Change mode
          </Button>
          <Button variant="outline" onClick={shareResult} className="h-12 rounded-2xl px-6 font-semibold">
            {shared ? (
              <>
                <Check className="mr-2 h-5 w-5" /> Copied!
              </>
            ) : (
              <>
                <Share2 className="mr-2 h-5 w-5" /> Share result
              </>
            )}
          </Button>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Tip: finish the Daily Challenge every day to build your 🔥 streak.
        </p>
      </div>
    );
  }

  /* ---------------- PLAY ---------------- */

  if (!current) return null;
  const limit = TIME_LIMIT[mode];
  const timePct = Math.max(0, Math.min(100, (timeLeft / limit) * 100));
  const progressPct =
    mode === "endless"
      ? 100
      : Math.round((index / Math.max(1, questions.length)) * 100);
  const correctWord = current.item.correct;

  return (
    <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-lift sm:p-7">
      {/* header strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-muted-foreground">
        <span>
          {MODE_META[mode].title}
          {mode !== "endless" && ` · Word ${index + 1} of ${questions.length}`}
          {mode === "endless" && ` · Word ${index + 1}`}
        </span>
        <span className="inline-flex items-center gap-3">
          {streak >= 2 && (
            <span className="inline-flex items-center gap-1 text-orange-500">
              <Flame className="h-4 w-4" /> x{streak} streak
            </span>
          )}
          {mode === "endless" && (
            <span className="inline-flex items-center gap-0.5">
              {[0, 1, 2].map((i) => (
                <Heart
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < lives ? "fill-destructive text-destructive" : "text-muted-foreground/40",
                  )}
                />
              ))}
            </span>
          )}
          <span>
            {points} pts · ✓ {correctCount}
          </span>
        </span>
      </div>

      {/* progress + timer bars */}
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-honey transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>
      <div className="mt-2 flex items-center gap-2">
        <Timer className={cn("h-4 w-4", timeLeft <= 5 && !revealed ? "text-destructive" : "text-muted-foreground")} />
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-100",
              timeLeft <= 5 && !revealed ? "bg-destructive" : "bg-emerald-500",
            )}
            style={{ width: `${revealed ? 0 : timePct}%` }}
          />
        </div>
        <span className="w-10 text-right text-xs font-bold text-muted-foreground">
          {revealed ? "—" : `${Math.ceil(timeLeft)}s`}
        </span>
      </div>

      {/* prompt */}
      {mode === "listen" ? (
        <div className="mt-6 text-center">
          <button
            onClick={() => speakWord(correctWord)}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-honey/15 text-honey transition-transform hover:scale-105"
            aria-label="Play the word again"
          >
            <Volume2 className="h-9 w-9" />
          </button>
          <p className="mt-3 font-display text-lg font-semibold">Listen and type the word</p>
          <p className="mt-1 text-sm text-muted-foreground">Meaning: {current.item.hint}</p>
          <form
            className="mx-auto mt-4 flex max-w-md gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              submitTyped();
            }}
          >
            <input
              ref={inputRef}
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              disabled={revealed}
              placeholder="Type the spelling here…"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              className={cn(
                "h-12 flex-1 rounded-2xl border bg-background px-4 text-base font-medium outline-none transition-colors",
                revealed
                  ? typed.trim().toLowerCase() === correctWord.toLowerCase()
                    ? "border-emerald-500/60 bg-emerald-500/10"
                    : "border-destructive/60 bg-destructive/10"
                  : "border-border/70 focus:border-honey",
              )}
            />
            <Button type="submit" disabled={revealed || !typed.trim()} className="h-12 rounded-2xl px-5 font-semibold">
              Check
            </Button>
          </form>
          {revealed && (
            <p className="mt-3 text-sm">
              {typed.trim().toLowerCase() === correctWord.toLowerCase() ? (
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Correct! ✓
                </span>
              ) : (
                <span>
                  The correct spelling is{" "}
                  <strong className="font-display text-base">{correctWord}</strong>
                </span>
              )}
            </p>
          )}
        </div>
      ) : (
        <>
          <div className="mt-6 flex items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-xl font-semibold sm:text-2xl">
                Which spelling is correct?
              </h2>
              <p className="mt-1.5 text-sm text-muted-foreground">Meaning: {current.item.hint}</p>
            </div>
            <button
              onClick={() => speakWord(correctWord)}
              disabled={!speechOk}
              className="shrink-0 rounded-full border border-border/70 p-2.5 text-muted-foreground transition-colors hover:border-honey/60 hover:text-honey disabled:opacity-40"
              aria-label="Hear the word pronounced"
              title="Hear it pronounced"
            >
              <Volume2 className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-5 grid gap-3">
            {current.options.map((option) => {
              const isAnswer = option === correctWord;
              const isPicked = option === picked;
              const state = !revealed
                ? "idle"
                : isAnswer
                  ? "correct"
                  : isPicked
                    ? "wrong"
                    : "muted";
              return (
                <button
                  key={option}
                  onClick={() => choose(option)}
                  disabled={revealed}
                  className={cn(
                    "flex items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-left text-sm font-medium transition-colors",
                    state === "idle" &&
                      "border-border/70 bg-secondary/40 hover:border-honey/60 hover:bg-accent",
                    state === "correct" &&
                      "border-emerald-500/60 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
                    state === "wrong" && "border-destructive/60 bg-destructive/10 text-destructive",
                    state === "muted" && "border-border/50 bg-secondary/20 text-muted-foreground",
                  )}
                >
                  <span>{option}</span>
                  {state === "correct" && <Check className="h-5 w-5 shrink-0" />}
                  {state === "wrong" && <X className="h-5 w-5 shrink-0" />}
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* footer after answering */}
      {revealed && (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-5">
          <p className="text-sm text-muted-foreground">
            {mode === "listen"
              ? `Word: ${correctWord}`
              : picked === correctWord
                ? "Correct! 🎉"
                : picked
                  ? `Correct spelling: ${correctWord}`
                  : `Time up! Correct spelling: ${correctWord}`}
          </p>
          <Button onClick={next} className="h-11 rounded-2xl px-7 font-semibold">
            {mode === "endless"
              ? lives <= 0
                ? "See results"
                : "Next word"
              : isLastFixed
                ? "See results"
                : "Next word"}
          </Button>
        </div>
      )}
    </div>
  );
}

