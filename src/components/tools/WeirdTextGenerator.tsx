import { useMemo, useState } from "react";
import { Copy, Download, Eraser } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { copyText, downloadText } from "@/lib/engagement";

const MAX_INPUT = 5000;

function buildMap(
  upperStart: number,
  lowerStart: number,
  digitStart: number | null,
  upperOverrides: Record<string, string> = {},
  lowerOverrides: Record<string, string> = {},
): Record<string, string> {
  const map: Record<string, string> = {};
  for (let i = 0; i < 26; i++) {
    const up = String.fromCharCode(65 + i);
    const low = String.fromCharCode(97 + i);
    map[up] = upperOverrides[up] ?? String.fromCodePoint(upperStart + i);
    map[low] = lowerOverrides[low] ?? String.fromCodePoint(lowerStart + i);
  }
  if (digitStart !== null) {
    for (let i = 0; i < 10; i++) {
      map[String(i)] = String.fromCodePoint(digitStart + i);
    }
  }
  return map;
}

// Mathematical Fraktur (blackletter). C, H, I, R, Z live in the Letterlike Symbols block.
const GOTHIC_MAP = buildMap(0x1d504, 0x1d51e, null, {
  C: "ℭ",
  H: "ℌ",
  I: "ℑ",
  R: "ℜ",
  Z: "ℨ",
});

// Mathematical double-struck. C, H, N, P, Q, R, Z live in the Letterlike Symbols block.
const DOUBLE_STRUCK_MAP = buildMap(0x1d538, 0x1d552, 0x1d7d8, {
  C: "ℂ",
  H: "ℍ",
  N: "ℕ",
  P: "ℙ",
  Q: "ℚ",
  R: "ℝ",
  Z: "ℤ",
});

// Mathematical monospace — full a–z, A–Z, 0–9 coverage.
const MONOSPACE_MAP = buildMap(0x1d670, 0x1d68a, 0x1d7f6);

function mapText(text: string, map: Record<string, string>): string {
  let out = "";
  for (const ch of text) out += map[ch] ?? ch;
  return out;
}

function alternatingCase(text: string): string {
  let upper = false;
  let out = "";
  for (const ch of text) {
    if (/[a-zA-Z]/.test(ch)) {
      out += upper ? ch.toUpperCase() : ch.toLowerCase();
      upper = !upper;
    } else {
      out += ch;
    }
  }
  return out;
}

function spacedOut(text: string): string {
  return text
    .split("\n")
    .map((line) =>
      line
        .split(" ")
        .map((word) => [...word].join(" "))
        .join("   "),
    )
    .join("\n");
}

function clapText(text: string): string {
  return text
    .split("\n")
    .map((line) => line.trim().split(/\s+/).filter(Boolean).join("👏"))
    .join("\n");
}

const STYLES: { id: string; label: string; hint: string; transform: (text: string) => string }[] = [
  { id: "alternating", label: "Alternating Case", hint: "sPoNgEbOb style", transform: alternatingCase },
  { id: "spaced", label: "Spaced Out", hint: "w e i r d", transform: spacedOut },
  { id: "clap", label: "Clap Text", hint: "word👏word", transform: clapText },
  { id: "gothic", label: "Gothic / Old English", hint: "𝔘𝔫𝔦𝔠𝔬𝔡𝔢 blackletter", transform: (t) => mapText(t, GOTHIC_MAP) },
  { id: "double-struck", label: "Double-Struck", hint: "𝕕𝕠𝕦𝕓𝕝𝕖-𝕤𝕥𝕣𝕦𝕔𝕜", transform: (t) => mapText(t, DOUBLE_STRUCK_MAP) },
  { id: "monospace", label: "Monospace", hint: "𝚖𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎", transform: (t) => mapText(t, MONOSPACE_MAP) },
];

export function WeirdTextGenerator() {
  const [text, setText] = useState("");

  const outputs = useMemo(() => STYLES.map((s) => ({ ...s, output: text ? s.transform(text) : "" })), [text]);

  const onCopy = async (label: string, value: string) => {
    if (!value) return;
    const ok = await copyText(value);
    if (ok) toast.success(`${label} copied`);
    else toast.error("Copy failed — select the text and copy manually");
  };

  return (
    <div className="space-y-5">
      <div>
        <Label htmlFor="weird-input">
          Your text{` — ${text.length.toLocaleString()} / ${MAX_INPUT.toLocaleString()} characters`}
        </Label>
        <Textarea
          id="weird-input"
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, MAX_INPUT))}
          placeholder="Type something — e.g. weird text generator"
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
        {outputs.map((style) => (
          <div key={style.id} className="rounded-lg border p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-medium">{style.label}</p>
                <p className="text-xs text-muted-foreground">{style.hint}</p>
              </div>
              <div className="flex gap-1.5">
                <Button type="button" size="sm" variant="outline" onClick={() => onCopy(style.label, style.output)} disabled={!style.output}>
                  <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={!style.output}
                  onClick={() => downloadText(`${style.id}-text.txt`, style.output)}
                >
                  <Download className="mr-1.5 h-3.5 w-3.5" /> .txt
                </Button>
              </div>
            </div>
            <p className="mt-2 break-words text-lg leading-relaxed">
              {style.output || <span className="text-sm text-muted-foreground">Type above to see this style…</span>}
            </p>
            {style.output && (
              <p className="mt-1 text-xs text-muted-foreground">{style.output.length.toLocaleString()} characters</p>
            )}
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        All six styles are plain Unicode text — they paste into Instagram, TikTok, Discord, WhatsApp
        and anywhere else text works, with no app to install. Punctuation and symbols are left
        unchanged.
      </p>
    </div>
  );
}
