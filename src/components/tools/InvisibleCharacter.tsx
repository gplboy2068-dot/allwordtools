import { useMemo, useState } from "react";
import { ClipboardCopy, Copy, Eraser } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { copyText } from "@/lib/engagement";

type InvisibleChar = {
  char: string;
  codepoint: string;
  name: string;
  description: string;
  commonUse: string;
};

const INVISIBLE_CHARS: InvisibleChar[] = [
  {
    char: "\u200B",
    codepoint: "U+200B",
    name: "Zero Width Space",
    description: "An invisible space with no width. Allows a line break at its position without showing any gap.",
    commonUse: "Line-break hints, invisible separators",
  },
  {
    char: "\u200C",
    codepoint: "U+200C",
    name: "Zero Width Non-Joiner",
    description: "Prevents two characters from joining into a ligature. Invisible on its own.",
    commonUse: "Typography control, blank text",
  },
  {
    char: "\u200D",
    codepoint: "U+200D",
    name: "Zero Width Joiner",
    description: "Joins characters together — it is what combines emoji into single pictures like family or profession emoji.",
    commonUse: "Emoji sequences, blank text",
  },
  {
    char: "\uFEFF",
    codepoint: "U+FEFF",
    name: "Zero Width No-Break Space",
    description: "Also known as the byte order mark. Invisible and prevents a line break at its position.",
    commonUse: "Invisible filler, blank messages",
  },
  {
    char: "\u2800",
    codepoint: "U+2800",
    name: "Braille Pattern Blank",
    description: "A blank braille cell. It counts as a visible character in most apps, which is why it works for blank names and messages.",
    commonUse: "Blank names, empty messages, spacing",
  },
  {
    char: "\u3164",
    codepoint: "U+3164",
    name: "Hangul Filler",
    description: "A Korean filler character that renders as blank space and is accepted as text by many apps and games.",
    commonUse: "Blank usernames, invisible text",
  },
  {
    char: "\u00A0",
    codepoint: "U+00A0",
    name: "No-Break Space",
    description: "A space that never allows a line break. Looks like a normal space but keeps words glued together.",
    commonUse: "Keeping names and numbers on one line",
  },
  {
    char: "\u2060",
    codepoint: "U+2060",
    name: "Word Joiner",
    description: "An invisible character that prevents line breaks, similar to a zero-width no-break space.",
    commonUse: "Invisible filler, word joining",
  },
];

const BLANK_TEXT = "\u2800";
const KNOWN_SET = new Set(INVISIBLE_CHARS.map((c) => c.char));

export function InvisibleCharacter() {
  const [tester, setTester] = useState("");

  const stats = useMemo(() => {
    const chars = [...tester];
    const invisibleCount = chars.filter((c) => KNOWN_SET.has(c)).length;
    return { total: chars.length, invisible: invisibleCount };
  }, [tester]);

  const copyChar = async (item: InvisibleChar) => {
    const ok = await copyText(item.char);
    if (ok) toast.success(`Copied ${item.name} (${item.codepoint})`);
    else toast.error("Copy failed — copy failed, try again");
  };

  const copyBlank = async () => {
    const ok = await copyText(BLANK_TEXT);
    if (ok) toast.success("Blank text copied — paste it anywhere");
    else toast.error("Copy failed — copy failed, try again");
  };

  return (
    <div className="space-y-5">
      <div className="rounded-lg border p-4 text-center">
        <p className="text-sm text-muted-foreground">
          The most reliable blank character for names and messages is the Braille Pattern Blank (U+2800).
        </p>
        <Button type="button" size="lg" className="mt-3" onClick={copyBlank}>
          <ClipboardCopy className="mr-2 h-4 w-4" /> Copy Blank Text
        </Button>
        <p className="mt-2 text-xs text-muted-foreground">
          One tap copies an invisible character to your clipboard — paste it wherever you need blank text.
        </p>
      </div>

      <div>
        <Label>All invisible characters</Label>
        <div className="mt-1.5 grid gap-3 sm:grid-cols-2">
          {INVISIBLE_CHARS.map((item) => (
            <article key={item.codepoint} className="rounded-lg border p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-dashed bg-muted/50 font-mono text-sm text-muted-foreground"
                  >
                    ∅
                  </span>
                  <div>
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="font-mono text-xs text-muted-foreground">{item.codepoint}</p>
                  </div>
                </div>
                <Button type="button" size="sm" variant="outline" onClick={() => void copyChar(item)}>
                  <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy
                </Button>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              <p className="mt-1.5 text-xs">
                <span className="font-medium">Commonly used for: </span>
                {item.commonUse}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Label htmlFor="ic-tester">
            Tester — paste text to check it
            {tester
              ? ` — ${stats.total.toLocaleString()} characters · invisible characters detected: ${stats.invisible}`
              : ""}
          </Label>
          <Button type="button" size="sm" variant="ghost" onClick={() => setTester("")}>
            <Eraser className="mr-1.5 h-3.5 w-3.5" /> Clear
          </Button>
        </div>
        <Textarea
          id="ic-tester"
          value={tester}
          onChange={(e) => setTester(e.target.value)}
          rows={4}
          placeholder="Paste any text here — the counter shows how many invisible characters from the list above it contains…"
          className="mt-1.5"
        />
        {tester && stats.invisible > 0 && (
          <p className="mt-1.5 text-xs text-muted-foreground">
            Found {stats.invisible} invisible character{stats.invisible === 1 ? "" : "s"} from the known set above.
          </p>
        )}
      </div>

      <p className="rounded-lg border bg-muted/50 p-3 text-xs text-muted-foreground">
        Blank text is for fun and testing — blank display names, spacing tricks and checking how apps handle empty
        input. Please don&apos;t use invisible characters to evade filters, impersonate others or spam. This tool only
        copies characters to your clipboard; it never sends anything anywhere.
      </p>
    </div>
  );
}
