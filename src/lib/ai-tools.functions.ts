import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getAiApiKey } from "./ai-config";

/**
 * AI Tools powered by DeepSeek (deepseek-chat).
 *
 * `runAiTool` handles the free-text tools (Word Explainer, Sentence Generator,
 * Example Generator, Story Generator, Poem Generator, Vocabulary Builder) and
 * returns clean Markdown the UI renders.
 *
 * `generateQuiz` and `generateFlashcards` return structured JSON for the
 * interactive AI Quiz Generator and AI Flashcards tools.
 */

const MODEL = "deepseek-chat";
const GATEWAY = "https://api.deepseek.com/chat/completions";

export const AI_TEXT_TASKS = [
  "ai-word-explainer",
  "ai-sentence-generator",
  "ai-example-generator",
  "ai-story-generator",
  "ai-poem-generator",
  "ai-vocabulary-builder",
] as const;

export type AiTextTask = (typeof AI_TEXT_TASKS)[number];

const TASK_PROMPTS: Record<AiTextTask, string> = {
  "ai-word-explainer":
    "You are a friendly English teacher. Explain the given word or phrase in clear, simple English. Use this Markdown structure: a short one-line plain-English definition, then a **Meaning** section, a **Part of speech** line, an **Example sentences** section with 3 bullet examples, and a **Synonyms** line. Keep it concise and beginner-friendly.",
  "ai-sentence-generator":
    "You are a sentence-writing assistant. Using the given word, phrase or topic, write natural, varied example sentences that show correct usage. Return a Markdown bulleted list of 6 clear sentences ranging from simple to more advanced. Do not add extra commentary.",
  "ai-example-generator":
    "You are an examples generator. Given a concept, word, grammar point or idea, produce a helpful set of concrete examples. Return a short one-line intro, then a Markdown bulleted list of 6-8 relevant examples. Keep each example short and illustrative.",
  "ai-story-generator":
    "You are a creative short-story writer. Write an engaging, well-structured short story based on the user's idea, prompt or keywords. Use vivid but age-appropriate language, a clear beginning, middle and end, and around 250-400 words. Give it a short **title** as a Markdown heading, then the story in paragraphs.",
  "ai-poem-generator":
    "You are a talented poet. Write an original, evocative poem based on the user's topic, theme or keywords. Give the poem a short title as a Markdown heading (##), then the poem with clear line breaks. Keep it tasteful and creative. If no style is requested, choose a fitting one.",
  "ai-vocabulary-builder":
    "You are a vocabulary coach. Build a themed vocabulary list for the given topic or level. Return a Markdown bulleted list of 10 useful words. For each word use the format: **word** (part of speech) — short definition; then a short example sentence in italics. Keep definitions clear and learner-friendly.",
};

const TextInput = z.object({
  text: z.string().min(1).max(2000),
  task: z.enum(AI_TEXT_TASKS),
});

async function callGateway(messages: { role: string; content: string }[], json = false) {
  const apiKey = getAiApiKey();
  if (!apiKey) {
    throw new Error(
      "AI is not configured for this project. Please set DEEPSEEK_API_KEY in your Cloudflare environment variables or local .env file."
    );
  }

  const res = await fetch(GATEWAY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      ...(json ? { response_format: { type: "json_object" } } : {}),
    }),
  });

  if (res.status === 429)
    throw new Error("The AI is busy right now — please try again in a moment.");
  if (res.status === 402)
    throw new Error("AI credits have run out. Please add credits to continue.");
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`AI request failed (${res.status}). ${body.slice(0, 200)}`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  return data.choices?.[0]?.message?.content ?? "";
}

export const runAiTool = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => TextInput.parse(data))
  .handler(async ({ data }): Promise<{ output: string }> => {
    const content = await callGateway([
      { role: "system", content: TASK_PROMPTS[data.task] },
      { role: "user", content: data.text },
    ]);
    return { output: content.trim() || "The AI did not return a response. Please try again." };
  });

/* ------------------------------ AI Quiz ------------------------------ */

export type AiQuizQuestion = {
  prompt: string;
  options: string[];
  answer: string;
  explanation: string;
};

const QuizInput = z.object({
  topic: z.string().min(1).max(200),
  count: z.number().int().min(3).max(10).default(6),
});

