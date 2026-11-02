import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { BookOpen, Copy, GraduationCap, Layers, Star, Volume2, X } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/i18n/I18nProvider";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import {
  copyText,
  getSavedWords,
  onSavedWordsChanged,
  speakWord,
  toggleSavedWord,
} from "@/lib/engagement";

/**
 * "My Word List" — words the user ⭐-saved from solvers/dictionary.
 * Rendered under the dictionary tools; click a word to look it up again.
 */
export function MyWordList({ onPick }: { onPick?: (word: string) => void }) {
  const { locale } = useI18n();
  const isDefault = locale === DEFAULT_LOCALE;
  const [words, setWords] = useState<string[]>([]);
  useEffect(() => {
    const sync = () => setWords(getSavedWords());
    sync();
    return onSavedWordsChanged(sync);
  }, []);
  if (words.length === 0) return null;

  const toolLink = (slug: string) =>
    isDefault
      ? ({ to: "/tool/$tool", params: { tool: slug } } as const)
      : ({ to: "/$locale/tool/$tool", params: { locale, tool: slug } } as const);

  return (
    <div className="mt-6 rounded-3xl border border-border/70 bg-card p-5 shadow-lift sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="inline-flex items-center gap-2 font-display text-lg font-semibold">
          <Star className="h-5 w-5 fill-honey text-honey" /> My Word List
          <span className="text-sm font-medium text-muted-foreground">({words.length})</span>
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={async () => {
              if (await copyText(words.join("\n"))) toast.success("Word list copied");
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-border/70 px-3 py-1.5 text-xs font-semibold transition-colors hover:border-honey/60"
          >
            <Copy className="h-3.5 w-3.5" /> Copy list
          </button>
          <Link
            {...toolLink("ai-flashcards")}
            className="inline-flex items-center gap-1.5 rounded-full border border-border/70 px-3 py-1.5 text-xs font-semibold transition-colors hover:border-honey/60"
          >
            <Layers className="h-3.5 w-3.5" /> Study as flashcards
          </Link>
          <Link
            {...toolLink("vocabulary-quiz")}
            className="inline-flex items-center gap-1.5 rounded-full border border-border/70 px-3 py-1.5 text-xs font-semibold transition-colors hover:border-honey/60"
          >
            <GraduationCap className="h-3.5 w-3.5" /> Vocabulary quiz
          </Link>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {words.map((w) => (
          <span
            key={w}
            className="group inline-flex items-center gap-1 rounded-xl border border-border/70 bg-secondary/40 py-1.5 pl-3 pr-1.5 text-sm font-medium capitalize"
          >
            <button onClick={() => onPick?.(w)} className="hover:text-honey" title={`Look up “${w}”`}>
              {w}
            </button>
            <button
              onClick={() => speakWord(w)}
              aria-label={`Hear ${w}`}
              className="rounded-full p-1 text-muted-foreground hover:text-honey"
            >
              <Volume2 className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => toggleSavedWord(w)}
              aria-label={`Remove ${w}`}
              className="rounded-full p-1 text-muted-foreground hover:text-destructive"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </span>
        ))}
      </div>
      <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
        <BookOpen className="h-3.5 w-3.5" /> Tip: tap ⭐ next to any word in the solvers or dictionary
        to add it here.
      </p>
    </div>
  );
}
