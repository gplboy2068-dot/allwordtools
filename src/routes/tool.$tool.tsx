import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useI18n } from "@/i18n/I18nProvider";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import {
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  Clock,
  Home,
  Lightbulb,
  ListChecks,
  Share2,
  Sparkles,
  User,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ToolRelatedSections } from "@/components/site/ToolRelatedSections";
import { TrustedReferences } from "@/components/site/TrustedReferences";
import { getToolReferences } from "@/lib/external-links";
import { DiscoverMore } from "@/components/site/DiscoverMore";
import { KeywordClusters, BottomCta } from "@/components/site/LinkSections";
import { AdBanner } from "@/components/site/AdBanner";
import { ToolMethodologyCard } from "@/components/site/ToolMethodologyCard";
import { WordUnscrambler } from "@/components/tools/WordUnscrambler";
import { AnagramSolver } from "@/components/tools/AnagramSolver";
import { WordFinder } from "@/components/tools/WordFinder";
import { WordleSolver } from "@/components/tools/WordleSolver";
import { CrosswordSolver } from "@/components/tools/CrosswordSolver";
import { WordsStartingWith } from "@/components/tools/WordsStartingWith";
import { WordsEndingWith } from "@/components/tools/WordsEndingWith";
import { WordsContaining } from "@/components/tools/WordsContaining";
import { LetterCounter } from "@/components/tools/LetterCounter";
import { LetterPatternFinder } from "@/components/tools/LetterPatternFinder";
import { SynonymFinder } from "@/components/tools/SynonymFinder";
import { AntonymFinder } from "@/components/tools/AntonymFinder";
import { RhymingWords } from "@/components/tools/RhymingWords";
import { SyllableCounter } from "@/components/tools/SyllableCounter";
import { RandomWordGenerator } from "@/components/tools/RandomWordGenerator";
import { ScrabbleHelper } from "@/components/tools/ScrabbleHelper";
import { WordsWithFriendsHelper } from "@/components/tools/WordsWithFriendsHelper";
import { BoggleSolver } from "@/components/tools/BoggleSolver";
import { HangmanSolver } from "@/components/tools/HangmanSolver";
import { TextTwistSolver } from "@/components/tools/TextTwistSolver";
import { PatternSolver } from "@/components/tools/PatternSolver";
import { WildcardSolver } from "@/components/tools/WildcardSolver";
import { MissingLettersFinder } from "@/components/tools/MissingLettersFinder";
import { LetterRearranger } from "@/components/tools/LetterRearranger";
import { ReverseDictionary } from "@/components/tools/ReverseDictionary";
import { LetterFrequencyAnalyzer } from "@/components/tools/LetterFrequencyAnalyzer";
import { VowelCounter } from "@/components/tools/VowelCounter";
import { ConsonantCounter } from "@/components/tools/ConsonantCounter";
import { RepeatedLetterFinder } from "@/components/tools/RepeatedLetterFinder";
import { AlphabeticalSorter } from "@/components/tools/AlphabeticalSorter";
import { Dictionary } from "@/components/tools/Dictionary";
import { WordMeaning } from "@/components/tools/WordMeaning";
import { Pronunciation } from "@/components/tools/Pronunciation";
import { IpaConverter } from "@/components/tools/IpaConverter";
import { WordOrigin } from "@/components/tools/WordOrigin";
import { SimilarWords } from "@/components/tools/SimilarWords";
import { OppositeWords } from "@/components/tools/OppositeWords";
import { CollocationFinder } from "@/components/tools/CollocationFinder";
import { ExampleSentences } from "@/components/tools/ExampleSentences";
import { PhrasesDictionary } from "@/components/tools/PhrasesDictionary";
import { PassiveVoiceChecker } from "@/components/tools/PassiveVoiceChecker";
import { ActiveVoiceConverter } from "@/components/tools/ActiveVoiceConverter";
import { GrammarChecker } from "@/components/tools/GrammarChecker";
import { SpellChecker } from "@/components/tools/SpellChecker";
import { PunctuationChecker } from "@/components/tools/PunctuationChecker";
import { WordCookiesSolver } from "@/components/tools/WordCookiesSolver";
import { WordscapesSolver } from "@/components/tools/WordscapesSolver";
import { CodyCrossSolver } from "@/components/tools/CodyCrossSolver";
import { CodyCrossAnswers } from "@/components/tools/CodyCrossAnswers";
import { SevenLittleWordsSolver } from "@/components/tools/SevenLittleWordsSolver";
import { WheelOfFortuneSolver } from "@/components/tools/WheelOfFortuneSolver";
import { RandomLetterGenerator } from "@/components/tools/RandomLetterGenerator";
import { RandomSentenceGenerator } from "@/components/tools/RandomSentenceGenerator";
import { RandomParagraphGenerator } from "@/components/tools/RandomParagraphGenerator";
import { RandomTopicGenerator } from "@/components/tools/RandomTopicGenerator";
import { RandomVerbGenerator } from "@/components/tools/RandomVerbGenerator";
import { DogNameGenerator } from "@/components/tools/DogNameGenerator";
import { CatNameGenerator } from "@/components/tools/CatNameGenerator";
import { TeamNameGenerator } from "@/components/tools/TeamNameGenerator";
import { GuildNameGenerator } from "@/components/tools/GuildNameGenerator";
import { ClanNameGenerator } from "@/components/tools/ClanNameGenerator";
import { CharacterNameGenerator } from "@/components/tools/CharacterNameGenerator";
import { VocabularyQuiz } from "@/components/tools/VocabularyQuiz";
import { DailyWord } from "@/components/tools/DailyWord";
import { WordOfTheDayTool } from "@/components/tools/WordOfTheDayTool";
import { SpellingQuiz } from "@/components/tools/SpellingQuiz";
import { SynonymQuiz } from "@/components/tools/SynonymQuiz";
import { AntonymQuiz } from "@/components/tools/AntonymQuiz";
import { PrefixQuiz } from "@/components/tools/PrefixQuiz";
import { SuffixQuiz } from "@/components/tools/SuffixQuiz";
import { AiWordExplainer } from "@/components/tools/AiWordExplainer";
import { AiSentenceGenerator } from "@/components/tools/AiSentenceGenerator";
import { AiExampleGenerator } from "@/components/tools/AiExampleGenerator";
import { AiStoryGenerator } from "@/components/tools/AiStoryGenerator";
import { AiPoemGenerator } from "@/components/tools/AiPoemGenerator";
import { AiVocabularyBuilder } from "@/components/tools/AiVocabularyBuilder";
import { AiQuizGenerator } from "@/components/tools/AiQuizGenerator";
import { AiFlashcards } from "@/components/tools/AiFlashcards";
import { AlliterationGenerator } from "@/components/tools/AlliterationGenerator";
import { AssonanceFinder } from "@/components/tools/AssonanceFinder";
import { TongueTwisterGenerator } from "@/components/tools/TongueTwisterGenerator";
import { CvcWordGenerator } from "@/components/tools/CvcWordGenerator";
import { SightWordGenerator } from "@/components/tools/SightWordGenerator";
import { WordLadderSolver } from "@/components/tools/WordLadderSolver";
import { StrandsSolver } from "@/components/tools/StrandsSolver";
import { RiddleGenerator } from "@/components/tools/RiddleGenerator";
import { DemonNameGenerator } from "@/components/tools/DemonNameGenerator";
import { AlienNameGenerator } from "@/components/tools/AlienNameGenerator";
import { WitchNameGenerator } from "@/components/tools/WitchNameGenerator";
import { KnightNameGenerator } from "@/components/tools/KnightNameGenerator";
import { VampireNameGenerator } from "@/components/tools/VampireNameGenerator";
import { RobotNameGenerator } from "@/components/tools/RobotNameGenerator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { allTools, categories, toolIcons, type Tool } from "@/data/tools";
import { toolContent } from "@/data/tool-content";
import { buildLocaleHead, inLanguage, BASE_URL } from "@/i18n/seo";
import { localePath } from "@/i18n/paths";
import { mergeToolContent, type LocalizedToolContent } from "@/i18n/content";