export const generateQuiz = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => QuizInput.parse(data))
  .handler(async ({ data }): Promise<{ questions: AiQuizQuestion[] }> => {
    const system = `You are a quiz generator. Create a multiple-choice quiz about the given topic.
Return ONLY a JSON object of this exact shape:
{
  "questions": [
    {
      "prompt": string,        // the question
      "options": string[],     // exactly 4 answer options
      "answer": string,        // must exactly match one of the options
      "explanation": string    // one short sentence explaining the correct answer
    }
  ]
}
Create exactly ${data.count} questions. Make them accurate, clear and varied in difficulty. Ensure "answer" is always one of the four "options". Do not include anything outside the JSON.`;

    const content = await callGateway(
      [
        { role: "system", content: system },
        { role: "user", content: data.topic },
      ],
      true,
    );

    let parsed: unknown;
    try {
      parsed = JSON.parse(content);
    } catch {
      parsed = {};
    }
    const rawList = Array.isArray((parsed as { questions?: unknown }).questions)
      ? (parsed as { questions: unknown[] }).questions
      : [];

    const questions: AiQuizQuestion[] = rawList
      .map((q) => {
        const item = (q ?? {}) as Record<string, unknown>;
        const options = Array.isArray(item.options)
          ? item.options.map((o) => String(o)).filter(Boolean)
          : [];
        const answer = typeof item.answer === "string" ? item.answer : "";
        return {
          prompt: typeof item.prompt === "string" ? item.prompt : "",
          options,
          answer,
          explanation: typeof item.explanation === "string" ? item.explanation : "",
        };
      })
      .filter((q) => q.prompt && q.options.length >= 2 && q.options.includes(q.answer));

    if (questions.length === 0)
      throw new Error("The AI could not build a quiz for that topic. Try a different one.");

    return { questions };
  });

/* ---------------------------- AI Flashcards ---------------------------- */

export type AiFlashcard = { front: string; back: string };

const FlashcardsInput = z.object({
  topic: z.string().min(1).max(200),
  count: z.number().int().min(4).max(16).default(8),
});

export const generateFlashcards = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => FlashcardsInput.parse(data))
  .handler(async ({ data }): Promise<{ cards: AiFlashcard[] }> => {
    const system = `You are a flashcard generator for learning. Create study flashcards about the given topic.
Return ONLY a JSON object of this exact shape:
{
  "cards": [
    { "front": string, "back": string }
  ]
}
Create exactly ${data.count} cards. "front" is a term, word or short question. "back" is a clear, concise definition or answer (1-2 sentences). Do not include anything outside the JSON.`;

    const content = await callGateway(
      [
        { role: "system", content: system },
        { role: "user", content: data.topic },
      ],
      true,
    );

    let parsed: unknown;
    try {
      parsed = JSON.parse(content);
    } catch {
      parsed = {};
    }
    const rawList = Array.isArray((parsed as { cards?: unknown }).cards)
      ? (parsed as { cards: unknown[] }).cards
      : [];

    const cards: AiFlashcard[] = rawList
      .map((c) => {
        const item = (c ?? {}) as Record<string, unknown>;
        return {
          front: typeof item.front === "string" ? item.front : "",
          back: typeof item.back === "string" ? item.back : "",
        };
      })
      .filter((c) => c.front && c.back);

    if (cards.length === 0)
      throw new Error("The AI could not build flashcards for that topic. Try a different one.");

    return { cards };
  });

/* --------------------------- AI List Generator --------------------------- */

/**
 * `generateList` is a generic "Create with AI" backend used by generator tools
 * (name generators, random word/sentence/paragraph/topic/verb generators, ...).
 * It takes a short instruction describing what to produce, an optional user
 * theme, and a count, and returns a clean list of strings.
 */
const ListInput = z.object({
  instruction: z.string().min(1).max(400),
  theme: z.string().max(300).optional(),
  count: z.number().int().min(1).max(50).default(8),
});

export const generateList = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => ListInput.parse(data))
  .handler(async ({ data }): Promise<{ items: string[] }> => {
    const system = `You generate creative, high-quality lists for a word-tools website.
${data.instruction}
Return ONLY a JSON object of this exact shape:
{ "items": string[] }
Produce exactly ${data.count} items. Every item must be unique. Do not number them, do not add quotes, explanations or any text outside the JSON.`;

    const userMsg = data.theme?.trim()
      ? `Theme / preferences: ${data.theme.trim()}`
      : "Use a fun, varied mix.";

    const content = await callGateway(
      [
        { role: "system", content: system },
        { role: "user", content: userMsg },
      ],
      true,
    );

    let parsed: unknown;
    try {
      parsed = JSON.parse(content);
    } catch {
      parsed = {};
    }
    const rawList = Array.isArray((parsed as { items?: unknown }).items)
      ? (parsed as { items: unknown[] }).items
      : [];

    const items = Array.from(
      new Set(rawList.map((i) => String(i ?? "").trim()).filter(Boolean)),
    ).slice(0, data.count);

    if (items.length === 0)
      throw new Error("The AI could not generate that. Try a different theme.");

    return { items };
  });
