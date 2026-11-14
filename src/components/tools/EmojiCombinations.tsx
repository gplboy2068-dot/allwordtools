import { useMemo, useState } from "react";
import { Copy, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { copyText } from "@/lib/engagement";

type Combo = { combo: string; label: string };
type ComboTheme = { id: string; label: string; items: Combo[] };

const THEMES: ComboTheme[] = [
  {
    id: "aesthetic",
    label: "Aesthetic",
    items: [
      { combo: "🌸✨🦋💫", label: "Soft pastel vibes" },
      { combo: "☁️🌙✨💭", label: "Dreamy night sky" },
      { combo: "🕊️🤍✨🌿", label: "Clean and calm" },
      { combo: "🎀🌷💗✧", label: "Coquette core" },
      { combo: "🌊🐚🫧💙", label: "Ocean dream" },
      { combo: "🍓🧸🎀💕", label: "Strawberry milk" },
    ],
  },
  {
    id: "love",
    label: "Love",
    items: [
      { combo: "❤️‍🔥💌🥰💋", label: "Burning love" },
      { combo: "💘💝💖💞", label: "Hearts everywhere" },
      { combo: "😍🥰😘💋", label: "Crushing hard" },
      { combo: "💑💍❤️🌹", label: "Forever together" },
      { combo: "🫶❤️✨💌", label: "Heart hands love" },
      { combo: "🥺❤️🫂💕", label: "Soft and sweet" },
    ],
  },
  {
    id: "birthday",
    label: "Birthday",
    items: [
      { combo: "🎂🎉🥳🎁🎈", label: "Birthday bash" },
      { combo: "🎂🕯️🎊🥂🍾", label: "Make a wish" },
      { combo: "🎈🎁🧁🍰🎉", label: "Cake and gifts" },
      { combo: "🥳🎂🎶💃🕺", label: "Dance party" },
      { combo: "🎂🍾🥂🎉✨", label: "Cheers to you" },
      { combo: "🎁🎈🎂🎊🎶", label: "Birthday surprise" },
    ],
  },
  {
    id: "nature",
    label: "Nature",
    items: [
      { combo: "🌿🌸🦋🐝🌞", label: "Spring meadow" },
      { combo: "🌲🏔️🌄🦌🌲", label: "Mountain morning" },
      { combo: "🌊🐚🌴☀️🏖️", label: "Beach escape" },
      { combo: "🍂🍁🌰🦔🍄", label: "Autumn forest" },
      { combo: "🌷🌻🌼🌺🌸", label: "Flower garden" },
      { combo: "🌧️🌈⛈️🌦️☁️", label: "Rain and rainbows" },
    ],
  },
  {
    id: "food",
    label: "Food",
    items: [
      { combo: "🍕🍔🍟🥤🌭", label: "Fast food feast" },
      { combo: "🍣🍱🍜🍤🥢", label: "Sushi night" },
      { combo: "🍦🍨🍩🍪🧁", label: "Sweet tooth" },
      { combo: "☕🥐🍳🥓🧇", label: "Brunch time" },
      { combo: "🌮🌯🥑🍋🌶️", label: "Taco Tuesday" },
      { combo: "🍓🍇🫐🍒🥝", label: "Berry fresh" },
    ],
  },
  {
    id: "party",
    label: "Party",
    items: [
      { combo: "🥳🎉🎊🍾🥂", label: "Let's celebrate" },
      { combo: "🪩💃🕺🎶🎤", label: "Disco night" },
      { combo: "🎆🎇✨🥂🍾", label: "New Year's Eve" },
      { combo: "🎭🎪🤹🎠🎡", label: "Carnival fun" },
      { combo: "🍸🍹🧉🎶💃", label: "Cocktail hour" },
      { combo: "🕺💃🎧🔥🎉", label: "Dance floor" },
    ],
  },
  {
    id: "sad",
    label: "Sad",
    items: [
      { combo: "😢💔🥀🌧️😔", label: "Heartbreak rain" },
      { combo: "😭💔🖤🥀🌑", label: "Midnight tears" },
      { combo: "🥺😔💭🌧️☁️", label: "Feeling blue" },
      { combo: "💔🥀🕯️🌑😞", label: "Goodbye for now" },
      { combo: "😿💔🌧️🥀", label: "Lonely kitty" },
      { combo: "🌧️😢🖤💭🥀", label: "Rainy mood" },
    ],
  },
  {
    id: "summer",
    label: "Summer",
    items: [
      { combo: "☀️🏖️🌊🍉🕶️", label: "Beach day" },
      { combo: "🌴🥥🍹🏄🌺", label: "Tropical escape" },
      { combo: "🍦🌞👙🩴⛱️", label: "Poolside chill" },
      { combo: "🚣🌊🐚🦀🏝️", label: "Island life" },
      { combo: "🧴🕶️🍋🌞🌻", label: "Sunshine state" },
      { combo: "🎣🚤🌅🏕️🔥", label: "Lakeside summer" },
    ],
  },
  {
    id: "winter",
    label: "Winter",
    items: [
      { combo: "❄️☃️🧣🧤⛷️", label: "Snow day" },
      { combo: "🎄🎅🤶🎁🦌", label: "Christmas magic" },
      { combo: "☕🧦🔥📖🕯️", label: "Cosy night in" },
      { combo: "🏂⛸️❄️🧊🌨️", label: "Winter sports" },
      { combo: "🎄✨🔔🕯️🍷", label: "Holiday evening" },
      { combo: "🌨️🧣☃️🍫☕", label: "Hot chocolate weather" },
    ],
  },
  {
    id: "animals",
    label: "Animals",
    items: [
      { combo: "🐶🐱🐹🐰🦊", label: "Pet parade" },
      { combo: "🦁🐯🐻🐼🐨", label: "Wild ones" },
      { combo: "🦋🐝🐞🌸🌼", label: "Garden friends" },
      { combo: "🐢🐙🐬🐳🦈", label: "Ocean crew" },
      { combo: "🦄🌈✨🦋💫", label: "Magical creatures" },
      { combo: "🐸🐛🐌🍄🌿", label: "Forest floor" },
    ],
  },
];

export function EmojiCombinations() {
  const [theme, setTheme] = useState("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return THEMES.flatMap((t) =>
      (theme === "all" || t.id === theme ? t.items : []).map((item) => ({
        ...item,
        themeLabel: t.label,
      })),
    ).filter(
      (item) =>
        !q ||
        item.label.toLowerCase().includes(q) ||
        item.themeLabel.toLowerCase().includes(q) ||
        item.combo.includes(query.trim()),
    );
  }, [theme, query]);

  const onCopy = async (item: Combo) => {
    const ok = await copyText(item.combo);
    if (ok) toast.success(`Copied ${item.combo}`);
    else toast.error("Copy failed — select the combo and copy manually");
  };

  return (
    <div className="space-y-5">
      <div>
        <Label htmlFor="ec-search">Search combinations</Label>
        <div className="relative mt-1.5">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="ec-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try “birthday”, “summer”, “love”…"
            className="pl-9"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => setTheme("all")}
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
            theme === "all" ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted"
          }`}
        >
          All
        </button>
        {THEMES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTheme(t.id)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              theme === t.id ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        Tap any card to copy the whole combo. {visible.length} combinations shown.
      </p>

      {visible.length === 0 ? (
        <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
          No combinations match “{query}”. Try another word.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <article
              key={`${item.themeLabel}-${item.combo}`}
              className="rounded-lg border p-4 transition-colors hover:border-primary"
            >
              <button
                type="button"
                onClick={() => void onCopy(item)}
                title={`Copy ${item.combo}`}
                className="block min-h-[44px] w-full text-left text-3xl leading-snug"
              >
                {item.combo}
              </button>
              <div className="mt-2 flex items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-medium">{item.label}</h3>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{item.themeLabel}</p>
                </div>
                <Button type="button" size="sm" variant="outline" onClick={() => void onCopy(item)}>
                  <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Perfect for Instagram bios, TikTok captions, Discord statuses and WhatsApp messages — copy a combo and paste it anywhere.
      </p>
    </div>
  );
}
