import { useMemo, useState } from "react";
import { Copy, Download, Eraser } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { copyText, downloadText } from "@/lib/engagement";

const MAX_INPUT = 5000;

const VARIANTS: { id: string; label: string; hint: string; mark: string }[] = [
  { id: "strikethrough", label: "Strikethrough", hint: "s̶t̶r̶i̶k̶e̶ — combining long stroke overlay (U+0336)", mark: "̶" },
  { id: "underline", label: "Underline", hint: "u̲n̲d̲e̲r̲l̲i̲n̲e̲ — combining low line (U+0332)", mark: "̲" },
  { id: "double-underline", label: "Double Underline", hint: "d̳o̳u̳b̳l̳e̳ — combining double low line (U+0333)", mark: "̳" },
  { id: "slash", label: "Slash", hint: "s̷l̷a̷s̷h̷ — combining short solidus overlay (U+0337)", mark: "̷" },
];

function applyMark(text: string, mark: string): string {
  let out = "";
  for (const ch of text) {
    out += ch;
    if (!/\s/.test(ch)) out += mark;
  }
  return out;
}

export function StrikethroughTextGenerator() {
  const [text, setText] = useState("");

  const outputs = useMemo(
    () => VARIANTS.map((v) => ({ ...v, output: text ? applyMark(text, v.mark) : "" })),
    [text],
  );

  const onCopy = async (label: string, value: string) => {
    if (!value) return;
    const ok = await copyText(value);
    if (ok) toast.success(`${label} text copied`);
    else toast.error("Copy failed — select the text and copy manually");
  };

  return (
    <div className="space-y-5">
      <div>
        <Label htmlFor="strike-input">
          Your text{` — ${text.length.toLocaleString()} / ${MAX_INPUT.toLocaleString()} characters`}
        </Label>
        <Textarea
          id="strike-input"
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, MAX_INPUT))}
          placeholder="Type something — e.g. this is crossed out"
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
        {outputs.map((variant) => (
          <div key={variant.id} className="rounded-lg border p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-medium">{variant.label}</p>
                <p className="text-xs text-muted-foreground">{variant.hint}</p>
              </div>
              <div className="flex gap-1.5">
                <Button type="button" size="sm" variant="outline" onClick={() => onCopy(variant.label, variant.output)} disabled={!variant.output}>
                  <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={!variant.output}
                  onClick={() => downloadText(`${variant.id}-text.txt`, variant.output)}
                >
                  <Download className="mr-1.5 h-3.5 w-3.5" /> .txt
                </Button>
              </div>
            </div>
            <p className="mt-2 break-words text-lg leading-relaxed">
              {variant.output || <span className="text-sm text-muted-foreground">Type above to see this style…</span>}
            </p>
            {variant.output && (
              <p className="mt-1 text-xs text-muted-foreground">{variant.output.length.toLocaleString()} characters</p>
            )}
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        Each style adds an invisible Unicode combining mark after every letter, so the line, slash
        or underline travels with the text into any app — no formatting toolbar needed. Spaces are
        left unmarked so words stay readable.
      </p>
    </div>
  );
}
