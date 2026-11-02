import { useMemo, useState } from "react";
import { Check, Copy, RotateCcw, Share2, Trophy, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { shareText } from "@/lib/engagement";

/**
 * Name Tournament — an 8-name knockout bracket. The user picks a winner
 * from each pair; the last name standing is the champion. Built for the
 * name generators (Phase 4): quick, replayable, shareable.
 */

function roundName(remaining: number): string {
  if (remaining >= 8) return "Quarter-finals";
  if (remaining >= 4) return "Semi-finals";
  return "The Final";
}

export function NameTournament({
  pool,
  label,
  onReplay,
  onClose,
}: {
  pool: string[];
  /** e.g. "dog name" — used in the champion message */
  label: string;
  onReplay: () => string[];
  onClose: () => void;
}) {
  const startPool = useMemo(() => pool.slice(0, 8), [pool]);
  const [round, setRound] = useState<string[]>(startPool);
  const [match, setMatch] = useState(0);
  const [winners, setWinners] = useState<string[]>([]);
  const [champion, setChampion] = useState<string | null>(null);
  const [shared, setShared] = useState(false);

  const pair: [string, string] | null =
    !champion && round.length >= 2 ? [round[match * 2], round[match * 2 + 1]] : null;
  const totalMatches = round.length / 2;

  const pick = (winner: string) => {
    const nextWinners = [...winners, winner];
    if (match + 1 < totalMatches) {
      setWinners(nextWinners);
      setMatch(match + 1);
      return;
    }
    if (nextWinners.length === 1) {
      setChampion(nextWinners[0]);
      return;
    }
    setRound(nextWinners);
    setWinners([]);
    setMatch(0);
  };

  const restart = () => {
    const fresh = onReplay().slice(0, 8);
    setRound(fresh);
    setWinners([]);
    setMatch(0);
    setChampion(null);
    setShared(false);
  };

  const share = async () => {
    if (!champion) return;
    const res = await shareText(
      "Name Tournament — AllWordTools",
      `🏆 My ${label} tournament champion is “${champion}”! Pick yours on AllWordTools.`,
      window.location.href,
    );
    if (res === "copied") {
      setShared(true);
      toast.success("Result copied — share it anywhere");
    }
  };

  return (
    <div className="mt-7 border-t border-border/60 pt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
          <Trophy className="h-5 w-5 text-honey" /> Name Tournament
        </h2>
        <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
          <X className="mr-1.5 h-4 w-4" /> Exit tournament
        </Button>
      </div>

      {champion ? (
        <div className="mt-6 rounded-3xl bg-honey/10 p-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-honey">Champion</p>
          <p className="mt-2 font-display text-3xl font-bold sm:text-4xl">{champion}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Your winning {label}. Copy it, share it, or run the tournament again with fresh names.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Button
              onClick={() => {
                navigator.clipboard?.writeText(champion);
                toast.success(`Copied "${champion}"`);
              }}
              className="rounded-2xl font-semibold"
            >
              <Copy className="mr-2 h-4 w-4" /> Copy champion
            </Button>
            <Button variant="outline" onClick={share} className="rounded-2xl font-semibold">
              {shared ? <Check className="mr-2 h-4 w-4" /> : <Share2 className="mr-2 h-4 w-4" />}
              Share result
            </Button>
            <Button variant="outline" onClick={restart} className="rounded-2xl font-semibold">
              <RotateCcw className="mr-2 h-4 w-4" /> New tournament
            </Button>
          </div>
        </div>
      ) : pair ? (
        <>
          <p className="mt-4 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {roundName(round.length)} · Match {match + 1} of {totalMatches} — tap your favourite
          </p>
          <div className="mt-4 grid items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr]">
            <button
              onClick={() => pick(pair[0])}
              className="rounded-3xl border border-border/70 bg-secondary/40 px-5 py-7 font-display text-xl font-semibold transition-all hover:scale-[1.02] hover:border-honey/70 hover:bg-honey/10 sm:text-2xl"
            >
              {pair[0]}
            </button>
            <div className="flex items-center justify-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-honey font-display text-sm font-bold text-honey-foreground">
                VS
              </span>
            </div>
            <button
              onClick={() => pick(pair[1])}
              className="rounded-3xl border border-border/70 bg-secondary/40 px-5 py-7 font-display text-xl font-semibold transition-all hover:scale-[1.02] hover:border-honey/70 hover:bg-honey/10 sm:text-2xl"
            >
              {pair[1]}
            </button>
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Winners so far this round: {winners.length > 0 ? winners.join(" · ") : "—"}
          </p>
        </>
      ) : null}
    </div>
  );
}
