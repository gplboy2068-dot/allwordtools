import { useMemo, useState } from "react";
import { Copy, Download, Eraser } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { copyText, downloadText } from "@/lib/engagement";

const MAX_INPUT = 5000;

// Best-available mirrored glyph for each character. True mirror glyphs don't
// exist in Unicode for every letter, so unmatched characters are kept as-is.
const MIRROR_MAP: Record<string, string> = {
  a: "ɒ",
  b: "d",
  c: "ɔ",
  d: "b",
  e: "ɘ",
  f: "ꟻ",
  k: "ʞ",
  p: "q",
  q: "p",
  r: "ɿ",
  s: "ꙅ",
  A: "∀",
  B: "ᙠ",
  C: "Ↄ",
  D: "ᗡ",
  E: "Ǝ",
  F: "ꟻ",
  G: "⅁",
  J: "Ʇ",
  K: "ʞ",
  L: "⅃",
  N: "И",
  P: "ꟼ",
  R: "Я",
  S: "Ꙅ",
  T: "⊥",
  U: "∩",
  V: "⋁",
  W: "M",
  Y: "⅄",
  Z: "Ƨ",
  "3": "Ɛ",
  "6": "9",
  "9": "6",
  "(": ")",
  ")": "(",
  "[": "]",
  "]": "[",
  "{": "}",
  "}": "{",
  "<": ">",
  ">": "<",
  "/": "\\",
  "\\": "/",
};

function reverseText(text: string): string {
  return [...text].reverse().join("");
}

function mirrorText(text: string): string {
  let out = "";
  for (const ch of [...text].reverse()) {
    out += MIRROR_MAP[ch] ?? ch;
  }
  return out;
}

export function MirrorTextGenerator() {
  const [text, setText] = useState("");

  const reversed = useMemo(() => (text ? reverseText(text) : ""), [text]);
  const mirrored = useMemo(() => (text ? mirrorText(text) : ""), [text]);

  const onCopy = async (label: string, value: string) => {
    if (!value) return;
    const ok = await copyText(value);
    if (ok) toast.success(`${label} copied`);
    else toast.error("Copy failed — select the output and copy manually");
  };

  const outputs = [
    {
      id: "reversed",
      label: "Reversed Text",
      hint: "Characters in reverse order — reads backwards",
      value: reversed,
      filename: "reversed-text.txt",
    },
    {
      id: "mirrored",
      label: "Mirrored Text",
      hint: "Reversed + mirrored glyphs — looks like mirror writing",
      value: mirrored,
      filename: "mirrored-text.txt",
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <Label htmlFor="mirror-input">
          Your text{` — ${text.length.toLocaleString()} / ${MAX_INPUT.toLocaleString()} characters`}
        </Label>
        <Textarea
          id="mirror-input"
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, MAX_INPUT))}
          placeholder="Type something — e.g. Hello World"
          rows={3}
          className="mt-1.5"
        />
        <div className="mt-2 flex justify-end">
          <Button type="button" size="sm" variant="ghost" onClick={() => setText("")}>
            <Eraser className="mr-1.5 h-3.5 w-3.5" /> Clear
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {outputs.map((out) => (
          <div key={out.id} className="rounded-lg border p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-medium">{out.label}</p>
                <p className="text-xs text-muted-foreground">{out.hint}</p>
              </div>
              <div className="flex gap-1.5">
                <Button type="button" size="sm" variant="outline" onClick={() => onCopy(out.label, out.value)} disabled={!out.value}>
                  <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={!out.value}
                  onClick={() => downloadText(out.filename, out.value)}
                >
                  <Download className="mr-1.5 h-3.5 w-3.5" /> .txt
                </Button>
              </div>
            </div>
            <p className="mt-2 break-words text-lg leading-relaxed">
              {out.value || <span className="text-sm text-muted-foreground">Type above to see this output…</span>}
            </p>
            {out.value && (
              <p className="mt-1 text-xs text-muted-foreground">{out.value.length.toLocaleString()} characters</p>
            )}
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        Note: true mirror glyphs don&apos;t exist in Unicode for every letter — b/d and p/q swap
        cleanly, but letters like g, h, m and o have no mirrored form, so they are kept as-is.
        The result is plain text and pastes anywhere.
      </p>
    </div>
  );
}
