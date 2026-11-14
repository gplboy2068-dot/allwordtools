import { useMemo, useState } from "react";
import { Copy, Download, Eraser } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { copyText, downloadText } from "@/lib/engagement";

const MAX_INPUT = 5000;

// Superscript / modifier-letter glyphs. Unicode has no superscript "q" or "y"-style
// small capital for every letter, so q uses ᑫ (Canadian Aboriginal syllabic, the
// standard stand-in used by small-text tools) and the rest use modifier letters.
const SMALL_MAP: Record<string, string> = {
  a: "ᵃ",
  b: "ᵇ",
  c: "ᶜ",
  d: "ᵈ",
  e: "ᵉ",
  f: "ᶠ",
  g: "ᵍ",
  h: "ʰ",
  i: "ⁱ",
  j: "ʲ",
  k: "ᵏ",
  l: "ˡ",
  m: "ᵐ",
  n: "ⁿ",
  o: "ᵒ",
  p: "ᵖ",
  q: "ᑫ",
  r: "ʳ",
  s: "ˢ",
  t: "ᵗ",
  u: "ᵘ",
  v: "ᵛ",
  w: "ʷ",
  x: "ˣ",
  y: "ʸ",
  z: "ᶻ",
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
  "+": "⁺",
  "-": "⁻",
  "=": "⁼",
  "(": "⁽",
  ")": "⁾",
};

function toSmallText(text: string): string {
  let out = "";
  for (const ch of text) {
    out += SMALL_MAP[ch] ?? SMALL_MAP[ch.toLowerCase()] ?? ch;
  }
  return out;
}

export function SmallTextGenerator() {
  const [text, setText] = useState("");

  const output = useMemo(() => (text ? toSmallText(text) : ""), [text]);

  const onCopy = async () => {
    if (!output) return;
    const ok = await copyText(output);
    if (ok) toast.success("Small text copied");
    else toast.error("Copy failed — select the output and copy manually");
  };

  return (
    <div className="space-y-5">
      <div>
        <Label htmlFor="small-input">
          Your text{` — ${text.length.toLocaleString()} / ${MAX_INPUT.toLocaleString()} characters`}
        </Label>
        <Textarea
          id="small-input"
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, MAX_INPUT))}
          placeholder="Type something — e.g. tiny but mighty"
          rows={3}
          className="mt-1.5"
        />
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Label>Small text{output ? ` — ${output.length.toLocaleString()} characters` : ""}</Label>
          <div className="flex gap-1.5">
            <Button type="button" size="sm" variant="outline" onClick={onCopy} disabled={!output}>
              <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={!output}
              onClick={() => downloadText("small-text.txt", output)}
            >
              <Download className="mr-1.5 h-3.5 w-3.5" /> .txt
            </Button>
            <Button type="button" size="sm" variant="ghost" onClick={() => setText("")}>
              <Eraser className="mr-1.5 h-3.5 w-3.5" /> Clear
            </Button>
          </div>
        </div>
        <div className="mt-1.5 min-h-[110px] whitespace-pre-wrap break-words rounded-md border bg-muted/30 px-3 py-3 text-xl leading-relaxed">
          {output || <span className="text-sm text-muted-foreground">ʸᵒᵘʳ ˢᵐᵃˡˡ ᵗᵉˣᵗ ʷᶦˡˡ ᵃᵖᵖᵉᵃʳ ʰᵉʳᵉ…</span>}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Small text uses Unicode superscript and modifier letters, so it stays tiny everywhere you
          paste it — Instagram bios, Discord, TikTok, WhatsApp. Capital letters are converted to the
          same small forms, because Unicode has no capital superscripts, and punctuation is left
          unchanged. If a glyph looks boxy on a very old device, that device&apos;s font simply
          doesn&apos;t include it.
        </p>
      </div>
    </div>
  );
}
