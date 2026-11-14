import { useEffect, useMemo, useState } from "react";
import { Copy, Download, Shuffle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { copyText, downloadText } from "@/lib/engagement";

const LAST_KEY = "awt-lenny-last";

// Eyes, mouths and arms are full strings including their combining marks,
// so any combination composes into a valid face.
const LEFT_EYES = ["͡°", "•", "⊙", "◉", "ಠ", "´", "¯", "^", "⌒", "ᵔ"];
const RIGHT_EYES = ["͡°", "•", "⊙", "◉", "ಠ", "´", "¯", "^", "⌒", "ᵔ"];
const MOUTHS = ["͜ʖ", "‿", "ω", "▽", "ʖ", "ᗜ", "ᴥ", "◡", "‿‿", "○"];
const LEFT_ARMS = ["(", "╭", "┌", "╰", "凸", "⊂", "ᕦ", "ʕ", "¯", "["];
const RIGHT_ARMS = [")", "╮", "┐", "╯", "凸", "⊃", "ᕥ", "ʔ", "¯", "]"];

const PRESETS: { label: string; face: string }[] = [
  { label: "Classic Lenny", face: "( ͡° ͜ʖ ͡°)" },
  { label: "Wink", face: "( ͡~ ͜ʖ ͡°)" },
  { label: "Shrug", face: "¯\\_(ツ)_/¯" },
  { label: "Table flip", face: "(╯°□°)╯︵ ┻━┻" },
  { label: "Unflip", face: "┬─┬ノ( º _ ºノ)" },
  { label: "Bear", face: "ʕ•ᴥ•ʔ" },
  { label: "Disapproval", face: "ಠ_ಠ" },
  { label: "Rage", face: "(╬ಠ益ಠ)" },
  { label: "Happy", face: "(ᵔᴥᵔ)" },
  { label: "Deal with it", face: "(⌐■_■)" },
  { label: "Kiss", face: "( ͡° ͜ʖ ͡°)つ──☆*:･ﾟ✧" },
  { label: "Wave", face: "( ͡° ͜ʖ ͡°)ﾉ⌒☆" },
];

type Parts = {
  leftEye: string;
  rightEye: string;
  mouth: string;
  leftArm: string;
  rightArm: string;
};

const DEFAULT_PARTS: Parts = {
  leftEye: "͡°",
  rightEye: "͡°",
  mouth: "͜ʖ",
  leftArm: "(",
  rightArm: ")",
};

function buildFace(p: Parts): string {
  return `${p.leftArm} ${p.leftEye} ${p.mouth} ${p.rightEye} ${p.rightArm}`;
}

function randomOf<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function LennyFaceGenerator() {
  const [parts, setParts] = useState<Parts>(DEFAULT_PARTS);
  const [presetFace, setPresetFace] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(LAST_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<Parts>;
        setParts({
          leftEye: LEFT_EYES.includes(parsed.leftEye ?? "") ? (parsed.leftEye as string) : DEFAULT_PARTS.leftEye,
          rightEye: RIGHT_EYES.includes(parsed.rightEye ?? "") ? (parsed.rightEye as string) : DEFAULT_PARTS.rightEye,
          mouth: MOUTHS.includes(parsed.mouth ?? "") ? (parsed.mouth as string) : DEFAULT_PARTS.mouth,
          leftArm: LEFT_ARMS.includes(parsed.leftArm ?? "") ? (parsed.leftArm as string) : DEFAULT_PARTS.leftArm,
          rightArm: RIGHT_ARMS.includes(parsed.rightArm ?? "") ? (parsed.rightArm as string) : DEFAULT_PARTS.rightArm,
        });
      }
    } catch {
      // storage unavailable — keep the default face
    }
  }, []);

  const face = useMemo(() => buildFace(parts), [parts]);
  const shown = presetFace ?? face;

  const update = (patch: Partial<Parts>) => {
    setPresetFace(null);
    setParts((prev) => {
      const next = { ...prev, ...patch };
      try {
        window.localStorage.setItem(LAST_KEY, JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  const onShuffle = () => {
    update({
      leftEye: randomOf(LEFT_EYES),
      rightEye: randomOf(RIGHT_EYES),
      mouth: randomOf(MOUTHS),
      leftArm: randomOf(LEFT_ARMS),
      rightArm: randomOf(RIGHT_ARMS),
    });
  };

  const onCopy = async () => {
    const ok = await copyText(shown);
    if (ok) toast.success("Face copied");
    else toast.error("Copy failed — select the face and copy manually");
  };

  const picker = (
    label: string,
    options: string[],
    value: string,
    onPick: (v: string) => void,
  ) => (
    <div>
      <Label>{label}</Label>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onPick(opt)}
            className={`min-w-10 rounded-lg border px-3 py-2 text-lg transition-colors ${
              value === opt ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="rounded-xl border bg-muted/40 px-4 py-6 text-center">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Your face</p>
        <p className="mt-2 break-words text-4xl leading-snug sm:text-5xl" aria-live="polite">
          {shown}
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-1.5">
          <Button type="button" onClick={onCopy}>
            <Copy className="mr-1.5 h-4 w-4" /> Copy face
          </Button>
          <Button type="button" variant="outline" onClick={onShuffle}>
            <Shuffle className="mr-1.5 h-4 w-4" /> Shuffle
          </Button>
          <Button type="button" variant="outline" onClick={() => downloadText("lenny-face.txt", shown)}>
            <Download className="mr-1.5 h-4 w-4" /> .txt
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {picker("Left arm", LEFT_ARMS, parts.leftArm, (v) => update({ leftArm: v }))}
        {picker("Right arm", RIGHT_ARMS, parts.rightArm, (v) => update({ rightArm: v }))}
        {picker("Left eye", LEFT_EYES, parts.leftEye, (v) => update({ leftEye: v }))}
        {picker("Right eye", RIGHT_EYES, parts.rightEye, (v) => update({ rightEye: v }))}
      </div>
      {picker("Mouth", MOUTHS, parts.mouth, (v) => update({ mouth: v }))}

      <div>
        <Label>Preset faces — tap to preview, then copy</Label>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => setPresetFace(p.face)}
              title={p.label}
              className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                presetFace === p.face ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              {p.face}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Picking any part above returns to your custom-built face. Your last build is remembered on this device.
        </p>
      </div>

      <p className="text-xs text-muted-foreground">
        Lenny faces are plain Unicode text — paste them into iMessage, WhatsApp, Instagram, Discord, Reddit or any chat app.
      </p>
    </div>
  );
}