function renderParagraphWithLinks(text: string, locale: string) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: any[] = [];
  let lastIndex = 0;
  let match;
  const isDefault = locale === DEFAULT_LOCALE;

  while ((match = regex.exec(text)) !== null) {
    const anchor = match[1];
    const target = match[2];
    const matchIndex = match.index;

    if (matchIndex > lastIndex) {
      parts.push(text.substring(lastIndex, matchIndex));
    }

    const isExternal = target.startsWith("http://") || target.startsWith("https://");
    const isAbsolute = target.startsWith("/");

    if (isExternal) {
      parts.push(
        <a
          key={matchIndex}
          href={target}
          target="_blank"
          rel="noopener noreferrer"
          className="text-honey hover:underline font-semibold"
        >
          {anchor}
        </a>
      );
    } else if (isAbsolute) {
      if (target.startsWith("/category/")) {
        const cat = target.substring("/category/".length);
        parts.push(
          <Link
            key={matchIndex}
            to={isDefault ? "/category/$category" : "/$locale/category/$category"}
            params={isDefault ? { category: cat } : { locale, category: cat }}
            className="text-honey hover:underline font-semibold"
          >
            {anchor}
          </Link>
        );
      } else if (target === "/tools") {
        parts.push(
          <Link
            key={matchIndex}
            to={isDefault ? "/tools" : "/$locale/tools"}
            params={isDefault ? {} : { locale }}
            className="text-honey hover:underline font-semibold"
          >
            {anchor}
          </Link>
        );
      } else if (target === "/") {
        parts.push(
          <Link
            key={matchIndex}
            to={isDefault ? "/" : "/$locale/"}
            params={isDefault ? {} : { locale }}
            className="text-honey hover:underline font-semibold"
          >
            {anchor}
          </Link>
        );
      } else {
        parts.push(
          <Link
            key={matchIndex}
            to={target as any}
            className="text-honey hover:underline font-semibold"
          >
            {anchor}
          </Link>
        );
      }
    } else {
      parts.push(
        <Link
          key={matchIndex}
          to={isDefault ? "/tool/$tool" : "/$locale/tool/$tool"}
          params={isDefault ? { tool: target } : { locale, tool: target }}
          className="text-honey hover:underline font-semibold"
        >
          {anchor}
        </Link>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

const SITE = "AllWordTools.com";

function getTool(slug: string): Tool | undefined {
  return allTools.find((t) => t.slug === slug);
}
function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function toolHead(slug: string, locale: string, override?: LocalizedToolContent | null) {
  const tool = getTool(slug);
  const content = mergeToolContent(toolContent[slug], override);
  if (!tool) {
    return {
      meta: [{ title: `Tool not found — ${SITE}` }, { name: "robots", content: "noindex" }],
    };
  }
  const title = content?.metaTitle ?? `${tool.name} — ${SITE}`;
  const description = content?.metaDescription ?? tool.description;
  const path = `/tool/${slug}`;
  const url = `${BASE_URL}${localePath(locale, path)}`;
  const home = `${BASE_URL}${localePath(locale, "/")}`;
  const category = getCategory(tool.category);
  const { meta, links } = buildLocaleHead({ path, locale, title, description });

  return {
    meta,
    links,
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          inLanguage: inLanguage(locale),
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: home },
            ...(category
              ? [
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: category.title,
                    item: `${BASE_URL}${localePath(locale, `/category/${category.slug}`)}`,
                  },
                ]
              : []),
            {
              "@type": "ListItem",
              position: category ? 3 : 2,
              name: tool.name,
              item: url,
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: tool.name,
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Web",
          description,
          inLanguage: inLanguage(locale),
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          publisher: { "@type": "Organization", name: SITE },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `Related tools to ${tool.name}`,
          itemListElement: (content?.related ?? [])
            .map((s) => getTool(s))
            .filter((t): t is Tool => Boolean(t))
            .map((t, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: t.name,
              url: `${BASE_URL}${localePath(locale, `/tool/${t.slug}`)}`,
            })),
        }),
      },
      ...(content
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "HowTo",
                name: content.howToTitle,
                step: content.howToSteps.map((s, i) => ({
                  "@type": "HowToStep",
                  position: i + 1,
                  name: s.title,
                  text: s.detail,
                })),
              }),
            },
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: content.faqs.map((f) => ({
                  "@type": "Question",
                  name: f.question,
                  acceptedAnswer: { "@type": "Answer", text: f.answer },
                })),
              }),
            },
          ]
        : []),
    ],
  };
}

