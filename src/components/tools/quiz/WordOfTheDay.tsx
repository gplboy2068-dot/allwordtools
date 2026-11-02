import { useMemo, useState } from "react";
import { Copy, RefreshCw, Volume2, type LucideIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { formatLongDate, WORD_BANK, wordForDate, type DailyEntry } from "@/lib/quiz-content";
import { GuessTheWord } from "@/components/tools/quiz/GuessTheWord";

type WordOfTheDayProps = {
  icon: LucideIcon;
  /** When true, shows a "Surprise me" button to draw a random word too. */
  allowRandom?: boolean;
};

export function WordOfTheDay({ icon: Icon, allowRandom = true }: WordOfTheDayProps) {
  const today = useMemo(() => wordForDate(), []);
  const dateLabel = useMemo(() => formatLongDate(), []);
  const [entry, setEntry] = useState<DailyEntry>(today);
  const [isToday, setIsToday] = useState(true);

  const speak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      toast.error("Speech is not supported in this browser.");
      return;
    }
    const u = new SpeechSynthesisUtterance(entry.word);
    u.lang = "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  const surprise = () => {
    let next = entry;
    while (next.word === entry.word && WORD_BANK.length > 1) {
      next = WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)];
    }
    setEntry(next);
    setIsToday(false);
  };

  const copy = () => {
    navigator.clipboard?.writeText(`${entry.word} (${entry.pos}) — ${entry.definition}`);
    toast.success("Copied to clipboard");
  };

  return (
    <>
    <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-lift sm:p-8">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-honey">
        <Icon className="h-4 w-4" />
        {isToday ? dateLabel : "Random word"}
      </div>

      <div className="mt-4 flex flex-wrap items-end gap-3">
        <h2 className="font-display text-4xl font-bold capitalize sm:text-5xl">{entry.word}</h2>
        <span className="mb-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
          {entry.pos}
        </span>
      </div>

      <div className="mt-2 flex items-center gap-3">
        <span className="font-mono text-lg text-muted-foreground">{entry.ipa}</span>
        <button
          onClick={speak}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 text-honey transition-colors hover:bg-accent"
          aria-label={`Hear ${entry.word} pronounced`}
        >
          <Volume2 className="h-4 w-4" />
        </button>
      </div>

      <p className="mt-5 text-lg leading-relaxed">{entry.definition}</p>
      <blockquote className="mt-4 border-l-2 border-honey/60 pl-4 text-muted-foreground italic">
        “{entry.example}”
      </blockquote>

      <div className="mt-7 flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={copy} className="rounded-full">
          <Copy className="mr-1.5 h-4 w-4" /> Copy
        </Button>
        {allowRandom && (
          <Button variant="ghost" size="sm" onClick={surprise} className="rounded-full">
            <RefreshCw className="mr-1.5 h-4 w-4" /> Surprise me
          </Button>
        )}
      </div>
    </div>
    <GuessTheWord entry={today} />
    </>
  );
}