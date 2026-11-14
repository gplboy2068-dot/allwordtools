import { useMemo, useState } from "react";
import { Copy, Download, Eraser } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { copyText, downloadText } from "@/lib/engagement";

const MAX_INPUT = 5000;

// Common English words mapped to emoji. Keys are lowercase singular forms;
// the matcher also accepts a trailing "s" so plurals translate too.
const WORDS: Record<string, string> = {
  // Feelings & expressions
  love: "❤️",
  adore: "😍",
  like: "👍",
  happy: "😊",
  happiness: "😊",
  joy: "😄",
  joyful: "😄",
  smile: "😄",
  smiling: "😄",
  laugh: "😂",
  laughing: "😂",
  funny: "😂",
  hilarious: "🤣",
  joke: "🤣",
  sad: "😢",
  sadness: "😢",
  cry: "😭",
  crying: "😭",
  tears: "😭",
  angry: "😠",
  anger: "😠",
  mad: "😡",
  furious: "😡",
  scared: "😨",
  fear: "😱",
  afraid: "😨",
  surprised: "😲",
  surprise: "😲",
  shock: "😲",
  shocked: "😲",
  wow: "😮",
  amazing: "🤩",
  awesome: "🤩",
  excited: "🤩",
  excitement: "🤩",
  cool: "😎",
  sleepy: "😴",
  tired: "😪",
  exhausted: "😫",
  sick: "🤒",
  ill: "🤒",
  crazy: "🤪",
  silly: "🤪",
  shy: "🙈",
  embarrassed: "🙈",
  wink: "😉",
  kiss: "😘",
  hug: "🤗",
  cuddle: "🤗",
  heart: "❤️",
  heartbreak: "💔",
  broken: "💔",
  bored: "🥱",
  boring: "🥱",
  confused: "😕",
  confusion: "😕",
  nervous: "😬",
  anxious: "😟",
  worried: "😟",
  proud: "😤",
  calm: "😌",
  peace: "☮️",
  peaceful: "😌",
  fun: "🎉",
  celebrate: "🎉",
  celebration: "🎉",
  congratulations: "🎊",
  congrats: "🎊",
  luck: "🍀",
  lucky: "🍀",
  magic: "✨",
  sparkle: "✨",
  star: "⭐",
  fire: "🔥",
  lit: "🔥",
  hot: "🥵",
  cold: "🥶",
  freezing: "🥶",
  beautiful: "😍",
  pretty: "😍",
  gorgeous: "😍",
  cute: "🥰",
  sweet: "🥰",
  adorable: "🥰",
  angel: "😇",
  devil: "😈",
  ghost: "👻",
  monster: "👹",
  alien: "👽",
  robot: "🤖",
  skull: "💀",
  dead: "💀",
  zombie: "🧟",
  vampire: "🧛",
  // Animals
  dog: "🐶",
  puppy: "🐶",
  cat: "🐱",
  kitten: "🐱",
  bird: "🐦",
  fish: "🐟",
  horse: "🐴",
  cow: "🐮",
  pig: "🐷",
  mouse: "🐭",
  rabbit: "🐰",
  bunny: "🐰",
  bear: "🐻",
  lion: "🦁",
  tiger: "🐯",
  monkey: "🐵",
  elephant: "🐘",
  snake: "🐍",
  frog: "🐸",
  butterfly: "🦋",
  bee: "🐝",
  spider: "🕷️",
  turtle: "🐢",
  penguin: "🐧",
  owl: "🦉",
  fox: "🦊",
  wolf: "🐺",
  shark: "🦈",
  whale: "🐳",
  dolphin: "🐬",
  octopus: "🐙",
  unicorn: "🦄",
  dragon: "🐉",
  chicken: "🐔",
  duck: "🦆",
  goat: "🐐",
  sheep: "🐑",
  deer: "🦌",
  koala: "🐨",
  panda: "🐼",
  hamster: "🐹",
  ant: "🐜",
  ladybug: "🐞",
  snail: "🐌",
  crab: "🦀",
  squid: "🦑",
  jellyfish: "🪼",
  bat: "🦇",
  kangaroo: "🦘",
  peacock: "🦚",
  flamingo: "🦩",
  parrot: "🦜",
  zebra: "🦓",
  giraffe: "🦒",
  rhino: "🦏",
  hippo: "🦛",
  camel: "🐫",
  llama: "🦙",
  gorilla: "🦍",
  leopard: "🐆",
  cheetah: "🐆",
  eagle: "🦅",
  rooster: "🐓",
  turkey: "🦃",
  swan: "🦢",
  dove: "🕊️",
  lizard: "🦎",
  crocodile: "🐊",
  dinosaur: "🦕",
  // Food & drink
  pizza: "🍕",
  burger: "🍔",
  fries: "🍟",
  taco: "🌮",
  burrito: "🌯",
  sushi: "🍣",
  pasta: "🍝",
  noodles: "🍜",
  ramen: "🍜",
  sandwich: "🥪",
  salad: "🥗",
  soup: "🍲",
  bread: "🍞",
  cheese: "🧀",
  egg: "🥚",
  bacon: "🥓",
  steak: "🥩",
  meat: "🍖",
  drumstick: "🍗",
  hotdog: "🌭",
  popcorn: "🍿",
  cake: "🎂",
  cookie: "🍪",
  biscuit: "🍪",
  candy: "🍬",
  chocolate: "🍫",
  donut: "🍩",
  doughnut: "🍩",
  icecream: "🍦",
  dessert: "🍨",
  cupcake: "🧁",
  pie: "🥧",
  pudding: "🍮",
  honey: "🍯",
  apple: "🍎",
  banana: "🍌",
  orange: "🍊",
  grape: "🍇",
  strawberry: "🍓",
  cherry: "🍒",
  lemon: "🍋",
  watermelon: "🍉",
  melon: "🍈",
  mango: "🥭",
  pineapple: "🍍",
  peach: "🍑",
  pear: "🍐",
  avocado: "🥑",
  carrot: "🥕",
  corn: "🌽",
  potato: "🥔",
  tomato: "🍅",
  cucumber: "🥒",
  broccoli: "🥦",
  garlic: "🧄",
  onion: "🧅",
  mushroom: "🍄",
  peanut: "🥜",
  coffee: "☕",
  tea: "🍵",
  milk: "🥛",
  juice: "🧃",
  beer: "🍺",
  wine: "🍷",
  cocktail: "🍹",
  soda: "🥤",
  water: "💧",
  breakfast: "🥞",
  lunch: "🍱",
  dinner: "🍽️",
  snack: "🍿",
  salt: "🧂",
  butter: "🧈",
  rice: "🍚",
  // Activities
  run: "🏃",
  running: "🏃",
  walk: "🚶",
  walking: "🚶",
  swim: "🏊",
  swimming: "🏊",
  dance: "💃",
  dancing: "💃",
  sing: "🎤",
  singing: "🎤",
  music: "🎵",
  song: "🎵",
  guitar: "🎸",
  piano: "🎹",
  drum: "🥁",
  trumpet: "🎺",
  violin: "🎻",
  game: "🎮",
  gaming: "🎮",
  football: "⚽",
  soccer: "⚽",
  basketball: "🏀",
  tennis: "🎾",
  golf: "⛳",
  baseball: "⚾",
  bowling: "🎳",
  boxing: "🥊",
  gym: "🏋️",
  workout: "🏋️",
  exercise: "🏋️",
  yoga: "🧘",
  meditation: "🧘",
  read: "📖",
  reading: "📖",
  book: "📚",
  write: "✍️",
  writing: "✍️",
  draw: "🎨",
  drawing: "🎨",
  art: "🎨",
  paint: "🎨",
  photo: "📸",
  selfie: "🤳",
  camera: "📷",
  video: "🎥",
  movie: "🎬",
  film: "🎬",
  cinema: "🎦",
  theatre: "🎭",
  theater: "🎭",
  travel: "✈️",
  trip: "🧳",
  vacation: "🏖️",
  holiday: "🏖️",
  beach: "🏖️",
  camping: "🏕️",
  camp: "🏕️",
  fishing: "🎣",
  hunting: "🏹",
  shopping: "🛍️",
  shop: "🛒",
  sleep: "💤",
  sleeping: "💤",
  dream: "💭",
  work: "💼",
  job: "💼",
  office: "🏢",
  school: "🏫",
  student: "🧑‍🎓",
  teacher: "🧑‍🏫",
  study: "📚",
  studying: "📚",
  exam: "📝",
  test: "📝",
  homework: "📝",
  money: "💰",
  cash: "💵",
  dollar: "💵",
  rich: "💰",
  bank: "🏦",
  // Transport
  car: "🚗",
  drive: "🚗",
  driving: "🚗",
  taxi: "🚕",
  bike: "🚲",
  bicycle: "🚲",
  motorcycle: "🏍️",
  bus: "🚌",
  train: "🚂",
  subway: "🚇",
  plane: "✈️",
  airplane: "✈️",
  flight: "✈️",
  helicopter: "🚁",
  boat: "⛵",
  ship: "🚢",
  sail: "⛵",
  rocket: "🚀",
  spaceship: "🚀",
  // Objects
  phone: "📱",
  iphone: "📱",
  mobile: "📱",
  computer: "💻",
  laptop: "💻",
  tablet: "📱",
  keyboard: "⌨️",
  watch: "⌚",
  clock: "🕐",
  time: "⏰",
  alarm: "⏰",
  key: "🔑",
  lock: "🔒",
  unlock: "🔓",
  door: "🚪",
  house: "🏠",
  home: "🏠",
  building: "🏢",
  apartment: "🏢",
  castle: "🏰",
  bed: "🛏️",
  chair: "🪑",
  lamp: "💡",
  light: "💡",
  bulb: "💡",
  candle: "🕯️",
  pencil: "✏️",
  pen: "🖊️",
  scissors: "✂️",
  paper: "📄",
  newspaper: "📰",
  envelope: "✉️",
  mail: "📧",
  email: "📧",
  message: "💬",
  chat: "💬",
  call: "📞",
  telephone: "☎️",
  bell: "🔔",
  notification: "🔔",
  battery: "🔋",
  wifi: "📶",
  internet: "🌐",
  website: "🌐",
  search: "🔍",
  question: "❓",
  answer: "💡",
  idea: "💡",
  warning: "⚠️",
  danger: "⚠️",
  stop: "🛑",
  traffic: "🚦",
  hospital: "🏥",
  doctor: "🩺",
  medicine: "💊",
  pill: "💊",
  dentist: "🦷",
  tooth: "🦷",
  umbrella: "☂️",
  glasses: "👓",
  sunglasses: "🕶️",
  hat: "🎩",
  cap: "🧢",
  shoe: "👟",
  shirt: "👕",
  dress: "👗",
  jeans: "👖",
  jacket: "🧥",
  coat: "🧥",
  sock: "🧦",
  glove: "🧤",
  scarf: "🧣",
  bag: "👜",
  backpack: "🎒",
  suitcase: "🧳",
  crown: "👑",
  king: "👑",
  queen: "👸",
  prince: "🤴",
  princess: "👸",
  diamond: "💎",
  gem: "💎",
  jewel: "💎",
  ring: "💍",
  wedding: "💒",
  balloon: "🎈",
  kite: "🪁",
  gift: "🎁",
  present: "🎁",
  birthday: "🎂",
  party: "🎉",
  christmas: "🎄",
  halloween: "🎃",
  easter: "🐣",
  valentine: "💘",
  fireworks: "🎆",
  circus: "🎪",
  carnival: "🎡",
  // Nature
  sun: "☀️",
  sunny: "☀️",
  moon: "🌙",
  night: "🌃",
  rain: "🌧️",
  rainy: "🌧️",
  snow: "❄️",
  snowy: "❄️",
  snowman: "⛄",
  cloud: "☁️",
  cloudy: "☁️",
  storm: "⛈️",
  thunder: "⚡",
  lightning: "⚡",
  rainbow: "🌈",
  wind: "🌬️",
  tornado: "🌪️",
  volcano: "🌋",
  earthquake: "🌍",
  flower: "🌸",
  rose: "🌹",
  tulip: "🌷",
  sunflower: "🌻",
  tree: "🌳",
  forest: "🌲",
  leaf: "🍃",
  leaves: "🍂",
  autumn: "🍂",
  fall: "🍂",
  spring: "🌱",
  plant: "🌱",
  garden: "🌷",
  ocean: "🌊",
  sea: "🌊",
  wave: "🌊",
  island: "🏝️",
  mountain: "⛰️",
  hill: "⛰️",
  desert: "🏜️",
  earth: "🌍",
  world: "🌍",
  globe: "🌍",
  planet: "🪐",
  space: "🌌",
  galaxy: "🌌",
  universe: "🌌",
  // People & body
  eye: "👁️",
  ear: "👂",
  nose: "👃",
  mouth: "👄",
  tongue: "👅",
  hand: "✋",
  hands: "🙌",
  finger: "👉",
  thumb: "👍",
  fist: "✊",
  pray: "🙏",
  prayer: "🙏",
  muscle: "💪",
  strong: "💪",
  brain: "🧠",
  mind: "🧠",
  bone: "🦴",
  blood: "🩸",
  baby: "👶",
  child: "🧒",
  boy: "👦",
  girl: "👧",
  man: "👨",
  woman: "👩",
  family: "👨‍👩‍👧",
  friend: "🧑‍🤝‍🧑",
  friends: "👯",
  couple: "💑",
  marriage: "💍",
};

