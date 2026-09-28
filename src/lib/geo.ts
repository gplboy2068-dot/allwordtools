/**
 * Generative Engine Optimization (GEO) & AI Search Engine Module
 *
 * Designed for Google AI Overviews, Perplexity, ChatGPT Search, Bing Copilot, and Gemini.
 * Provides direct answer extraction, entity definition registries, and enriched
 * SoftwareApplication structured data schemas.
 */

import type { Tool } from "@/data/tools";
import type { ToolContent } from "@/data/tool-content";
import type { LocalizedToolContent } from "@/i18n/content";
import { BASE_URL, inLanguage } from "@/i18n/seo";

const SITE = "AllWordTools.com";

/**
 * Curated, authoritative direct definitions (40–60 words) for top tools.
 * Formatted for direct extraction by AI search engines without conversational filler.
 */
export const DIRECT_ANSWERS_REGISTRY: Record<string, string> = {
  "letter-rearranger":
    "A letter rearranger is an anagram and permutation engine that reorganizes letters into valid English words. Enter your letters or scramble to instantly discover all possible word combinations sorted by length and point value, ideal for solving word puzzles, board games, and creative anagrams.",
  "missing-letters-finder":
    "A missing letters finder searches the dictionary for words that match a pattern with unknown or missing characters. By replacing blank tiles with question marks or wildcards, it immediately pinpoints all qualifying words for crosswords, Wordle clues, Hangman, and vocabulary puzzles.",
  "word-unscrambler":
    "A word unscrambler rearranges scrambled letters into valid words across official tournament dictionaries. Enter your rack tiles with up to two wildcards to generate every playable anagram grouped by word length and ranked by Scrabble and Words With Friends scores.",
  "anagram-solver":
    "An anagram solver finds all valid words formed by rearranging a specific set of letters. It compares input letters against comprehensive lexical databases to generate complete anagrams, sub-anagrams, and high-scoring words for Scrabble, crosswords, and word puzzles.",
  "wordle-solver":
    "A Wordle solver is an interactive deduction tool that narrows down five-letter word solutions based on green, yellow, and gray tile feedback. It eliminates impossible letters and calculates optimal next guesses to protect your daily winning streak.",
  "crossword-solver":
    "A crossword solver finds matching words using known letters and blank spaces. Enter puzzle patterns with question marks or dots for unknown letters, and the solver instantly scans over 170,000 dictionary entries to supply precise solutions for grid clues.",
  "scrabble-helper":
    "A Scrabble helper unscrambles tile racks into high-scoring words using official TWL06 and CSW21 dictionaries. It supports blank wildcards, board hooks, prefix/suffix filters, and calculates exact letter values to help you find game-winning plays.",
  "words-with-friends-helper":
    "A Words With Friends helper unscrambles your letter tiles to discover the highest-scoring moves on the WWF board. It accounts for official WWF tile values, double and triple bonus squares, and wildcard blanks to maximize your score every turn.",
  "boggle-solver":
    "A Boggle solver is an algorithm that finds every valid word hidden in 4x4 and 5x5 letter grids. Using depth-first search and official word lists, it traces adjacent letter paths horizontally, vertically, and diagonally to discover all valid puzzle words in milliseconds.",
  "hangman-solver":
    "A Hangman solver calculates the most probable missing letters and matching words for any partially completed Hangman puzzle. By analyzing letter frequency distributions across dictionary entries of matching length, it identifies the statistically safest guesses to save your game.",
  "text-twist-solver":
    "A Text Twist solver unscrambles six-letter and seven-letter anagram puzzles to unlock every qualifying word. It solves the required bingo word to advance rounds and lists all three, four, and five-letter sub-words needed to achieve high scores.",
  "spelling-bee-solver":
    "A Spelling Bee solver finds every valid word from seven puzzle letters, ensuring every answer contains the mandatory center letter. It filters against official New York Times word lists and highlights pangrams to help you reach Genius and Queen Bee rank.",
  "word-finder":
    "A word finder searches comprehensive English dictionaries using custom letter constraints, lengths, and positions. Filter words by starting letters, endings, or contained sequences to discover playable vocabulary for board games, creative writing, and school assignments.",
  "words-starting-with":
    "A words starting with finder discovers all English words that begin with a specific letter or prefix. Filter by word length and dictionary to find precise vocabulary for word games, rhyming poetry, phonics instruction, and crossword clues.",
  "words-ending-with":
    "A words ending with finder discovers every English word ending with a chosen letter, suffix, or rhyme sound. Specify exact word lengths to pinpoint ideal solutions for crosswords, rhyming poetry, linguistic analysis, and vocabulary study.",
  "words-containing":
    "A words containing finder searches the dictionary for words that include a specific letter sequence anywhere within them. It reveals hidden letter combinations across any desired word length, making it indispensable for Scrabble hooks, crosswords, and word puzzles.",
  "letter-counter":
    "A letter counter analyzes text in real time to calculate character counts, letter frequencies, word totals, and space distributions. It provides comprehensive character frequency breakdowns and reading statistics for writers, editors, students, and social media managers.",
  "letter-pattern-finder":
    "A letter pattern finder locates words that follow exact structural constraints, consonant-vowel templates, or regex patterns. It pinpoints words matching specific letter positions and repetitions, providing vital assistance for cryptograms, linguistics research, and puzzle solving.",
  "synonym-finder":
    "A synonym finder searches a rich thesaurus to provide context-aware alternative words and nuanced expressions. It categorizes results by parts of speech and tone to help writers, students, and professionals eliminate repetition and enrich their vocabulary.",
  "antonym-finder":
    "An antonym finder instantly generates direct opposites and contrasting words for any English term. Grouped by parts of speech and shades of meaning, it helps writers create contrast, students prepare for verbal reasoning tests, and communicators sharpen their arguments.",
  "rhyming-words":
    "A rhyming dictionary finds perfect rhymes, slant rhymes, and multi-syllable sound matches for any English word. Categorized by syllable count and rhyme type, it provides songwriters, poets, and lyricists with versatile phonetic matches for creative composition.",
  "syllable-counter":
    "A syllable counter calculates the exact syllable count of words, sentences, or poems using algorithmic phoneme analysis. It highlights rhythmic cadence and syllable divisions, making it essential for crafting haikus, sonnets, song lyrics, and evaluating readability scores.",
  "spell-checker":
    "An online spell checker scans written text in real time to identify typos, spelling mistakes, and grammatical inconsistencies. It provides instant contextual corrections, phonetic suggestions, and dictionary definitions to ensure clear, professional, and polished writing.",
  "codycross-solver":
    "A CodyCross solver provides verified solutions for themed crossword puzzle clues across all game worlds and adventure phases. Search by clue text or known letter patterns to immediately identify the exact answers needed to progress through challenging levels.",
  "ai-word-explainer":
    "An AI word explainer breaks down complex words, idioms, and technical terms into simple, intuitive explanations. Powered by artificial intelligence, it provides clear definitions, real-world examples, etymological context, and usage tips tailored to any reading level.",
  "assonance-finder":
    "An assonance finder identifies words that share repeating vowel sounds within poetry, lyrics, and literary prose. It maps internal vowel resonances to help writers, poets, and rappers create lyrical rhythm, musical cadence, and captivating poetic flow.",
  "alliteration-generator":
    "An alliteration generator crafts rhythmic sentences, poetic lines, and memorable brand names using matching consonant sounds. Ideal for poets, writers, and marketers, it generates harmonious phrases with repeated initial letters to maximize creative impact and readability.",
  "tongue-twister-generator":
    "A tongue twister generator creates challenging alliterative phrases and phonetic sequences designed for speech therapy, pronunciation practice, and vocal warmups. It targets tricky consonant blends and rapid vowel shifts to improve diction, articulation, and clarity.",
  "word-ladder-solver":
    "A word ladder solver finds the shortest path of single-letter transitions connecting one word to another. Using breadth-first search across verified dictionaries, it calculates optimal step-by-step transformations where each intermediate rung forms a valid English word.",
  "strands-solver":
    "A Strands solver deciphers the daily New York Times Strands word search puzzle by identifying the theme spangram and hidden theme words. It traces interconnected letter paths across the 6x8 board to reveal all valid solutions without wasting clues.",
  "passive-voice-checker":
    "A passive voice checker identifies passive sentence structures in writing and suggests active voice alternatives. It highlights forms of 'to be' paired with past participles to help writers achieve direct, engaging, and clear professional communication.",
  "cat-name-generator":
    "A cat name generator creates creative, charming, and personalized names for kittens and adult cats. Filter by personality, color, breed, theme, or gender to find the perfect moniker that matches your feline companion's unique spirit.",
  "dog-name-generator":
    "A dog name generator generates inspiring, playful, and distinguished names for puppies and rescue dogs. Browse names filtered by size, personality, coat color, and origin to choose a memorable moniker that suits your dog's character.",
  "clan-name-generator":
    "A clan name generator creates formidable, immersive names for gaming clans, fantasy guilds, and competitive esports teams. Choose from medieval, futuristic, stealthy, and tactical styles to forge an iconic identity for your gaming community.",
  "character-name-generator":
    "A character name generator generates authentic, evocative names for fiction writers, game designers, and roleplayers. Filter by genre, cultural background, fantasy race, and historical period to discover names that give your characters depth and personality.",
  "riddle-generator":
    "A riddle generator creates clever word riddles, logic puzzles, and brain teasers for game nights, classrooms, and social challenges. Filter by difficulty, theme, or age group to generate engaging enigmas with verifiable solutions.",
  "sight-word-generator":
    "A sight word generator generates standardized Dolch and Fry sight word practice lists for early readers, kindergarteners, and elementary classrooms. It organizes high-frequency vocabulary by grade level and frequency to accelerate reading fluency.",
  "cvc-word-generator":
    "A CVC word generator creates consonant-vowel-consonant word lists for phonics learners, early readers, and literacy educators. Filter by vowel sound or rhyming word family to build foundational decoding and blending confidence.",
};