export const Route = createFileRoute("/tool/$tool")({
  loader: ({ params }) => {
    if (!getTool(params.tool)) throw notFound();
    return { slug: params.tool };
  },
  head: ({ params }) => toolHead(params.tool, DEFAULT_LOCALE),
  component: RootToolPage,
  notFoundComponent: ToolNotFound,
  errorComponent: ToolError,
});

function RootToolPage() {
  const { slug } = Route.useLoaderData();
  return <ToolPageView slug={slug} />;
}


const UI_LOCALIZATION: Record<
  string,
  {
    about: string;
    examples: string;
    input: string;
    output: string;
    tips: string;
    faq: string;
    faqsTitle: string;
    team: string;
    teamDesc: string;
    share: string;
    comingSoon: string;
    comingSoonDesc: string;
    openUnscrambler: string;
    notFound: string;
    notFoundDesc: string;
    backHome: string;
    errorTitle: string;
    errorDesc: string;
    tryAgain: string;
    home: string;
    updated: string;
    readingTime: string;
  }
> = {
  en: {
    about: "About the",
    examples: "Examples",
    input: "Input",
    output: "Sample output",
    tips: "Pro tips",
    faq: "Questions & answers",
    faqsTitle: "FAQs",
    team: "The AllWordTools.com Team",
    teamDesc: "Word-game specialists and language enthusiasts building fast, accurate tools that help millions of players find the right word. Last reviewed",
    share: "Share",
    comingSoon: "Tool coming soon",
    comingSoonDesc: "We're putting the finishing touches on the {name}. In the meantime, try our Word Unscrambler.",
    openUnscrambler: "Open Word Unscrambler",
    notFound: "Tool not found",
    notFoundDesc: "We couldn't find that tool. Explore all of our word tools instead.",
    backHome: "Back to home",
    errorTitle: "This page didn't load",
    errorDesc: "Something went wrong. Please try again.",
    tryAgain: "Try again",
    home: "Home",
    updated: "Updated",
    readingTime: "min read",
  },
  es: {
    about: "Acerca de",
    examples: "Ejemplos",
    input: "Entrada",
    output: "Resultado de muestra",
    tips: "Consejos profesionales",
    faq: "Preguntas y respuestas",
    faqsTitle: "Preguntas frecuentes",
    team: "El equipo de AllWordTools.com",
    teamDesc: "Especialistas en juegos de palabras y entusiastas de los idiomas que crean herramientas rápidas y precisas que ayudan a millones de jugadores a encontrar la palabra correcta. Última revisión",
    share: "Compartir",
    comingSoon: "Herramienta próximamente",
    comingSoonDesc: "Estamos dando los últimos toques a {name}. Mientras tanto, prueba nuestro Descodificador de Palabras.",
    openUnscrambler: "Abrir Descodificador de Palabras",
    notFound: "Herramienta no encontrada",
    notFoundDesc: "No pudimos encontrar esa herramienta. Explora todas nuestras herramientas de palabras en su lugar.",
    backHome: "Volver al inicio",
    errorTitle: "Esta página no cargó",
    errorDesc: "Algo salió mal. Por favor intenta de nuevo.",
    tryAgain: "Intentar de nuevo",
    home: "Inicio",
    updated: "Actualizado",
    readingTime: "min de lectura",
  },
  de: {
    about: "Über",
    examples: "Beispiele",
    input: "Eingabe",
    output: "Beispielhafte Ausgabe",
    tips: "Profi-Tipps",
    faq: "Fragen & Antworten",
    faqsTitle: "Häufig gestellte Fragen",
    team: "Das AllWordTools.com Team",
    teamDesc: "Wortspiel-Spezialisten und Sprachbegeisterte, die schnelle, genaue Werkzeuge entwickeln, die Millionen von Spielern helfen, das richtige Wort zu finden. Zuletzt überprüft",
    share: "Teilen",
    comingSoon: "Werkzeug kommt bald",
    comingSoonDesc: "Wir legen letzte Hand an {name}. In der Zwischenzeit kannst du unseren Wort-Entschlüssler ausprobieren.",
    openUnscrambler: "Wort-Entschlüssler öffnen",
    notFound: "Werkzeug nicht gefunden",
    notFoundDesc: "Wir konnten dieses Werkzeug nicht finden. Erkunde stattdessen alle unsere Wortwerkzeuge.",
    backHome: "Zurück zur Startseite",
    errorTitle: "Diese Seite konnte nicht geladen werden",
    errorDesc: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
    tryAgain: "Erneut versuchen",
    home: "Startseite",
    updated: "Aktualisiert",
    readingTime: "Min. Lesedauer",
  },
  pt: {
    about: "Sobre",
    examples: "Exemplos",
    input: "Entrada",
    output: "Saída de amostra",
    tips: "Dicas profissionais",
    faq: "Perguntas e respostas",
    faqsTitle: "Perguntas frequentes",
    team: "A equipe do AllWordTools.com",
    teamDesc: "Especialistas em jogos de palavras e entusiastas de idiomas que criam ferramentas rápidas e precisas que ajudam milhões de jogadores a encontrar a palavra certa. Última revisão",
    share: "Compartilhar",
    comingSoon: "Ferramenta em breve",
    comingSoonDesc: "Estamos dando os últimos retoques em {name}. Enquanto isso, experimente nosso Desembaralhador de Palavras.",
    openUnscrambler: "Abrir Desembaralhador de Palavras",
    notFound: "Ferramenta não encontrada",
    notFoundDesc: "Não conseguimos encontrar essa ferramenta. Explore todas as nossas ferramentas de palavras.",
    backHome: "Voltar para o início",
    errorTitle: "Esta página não carregou",
    errorDesc: "Algo deu errado. Por favor, tente novamente.",
    tryAgain: "Tente novamente",
    home: "Início",
    updated: "Atualizado",
    readingTime: "min de leitura",
  },
  ru: {
    about: "О программе",
    examples: "Примеры",
    input: "Ввод",
    output: "Пример вывода",
    tips: "Советы профессионалов",
    faq: "Вопросы и ответы",
    faqsTitle: "Часто задаваемые вопросы",
    team: "Команда AllWordTools.com",
    teamDesc: "Специалисты по словесным играм и языковые энтузиасты, создающие быстрые и точные инструменты, помогающие миллионам игроков находить нужные слова. Последний раз проверено",
    share: "Поделиться",
    comingSoon: "Инструмент скоро появится",
    comingSoonDesc: "Мы наносим последние штрихи на {name}. А пока попробуйте наш Дешифратор слов.",
    openUnscrambler: "Открыть Дешифратор слов",
    notFound: "Инструмент не найден",
    notFoundDesc: "Мы не смогли найти этот инструмент. Попробуйте изучить все наши словесные инструменты.",
    backHome: "Назад на главную",
    errorTitle: "Эта страница не загрузилась",
    errorDesc: "Что-то пошло не так. Пожалуйста, попробуйте еще раз.",
    tryAgain: "Попробовать еще раз",
    home: "Главная",
    updated: "Обновлено",
    readingTime: "мин чтения",
  },
  id: {
    about: "Tentang",
    examples: "Contoh",
    input: "Input",
    output: "Sampel output",
    tips: "Tips profesional",
    faq: "Pertanyaan & jawaban",
    faqsTitle: "Pertanyaan Sering Diajukan",
    team: "Tim AllWordTools.com",
    teamDesc: "Spesialis game kata dan antusias bahasa yang membangun alat cepat dan akurat yang membantu jutaan pemain menemukan kata yang tepat. Terakhir ditinjau",
    share: "Bagikan",
    comingSoon: "Alat segera hadir",
    comingSoonDesc: "Kami sedang menyelesaikan {name}. Sementara itu, coba Pengurai Kata kami.",
    openUnscrambler: "Buka Pengurai Kata",
    notFound: "Alat tidak ditemukan",
    notFoundDesc: "Kami tidak dapat menemukan alat tersebut. Silakan jelajahi semua alat kata kami.",
    backHome: "Kembali ke beranda",
    errorTitle: "Halaman ini tidak dapat dimuat",
    errorDesc: "Terjadi kesalahan. Silakan coba lagi.",
    tryAgain: "Coba lagi",
    home: "Beranda",
    updated: "Diperbarui",
    readingTime: "menit baca",
  },
  ar: {
    about: "حول",
    examples: "أمثلة",
    input: "مدخلات",
    output: "مخرجات عينة",
    tips: "نصائح للمحترفين",
    faq: "أسئلة وأجوبة",
    faqsTitle: "الأسئلة الشائعة",
    team: "فريق AllWordTools.com",
    teamDesc: "أخصائيو ألعاب الكلمات وعشاق اللغة الذين يبنون أدوات سريعة ودقيقة تساعد ملايين اللاعبين في العثور على الكلمة الصحيحة. آخر مراجعة",
    share: "مشاركة",
    comingSoon: "الأداة قريباً",
    comingSoonDesc: "نضع اللمسات الأخيرة على {name}. في غضون ذلك، جرب أداة كشف الكلمات لدينا.",
    openUnscrambler: "فتح أداة كشف الكلمات",
    notFound: "لم يتم العثور على الأداة",
    notFoundDesc: "لم نتمكن من العثور على تلك الأداة. استكشف جميع أدوات الكلمات لدينا بدلاً من ذلك.",
    backHome: "العودة للرئيسية",
    errorTitle: "لم يتم تحميل هذه الصفحة",
    errorDesc: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
    tryAgain: "إعادة المحاولة",
    home: "الرئيسية",
    updated: "تم التحديث",
    readingTime: "دقائق قراءة",
  },
  hi: {
    about: "के बारे में",
    examples: "उदाहरण",
    input: "इनपुट",
    output: "नमूना आउटपुट",
    tips: "प्रो सुझाव",
    faq: "प्रश्न और उत्तर",
    faqsTitle: "अक्सर पूछे जाने वाले प्रश्न",
    team: "AllWordTools.com टीम",
    teamDesc: "शब्द-खेल विशेषज्ञ और भाषा प्रेमी जो तेज़, सटीक टूल बनाते हैं जो लाखों खिलाड़ियों को सही शब्द खोजने में मदद करते हैं। अंतिम समीक्षा की गई",
    share: "साझा करें",
    comingSoon: "टूल जल्द ही आ रहा है",
    comingSoonDesc: "हम {name} पर अंतिम रूप दे रहे हैं। इस बीच, हमारे वर्ड अनस्क्रैम्बलर को आज़माएं।",
    openUnscrambler: "वर्ड अनस्क्रैम्बलर खोलें",
    notFound: "टूल नहीं मिला",
    notFoundDesc: "हमें वह टूल नहीं मिला. इसके बजाय हमारे सभी शब्द टूल खोजें।",
    backHome: "होमपेज पर वापस",
    errorTitle: "यह पेज लोड नहीं हुआ",
    errorDesc: "कुछ गलत हो गया. कृपया पुन: प्रयास करें।",
    tryAgain: "पुनः प्रयास करें",
    home: "होम",
    updated: "अपडेट किया गया",
    readingTime: "मिनट पठन",
  },
};

