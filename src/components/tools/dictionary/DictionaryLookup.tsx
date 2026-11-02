import { useState, type ReactNode } from "react";
import { Loader2, Search, Volume2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { lookupWord, firstAudio, WordNotFoundError, type DictionaryEntry } from "@/lib/dictionary";
import { HistoryChips, SaveWordButton, useSolverHistory } from "@/components/tools/SolverExtras";
import { speakWord } from "@/lib/engagement";
import { MyWordList } from "@/components/tools/dictionary/MyWordList";

type Props = {
  /** Field label shown above the input. */
  label: string;
  /** Placeholder example word. */
  placeholder: string;
  /** Helper text under the search row. */
  hint: string;
  /** Button label. */
  action: string;
  /** Renders the results once a word is looked up. */
  children: (entries: DictionaryEntry[], term: string) => ReactNode;
  /** Show a "Hear it" pronunciation button when audio is available. */
  showAudio?: boolean;
};

/**
 * Reusable search box + lookup lifecycle shared by every dictionary tool.
 * Handles loading, not-found and network errors, then hands the entries to
 * a render-prop so each tool can present the data its own way.
 */
export function DictionaryLookup({
  label,
  placeholder,
  hint,
  action,
  children,
  showAudio = true,
}: Props) {
  const history = useSolverHistory("dictionary");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [entries, setEntries] = useState<DictionaryEntry[] | null>(null);
  const [term, setTerm] = useState("");

  const run = async (override?: string) => {
    const word = (override ?? query).trim();
    if (!word) {
      toast.error("Enter a word to look up.");
      return;
    }
    if (/\s/.test(word)) {
      toast.error("Please enter a single word.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await lookupWord(word);
      setEntries(data);
      setTerm(word);
      history.add(word.toLowerCase());
    } catch (e) {
      if (e instanceof WordNotFoundError) {
        setError(`No dictionary entry found for "${word}". Check the spelling and try again.`);
      } else {
        setError(
          "Couldn't reach the dictionary service. Please check your connection and try again.",
        );
      }
      setEntries(null);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setQuery("");
    setEntries(null);
    setError(null);
    setTerm("");
  };

  const playAudio = () => {
    if (!entries) return;
    const url = firstAudio(entries);
    if (url) {
      new Audio(url).play().catch(() => speakWord(term));
    } else {
      // No recorded audio for this word — fall back to speech synthesis so
      // "Hear it" always works.
      speakWord(term);
    }
  };

  return (
    <div>
    <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-lift sm:p-7">
      <div className="space-y-1.5">
        <Label htmlFor="dict-query" className="text-xs font-semibold text-muted-foreground">
          {label}
        </Label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            id="dict-query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && run()}
            placeholder={placeholder}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="rounded-xl sm:h-12 sm:text-base"
          />
          <Button
            onClick={run}
            disabled={loading}
            className="h-12 shrink-0 rounded-2xl px-8 text-base font-semibold"
          >
            {loading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Search className="mr-2 h-5 w-5" />
            )}
            {action}
          </Button>
        </div>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">{hint}</p>

      <HistoryChips
        items={history.items}
        onPick={(w) => {
          setQuery(w);
          void run(w);
        }}
        onClear={history.clear}
      />

      {error && (
        <p className="mt-4 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      {entries && (
        <div className="mt-7 border-t border-border/60 pt-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-2xl font-semibold capitalize">{term}</h2>
            <div className="flex items-center gap-2">
              {showAudio && (
                <Button variant="secondary" size="sm" onClick={playAudio} className="rounded-full">
                  <Volume2 className="mr-1.5 h-4 w-4" /> Hear it
                </Button>
              )}
              <SaveWordButton word={term} className="h-8 w-8 border border-border/60" />
              <Button variant="ghost" size="sm" onClick={reset} className="rounded-full">
                <X className="mr-1.5 h-4 w-4" /> Clear
              </Button>
            </div>
          </div>
          {children(entries, term)}
        </div>
      )}
    </div>
    <MyWordList
      onPick={(w) => {
        setQuery(w);
        void run(w);
      }}
    />
    </div>
  );
}
