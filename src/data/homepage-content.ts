/**
 * Long-form SEO content for the homepage (~2000 words across sections).
 * Kept in data so the route/component stays lean and content is easy to edit.
 */

export type ContentSection = {
  id: string;
  heading: string;
  /** AI image prompt to generate a premium illustration for this section later. */
  imagePrompt: string;
  paragraphs: string[];
};

export const seoContent: ContentSection[] = [
  {
    id: "what-are-word-tools",
    heading: "What are word tools?",
    imagePrompt:
      "Editorial vector illustration of floating letter tiles forming words above an open dictionary, magnifying glass highlighting a definition, warm cream background with ink-navy and honey-amber accents, clean premium SaaS style.",
    paragraphs: [
      "Word tools are online utilities designed to help you play word games, solve puzzles and improve your command of the English language. At their core, they take the letters, patterns or clues you already have and search enormous, carefully maintained dictionaries to reveal every possible word that fits. In a single click you can unscramble a jumble of letters, find every anagram, discover words that start or end with a specific string, or narrow down the answer to today's Wordle.",
      "What makes modern word tools so powerful is speed and breadth. Instead of flipping through a paper dictionary or guessing, you get a complete, ranked list of valid words in a fraction of a second. Results are usually organised by length and score, so the most useful plays float straight to the top. Whether you are a casual player, a competitive Scrabble enthusiast, a crossword devotee, a writer, a teacher or a language learner, there is a tool here built for exactly what you need.",
      "Our platform brings 92 of these tools together across 13 beautifully organised categories. From word solvers and letter tools to writing aids and dedicated game helpers, every utility shares the same fast, friendly and accessible experience — no downloads, no sign-ups and no clutter.",
    ],
  },
  {
    id: "benefits",
    heading: "The benefits of using word tools",
    imagePrompt:
      "Illustration showing a person delighted while playing a word game on a phone, with icons for learning, speed and accuracy floating around, warm cream and honey palette, ink-navy line accents, modern flat vector.",
    paragraphs: [
      "The most obvious benefit is winning more games. When you can instantly see the highest-scoring play from your Scrabble rack or the last few candidates in Wordle, you spend less time stuck and more time enjoying the game. But the advantages go far beyond a single match.",
      "Word tools are outstanding learning aids. Every time you unscramble letters or explore synonyms, you encounter new words, reinforce spelling and understand which letter combinations are valid in English. Students preparing for exams, writers searching for the perfect word, and learners building fluency all use these tools to grow their vocabulary in a way that feels effortless and even fun.",
      "They are also great for settling friendly disputes. Is that really a word? Does it rhyme? How many syllables does it have? Instead of arguing, you get an instant, verifiable answer generated from curated word lists. And because everything is free and works on any device, help is always a tap away whether you are on the sofa, on the train or at your desk.",
    ],
  },
  {
    id: "how-they-work",
    heading: "How word tools work",
    imagePrompt:
      "Technical yet elegant illustration of letters flowing into a search engine and out as a ranked word list, gears and a dictionary in the background, cream and ink-navy palette with honey highlights, isometric vector style.",
    paragraphs: [
      "Behind every tool is a large, curated dictionary and a fast matching engine. When you type your letters or pattern, the tool compares your input against the entire word list, applying the rules of the game or search you have chosen. For a word unscrambler, that means finding every combination of your letters that spells a valid word. For a pattern search, it means matching your known letters and wildcards to words of the right shape.",
      "Different games accept different words, so choosing the correct dictionary matters. Scrabble and Words With Friends each use their own official lists and letter values, while Wordle only accepts valid five-letter answers. Our tools let you select the right dictionary so the results always reflect the game you are actually playing.",
      "Once matches are found, the results are scored and sorted. Word game helpers rank plays by points; letter tools sort by length or alphabetical order; writing tools group results by meaning, sound or syllable count. The heavy lifting happens instantly and privately in your browser, which is why the answers appear the moment you press search.",
    ],
  },
  {
    id: "supported-games",
    heading: "Which games and puzzles are supported",
    imagePrompt:
      "Collage illustration of popular word games — Scrabble board, Wordle grid, crossword, Boggle cubes and Words With Friends tiles — arranged neatly, warm cream background, ink-navy and honey accents, premium flat vector.",
    paragraphs: [
      "We support the word games people love most. Scrabble players can find the highest-scoring plays using the official tournament dictionary and precise tile values. Words With Friends fans get moves tuned to that game's unique board and word list. Wordle solvers narrow the daily answer using your green, yellow and grey clues, while crossword solvers fill missing squares from a clue length and the letters you already know.",
      "Puzzle lovers are covered too. Our anagram solver and word unscrambler make short work of newspaper jumbles and app-based letter games. Boggle and Text Twist solvers dig every hidden word out of a grid or scramble, and the Hangman helper suggests the smartest letters to guess next so you rarely run out of tries.",
      "Because the platform is always growing, the list of supported games and puzzles keeps expanding. If there is a popular word game you enjoy, there is a very good chance we already have a dedicated helper for it — and if not, it is probably on the way.",
    ],
  },
  {
    id: "why-use",
    heading: "Why use our word tools",
    imagePrompt:
      "Illustration of a trophy made of letter tiles surrounded by sparkles and a checkmark badge, conveying quality and trust, cream and honey-amber palette with ink-navy details, clean vector.",
    paragraphs: [
      "There are many word tools online, but few combine accuracy, speed and a genuinely pleasant experience the way ours do. Our dictionaries are large and well maintained, our matching is precise, and our interface is designed to get you to the answer with the fewest possible taps. There are no confusing menus, intrusive interruptions or slow-loading pages standing between you and the word you need.",
      "Everything is mobile-first and lightning fast, so the tools feel just as good on your phone as on a desktop. The design is modern and readable, with a light and dark mode so you can play comfortably at any time of day. And because every tool is free with no account required, you can jump straight in.",
      "We also care about helping you learn, not just win. Alongside the answers, our tools surface useful context — definitions, scores, syllables and related words — so every search leaves you a little more fluent than before.",
    ],
  },
  {
    id: "examples-and-tips",
    heading: "Examples and expert tips",
    imagePrompt:
      "Illustration of a friendly guide character pointing to tips and example words on a board, lightbulb and star icons, warm cream and honey palette, ink-navy line work, modern flat vector.",
    paragraphs: [
      "Here is how a typical search plays out. Say your Scrabble rack reads R, A, T, I, O, N and S. Drop those seven letters into the word unscrambler, choose the Scrabble dictionary, and you will instantly see high-value plays — including the seven-letter bingo that earns a fifty-point bonus. Stuck on a crossword clue that is five letters long with a T in the third square? Enter the pattern ??T?? and the solver returns every matching word.",
      "A few expert tips go a long way. Learn the short two- and three-letter words first; they are the secret weapon of top Scrabble players for connecting plays and squeezing points out of tight boards. Keep an eye on high-value tiles like Q, Z, X and J, and remember the handful of Q-without-U words that can save a stuck rack. In Wordle, open with a guess rich in common vowels and consonants to eliminate as many possibilities as possible before you commit.",
      "For writers, use the synonym and antonym tools to vary your language and avoid repetition, and lean on the rhyming and syllable tools to keep poetry and lyrics flowing. Small habits like these, repeated over time, turn casual play into real skill and make you a sharper, more confident user of English.",
    ],
  },
];
