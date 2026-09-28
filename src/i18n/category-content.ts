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

export type CategoryArchetype = "solvers" | "writing" | "dictionary" | "generators";

export function getCategoryArchetype(slug: string): CategoryArchetype {
  switch (slug) {
    case "word-solvers":
    case "letter-tools":
    case "game-helpers":
    case "advanced-solvers":
    case "puzzle-solvers":
      return "solvers";
    case "writing-tools":
    case "grammar-tools":
    case "text-analysis":
      return "writing";
    case "dictionary-tools":
    case "ai-tools":
    case "word-quizzes":
      return "dictionary";
    case "random-generators":
    case "name-generators":
    default:
      return "generators";
  }
}

interface ArchetypeTemplate {
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

const ARCHETYPE_TEMPLATES: Record<string, Record<CategoryArchetype, ArchetypeTemplate>> = {
  hi: {
    solvers: {
      introP2: "यह श्रेणी स्क्रैबल, वर्डले, एनाग्राम और क्रॉसवर्ड जैसे लोकप्रिय शब्द खेलों में अटके अक्षरों को सुलझाने और सर्वश्रेष्ठ स्कोरिंग चालें खोजने के लिए बनाई गई है।",
      sec1Heading: "ये वर्ड सॉल्वर्स कैसे काम करते हैं",
      sec1P: "बस अपनी उपलब्ध टाइलें या ज्ञात अक्षर इनपुट बॉक्स में दर्ज करें। हमारा एल्गोरिद्म आधिकारिक शब्दकोशों से तुरंत सभी वैध शब्द संयोजनों को खोजकर स्कोर के अनुसार क्रमबद्ध करता है।",
      sec2Heading: "सॉल्वर्स का उपयोग कब करें",
      sec2P: "जब भी आप किसी जटिल पहेली में अटकें, बोर्ड पर दोहरे/तिहरे स्कोर वाले वर्गों को जोड़ना चाहें, या खेल के बाद अपनी संभावित चालों का विश्लेषण करना चाहें।",
      tip1: "अधिकतम अंक पाने के लिए 2 और 3 अक्षरों वाले छोटे शब्दों का अभ्यास करें—वे बोर्ड पर टाइलें जोड़ने के लिए सबसे असरदार हैं।",
      tip2: "खाली टाइल्स या अज्ञात अक्षरों के लिए वाइल्डकार्ड (? या *) का उपयोग करें।",
      tip3: "Q, Z, X और J जैसे उच्च-मूल्य वाले अक्षरों पर नज़र रखें और बिना U वाले Q शब्दों को याद रखें।",
      faq1Q: "क्या ये टूल्स आधिकारिक स्क्रैबल टूर्नामेंट नियमों का पालन करते हैं?",
      faq1A: "हाँ, हमारे सॉल्वर्स आधिकारिक टूर्नामेंट शब्द सूचियों (Scrabble व Words With Friends) के अनुसार सटीक स्कोरिंग और वैध शब्द दिखाते हैं।",
      faq2Q: "क्या यह मोबाइल और कंप्यूटर दोनों पर चलता है?",
      faq2A: "हाँ, वेबसाइट पूरी तरह से रेस्पॉन्सिव है और किसी भी स्मार्टफोन, टैबलेट या लैपटॉप पर बिना डाउनलोड के तुरंत काम करती है।",
    },
    writing: {
      introP2: "अपनी रचनात्मक लेखनी, निबंध, ईमेल और व्यावसायिक दस्तावेज़ों को स्पष्ट, प्रभावशाली और व्याकरण की दृष्टि से त्रुटिहीन बनाने के लिए ये टूल्स आदर्श हैं।",
      sec1Heading: "लेखन टूल्स भाषा को कैसे निखारते हैं",
      sec1P: "यह टूल्स आपके वाक्यों की संरचना, शब्दावली विविधता और व्याकरण संबंधी अशुद्धियों का विश्लेषण करते हैं ताकि आप आत्मविश्वास के साथ सटीक लिख सकें।",
      sec2Heading: "लेखन टूल्स का उपयोग कब करें",
      sec2P: "जब आपको दोहरावदार शब्दों के स्थान पर बेहतर विकल्प चाहिए हों, पैसिव वॉइस को एक्टिव वॉइस में बदलना हो, या अपने लेख का पठनीयता स्तर सुधारना हो।",
      tip1: "अपने लेख में गति और ताल बनाए रखने के लिए छोटे और लंबे वाक्यों का संतुलित मिश्रण रखें।",
      tip2: "कमज़ोर क्रियाओं के साथ बहुत सारे क्रियाविशेषण (-ly) लगाने के बजाय एक सशक्त क्रिया का चयन करें।",
      tip3: "ड्राफ्ट पूरा करने के बाद हमारे ग्रामर चेकर से अशुद्धियों को ठीक करें और वाक्य प्रवाह की जांच करें।",
      faq1Q: "क्या ये टूल्स मेरे निबंध और लेखों की गुणवत्ता सुधारने में मदद करेंगे?",
      faq1A: "बिल्कुल! ये टूल्स सटीक पर्यायवाची शब्द सुझाते हैं, पैसिव आवाज़ को एक्टिव में बदलते हैं और वाक्यों को संक्षिप्त व स्पष्ट बनाते हैं।",
      faq2Q: "क्या इन टूल्स का उपयोग पूरी तरह मुफ़्त है?",
      faq2A: "हाँ, AllWordTools पर उपलब्ध सभी लेखन और व्याकरण टूल्स 100% निःशुल्क और असीमित उपयोग के लिए खुले हैं।",
    },
    dictionary: {
      introP2: "शब्दों के सटीक अर्थ, ऐतिहासिक व्युत्पत्ति (etymology), उच्चारण, समानार्थक शब्द और वाक्य प्रयोग को गहराई से समझने के लिए यह भाषा केंद्र सबसे उपयुक्त है।",
      sec1Heading: "शब्दकोश और भाषा टूल्स की कार्यप्रणाली",
      sec1P: "हमारा भाषा डेटाबेस आधुनिक भाषाई शोध और प्रामाणिक शब्दकोशों से जुड़ा है, जो किसी भी अंग्रेज़ी शब्द की बहुआयामी व्याख्या प्रदान करता है।",
      sec2Heading: "इन भाषा टूल्स का उपयोग कब करें",
      sec2P: "GRE, TOEFL, IELTS जैसी प्रतियोगी परीक्षाओं की तैयारी करते समय, जटिल साहित्य पढ़ते वक्त या दैनिक शब्दावली को समृद्ध करने के लिए।",
      tip1: "नए शब्दों के मूल उपसर्गों (prefixes) और प्रत्ययों (suffixes) को समझें ताकि मिलते-जुलते नए शब्दों का अर्थ तुरंत पहचान सकें।",
      tip2: "सिर्फ परिभाषा याद करने के बजाय शब्दों के प्राकृतिक वाक्य प्रयोग (collocations) का अध्ययन करें।",
      tip3: "याददाश्त मजबूत रखने के लिए 1, 3 और 7 दिनों के अंतराल पर नए सीखे गए शब्दों का रिवीज़न करें।",
      faq1Q: "क्या शब्दों के अर्थ और उच्चारण प्रामाणिक स्रोतों से सत्यापित हैं?",
      faq1A: "हाँ, सभी परिभाषाएं, IPA ध्वन्यात्मक प्रतिलेखन और वाक्य प्रयोग विश्वसनीय कोशकीय स्रोतों से सत्यापित हैं।",
      faq2Q: "क्या छात्र इन टूल्स से प्रतियोगी परीक्षाओं की तैयारी कर सकते हैं?",
      faq2A: "हाँ, हज़ारों छात्र GRE, SAT, IELTS और स्कूल परीक्षाओं में अपनी शब्दावली और व्याकरण मजबूत करने के लिए इसका उपयोग करते हैं।",
    },
    generators: {
      introP2: "उपन्यासों, गेमिंग किरदारों, पालतू जानवरों और कहानियों के लिए अनोखे, आकर्षक और रचनात्मक नाम व विचार तुरंत उत्पन्न करें।",
      sec1Heading: "नाम और आइडिया जनरेटर कैसे काम करते हैं",
      sec1P: "हमारे जनरेटर भाषाई ध्वनियों, पौराणिक कथाओं, ऐतिहासिक संदर्भों और शैलियों (fantasy, sci-fi, realistic) का संयोजन करके प्रामाणिक नाम प्रस्तुत करते हैं।",
      sec2Heading: "इन जनरेटर का उपयोग कब करें",
      sec2P: "D&D अभियानों, वीडियो गेम गिल्ड्स, काल्पनिक उपन्यासों के पात्रों के नामकरण, या टीम और ब्रांडिंग के लिए जब नए विचारों की ज़रूरत हो।",
      tip1: "नाम चुनते समय उसे ज़ोर से बोलकर देखें ताकि उसकी ध्वनि और प्रभाव का अंदाज़ा हो सके।",
      tip2: "अपनी शैली (फंतासी, ऐतिहासिक, आधुनिक) के अनुसार फ़िल्टर का उपयोग करके सबसे सटीक नाम खोजें।",
      tip3: "पसंदीदा 3-4 नामों की एक छोटी सूची बनाएं और अपनी टीम या पाठकों से उनकी राय लें।",
      faq1Q: "क्या मैं उत्पन्न किए गए नामों का उपयोग अपनी किताब या व्यावसायिक प्रोजेक्ट में कर सकता हूँ?",
      faq1A: "हाँ, यहाँ उत्पन्न सभी नाम 100% रॉयल्टी-फ्री हैं और आप उन्हें अपनी किताबों, गेम्स और ब्रांड्स में बिना किसी शुल्क के उपयोग कर सकते हैं।",
      faq2Q: "क्या मैं एक बार में कई नाम उत्पन्न कर सकता हूँ?",
      faq2A: "हाँ, आप सिंगल क्लिक में दर्जनों रचनात्मक विकल्प प्राप्त कर सकते हैं और अपनी पसंद के नाम कॉपी कर सकते हैं।",
    },
  },

  es: {
    solvers: {
      introP2: "Esta categoría reúne las mejores herramientas para resolver letras desordenadas, descifrar crucigramas, ganar en Wordle y optimizar jugadas de Scrabble y Apalabrados.",
      sec1Heading: "Cómo funcionan los solucionadores de palabras",
      sec1P: "Ingresa tus fichas o letras conocidas en el buscador. Nuestro motor consulta diccionarios oficiales en milisegundos para listar todas las palabras válidas ordenadas por puntuación.",
      sec2Heading: "Cuándo utilizar estas herramientas",
      sec2P: "Úsalas cuando te quedes atascado en una partida reñida, necesites conectar casillas de doble o triple puntuación, o quieras estudiar mejores combinaciones de juego.",
      tip1: "Memoriza palabras cortas de 2 y 3 letras para enganchar jugadas en esquinas difíciles del tablero.",
      tip2: "Utiliza comodines (? o *) para representar fichas en blanco o letras desconocidas.",
      tip3: "Aprende las palabras con Q sin U y aprovecha al máximo letras de alto valor como Z, X y J.",
      faq1Q: "¿Estas herramientas son válidas para torneos de Scrabble y Apalabrados?",
      faq1A: "Sí, nuestras herramientas aplican los diccionarios oficiales de competición y las tablas de puntuación exactas de cada juego.",
      faq2Q: "¿Funcionan bien en dispositivos móviles?",
      faq2A: "Sí, la plataforma está 100% optimizada para teléfonos móviles y tablets, sin necesidad de instalar aplicaciones.",
    },
    writing: {
      introP2: "Herramientas diseñadas para escritores, estudiantes y profesionales que buscan perfeccionar su estilo, corregir la gramática y crear textos fluidos y persuasivos.",
      sec1Heading: "Cómo mejoran tu texto estas herramientas",
      sec1P: "Analizan la estructura sintáctica, detectan errores gramaticales, eliminan la redundancia y ofrecen alternativas léxicas precisas para cada oración.",
      sec2Heading: "Cuándo recurrir a estas herramientas de escritura",
      sec2P: "Al redactar ensayos académicos, correos profesionales, novelas o artículos donde la claridad y la corrección ortográfica son prioritarias.",
      tip1: "Alterna oraciones cortas con frases más largas para darle musicalidad y ritmo dinámico a tu prosa.",
      tip2: "Reemplaza construcciones pasivas por verbos de acción directa para que tu mensaje sea enérgico y claro.",
      tip3: "Evita la acumulación excesiva de adverbios terminados en -mente; un verbo preciso siempre tiene más fuerza.",
      faq1Q: "¿Cómo ayudan estas herramientas a mejorar la claridad de mis textos?",
      faq1A: "Ayudan a detectar repeticiones innecesarias, verificar la coherencia verbal y enriquecer el vocabulario con sinónimos precisos.",
      faq2Q: "¿El uso de estas herramientas es totalmente gratuito?",
      faq2A: "Sí, todas las herramientas de escritura y análisis de AllWordTools son 100% gratuitas y sin límites de consulta.",
    },
    dictionary: {
      introP2: "Explora definiciones completas, etimologías históricas, transcripciones fonéticas (IPA) y ejemplos de uso auténticos para enriquecer tu vocabulario.",
      sec1Heading: "Metodología lexicográfica y precisión",
      sec1P: "Nuestro repositorio lingüístico sintetiza fuentes lexicográficas contrastadas para brindarte explicaciones contextuales que van más allá de una simple definición estática.",
      sec2Heading: "Cuándo consultar estas herramientas de diccionario",
      sec2P: "Para preparar exámenes de idiomas, comprender lecturas literarias avanzadas o aprender las combinaciones idiomáticas naturales de cada término.",
      tip1: "Analiza prefijos y sufijos de origen grecolatino para deducir el significado de palabras desconocidas.",
      tip2: "Observa las colocaciones (palabras que suelen acompañar al término) para hablar y redactar con total naturalidad.",
      tip3: "Repasa los términos nuevos a los 1, 3 y 7 días para afianzar su memorización a largo plazo.",
      faq1Q: "¿Las definiciones y transcripciones fonéticas están verificadas?",
      faq1A: "Sí, todos los significados, fonética IPA y ejemplos provienen de corpus lingüísticos y diccionarios de referencia.",
      faq2Q: "¿Puedo utilizar estas herramientas para preparar exámenes oficiales?",
      faq2A: "Absolutamente; miles de estudiantes las emplean a diario para preparar pruebas de aptitud verbal y exámenes de idiomas.",
    },
    generators: {
      introP2: "Crea nombres memorables para personajes de fantasía, mascotas, clanes de videojuegos y obtén ideas inspiradoras para proyectos creativos.",
      sec1Heading: "Cómo generan ideas y nombres nuestros algoritmos",
      sec1P: "Combinan patrones fonéticos, raíces mitológicas, convenciones de género narrativo y asociaciones semánticas para ofrecer nombres creíbles y cautivadores.",
      sec2Heading: "Cuándo utilizar los generadores de nombres e ideas",
      sec2P: "Para campañas de rol (D&D), desarrollo de videojuegos, novelas de ficción, o cuando necesitas bautizar una nueva mascota o proyecto.",
      tip1: "Pronuncia el nombre en voz alta varias veces para comprobar su sonoridad y facilidad de recuerdo.",
      tip2: "Elige la categoría o temática adecuada (fantasía medieval, ciencia ficción, cómico) para afinar la búsqueda.",
      tip3: "Guarda tus 3 opciones favoritas y compártelas con amigos o lectores antes de tomar la decisión final.",
      faq1Q: "¿Puedo usar los nombres generados en proyectos comerciales o libros?",
      faq1A: "Sí, todos los nombres generados son de dominio libre y puedes utilizarlos sin restricciones en tus novelas, juegos o marcas.",
      faq2Q: "¿Cuántos nombres puedo generar a la vez?",
      faq2A: "Puedes generar decenas de opciones en cada clic y copiar tus favoritas al portapapeles al instante.",
    },
  },

  de: {
    solvers: {
      introP2: "Löse Scrabble, Kreuzworträtsel, Wordle und Buchstabensalate blitzschnell mit präzisen, offiziell geprüften Wörterbüchern.",
      sec1Heading: "So funktionieren unsere Wort-Löser",
      sec1P: "Gib deine verfügbaren Buchstaben oder Muster ein. Unser Algorithmus durchsucht umfangreiche Wortlisten und sortiert Treffer nach Punktzahl und Länge.",
      sec2Heading: "Wann du Wort-Löser einsetzen solltest",
      sec2P: "Ideal bei kniffligen Spielzügen, um Bonusfelder optimal zu nutzen oder um nach einer Runde die besten Optionen zu analysieren.",
      tip1: "Lerne kurze 2- und 3-Buchstaben-Wörter – sie sind der Schlüssel für hohe Scrabble-Wertungen.",
      tip2: "Nutze Platzhalter (? oder *) für leere Spielsteine oder unbekannte Buchstaben im Rätselgitter.",
      tip3: "Halte Ausschau nach Buchstaben mit hohem Punktwert wie Q, X und Y.",
      faq1Q: "Sind diese Löser für offizielle Scrabble-Regeln optimiert?",
      faq1A: "Ja, die Wortlisten entsprechen den gängigen Turnier- und Turnierspielregeln.",
      faq2Q: "Funktioniert das Tool auf Smartphones?",
      faq2A: "Ja, vollständig für Mobiltelefone, Tablets und Desktop-Browser optimiert.",
    },
    writing: {
      introP2: "Optimiere deine Texte, Essays und Gedichte mit gezielten Synonymen, Reimen, Silbenzählern und Grammatikprüfungen.",
      sec1Heading: "Wie diese Schreibwerkzeuge deine Texte verbessern",
      sec1P: "Sie analysieren Satzmuster, decken passive Formulierungen auf und helfen dir, präzisere und lebendigere Worte zu wählen.",
      sec2Heading: "Beste Einsatzmöglichkeiten für Schreibwerkzeuge",
      sec2P: "Beim Verfassen wissenschaftlicher Arbeiten, kreativer Geschichten, professioneller E-Mails oder beim Feinschliff von Lyrik.",
      tip1: "Variiere die Satzlänge, um einen lebendigen und angenehmen Lesefluss zu erzeugen.",
      tip2: "Ersetze schwache Verben und Füllwörter durch ausdrucksstarke Handlungsverben.",
      tip3: "Nutze den Silbenzähler für metrische Gedichte und Haikus.",
      faq1Q: "Helfen diese Werkzeuge bei der Textverständlichkeit?",
      faq1A: "Ja, sie unterstützen dich dabei, Schachtelsätze zu vereinfachen und passende Synonyme zu finden.",
      faq2Q: "Ist die Nutzung komplett kostenfrei?",
      faq2A: "Ja, alle Schreibwerkzeuge auf AllWordTools stehen kostenlos und ohne Anmeldung bereit.",
    },
    dictionary: {
      introP2: "Entdecke fundierte Wortbedeutungen, IPA-Aussprachen, Herkunft und authentische Satzbeispiele für einen reicheren Wortschatz.",
      sec1Heading: "Lexikografische Tiefe und Genauigkeit",
      sec1P: "Unsere Datenbank stützt sich auf fundierte linguistische Quellen, um dir genaue Definitionen und Kontextbeispiele zu liefern.",
      sec2Heading: "Wann du diese Wörterbuch-Tools nutzen solltest",
      sec2P: "Beim Erlernen von Fremdsprachen, Vorbereiten von Sprachprüfungen oder Vertiefen anspruchsvoller Literatur.",
      tip1: "Achte auf typische Wortverbindungen (Kollokationen), um stilsicher zu formulieren.",
      tip2: "Lerne Wortursprünge kennen – etymologische Wurzeln erleichtern das Merken verwandter Wörter.",
      tip3: "Wiederhole neue Vokabeln in regelmäßigen Intervallen zur Festigung im Langzeitgedächtnis.",
      faq1Q: "Sind Aussprachen und Definitionen sprachwissenschaftlich geprüft?",
      faq1A: "Ja, alle Angaben basieren auf anerkannten sprachwissenschaftlichen Wörterbüchern.",
      faq2Q: "Eignen sich die Tools für Sprachlernende?",
      faq2A: "Hervorragend – viele Lernende nutzen sie gezielt für Vokabeltraining und Ausspracheübungen.",
    },
    generators: {
      introP2: "Finde inspirierende Namen für Fantasy-Charaktere, Haustiere, Gaming-Clans sowie kreative Schreibanlässe auf Knopfdruck.",
      sec1Heading: "Wie Namens- und Themengeneratoren arbeiten",
      sec1P: "Sie kombinieren linguistische Klangmuster, Genre-Konventionen und Mythologien zu stimmigen und originellen Namensvorschlägen.",
      sec2Heading: "Typische Einsatzbereiche für Generatoren",
      sec2P: "Für Pen-&-Paper-Rollenspiele (D&D), Romane, Game-Entwicklung oder kreative Brainstorming-Runden.",
      tip1: "Sprich den generierten Namen laut aus, um Rhythmus und Sprachklang zu prüfen.",
      tip2: "Wähle das passende Thema (z.B. Fantasy, Sci-Fi oder Humor) für zielgerichtete Ergebnisse.",
      tip3: "Erstelle eine Favoritenliste aus mehreren Durchläufen und vergleiche deine Favoriten.",
      faq1Q: "Darf ich die Namen in kommerziellen Büchern oder Spielen verwenden?",
      faq1A: "Ja, alle generierten Namen und Ideen sind rechtefrei und kommerziell nutzbar.",
      faq2Q: "Wie viele Vorschläge kann ich auf einmal erstellen?",
      faq2A: "Du kannst beliebig viele Vorschläge generieren und mit einem Klick kopieren.",
    },
  },

  ar: {
    solvers: {
      introP2: "أدوات مخصصة لحل الحروف المبعثرة، الكلمات المتقاطعة، وألعاب الذكاء مثل سكرابل وWordle بدقة وسرعة فائقة.",
      sec1Heading: "كيف تعمل أدوات حل الكلمات",
      sec1P: "أدخل الحروف المتاحة في صندوق البحث، وسيقوم المحرك بفحص القواميس المعتمدة لتقديم قائمة كاملة بالكلمات الصالحة مرتبة حسب النقاط.",
      sec2Heading: "متى تستخدم هذه الأدوات",
      sec2P: "استخدمها عند مواجهة صعوبة في تشكيل كلمات أثناء اللعب، أو للتخطيط لحركات تسجل أعلى النقاط على اللوحة.",
      tip1: "احفظ الكلمات القصيرة المكونة من حرفين أو ثلاثة لاستغلال المساحات الضيقة على اللوحة.",
      tip2: "استخدم الرموز البديلة مثل (? أو *) للحروف المجهولة أو القطع الفارغة.",
      tip3: "ركز على الحروف ذات القيمة العالية لتحقيق فوز مؤكد في ألعاب الكلمات.",
      faq1Q: "هل تدعم هذه الأدوات قواعد بطولات سكرابل الرسمية؟",
      faq1A: "نعم، تطابق الأدوات القواميس الرسمية المعتمدة لحساب النقاط وترتيب الكلمات.",
      faq2Q: "هل تعمل الخدمة بكفاءة على الهواتف الذكية؟",
      faq2A: "نعم، الموقع مصمم للعمل بسرعة فائقة على كافة الهواتف والأجهزة اللوحية دون الحاجة لتثبيت أي برامج.",
    },
    writing: {
      introP2: "أدوات متطورة لمساعدة الكتاب والطلاب على صقل نصوصهم، تحسين قواعد اللغة، وتنسيق الأسلوب الأدبي بدقة واحترافية.",
      sec1Heading: "كيف ترتقي هذه الأدوات بأسلوب كتابتك",
      sec1P: "تقوم بفحص التراكيب النحوية، اقتراح مرادفات دقيقة، وتصحيح العبارات الركيكة لتجعل نصوصك واضحة ومقنعة.",
      sec2Heading: "متى تحتاج إلى أدوات الكتابة",
      sec2P: "عند كتابة المقالات الأكاديمية، الروايات، الرسائل الرسمية أو تدقيق النصوص لغوياً.",
      tip1: "نوّع بين الجمل القصيرة والجمل الطويلة لخلق إيقاع سلس وممتع للقارئ.",
      tip2: "استبدل الأفعال الضعيفة بأفعال حركة حيوية تمنح النص قوة وتأثيراً.",
      tip3: "احرص على مراجعة النص بعد الانتهاء للتأكد من تناسق الضمائر والأزمنة.",
      faq1Q: "هل تساعد هذه الأدوات في تحسين صياغة المقالات؟",
      faq1A: "نعم، تقدم بدائل لغوية غنية وتساعد في التخلص من التكرار اللفظي غير المفيد.",
      faq2Q: "هل استخدام أدوات الكتابة مجاني تماماً؟",
      faq2A: "نعم، جميع أدوات الكتابة والتحليل في AllWordTools مجانية 100% بدون أي رسوم.",
    },
    dictionary: {
      introP2: "مرجع لغوي شامل لمعرفة معاني الكلمات الدقيقة، أصولها التاريخية، ونطقها الصوتي الصحيح مع أمثلة سياقية واقعية.",
      sec1Heading: "دقة المعاجم والبيانات اللغوية",
      sec1P: "تعتمد أدواتنا على مراجع معجمية رصينة لتقديم معانٍ سياقية متكاملة لا تقتصر على التعريف المجرد.",
      sec2Heading: "أفضل الأوقات لاستخدام أدوات المعاجم",
      sec2P: "أثناء دراسة اللغات الأجنبية، التحضير للاختبارات الدولية (IELTS/TOEFL)، أو قراءة الأدب الكلاسيكي.",
      tip1: "افهم الجذور اللغوية واللواحق لتخمين معاني الكلمات الجديدة بسهولة.",
      tip2: "احرص على دراسة المتلازمات اللفظية لاستخدام الكلمة كما يستخدمها المتحدث الأصلي.",
      tip3: "راجع الكلمات الجديدة على فترات متباعدة لتثبيتها في الذاكرة طويلة المدى.",
      faq1Q: "هل معاني الكلمات والرموز الصوتية موثوقة؟",
      faq1A: "نعم، يتم استخراج جميع التعريفات والنطق الصوتي من مصادر لغوية معتمدة.",
      faq2Q: "هل تفيد هذه الأدوات دارسي اللغات والطلاب؟",
      faq2A: "بالتأكيد، تُعد وسيلة ممتازة لتوسيع الحصيلة اللغوية واكتساب الثقة في التحدث والكتابة.",
    },
    generators: {
      introP2: "ابتكر أسماء مميزة لشخصيات الروايات، الألعاب، الفرق، واستلهم أفكاراً جديدة ومبتكرة لمشاريعك الإبداعية.",
      sec1Heading: "آلية عمل مولدات الأسماء والأفكار",
      sec1P: "تدمج الأدوات أنماطاً صوتية وجذوراً أسطورية وخلفيات خيالية لتوليد أسماء ملهمة تناسب كل سياق.",
      sec2Heading: "متى تستخدم مولدات الأسماء",
      sec2P: "عند تصميم ألعاب تقمص الأدوار (RPG)، كتابة القصص الخيالية، أو تسمية قنوات ومجموعات جديدة.",
      tip1: "انطق الاسم بصوت مسموع للتأكد من سلاسته وسهولة حفظه.",
      tip2: "حدد الفئة المناسبة (خيال علمي، أساطير، أسماء واقعية) للحصول على أفضل النتائج.",
      tip3: "اختر 3 خيارات مفضلة واستشر أصدقاءك أو فريقك لاختيار الأفضل.",
      faq1Q: "هل يحق لي استخدام الأسماء الناتجة في مشاريع تجارية أو كتب منشورة؟",
      faq1A: "نعم، كافة الأسماء والأفكار الناتجة مجانية بالكامل ومتاحة للاستخدام التجاري والشخصي.",
      faq2Q: "كم عدد الأسماء التي يمكنني توليدها؟",
      faq2A: "يمكنك توليد عدد غير محدود من الأسماء بنقرة واحدة ونسخ ما يناسبك فوراً.",
    },
  },

  pt: {
    solvers: {
      introP2: "Ferramentas essenciais para desembaralhar letras, solucionar palavras cruzadas, vencer no Wordle e maximizar seus pontos no Scrabble.",
      sec1Heading: "Como funcionam os solucionadores de palavras",
      sec1P: "Digite suas letras disponíveis ou padrões de busca. Nosso mecanismo consulta dicionários oficiais para listar palavras válidas ordenadas por pontuação.",
      sec2Heading: "Quando usar estas ferramentas",
      sec2P: "Use sempre que precisar desbloquear jogadas difíceis, preencher cantos do tabuleiro ou estudar táticas para melhorar seu jogo.",
      tip1: "Memorize palavras de 2 e 3 letras para encaixar jogadas em espaços apertados e multiplicar pontos.",
      tip2: "Utilize coringas (? ou *) para letras desconhecidas ou peças em branco.",
      tip3: "Aproveite letras raras de alto valor como Z, X e Q para virar partidas competitivas.",
      faq1Q: "Estas ferramentas seguem as regras de torneios oficiais de Scrabble?",
      faq1A: "Sim, nossos solucionadores aplicam os léxicos oficiais e as pontuações padronizadas dos jogos de tabuleiro.",
      faq2Q: "Funciona perfeitamente em celulares?",
      faq2A: "Sim, a plataforma é totalmente responsiva e roda com alta velocidade em celulares, tablets e computadores.",
    },
    writing: {
      introP2: "Aprimore sua escrita com ferramentas para encontrar sinônimos exatos, contar sílabas, converter voz passiva e corrigir gramática.",
      sec1Heading: "Como estas ferramentas elevam sua escrita",
      sec1P: "Elas analisam estruturas frasais, apontam vícios de linguagem e sugerem alternativas lexicais precisas para tornar sua prosa envolvente.",
      sec2Heading: "Quando utilizar ferramentas de escrita",
      sec2P: "Ao redigir redações acadêmicas, artigos profissionais, histórias literárias ou mensagens de negócios.",
      tip1: "Varie a extensão das frases para criar um ritmo dinâmico que prenda a atenção do leitor.",
      tip2: "Substitua verbos fracos acompanhados de muitos advérbios por verbos de ação expressivos.",
      tip3: "Revise o texto final para garantir concordância verbal e clareza de ideias.",
      faq1Q: "Estas ferramentas ajudam a melhorar redações e ensaios?",
      faq1A: "Sim, elas auxiliam na eliminação de repetições desnecessárias e no enriquecimento do vocabulário.",
      faq2Q: "O uso das ferramentas é gratuito?",
      faq2A: "Sim, todas as ferramentas de escrita do AllWordTools são 100% gratuitas e sem limites de uso.",
    },
    dictionary: {
      introP2: "Consulte definições completas, origens etimológicas, transcrições fonéticas e frases de exemplo autênticas para enriquecer seu vocabulário.",
      sec1Heading: "Precisão lexicográfica e contexto",
      sec1P: "Reunimos dados linguísticos confiáveis para oferecer não apenas conceitos estáticos, mas a aplicação prática das palavras no dia a dia.",
      sec2Heading: "Quando consultar as ferramentas de dicionário",
      sec2P: "Ao estudar para exames, ler literatura clássica ou aprofundar seu domínio sobre termos técnicos e nuances do idioma.",
      tip1: "Aprenda prefixos e sufixos comuns para deduzir o significado de palavras desconhecidas com rapidez.",
      tip2: "Observe as colocações naturais (palavras frequentemente usadas juntas) para escrever como um nativo.",
      tip3: "Revise novas palavras em intervalos regulares para consolidar o aprendizado na memória de longo prazo.",
      faq1Q: "As definições e transcrições fonéticas são confiáveis?",
      faq1A: "Sim, todas as informações são baseadas em corpus linguísticos e fontes dicionarizadas reconhecidas.",
      faq2Q: "Estudantes podem usar para preparação de exames?",
      faq2A: "Com certeza; muitos utilizam nossas ferramentas para expandir o vocabulário e aprimorar a compreensão verbal.",
    },
    generators: {
      introP2: "Gere nomes marcantes para personagens de RPG, animais de estimação, clãs de jogos e descubra ideias criativas para novas histórias.",
      sec1Heading: "Como funcionam os geradores de nomes e ideias",
      sec1P: "Eles mesclam raízes fonéticas, convenções de gênero literário e sonoridades agradáveis para gerar sugestões originais e cativantes.",
      sec2Heading: "Quando usar geradores de nomes",
      sec2P: "Para campanhas de RPG (D&D), criação de universos de ficção, games ou ao escolher o nome de um novo pet.",
      tip1: "Pronuncie o nome gerado em voz alta para avaliar sua sonoridade e facilidade de pronúncia.",
      tip2: "Filtre pela categoria apropriada (fantasia medieval, ficção científica, realista) para obter sugestões temáticas.",
      tip3: "Selecione seus 3 nomes favoritos e peça a opinião de colegas ou leitores antes de escolher o definitivo.",
      faq1Q: "Posso usar os nomes gerados em livros comerciais ou jogos?",
      faq1A: "Sim, todos os nomes e ideias gerados são livres de royalties e liberados para uso pessoal e comercial.",
      faq2Q: "Quantos nomes posso gerar por vez?",
      faq2A: "Você pode gerar dezenas de nomes a cada clique e copiá-los facilmente com um único toque.",
    },
  },

  id: {
    solvers: {
      introP2: "Pecahkan susunan huruf acak, teka-teki silang, tantangan Wordle, dan temukan kata berbobot tinggi untuk Scrabble dengan cepat dan akurat.",
      sec1Heading: "Cara kerja pemecah kata",
      sec1P: "Masukkan huruf acak atau pola teka-teki Anda. Algoritma kami mencocokkan kata dengan kamus resmi dan menyajikan hasil terurut berdasarkan skor.",
      sec2Heading: "Kapan menggunakan pemecah kata",
      sec2P: "Gunakan saat mengalami kebuntuan dalam permainan papan kata, mencari celah skor tinggi, atau mengevaluasi strategi bermain.",
      tip1: "Hafalkan kata-kata pendek 2-3 huruf untuk menyambung ubin di area papan yang sempit.",
      tip2: "Gunakan wildcard (? atau *) untuk mewakili huruf kosong atau huruf yang belum diketahui.",
      tip3: "Maksimalkan huruf bernilai tinggi seperti Q, Z, dan X untuk membalikkan keunggulan lawan.",
      faq1Q: "Apakah pemecah kata ini sesuai dengan aturan resmi permainan?",
      faq1A: "Ya, daftar kata kami mengacu pada standar kamus resmi turnamen Scrabble dan Words With Friends.",
      faq2Q: "Bisa digunakan di perangkat ponsel?",
      faq2A: "Tentu saja; situs ini sangat responsif dan ringan diakses dari ponsel pintar, tablet, maupun komputer.",
    },
    writing: {
      introP2: "Sempurnakan gaya penulisan, esai, dan puisi Anda dengan pencari sinonim, penghitung suku kata, dan pemeriksa tata bahasa praktis.",
      sec1Heading: "Bagaimana alat ini meningkatkan kualitas tulisan Anda",
      sec1P: "Menganalisis variasi kosakata, mendeteksi kalimat pasif yang berlebihan, dan memberikan alternatif kata yang lebih hidup dan efektif.",
      sec2Heading: "Kapan menggunakan alat tulis ini",
      sec2P: "Saat menulis esai akademis, artikel blog, surat profesional, atau menyusun rima puisi yang berirama indah.",
      tip1: "Variasikan panjang kalimat untuk menjaga ritme membaca tetap segar dan tidak monoton.",
      tip2: "Gunakan kata kerja aksi yang kuat daripada menumpuk kata keterangan yang berlebihan.",
      tip3: "Periksa kembali susunan kalimat sebelum mempublikasikan tulisan Anda.",
      faq1Q: "Bagaimana alat ini membantu memperjelas tulisan saya?",
      faq1A: "Membantu menemukan kata-kata yang lebih tepat, memangkas kalimat berbelit-belit, dan memperkaya gaya bahasa Anda.",
      faq2Q: "Apakah seluruh alat ini gratis digunakan?",
      faq2A: "Ya, semua alat tulis di AllWordTools 100% gratis tanpa batasan jumlah pencarian.",
    },
    dictionary: {
      introP2: "Ketahui definisi mendalam, fonetik IPA, asal-usul kata (etimologi), dan contoh kalimat kontekstual untuk memperkaya perbendaharaan kata Anda.",
      sec1Heading: "Keakuratan leksikal dan konteks bahasa",
      sec1P: "Didukung oleh basis data linguistik terpercaya untuk memberikan pemahaman holistik tentang penggunaan kata dalam berbagai situasi.",
      sec2Heading: "Kapan waktu terbaik menggunakan alat kamus ini",
      sec2P: "Saat belajar bahasa Inggris, persiapan tes kompetensi (TOEFL/IELTS), atau memahami bacaan teks yang kompleks.",
      tip1: "Pelajari awalan dan akhiran kata untuk mempermudah menebak arti kata baru secara mandiri.",
      tip2: "Perhatikan kolokasi alami (kata-kata yang lazim bersandingan) agar bahasa Anda terdengar alami.",
      tip3: "Lakukan pengulangan berkala pada kata baru untuk memperkuat daya ingat jangka panjang.",
      faq1Q: "Apakah definisi dan panduan fonetiknya akurat?",
      faq1A: "Ya, seluruh materi definisi dan transkripsi fonetik bersumber dari rujukan leksikografi terpercaya.",
      faq2Q: "Apakah alat ini cocok untuk pelajar?",
      faq2A: "Sangat cocok; ribuan siswa dan guru memanfaatkannya untuk memperdalam penguasaan kosakata setiap hari.",
    },
    generators: {
      introP2: "Dapatkan nama-nama unik untuk karakter cerita fantasi, hewan peliharaan, klan game, serta ide topik segar untuk tulisan kreatif Anda.",
      sec1Heading: "Bagaimana generator nama dan ide bekerja",
      sec1P: "Mengombinasikan pola fonem, unsur mitologi, dan nuansa genre untuk menciptakan pilihan nama yang berkarakter dan mudah diingat.",
      sec2Heading: "Kapan menggunakan generator nama",
      sec2P: "Untuk sesi bermain game RPG (D&D), pembuatan novel fiksi, nama grup tim, atau mencari panggilan unik untuk hewan peliharaan.",
      tip1: "Ucapkan nama secara lantang untuk merasakan ritme dan kemudahan pelafalannya.",
      tip2: "Gunakan filter tema (fantasi, fiksi ilmiah, atau klasik) untuk mencocokkan suasana yang Anda inginkan.",
      tip3: "Kumpulkan beberapa opsi favorit terlebih dahulu sebelum menentukan nama terbaik bersama rekan Anda.",
      faq1Q: "Bolehkah saya menggunakan nama ini untuk proyek komersial atau buku?",
      faq1A: "Boleh! Semua nama yang dihasilkan bebas royalti dan dapat digunakan untuk novel, game, maupun merek dagang.",
      faq2Q: "Berapa banyak nama yang bisa dihasilkan sekaligus?",
      faq2A: "Anda bisa menghasilkan banyak variasi nama dalam sekali klik dan langsung menyalinnya dengan mudah.",
    },
  },

  ru: {
    solvers: {
      introP2: "Набор инструментов для составления слов из букв, решения кроссвордов, побед в Wordle и подбора ходов для Эрудита и Скрабла.",
      sec1Heading: "Как работают решатели слов",
      sec1P: "Введите доступные буквы или маску слова. Наш поисковый алгоритм мгновенно сопоставит их с официальными словарями и отсортирует варианты по очкам.",
      sec2Heading: "Когда использовать эти инструменты",
      sec2P: "Когда нужно выйти из тупика во время игры, занять призовые клетки с удвоением очков или проанализировать ход после партии.",
      tip1: "Запоминайте короткие слова из 2-3 букв — они незаменимы для соединения фишек на тесных участках поля.",
      tip2: "Используйте звездочку (*) или знак вопроса (?) как маску для пустых фишек и неизвестных букв.",
      tip3: "Следите за буквами высокой стоимости, чтобы совершать решающие победные ходы.",
      faq1Q: "Соответствуют ли словари официальным правилам Скрабла и Эрудита?",
      faq1A: "Да, наши базы данных регулярно сверяются с турнирными словарями и стандартами классических словесных игр.",
      faq2Q: "Удобно ли пользоваться сайтом с мобильного телефона?",
      faq2A: "Да, сайт отлично адаптирован для экранов смартфонов и планшетов и работает мгновенно без скачивания приложений.",
    },
    writing: {
      introP2: "Улучшайте стиль статей, эссе и стихов: подбирайте точные синонимы, рифмы, считайте слоги и проверяйте грамотность.",
      sec1Heading: "Как инструменты письма совершенствуют ваш текст",
      sec1P: "Они анализируют синтаксис, выявляют повторы и помогают подобрать емкие формулировки для увлекательного чтения.",
      sec2Heading: "В каких случаях пригодятся эти инструменты",
      sec2P: "При написании академических работ, художественной прозы, стихов, деловой переписки или постов для блогов.",
      tip1: "Чередуйте короткие и развернутые предложения, чтобы сделать ритм текста живым и динамичным.",
      tip2: "Заменяйте громоздкие описания точными глаголами действия — это придает тексту энергию.",
      tip3: "Проверяйте благозвучие и читаемость текста перед финальной публикацией.",
      faq1Q: "Помогут ли эти инструменты повысить выразительность текста?",
      faq1A: "Безусловно: они помогают избавиться от тавтологии, найти меткие синонимы и придать тексту профессиональный вид.",
      faq2Q: "Является ли использование инструментов бесплатным?",
      faq2A: "Да, все инструменты для авторов на AllWordTools полностью бесплатны и доступны без регистрации.",
    },
    dictionary: {
      introP2: "Подробные словарные толкования, фонетическая транскрипция (IPA), этимологические корни и живые примеры использования слов.",
      sec1Heading: "Лексикографическая точность и контекст",
      sec1P: "Мы объединяем авторитетные языковые источники, чтобы предоставить вам глубокое понимание смысловых оттенков каждого слова.",
      sec2Heading: "Когда обращаться к словарям и справочникам",
      sec2P: "При подготовке к языковым экзаменам (TOEFL, IELTS), чтении сложной литературы или изучении тонкостей употребления слов.",
      tip1: "Изучайте распространенные приставки и суффиксы — это помогает интуитивно понимать значения незнакомых слов.",
      tip2: "Обращайте внимание на устойчивые сочетания (коллокации), чтобы звучать естественно в устной и письменной речи.",
      tip3: "Повторяйте новые термины с интервалами, чтобы перенести их в долговременную память.",
      faq1Q: "Проверены ли толкования и фонетические транскрипции?",
      faq1A: "Да, все данные основаны на проверенных лексикографических корпусах и признанных словарях.",
      faq2Q: "Подходят ли эти инструменты для изучающих язык?",
      faq2A: "Да, студенты и преподаватели активно используют их для расширения словарного запаса и тренировки произношения.",
    },
    generators: {
      introP2: "Генерируйте звучные имена для фэнтези-персонажей, игровых гильдий, питомцев и находите свежие темы для писательских упражнений.",
      sec1Heading: "Принцип работы генераторов имен и идей",
      sec1P: "Алгоритмы объединяют фонетические законы, мифологические мотивы и жанровые традиции для создания оригинальных вариантов.",
      sec2Heading: "Сферы применения генераторов",
      sec2P: "Для настольных ролевых игр (D&D), романов, сценариев видеоигр, названия команд или выбора клички для питомца.",
      tip1: "Произнесите имя вслух, чтобы оценить его звучность и легкость восприятия на слух.",
      tip2: "Выбирайте нужную тематику (фэнтези, научная фантастика, забавные клички) для получения точных результатов.",
      tip3: "Соберите шорт-лист из 3-4 лучших вариантов и посоветуйтесь с друзьями или игроками команды.",
      faq1Q: "Можно ли использовать сгенерированные имена в коммерческих книгах и играх?",
      faq1A: "Да, все предложенные имена и идеи свободны от авторских прав и могут свободно использоваться в коммерческих проектах.",
      faq2Q: "Сколько вариантов можно получить за один раз?",
      faq2A: "Вы можете генерировать десятки вариантов в один клик и мгновенно копировать подходящие.",
    },
  },
};

export function getLocalizedCategoryFullContent(
  slug: string,
  locale: string = DEFAULT_LOCALE,
): LocalizedCategoryFullContent {
  const cat = categories.find((c) => c.slug === slug) || categories[0];
  const baseContent = categoryContent[slug];
  const locCat = getLocalizedCategory(cat, locale);
  const archetype = getCategoryArchetype(slug);

  const langTemplates = ARCHETYPE_TEMPLATES[locale] || ARCHETYPE_TEMPLATES.hi;
  const tpl = langTemplates[archetype] || langTemplates.solvers;

  const title = locCat.title;
  const description = locCat.description;

  // If English or default locale, return the rich handcrafted English copy
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

  // Archetype-aware Localized Content for Non-English Locales
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
