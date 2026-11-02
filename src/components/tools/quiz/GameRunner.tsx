import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeftRight,
  CalendarDays,
  Check,
  Flame,
  Heart,
  Infinity as InfinityIcon,
  ListChecks,
  MousePointerClick,
  RotateCcw,
  Share2,
  Timer,
  Trophy,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  mulberry32,
  seedFromString,
  type QuizLevel,
  type QuizQuestion,
} from "@/lib/quiz-content";
import {
  completeDaily,
  loadJSON,
  saveJSON,
  shareText,
  todayStr,
  yesterdayStr,
} from "@/lib/engagement";

/**
 * GameRunner — the engagement game engine for the MCQ quizzes
 * (Phase 1 of the tools upgrade plan; spelling has its own runner with
 * the extra Listen & Type mode). Modes: Classic, Reverse, Daily
 * Challenge (date-seeded) and Endless (3 lives). Timer, streak/points,
 * per-mode best scores, mistake review + practise round, share result.
 */

export type GameBuildOpts = {
  levels?: QuizLevel[];
  reverse?: boolean;
  rng?: () => number;
};
export type GameBuilder = (count: number, opts?: GameBuildOpts) => QuizQuestion[];

type Mode = "classic" | "reverse" | "daily" | "endless";
type Screen = "menu" | "play" | "result";

interface Stats {
  best: Partial<Record<Mode, number>>;
  bestStreak: number;
  games: number;
  dailyLast: string | null;
  dailyStreak: number;
}

const TIME_PER_Q = 20;

const MODE_META: Record<Mode, { title: string; blurb: string; icon: LucideIcon }> = {
  classic: {
    title: "Classic Quiz",
    blurb: "Ten questions against the clock. Build a streak for bonus points.",
    icon: MousePointerClick,
  },
  reverse: {
    title: "Reverse Mode",
    blurb: "The answer is given — pick the right question word. Tricky!",
    icon: ArrowLeftRight,
  },
  daily: {
    title: "Daily Challenge",
    blurb: "The same 10 questions for everyone today. Keep the streak alive!",
    icon: CalendarDays,
  },
  endless: {
    title: "Endless Streak",
    blurb: "3 lives. Questions keep coming until you run out of hearts.",
    icon: InfinityIcon,
  },
};