/**
 * Extracts or synthesizes a clean, 35–65 word authoritative direct definition.
 */
export function getDirectAnswer(
  slug: string,
  content?: ToolContent | LocalizedToolContent,
  fallbackTool?: Tool
): string {
  // 1. Explicit quickAnswer if authored
  if (content?.quickAnswer && content.quickAnswer.trim().length > 0) {
    return content.quickAnswer.trim();
  }

  // 2. Curated GEO definition registry
  if (DIRECT_ANSWERS_REGISTRY[slug]) {
    return DIRECT_ANSWERS_REGISTRY[slug];
  }

  // 3. Extract from intro[0]
  const intro0 = content?.intro?.[0];
  if (intro0 && intro0.trim().length > 0) {
    const clean = intro0.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim();
    const words = clean.split(/\s+/);
    if (words.length >= 35 && words.length <= 65) {
      return clean;
    }

    // Try extracting first 1 or 2 complete sentences
    const safeText = clean.replace(/AllWordTools\.com/g, "AllWordTools");
    const sentenceMatches = safeText.match(/[^.!?]+[.!?]+/g);
    if (sentenceMatches && sentenceMatches.length > 0) {
      let candidate = sentenceMatches[0].trim();
      if (candidate.split(/\s+/).length < 35 && sentenceMatches.length > 1) {
        candidate = `${sentenceMatches[0].trim()} ${sentenceMatches[1].trim()}`;
      }
      const candWords = candidate.split(/\s+/).length;
      if (candWords >= 30 && candWords <= 65) {
        return candidate;
      }
    }

    // Truncate cleanly at 55 words if too long
    if (words.length > 65) {
      return words.slice(0, 52).join(" ") + "...";
    }
    return clean;
  }

  // 4. Default fallback from tool metadata
  if (fallbackTool) {
    return `${fallbackTool.name} is a free web-based language utility designed to ${fallbackTool.description.toLowerCase().replace(/^\w/, (c) => c.toLowerCase())}. It processes entries instantly in the browser without sign-up or downloads.`;
  }

  return "";
}

