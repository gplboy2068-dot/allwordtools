/**
 * Offline question banks and quiz builders for the Word Quizzes category.
 * Everything runs client-side with no API calls, so the quizzes are fast,
 * free and always available. Questions are generated fresh on each attempt
 * with shuffled options and randomised distractors.
 */

export type QuizQuestion = {
  prompt: string;
  /** Optional secondary hint shown under the prompt. */
  hint?: string;
  options: string[];
  answer: string;
  explanation?: string;
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickDistractors(pool: readonly string[], exclude: string[], n: number): string[] {
  const seen = new Set(exclude.map((e) => e.toLowerCase()));
  const out: string[] = [];
  for (const item of shuffle(pool)) {
    if (out.length >= n) break;
    if (seen.has(item.toLowerCase())) continue;
    seen.add(item.toLowerCase());
    out.push(item);
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Vocabulary                                                         */
/* ------------------------------------------------------------------ */

export type QuizLevel = "easy" | "medium" | "hard";
export type VocabItem = { word: string; definition: string; level: QuizLevel };

export const VOCAB: VocabItem[] = [
  { word: "abate", level: "medium", definition: "to become less intense or widespread" },
  { word: "benevolent", level: "medium", definition: "kind, generous and well-meaning" },
  { word: "candid", level: "easy", definition: "truthful, open and straightforward" },
  { word: "diligent", level: "easy", definition: "showing careful and persistent effort" },
  { word: "eloquent", level: "medium", definition: "fluent and persuasive in speaking or writing" },
  { word: "frugal", level: "easy", definition: "careful and sparing with money or resources" },
  { word: "gregarious", level: "medium", definition: "sociable and fond of the company of others" },
  { word: "hinder", level: "easy", definition: "to make an action slow or difficult" },
  { word: "impartial", level: "medium", definition: "treating all sides equally and fairly" },
  { word: "jovial", level: "medium", definition: "cheerful and full of good humour" },
  { word: "keen", level: "easy", definition: "eager, enthusiastic or sharply perceptive" },
  { word: "lucid", level: "medium", definition: "clear, easy to understand and rational" },
  { word: "meticulous", level: "medium", definition: "showing great attention to detail" },
  { word: "novel", level: "easy", definition: "new, original or unlike anything before" },
  { word: "obscure", level: "medium", definition: "not well known or hard to understand" },
  { word: "prudent", level: "medium", definition: "acting with care and good judgement" },
  { word: "quell", level: "hard", definition: "to put an end to, usually by force" },
  { word: "resilient", level: "medium", definition: "able to recover quickly from difficulty" },
  { word: "scrutinize", level: "hard", definition: "to examine closely and critically" },
  { word: "tenacious", level: "hard", definition: "holding firmly to a goal or belief" },
  { word: "ubiquitous", level: "hard", definition: "present or found everywhere" },
  { word: "verbose", level: "medium", definition: "using more words than are needed" },
  { word: "wary", level: "easy", definition: "cautious about possible dangers" },
  { word: "zealous", level: "hard", definition: "showing great energy and enthusiasm" },
  { word: "arduous", level: "medium", definition: "requiring a lot of hard, tiring effort" },
  { word: "brevity", level: "medium", definition: "the quality of being brief and concise" },
  { word: "cordial", level: "easy", definition: "warm, friendly and sincere" },
  { word: "deter", level: "easy", definition: "to discourage someone from doing something" },
  { word: "elated", level: "easy", definition: "extremely happy and excited" },
  { word: "futile", level: "medium", definition: "pointless and incapable of success" },
  { word: "rapid", level: "easy", definition: "moving or happening very fast" },
  { word: "vivid", level: "easy", definition: "bright, clear and full of life" },
  { word: "ample", level: "easy", definition: "enough or more than enough" },
  { word: "humble", level: "easy", definition: "modest and not proud" },
  { word: "sincere", level: "easy", definition: "honest and truly meant" },
  { word: "eager", level: "easy", definition: "wanting something very much" },
  { word: "gentle", level: "easy", definition: "soft, kind and careful" },
  { word: "adept", level: "medium", definition: "highly skilled at something" },
  { word: "devise", level: "medium", definition: "to invent or plan something carefully" },
  { word: "inevitable", level: "medium", definition: "certain to happen and unavoidable" },
  { word: "legible", level: "medium", definition: "clear enough to read" },
  { word: "ominous", level: "medium", definition: "suggesting something bad will happen" },
  { word: "plausible", level: "medium", definition: "seeming reasonable or likely to be true" },
  { word: "reluctant", level: "medium", definition: "unwilling and hesitant" },
  { word: "ephemeral", level: "hard", definition: "lasting for a very short time" },
  { word: "fastidious", level: "hard", definition: "extremely careful about small details" },
  { word: "laconic", level: "hard", definition: "using very few words" },
  { word: "nonchalant", level: "hard", definition: "calm and relaxed, not seeming worried" },
  { word: "pragmatic", level: "hard", definition: "practical rather than idealistic" },
  { word: "reticent", level: "hard", definition: "not revealing one's thoughts readily" },
];

export function buildVocabQuestions(count = 8): QuizQuestion[] {
  const defs = VOCAB.map((v) => v.definition);
  return shuffle(VOCAB)
    .slice(0, count)
    .map((v) => {
      const distractors = pickDistractors(defs, [v.definition], 3);
      return {
        prompt: `What does “${v.word}” mean?`,
        options: shuffle([v.definition, ...distractors]),
        answer: v.definition,
        explanation: `“${v.word}” means ${v.definition}.`,
      };
    });
}

/* --------- Level-aware + reverse builders for the game runner --------- */

type RngLike = () => number;

function shuffleR<T>(arr: readonly T[], rng: RngLike): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function distractorsR(pool: readonly string[], exclude: string[], n: number, rng: RngLike): string[] {
  const seen = new Set(exclude.map((e) => e.toLowerCase()));
  const out: string[] = [];
  for (const item of shuffleR(pool, rng)) {
    if (out.length >= n) break;
    if (seen.has(item.toLowerCase())) continue;
    seen.add(item.toLowerCase());
    out.push(item);
  }
  return out;
}

/** Items at the requested levels; if too few, tops up from the other levels. */
function levelPool<T extends { level: QuizLevel }>(items: T[], levels?: QuizLevel[]): T[] {
  if (!levels || levels.length === 0) return items;
  const primary = items.filter((i) => levels.includes(i.level));
  if (primary.length >= 10) return primary;
  return [...primary, ...items.filter((i) => !levels.includes(i.level))];
}

export function buildVocabGameQuestions(
  count: number,
  opts: { levels?: QuizLevel[]; reverse?: boolean; rng?: RngLike } = {},
): QuizQuestion[] {
  const rng = opts.rng ?? Math.random;
  const items = shuffleR(levelPool(VOCAB, opts.levels), rng).slice(0, count);
  if (opts.reverse) {
    const words = VOCAB.map((v) => v.word);
    return items.map((v) => ({
      prompt: `Which word means “${v.definition}”?`,
      options: shuffleR([v.word, ...distractorsR(words, [v.word], 3, rng)], rng),
      answer: v.word,
      explanation: `“${v.word}” means ${v.definition}.`,
    }));
  }
  const defs = VOCAB.map((v) => v.definition);
  return items.map((v) => ({
    prompt: `What does “${v.word}” mean?`,
    options: shuffleR([v.definition, ...distractorsR(defs, [v.definition], 3, rng)], rng),
    answer: v.definition,
    explanation: `“${v.word}” means ${v.definition}.`,
  }));
}

/* ------------------------------------------------------------------ */
/* Synonyms & Antonyms                                                */
/* ------------------------------------------------------------------ */

export type PairItem = { word: string; match: string; level: QuizLevel };

export const SYNONYMS: PairItem[] = [
  { word: "happy", level: "easy", match: "joyful" },
  { word: "big", level: "easy", match: "enormous" },
  { word: "smart", level: "easy", match: "intelligent" },
  { word: "fast", level: "easy", match: "rapid" },
  { word: "angry", level: "easy", match: "furious" },
  { word: "tired", level: "easy", match: "exhausted" },
  { word: "brave", level: "easy", match: "courageous" },
  { word: "beautiful", level: "easy", match: "gorgeous" },
  { word: "quiet", level: "easy", match: "silent" },
  { word: "rich", level: "easy", match: "wealthy" },
  { word: "sad", level: "easy", match: "sorrowful" },
  { word: "strong", level: "easy", match: "powerful" },
  { word: "funny", level: "easy", match: "hilarious" },
  { word: "cold", level: "easy", match: "freezing" },
  { word: "easy", level: "easy", match: "simple" },
  { word: "old", level: "easy", match: "ancient" },
  { word: "clever", level: "medium", match: "cunning" },
  { word: "honest", level: "medium", match: "truthful" },
  { word: "calm", level: "medium", match: "serene" },
  { word: "hard", level: "medium", match: "difficult" },
  { word: "begin", level: "easy", match: "commence" },
  { word: "buy", level: "easy", match: "purchase" },
  { word: "choose", level: "easy", match: "select" },
  { word: "help", level: "easy", match: "assist" },
  { word: "gather", level: "easy", match: "collect" },
  { word: "build", level: "easy", match: "construct" },
  { word: "ask", level: "medium", match: "inquire" },
  { word: "idea", level: "medium", match: "concept" },
  { word: "job", level: "medium", match: "occupation" },
  { word: "journey", level: "medium", match: "voyage" },
  { word: "important", level: "medium", match: "significant" },
  { word: "lucky", level: "medium", match: "fortunate" },
  { word: "strange", level: "medium", match: "bizarre" },
  { word: "vast", level: "medium", match: "immense" },
  { word: "yearly", level: "medium", match: "annual" },
  { word: "destroy", level: "medium", match: "demolish" },
  { word: "polite", level: "hard", match: "courteous" },
  { word: "tiny", level: "hard", match: "minuscule" },
];

export const ANTONYMS: PairItem[] = [
  { word: "happy", level: "easy", match: "sad" },
  { word: "big", level: "easy", match: "small" },
  { word: "fast", level: "easy", match: "slow" },
  { word: "hot", level: "easy", match: "cold" },
  { word: "light", level: "easy", match: "dark" },
  { word: "strong", level: "easy", match: "weak" },
  { word: "rich", level: "easy", match: "poor" },
  { word: "brave", level: "easy", match: "cowardly" },
  { word: "empty", level: "easy", match: "full" },
  { word: "early", level: "easy", match: "late" },
  { word: "ancient", level: "medium", match: "modern" },
  { word: "expand", level: "medium", match: "shrink" },
  { word: "generous", level: "medium", match: "stingy" },
  { word: "increase", level: "medium", match: "decrease" },
  { word: "victory", level: "medium", match: "defeat" },
  { word: "arrive", level: "medium", match: "depart" },
  { word: "accept", level: "medium", match: "reject" },
  { word: "smooth", level: "medium", match: "rough" },
  { word: "wise", level: "medium", match: "foolish" },
  { word: "praise", level: "medium", match: "criticize" },
  { word: "begin", level: "easy", match: "end" },
  { word: "buy", level: "easy", match: "sell" },
  { word: "alive", level: "easy", match: "dead" },
  { word: "bitter", level: "easy", match: "sweet" },
  { word: "cheap", level: "easy", match: "expensive" },
  { word: "enemy", level: "easy", match: "friend" },
  { word: "whisper", level: "easy", match: "shout" },
  { word: "artificial", level: "medium", match: "natural" },
  { word: "borrow", level: "medium", match: "lend" },
  { word: "deep", level: "medium", match: "shallow" },
  { word: "float", level: "medium", match: "sink" },
  { word: "guilty", level: "medium", match: "innocent" },
  { word: "include", level: "medium", match: "exclude" },
  { word: "liquid", level: "medium", match: "solid" },
  { word: "maximum", level: "medium", match: "minimum" },
  { word: "demand", level: "hard", match: "supply" },
  { word: "freedom", level: "hard", match: "captivity" },
  { word: "knowledge", level: "hard", match: "ignorance" },
];

function buildPairQuestions(items: PairItem[], label: string, count: number): QuizQuestion[] {
  const pool = items.map((i) => i.match);
  return shuffle(items)
    .slice(0, count)
    .map((i) => {
      const distractors = pickDistractors(pool, [i.match, i.word], 3);
      return {
        prompt: `Which word is ${label} of “${i.word}”?`,
        options: shuffle([i.match, ...distractors]),
        answer: i.match,
        explanation: `“${i.match}” is ${label} of “${i.word}”.`,
      };
    });
}

export const buildSynonymQuestions = (count = 8) =>
  buildPairQuestions(SYNONYMS, "a synonym", count);
export const buildAntonymQuestions = (count = 8) =>
  buildPairQuestions(ANTONYMS, "an antonym", count);

export function buildPairGameQuestions(
  items: PairItem[],
  label: string,
  count: number,
  opts: { levels?: QuizLevel[]; reverse?: boolean; rng?: RngLike } = {},
): QuizQuestion[] {
  const rng = opts.rng ?? Math.random;
  const picked = shuffleR(levelPool(items, opts.levels), rng).slice(0, count);
  if (opts.reverse) {
    const words = items.map((i) => i.word);
    return picked.map((i) => ({
      prompt: `Which word has ${label.replace("a ", "an ").replace("an synonym", "a synonym")} “${i.match}”?`,
      options: shuffleR([i.word, ...distractorsR(words, [i.word, i.match], 3, rng)], rng),
      answer: i.word,
      explanation: `“${i.match}” is ${label} of “${i.word}”.`,
    }));
  }
  const pool = items.map((i) => i.match);
  return picked.map((i) => ({
    prompt: `Which word is ${label} of “${i.word}”?`,
    options: shuffleR([i.match, ...distractorsR(pool, [i.match, i.word], 3, rng)], rng),
    answer: i.match,
    explanation: `“${i.match}” is ${label} of “${i.word}”.`,
  }));
}

export const buildSynonymGameQuestions = (
  count: number,
  opts: { levels?: QuizLevel[]; reverse?: boolean; rng?: RngLike } = {},
) => buildPairGameQuestions(SYNONYMS, "a synonym", count, opts);
export const buildAntonymGameQuestions = (
  count: number,
  opts: { levels?: QuizLevel[]; reverse?: boolean; rng?: RngLike } = {},
) => buildPairGameQuestions(ANTONYMS, "an antonym", count, opts);

/* ------------------------------------------------------------------ */
/* Prefixes & Suffixes                                                */
/* ------------------------------------------------------------------ */

export type AffixItem = { affix: string; meaning: string; example: string; level: QuizLevel };

export const PREFIXES: AffixItem[] = [
  { affix: "un-", level: "easy", meaning: "not / opposite of", example: "unhappy" },
  { affix: "re-", level: "easy", meaning: "again / back", example: "rewrite" },
  { affix: "pre-", level: "easy", meaning: "before", example: "preview" },
  { affix: "mis-", level: "easy", meaning: "wrongly / badly", example: "misspell" },
  { affix: "dis-", level: "medium", meaning: "not / apart from", example: "disagree" },
  { affix: "sub-", level: "medium", meaning: "under / below", example: "submarine" },
  { affix: "inter-", level: "medium", meaning: "between / among", example: "interact" },
  { affix: "trans-", level: "hard", meaning: "across / through", example: "transport" },
  { affix: "super-", level: "medium", meaning: "above / beyond", example: "superhuman" },
  { affix: "anti-", level: "medium", meaning: "against / opposing", example: "antivirus" },
  { affix: "auto-", level: "hard", meaning: "self", example: "automatic" },
  { affix: "bi-", level: "hard", meaning: "two / twice", example: "bicycle" },
  { affix: "tele-", level: "hard", meaning: "far / distant", example: "telephone" },
  { affix: "micro-", level: "hard", meaning: "small", example: "microscope" },
  { affix: "over-", level: "medium", meaning: "too much / above", example: "overload" },
  { affix: "under-", level: "medium", meaning: "too little / beneath", example: "underpaid" },
  { affix: "co-", level: "easy", meaning: "together / with", example: "cooperate" },
  { affix: "non-", level: "easy", meaning: "not", example: "nonsense" },
  { affix: "mid-", level: "easy", meaning: "middle", example: "midway" },
  { affix: "tri-", level: "easy", meaning: "three", example: "triangle" },
  { affix: "de-", level: "medium", meaning: "down / away from", example: "descend" },
  { affix: "ex-", level: "medium", meaning: "out of / former", example: "exit" },
  { affix: "in-", level: "medium", meaning: "not / into", example: "invisible" },
  { affix: "post-", level: "medium", meaning: "after", example: "postpone" },
];

export const SUFFIXES: AffixItem[] = [
  { affix: "-less", level: "easy", meaning: "without", example: "hopeless" },
  { affix: "-ful", level: "easy", meaning: "full of", example: "joyful" },
  { affix: "-able", level: "medium", meaning: "capable of being", example: "readable" },
  { affix: "-ness", level: "medium", meaning: "state or quality of", example: "kindness" },
  { affix: "-ment", level: "medium", meaning: "action or result of", example: "movement" },
  { affix: "-tion", level: "medium", meaning: "act or process of", example: "creation" },
  { affix: "-ly", level: "easy", meaning: "in the manner of", example: "quickly" },
  { affix: "-er", level: "easy", meaning: "one who does", example: "teacher" },
  { affix: "-ist", level: "medium", meaning: "one who practises", example: "artist" },
  { affix: "-ism", level: "hard", meaning: "a belief or practice", example: "heroism" },
  { affix: "-ish", level: "medium", meaning: "having the quality of", example: "childish" },
  { affix: "-ous", level: "medium", meaning: "full of / having", example: "dangerous" },
  { affix: "-ify", level: "medium", meaning: "to make or become", example: "simplify" },
  { affix: "-ward", level: "hard", meaning: "in the direction of", example: "backward" },
  { affix: "-hood", level: "medium", meaning: "state or condition of", example: "childhood" },
  { affix: "-ship", level: "medium", meaning: "state or skill of", example: "friendship" },
  { affix: "-ic", level: "easy", meaning: "relating to / having the nature of", example: "heroic" },
  { affix: "-ity", level: "medium", meaning: "state or quality of", example: "activity" },
  { affix: "-ian", level: "medium", meaning: "a person from or skilled in", example: "musician" },
  { affix: "-dom", level: "medium", meaning: "state or realm of", example: "freedom" },
  { affix: "-ology", level: "medium", meaning: "the study of", example: "biology" },
  { affix: "-ette", level: "hard", meaning: "a small version of", example: "kitchenette" },
  { affix: "-graph", level: "hard", meaning: "something written or recorded", example: "autograph" },
  { affix: "-phobia", level: "hard", meaning: "an extreme fear of", example: "arachnophobia" },
];

function buildAffixQuestions(items: AffixItem[], kind: string, count: number): QuizQuestion[] {
  const pool = items.map((i) => i.meaning);
  return shuffle(items)
    .slice(0, count)
    .map((i) => {
      const distractors = pickDistractors(pool, [i.meaning], 3);
      return {
        prompt: `What does the ${kind} “${i.affix}” mean?`,
        hint: `Example: ${i.example}`,
        options: shuffle([i.meaning, ...distractors]),
        answer: i.meaning,
        explanation: `“${i.affix}” means “${i.meaning}”, as in ${i.example}.`,
      };
    });
}

export const buildPrefixQuestions = (count = 8) => buildAffixQuestions(PREFIXES, "prefix", count);
export const buildSuffixQuestions = (count = 8) => buildAffixQuestions(SUFFIXES, "suffix", count);

export function buildAffixGameQuestions(
  items: AffixItem[],
  kind: string,
  count: number,
  opts: { levels?: QuizLevel[]; reverse?: boolean; rng?: RngLike } = {},
): QuizQuestion[] {
  const rng = opts.rng ?? Math.random;
  const picked = shuffleR(levelPool(items, opts.levels), rng).slice(0, count);
  if (opts.reverse) {
    const affixes = items.map((i) => i.affix);
    return picked.map((i) => ({
      prompt: `Which ${kind} means “${i.meaning}”?`,
      hint: `Example: ${i.example}`,
      options: shuffleR([i.affix, ...distractorsR(affixes, [i.affix], 3, rng)], rng),
      answer: i.affix,
      explanation: `“${i.affix}” means “${i.meaning}”, as in ${i.example}.`,
    }));
  }
  const meanings = items.map((i) => i.meaning);
  return picked.map((i) => ({
    prompt: `What does the ${kind} “${i.affix}” mean?`,
    hint: `Example: ${i.example}`,
    options: shuffleR([i.meaning, ...distractorsR(meanings, [i.meaning], 3, rng)], rng),
    answer: i.meaning,
    explanation: `“${i.affix}” means “${i.meaning}”, as in ${i.example}.`,
  }));
}

export const buildPrefixGameQuestions = (
  count: number,
  opts: { levels?: QuizLevel[]; reverse?: boolean; rng?: RngLike } = {},
) => buildAffixGameQuestions(PREFIXES, "prefix", count, opts);
export const buildSuffixGameQuestions = (
  count: number,
  opts: { levels?: QuizLevel[]; reverse?: boolean; rng?: RngLike } = {},
) => buildAffixGameQuestions(SUFFIXES, "suffix", count, opts);

/* ------------------------------------------------------------------ */
/* Spelling                                                           */
/* ------------------------------------------------------------------ */

export type SpellLevel = "easy" | "medium" | "hard";
export type SpellItem = { correct: string; wrong: string[]; hint: string; level: SpellLevel };

export const SPELLING: SpellItem[] = [
  {
    correct: "accommodate", level: "medium",
    wrong: ["accomodate", "acommodate", "accommadate"],
    hint: "to provide room or adapt to",
  },
  { correct: "definitely", level: "medium", wrong: ["definately", "definitly", "definetly"], hint: "without doubt" },
  { correct: "separate", level: "medium", wrong: ["seperate", "separete", "seperete"], hint: "to set apart" },
  {
    correct: "necessary", level: "medium",
    wrong: ["neccessary", "necesary", "neccesary"],
    hint: "required or essential",
  },
  {
    correct: "embarrass", level: "medium",
    wrong: ["embarass", "embarass", "embarras"],
    hint: "to cause to feel awkward",
  },
  {
    correct: "occurrence", level: "hard",
    wrong: ["occurence", "ocurrence", "occurrance"],
    hint: "an event or incident",
  },
  { correct: "rhythm", level: "hard", wrong: ["rythm", "rhythem", "rhytm"], hint: "a regular pattern of beats" },
  {
    correct: "conscience", level: "hard",
    wrong: ["concience", "conscence", "consciense"],
    hint: "sense of right and wrong",
  },
  {
    correct: "privilege", level: "medium",
    wrong: ["priviledge", "privelege", "privilage"],
    hint: "a special advantage",
  },
  {
    correct: "maintenance", level: "medium",
    wrong: ["maintainance", "maintenence", "maintanance"],
    hint: "the act of keeping in good order",
  },
  {
    correct: "recommend", level: "medium",
    wrong: ["reccommend", "recomend", "reccomend"],
    hint: "to advise or suggest",
  },
  {
    correct: "beginning", level: "easy",
    wrong: ["begining", "beginnning", "begginning"],
    hint: "the start of something",
  },
  { correct: "believe", level: "easy", wrong: ["beleive", "belive", "beleeve"], hint: "to accept as true" },
  {
    correct: "calendar", level: "medium",
    wrong: ["calender", "calandar", "calenndar"],
    hint: "a chart of days and months",
  },
  {
    correct: "government", level: "medium",
    wrong: ["goverment", "governement", "govenment"],
    hint: "the ruling body of a state",
  },
  {
    correct: "pronunciation", level: "hard",
    wrong: ["pronounciation", "pronunciaton", "prononciation"],
    hint: "the way a word is spoken",
  },
  {
    correct: "existence", level: "medium",
    wrong: ["existance", "existense", "exsistence"],
    hint: "the state of being",
  },
  { correct: "grateful", level: "easy", wrong: ["greatful", "gratefull", "gratful"], hint: "feeling thankful" },
  {
    correct: "mischievous", level: "hard",
    wrong: ["mischievious", "mischevous", "mischevious"],
    hint: "playfully causing trouble",
  },
  {
    correct: "possession", level: "medium",
    wrong: ["posession", "possesion", "possetion"],
    hint: "something owned",
  },

  /* --- Easy additions --- */
  { correct: "because", level: "easy", wrong: ["becouse", "becuse", "becuase"], hint: "for the reason that" },
  { correct: "friend", level: "easy", wrong: ["freind", "frind", "friedn"], hint: "a person you like and trust" },
  { correct: "beautiful", level: "easy", wrong: ["beautifull", "beautyful", "beautifel"], hint: "pleasing to look at" },
  { correct: "different", level: "easy", wrong: ["differant", "diffrent", "diferrent"], hint: "not the same" },
  { correct: "family", level: "easy", wrong: ["famly", "familey", "famely"], hint: "parents and children together" },
  { correct: "school", level: "easy", wrong: ["scool", "schol", "shcool"], hint: "a place where children learn" },
  { correct: "people", level: "easy", wrong: ["peopel", "poeple", "peple"], hint: "human beings in general" },
  { correct: "really", level: "easy", wrong: ["realy", "relly", "reely"], hint: "in fact; very" },
  { correct: "tomorrow", level: "easy", wrong: ["tommorow", "tomorow", "tommorrow"], hint: "the day after today" },
  { correct: "important", level: "easy", wrong: ["importent", "inportant", "importtant"], hint: "of great value or meaning" },
  { correct: "question", level: "easy", wrong: ["quesion", "quetion", "questoin"], hint: "something you ask" },
  { correct: "enough", level: "easy", wrong: ["enuf", "enogh", "enought"], hint: "as much as needed" },
  { correct: "animal", level: "easy", wrong: ["animel", "animmal", "animall"], hint: "a living creature that can move" },
  { correct: "again", level: "easy", wrong: ["agein", "agian", "againe"], hint: "one more time" },
  { correct: "always", level: "easy", wrong: ["allways", "alway", "allway"], hint: "at all times" },
  { correct: "before", level: "easy", wrong: ["befor", "bifore", "befour"], hint: "earlier than" },
  /* --- Medium additions --- */
  { correct: "achieve", level: "medium", wrong: ["acheive", "achiev", "acheeve"], hint: "to succeed in reaching a goal" },
  { correct: "address", level: "medium", wrong: ["adress", "addres", "adres"], hint: "the place where someone lives" },
  { correct: "business", level: "medium", wrong: ["buisness", "busines", "bussiness"], hint: "trade or a company" },
  { correct: "environment", level: "medium", wrong: ["enviroment", "environement", "enviornment"], hint: "the natural world around us" },
  { correct: "foreign", level: "medium", wrong: ["foriegn", "forein", "forigen"], hint: "from another country" },
  { correct: "guarantee", level: "medium", wrong: ["garantee", "gaurantee", "guarrantee"], hint: "a firm promise or assurance" },
  { correct: "immediate", level: "medium", wrong: ["imediate", "immediat", "immidiate"], hint: "happening right away" },
  { correct: "knowledge", level: "medium", wrong: ["knowlege", "knwoledge", "knowledg"], hint: "what a person knows" },
  { correct: "library", level: "medium", wrong: ["libary", "librery", "libarry"], hint: "a place full of books" },
  { correct: "persuade", level: "medium", wrong: ["persaude", "pursuade", "persuede"], hint: "to convince someone" },
  { correct: "receipt", level: "medium", wrong: ["reciept", "receit", "reseipt"], hint: "proof that you paid for something" },
  { correct: "secretary", level: "medium", wrong: ["secratary", "secretery", "secertary"], hint: "a person who handles office work" },
  { correct: "sincerely", level: "medium", wrong: ["sincerly", "sincerley", "sinscerely"], hint: "in a truthful, honest way" },
  { correct: "vegetable", level: "medium", wrong: ["vegtable", "vegetible", "vegatable"], hint: "a plant eaten as food" },
  { correct: "weather", level: "medium", wrong: ["weatherr", "wheather", "wethere"], hint: "rain, sun, wind and temperature outside" },
  { correct: "Wednesday", level: "medium", wrong: ["Wendsday", "Wednsday", "Wenesday"], hint: "the fourth day of the week (capitalised)" },
  { correct: "publicly", level: "medium", wrong: ["publically", "publicaly", "publlicly"], hint: "in front of everyone; openly" },
  { correct: "argument", level: "medium", wrong: ["arguement", "argumant", "arguemant"], hint: "a disagreement or a reason given" },
  { correct: "discipline", level: "medium", wrong: ["disipline", "dicipline", "disciplene"], hint: "training to follow rules" },
  { correct: "familiar", level: "medium", wrong: ["familar", "familliar", "familier"], hint: "well known to you" },
  { correct: "forty", level: "medium", wrong: ["fourty", "fortty", "fortey"], hint: "the number 40" },
  { correct: "particular", level: "medium", wrong: ["particuler", "particullar", "particalar"], hint: "one specific one" },
  { correct: "promise", level: "medium", wrong: ["promiss", "promice", "promisse"], hint: "to say you will definitely do something" },
  { correct: "success", level: "medium", wrong: ["sucess", "succes", "sucsess"], hint: "achieving what you aimed for" },
  { correct: "truly", level: "medium", wrong: ["truely", "trully", "trueley"], hint: "really and honestly" },
  { correct: "until", level: "medium", wrong: ["untill", "untile", "unttil"], hint: "up to a certain time" },
  { correct: "tongue", level: "medium", wrong: ["tounge", "tonguee", "tonggue"], hint: "the organ in your mouth; a language" },
  { correct: "amateur", level: "medium", wrong: ["amature", "amatuer", "ameuter"], hint: "someone who does something for love, not pay" },
  /* --- Hard additions --- */
  { correct: "vacuum", level: "hard", wrong: ["vaccum", "vacum", "vaccuum"], hint: "a space with no air; also a cleaner" },
  { correct: "questionnaire", level: "hard", wrong: ["questionaire", "questionnair", "quesionnaire"], hint: "a set of written questions for a survey" },
  { correct: "liaison", level: "hard", wrong: ["liason", "liaision", "liaeson"], hint: "close cooperation between people or groups" },
  { correct: "millennium", level: "hard", wrong: ["millenium", "milennium", "milleniam"], hint: "a period of one thousand years" },
  { correct: "threshold", level: "hard", wrong: ["threshhold", "treshold", "thresshold"], hint: "the level at which something begins" },
  { correct: "bureaucracy", level: "hard", wrong: ["beaurocracy", "burocracy", "bureacracy"], hint: "administration through many departments and rules" },
  { correct: "conscientious", level: "hard", wrong: ["conciencious", "conscientous", "consientious"], hint: "careful and thorough about your work" },
  { correct: "entrepreneur", level: "hard", wrong: ["entreprenuer", "entreprenur", "enterpreneur"], hint: "a person who starts a business" },
  { correct: "idiosyncrasy", level: "hard", wrong: ["idiosyncracy", "ideosyncrasy", "idosyncrasy"], hint: "a peculiar habit or characteristic" },
  { correct: "onomatopoeia", level: "hard", wrong: ["onomatopeia", "onomatopia", "onomatopea"], hint: "a word that imitates a sound, like 'buzz'" },
  { correct: "pharmaceutical", level: "hard", wrong: ["pharmaseutical", "pharmaceuticle", "pharmecuetical"], hint: "relating to medicinal drugs" },
  { correct: "pneumonia", level: "hard", wrong: ["neumonia", "pneumona", "pneomonia"], hint: "a serious lung infection" },
  { correct: "pseudonym", level: "hard", wrong: ["psuedonym", "pseudonim", "psudonym"], hint: "a false name used by an author" },
  { correct: "rendezvous", level: "hard", wrong: ["rendevous", "rendezvu", "rendezvou"], hint: "a meeting at an agreed time and place" },
  { correct: "silhouette", level: "hard", wrong: ["silouette", "sillhouette", "silohuette"], hint: "a dark outline against a light background" },
  { correct: "supersede", level: "hard", wrong: ["supercede", "superseed", "supersed"], hint: "to take the place of something older" },
  { correct: "diarrhea", level: "hard", wrong: ["diarhea", "diarrea", "diarrheaa"], hint: "an illness causing frequent loose stools" },
  { correct: "chandelier", level: "hard", wrong: ["chandalier", "chandilier", "chandeleer"], hint: "a large decorative hanging light" },
  { correct: "kaleidoscope", level: "hard", wrong: ["kaliedoscope", "kaleidescope", "kaledoscope"], hint: "a tube of mirrors making changing patterns" },
  { correct: "paraphernalia", level: "hard", wrong: ["paraphenalia", "parafernalia", "paraphernala"], hint: "the equipment needed for an activity" },
];

export function buildSpellingQuestions(count = 8): QuizQuestion[] {
  return shuffle(SPELLING)
    .slice(0, count)
    .map((s) => ({
      prompt: "Which spelling is correct?",
      hint: `Meaning: ${s.hint}`,
      options: shuffle([s.correct, ...s.wrong.slice(0, 3)]),
      answer: s.correct,
      explanation: `The correct spelling is “${s.correct}”.`,
    }));
}

/* ------------------------------------------------------------------ */
/* Word of the day                                                    */
/* ------------------------------------------------------------------ */

export type DailyEntry = {
  word: string;
  pos: string;
  ipa: string;
  definition: string;
  example: string;
};

export const WORD_BANK: DailyEntry[] = [
  {
    word: "serendipity",
    pos: "noun",
    ipa: "/ˌsɛr.ənˈdɪp.ɪ.ti/",
    definition: "the occurrence of happy events by chance",
    example: "Finding that book was pure serendipity.",
  },
  {
    word: "ephemeral",
    pos: "adjective",
    ipa: "/ɪˈfɛm.ər.əl/",
    definition: "lasting for a very short time",
    example: "The beauty of the sunset was ephemeral.",
  },
  {
    word: "petrichor",
    pos: "noun",
    ipa: "/ˈpɛt.rɪ.kɔːr/",
    definition: "the pleasant smell of rain on dry earth",
    example: "She loved the petrichor after the storm.",
  },
  {
    word: "eloquence",
    pos: "noun",
    ipa: "/ˈɛl.ə.kwəns/",
    definition: "fluent, persuasive and expressive speech",
    example: "His eloquence moved the entire room.",
  },
  {
    word: "resilience",
    pos: "noun",
    ipa: "/rɪˈzɪl.i.əns/",
    definition: "the capacity to recover quickly from difficulty",
    example: "Her resilience carried her through hard times.",
  },
  {
    word: "luminous",
    pos: "adjective",
    ipa: "/ˈluː.mɪ.nəs/",
    definition: "giving off or reflecting light; radiant",
    example: "The moon was luminous over the calm sea.",
  },
  {
    word: "quintessential",
    pos: "adjective",
    ipa: "/ˌkwɪn.tɪˈsɛn.ʃəl/",
    definition: "representing the most perfect example of a quality",
    example: "It was the quintessential summer afternoon.",
  },
  {
    word: "mellifluous",
    pos: "adjective",
    ipa: "/məˈlɪf.lu.əs/",
    definition: "sweet or musical; pleasant to hear",
    example: "Her mellifluous voice filled the hall.",
  },
  {
    word: "wanderlust",
    pos: "noun",
    ipa: "/ˈwɒn.də.lʌst/",
    definition: "a strong desire to travel and explore",
    example: "His wanderlust took him across three continents.",
  },
  {
    word: "solace",
    pos: "noun",
    ipa: "/ˈsɒl.əs/",
    definition: "comfort in a time of sadness or distress",
    example: "She found solace in music.",
  },
  {
    word: "ubiquitous",
    pos: "adjective",
    ipa: "/juːˈbɪk.wɪ.təs/",
    definition: "present or found everywhere",
    example: "Smartphones are now ubiquitous.",
  },
  {
    word: "nostalgia",
    pos: "noun",
    ipa: "/nɒsˈtæl.dʒə/",
    definition: "a wistful longing for the past",
    example: "Old songs filled him with nostalgia.",
  },
  {
    word: "tenacity",
    pos: "noun",
    ipa: "/təˈnæs.ɪ.ti/",
    definition: "persistence and firm determination",
    example: "Her tenacity won her the championship.",
  },
  {
    word: "effervescent",
    pos: "adjective",
    ipa: "/ˌɛf.əˈvɛs.ənt/",
    definition: "vivacious, bubbly and enthusiastic",
    example: "His effervescent personality lit up the party.",
  },
  {
    word: "halcyon",
    pos: "adjective",
    ipa: "/ˈhæl.si.ən/",
    definition: "denoting a peaceful and happy period",
    example: "They recalled the halcyon days of childhood.",
  },
  {
    word: "sonder",
    pos: "noun",
    ipa: "/ˈsɒn.dər/",
    definition: "the realisation that each passer-by has a life as vivid as your own",
    example: "A wave of sonder hit her on the busy street.",
  },
  {
    word: "verdant",
    pos: "adjective",
    ipa: "/ˈvɜː.dənt/",
    definition: "green with lush vegetation",
    example: "The valley was verdant after the rains.",
  },
  {
    word: "aplomb",
    pos: "noun",
    ipa: "/əˈplɒm/",
    definition: "self-confidence and poise in a demanding situation",
    example: "She handled the interview with aplomb.",
  },
  {
    word: "cascade",
    pos: "noun",
    ipa: "/kæsˈkeɪd/",
    definition: "a small waterfall or a flow of something",
    example: "A cascade of ideas followed the meeting.",
  },
  {
    word: "reverie",
    pos: "noun",
    ipa: "/ˈrɛv.ər.i/",
    definition: "a state of pleasant, dreamy thought",
    example: "He was lost in a reverie by the window.",
  },
  {
    word: "incandescent",
    pos: "adjective",
    ipa: "/ˌɪn.kænˈdɛs.ənt/",
    definition: "glowing with intense heat, light or emotion",
    example: "The stage glowed with incandescent light.",
  },
  {
    word: "ineffable",
    pos: "adjective",
    ipa: "/ɪnˈɛf.ə.bəl/",
    definition: "too great to be expressed in words",
    example: "The view gave her an ineffable joy.",
  },
  {
    word: "zephyr",
    pos: "noun",
    ipa: "/ˈzɛf.ər/",
    definition: "a soft, gentle breeze",
    example: "A warm zephyr drifted through the garden.",
  },
  {
    word: "elysian",
    pos: "adjective",
    ipa: "/ɪˈlɪʒ.ən/",
    definition: "beautiful, blissful or heavenly",
    example: "The meadow felt elysian at dawn.",
  },
];

/** Deterministic offset from a date (days since epoch) so the word is stable per day. */
function dayIndex(date = new Date()): number {
  const utc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor(utc / 86_400_000);
}

export function wordForDate(date = new Date()): DailyEntry {
  return WORD_BANK[((dayIndex(date) % WORD_BANK.length) + WORD_BANK.length) % WORD_BANK.length];
}

export function formatLongDate(date = new Date()): string {
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ------------------------------------------------------------------ */
/* Spelling game helpers (levels, seeded daily set, endless pool)     */
/* ------------------------------------------------------------------ */

export type Rng = () => number;

export function mulberry32(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function seedFromString(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function shuffleWith<T>(arr: T[], rng: Rng): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function spellingPool(levels: SpellLevel[]): SpellItem[] {
  return SPELLING.filter((w) => levels.includes(w.level));
}

/** Pick `count` unique spelling items from the given levels. */
export function pickSpellingItems(count: number, levels: SpellLevel[], rng: Rng = Math.random): SpellItem[] {
  return shuffleWith(spellingPool(levels), rng).slice(0, count);
}
