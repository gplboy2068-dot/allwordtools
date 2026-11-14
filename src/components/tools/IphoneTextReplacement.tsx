import { useEffect, useState } from "react";
import { Copy, Download, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { copyText, downloadText } from "@/lib/engagement";

type Pair = { id: number; phrase: string; shortcut: string };

const STORAGE_KEY = "awt-text-replacement-list";

const STARTER_PAIRS: { phrase: string; shortcut: string }[] = [
  { phrase: "On my way!", shortcut: "omw" },
  { phrase: "Let me check and get back to you.", shortcut: "lmc" },
  { phrase: "Sorry for the late reply!", shortcut: "srry" },
  { phrase: "Thank you so much!", shortcut: "tysm" },
  { phrase: "Running a few minutes late.", shortcut: "late5" },
  { phrase: "Can we reschedule to tomorrow?", shortcut: "resked" },
];

const SETUP_STEPS = [
  "On your iPhone, open Settings → General → Keyboard.",
  "Tap Text Replacement, then tap the + button in the top-right corner.",
  "In the Phrase field, paste or type the full phrase (for example, “On my way!”).",
  "In the Shortcut field, type the short code you want to trigger it (for example, “omw”).",
  "Tap Save. Repeat for each pair in your list.",
  "Now, whenever you type the shortcut anywhere on your iPhone, iOS offers the full phrase — tap it (or the space bar) to expand it.",
];

function withIds(pairs: { phrase: string; shortcut: string }[]): Pair[] {
  return pairs.map((p, i) => ({ id: Date.now() + i, phrase: p.phrase, shortcut: p.shortcut }));
}

export function IphoneTextReplacement() {
  const [pairs, setPairs] = useState<Pair[]>(() => withIds(STARTER_PAIRS));
  const [phrase, setPhrase] = useState("");
  const [shortcut, setShortcut] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPairs(
            parsed
              .filter((p) => p && typeof p.phrase === "string" && typeof p.shortcut === "string")
              .map((p, i: number) => ({ id: typeof p.id === "number" ? p.id : Date.now() + i, phrase: p.phrase, shortcut: p.shortcut })),
          );
        }
      }
    } catch {
      // storage unavailable — keep the starter pairs
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(pairs));
    } catch {
      // ignore storage errors
    }
  }, [pairs, loaded]);

  const listText = pairs.map((p) => `${p.shortcut} → ${p.phrase}`).join("\n");

  const onAdd = () => {
    const cleanPhrase = phrase.trim();
    const cleanShortcut = shortcut.trim();
    if (!cleanPhrase || !cleanShortcut) {
      toast.error("Add both a phrase and a shortcut");
      return;
    }
    if (pairs.some((p) => p.shortcut.toLowerCase() === cleanShortcut.toLowerCase())) {
      toast.error(`Shortcut “${cleanShortcut}” is already in your list`);
      return;
    }
    setPairs((prev) => [...prev, { id: Date.now(), phrase: cleanPhrase, shortcut: cleanShortcut }]);
    setPhrase("");
    setShortcut("");
  };

  const onRemove = (id: number) => {
    setPairs((prev) => prev.filter((p) => p.id !== id));
  };

  const onCopyList = async () => {
    if (pairs.length === 0) return;
    const ok = await copyText(listText);
    if (ok) toast.success("Shortcut list copied");
    else toast.error("Copy failed — select the list and copy manually");
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="itr-phrase">Phrase (the full text)</Label>
          <Input
            id="itr-phrase"
            value={phrase}
            onChange={(e) => setPhrase(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onAdd()}
            placeholder="e.g. On my way!"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="itr-shortcut">Shortcut (the short code)</Label>
          <Input
            id="itr-shortcut"
            value={shortcut}
            onChange={(e) => setShortcut(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onAdd()}
            placeholder="e.g. omw"
            className="mt-1.5"
          />
        </div>
      </div>
      <Button type="button" onClick={onAdd} disabled={!phrase.trim() || !shortcut.trim()}>
        <Plus className="mr-1.5 h-4 w-4" /> Add shortcut
      </Button>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Label>Your shortcut list ({pairs.length})</Label>
          <div className="flex gap-1.5">
            <Button type="button" size="sm" variant="outline" onClick={onCopyList} disabled={pairs.length === 0}>
              <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy list
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={pairs.length === 0}
              onClick={() => downloadText("iphone-text-replacements.txt", listText)}
            >
              <Download className="mr-1.5 h-3.5 w-3.5" /> .txt
            </Button>
          </div>
        </div>

        {pairs.length === 0 ? (
          <p className="mt-1.5 rounded-lg border border-dashed py-6 text-center text-sm text-muted-foreground">
            Your list is empty — add a phrase and shortcut above to get started.
          </p>
        ) : (
          <ul className="mt-1.5 divide-y rounded-lg border">
            {pairs.map((p) => (
              <li key={p.id} className="flex items-center gap-3 px-3 py-2.5">
                <span className="min-w-0 flex-1 truncate text-sm">
                  <span className="font-mono font-semibold">{p.shortcut}</span>
                  <span className="mx-2 text-muted-foreground">→</span>
                  <span>{p.phrase}</span>
                </span>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 shrink-0 p-0 text-muted-foreground hover:text-destructive"
                  onClick={() => onRemove(p.id)}
                  aria-label={`Remove shortcut ${p.shortcut}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        )}

        <Textarea value={listText} readOnly rows={Math.min(8, Math.max(3, pairs.length))} className="mt-3 font-mono text-sm" aria-label="Shortcut list preview" />
        <p className="mt-2 text-xs text-muted-foreground">
          Your list is saved in this browser automatically, so it is still here when you come back.
        </p>
      </div>

      <div className="rounded-xl border bg-muted/40 p-4">
        <h3 className="text-sm font-semibold">How to add these on your iPhone</h3>
        <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed">
          {SETUP_STEPS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>

      <p className="text-xs text-muted-foreground">
        Honest note: iOS does not let any website import text-replacement shortcuts directly — Apple requires each one to be entered in Settings by hand. This tool prepares your list and the exact steps, so adding them takes a minute instead of a guessing game. Your shortcuts also sync to your other Apple devices signed in to the same iCloud account.
      </p>
    </div>
  );
}
