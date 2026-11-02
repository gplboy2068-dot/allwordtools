import { useMemo, useState } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { copyText } from "@/lib/engagement";

/**
 * Unicode font styles. Each style maps a-z / A-Z / 0-9 through a string of
 * replacement glyphs of the same length; characters without a glyph are
 * left unchanged.
 */
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";

function mapper(lower?: string, upper?: string, digits?: string) {
  const map = new Map<string, string>();
  const apply = (from: string, to?: string) => {
    if (!to) return;
    const glyphs = [...to];
    [...from].forEach((ch, i) => {
      if (glyphs[i]) map.set(ch, glyphs[i]);
    });
  };
  apply(LOWER, lower);
  apply(UPPER, upper);
  apply(DIGITS, digits);
  return (text: string) => [...text].map((ch) => map.get(ch) ?? ch).join("");
}

const combining = (mark: string) => (text: string) =>
  [...text].map((ch) => (ch === " " ? ch : ch + mark)).join("");

const FLIP: Record<string, string> = {
  a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ", i: "ᴉ", j: "ɾ", k: "ʞ",
  l: "l", m: "ɯ", n: "u", o: "o", p: "d", q: "b", r: "ɹ", s: "s", t: "ʇ", u: "n", v: "ʌ",
  w: "ʍ", x: "x", y: "ʎ", z: "z", A: "∀", B: "𐐒", C: "Ɔ", D: "ᗡ", E: "Ǝ", F: "Ⅎ",
  G: "⅁", H: "H", I: "I", J: "ſ", K: "ʞ", L: "˥", M: "W", N: "N", O: "O", P: "Ԁ",
  Q: "Ό", R: "ᴚ", S: "S", T: "⊥", U: "∩", V: "Λ", W: "M", X: "X", Y: "⅄", Z: "Z",
  "0": "0", "1": "Ɩ", "2": "ᄅ", "3": "Ɛ", "4": "ㄣ", "5": "ϛ", "6": "9", "7": "ㄥ",
  "8": "8", "9": "6", ".": "˙", ",": "'", "?": "¿", "!": "¡", "'": ",", '"': ",,",
  "(": ")", ")": "(", "[": "]", "]": "[", "{": "}", "}": "{", "<": ">", ">": "<",
  "&": "⅋", "_": "‾",
};

const STYLES: { id: string; label: string; make: (text: string) => string }[] = [
  { id: "bold", label: "Bold", make: mapper("𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳", "𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙", "𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗") },
  { id: "italic", label: "Italic", make: mapper("𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧", "𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍") },
  { id: "script", label: "Script / Cursive", make: mapper("𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏", "𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵") },
  { id: "scriptbold", label: "Bold Script", make: mapper("𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃", "𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩") },
  { id: "fraktur", label: "Fraktur / Gothic", make: mapper("𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷", "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ") },
  { id: "doublestruck", label: "Double Struck", make: mapper("𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫", "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ", "𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡") },
  { id: "monospace", label: "Monospace", make: mapper("𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣", "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉", "𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿") },
  { id: "smallcaps", label: "Small Caps", make: mapper("ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ", "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ") },
  { id: "bubble", label: "Bubble", make: mapper("ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ", "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ", "⓪①②③④⑤⑥⑦⑧⑨") },
  { id: "square", label: "Squared", make: mapper("🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉", "🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉") },
  { id: "tiny", label: "Tiny / Superscript", make: mapper("ᵃᵇᶜᵈᵉᶠᵍʰᶦʲᵏˡᵐⁿᵒᵖ۹ʳˢᵗᵘᵛʷˣʸᶻ", "ᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾ۹ᴿˢᵀᵁⱽᵂˣʸᶻ", "⁰¹²³⁴⁵⁶⁷⁸⁹") },
  { id: "wide", label: "Ｖａｐｏｒｗａｖｅ (Fullwidth)", make: mapper("ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ", "ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ", "０１２３４５６７８９") },
  { id: "strike", label: "Strikethrough", make: combining("\u0336") },
  { id: "underline", label: "Underline", make: combining("\u0332") },
  { id: "slash", label: "Slash", make: combining("\u0338") },
  {
    id: "flip",
    label: "Upside Down",
    make: (text) => [...text].map((ch) => FLIP[ch] ?? ch).reverse().join(""),
  },
];

export function FancyTextGenerator() {
  const [text, setText] = useState("");
  const preview = text.trim() || "Your fancy text";
  const results = useMemo(() => STYLES.map((s) => ({ ...s, out: s.make(preview) })), [preview]);

  return (
    <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-lift sm:p-7">
      <div className="space-y-1.5">
        <Label htmlFor="ft-input" className="text-xs font-semibold text-muted-foreground">
          Your text
        </Label>
        <Input
          id="ft-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your name or text — every style updates live…"
          className="h-13 rounded-xl py-3 text-base"
          maxLength={120}
        />
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        Perfect for Instagram bios, Discord names, gaming profiles and posts. Tap any style to copy
        it, then paste it anywhere — no app needed.
      </p>
      <div className="mt-5 space-y-2.5">
        {results.map((r) => (
          <button
            key={r.id}
            onClick={async () => {
              if (await copyText(r.out)) toast.success(`${r.label} style copied`);
            }}
            className="group flex w-full items-center justify-between gap-3 rounded-2xl border border-border/70 bg-secondary/40 px-4 py-3 text-left transition-colors hover:border-honey/60 hover:bg-accent"
          >
            <span className="min-w-0">
              <span className="block text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                {r.label}
              </span>
              <span className="block truncate text-lg leading-snug">{r.out}</span>
            </span>
            <Copy className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        ))}
      </div>
      <div className="mt-4">
        <Button
          variant="outline"
          size="sm"
          className="rounded-full"
          onClick={async () => {
            const all = results.map((r) => `${r.label}: ${r.out}`).join("\n");
            if (await copyText(all)) toast.success("All styles copied");
          }}
        >
          <Copy className="mr-1.5 h-4 w-4" /> Copy all styles
        </Button>
      </div>
    </div>
  );
}
