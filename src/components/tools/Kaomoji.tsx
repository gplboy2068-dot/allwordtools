import { useEffect, useMemo, useState } from "react";
import { Copy, Eraser, Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { copyText, downloadText } from "@/lib/engagement";

type KaomojiEntry = { face: string; tags: string };

const CATEGORIES: { id: string; label: string; items: KaomojiEntry[] }[] = [
  {
    id: "happy",
    label: "Happy",
    items: [
      { face: "(＾▽＾)", tags: "happy smile joy cheerful" },
      { face: "(^_^)", tags: "happy smile classic" },
      { face: "(⌒▽⌒)", tags: "happy smile joy" },
      { face: "(^▽^)", tags: "happy smile" },
      { face: "(≧▽≦)", tags: "happy excited joy" },
      { face: "(*^▽^*)", tags: "happy excited cute" },
      { face: "(＾ω＾)", tags: "happy smile cute" },
      { face: "ヽ(´▽`)/", tags: "happy excited yay arms up" },
      { face: "o(≧▽≦)o", tags: "happy excited" },
      { face: "(●'◡'●)", tags: "happy smile cute" },
      { face: "(✿◠‿◠)", tags: "happy smile cute flower" },
      { face: "(◕‿◕)", tags: "happy smile cute" },
      { face: "(◕‿◕✿)", tags: "happy cute flower" },
      { face: "(ʘ‿ʘ)", tags: "happy smile" },
      { face: "(*¯︶¯*)", tags: "happy grin" },
    ],
  },
  {
    id: "love",
    label: "Love",
    items: [
      { face: "(♥‿♥)", tags: "love heart eyes crush" },
      { face: "(♡´౪`♡)", tags: "love heart cute" },
      { face: "(´ε｀ )♡", tags: "love kiss heart" },
      { face: "(´꒳`)", tags: "love blush happy" },
      { face: "(´∀｀)♡", tags: "love happy heart" },
      { face: "(⁄ ⁄•⁄ω⁄•⁄ ⁄)", tags: "love blush shy" },
      { face: "(♡ω♡)", tags: "love heart" },
      { face: "(ღ˘⌣˘ღ)", tags: "love heart blush" },
      { face: "(˘⌣˘)♡", tags: "love heart smile" },
      { face: "(*˘︶˘*).｡.:*♡", tags: "love heart sparkle" },
      { face: "(◍•ᴗ•◍)❤", tags: "love heart cute" },
      { face: "(´▽`ʃ♡ƪ)", tags: "love heart hug" },
    ],
  },
  {
    id: "sad",
    label: "Sad",
    items: [
      { face: "(╥﹏╥)", tags: "sad cry tears" },
      { face: "(T_T)", tags: "sad cry tears" },
      { face: "(;_;)", tags: "sad cry" },
      { face: "(´；ω；`)", tags: "sad cry" },
      { face: "(｡•́︿•̀｡)", tags: "sad cry upset" },
      { face: "(︶︹︺)", tags: "sad disappointed" },
      { face: "(´･_･`)", tags: "sad down" },
      { face: "(｡╯︵╰｡)", tags: "sad cry" },
      { face: "(╯︵╰,)", tags: "sad sigh" },
      { face: "(；′⌒`)", tags: "sad sigh" },
      { face: "(´°̥̥̥̥̥̥̥̥ω°̥̥̥̥̥̥̥̥｀)", tags: "sad crying hard" },
      { face: "(ﾉಥ益ಥ）ﾉ", tags: "sad cry upset" },
    ],
  },
  {
    id: "angry",
    label: "Angry",
    items: [
      { face: "(#`Д´)", tags: "angry mad rage" },
      { face: "(╬ Ò﹏Ó)", tags: "angry mad" },
      { face: "(｀皿´)", tags: "angry mad" },
      { face: "(╬ಠ益ಠ)", tags: "angry rage" },
      { face: "(ಠ益ಠ)", tags: "angry disapproval mad" },
      { face: "凸(｀0´)凸", tags: "angry middle finger rude" },
      { face: "(╯°□°)╯︵ ┻━┻", tags: "angry table flip rage" },
      { face: "┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻", tags: "angry double table flip" },
      { face: "(╯‵□′)╯︵┻━┻", tags: "angry table flip" },
      { face: "(ノಠ ∩ಠ)ノ彡( \\o°o)\\", tags: "angry throw" },
      { face: "(；￣Д￣)", tags: "angry annoyed" },
      { face: "(＃｀д´)ﾉ", tags: "angry mad" },
    ],
  },
  {
    id: "shrug",
    label: "Shrug & Actions",
    items: [
      { face: "¯\\_(ツ)_/¯", tags: "shrug whatever dunno" },
      { face: "¯\\_(⊙_ʖ⊙)_/¯", tags: "shrug whatever" },
      { face: "┬─┬ノ( º _ ºノ)", tags: "unflip calm table back" },
      { face: "(╯°□°)╯︵ ┻━┻", tags: "table flip rage" },
      { face: "┬─┬﻿ ︵ /(.□. \\）", tags: "table flip" },
      { face: "( ͡° ͜ʖ ͡°)", tags: "lenny face smirk" },
      { face: "( ͡~ ͜ʖ ͡°)", tags: "lenny wink" },
      { face: "ヽ(⌐■_■)ノ♪♬", tags: "deal with it cool music" },
      { face: "(☞ﾟヮﾟ)☞", tags: "pointing hey you" },
      { face: "☜(ﾟヮﾟ☜)", tags: "pointing" },
      { face: "t(-_-t)", tags: "middle finger rude" },
      { face: "ᕕ( ᐛ )ᕗ", tags: "running fast" },
      { face: "┌(・。・)┘♪", tags: "dancing music" },
      { face: "ε=ε=ε=┌(;￣◇￣)┘", tags: "running dash" },
    ],
  },
  {
    id: "animals",
    label: "Animals",
    items: [
      { face: "(=^･ｪ･^=)", tags: "cat kitty neko" },
      { face: "(=^･ω･^=)", tags: "cat kitty" },
      { face: "(=^ ◡ ^=)", tags: "cat kitty smile" },
      { face: "ʕ•ᴥ•ʔ", tags: "bear cute" },
      { face: "ʕ￫ᴥ￩ʔ", tags: "bear cute" },
      { face: "(ᵔᴥᵔ)", tags: "bear dog cute" },
      { face: "U・ᴥ・U", tags: "dog puppy" },
      { face: "U・x・U", tags: "dog puppy" },
      { face: "V●ᴥ●V", tags: "dog puppy" },
      { face: "(╯°□°)╯", tags: "bear arms" },
      { face: "(\\(\\", tags: "bunny rabbit ears" },
      { face: "(●´ω｀●)", tags: "bunny rabbit cute" },
      { face: "(◕‿◕)♡", tags: "bunny cute" },
      { face: "(・_・;)", tags: "penguin" },
      { face: "＼(＾O＾)／", tags: "bird happy" },
      { face: "(￣(ｴ)￣)", tags: "monkey" },
    ],
  },
  {
    id: "sleepy",
    label: "Sleepy",
    items: [
      { face: "(-_-)zzz", tags: "sleepy sleeping zzz tired" },
      { face: "(－_－) zzZ", tags: "sleepy sleeping" },
      { face: "(¦3[▓▓]", tags: "sleeping bed" },
      { face: "(－ｏ－) zzZ", tags: "sleepy sleeping" },
      { face: "(∪。∪)。。。zzz", tags: "sleepy sleeping" },
      { face: "(￣o￣) zzZZzz", tags: "sleepy snoring" },
      { face: "(˘﹃˘) zzz", tags: "sleepy drool" },
      { face: "(ᴗ˳ᴗ)", tags: "sleepy tired" },
      { face: "(￣﹃￣)", tags: "sleepy drooling" },
      { face: "(￣ρ￣)..zzZZ", tags: "sleepy snoring" },
    ],
  },
  {
    id: "surprised",
    label: "Surprised",
    items: [
      { face: "(⊙_⊙)", tags: "surprised shocked wow" },
      { face: "(O_O)", tags: "surprised shocked" },
      { face: "(o_O)", tags: "surprised confused" },
      { face: "(°ロ°)", tags: "surprised shocked" },
      { face: "Σ(ﾟДﾟ)", tags: "surprised shocked" },
      { face: "Σ(°△°|||)︴", tags: "surprised shocked" },
      { face: "(⊙.⊙)", tags: "surprised" },
      { face: "w(°ｏ°)w", tags: "surprised wow" },
      { face: "(＠_＠)", tags: "surprised wow" },
      { face: "(ﾟoﾟ;", tags: "surprised shocked" },
      { face: "（；￣ェ￣）", tags: "surprised awkward" },
    ],
  },
  {
    id: "embarrassed",
    label: "Embarrassed",
    items: [
      { face: "(/ω＼)", tags: "embarrassed shy blush" },
      { face: "(//ω//)", tags: "embarrassed blush shy" },
      { face: "(〃ω〃)", tags: "embarrassed shy" },
      { face: "(*/ω＼*)", tags: "embarrassed shy cute" },
      { face: "(ノ_<)", tags: "embarrassed shy" },
      { face: "(⁄ ⁄>⁄ω⁄<⁄ ⁄)", tags: "embarrassed shy blush" },
      { face: "(〃∀〃)", tags: "embarrassed shy" },
      { face: "(>///<)", tags: "embarrassed blush" },
      { face: "(ﾉω＼)", tags: "embarrassed shy" },
      { face: "(//∇//)", tags: "embarrassed blush" },
      { face: "(〃ﾉωﾉ)", tags: "embarrassed shy" },
    ],
  },
  {
    id: "celebration",
    label: "Celebration",
    items: [
      { face: "ヽ(•‿•)ノ", tags: "celebration yay happy arms" },
      { face: "＼(＾▽＾)／", tags: "celebration yay hurray" },
      { face: "♪(´▽｀)", tags: "celebration music happy" },
      { face: "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧", tags: "celebration sparkle magic" },
      { face: "✧･ﾟ: *✧･ﾟ:*", tags: "celebration sparkle stars" },
      { face: "☆*:.｡.o(≧▽≦)o.｡.:*☆", tags: "celebration sparkle excited" },
      { face: "ヽ(★▽★)ノ", tags: "celebration star excited" },
      { face: "(ﾉ´ヮ`)ﾉ*: ･ﾟ", tags: "celebration confetti" },
      { face: "٩(◕‿◕)۶", tags: "celebration yay arms up" },
      { face: "＼(^o^)／", tags: "celebration hurray" },
      { face: "♪♪(●￣▽￣●)♪♪", tags: "celebration music" },
      { face: "(ﾉ^_^)ﾉ", tags: "celebration wave" },
    ],
  },
];

const RECENT_KEY = "awt-kaomoji-recent";
const MAX_RECENT = 12;

export function Kaomoji() {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [composed, setComposed] = useState("");
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(RECENT_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setRecent(parsed.filter((v) => typeof v === "string").slice(0, MAX_RECENT));
      }
    } catch {
      // storage unavailable — recents just stay empty
    }
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const cats = category === "all" ? CATEGORIES : CATEGORIES.filter((c) => c.id === category);
    return cats
      .map((c) => ({
        ...c,
        items: q ? c.items.filter((it) => it.face.toLowerCase().includes(q) || it.tags.includes(q)) : c.items,
      }))
      .filter((c) => c.items.length > 0);
  }, [category, query]);

  const totalCount = CATEGORIES.reduce((n, c) => n + c.items.length, 0);

  const remember = (face: string) => {
    setRecent((prev) => {
      const next = [face, ...prev.filter((v) => v !== face)].slice(0, MAX_RECENT);
      try {
        window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  const onCopyFace = async (face: string) => {
    const ok = await copyText(face);
    if (ok) {
      remember(face);
      toast.success("Kaomoji copied");
    } else {
      toast.error("Copy failed — select the kaomoji and copy manually");
    }
  };

  const onAppend = (face: string) => {
    setComposed((prev) => (prev ? `${prev} ${face}` : face));
    remember(face);
  };

  const onCopyComposed = async () => {
    if (!composed) return;
    const ok = await copyText(composed);
    if (ok) toast.success("Copied");
    else toast.error("Copy failed — select the text and copy manually");
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => setCategory("all")}
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
            category === "all" ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted"
          }`}
        >
          All ({totalCount})
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
            {c.label} ({c.items.length})
          </button>
        ))}
      </div>

      <div>
        <Label htmlFor="kaomoji-search">Search kaomoji</Label>
        <div className="relative mt-1.5">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="kaomoji-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try “cat”, “cry”, “shrug”, “love”…"
            className="pl-9"
          />
        </div>
      </div>

      {recent.length > 0 && (
        <div>
          <Label>Recently copied</Label>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {recent.map((face) => (
              <button
                key={face}
                type="button"
                onClick={() => onCopyFace(face)}
                title="Tap to copy"
                className="rounded-lg border px-3 py-1.5 text-base transition-colors hover:border-primary hover:bg-muted"
              >
                {face}
              </button>
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-dashed py-8 text-center text-sm text-muted-foreground">
          No kaomoji match “{query}” — try another word like “happy” or “cat”.
        </p>
      ) : (
        filtered.map((c) => (
          <div key={c.id}>
            <h3 className="mb-2 text-sm font-semibold">{c.label}</h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {c.items.map((it) => (
                <div
                  key={it.face}
                  className="group rounded-xl border bg-card p-2 text-center transition-colors hover:border-primary"
                >
                  <button
                    type="button"
                    onClick={() => onCopyFace(it.face)}
                    title="Tap to copy"
                    className="block w-full truncate px-1 py-2 text-xl leading-snug"
                  >
                    {it.face}
                  </button>
                  <div className="flex justify-center gap-1">
                    <Button type="button" size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={() => onCopyFace(it.face)}>
                      <Copy className="mr-1 h-3 w-3" /> Copy
                    </Button>
                    <Button type="button" size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={() => onAppend(it.face)}>
                      <Plus className="mr-1 h-3 w-3" /> Add
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Label htmlFor="kaomoji-compose">Your kaomoji message</Label>
          <div className="flex gap-1.5">
            <Button type="button" size="sm" variant="outline" onClick={onCopyComposed} disabled={!composed}>
              <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={!composed}
              onClick={() => downloadText("kaomoji.txt", composed)}
            >
              Copy as .txt
            </Button>
            <Button type="button" size="sm" variant="ghost" onClick={() => setComposed("")}>
              <Eraser className="mr-1.5 h-3.5 w-3.5" /> Clear
            </Button>
          </div>
        </div>
        <Textarea
          id="kaomoji-compose"
          value={composed}
          onChange={(e) => setComposed(e.target.value)}
          rows={3}
          placeholder="Tap “Add” on any kaomoji to build a message here, or type your own…"
          className="mt-1.5 text-base"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          Kaomoji are plain Unicode text — they paste into iMessage, WhatsApp, Instagram, Discord and anywhere else, on iPhone and Android alike.
        </p>
      </div>
    </div>
  );
}
