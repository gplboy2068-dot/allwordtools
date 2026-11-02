import { useMemo, useState } from "react";
import { Copy, Download, Eraser } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { copyText, downloadText } from "@/lib/engagement";

type CaseKind = "upper" | "lower" | "title" | "sentence" | "capitalized" | "alternating" | "inverse";

const CASES: { id: CaseKind; label: string; hint: string }[] = [
  { id: "upper", label: "UPPERCASE", hint: "Every letter in capitals" },
  { id: "lower", label: "lowercase", hint: "Every letter small" },
  { id: "title", label: "Title Case", hint: "Every Word Capitalised" },
  { id: "sentence", label: "Sentence case", hint: "First letter of each sentence capitalised" },
  { id: "capitalized", label: "Capitalize Each Word", hint: "Like Title Case but for every word incl. small ones" },
  { id: "alternating", label: "aLtErNaTiNg", hint: "Alternating caps (mocking / playful style)" },
  { id: "inverse", label: "iNVERSE", hint: "Swap the case of every letter" },
];

function convert(text: string, kind: CaseKind): string {
  switch (kind) {
    case "upper":
      return text.toUpperCase();
    case "lower":
      return text.toLowerCase();
    case "title": {
      const small = new Set(["a", "an", "the", "and", "but", "or", "for", "nor", "on", "at", "to", "by", "in", "of", "up", "as"]);
      return text.toLowerCase().replace(/\b\w+\b/g, (w, offset: number) => {
        const isFirst = offset === 0;
        if (!isFirst && small.has(w)) return w;
        return w.charAt(0).toUpperCase() + w.slice(1);
      });
    }
    case "capitalized":
      return text.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
    case "sentence":
      return text
        .toLowerCase()
        .replace(/(^\s*[a-z])|([.!?]\s*[a-z])/g, (m) => m.toUpperCase());
    case "alternating": {
      let up = false;
      return text.replace(/[a-zA-Z]/g, (c) => {
        up = !up;
        return up ? c.toUpperCase() : c.toLowerCase();
      });
    }
    case "inverse":
      return text.replace(/[a-zA-Z]/g, (c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()));
  }
}

export function CaseConverter() {
  const [text, setText] = useState("");
  const [kind, setKind] = useState<CaseKind>("title");
  const output = useMemo(() => (text ? convert(text, kind) : ""), [text, kind]);

  return (
    <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-lift sm:p-7">
      <div className="space-y-1.5">
        <Label htmlFor="cc-input" className="text-xs font-semibold text-muted-foreground">
          Your text
        </Label>
        <Textarea
          id="cc-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here, then pick a case below…"
          className="min-h-32 rounded-xl text-base"
          maxLength={20000}
        />
        <p className="text-right text-xs text-muted-foreground">{text.length} characters</p>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {CASES.map((c) => (
          <button
            key={c.id}
            onClick={() => setKind(c.id)}
            title={c.hint}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              kind === c.id
                ? "border-honey bg-honey/15 text-honey"
                : "border-border/70 bg-secondary/40 text-muted-foreground hover:border-honey/50"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-1.5">
        <Label htmlFor="cc-output" className="text-xs font-semibold text-muted-foreground">
          Converted text
        </Label>
        <Textarea
          id="cc-output"
          readOnly
          value={output}
          placeholder="Your converted text will appear here…"
          className="min-h-32 rounded-xl bg-secondary/40 text-base"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          onClick={async () => {
            if (await copyText(output)) toast.success("Converted text copied");
          }}
          disabled={!output}
          className="rounded-full"
        >
          <Copy className="mr-1.5 h-4 w-4" /> Copy result
        </Button>
        <Button
          variant="outline"
          onClick={() => downloadText("converted-text.txt", output)}
          disabled={!output}
          className="rounded-full"
        >
          <Download className="mr-1.5 h-4 w-4" /> Download .txt
        </Button>
        <Button
          variant="ghost"
          onClick={() => setText("")}
          disabled={!text}
          className="rounded-full"
        >
          <Eraser className="mr-1.5 h-4 w-4" /> Clear
        </Button>
      </div>
    </div>
  );
}
