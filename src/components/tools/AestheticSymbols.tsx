import { useMemo, useState} from "react";
import { Copy, Download, Eraser, Search} from "lucide-react";
import { toast} from "sonner";
import { Button} from "@/components/ui/button";
import { Input} from "@/components/ui/input";
import { Label} from "@/components/ui/label";
import { Textarea} from "@/components/ui/textarea";
import { copyText, downloadText} from "@/lib/engagement";

type AestheticItem = { s: string; n: string};
type AestheticCategory = { id: string; label: string; fullWidth?: boolean; items: AestheticItem[]};

const CATEGORIES: AestheticCategory[] = [
{
id: "stars-sparkles",
label: "Stars & Sparkles",
items: [
{ s: "✦", n: "black four pointed star"},
{ s: "✧", n: "white four pointed star"},
{ s: "✩", n: "stress outlined white star"},
{ s: "✪", n: "circled white star"},
{ s: "✫", n: "open centre black star"},
{ s: "✬", n: "black centre white star"},
{ s: "✭", n: "outlined black star"},
{ s: "✮", n: "heavy outlined black star"},
{ s: "✯", n: "pinwheel star"},
{ s: "✰", n: "shadowed white star"},
{ s: "⁂", n: "asterism"},
{ s: "⁎", n: "low asterisk"},
{ s: "✵", n: "eight pointed star"},
{ s: "✶", n: "six pointed star"},
{ s: "✷", n: "eight pointed star outline"},
{ s: "✸", n: "heavy eight pointed star"},
{ s: "❇", n: "sparkle"},
{ s: "❈", n: "heavy sparkle"},
],
},
{
id: "hearts",
label: "Hearts",
items: [
{ s: "♥", n: "black heart suit"},
{ s: "❤", n: "heavy black heart"},
{ s: "❥", n: "rotated heart bullet"},
{ s: "♡", n: "white heart suit"},
{ s: "❣", n: "heart exclamation"},
{ s: "❦", n: "floral heart"},
{ s: "❧", n: "rotated floral heart bullet"},
{ s: "ෆ", n: "flower heart"},
{ s: "ʚ♡ɞ", n: "heart with brackets"},
{ s: "♡₊˚", n: "heart with sparkle tail"},
{ s: "˚ʚ♡ɞ˚", n: "floating heart"},
{ s: "˗ˏˋ♡ˎˊ˗", n: "heart with ribbon"},
{ s: "꒰♡꒱", n: "heart in brackets"},
{ s: "♡‧₊˚", n: "heart with dots"},
{ s: "˚₊‧꒰♡꒱‧₊˚", n: "decorated heart"},
{ s: "♡̶", n: "heart with slash"},
],
},
{
id: "bows-flowers",
label: "Bows & Flowers",
items: [
{ s: "❀", n: "white florette"},
{ s: "✿", n: "black florette"},
{ s: "❁", n: "eight petalled outlined florette"},
{ s: "❃", n: "eight petalled black florette"},
{ s: "❋", n: "eight petalled outlined black florette"},
{ s: "✽", n: "heavy teardrop spoked asterisk"},
{ s: "✼", n: "open centre teardrop asterisk"},
{ s: "❆", n: "heavy chevron snowflake"},
{ s: "❊", n: "eight teardrop propeller asterisk"},
{ s: "❉", n: "balloon spoked asterisk"},
{ s: "✾", n: "six petalled black and white florette"},
{ s: "❈", n: "heavy sparkle flower"},
{ s: "✺", n: "twelve pointed white star"},
{ s: "✵", n: "eight pointed star flower"},
{ s: "⚘", n: "flower"},
{ s: "❦", n: "floral heart"},
],
},
{
id: "dividers",
label: "Dividers",
fullWidth: true,
items: [
{ s: "━━━✦❤✦━━━", n: "heart star divider"},
{ s: "────୨ৎ────", n: "curly divider"},
{ s: "•°•°•°•°•°•", n: "dot divider"},
{ s: "✧･ﾟ: *✧･ﾟ:*", n: "sparkle divider"},
{ s: "═══ ∘◦ ❈ ◦∘ ═══", n: "double line sparkle divider"},
{ s: "─━─━─━─━─", n: "dash divider"},
{ s: "⋆｡‧˚ʚɞ˚‧｡⋆", n: "star cloud divider"},
{ s: "━━━━━━ ◦ ❖ ◦ ━━━━━━", n: "diamond divider"},
{ s: "· · ───── · ·", n: "minimal divider"},
{ s: "˚₊· ͟͟͞͞➳❥", n: "arrow heart divider"},
{ s: "«────── « ⋅ʚ♡ɞ⋅ » ──────»", n: "heart arrow divider"},
{ s: "✧˖°˖✧˖°˖✧", n: "star wave divider"},
{ s: "──── ⋆⋅☆⋅⋆ ────", n: "star line divider"},
{ s: "⊹₊ ⋆ ━━━━ ⋆ ₊⊹", n: "orbit divider"},
{ s: "✦. 　. ✦", n: "tiny star divider"},
{ s: "˚ ༘ ೀ ⋆｡˚", n: "soft star divider"},
],
},
{
id: "brackets-frames",
label: "Brackets & Frames",
items: [
{ s: "꒰୨୧꒱", n: "ornate brackets"},
{ s: "⟡", n: "white concave sided diamond"},
{ s: "「」", n: "corner brackets"},
{ s: "『』", n: "white corner brackets"},
{ s: "", n: "black lenticular brackets"},
{ s: "《》", n: "double angle brackets"},
{ s: "〈〉", n: "single angle brackets"},
{ s: "❲❳", n: "light left and right tortoise shell brackets"},
{ s: "❰❱", n: "heavy angle brackets"},
{ s: "〚〛", n: "black lenticular brackets"},
{ s: "⟨⟩", n: "mathematical angle brackets"},
{ s: "«»", n: "guillemets"},
{ s: "༺༻", n: "tibetan brackets"},
{ s: "⊹₊ ⋆", n: "star frame"},
{ s: "˚ ༘ ೀ", n: "soft frame"},
{ s: "⋆｡˚", n: "star frame tail"},
],
},
{
id: "arrows-lines",
label: "Arrows & Lines",
items: [
{ s: "➜", n: "heavy round tipped rightwards arrow"},
{ s: "➔", n: "heavy wide headed rightwards arrow"},
{ s: "➤", n: "black rightwards arrowhead"},
{ s: "➢", n: "black rightwards arrowhead"},
{ s: "➣", n: "white rightwards arrowhead"},
{ s: "⟶", n: "long rightwards arrow"},
{ s: "⟵", n: "long leftwards arrow"},
{ s: "↝", n: "rightwards wave arrow"},
{ s: "↜", n: "leftwards wave arrow"},
{ s: "⇢", n: "rightwards dashed arrow"},
{ s: "⇠", n: "leftwards dashed arrow"},
{ s: "─", n: "box drawings light horizontal"},
{ s: "━", n: "box drawings heavy horizontal"},
{ s: "│", n: "box drawings light vertical"},
{ s: "┃", n: "box drawings heavy vertical"},
{ s: "═", n: "box drawings double horizontal"},
{ s: "〜", n: "wave dash"},
{ s: "∿", n: "sine wave"},
],
},
{
id: "moons-nature",
label: "Moons & Nature",
items: [
{ s: "☾", n: "last quarter moon"},
{ s: "☽", n: "first quarter moon"},
{ s: "☼", n: "white sun with rays"},
{ s: "☀", n: "black sun with rays"},
{ s: "☁", n: "cloud"},
{ s: "☂", n: "umbrella"},
{ s: "☃", n: "snowman"},
{ s: "☄", n: "comet"},
{ s: "⋆", n: "star operator"},
{ s: "✧", n: "white four pointed star"},
{ s: "❄", n: "snowflake"},
{ s: "❅", n: "tight trifoliate snowflake"},
{ s: "❆", n: "heavy chevron snowflake"},
{ s: "☘", n: "shamrock"},
{ s: "♧", n: "white club suit"},
{ s: "♤", n: "white spade suit"},
],
},
];

