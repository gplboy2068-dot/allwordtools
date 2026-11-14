import { useMemo, useState } from "react";
import { Copy, Download, Eraser } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { copyText, downloadText } from "@/lib/engagement";

const MAX_INPUT = 5000;

const DECORATION_PREFIX = "｡･:*:･ﾟ★,｡･:*:･ﾟ★ ";
const DECORATION_SUFFIX = " ｡･:*:･ﾟ★,｡･:*:･ﾟ★";

function toFullwidth(text: string): string {
  let out = "";
  for (const ch of text) {
    const code = ch.charCodeAt(0);
    if (code === 32) {
      out += "　"; // ideographic space U+3000
    } else if (code >= 33 && code <= 126) {
      out += String.fromCharCode(code + 0xfee0);
    } else {
      out += ch;
    }
  }
  return out;
}

function aestheticSpacing(text: string): string {
  return text
    .split("\n")
    .map((line) => [...line].join(" "))
    .join("\n");
}

export function VaporwaveTextGenerator() {
  const [text, setText] = useState("");
  const [spaced, setSpaced] = useState(true);
  const [decorated, setDecorated] = useState(false);

  const output = useMemo(() => {
    if (!text) return "";
    let result = toFullwidth(text);
    if (spaced) result = aestheticSpacing(result);
    if (decorated) result = `${DECORATION_PREFIX}${result}${DECORATION_SUFFIX}`;
    return result;
  }, [text, spaced, decorated]);

  const onCopy = async () => {
    if (!output) return;
    const ok = await copyText(output);
    if (ok) toast.success("Vaporwave text copied");
    else toast.error("Copy failed — select the output and copy manually");
  };

  return (
    <div className="space-y-5">
      <div>
        <Label htmlFor="vapor-input">
          Your text{` — ${text.length.toLocaleString()} / ${MAX_INPUT.toLocaleString()} characters`}
        </Label>
        <Textarea
          id="vapor-input"
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, MAX_INPUT))}
          placeholder="Type something — e.g. aesthetic vibes only"
          rows={3}
          className="mt-1.5"
        />
      </div>

      <div className="space-y-2">
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={spaced}
            onChange={(e) => setSpaced(e.target.checked)}
            className="h-4 w-4 rounded border"
          />
          A E S T H E T I C spacing — space between every letter
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={decorated}
            onChange={(e) => setDecorated(e.target.checked)}
            className="h-4 w-4 rounded border"
          />
          Add ｡･:*:･ﾟ★ decoration around the text
        </label>
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Label>Vaporwave text{output ? ` — ${output.length.toLocaleString()} characters` : ""}</Label>
          <div className="flex gap-1.5">
            <Button type="button" size="sm" variant="outline" onClick={onCopy} disabled={!output}>
              <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={!output}
              onClick={() => downloadText("vaporwave-text.txt", output)}
            >
              <Download className="mr-1.5 h-3.5 w-3.5" /> .txt
            </Button>
            <Button type="button" size="sm" variant="ghost" onClick={() => setText("")}>
              <Eraser className="mr-1.5 h-3.5 w-3.5" /> Clear
            </Button>
          </div>
        </div>
        <div className="mt-1.5 min-h-[110px] whitespace-pre-wrap break-words rounded-md border bg-muted/30 px-3 py-3 text-xl leading-relaxed">
          {output || <span className="text-sm text-muted-foreground">ＹＯＵＲ　ＶＡＰＯＲＷＡＶＥ　ＴＥＸＴ　ＷＩＬＬ　ＡＰＰＥＡＲ　ＨＥＲＥ…</span>}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Vaporwave text converts letters, numbers and punctuation to their fullwidth Unicode forms
          — the wide, retro look from 80s Japanese advertising. It pastes into bios, captions and
          chat apps as plain text, no font install needed.
        </p>
      </div>
    </div>
  );
}