export function ToolPageView({
  slug,
  contentOverride,
}: {
  slug: string;
  contentOverride?: LocalizedToolContent | null;
}) {
  const { locale } = useI18n();
  const isDefault = locale === DEFAULT_LOCALE;
  const tool = getTool(slug)!;
  const content = mergeToolContent(toolContent[slug], contentOverride);
  const category = getCategory(tool.category);
  const Icon = toolIcons[slug] ?? Sparkles;
  const references = getToolReferences(slug);

  const t = (key: keyof typeof UI_LOCALIZATION.en) => {
    return UI_LOCALIZATION[locale]?.[key] ?? UI_LOCALIZATION.en[key];
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero + tool */}
        <section className="gradient-hero border-b border-border/60">
          <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <nav aria-label="Breadcrumb" className="mb-7">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
                <li>
                  <Link
                    to={isDefault ? "/" : "/$locale/"}
                    params={isDefault ? {} : { locale }}
                    className="inline-flex items-center gap-1 hover:text-foreground"
                  >
                    <Home className="h-3.5 w-3.5" /> {t("home")}
                  </Link>
                </li>
                {category && (
                  <>
                    <ChevronRight className="h-3.5 w-3.5" />
                    <li>
                      <Link
                        to={isDefault ? "/category/$category" : "/$locale/category/$category"}
                        params={isDefault ? { category: category.slug } : { locale, category: category.slug }}
                        className="hover:text-foreground"
                      >
                        {category.title}
                      </Link>
                    </li>
                  </>
                )}
                <ChevronRight className="h-3.5 w-3.5" />
                <li className="font-medium text-foreground">{tool.name}</li>
              </ol>
            </nav>

            <div className="flex items-start gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl gradient-ink text-primary-foreground shadow-lift">
                <Icon className="h-7 w-7" />
              </span>
              <div>
                <h1 className="font-display text-3xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-4xl">
                  {content?.heading ?? tool.name}
                </h1>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground text-balance sm:text-lg">
                  {content?.subheading ?? tool.description}
                </p>
              </div>
            </div>

            {/* Meta row */}
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
              {content && (
                <>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarClock className="h-3.5 w-3.5" /> {t("updated")} {content.updated}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> {content.readingMinutes} {t("readingTime")}
                  </span>
                </>
              )}
              <ShareButton title={content?.metaTitle ?? tool.name} />
            </div>

            {/* Interactive tool */}
            <div className="mt-8">
              {slug === "word-unscrambler" ? (
                <WordUnscrambler />
              ) : slug === "anagram-solver" ? (
                <AnagramSolver />
              ) : slug === "word-finder" ? (
                <WordFinder />
              ) : slug === "wordle-solver" ? (
                <WordleSolver />
              ) : slug === "crossword-solver" ? (
                <CrosswordSolver />
              ) : slug === "words-starting-with" ? (
                <WordsStartingWith />
              ) : slug === "words-ending-with" ? (
                <WordsEndingWith />
              ) : slug === "words-containing" ? (
                <WordsContaining />
              ) : slug === "letter-counter" ? (
                <LetterCounter />
              ) : slug === "letter-pattern-finder" ? (
                <LetterPatternFinder />
              ) : slug === "synonym-finder" ? (
                <SynonymFinder />
              ) : slug === "antonym-finder" ? (
                <AntonymFinder />
              ) : slug === "rhyming-words" ? (
                <RhymingWords />
              ) : slug === "syllable-counter" ? (
                <SyllableCounter />
              ) : slug === "random-word-generator" ? (
                <RandomWordGenerator />
              ) : slug === "scrabble-helper" ? (
                <ScrabbleHelper />
              ) : slug === "words-with-friends-helper" ? (
                <WordsWithFriendsHelper />
              ) : slug === "boggle-solver" ? (
                <BoggleSolver />
              ) : slug === "hangman-solver" ? (
                <HangmanSolver />
              ) : slug === "text-twist-solver" ? (
                <TextTwistSolver />
              ) : slug === "pattern-solver" ? (
                <PatternSolver />
              ) : slug === "wildcard-solver" ? (
                <WildcardSolver />
              ) : slug === "missing-letters-finder" ? (
                <MissingLettersFinder />
              ) : slug === "letter-rearranger" ? (
                <LetterRearranger />
              ) : slug === "reverse-dictionary" ? (
                <ReverseDictionary />
              ) : slug === "letter-frequency-analyzer" ? (
                <LetterFrequencyAnalyzer />
              ) : slug === "vowel-counter" ? (
                <VowelCounter />
              ) : slug === "consonant-counter" ? (
                <ConsonantCounter />
              ) : slug === "repeated-letter-finder" ? (
                <RepeatedLetterFinder />
              ) : slug === "alphabetical-sorter" ? (
                <AlphabeticalSorter />
              ) : slug === "dictionary" ? (
                <Dictionary />
              ) : slug === "word-meaning" ? (
                <WordMeaning />
              ) : slug === "pronunciation" ? (
                <Pronunciation />
              ) : slug === "ipa-converter" ? (
                <IpaConverter />
              ) : slug === "word-origin" ? (
                <WordOrigin />
              ) : slug === "similar-words" ? (
                <SimilarWords />
              ) : slug === "opposite-words" ? (
                <OppositeWords />
              ) : slug === "collocation-finder" ? (
                <CollocationFinder />
              ) : slug === "example-sentences" ? (
                <ExampleSentences />
              ) : slug === "phrases-dictionary" ? (
                <PhrasesDictionary />
              ) : slug === "passive-voice-checker" ? (
                <PassiveVoiceChecker />
              ) : slug === "active-voice-converter" ? (
                <ActiveVoiceConverter />
              ) : slug === "grammar-checker" ? (
                <GrammarChecker />
              ) : slug === "spell-checker" ? (
                <SpellChecker />
              ) : slug === "punctuation-checker" ? (
                <PunctuationChecker />
              ) : slug === "word-cookies-solver" ? (
                <WordCookiesSolver />
              ) : slug === "wordscapes-solver" ? (
                <WordscapesSolver />
              ) : slug === "codycross-solver" ? (
                <CodyCrossSolver />
              ) : slug === "codycross-answers" ? (
                <CodyCrossAnswers />
              ) : slug === "seven-little-words-solver" ? (
                <SevenLittleWordsSolver />
              ) : slug === "wheel-of-fortune-solver" ? (
                <WheelOfFortuneSolver />
              ) : slug === "random-letter-generator" ? (
                <RandomLetterGenerator />
              ) : slug === "random-sentence-generator" ? (
                <RandomSentenceGenerator />
              ) : slug === "random-paragraph-generator" ? (
                <RandomParagraphGenerator />
              ) : slug === "random-topic-generator" ? (
                <RandomTopicGenerator />
              ) : slug === "random-verb-generator" ? (
                <RandomVerbGenerator />
              ) : slug === "dog-name-generator" ? (
                <DogNameGenerator />
              ) : slug === "cat-name-generator" ? (
                <CatNameGenerator />
              ) : slug === "team-name-generator" ? (
                <TeamNameGenerator />
              ) : slug === "guild-name-generator" ? (
                <GuildNameGenerator />
              ) : slug === "clan-name-generator" ? (
                <ClanNameGenerator />
              ) : slug === "character-name-generator" ? (
                <CharacterNameGenerator />
              ) : slug === "vocabulary-quiz" ? (
                <VocabularyQuiz />
              ) : slug === "daily-word" ? (
                <DailyWord />
              ) : slug === "word-of-the-day" ? (
                <WordOfTheDayTool />
              ) : slug === "spelling-quiz" ? (
                <SpellingQuiz />
              ) : slug === "synonym-quiz" ? (
                <SynonymQuiz />
              ) : slug === "antonym-quiz" ? (
                <AntonymQuiz />
              ) : slug === "prefix-quiz" ? (
                <PrefixQuiz />
              ) : slug === "suffix-quiz" ? (
                <SuffixQuiz />
              ) : slug === "ai-word-explainer" ? (
                <AiWordExplainer />
              ) : slug === "ai-sentence-generator" ? (
                <AiSentenceGenerator />
              ) : slug === "ai-example-generator" ? (
                <AiExampleGenerator />
              ) : slug === "ai-story-generator" ? (
                <AiStoryGenerator />
              ) : slug === "ai-poem-generator" ? (
                <AiPoemGenerator />
              ) : slug === "ai-vocabulary-builder" ? (
                <AiVocabularyBuilder />
              ) : slug === "ai-quiz-generator" ? (
                <AiQuizGenerator />
              ) : slug === "ai-flashcards" ? (
                <AiFlashcards />
              ) : slug === "alliteration-generator" ? (
                <AlliterationGenerator />
              ) : slug === "assonance-finder" ? (
                <AssonanceFinder />
              ) : slug === "tongue-twister-generator" ? (
                <TongueTwisterGenerator />
              ) : slug === "cvc-word-generator" ? (
                <CvcWordGenerator />
              ) : slug === "sight-word-generator" ? (
                <SightWordGenerator />
              ) : slug === "word-ladder-solver" ? (
                <WordLadderSolver />
              ) : slug === "strands-solver" ? (
                <StrandsSolver />
              ) : slug === "riddle-generator" ? (
                <RiddleGenerator />
              ) : slug === "demon-name-generator" ? (
                <DemonNameGenerator />
              ) : slug === "alien-name-generator" ? (
                <AlienNameGenerator />
              ) : slug === "witch-name-generator" ? (
                <WitchNameGenerator />
              ) : slug === "knight-name-generator" ? (
                <KnightNameGenerator />
              ) : slug === "vampire-name-generator" ? (
                <VampireNameGenerator />
              ) : slug === "robot-name-generator" ? (
                <RobotNameGenerator />
              ) : (
                <div className="rounded-3xl border border-dashed border-border/70 bg-card p-8 text-center">
                  <Sparkles className="mx-auto h-8 w-8 text-honey" />
                  <h2 className="mt-3 font-display text-xl font-semibold">{t("comingSoon")}</h2>
                  <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                    {t("comingSoonDesc").replace("{name}", tool.name)}
                  </p>
                  <Button asChild className="mt-5 rounded-full">
                    <Link 
                      to={isDefault ? "/tool/$tool" : "/$locale/tool/$tool"}
                      params={isDefault ? { tool: "word-unscrambler" } : { locale, tool: "word-unscrambler" }}
                    >
                      {t("openUnscrambler")}
                    </Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Methodology & Data Source Transparency */}
            <div className="mt-8">
              <ToolMethodologyCard slug={slug} />
            </div>
          </div>
        </section>

        {/* Strategic Ad Banner */}
        <AdBanner />

        {content && (
          <>
            {/* Intro */}
            <section
              className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8"
              aria-labelledby="about"
            >
              <h2
                id="about"
                className="font-display text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                {t("about")} {tool.name}
              </h2>
              <div className="mt-5 space-y-4">
                {content.intro.map((p, i) => (
                  <p key={i} className="text-base leading-relaxed text-muted-foreground">
                    {renderParagraphWithLinks(p, locale)}
                  </p>
                ))}
              </div>
            </section>

            {/* How to use */}
            <section className="bg-secondary/40 py-12" aria-labelledby="how-to">
              <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <h2
                  id="how-to"
                  className="flex items-center gap-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl"
                >
                  <ListChecks className="h-6 w-6 text-honey" /> {content.howToTitle}
                </h2>
                <ol className="mt-6 space-y-5">
                  {content.howToSteps.map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full gradient-honey text-sm font-bold text-honey-foreground">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-display text-lg font-semibold">{step.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {renderParagraphWithLinks(step.detail, locale)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* Long-form sections */}
            <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
              <div className="space-y-10">
                {content.sections.map((s) => (
                  <article key={s.heading}>
                    <h2 className="font-display text-2xl font-semibold tracking-tight">
                      {s.heading}
                    </h2>
                    <div className="mt-3 space-y-4">
                      {s.paragraphs.map((p, i) => (
                        <p key={i} className="text-base leading-relaxed text-muted-foreground">
                          {renderParagraphWithLinks(p, locale)}
                        </p>
                      ))}
                    </div>
                  </article>
                ))}
              </div>

              {/* Examples */}
              <div className="mt-12">
                <h2 className="font-display text-2xl font-semibold tracking-tight">{t("examples")}</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  {content.examples.map((ex, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-border/70 bg-card p-5 shadow-soft"
                    >
                      <span className="text-xs font-semibold uppercase tracking-wider text-honey">
                        {t("input")}
                      </span>
                      <p className="mt-1 font-display text-lg font-semibold tracking-wide">
                        {ex.input}
                      </p>
                      <span className="mt-3 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {t("output")}
                      </span>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {ex.output}
                      </p>
                      <p className="mt-3 text-xs italic text-muted-foreground/80">{ex.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="mt-12 rounded-3xl border border-border/70 bg-card p-7 shadow-soft">
                <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
                  <Lightbulb className="h-5 w-5 text-honey" /> {t("tips")}
                </h2>
                <ul className="mt-4 space-y-3">
                  {content.tips.map((tip, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-honey" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* FAQ */}
            <section className="mx-auto max-w-3xl px-4 pb-4 sm:px-6 lg:px-8" aria-labelledby="faq">
              <span className="text-sm font-semibold uppercase tracking-wider text-honey">
                {t("faq")}
              </span>
              <h2
                id="faq"
                className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                {tool.name} {t("faqsTitle")}
              </h2>
              <Accordion type="single" collapsible className="mt-6 w-full">
                {content.faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border-border/70">
                    <AccordionTrigger className="text-left font-display text-base font-semibold">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                      {renderParagraphWithLinks(faq.answer, locale)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Author & Methodology */}
            <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-secondary/40 p-5 sm:flex-row sm:items-center">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full gradient-ink text-primary-foreground">
                  <User className="h-6 w-6" />
                </span>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-display text-sm font-semibold">{t("team")}</p>
                    <span className="text-xs text-muted-foreground">·</span>
                    <Link
                      to={isDefault ? "/about/firoz-khan" : "/$locale/about/firoz-khan"}
                      params={isDefault ? {} : { locale }}
                      className="text-xs font-medium text-honey hover:underline"
                    >
                      Firoz Khan (Maintainer)
                    </Link>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {t("teamDesc")} {content.updated}. Maintained by Full Stack Developer Firoz Khan under FK Digital Media.{" "}
                    <Link
                      to={isDefault ? "/methodology" : "/$locale/methodology"}
                      params={isDefault ? {} : { locale }}
                      className="underline hover:text-foreground"
                    >
                      Learn how our word lists and algorithms work
                    </Link>.
                  </p>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Trusted external references — only when genuinely educational */}
        <TrustedReferences references={references} className="pt-2" />

        {/* Auto-generated internal linking: related, recommended, next/prev */}
        <ToolRelatedSections slug={slug} />

        {/* Contextual keyword clusters */}
        <KeywordClusters />

        {/* Sidebar-style discovery band */}
        <DiscoverMore excludeSlug={slug} />

        {/* Bottom CTA */}
        <BottomCta />
      </main>
      <Footer />
    </div>
  );
}

function ShareButton({ title }: { title: string }) {
  const { locale } = useI18n();
  const t = (key: keyof typeof UI_LOCALIZATION.en) => {
    return UI_LOCALIZATION[locale]?.[key] ?? UI_LOCALIZATION.en[key];
  };
  const share = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      navigator.share({ title, url }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
  };
  return (
    <button
      onClick={share}
      className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/70 px-3 py-1 font-medium text-foreground transition-colors hover:border-honey/60"
    >
      <Share2 className="h-3.5 w-3.5" /> {t("share")}
    </button>
  );
}

export function ToolNotFound() {
  const { locale } = useI18n();
  const isDefault = locale === DEFAULT_LOCALE;
  const t = (key: keyof typeof UI_LOCALIZATION.en) => {
    return UI_LOCALIZATION[locale]?.[key] ?? UI_LOCALIZATION.en[key];
  };
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-semibold">{t("notFound")}</h1>
        <p className="mt-3 text-muted-foreground">{t("notFoundDesc")}</p>
        <Button asChild className="mt-6 rounded-full">
          <Link
            to={isDefault ? "/" : "/$locale/"}
            params={isDefault ? {} : { locale }}
          >
            {t("backHome")}
          </Link>
        </Button>
      </div>
      <Footer />
    </div>
  );
}

export function ToolError({ reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  const { locale } = useI18n();
  const t = (key: keyof typeof UI_LOCALIZATION.en) => {
    return UI_LOCALIZATION[locale]?.[key] ?? UI_LOCALIZATION.en[key];
  };
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold">{t("errorTitle")}</h1>
        <p className="mt-3 text-muted-foreground">{t("errorDesc")}</p>
        <Button
          className="mt-6 rounded-full"
          onClick={() => {
            router.invalidate();
            reset();
          }}
        >
          {t("tryAgain")}
        </Button>
      </div>
      <Footer />
    </div>
  );
}
