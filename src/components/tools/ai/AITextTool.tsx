import { useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { AlertCircle, Copy, Download, History, Loader2, RefreshCw, Sparkles, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { runAiTool, type AiTextTask } from "@/lib/ai-tools.functions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { downloadText, loadJSONArray, saveJSON } from "@/lib/engagement";

type HistoryEntry = { input: string; output: string; ts: number };

type Config = {
  label: string;
  placeholder: string;
  actionLabel: string;
  multiline?: boolean;
};

const CONFIG: Record<AiTextTask, Config> = {
  "ai-word-explainer": {
    label: "Word or phrase",
    placeholder: "e.g. serendipity",
    actionLabel: "Explain with AI",
  },
  "ai-sentence-generator": {
    label: "Word or topic",
    placeholder: "e.g. resilience",
    actionLabel: "Generate sentences",
  },
  "ai-example-generator": {
    label: "Concept or idea",
    placeholder: "e.g. metaphors about time",
    actionLabel: "Generate examples",
  },
  "ai-story-generator": {
    label: "Your story idea",
    placeholder: "e.g. A lighthouse keeper discovers a message in a bottle…",
    actionLabel: "Write a story",
    multiline: true,
  },
  "ai-poem-generator": {
    label: "Topic or theme",
    placeholder: "e.g. autumn rain and quiet mornings",
    actionLabel: "Write a poem",
    multiline: true,
  },
  "ai-vocabulary-builder": {
    label: "Topic or level",
    placeholder: "e.g. business English for beginners",
    actionLabel: "Build vocabulary",
  },
};

/** Minimal, safe Markdown renderer for headings, lists, bold and italics. */
function renderInline(text: string, keyBase: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|_[^_]+_)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={`${keyBase}-b-${i}`} className="font-semibold text-foreground">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      nodes.push(
        <em key={`${keyBase}-i-${i}`} className="italic">
          {token.slice(1, -1)}
        </em>,
      );
    }
    last = match.index + token.length;
    i += 1;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function Markdown({ text }: { text: string }) {
  const lines = text.split("\n");
  const blocks: ReactNode[] = [];
  let list: string[] = [];
  let key = 0;

  const flushList = () => {
    if (list.length === 0) return;
    const items = [...list];
    blocks.push(
      <ul key={`ul-${key++}`} className="my-3 list-disc space-y-1.5 pl-5">
        {items.map((li, idx) => (
          <li key={idx}>{renderInline(li, `li-${key}-${idx}`)}</li>
        ))}
      </ul>,
    );
    list = [];
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      continue;
    }
    if (/^#{1,6}\s/.test(trimmed)) {
      flushList();
      const level = trimmed.match(/^#+/)![0].length;
      const content = trimmed.replace(/^#+\s/, "");
      blocks.push(
        <p
          key={`h-${key++}`}
          className={
            level <= 2
              ? "mt-4 mb-1 font-display text-xl font-semibold text-foreground"
              : "mt-3 mb-1 font-display text-lg font-semibold text-foreground"
          }
        >
          {renderInline(content, `h-${key}`)}
        </p>,
      );
      continue;
    }
    if (/^[-*]\s/.test(trimmed)) {
      list.push(trimmed.replace(/^[-*]\s/, ""));
      continue;
    }
    flushList();
    blocks.push(
      <p key={`p-${key++}`} className="my-2 leading-relaxed">
        {renderInline(trimmed, `p-${key}`)}
      </p>,
    );
  }
  flushList();
  return <div className="text-[15px] text-muted-foreground">{blocks}</div>;
}

export function AITextTool({ task }: { task: AiTextTask }) {
  const run = useServerFn(runAiTool);
  const cfg = CONFIG[task];
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [output, setOutput] = useState<string | null>(null);
  const historyKey = `awt-ai-history-${task}-v1`;
  const [history, setHistory] = useState<HistoryEntry[]>(() => loadJSONArray<HistoryEntry>(historyKey));

  const canRun = text.trim().length > 0 && !loading;

  async function handleRun() {
    if (!canRun) return;
    setLoading(true);
    setError(null);
    setOutput(null);
    try {
      const res = await run({ data: { text: text.trim(), task } });
      setOutput(res.output);
      setHistory((prev) => {
        const next = [
          { input: text.trim(), output: res.output, ts: Date.now() },
          ...prev.filter((h) => h.input !== text.trim()),
        ].slice(0, 5);
        saveJSON(historyKey, next);
        return next;
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setText("");
    setOutput(null);
    setError(null);
  }

  return (
    <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-lift sm:p-7">
      <div className="space-y-1.5">
        <Label htmlFor="ai-input" className="text-xs font-semibold text-muted-foreground">
          {cfg.label}
        </Label>
        {cfg.multiline ? (
          <Textarea
            id="ai-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={cfg.placeholder}
            className="min-h-28 rounded-xl text-base"
            maxLength={2000}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleRun();
            }}
          />
        ) : (
          <Input
            id="ai-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={cfg.placeholder}
            className="h-12 rounded-xl text-base"
            maxLength={2000}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleRun();
            }}
          />
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Button onClick={handleRun} disabled={!canRun} className="rounded-full">
          {loading ? (
            <>
              <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> Generating…
            </>
          ) : (
            <>
              <Sparkles className="mr-1.5 h-4 w-4" /> {cfg.actionLabel}
            </>
          )}
        </Button>
        {(text || output) && (
          <Button variant="ghost" onClick={reset} className="rounded-full" disabled={loading}>
            <X className="mr-1.5 h-4 w-4" /> Clear
          </Button>
        )}
      </div>

      {error && (
        <div className="mt-5 flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {output && (
        <div className="mt-6 border-t border-border/60 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
              <Sparkles className="h-5 w-5 text-honey" /> AI result
            </h2>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={handleRun} disabled={!canRun} className="rounded-full">
                <RefreshCw className="mr-1.5 h-4 w-4" /> Another version
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => downloadText(`${task}-output.txt`, output)}
                className="rounded-full"
              >
                <Download className="mr-1.5 h-4 w-4" /> .txt
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard?.writeText(output);
                  toast.success("Copied to clipboard");
                }}
                className="rounded-full"
              >
                <Copy className="mr-1.5 h-4 w-4" /> Copy
              </Button>
            </div>
          </div>
          <div className="mt-4 rounded-2xl bg-secondary/40 p-5">
            <Markdown text={output} />
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-6 border-t border-border/60 pt-5">
          <div className="flex items-center justify-between">
            <h3 className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
              <History className="h-4 w-4" /> Recent generations
            </h3>
            <button
              onClick={() => {
                setHistory([]);
                saveJSON(historyKey, []);
              }}
              className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5" /> Clear history
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {history.map((h) => (
              <button
                key={h.ts}
                onClick={() => {
                  setText(h.input);
                  setOutput(h.output);
                  setError(null);
                }}
                title={new Date(h.ts).toLocaleString()}
                className="max-w-56 truncate rounded-full border border-border/70 bg-secondary/40 px-3.5 py-1.5 text-xs font-semibold transition-colors hover:border-honey/60 hover:bg-accent"
              >
                {h.input}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Saved only in your browser. “Another version” regenerates fresh AI output for the same
            input (uses one AI generation).
          </p>
        </div>
      )}
    </div>
  );
}