const RECENT_KEY = "awt-aesthetic-recent";
const MAX_RECENT = 12;

function loadRecent(): string[] {
if (typeof window === "undefined") return [];
try {
const raw = window.localStorage.getItem(RECENT_KEY);
const parsed: unknown = raw? JSON.parse(raw): [];
return Array.isArray(parsed)
? parsed.filter((x): x is string => typeof x === "string").slice(0, MAX_RECENT)
: [];
} catch {
return [];
}
}

export function AestheticSymbols() {
const [category, setCategory] = useState("all");
const [query, setQuery] = useState("");
const [composed, setComposed] = useState("");
const [recent, setRecent] = useState<string[]>(loadRecent);

const visible = useMemo(() => {
const q = query.trim().toLowerCase();
return CATEGORIES.flatMap((c) =>
(category === "all" || c.id === category? c.items: []).map((item) => ({
...item,
categoryLabel: c.label,
fullWidth: c.fullWidth?? false,
})),
).filter((item) =>!q || item.n.toLowerCase().includes(q) || item.s.includes(query.trim()));
}, [category, query]);

const pushRecent = (symbol: string) => {
setRecent((prev) => {
const next = [symbol,...prev.filter((x) => x!== symbol)].slice(0, MAX_RECENT);
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
if (ok) toast.success("Copied to clipboard");
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

const gridItems = visible.filter((item) =>!item.fullWidth);
const rowItems = visible.filter((item) => item.fullWidth);

return (
<div className="space-y-5">
<div>
<Label htmlFor="as-search">Search aesthetic symbols</Label>
<div className="relative mt-1.5">
<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
<Input
id="as-search"
value={query}
onChange={(e) => setQuery(e.target.value)}
placeholder="Try “heart”, “divider”, “moon”…"
className="pl-9"
/>
</div>
</div>

<div className="flex flex-wrap gap-1.5">
<button
type="button"
onClick={() => setCategory("all")}
className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
category === "all"? "border-primary bg-primary text-primary-foreground": "hover:bg-muted"
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
category === c.id? "border-primary bg-primary text-primary-foreground": "hover:bg-muted"
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
className="flex min-h-[44px] items-center justify-center rounded-lg border px-3 text-lg transition-colors hover:bg-muted"
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
{visible.length === 0? (
<p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
No symbols match “{query}”. Try another word.
</p>
): (
<div className="space-y-3">
{rowItems.length > 0 && (
<div className="space-y-2">
{rowItems.map((item) => (
<button
key={`${item.categoryLabel}-${item.s}`}
type="button"
onClick={() => void onPick(item.s)}
title={item.n}
className="flex min-h-[44px] w-full items-center justify-center rounded-lg border px-3 py-2 text-lg transition-colors hover:border-primary hover:bg-muted"
>
{item.s}
</button>
))}
</div>
)}
{gridItems.length > 0 && (
<div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
{gridItems.map((item) => (
<button
key={`${item.categoryLabel}-${item.s}-${item.n}`}
type="button"
onClick={() => void onPick(item.s)}
title={item.n}
className="flex min-h-[56px] flex-col items-center justify-center gap-0.5 rounded-lg border px-1 py-2 transition-colors hover:border-primary hover:bg-muted"
>
<span className="max-w-full truncate text-xl leading-none">{item.s}</span>
<span className="max-w-full truncate px-1 text-[10px] text-muted-foreground">{item.n}</span>
</button>
))}
</div>
)}
</div>
)}
</div>

<div>
<div className="flex flex-wrap items-center justify-between gap-2">
<Label htmlFor="as-compose">
Compose box{composed? ` — ${composed.length} characters`: ""}
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
onClick={() => downloadText("aesthetic-symbols.txt", composed)}
>
<Download className="mr-1.5 h-3.5 w-3.5" />.txt
</Button>
<Button type="button" size="sm" variant="ghost" onClick={() => setComposed("")}>
<Eraser className="mr-1.5 h-3.5 w-3.5" /> Clear
</Button>
</div>
</div>
<Textarea
id="as-compose"
value={composed}
onChange={(e) => setComposed(e.target.value)}
rows={3}
placeholder="Tap symbols above to build your bio or caption here, or type your own…"
className="mt-1.5 text-lg"
/>
<p className="mt-2 text-xs text-muted-foreground">
Made for Instagram bios, TikTok captions and Discord statuses — copy your decoration and paste it anywhere.
</p>
</div>
</div>
);
}
