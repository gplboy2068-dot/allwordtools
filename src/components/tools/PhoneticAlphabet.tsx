import { useMemo, useState } from "react";
import { ArrowLeftRight, Copy, Volume2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { copyText, speakWord } from "@/lib/engagement";

const NATO: Record<string, string> = {
  a: "Alfa", b: "Bravo", c: "Charlie", d: "Delta", e: "Echo", f: "Foxtrot", g: "Golf",
  h: "Hotel", i: "India", j: "Juliett", k: "Kilo", l: "Lima", m: "Mike", n: "November",
  o: "Oscar", p: "Papa", q: "Quebec", r: "Romeo", s: "Sierra", t: "Tango", u: "Uniform",
  v: "Victor", w: "Whiskey", x: "X-ray", y: "Yankee", z: "Zulu",
  "0": "Zero", "1": "One", "2": "Two", "3": "Three", "4": "Four", "5": "Five",
  "6": "Six", "7": "Seven", "8": "Eight", "9": "Nine",
};
const REVERSE: Record<string, string> = Object.fromEntries(
  Object.entries(NATO).map(([k, v]) => [v.toLowerCase(), k]),
);

export function PhoneticAlphabet() {
  const [mode, setMode] = useState<"spell" | "decode">("spell");
  const [text, setText] = useState("");

  const spelled = useMemo(() => {
    if (mode !== "spell") return [];
    return text
      .toLowerCase()
      .split("")
      .map((ch) => ({ ch, word: NATO[ch] ?? null }));
  }, [text, mode]);

  const spelledText = spelled.map((s) => s.word ?? s.ch).join(" ");
  const decoded = useMemo(() => {
    if (mode !== "decode") return "";
    return text
      .toLowerCase()
      .split(/[\s,;-]+/)
      .filter(Boolean)
      .map((tok) => REVERSE[tok] ?? "?")
      .join("");
  }, [text, mode]);

  return (
    <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-lift sm:p-7">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setMode("spell")}
          className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${mode === "spell" ? "border-honey bg-honey/15 text-honey" : "border-border/70 bg-secondary/40 text-muted-foreground"}`}
        >
          Spell with NATO alphabet
        </button>
        <button
          onClick={() => setMode("decode")}
          className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${mode === "decode" ? "border-honey bg-honey/15 text-honey" : "border-border/70 bg-secondary/40 text-muted-foreground"}`}
        >
          <ArrowLeftRight className="mr-1.5 inline h-3.5 w-3.5" /> Decode NATO words
        </button>
      </div>

      <div className="mt-4 space-y-1.5">
        <Label htmlFor="pa-input" className="text-xs font-semibold text-muted-foreground">
          {mode === "spell" ? "Word, name or code to spell out" : "NATO words (space separated)"}
        </Label>
        <Input
          id="pa-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={mode === "spell" ? "e.g. Smith, flight BA249, your callsign…" : "e.g. Alfa Bravo Charlie"}
          autoComplete="off"
          spellCheck={false}
          className="h-12 rounded-xl text-base"
          maxLength={300}
        />
      </div>

      {mode === "spell" && text.trim() && (
        <div className="mt-5 border-t border-border/60 pt-5">
          <div className="flex flex-wrap gap-2">
            {spelled.map((s, i) =>
              s.word ? (
                <span key={i} className="rounded-xl border border-border/70 bg-secondary/40 px-3 py-2 text-center">
                  <span className="block font-display text-lg font-bold uppercase">{s.ch}</span>
                  <span className="block text-xs font-semibold text-honey">{s.word}</span>
                </span>
              ) : (
                <span key={i} className="rounded-xl border border-dashed border-border/60 px-3 py-2 text-center text-muted-foreground">
                  <span className="block font-display text-lg font-bold">{s.ch === " " ? "␣" : s.ch}</span>
                  <span className="block text-xs">{s.ch === " " ? "space" : "—"}</span>
                </span>
              ),
            )}
          </div>
          <p className="mt-4 rounded-xl bg-secondary/40 px-4 py-3 font-medium">{spelledText}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button size="sm" onClick={async () => { if (await copyText(spelledText)) toast.success("Phonetic spelling copied"); }} className="rounded-full">
              <Copy className="mr-1.5 h-4 w-4" /> Copy
            </Button>
            <Button size="sm" variant="outline" onClick={() => speakWord(spelledText)} className="rounded-full">
              <Volume2 className="mr-1.5 h-4 w-4" /> Hear it
            </Button>
          </div>
        </div>
      )}

      {mode === "decode" && text.trim() && (
        <div className="mt-5 border-t border-border/60 pt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Decoded</p>
          <p className="mt-2 font-display text-3xl font-bold uppercase tracking-widest">{decoded || "—"}</p>
          <Button
            size="sm"
            className="mt-3 rounded-full"
            onClick={async () => { if (await copyText(decoded.toUpperCase())) toast.success("Decoded text copied"); }}
          >
            <Copy className="mr-1.5 h-4 w-4" /> Copy
          </Button>
        </div>
      )}

      <div className="mt-6 border-t border-border/60 pt-5">
        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Full NATO alphabet</p>
        <div className="mt-3 grid grid-cols-3 gap-1.5 sm:grid-cols-4 lg:grid-cols-6">
          {Object.entries(NATO).slice(0, 26).map(([ch, word]) => (
            <span key={ch} className="rounded-lg bg-secondary/40 px-2 py-1.5 text-xs font-medium">
              <strong className="uppercase">{ch}</strong> · {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
