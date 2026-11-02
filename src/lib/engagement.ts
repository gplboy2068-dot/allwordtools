/**
 * Shared engagement kit (Phase 0 of the tools upgrade plan).
 * Everything is client-side localStorage — no account, no backend.
 * Used by: favorite buttons + My Tools strip, the quiz games, daily
 * challenges and (in later phases) solvers/generators/AI tools.
 */

const FAV_KEY = "awt-favorites-v1";
const RECENT_KEY = "awt-recent-tools-v1";
const DAILY_KEY = "awt-daily-streak-v1";

export function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback;
  } catch {
    return fallback;
  }
}

export function loadJSONArray<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveJSON(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable (private mode, quota) */
  }
}

/* ---------------- favourites ---------------- */

const FAV_EVENT = "awt-favorites-changed";

export function getFavorites(): string[] {
  return loadJSONArray<string>(FAV_KEY);
}

export function isFavorite(slug: string): boolean {
  return getFavorites().includes(slug);
}

export function toggleFavorite(slug: string): boolean {
  const favs = getFavorites();
  const next = favs.includes(slug) ? favs.filter((f) => f !== slug) : [slug, ...favs];
  saveJSON(FAV_KEY, next);
  try {
    window.dispatchEvent(new CustomEvent(FAV_EVENT));
  } catch {
    /* noop */
  }
  return next.includes(slug);
}

export function onFavoritesChanged(cb: () => void): () => void {
  window.addEventListener(FAV_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(FAV_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

/* ---------------- recently used tools ---------------- */

export function getRecents(): string[] {
  return loadJSONArray<string>(RECENT_KEY);
}

export function recordRecent(slug: string) {
  const recents = getRecents().filter((r) => r !== slug);
  saveJSON(RECENT_KEY, [slug, ...recents].slice(0, 8));
}

/* ---------------- clipboard / files / share ---------------- */

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function downloadText(filename: string, text: string) {
  try {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  } catch {
    /* noop */
  }
}

export async function shareText(title: string, text: string, url: string): Promise<"shared" | "copied" | "failed"> {
  try {
    if (navigator.share) {
      await navigator.share({ title, text, url });
      return "shared";
    }
    throw new Error("no native share");
  } catch {
    return (await copyText(`${text} ${url}`)) ? "copied" : "failed";
  }
}

/* ---------------- speech ---------------- */

export function speakWord(word: string, lang = "en-US") {
  try {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(word);
    u.lang = lang;
    u.rate = 0.85;
    synth.speak(u);
  } catch {
    /* audio unavailable */
  }
}

export const hasSpeech = () =>
  typeof window !== "undefined" && "speechSynthesis" in window;

/* ---------------- daily streak (site-wide) ---------------- */

export interface DailyState {
  last: string | null; // YYYY-MM-DD local
  streak: number;
}

export function todayStr(): string {
  const d = new Date();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export function yesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export function getDailyState(): DailyState & { doneToday: boolean } {
  const s = loadJSON<DailyState>(DAILY_KEY, { last: null, streak: 0 });
  return { ...s, doneToday: s.last === todayStr() };
}

/** Mark today's daily challenge complete; returns the updated state. */
export function completeDaily(): DailyState & { doneToday: boolean } {
  const s = loadJSON<DailyState>(DAILY_KEY, { last: null, streak: 0 });
  const today = todayStr();
  if (s.last === today) return { ...s, doneToday: true };
  const streak = s.last === yesterdayStr() ? s.streak + 1 : 1;
  const next = { last: today, streak };
  saveJSON(DAILY_KEY, next);
  return { ...next, doneToday: true };
}

/* ---------------- saved words (My Word List) ---------------- */

const WORDS_KEY = "awt-word-list-v1";
const WORDS_EVENT = "awt-words-changed";

export function getSavedWords(): string[] {
  return loadJSONArray<string>(WORDS_KEY);
}

export function isWordSaved(word: string): boolean {
  return getSavedWords().includes(word.toLowerCase());
}

export function toggleSavedWord(word: string): boolean {
  const w = word.toLowerCase();
  const list = getSavedWords();
  const next = list.includes(w) ? list.filter((x) => x !== w) : [w, ...list];
  saveJSON(WORDS_KEY, next);
  try {
    window.dispatchEvent(new CustomEvent(WORDS_EVENT));
  } catch {
    /* noop */
  }
  return next.includes(w);
}

export function onSavedWordsChanged(cb: () => void): () => void {
  window.addEventListener(WORDS_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(WORDS_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}