const KNOWN_WORDS = Object.keys(WORDS);

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Longest keys first so "birthday" wins over "birth"-style prefixes; an
// optional trailing "s" covers plurals. Word boundaries keep punctuation intact.
const WORD_PATTERN = new RegExp(
  `\\b(${KNOWN_WORDS.map(escapeRegExp).sort((a, b) => b.length - a.length).join("|")})s?\\b`,
  "gi",
);

type Mode = "replace" | "add";

function translate(text: string, mode: Mode): string {
  return text.replace(WORD_PATTERN, (match) => {
    const lower = match.toLowerCase();
    const emoji = WORDS[lower] ?? WORDS[lower.replace(/s$/, "")];
    if (!emoji) return match;
    return mode === "replace" ? emoji : `${match} ${emoji}`;
  });
}

const EXAMPLE = "I love pizza and my happy dog. Let's dance in the rain and watch a movie tonight!";

export function EmojiTranslator() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<Mode>("replace");

  const output = useMemo(() => (text ? translate(text, mode) : ""), [text, mode]);

  const onCopy = async () => {
    if (!output) return;
    const ok = await copyText(output);
    if (ok) toast.success("Emoji text copied");
    else toast.error("Copy failed — select the output and copy manually");
  };

  return (
    <div className="space-y-5">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Label htmlFor="emoji-input">
            Your sentence{` — ${text.length.toLocaleString()} / ${MAX_INPUT.toLocaleString()} characters`}
          </Label>
          <button
            type="button"
            onClick={() => setText(EXAMPLE)}
            className="text-xs font-medium text-primary underline-offset-2 hover:underline"
          >
            Try an example
          </button>
        </div>
        <Textarea
          id="emoji-input"
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, MAX_INPUT))}
          placeholder="Type a sentence — e.g. I love pizza and my happy dog"
          rows={3}
          className="mt-1.5"
        />
      </div>

      <div>
        <Label>How should emoji be added?</Label>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setMode("replace")}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              mode === "replace" ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            Replace words with emoji
          </button>
          <button
            type="button"
            onClick={() => setMode("add")}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              mode === "add" ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            Add emoji after words
          </button>
        </div>
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Label htmlFor="emoji-output">
            Emoji translation{output ? ` — ${output.length.toLocaleString()} characters` : ""}
          </Label>
          <div className="flex gap-1.5">
            <Button type="button" size="sm" variant="outline" onClick={onCopy} disabled={!output}>
              <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={!output}
              onClick={() => downloadText("emoji-translation.txt", output)}
            >
              <Download className="mr-1.5 h-3.5 w-3.5" /> .txt
            </Button>
            <Button type="button" size="sm" variant="ghost" onClick={() => setText("")}>
              <Eraser className="mr-1.5 h-3.5 w-3.5" /> Clear
            </Button>
          </div>
        </div>
        <Textarea
          id="emoji-output"
          value={output}
          readOnly
          rows={4}
          placeholder="Your emoji translation will appear here…"
          className="mt-1.5 text-lg"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          We know {KNOWN_WORDS.length.toLocaleString()} words across feelings, animals, food,
          activities, objects, nature and transport — matching is case-insensitive, punctuation is
          preserved, and words we don&apos;t know are left exactly as you typed them.
        </p>
      </div>
    </div>
  );
}
