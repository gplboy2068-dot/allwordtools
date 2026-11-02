import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { CalendarDays, Check, ChevronRight, Flame, Puzzle, SpellCheck, BookOpen } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import { getDailyState, loadJSON, todayStr } from "@/lib/engagement";

/**
 * Daily-challenge layer (Phase 7): one place that shows today's games,
 * which ones are already done, and the site-wide streak. Rendered on
 * the homepage as a card and on tool pages as a slim reminder band.
 */

type Challenge = {
  slug: string;
  title: string;
  blurb: string;
  icon: typeof Puzzle;
  done: boolean;
};

function todaysChallenges(): Challenge[] {
  const today = todayStr();
  const spelling = loadJSON<{ dailyLast: string | null }>("awt-spelling-stats-v1", { dailyLast: null });
  const guess = loadJSON<{ date: string; finished: boolean }>("awt-guess-word-v1", {
    date: "",
    finished: false,
  });
  const unscramble = loadJSON<{ date: string; solved: boolean }>("awt-daily-unscramble-v1", {
    date: "",
    solved: false,
  });
  const quizDone = ["vocabulary", "synonym", "antonym", "prefix", "suffix"].some((s) => {
    const st = loadJSON<{ dailyLast: string | null }>(`awt-quiz-${s}-v1`, { dailyLast: null });
    return st.dailyLast === today;
  });
  return [
    {
      slug: "spelling-quiz",
      title: "Daily Spelling",
      blurb: "10 tricky words, same for everyone today",
      icon: SpellCheck,
      done: spelling.dailyLast === today,
    },
    {
      slug: "word-of-the-day",
      title: "Guess the Word",
      blurb: "Wordle-style — crack today's word in 6 tries",
      icon: BookOpen,
      done: guess.date === today && guess.finished,
    },
    {
      slug: "word-unscrambler",
      title: "Daily Unscramble",
      blurb: "One scrambled word, waiting on the unscrambler",
      icon: Puzzle,
      done: unscramble.date === today && unscramble.solved,
    },
    {
      slug: "vocabulary-quiz",
      title: "Daily Quiz",
      blurb: "Any of the 5 word quizzes' daily round counts",
      icon: CalendarDays,
      done: quizDone,
    },
  ];
}

function useChallenges() {
  const [list, setList] = useState<Challenge[]>([]);
  const [streak, setStreak] = useState(0);
  useEffect(() => {
    setList(todaysChallenges());
    setStreak(getDailyState().streak);
  }, []);
  return { list, streak };
}

export function DailyChallengesCard() {
  const { locale } = useI18n();
  const isDefault = locale === DEFAULT_LOCALE;
  const { list, streak } = useChallenges();
  if (list.length === 0) return null;
  const doneCount = list.filter((c) => c.done).length;

  const linkProps = (slug: string) =>
    isDefault
      ? ({ to: "/tool/$tool", params: { tool: slug } } as const)
      : ({ to: "/$locale/tool/$tool", params: { locale, tool: slug } } as const);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="rounded-3xl border border-honey/40 bg-honey/5 p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 font-display text-xl font-semibold sm:text-2xl">
            <CalendarDays className="h-6 w-6 text-honey" /> Today's challenges
          </h2>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="rounded-full bg-card px-3 py-1.5">
              {doneCount}/{list.length} done today
            </span>
            {streak > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-3 py-1.5 text-orange-600 dark:text-orange-400">
                <Flame className="h-4 w-4" /> {streak}-day streak
              </span>
            )}
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.slug}
                {...linkProps(c.slug)}
                className="group rounded-2xl border border-border/70 bg-card p-4 transition-colors hover:border-honey/60"
              >
                <div className="flex items-center justify-between">
                  <Icon className="h-6 w-6 text-honey" />
                  {c.done ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      <Check className="h-3 w-3" /> Done
                    </span>
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  )}
                </div>
                <p className="mt-2.5 font-display text-base font-semibold">{c.title}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{c.blurb}</p>
              </Link>
            );
          })}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Finish any challenge to keep your daily streak alive — a fresh set arrives every morning.
        </p>
      </div>
    </section>
  );
}

/** Slim band for tool pages: shows only while today's challenges are unfinished. */
export function DailyChallengeBand() {
  const { locale } = useI18n();
  const isDefault = locale === DEFAULT_LOCALE;
  const { list, streak } = useChallenges();
  const next = list.find((c) => !c.done);
  if (!next) return null;
  const linkProps = isDefault
    ? ({ to: "/tool/$tool", params: { tool: next.slug } } as const)
    : ({ to: "/$locale/tool/$tool", params: { locale, tool: next.slug } } as const);
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-honey/40 bg-honey/5 px-4 py-3">
      <p className="inline-flex items-center gap-2 text-sm font-medium">
        <CalendarDays className="h-4 w-4 text-honey" />
        <span>
          <strong>Today's challenge:</strong> {next.title} — {next.blurb}.
        </span>
        {streak > 0 && (
          <span className="inline-flex items-center gap-1 text-orange-600 dark:text-orange-400">
            <Flame className="h-3.5 w-3.5" /> {streak}
          </span>
        )}
      </p>
      <Link {...linkProps} className="inline-flex items-center gap-1 text-sm font-bold text-honey hover:underline">
        Play now <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
