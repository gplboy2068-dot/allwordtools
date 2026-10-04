/**
 * IndexNow URL submitter (Bing, Yandex, Seznam, Naver).
 * Run with: npm run indexnow
 *
 * Submits all localized tool URLs, categories, blog posts and core pages
 * so corrected metadata (e.g. the "92 tools" homepage description) gets
 * recrawled faster. Note: Google does not support IndexNow — for Google,
 * use Search Console > URL Inspection > Request Indexing.
 */
import { allTools, categories } from "../src/data/tools";

const HOST = "www.allwordtools.com";
const BASE_URL = "https://" + HOST;
const API_KEY = "e3d7a8f9c1b24e6a8d0f2a4b6c8e0d2f";
const KEY_LOCATION = `${BASE_URL}/${API_KEY}.txt`;

// Enabled locales
const LOCALES = ["en", "es", "hi", "pt", "ar", "ru", "de", "id"];

const BLOG_SLUGS = [
  "how-to-win-at-wordle-every-day",
  "score-more-in-scrabble-and-words-with-friends",
  "active-vs-passive-voice-explained",
  "build-your-english-vocabulary-smart-way",
  "how-word-unscramblers-and-anagram-solvers-work",
  "creative-writing-with-ai-tools",
  "crossword-solver-strategies",
  "anagram-solving-techniques",
  "rhyming-words-for-songwriters",
  "boggle-and-text-twist-tactics",
  "how-to-improve-spelling",
  "word-origins-etymology-guide",
];

function generateAllUrls(): string[] {
  const urls = new Set<string>();

  for (const locale of LOCALES) {
    const prefix = locale === "en" ? "" : "/" + locale;

    // Core pages
    for (const page of ["", "/tools", "/about", "/learn", "/contact", "/blog"]) {
      urls.add(`${BASE_URL}${prefix}${page || "/"}`);
    }

    // Blog articles
    for (const bSlug of BLOG_SLUGS) {
      urls.add(`${BASE_URL}${prefix}/blog/${bSlug}`);
    }

    // Categories
    for (const cat of categories) {
      urls.add(`${BASE_URL}${prefix}/category/${cat.slug}`);
    }

    // Tools
    for (const tool of allTools) {
      urls.add(`${BASE_URL}${prefix}/tool/${tool.slug}`);
    }
  }

  return Array.from(urls);
}

async function submitToIndexNow() {
  const urlList = generateAllUrls();
  console.log(`Generated ${urlList.length} unique URLs for IndexNow submission.`);

  const payload = {
    host: HOST,
    key: API_KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  const endpoints = [
    "https://www.bing.com/indexnow",
    "https://api.indexnow.org/indexnow",
    "https://yandex.com/indexnow",
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`Submitting ${urlList.length} URLs to ${endpoint} ...`);
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      });
      if (res.status === 200 || res.status === 202) {
        console.log(`Success! [${endpoint}] returned HTTP ${res.status}.`);
      } else {
        const text = await res.text();
        console.log(`[${endpoint}] returned HTTP ${res.status}: ${text || "Pending verification"}`);
      }
    } catch (err) {
      console.error(`Error submitting to ${endpoint}:`, (err as Error).message);
    }
  }
}

submitToIndexNow();
