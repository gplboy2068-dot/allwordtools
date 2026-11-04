import { useMemo, useState } from "react";
import { Copy, Download, Eraser } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { copyText, downloadText } from "@/lib/engagement";

const PRESETS = [10, 100, 500, 1000, 5000, 10000];
const MAX_REPEATS = 10000;
const MAX_OUTPUT = 1000000;

type SepKind = "space" | "newline" | "comma" | "none" | "custom";

const SEPS: { id: SepKind; label: string; value: string }[] = [
  { id: "space", label: "Space", value: " " },
  { id: "newline", label: "New line", value: "\n" },
  { id: "comma", label: "Comma", value: ", " },
  { id: "none", label: "Nothing", value: "" },
  { id: "custom", label: "Custom", value: "" },
];

export function TextRepeater() {
  const [text, setText] = useState("");
  const [count, setCount] = useState(100);
  const [sepKind, setSepKind] = useState<SepKind>("newline");
  const [customSep, setCustomSep] = useState(" ❤ ");
  const [numbered, setNumbered] = useState(false);

  const sep = sepKind === "custom" ? customSep : (SEPS.find((s) => s.id === sepKind)?.value ?? " ");

  const { output, effectiveCount, capped } = useMemo(() => {
    const unit = text.trim();
    if (!unit) return { output: "", effectiveCount: 0, capped: false };
    const safeCount = Math.max(1, Math.min(MAX_REPEATS, Math.floor(count) || 1));
    const parts: string[] = [];
    let total = 0;
    let used = 0;
    for (let i = 1; i <= safeCount; i++) {
      const piece = numbered ? `${i}. ${unit}` : unit;
      const add = piece.length + (i > 1 ? sep.length : 0);
      if (total + add > MAX_OUTPUT) break;
      parts.push(piece);
      total += add;
      used = i;
    }
    return { output: parts.join(sep), effectiveCount: used, capped: used < safeCount };
  }, [text, count, sep, numbered]);

  const outChars = output.length;
  const outWords = output ? output.split(/\s+/).filter(Boolean).length : 0;

  const onCopy = async () => {
    if (!output) return;
    const ok = await copyText(output);
    if (ok) toast.success("Repeated text copied");
    else toast.error("Copy failed — select the output and copy manually");
  };

  return (
    <div className="space-y-5">
      <div>
        <Label htmlFor="tr-input">Text to repeat</Label>
        <Textarea
          id="tr-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a word, sentence or emoji — e.g. Happy Birthday 🎂"
          rows={3}
          className="mt-1.5"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="tr-count">Repeat how many times?</Label>
          <Input
            id="tr-count"
            type="number"
            min={1}
            max={MAX_REPEATS}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="mt-1.5"
          />
          <div className="mt-2 flex flex-wrap gap-1.5">
            {PRESETS.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setCount(n)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  count === n ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                {n.toLocaleString()}×
              </button>
            ))}
          </div>
        </div>
        <div>
          <Label>Separate repeats with</Label>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {SEPS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSepKind(s.id)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  sepKind === s.id ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          {sepKind === "custom" && (
            <Input
              value={customSep}
              onChange={(e) => setCustomSep(e.target.value)}
              placeholder="Your separator, e.g. ❤ or |"
              className="mt-2"
            />
          )}
          <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={numbered}
              onChange={(e) => setNumbered(e.target.checked)}
              className="h-4 w-4 rounded border"
            />
            Add numbers (1. 2. 3. …)
          </label>
        </div>
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Label htmlFor="tr-output">
            Your repeated text{output ? ` — ${effectiveCount.toLocaleString()} repeats · ${outChars.toLocaleString()} characters · ${outWords.toLocaleString()} words` : ""}
          </Label>
          <div className="flex gap-1.5">
            <Button type="button" size="sm" variant="outline" onClick={onCopy} disabled={!output}>
              <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={!output}
              onClick={() => downloadText("repeated-text.txt", output)}
            >
              <Download className="mr-1.5 h-3.5 w-3.5" /> .txt
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => {
                setText("");
              }}
            >
              <Eraser className="mr-1.5 h-3.5 w-3.5" /> Clear
            </Button>
          </div>
        </div>
        <Textarea
          id="tr-output"
          value={output}
          readOnly
          rows={8}
          placeholder="Your repeated text will appear here…"
          className="mt-1.5 font-mono text-sm"
        />
        {capped && (
          <p className="mt-1.5 text-xs text-muted-foreground">
            Output was capped at 1,000,000 characters for your browser — {effectiveCount.toLocaleString()} repeats shown.
          </p>
        )}
        <p className="mt-2 text-xs text-muted-foreground">
          Made for fun messages, emphasis, design filler and testing — please don&apos;t use it to spam or harass anyone.
        </p>
      </div>
    </div>
  );
}
