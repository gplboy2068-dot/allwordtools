import { categoryContent, type CategoryContent } from "@/data/category-content";
import { getLocalizedCategory } from "./categories";
import { categories } from "@/data/tools";
import { DEFAULT_LOCALE } from "./locales";

export interface LocalizedCategoryFullContent {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  subheading: string;
  intro: string[];
  sections: { heading: string; paragraphs: string[] }[];
  tips: string[];
  faqs: { question: string; answer: string }[];
}

const CATEGORY_LANGUAGE_TEMPLATES: Record<
  string,
  {
    introP2: string;
    sec1Heading: string;
    sec1P: string;
    sec2Heading: string;
    sec2P: string;
    tip1: string;
    tip2: string;
    tip3: string;
    faq1Q: string;
    faq1A: string;
    faq2Q: string;
    faq2A: string;
  }
> = {
  hi: {
    introP2: "इस श्रेणी के सभी टूल्स 100% मुफ़्त हैं और बिना किसी लॉगिन या डाउनलोड के तुरंत काम करते हैं। चाहे आप शब्द खेल खेल रहे हों, पहेलियां सुलझा रहे हों या लेखन कर रहे हों, ये टूल्स आपको सही उत्तर खोजने में मदद करेंगे।",
    sec1Heading: "ये टूल्स कैसे काम करते हैं",
    sec1P: "इन टूल्स का उपयोग करना बहुत आसान है। बस अपने अक्षर, शब्द या टेक्स्ट इनपुट बॉक्स में दर्ज करें और तुरंत सबसे सटीक परिणाम प्राप्त करें।",
    sec2Heading: "इन टूल्स का उपयोग कब करें",
    sec2P: "जब भी आपको स्क्रैबल, वर्डले, क्रॉसवर्ड या किसी अन्य गेम में अटकन हो, या अपने निबंध और लेख के लिए सही शब्द चाहिए हों, तो यह श्रेणी आपके लिए सबसे उपयुक्त है।",
    tip1: "अधिकतम स्कोर प्राप्त करने के लिए उच्च-मूल्य वाले अक्षरों और छोटे 2-3 अक्षर वाले शब्दों का अभ्यास करें।",
    tip2: "अज्ञात अक्षरों के स्थान पर वाइल्डकार्ड (? या *) का उपयोग करें।",
    tip3: "तेज़ पहुंच के लिए इस पेज को अपने ब्राउज़र में बुकमार्क करें।",
    faq1Q: "क्या इस श्रेणी के सभी टूल्स मुफ़्त हैं?",
    faq1A: "हाँ, AllWordTools पर उपलब्ध सभी टूल्स 100% निःशुल्क हैं और इनके उपयोग की कोई सीमा नहीं है।",
    faq2Q: "क्या यह मोबाइल और कंप्यूटर दोनों पर काम करता है?",
    faq2A: "बिल्कुल! हमारी वेबसाइट पूरी तरह से रेस्पॉन्सिव है और मोबाइल, टैबलेट व पीसी सभी पर सुपर-फ़ास्ट चलती है।",
  },
  es: {
    introP2: "Todas las herramientas de esta categoría son 100% gratuitas y funcionan al instante sin necesidad de registrarse. Ya sea que juegues Scrabble, resuelvas crucigramas o escribas, aquí encontrarás la solución exacta.",
    sec1Heading: "Cómo funcionan estas herramientas",
    sec1P: "Son muy fáciles de usar: solo ingresa tus letras, palabras o texto en el buscador y obtén resultados precisos en milisegundos.",
    sec2Heading: "Cuándo utilizar estas herramientas",
    sec2P: "Úsalas cuando te quedes atascado en juegos de palabras, necesites mejorar tu vocabulario o busques inspiración para tus textos.",
    tip1: "Memoriza palabras cortas de 2 y 3 letras para sumar más puntos en tus juegos.",
    tip2: "Utiliza comodines (? o *) para letras desconocidas o fichas en blanco.",
    tip3: "Guarda esta categoría en tus marcadores para un acceso rápido.",
    faq1Q: "¿Todas las herramientas son gratuitas?",
    faq1A: "Sí, todas las herramientas son 100% gratuitas y sin límites de uso.",
    faq2Q: "¿Funcionan en dispositivos móviles?",
    faq2A: "Sí, funcionan de manera rápida y fluida en teléfonos móviles, tablets y computadoras.",
  },
  de: {
    introP2: "Alle Werkzeuge in dieser Kategorie sind 100% kostenlos und funktionieren sofort ohne Registrierung. Perfekt für Wortspiele, Rätsel und kreatives Schreiben.",
    sec1Heading: "So funktionieren diese Werkzeuge",
    sec1P: "Gib einfach deine Buchstaben, Wörter oder deinen Text ein und erhalte sofort sekundenschnelle und exakte Ergebnisse.",
    sec2Heading: "Wann du diese Tools nutzen solltest",
    sec2P: "Ideal, wenn du bei Scrabble, Wordle oder Kreuzworträtseln feststeckst oder deine Texte verbessern möchtest.",
    tip1: "Lerne kurze 2- und 3-Buchstaben-Wörter für maximale Punktzahlen.",
    tip2: "Nutze Platzhalter (? oder *) für unbekannte Buchstaben.",
    tip3: "Setze ein Lesezeichen für diesen Bereich für schnellen Zugriff.",
    faq1Q: "Sind diese Werkzeuge kostenlos?",
    faq1A: "Ja, alle Tools auf AllWordTools sind 100% kostenlos und ohne Limit.",
    faq2Q: "Funktioniert die Seite auf dem Smartphone?",
    faq2A: "Ja, die Seite ist für Smartphones, Tablets und PCs optimiert.",
  },
  ar: {
    introP2: "جميع الأدوات في هذه الفئة مجانية 100% وتعمل فوراً بدون أي تسجيل. سواء كنت تلعب ألعاب الكلمات أو تكتب نصوصاً، ستجد الحل المناسب فوراً.",
    sec1Heading: "كيف تعمل هذه الأدوات",
    sec1P: "بسيطة وسريعة جداً: أدخل الحروف أو الكلمات في المربع المخصص وستحصل على نتائج دقيقة في أجزاء من الثانية.",
    sec2Heading: "متى تستخدم هذه الأدوات",
    sec2P: "استخدمها للفوز في ألعاب الكلمات مثل سكرابل وكلمات متقاطعة، أو لتحسين كتاباتك ومفرداتك اللغوية.",
    tip1: "احفظ الكلمات القصيرة المكونة من حرفين أو ثلاثة لتسجيل أعلى النقاط.",
    tip2: "استخدم الرموز البديلة (? أو *) للحروف غير المعروفة.",
    tip3: "احفظ هذه الصفحة في المفضلة لسرعة الوصول إليها أثناء اللعب.",
    faq1Q: "هل جميع الأدوات مجانية تماماً؟",
    faq1A: "نعم، جميع الأدوات في AllWordTools مجانية 100% وبدون أي حدود.",
    faq2Q: "هل تعمل على الهواتف الذكية؟",
    faq2A: "نعم، متوافقة وسريعة تماماً على كافة الهواتف والأجهزة اللوحية والكمبيوتر.",
  },
  pt: {
    introP2: "Todas as ferramentas desta categoria são 100% gratuitas e funcionam instantaneamente sem necessidade de cadastro.",
    sec1Heading: "Como funcionam estas ferramentas",
    sec1P: "Basta digitar suas letras, palavras ou texto no campo de busca para obter respostas rápidas e precisas.",
    sec2Heading: "Quando usar estas ferramentas",
    sec2P: "Use sempre que precisar desbloquear palavras em jogos, resolver desafios ou aprimorar sua escrita.",
    tip1: "Aprenda palavras curtas de 2 e 3 letras para maximizar sua pontuação.",
    tip2: "Use coringas (? ou *) para letras desconhecidas.",
    tip3: "Adicione aos favoritos para acesso rápido durante seus jogos.",
    faq1Q: "As ferramentas são gratuitas?",
    faq1A: "Sim, 100% gratuitas e sem limites de busca.",
    faq2Q: "Funciona no celular?",
    faq2A: "Sim, totalmente otimizado para celulares, tablets e computadores.",
  },
  id: {
    introP2: "Semua alat dalam kategori ini 100% gratis dan berfungsi instan tanpa perlu mendaftar.",
    sec1Heading: "Cara kerja alat-alat ini",
    sec1P: "Cukup masukkan huruf atau kata Anda ke kolom pencarian dan dapatkan hasil akurat dalam sekejap.",
    sec2Heading: "Kapan menggunakan alat ini",
    sec2P: "Gunakan saat bermain game kata seperti Scrabble, Wordle, atau saat menulis untuk memperkaya kosakata.",
    tip1: "Pelajari kata-kata pendek 2-3 huruf untuk memaksimalkan skor.",
    tip2: "Gunakan wildcard (? atau *) untuk huruf yang belum diketahui.",
    tip3: "Tandai halaman ini untuk akses cepat saat bermain atau menulis.",
    faq1Q: "Apakah semua alat gratis?",
    faq1A: "Ya, 100% gratis tanpa batasan penggunaan.",
    faq2Q: "Bisa digunakan di smartphone?",
    faq2A: "Ya, sangat responsif dan cepat di HP, tablet, dan komputer.",
  },
  ru: {
    introP2: "Все инструменты этой категории на 100% бесплатны и работают мгновенно без регистрации.",
    sec1Heading: "Как работают эти инструменты",
    sec1P: "Просто введите буквы или слова в поле ввода и мгновенно получите точные варианты.",
    sec2Heading: "Когда использовать эти инструменты",
    sec2P: "Используйте для побед в словесных играх, составления анаграмм, разгадывания кроссвордов и работы с текстами.",
    tip1: "Запоминайте короткие слова из 2-3 букв для набора максимального количества очков.",
    tip2: "Используйте знаки маски (? или *) для неизвестных букв.",
    tip3: "Добавьте эту категорию в закладки для быстрого доступа.",
    faq1Q: "Инструменты бесплатны?",
    faq1A: "Да, абсолютно бесплатны и работают без ограничений.",
    faq2Q: "Работает ли на смартфонах?",
    faq2A: "Да, сайт полностью оптимизирован для мобильных устройств и ПК.",
  },
};

