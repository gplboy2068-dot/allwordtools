import { useMemo, useState } from "react";
import { Copy, Download, Eraser, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { copyText, downloadText } from "@/lib/engagement";

type EmojiItem = { e: string; n: string };
type EmojiCategory = { id: string; label: string; items: EmojiItem[] };

const CATEGORIES: EmojiCategory[] = [
  {
    id: "smileys",
    label: "Smileys",
    items: [
      { e: "😀", n: "grinning face" },
      { e: "😃", n: "grinning face with big eyes" },
      { e: "😄", n: "grinning face with smiling eyes" },
      { e: "😁", n: "beaming face with smiling eyes" },
      { e: "😆", n: "grinning squinting face" },
      { e: "😅", n: "grinning face with sweat" },
      { e: "😂", n: "face with tears of joy" },
      { e: "🤣", n: "rolling on the floor laughing" },
      { e: "😊", n: "smiling face with smiling eyes" },
      { e: "😇", n: "smiling face with halo" },
      { e: "🙂", n: "slightly smiling face" },
      { e: "🙃", n: "upside-down face" },
      { e: "😉", n: "winking face" },
      { e: "😍", n: "smiling face with heart-eyes" },
      { e: "😘", n: "face blowing a kiss" },
      { e: "😜", n: "winking face with tongue" },
      { e: "🤪", n: "zany face" },
      { e: "😎", n: "smiling face with sunglasses" },
      { e: "🤩", n: "star-struck" },
      { e: "🥳", n: "partying face" },
      { e: "😏", n: "smirking face" },
      { e: "😌", n: "relieved face" },
      { e: "😴", n: "sleeping face" },
      { e: "🤯", n: "exploding head" },
      { e: "🥺", n: "pleading face" },
      { e: "😢", n: "crying face" },
      { e: "😭", n: "loudly crying face" },
      { e: "😤", n: "face with steam from nose" },
      { e: "😡", n: "enraged face" },
      { e: "🤔", n: "thinking face" },
      { e: "🙄", n: "face with rolling eyes" },
      { e: "😬", n: "grimacing face" },
    ],
  },
  {
    id: "people",
    label: "People",
    items: [
      { e: "👋", n: "waving hand" },
      { e: "🤚", n: "raised back of hand" },
      { e: "🖐️", n: "hand with fingers splayed" },
      { e: "✋", n: "raised hand" },
      { e: "🖖", n: "vulcan salute" },
      { e: "👌", n: "OK hand" },
      { e: "🤌", n: "pinched fingers" },
      { e: "🤏", n: "pinching hand" },
      { e: "✌️", n: "victory hand" },
      { e: "🤞", n: "crossed fingers" },
      { e: "🫰", n: "hand with index finger and thumb crossed" },
      { e: "🤟", n: "love-you gesture" },
      { e: "🤘", n: "sign of the horns" },
      { e: "🤙", n: "call me hand" },
      { e: "👈", n: "backhand index pointing left" },
      { e: "👉", n: "backhand index pointing right" },
      { e: "👆", n: "backhand index pointing up" },
      { e: "👇", n: "backhand index pointing down" },
      { e: "☝️", n: "index pointing up" },
      { e: "👍", n: "thumbs up" },
      { e: "👎", n: "thumbs down" },
      { e: "👊", n: "oncoming fist" },
      { e: "✊", n: "raised fist" },
      { e: "👏", n: "clapping hands" },
      { e: "🙌", n: "raising hands" },
      { e: "👐", n: "open hands" },
      { e: "🤲", n: "palms up together" },
      { e: "🤝", n: "handshake" },
      { e: "🙏", n: "folded hands" },
      { e: "💪", n: "flexed biceps" },
      { e: "🧠", n: "brain" },
      { e: "👀", n: "eyes" },
    ],
  },
  {
    id: "animals",
    label: "Animals",
    items: [
      { e: "🐶", n: "dog face" },
      { e: "🐱", n: "cat face" },
      { e: "🐭", n: "mouse face" },
      { e: "🐹", n: "hamster" },
      { e: "🐰", n: "rabbit face" },
      { e: "🦊", n: "fox" },
      { e: "🐻", n: "bear" },
      { e: "🐼", n: "panda" },
      { e: "🐨", n: "koala" },
      { e: "🐯", n: "tiger face" },
      { e: "🦁", n: "lion" },
      { e: "🐮", n: "cow face" },
      { e: "🐷", n: "pig face" },
      { e: "🐸", n: "frog" },
      { e: "🐵", n: "monkey face" },
      { e: "🙈", n: "see-no-evil monkey" },
      { e: "🙉", n: "hear-no-evil monkey" },
      { e: "🙊", n: "speak-no-evil monkey" },
      { e: "🐔", n: "chicken" },
      { e: "🐧", n: "penguin" },
      { e: "🐦", n: "bird" },
      { e: "🦄", n: "unicorn" },
      { e: "🐝", n: "honeybee" },
      { e: "🦋", n: "butterfly" },
      { e: "🐢", n: "turtle" },
      { e: "🐙", n: "octopus" },
      { e: "🦖", n: "T-Rex" },
      { e: "🦕", n: "sauropod" },
      { e: "🐳", n: "spouting whale" },
      { e: "🐬", n: "dolphin" },
      { e: "🦈", n: "shark" },
      { e: "🐊", n: "crocodile" },
    ],
  },
  {
    id: "food",
    label: "Food",
    items: [
      { e: "🍎", n: "red apple" },
      { e: "🍐", n: "pear" },
      { e: "🍊", n: "tangerine" },
      { e: "🍋", n: "lemon" },
      { e: "🍉", n: "watermelon" },
      { e: "🍇", n: "grapes" },
      { e: "🍓", n: "strawberry" },
      { e: "🫐", n: "blueberries" },
      { e: "🍒", n: "cherries" },
      { e: "🍑", n: "peach" },
      { e: "🥭", n: "mango" },
      { e: "🍍", n: "pineapple" },
      { e: "🥥", n: "coconut" },
      { e: "🥝", n: "kiwi fruit" },
      { e: "🍅", n: "tomato" },
      { e: "🥑", n: "avocado" },
      { e: "🌶️", n: "hot pepper" },
      { e: "🌽", n: "ear of corn" },
      { e: "🥕", n: "carrot" },
      { e: "🍞", n: "bread" },
      { e: "🧀", n: "cheese wedge" },
      { e: "🍗", n: "poultry leg" },
      { e: "🍔", n: "hamburger" },
      { e: "🍟", n: "french fries" },
      { e: "🍕", n: "pizza" },
      { e: "🌭", n: "hot dog" },
      { e: "🌮", n: "taco" },
      { e: "🥗", n: "green salad" },
      { e: "🍜", n: "steaming bowl" },
      { e: "🍣", n: "sushi" },
      { e: "🍦", n: "soft ice cream" },
      { e: "🎂", n: "birthday cake" },
    ],
  },
  {
    id: "activities",
    label: "Activities",
    items: [
      { e: "⚽", n: "soccer ball" },
      { e: "🏀", n: "basketball" },
      { e: "🏈", n: "american football" },
      { e: "⚾", n: "baseball" },
      { e: "🥎", n: "softball" },
      { e: "🎾", n: "tennis" },
      { e: "🏐", n: "volleyball" },
      { e: "🏉", n: "rugby football" },
      { e: "🎱", n: "pool 8 ball" },
      { e: "🏓", n: "ping pong" },
      { e: "🏸", n: "badminton" },
      { e: "🥅", n: "goal net" },
      { e: "🏒", n: "ice hockey" },
      { e: "🛹", n: "skateboard" },
      { e: "🎮", n: "video game controller" },
      { e: "🎲", n: "game die" },
      { e: "🧩", n: "puzzle piece" },
      { e: "♟️", n: "chess pawn" },
      { e: "🎯", n: "bullseye" },
      { e: "🎳", n: "bowling" },
      { e: "🎤", n: "microphone" },
      { e: "🎧", n: "headphone" },
      { e: "🎸", n: "guitar" },
      { e: "🎹", n: "musical keyboard" },
      { e: "🥁", n: "drum" },
      { e: "🎬", n: "clapper board" },
      { e: "🎨", n: "artist palette" },
      { e: "🎭", n: "performing arts" },
      { e: "🏆", n: "trophy" },
      { e: "🥇", n: "1st place medal" },
    ],
  },
  {
    id: "travel",
    label: "Travel",
    items: [
      { e: "🚗", n: "automobile" },
      { e: "🚕", n: "taxi" },
      { e: "🚙", n: "sport utility vehicle" },
      { e: "🚌", n: "bus" },
      { e: "🏎️", n: "racing car" },
      { e: "🚓", n: "police car" },
      { e: "🚑", n: "ambulance" },
      { e: "🚒", n: "fire engine" },
      { e: "🚐", n: "minibus" },
      { e: "🛻", n: "pickup truck" },
      { e: "🚚", n: "delivery truck" },
      { e: "🚜", n: "tractor" },
      { e: "🏍️", n: "motorcycle" },
      { e: "🛵", n: "motor scooter" },
      { e: "🚲", n: "bicycle" },
      { e: "🛴", n: "kick scooter" },
      { e: "🚁", n: "helicopter" },
      { e: "✈️", n: "airplane" },
      { e: "🛫", n: "airplane departure" },
      { e: "🛬", n: "airplane arrival" },
      { e: "🚀", n: "rocket" },
      { e: "🛸", n: "flying saucer" },
      { e: "🚂", n: "locomotive" },
      { e: "🚊", n: "tram" },
      { e: "🚤", n: "speedboat" },
      { e: "⛵", n: "sailboat" },
      { e: "⚓", n: "anchor" },
      { e: "🗼", n: "Tokyo tower" },
      { e: "🗽", n: "Statue of Liberty" },
      { e: "🏖️", n: "beach with umbrella" },
    ],
  },
  {
    id: "objects",
    label: "Objects",
    items: [
      { e: "⌚", n: "watch" },
      { e: "📱", n: "mobile phone" },
      { e: "💻", n: "laptop" },
      { e: "⌨️", n: "keyboard" },
      { e: "🖥️", n: "desktop computer" },
      { e: "🖨️", n: "printer" },
      { e: "🖱️", n: "computer mouse" },
      { e: "💾", n: "floppy disk" },
      { e: "💿", n: "optical disc" },
      { e: "📷", n: "camera" },
      { e: "📸", n: "camera with flash" },
      { e: "📹", n: "video camera" },
      { e: "📺", n: "television" },
      { e: "📻", n: "radio" },
      { e: "🔦", n: "flashlight" },
      { e: "🔋", n: "battery" },
      { e: "🔌", n: "electric plug" },
      { e: "💡", n: "light bulb" },
      { e: "🕯️", n: "candle" },
      { e: "🧰", n: "toolbox" },
      { e: "🔧", n: "wrench" },
      { e: "🔨", n: "hammer" },
      { e: "⚙️", n: "gear" },
      { e: "🧲", n: "magnet" },
      { e: "🔑", n: "key" },
      { e: "🔒", n: "locked" },
      { e: "🧸", n: "teddy bear" },
      { e: "🎁", n: "wrapped gift" },
      { e: "🎈", n: "balloon" },
      { e: "🛍️", n: "shopping bags" },
    ],
  },
  {
    id: "symbols-flags",
    label: "Symbols & Flags",
    items: [
      { e: "❤️", n: "red heart" },
      { e: "🧡", n: "orange heart" },
      { e: "💛", n: "yellow heart" },
      { e: "💚", n: "green heart" },
      { e: "💙", n: "blue heart" },
      { e: "💜", n: "purple heart" },
      { e: "🖤", n: "black heart" },
      { e: "🤍", n: "white heart" },
      { e: "💔", n: "broken heart" },
      { e: "💯", n: "hundred points" },
      { e: "💢", n: "anger symbol" },
      { e: "💥", n: "collision" },
      { e: "💫", n: "dizzy" },
      { e: "💦", n: "sweat droplets" },
      { e: "💨", n: "dashing away" },
      { e: "💬", n: "speech balloon" },
      { e: "💭", n: "thought balloon" },
      { e: "💤", n: "zzz" },
      { e: "⭐", n: "star" },
      { e: "🌟", n: "glowing star" },
      { e: "✨", n: "sparkles" },
      { e: "⚡", n: "high voltage" },
      { e: "🔥", n: "fire" },
      { e: "🌈", n: "rainbow" },
      { e: "☀️", n: "sun" },
      { e: "🌙", n: "crescent moon" },
      { e: "🇺🇸", n: "flag United States" },
      { e: "🇬🇧", n: "flag United Kingdom" },
      { e: "🇨🇦", n: "flag Canada" },
      { e: "🇦🇺", n: "flag Australia" },
    ],
  },
];

const RECENT_KEY = "awt-iphone-emoji-recent";
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

export function IphoneEmoji() {
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
    ).filter((item) => !q || item.n.toLowerCase().includes(q));
  }, [category, query]);

  const pushRecent = (emoji: string) => {
    setRecent((prev) => {
      const next = [emoji, ...prev.filter((x) => x !== emoji)].slice(0, MAX_RECENT);
      try {
        window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      } catch {
        /* storage unavailable — ignore */
      }
      return next;
    });
  };

  const onPick = async (emoji: string) => {
    const ok = await copyText(emoji);
    if (ok) toast.success(`Copied ${emoji}`);
    else toast.error("Copy failed — select the emoji and copy manually");
    setComposed((prev) => prev + emoji);
    pushRecent(emoji);
  };

  const onCopyComposed = async () => {
    if (!composed) return;
    const ok = await copyText(composed);
    if (ok) toast.success("Emoji text copied");
    else toast.error("Copy failed — select the text and copy manually");
  };

  return (
    <div className="space-y-5">
      <div>
        <Label htmlFor="ie-search">Search emoji by name</Label>
        <div className="relative mt-1.5">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="ie-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try “cat”, “pizza”, “rocket”…"
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
            {recent.map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => void onPick(e)}
                aria-label={`Copy ${e}`}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border px-2 text-2xl transition-colors hover:bg-muted"
              >
                {e}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="mb-2 text-xs text-muted-foreground">
          Tap any emoji to copy it — it is also added to your compose box below.
        </p>
        {visible.length === 0 ? (
          <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
            No emoji match “{query}”. Try another word.
          </p>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
            {visible.map((item) => (
              <button
                key={`${item.categoryLabel}-${item.e}-${item.n}`}
                type="button"
                onClick={() => void onPick(item.e)}
                title={item.n}
                className="flex min-h-[56px] flex-col items-center justify-center gap-0.5 rounded-lg border px-1 py-2 transition-colors hover:border-primary hover:bg-muted"
              >
                <span className="text-2xl leading-none">{item.e}</span>
                <span className="max-w-full truncate px-1 text-[10px] text-muted-foreground">{item.n}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Label htmlFor="ie-compose">
            Compose box{composed ? ` — ${[...composed].length} emoji` : ""}
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
              onClick={() => downloadText("iphone-emoji.txt", composed)}
            >
              <Download className="mr-1.5 h-3.5 w-3.5" /> .txt
            </Button>
            <Button type="button" size="sm" variant="ghost" onClick={() => setComposed("")}>
              <Eraser className="mr-1.5 h-3.5 w-3.5" /> Clear
            </Button>
          </div>
        </div>
        <Textarea
          id="ie-compose"
          value={composed}
          onChange={(e) => setComposed(e.target.value)}
          rows={3}
          placeholder="Tap emoji above to build your message here, or type your own…"
          className="mt-1.5 text-lg"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          Emoji render in Apple&apos;s style on iPhone and iPad — copy from here and paste into Messages, Instagram, Notes or any other app.
        </p>
      </div>
    </div>
  );
}
