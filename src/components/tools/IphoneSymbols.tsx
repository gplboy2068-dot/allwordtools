import { useMemo, useState } from "react";
import { Copy, Download, Eraser, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { copyText, downloadText } from "@/lib/engagement";

type SymbolItem = { s: string; n: string };
type SymbolCategory = { id: string; label: string; items: SymbolItem[] };

const CATEGORIES: SymbolCategory[] = [
  {
    id: "hearts",
    label: "Hearts",
    items: [
      { s: "♥", n: "black heart suit" },
      { s: "❤", n: "heavy black heart" },
      { s: "❤️", n: "red heart" },
      { s: "❥", n: "rotated heavy black heart bullet" },
      { s: "♡", n: "white heart suit" },
      { s: "❣", n: "heart exclamation" },
      { s: "❦", n: "floral heart" },
      { s: "❧", n: "rotated floral heart bullet" },
    ],
  },
  {
    id: "stars",
    label: "Stars",
    items: [
      { s: "★", n: "black star" },
      { s: "☆", n: "white star" },
      { s: "✦", n: "black four pointed star" },
      { s: "✧", n: "white four pointed star" },
      { s: "✩", n: "stress outlined white star" },
      { s: "✪", n: "circled white star" },
      { s: "✫", n: "open centre black star" },
      { s: "✬", n: "black centre white star" },
      { s: "✭", n: "outlined black star" },
      { s: "✮", n: "heavy outlined black star" },
      { s: "✯", n: "pinwheel star" },
      { s: "✰", n: "shadowed white star" },
      { s: "⁂", n: "asterism" },
      { s: "⁎", n: "low asterisk" },
      { s: "⁑", n: "two asterisks aligned vertically" },
      { s: "✵", n: "eight pointed star" },
      { s: "✶", n: "six pointed star" },
      { s: "✷", n: "eight pointed star outline" },
      { s: "✸", n: "heavy eight pointed star" },
      { s: "✹", n: "twelve pointed black star" },
      { s: "✺", n: "twelve pointed white star" },
      { s: "✻", n: "teardrop spoked asterisk" },
      { s: "✼", n: "open centre teardrop spoked asterisk" },
      { s: "✽", n: "heavy teardrop spoked asterisk" },
      { s: "❇", n: "sparkle" },
      { s: "❈", n: "heavy sparkle" },
    ],
  },
  {
    id: "arrows",
    label: "Arrows",
    items: [
      { s: "←", n: "leftwards arrow" },
      { s: "↑", n: "upwards arrow" },
      { s: "→", n: "rightwards arrow" },
      { s: "↓", n: "downwards arrow" },
      { s: "↔", n: "left right arrow" },
      { s: "↕", n: "up down arrow" },
      { s: "↖", n: "north west arrow" },
      { s: "↗", n: "north east arrow" },
      { s: "↘", n: "south east arrow" },
      { s: "↙", n: "south west arrow" },
      { s: "↩", n: "leftwards arrow with hook" },
      { s: "↪", n: "rightwards arrow with hook" },
      { s: "↝", n: "rightwards wave arrow" },
      { s: "↜", n: "leftwards wave arrow" },
      { s: "↞", n: "leftwards two headed arrow" },
      { s: "↠", n: "rightwards two headed arrow" },
      { s: "↢", n: "leftwards arrow with tail" },
      { s: "↣", n: "rightwards arrow with tail" },
      { s: "⇐", n: "leftwards double arrow" },
      { s: "⇑", n: "upwards double arrow" },
      { s: "⇒", n: "rightwards double arrow" },
      { s: "⇓", n: "downwards double arrow" },
      { s: "⇔", n: "left right double arrow" },
      { s: "⇖", n: "north west double arrow" },
      { s: "⇗", n: "north east double arrow" },
      { s: "⇘", n: "south east double arrow" },
      { s: "⇙", n: "south west double arrow" },
      { s: "⟶", n: "long rightwards arrow" },
    ],
  },
  {
    id: "math",
    label: "Math",
    items: [
      { s: "∞", n: "infinity" },
      { s: "≠", n: "not equal to" },
      { s: "≈", n: "almost equal to" },
      { s: "±", n: "plus minus" },
      { s: "√", n: "square root" },
      { s: "∛", n: "cube root" },
      { s: "∑", n: "summation" },
      { s: "∏", n: "product" },
      { s: "∫", n: "integral" },
      { s: "∂", n: "partial differential" },
      { s: "π", n: "pi" },
      { s: "∝", n: "proportional to" },
      { s: "∠", n: "angle" },
      { s: "⊥", n: "perpendicular" },
      { s: "∥", n: "parallel to" },
      { s: "∧", n: "logical and" },
      { s: "∨", n: "logical or" },
      { s: "∩", n: "intersection" },
      { s: "∪", n: "union" },
      { s: "⊂", n: "subset of" },
      { s: "⊃", n: "superset of" },
      { s: "∈", n: "element of" },
      { s: "∀", n: "for all" },
      { s: "∅", n: "empty set" },
    ],
  },
  {
    id: "currency",
    label: "Currency",
    items: [
      { s: "$", n: "dollar sign" },
      { s: "€", n: "euro sign" },
      { s: "£", n: "pound sign" },
      { s: "¥", n: "yen sign" },
      { s: "₹", n: "indian rupee sign" },
      { s: "₽", n: "ruble sign" },
      { s: "₩", n: "won sign" },
      { s: "¢", n: "cent sign" },
      { s: "₿", n: "bitcoin sign" },
      { s: "₪", n: "shekel sign" },
      { s: "₫", n: "dong sign" },
      { s: "₴", n: "hryvnia sign" },
      { s: "₦", n: "naira sign" },
      { s: "₱", n: "peso sign" },
      { s: "₲", n: "guarani sign" },
      { s: "₵", n: "cedi sign" },
    ],
  },
  {
    id: "music",
    label: "Music",
    items: [
      { s: "♩", n: "quarter note" },
      { s: "♪", n: "eighth note" },
      { s: "♫", n: "beamed eighth notes" },
      { s: "♬", n: "beamed sixteenth notes" },
      { s: "♭", n: "music flat sign" },
      { s: "♮", n: "music natural sign" },
      { s: "♯", n: "music sharp sign" },
      { s: "𝄞", n: "musical symbol g clef" },
      { s: "𝄢", n: "musical symbol f clef" },
      { s: "𝄡", n: "musical symbol c clef" },
      { s: "𝄪", n: "musical symbol double sharp" },
      { s: "𝄫", n: "musical symbol double flat" },
    ],
  },
  {
    id: "shapes",
    label: "Shapes",
    items: [
      { s: "●", n: "black circle" },
      { s: "○", n: "white circle" },
      { s: "◐", n: "circle with left half black" },
      { s: "◑", n: "circle with right half black" },
      { s: "■", n: "black square" },
      { s: "□", n: "white square" },
      { s: "▪", n: "black small square" },
      { s: "▫", n: "white small square" },
      { s: "▲", n: "black up pointing triangle" },
      { s: "△", n: "white up pointing triangle" },
      { s: "▼", n: "black down pointing triangle" },
      { s: "▽", n: "white down pointing triangle" },
      { s: "◆", n: "black diamond" },
      { s: "◇", n: "white diamond" },
      { s: "◌", n: "dotted circle" },
      { s: "◎", n: "bullseye" },
      { s: "◍", n: "circle with vertical fill" },
      { s: "⬢", n: "black hexagon" },
      { s: "⬡", n: "white hexagon" },
      { s: "⬤", n: "black large circle" },
    ],
  },
  {
    id: "checkmarks",
    label: "Checkmarks",
    items: [
      { s: "✓", n: "check mark" },
      { s: "✔", n: "heavy check mark" },
      { s: "✗", n: "ballot x" },
      { s: "✘", n: "heavy ballot x" },
      { s: "☑", n: "ballot box with check" },
      { s: "☐", n: "ballot box" },
      { s: "☒", n: "ballot box with x" },
      { s: "☓", n: "saltire" },
      { s: "✚", n: "heavy greek cross" },
      { s: "✛", n: "open centre cross" },
      { s: "✜", n: "heavy open centre cross" },
      { s: "🗸", n: "light check mark" },
    ],
  },
  {
    id: "zodiac",
    label: "Zodiac",
    items: [
      { s: "♈", n: "aries" },
      { s: "♉", n: "taurus" },
      { s: "♊", n: "gemini" },
      { s: "♋", n: "cancer" },
      { s: "♌", n: "leo" },
      { s: "♍", n: "virgo" },
      { s: "♎", n: "libra" },
      { s: "♏", n: "scorpio" },
      { s: "♐", n: "sagittarius" },
      { s: "♑", n: "capricorn" },
      { s: "♒", n: "aquarius" },
      { s: "♓", n: "pisces" },
    ],
  },
  {
    id: "greek",
    label: "Greek",
    items: [
      { s: "α", n: "alpha" },
      { s: "β", n: "beta" },
      { s: "γ", n: "gamma" },
      { s: "δ", n: "delta" },
      { s: "ε", n: "epsilon" },
      { s: "ζ", n: "zeta" },
      { s: "η", n: "eta" },
      { s: "θ", n: "theta" },
      { s: "ι", n: "iota" },
      { s: "κ", n: "kappa" },
      { s: "λ", n: "lambda" },
      { s: "μ", n: "mu" },
      { s: "ν", n: "nu" },
      { s: "ξ", n: "xi" },
      { s: "ο", n: "omicron" },
      { s: "π", n: "pi" },
      { s: "ρ", n: "rho" },
      { s: "σ", n: "sigma" },
      { s: "τ", n: "tau" },
      { s: "υ", n: "upsilon" },
      { s: "φ", n: "phi" },
      { s: "χ", n: "chi" },
      { s: "ψ", n: "psi" },
      { s: "ω", n: "omega" },
    ],
  },
  {
    id: "decorative",
    label: "Decorative",
    items: [
      { s: "❀", n: "white florette" },
      { s: "✿", n: "black florette" },
      { s: "❁", n: "eight petalled outlined black florette" },
      { s: "❃", n: "eight petalled black florette" },
      { s: "❋", n: "eight petalled outlined black florette" },
      { s: "❆", n: "heavy chevron snowflake" },
      { s: "❖", n: "black diamond minus white x" },
      { s: "♛", n: "black chess queen" },
      { s: "♚", n: "black chess king" },
      { s: "♜", n: "black chess rook" },
      { s: "♝", n: "black chess bishop" },
      { s: "♞", n: "black chess knight" },
      { s: "♟", n: "black chess pawn" },
      { s: "☀", n: "black sun with rays" },
      { s: "☁", n: "cloud" },
      { s: "☂", n: "umbrella" },
      { s: "☃", n: "snowman" },
      { s: "☄", n: "comet" },
      { s: "☾", n: "last quarter moon" },
      { s: "☽", n: "first quarter moon" },
    ],
  },
];

const RECENT_KEY = "awt-iphone-symbols-recent";
const MAX_RECENT = 12;

function loadRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.filter((x): x is string => typeof x === "string").slice(0, MAX_RECENT)
      : [];
  } catch {
    return [];
  }
}