export function getLocalizedCategoryFullContent(
  slug: string,
  locale: string = DEFAULT_LOCALE,
): LocalizedCategoryFullContent {
  const cat = categories.find((c) => c.slug === slug) || categories[0];
  const baseContent = categoryContent[slug];
  const locCat = getLocalizedCategory(cat, locale);
  const tpl = CATEGORY_LANGUAGE_TEMPLATES[locale] || CATEGORY_LANGUAGE_TEMPLATES.hi;

  const title = locCat.title;
  const description = locCat.description;

  // If English or default locale
  if (locale === DEFAULT_LOCALE || !locale || locale === "en") {
    return {
      slug,
      metaTitle: baseContent?.metaTitle || `${title} — AllWordTools`,
      metaDescription: baseContent?.metaDescription || description,
      eyebrow: baseContent?.eyebrow || "Category",
      heading: baseContent?.heading || title,
      subheading: baseContent?.subheading || description,
      intro: baseContent?.intro || [description],
      sections: baseContent?.sections || [],
      tips: baseContent?.tips || [],
      faqs: baseContent?.faqs || [],
    };
  }

  // Localized Content for Target Language
  const metaTitle = `${title} — AllWordTools`;
  return {
    slug,
    metaTitle: metaTitle.length > 58 ? metaTitle.slice(0, 58) : metaTitle,
    metaDescription: description,
    eyebrow: "AllWordTools",
    heading: title,
    subheading: description,
    intro: [
      `${title} — ${description}`,
      tpl.introP2,
    ],
    sections: [
      {
        heading: `${title}: ${tpl.sec1Heading}`,
        paragraphs: [
          description,
          tpl.sec1P,
        ],
      },
      {
        heading: tpl.sec2Heading,
        paragraphs: [
          tpl.sec2P,
        ],
      },
    ],
    tips: [
      tpl.tip1,
      tpl.tip2,
      tpl.tip3,
    ],
    faqs: [
      {
        question: tpl.faq1Q.replace("{title}", title),
        answer: tpl.faq1A,
      },
      {
        question: tpl.faq2Q,
        answer: tpl.faq2A,
      },
    ],
  };
}
