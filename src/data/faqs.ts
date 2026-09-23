export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    question: "What are word tools and how do they work?",
    answer:
      "Word tools are smart online utilities that analyse letters, patterns and dictionaries to help you play word games, expand your vocabulary and write better. You type in the letters you have or the pattern you are looking for, and the tool instantly searches a large, curated word list to return every valid match — usually sorted by length, points or relevance. Everything runs in your browser in a fraction of a second, so there is nothing to install and no waiting around.",
  },
  {
    question: "Which word games do these tools support?",
    answer:
      "Our helpers are optimised for the most popular word games in the world, including Scrabble, Words With Friends, Wordle, crosswords, Boggle, Hangman, Text Twist and countless anagram and jumble puzzles found in newspapers and apps. Each game uses its own dictionary and scoring rules, so we tailor the results — Scrabble uses tournament-style word lists, while Wordle focuses on valid five-letter answers.",
  },
  {
    question: "Is using a word unscrambler considered cheating?",
    answer:
      "Word tools are best thought of as learning and practice aids rather than a way to cheat. Millions of players use them to study new words, understand why a play is valid, improve their strategy and settle friendly disputes. In casual games among friends, or when you are practising solo, they are a fantastic way to get better. Whether to use them in a competitive setting is always your call and depends on the rules you have agreed with other players.",
  },
  {
    question: "Are the word tools free to use?",
    answer:
      "Yes. Every tool on the platform is completely free to use, with no sign-up required. You can unscramble words, solve anagrams, find rhymes and more as many times as you like. We keep the experience fast and lightweight so that you get answers instantly on any device.",
  },
  {
    question: "How accurate are the results?",
    answer:
      "We use large, regularly maintained dictionaries based on recognised word lists, so the results are highly accurate for the game you select. Because different games accept different words, we let you pick the right dictionary for Scrabble, Words With Friends and general English. If you ever spot a word that seems out of place, remember that game dictionaries sometimes include obscure but officially valid words.",
  },
  {
    question: "Can I search for words by length?",
    answer:
      "Absolutely. Many tools let you filter by exact length — for example, only five-letter words for Wordle, or seven-letter words to hunt for a Scrabble bingo. You can combine length filters with starting letters, ending letters and contained letters to zero in on precisely the words you need.",
  },
  {
    question: "What is the difference between an anagram solver and a word unscrambler?",
    answer:
      "A word unscrambler finds all valid words you can make from a set of letters, including shorter words that use only some of them. An anagram solver focuses on rearrangements that use every letter to form a new word or phrase. In practice the two overlap a great deal, and our tools show both partial and full-length results so you never miss a play.",
  },
  {
    question: "How do I use wildcards or blank tiles?",
    answer:
      "When you have a blank tile in Scrabble or Words With Friends, or you simply do not know a letter, you can use a wildcard — usually a question mark or asterisk — to represent any letter. Our solvers expand each wildcard across the entire alphabet and return every word that fits, clearly showing which letters filled the blanks.",
  },
  {
    question: "Can these tools help me improve my vocabulary?",
    answer:
      "Definitely. Beyond winning games, word tools are a powerful vocabulary builder. Discovering new words, seeing their definitions, exploring synonyms and antonyms, and learning which letter combinations are valid all reinforce your language skills. Many students, writers, teachers and language learners use them daily to study spelling and expand their vocabulary.",
  },
  {
    question: "Do the tools work on mobile phones and tablets?",
    answer:
      "Yes. The entire platform is built mobile-first and fully responsive, so every tool works beautifully on phones, tablets, laptops and desktops. The layout adapts to your screen, buttons stay easy to tap, and results load quickly even on slower connections.",
  },
  {
    question: "How does the Wordle solver work?",
    answer:
      "The Wordle solver narrows down the possible answers based on the clues you already have. You enter the letters you know are correct and in the right position, the letters that are present but misplaced, and the letters you have ruled out. The tool then filters the five-letter word list to reveal the remaining candidates and suggests strong next guesses that eliminate the most possibilities.",
  },
  {
    question: "Can I find rhyming words for songs and poetry?",
    answer:
      "Yes. Our rhyming words tool finds perfect rhymes, near rhymes and words with similar sounds, which is ideal for songwriting, poetry, rap lyrics and greeting cards. You can browse results by syllable count and stress pattern to keep your lines flowing naturally.",
  },
  {
    question: "What is a syllable counter used for?",
    answer:
      "A syllable counter tells you how many syllables are in a word or a whole passage of text. It is invaluable for writing haiku and other structured poetry, checking readability, teaching phonics, and fitting lyrics to a melody. Simply paste your text and the counter breaks each word down instantly.",
  },
  {
    question: "How is the highest-scoring Scrabble word calculated?",
    answer:
      "Our Scrabble helper assigns each letter its official point value, then sums the tiles for every valid word you can spell from your rack. Results are ranked from highest to lowest score so you can spot the biggest play at a glance. Where you place the word on the board — hitting double and triple squares — can boost the score even further.",
  },
  {
    question: "Will you be adding more word tools?",
    answer:
      "Yes, constantly. We are building the most comprehensive collection of English word tools anywhere, and new solvers, generators and language helpers are added regularly. Bookmark the site and check the Latest Tools section on the homepage to see what has just launched.",
  },
];