export function GameRunner({
  subjectKey,
  title,
  icon: Icon,
  build,
  toolPath,
}: {
  /** localStorage namespace, e.g. "vocabulary" */
  subjectKey: string;
  title: string;
  icon: LucideIcon;
  build: GameBuilder;
  /** e.g. "/tool/vocabulary-quiz" for share links */
  toolPath: string;
}) {
  const statsKey = `awt-quiz-${subjectKey}-v1`;
  const [screen, setScreen] = useState<Screen>("menu");
  const [mode, setMode] = useState<Mode>("classic");
  const [level, setLevel] = useState<QuizLevel>("medium");
  const [stats, setStats] = useState<Stats>(() =>
    loadJSON<Stats>(statsKey, { best: {}, bestStreak: 0, games: 0, dailyLast: null, dailyStreak: 0 }),
  );

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [runBestStreak, setRunBestStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [log, setLog] = useState<{ q: QuizQuestion; given: string; ok: boolean }[]>([]);
  const [picked, setPicked] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_Q);
  const [shared, setShared] = useState(false);
  const timerRef = useRef<number | null>(null);

  const current = questions[index];
  const isLastFixed = mode !== "endless" && index === questions.length - 1;
  const dailyDoneToday = stats.dailyLast === todayStr();

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startGame = useCallback(
    (m: Mode, lv: QuizLevel, custom?: QuizQuestion[]) => {
      let qs: QuizQuestion[];
      if (custom) qs = custom;
      else if (m === "daily") {
        const rng = mulberry32(seedFromString(`awt-daily-${subjectKey}-${todayStr()}`));
        qs = build(10, { rng });
      } else if (m === "endless") {
        qs = build(10, {});
      } else {
        qs = build(10, { levels: [lv], reverse: m === "reverse" });
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
      setRevealed(false);
      setShared(false);
      setScreen("play");
    },
    [build, subjectKey],
  );

  /* timer */
  useEffect(() => {
    if (screen !== "play" || !current || revealed) return;
    let remaining = TIME_PER_Q;
    setTimeLeft(remaining);
    clearTimer();
    timerRef.current = window.setInterval(() => {
      remaining = Math.max(0, +(remaining - 0.1).toFixed(2));
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearTimer();
        setRevealed(true);
        setStreak(0);
        setLog((l) => [...l, { q: current, given: "(time out)", ok: false }]);
        if (mode === "endless") setLives((v) => Math.max(0, v - 1));
      }
    }, 100);
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, index, mode, questions]);

  const choose = (option: string) => {
    if (revealed || !current) return;
    clearTimer();
    setPicked(option);
    setRevealed(true);
    if (option === current.answer) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setRunBestStreak((b) => Math.max(b, newStreak));
      setPoints((p) => p + 100 + Math.min(50, (newStreak - 1) * 10) + Math.ceil(timeLeft) * 2);
      setCorrectCount((c) => c + 1);
      setLog((l) => [...l, { q: current, given: option, ok: true }]);
    } else {
      setStreak(0);
      setLog((l) => [...l, { q: current, given: option, ok: false }]);
      if (mode === "endless") setLives((v) => Math.max(0, v - 1));
    }
  };

  const finish = useCallback(() => {
    setStats((prev) => {
      const next: Stats = { ...prev, games: prev.games + 1, best: { ...prev.best } };
      next.best[mode] = Math.max(next.best[mode] ?? 0, points);
      next.bestStreak = Math.max(next.bestStreak, runBestStreak);
      if (mode === "daily" && prev.dailyLast !== todayStr()) {
        next.dailyStreak = prev.dailyLast === yesterdayStr() ? prev.dailyStreak + 1 : 1;
        next.dailyLast = todayStr();
        completeDaily();
      }
      saveJSON(statsKey, next);
      return next;
    });
    setScreen("result");
  }, [mode, points, runBestStreak, statsKey]);

  const next = () => {
    if (mode === "endless") {
      if (lives <= 0) return finish();
      if (index + 1 >= questions.length) {
        setQuestions((qs) => [...qs, ...build(10, {})]);
      }
      setIndex((i) => i + 1);
    } else if (isLastFixed) {
      return finish();
    } else {
      setIndex((i) => i + 1);
    }
    setPicked(null);
    setRevealed(false);
  };

  const mistakes = useMemo(() => log.filter((l) => !l.ok), [log]);
  const totalAnswered = log.length;
  const accuracy = totalAnswered ? Math.round((correctCount / totalAnswered) * 100) : 0;
  const badge =
    mode === "endless"
      ? totalAnswered >= 25
        ? "Marathon Mind 🏅"
        : totalAnswered >= 15
          ? "Endurance Expert 🎖️"
          : "Keep Going 🌱"
      : accuracy === 100
        ? "Perfect Round! 🏆"
        : accuracy >= 80
          ? "Word Wizard ✨"
          : accuracy >= 60
            ? "Sharp Thinker ✏️"
            : "Keep Practising 🌱";

  const doShare = async () => {
    const text =
      mode === "daily"
        ? `📅 Daily ${title} Challenge: I scored ${points} points (${correctCount}/${totalAnswered}) on AllWordTools! Streak: ${stats.dailyStreak} day(s) 🔥 Can you beat me?`
        : `I scored ${points} points (${correctCount}/${totalAnswered} correct) on the AllWordTools ${title} — ${badge} Can you beat me?`;
    const res = await shareText(`${title} — AllWordTools`, text, `https://www.allwordtools.com${toolPath}`);
    if (res === "copied") setShared(true);
  };

  /* ---------------- MENU ---------------- */
  if (screen === "menu") {
    return (
      <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-lift sm:p-7">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-honey/15 text-honey">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold sm:text-2xl">Choose your challenge</h2>
            <p className="text-sm text-muted-foreground">
              Timer on · streaks earn bonus points · your best scores are saved
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
          </div>
        )}

        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Difficulty (Classic & Reverse modes)
          </p>
          <div className="mt-2 flex gap-2">
            {(["easy", "medium", "hard"] as QuizLevel[]).map((lv) => (
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
            const MIcon = meta.icon;
            return (
              <button
                key={m}
                onClick={() => startGame(m, level)}
                className="rounded-2xl border border-border/70 bg-secondary/30 p-4 text-left transition-colors hover:border-honey/60 hover:bg-accent"
              >
                <div className="flex items-center justify-between">
                  <MIcon className="h-6 w-6 text-honey" />
                  {m === "daily" ? (
                    dailyDoneToday ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                        <Check className="h-3 w-3" /> Done today
                      </span>
                    ) : (
                      <span className="rounded-full bg-honey/15 px-2.5 py-1 text-[11px] font-bold text-honey">
                        New today
                      </span>
                    )
                  ) : stats.best[m] !== undefined ? (
                    <span className="text-[11px] font-bold text-muted-foreground">
                      Best: {stats.best[m]} pts
                    </span>
                  ) : null}
                </div>
                <p className="mt-2.5 font-display text-base font-semibold">{meta.title}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{meta.blurb}</p>
                <p className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                  <Timer className="h-3.5 w-3.5" /> {TIME_PER_Q}s per question
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
          Scoring: 100 points per correct answer + up to 50 streak bonus + speed bonus for fast answers.
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
            {MODE_META[mode].title} · {title}
            {mode === "daily" && stats.dailyStreak > 0 ? ` · 🔥 ${stats.dailyStreak}-day streak` : ""}
          </p>
          <p className="mt-5 font-display text-5xl font-bold text-honey">{points}</p>
          <p className="text-sm text-muted-foreground">points</p>
          <div className="mx-auto mt-5 grid max-w-md grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl bg-secondary/50 p-3">
              <p className="font-display text-lg font-bold">
                {correctCount}/{totalAnswered}
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Correct</p>
            </div>
            <div className="rounded-2xl bg-secondary/50 p-3">
              <p className="font-display text-lg font-bold">{accuracy}%</p>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Accuracy</p>
            </div>
            <div className="rounded-2xl bg-secondary/50 p-3">
              <p className="font-display inline-flex items-center gap-1 text-lg font-bold">
                <Flame className="h-4 w-4 text-orange-500" /> {runBestStreak}
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Best streak</p>
            </div>
          </div>
        </div>

        {mistakes.length > 0 && (
          <div className="mt-7 border-t border-border/60 pt-5">
            <h3 className="font-display text-base font-semibold">Review your mistakes ({mistakes.length})</h3>
            <ul className="mt-3 divide-y divide-border/50">
              {mistakes.map((m, i) => (
                <li key={i} className="py-2.5 text-sm">
                  <p className="font-medium">{m.q.prompt}</p>
                  <p className="text-xs text-destructive">You answered: {m.given}</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">
                    Correct: {m.q.answer}
                    {m.q.explanation ? ` — ${m.q.explanation}` : ""}
                  </p>
                </li>
              ))}
            </ul>
            {mistakes.length >= 2 && (
              <Button
                variant="outline"
                className="mt-3 rounded-2xl"
                onClick={() => startGame("classic", level, mistakes.map((m) => m.q))}
              >
                <RotateCcw className="mr-2 h-4 w-4" /> Practise your mistakes ({mistakes.length} questions)
              </Button>
            )}
          </div>
        )}

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button onClick={() => startGame(mode, level)} className="h-12 rounded-2xl px-6 font-semibold">
            <RotateCcw className="mr-2 h-5 w-5" /> Play again
          </Button>
          <Button variant="outline" onClick={() => setScreen("menu")} className="h-12 rounded-2xl px-6 font-semibold">
            Change mode
          </Button>
          <Button variant="outline" onClick={doShare} className="h-12 rounded-2xl px-6 font-semibold">
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
      </div>
    );
  }

  /* ---------------- PLAY ---------------- */
  if (!current) return null;
  const timePct = Math.max(0, Math.min(100, (timeLeft / TIME_PER_Q) * 100));
  const progressPct = mode === "endless" ? 100 : Math.round((index / Math.max(1, questions.length)) * 100);
  return (
    <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-lift sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-muted-foreground">
        <span>
          {MODE_META[mode].title}
          {mode !== "endless" && ` · Question ${index + 1} of ${questions.length}`}
          {mode === "endless" && ` · Question ${index + 1}`}
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
                  className={cn("h-4 w-4", i < lives ? "fill-destructive text-destructive" : "text-muted-foreground/40")}
                />
              ))}
            </span>
          )}
          <span>
            {points} pts · ✓ {correctCount}
          </span>
        </span>
      </div>

      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div className="h-full rounded-full bg-honey transition-all duration-300" style={{ width: `${progressPct}%` }} />
      </div>
      <div className="mt-2 flex items-center gap-2">
        <Timer className={cn("h-4 w-4", timeLeft <= 5 && !revealed ? "text-destructive" : "text-muted-foreground")} />
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
          <div
            className={cn("h-full rounded-full transition-all duration-100", timeLeft <= 5 && !revealed ? "bg-destructive" : "bg-emerald-500")}
            style={{ width: `${revealed ? 0 : timePct}%` }}
          />
        </div>
        <span className="w-10 text-right text-xs font-bold text-muted-foreground">{revealed ? "—" : `${Math.ceil(timeLeft)}s`}</span>
      </div>

      <h2 className="mt-6 font-display text-xl font-semibold sm:text-2xl">{current.prompt}</h2>
      {current.hint && <p className="mt-1.5 text-sm text-muted-foreground">{current.hint}</p>}

      <div className="mt-5 grid gap-3">
        {current.options.map((option) => {
          const isAnswer = option === current.answer;
          const isPicked = option === picked;
          const state = !revealed ? "idle" : isAnswer ? "correct" : isPicked ? "wrong" : "muted";
          return (
            <button
              key={option}
              onClick={() => choose(option)}
              disabled={revealed}
              className={cn(
                "flex items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-left text-sm font-medium transition-colors",
                state === "idle" && "border-border/70 bg-secondary/40 hover:border-honey/60 hover:bg-accent",
                state === "correct" && "border-emerald-500/60 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
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

      {revealed && (
        <div className="mt-5 border-t border-border/60 pt-5">
          {current.explanation && <p className="text-sm text-muted-foreground">{current.explanation}</p>}
          <Button onClick={next} className="mt-4 h-11 rounded-2xl px-7 font-semibold">
            {mode === "endless" ? (lives <= 0 ? "See results" : "Next question") : isLastFixed ? "See results" : "Next question"}
          </Button>
        </div>
      )}
    </div>
  );
}
