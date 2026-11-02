import { useMemo, useState } from "react";
import { Copy, RefreshCw, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { copyText } from "@/lib/engagement";

type Style = "aesthetic" | "gaming" | "cool" | "professional";

const DECOR: Record<Style, { prefix: string[]; suffix: string[] }> = {
  aesthetic: {
    prefix: ["its", "hey", "lil", "soft", "moon", "peachy", "angel", "cloud"],
    suffix: ["xo", "vibes", "diary", "aura", "bloom", "wav", "core", "days"],
  },
  gaming: {
    prefix: ["xX", "itz", "shadow", "dark", "venom", "rage", "toxic", "hyper"],
    suffix: ["Xx", "ttv", "fps", "slayer", "storm", "byte", "plays", "op"],
  },
  cool: {
    prefix: ["the", "mr", "dr", "captain", "not", "iam", "real", "just"],
    suffix: ["official", "hq", "world", "zone", "labs", "club", "daily", "prime"],
  },
  professional: {
    prefix: ["the", "real", "official", "team", "by", "mr", "ms", "iam"],
    suffix: ["official", "hq", "studio", "works", "group", "co", "digital", "media"],
  },
};

const SEPS = [".", "_", "", ".", "_"];

function leet(s: string): string {
  return s.replace(/a/g, "4").replace(/e/g, "3").replace(/i/g, "1").replace(/o/g, "0").replace(/s/g, "5");
}

export function UsernameGenerator() {
  const [keyword, setKeyword] = useState("");
  const [keyword2, setKeyword2] = useState("");
  const [style, setStyle] = useState<Style>("aesthetic");
  const [withNumbers, setWithNumbers] = useState(true);
  const [seed, setSeed] = useState(0);

  const results = useMemo(() => {
    const base1 = keyword.trim().toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, "");
    const base2 = keyword2.trim().toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, "");
    const decor = DECOR[style];
    const pool: string[] = [];
    const rnd = (n: number) => Math.floor(Math.random() * n);
    const num = () => String(rnd(99) + 1);
    const year = () => String(rnd(30) + 1).padStart(2, "0");

    if (!base1 && !base2) return [];
    const cores = [base1, base2, base1 + base2, base2 + base1].filter(Boolean);
    let guard = 0;
    while (pool.length < 24 && guard++ < 300) {
      const core = cores[rnd(cores.length)];
      const sep = SEPS[rnd(SEPS.length)];
      const pattern = rnd(6);
      let name = core;
      if (pattern === 0) name = decor.prefix[rnd(decor.prefix.length)] + sep + core;
      else if (pattern === 1) name = core + sep + decor.suffix[rnd(decor.suffix.length)];
      else if (pattern === 2) name = decor.prefix[rnd(decor.prefix.length)] + sep + core + sep + decor.suffix[rnd(decor.suffix.length)];
      else if (pattern === 3) name = core + core.slice(0, Math.max(2, Math.floor(core.length / 2)));
      else if (pattern === 4 && style === "gaming") name = "xX" + core + "Xx";
      else if (pattern === 5) name = core.split("").join(sep === "" ? "." : sep);
      if (style === "gaming" && rnd(3) === 0) name = leet(name);
      if (withNumbers && rnd(2) === 0) name += rnd(2) === 0 ? num() : year();
      name = name.replace(/\.{2,}/g, ".").replace(/_{2,}/g, "_").slice(0, 30);
      if (name.length >= 3 && !pool.includes(name)) pool.push(name);
    }
    return pool;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, keyword2, style, withNumbers, seed]);

  return (
    <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-lift sm:p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="ug-kw1" className="text-xs font-semibold text-muted-foreground">
            Your name or keyword
          </Label>
          <Input id="ug-kw1" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="e.g. Aarav, luna, pixel" className="h-12 rounded-xl" maxLength={24} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="ug-kw2" className="text-xs font-semibold text-muted-foreground">
            Second keyword (optional)
          </Label>
          <Input id="ug-kw2" value={keyword2} onChange={(e) => setKeyword2(e.target.value)} placeholder="e.g. star, wolf, coder" className="h-12 rounded-xl" maxLength={24} />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {(["aesthetic", "gaming", "cool", "professional"] as Style[]).map((s) => (
          <button
            key={s}
            onClick={() => setStyle(s)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold capitalize transition-colors ${style === s ? "border-honey bg-honey/15 text-honey" : "border-border/70 bg-secondary/40 text-muted-foreground hover:border-honey/50"}`}
          >
            {s}
          </button>
        ))}
        <label className="ml-1 inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-muted-foreground">
          <input type="checkbox" checked={withNumbers} onChange={(e) => setWithNumbers(e.target.checked)} className="h-4 w-4 accent-amber-500" />
          Add numbers
        </label>
        <Button onClick={() => setSeed(seed + 1)} disabled={!keyword.trim() && !keyword2.trim()} className="ml-auto rounded-full">
          <RefreshCw className="mr-1.5 h-4 w-4" /> Fresh ideas
        </Button>
      </div>

      {results.length > 0 ? (
        <>
          <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((name) => (
              <button
                key={name}
                onClick={async () => { if (await copyText(name)) toast.success(`Copied "${name}"`); }}
                title="Click to copy"
                className="group inline-flex items-center justify-between gap-2 rounded-xl border border-border/70 bg-secondary/40 px-4 py-2.5 text-left text-sm font-semibold transition-colors hover:border-honey/60 hover:bg-accent"
              >
                <span className="truncate">@{name}</span>
                <Copy className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Availability isn't checked — if a name is taken, try another style, add a number, or tap
            Fresh ideas. Great for Instagram, TikTok, Roblox, Discord, YouTube and gaming tags.
          </p>
        </>
      ) : (
        <p className="mt-5 flex items-center gap-2 rounded-xl bg-secondary/40 px-4 py-3 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4 shrink-0 text-honey" /> Type a keyword above and 24 username
          ideas appear instantly — searches for Instagram-ready usernames are up over 1,500% this
          year, so grab a good one.
        </p>
      )}
    </div>
  );
}
