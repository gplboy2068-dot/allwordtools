import { useMemo, useState } from "react";
import { Copy, Download, Eraser, Shuffle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { copyText, downloadText } from "@/lib/engagement";

const MAX_INPUT = 5000;

// Combining diacritical marks (U+0300–U+036F), grouped by where they render.
const UP_MARKS = [
  "̍", "̎", "̄", "̅", "̿", "̑", "̆", "̐", "͒", "͗", "͑", "̇", "̈", "̊",
  "͂", "̓", "͊", "͋", "͌", "̌", "̉", "̏", "͈", "͍", "ͅ", "͐", "̔",
  "͠", "͡", "͛", "̒", "͙", "͚", "̽", "͇", "͉", "̚", "̛",
];
const MID_MARKS = [
  "̕", "̛", "͏", "̜", "̝", "̞", "̟", "̠", "̴", "̵", "̶", "̸", "̹",
  "̺", "̻", "̼", "͆", "͈", "͍", "͗", "͜", "͝", "͞", "͟", "͠", "͡",
  "͢",
];
const DOWN_MARKS = [
  "̖", "̗", "̘", "̙", "̜", "̝", "̞", "̤", "̥", "̦", "̩", "̪", "̫",
  "̬", "̭", "̮", "̯", "̰", "̱", "̲", "̳", "̹", "̺", "̻", "̼", "ͅ",
  "͇", "͈", "͉", "͍", "͎", "͓", "͔", "͕", "͖", "͙", "͚", "͛", "ͣ",
  "ͤ", "ͥ", "ͦ", "ͧ", "ͨ", "ͩ", "ͪ", "ͫ", "ͬ", "ͭ", "ͮ", "ͯ", "̸",
  "̷",
];

type Intensity = "mini" | "medium" | "full" | "insane";

const INTENSITIES: { id: Intensity; label: string; hint: string; min: number; max: number }[] = [
  { id: "mini", label: "Mini", hint: "1–3 marks per letter", min: 1, max: 3 },
  { id: "medium", label: "Medium", hint: "3–6 marks per letter", min: 3, max: 6 },
  { id: "full", label: "Full", hint: "6–12 marks per letter", min: 6, max: 12 },
  { id: "insane", label: "Insane", hint: "12–20 marks per letter", min: 12, max: 20 },
];

function hashSeed(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function ZalgoTextGenerator() {
  const [text, setText] = useState("");
  const [intensity, setIntensity] = useState<Intensity>("medium");
  const [up, setUp] = useState(true);
  const [mid, setMid] = useState(true);
  const [down, setDown] = useState(true);
  const [salt, setSalt] = useState(0);

  const output = useMemo(() => {
    if (!text) return "";
    const level = INTENSITIES.find((l) => l.id === intensity) ?? INTENSITIES[1];
    const pools: string[][] = [];
    if (up) pools.push(UP_MARKS);
    if (mid) pools.push(MID_MARKS);
    if (down) pools.push(DOWN_MARKS);
    if (pools.length === 0) pools.push(UP_MARKS, MID_MARKS, DOWN_MARKS);
    const rng = mulberry32((hashSeed(text) ^ Math.imul(salt + 1, 0x9e3779b9)) >>> 0);
    let out = "";
    for (const ch of text) {
      out += ch;
      if (/\s/.test(ch)) continue;
      const count = level.min + Math.floor(rng() * (level.max - level.min + 1));
      for (let i = 0; i < count; i++) {
        const pool = pools[Math.floor(rng() * pools.length)];
        out += pool[Math.floor(rng() * pool.length)];
      }
    }
    return out;
  }, [text, intensity, up, mid, down, salt]);

  const onCopy = async () => {
    if (!output) return;
    const ok = await copyText(output);
    if (ok) toast.success("Zalgo text copied");
    else toast.error("Copy failed — select the output and copy manually");
  };

  return (
    <div className="space-y-5">
      <div>
        <Label htmlFor="zalgo-input">
          Your text{` — ${text.length.toLocaleString()} / ${MAX_INPUT.toLocaleString()} characters`}
        </Label>
        <Textarea
          id="zalgo-input"
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, MAX_INPUT))}
          placeholder="Type something normal… it won't stay normal. e.g. Hello World"
          rows={3}
          className="mt-1.5"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>Intensity</Label>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {INTENSITIES.map((level) => (
              <button
                key={level.id}
                type="button"
                onClick={() => setIntensity(level.id)}
                title={level.hint}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  intensity === level.id ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {INTENSITIES.find((l) => l.id === intensity)?.hint} — the higher the intensity, the more
            corrupted the text looks.
          </p>
        </div>
        <div>
          <Label>Corrupt where?</Label>
          <div className="mt-1.5 space-y-2">
            {(
              [
                ["Marks above", up, setUp],
                ["Marks through the middle", mid, setMid],
                ["Marks below", down, setDown],
              ] as const
            ).map(([label, checked, setChecked]) => (
              <label key={label} className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                  className="h-4 w-4 rounded border"
                />
                {label}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Label>
            Zalgo output{output ? ` — ${output.length.toLocaleString()} characters` : ""}
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
              onClick={() => downloadText("zalgo-text.txt", output)}
            >
              <Download className="mr-1.5 h-3.5 w-3.5" /> .txt
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={!output}
              onClick={() => setSalt((s) => s + 1)}
            >
              <Shuffle className="mr-1.5 h-3.5 w-3.5" /> Shuffle
            </Button>
            <Button type="button" size="sm" variant="ghost" onClick={() => setText("")}>
              <Eraser className="mr-1.5 h-3.5 w-3.5" /> Clear
            </Button>
          </div>
        </div>
        <div className="mt-1.5 min-h-[120px] whitespace-pre-wrap break-words rounded-md border bg-muted/30 px-3 py-3 text-lg leading-[2.2]">
          {output || <span className="text-sm text-muted-foreground">Your corrupted text will appear here…</span>}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Zalgo text stacks Unicode combining marks on every letter. It pastes into most apps, but
          some (like older email clients) may render it oddly — and very high intensities can look
          messy on small screens, so test before you post.
        </p>
      </div>
    </div>
  );
}