export function IphoneSymbols() {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [composed, setComposed] = useState("");
  const [recent, setRecent] = useState<string[]>(loadRecent);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CATEGORIES.flatMap((c) =>
      (category === "all" || c.id === category ? c.items : []).map((item) => ({
        ...item,
        categoryLabel: c.label,
      })),
    ).filter((item) => !q || item.n.toLowerCase().includes(q) || item.s.includes(query.trim()));
  }, [category, query]);

  const pushRecent = (symbol: string) => {
    setRecent((prev) => {
      const next = [symbol, ...prev.filter((x) => x !== symbol)].slice(0, MAX_RECENT);
      try {
        window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      } catch {
        /* storage unavailable — ignore */
      }
      return next;
    });
  };

  const onPick = async (symbol: string) => {
    const ok = await copyText(symbol);
    if (ok) toast.success(`Copied ${symbol}`);
    else toast.error("Copy failed — select the symbol and copy manually");
    setComposed((prev) => prev + symbol);
    pushRecent(symbol);
  };

  const onCopyComposed = async () => {
    if (!composed) return;
    const ok = await copyText(composed);
    if (ok) toast.success("Composed text copied");
    else toast.error("Copy failed — select the text and copy manually");
  };

  return (
    <div className="space-y-5">
      <div>
        <Label htmlFor="is-search">Search symbols</Label>
        <div className="relative mt-1.5">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="is-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try “heart”, “arrow”, “star”…"
            className="pl-9"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => setCategory("all")}
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
            category === "all" ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted"
          }`}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCategory(c.id)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              category === c.id ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {recent.length > 0 && (
        <div>
          <Label>Recently copied</Label>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {recent.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => void onPick(s)}
                aria-label={`Copy ${s}`}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border px-2 text-xl transition-colors hover:bg-muted"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="mb-2 text-xs text-muted-foreground">
          Tap any symbol to copy it — it is also added to your compose box below.
        </p>
        {visible.length === 0 ? (
          <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
            No symbols match “{query}”. Try another word.
          </p>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
            {visible.map((item) => (
              <button
                key={`${item.categoryLabel}-${item.s}-${item.n}`}
                type="button"
                onClick={() => void onPick(item.s)}
                title={item.n}
                className="flex min-h-[56px] flex-col items-center justify-center gap-0.5 rounded-lg border px-1 py-2 transition-colors hover:border-primary hover:bg-muted"
              >
                <span className="text-2xl leading-none">{item.s}</span>
                <span className="max-w-full truncate px-1 text-[10px] text-muted-foreground">{item.n}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Label htmlFor="is-compose">
            Compose box{composed ? ` — ${composed.length} characters` : ""}
          </Label>
          <div className="flex gap-1.5">
            <Button type="button" size="sm" variant="outline" onClick={onCopyComposed} disabled={!composed}>
              <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={!composed}
              onClick={() => downloadText("iphone-symbols.txt", composed)}
            >
              <Download className="mr-1.5 h-3.5 w-3.5" /> .txt
            </Button>
            <Button type="button" size="sm" variant="ghost" onClick={() => setComposed("")}>
              <Eraser className="mr-1.5 h-3.5 w-3.5" /> Clear
            </Button>
          </div>
        </div>
        <Textarea
          id="is-compose"
          value={composed}
          onChange={(e) => setComposed(e.target.value)}
          rows={3}
          placeholder="Tap symbols above to build your text here, or type your own…"
          className="mt-1.5 text-lg"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          Every symbol works on iPhone — copy it here, then paste it into Messages, Instagram, Notes or any other app.
        </p>
      </div>
    </div>
  );
}