/**
 * Generates an enriched SoftwareApplication JSON-LD schema for AI & Search crawlers.
 */
export function buildEnhancedSoftwareSchema({
  tool,
  content,
  locale,
  url,
  categoryTitle,
}: {
  tool: Tool;
  content?: ToolContent | LocalizedToolContent;
  locale: string;
  url: string;
  categoryTitle?: string;
}) {
  const directAnswer = getDirectAnswer(slugToKey(tool.slug), content, tool);

  const features: string[] = [];
  if (content?.howToSteps && content.howToSteps.length > 0) {
    features.push(...content.howToSteps.map((s) => s.title));
  } else {
    features.push(tool.description, "Instant browser computation", "Zero installation required");
  }

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    url,
    applicationCategory: "UtilitiesApplication",
    applicationSubCategory: categoryTitle ?? "Word Games & Vocabulary",
    operatingSystem: "All (Web Browser, Chrome, Safari, Firefox, Edge, iOS, Android)",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    softwareVersion: "2.0",
    isAccessibleForFree: true,
    description: directAnswer || tool.description,
    featureList: features,
    inLanguage: inLanguage(locale),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    publisher: {
      "@type": "Organization",
      name: SITE,
      url: BASE_URL,
    },
  };
}

function slugToKey(slug: string): string {
  return slug;
}
