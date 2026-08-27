import { DEFAULT_LOCALE } from "./locales";

export interface LocalizedCategoryInfo {
  title: string;
  description: string;
}

export const CATEGORY_TRANSLATIONS: Record<string, Record<string, LocalizedCategoryInfo>> = {
  "word-solvers": {
    en: {
      title: "Word Solvers",
      description: "Crack any puzzle in seconds. Unscramble letters, solve anagrams, beat Wordle and fill crossword grids with fast, accurate solvers.",
    },
    hi: {
      title: "वर्ड सॉल्वर्स",
      description: "कुछ ही सेकंड में किसी भी पहेली को हल करें। अक्षरों को सुलझाएं, एनाग्राम हल करें, Wordle जीतें और क्रॉसवर्ड ग्रिड भरें।",
    },
    es: {
      title: "Solucionadores de Palabras",
      description: "Resuelve cualquier acertijo en segundos. Descifra letras, resuelve anagramas, vence en Wordle y completa crucigramas.",
    },
    de: {
      title: "Wort-Löser",
      description: "Löse jedes Rätsel in Sekundenschnelle. Buchstaben entwirren, Anagramme lösen, Wordle knacken und Kreuzworträtsel füllen.",
    },
    ar: {
      title: "حلول الكلمات",
      description: "حل أي لغز في ثوانٍ. فك ترتيب الحروف المبعثرة، حل الأناغرام، وفز في Wordle والكلمات المتقاطعة بسرعة ودقة.",
    },
    pt: {
      title: "Solucionadores de Palavras",
      description: "Resolva qualquer enigma em segundos. Desembaralhe letras, resolva anagramas, vença no Wordle e preencha palavras cruzadas.",
    },
    id: {
      title: "Pemecah Kata",
      description: "Pecahkan teka-teki kata dalam hitungan detik. Acak huruf, selesaikan anagram, taklukkan Wordle dan teka-teki silang.",
    },
    ru: {
      title: "Решатели Слов",
      description: "Решайте любые головоломки за секунды. Составляйте слова из букв, разгадывайте анаграммы, Wordle и кроссворды.",
    },
  },
  "letter-tools": {
    en: {
      title: "Letter Tools",
      description: "Precision letter search. Find words by starting or ending letters, match patterns with wildcards, and count letters or characters.",
    },
    hi: {
      title: "अक्षर टूल्स",
      description: "सटीक अक्षर खोज। शुरुआती या अंतिम अक्षरों से शब्द खोजें, वाइल्डकार्ड से पैटर्न मैच करें और अक्षरों की गिनती करें।",
    },
    es: {
      title: "Herramientas de Letras",
      description: "Búsqueda precisa de letras. Encuentra palabras por letras iniciales o finales, coincide patrones con comodines y cuenta caracteres.",
    },
    de: {
      title: "Buchstaben-Tools",
      description: "Präzise Buchstabensuche. Finde Wörter nach Anfangs- oder Endbuchstaben, nutze Platzhalter und zähle Buchstaben und Zeichen.",
    },
    ar: {
      title: "أدوات الحروف",
      description: "بحث دقيق عن الحروف. اعثر على الكلمات حسب بدايتها أو نهايتها، طابق الأنماط بالرموز البديلة وعد الحروف والنصوص.",
    },
    pt: {
      title: "Ferramentas de Letras",
      description: "Busca precisa de letras. Encontre palavras por início ou fim, combine padrões com coringas e conte letras ou caracteres.",
    },
    id: {
      title: "Alat Huruf",
      description: "Pencarian huruf presisi. Temukan kata berdasarkan awalan atau akhiran, cocokkan pola dengan wildcard, dan hitung karakter.",
    },
    ru: {
      title: "Инструменты для Букв",
      description: "Точный поиск по буквам. Ищите слова по начальным или конечным буквам, шаблонам с масками и считайте символы.",
    },
  },
  "writing-tools": {
    en: {
      title: "Writing Tools",
      description: "Sharpen your prose and poetry. Find synonyms, antonyms and rhymes, count syllables, and generate random words for creative inspiration.",
    },
    hi: {
      title: "राइटिंग टूल्स",
      description: "अपनी लेखनी और कविता को निखारें। पर्यायवाची, विलोम और तुकबंदी खोजें, शब्दांश गिनें और रचनात्मक विचारों के लिए शब्द बनाएं।",
    },
    es: {
      title: "Herramientas de Escritura",
      description: "Mejora tu prosa y poesía. Encuentra sinónimos, antónimos y rimas, cuenta sílabas y genera palabras aleatorias.",
    },
    de: {
      title: "Schreibwerkzeuge",
      description: "Perfektioniere Texte und Gedichte. Finde Synonyme, Antonyme und Reime, zähle Silben und generiere Zufallswörter.",
    },
    ar: {
      title: "أدوات الكتابة",
      description: "طور أسلوبك في الكتابة والشعر. اعثر على المرادفات والأضداد والقوافي، عد المقاطع الصوتية وأنشئ كلمات عشوائية ملهمة.",
    },
    pt: {
      title: "Ferramentas de Escrita",
      description: "Aprimore sua prosa e poesia. Encontre sinônimos, antônimos e rimas, conte sílabas e gere palavras aleatórias.",
    },
    id: {
      title: "Alat Menulis",
      description: "Asah tulisan dan puisi Anda. Temukan sinonim, antonim, dan rima, hitung suku kata, dan buat kata acak untuk inspirasi.",
    },
    ru: {
      title: "Инструменты для Писателей",
      description: "Улучшайте прозу и стихи. Находите синонимы, антонимы и рифмы, считайте слоги и генерируйте случайные слова.",
    },
  },
  "game-helpers": {
    en: {
      title: "Game Helpers",
      description: "Win every word game. Specialized helpers for Scrabble, Words With Friends, Boggle, Hangman and Text Twist with score calculation.",
    },
    hi: {
      title: "गेम हेल्पर्स",
      description: "हर वर्ड गेम में जीतें। Scrabble, Words With Friends, Boggle, Hangman और Text Twist के लिए विशेष सहायता और स्कोर गणना।",
    },
    es: {
      title: "Ayudantes de Juegos",
      description: "Gana en cada juego de palabras. Ayudantes especializados para Scrabble, Words With Friends, Boggle, Ahorcado y Text Twist.",
    },
    de: {
      title: "Spielhelfer",
      description: "Gewinne jedes Wortspiel. Spezielle Helfer für Scrabble, Words With Friends, Boggle, Galgenmännchen und Text Twist.",
    },
    ar: {
      title: "مساعدو ألعاب الكلمات",
      description: "فز في كل ألعاب الكلمات. أدوات متخصصة لألعاب سكرابل، بوغل، هانغمان، وتكست تويست مع حساب النقاط بدقة.",
    },
    pt: {
      title: "Ajudantes de Jogos",
      description: "Vença qualquer jogo de palavras. Ferramentas especializadas para Scrabble, Words With Friends, Boggle e Forca com pontuação.",
    },
    id: {
      title: "Pembantu Game Kata",
      description: "Menangkan setiap game kata. Alat bantu khusus untuk Scrabble, Words With Friends, Boggle, Hangman, dan Text Twist.",
    },
    ru: {
      title: "Помощники для Игр",
      description: "Побеждайте в любых играх со словами. Специальные помощники для Эрудита, Scrabble, Boggle, Виселицы и Text Twist.",
    },
  },
  "advanced-solvers": {
    en: {
      title: "Advanced Solvers",
      description: "Deep search and reverse lookup. Search with regex patterns, wildcards and missing letters, or find words by their meaning.",
    },
    hi: {
      title: "उन्नत सॉल्वर्स",
      description: "गहन खोज और रिवर्स लुकअप। रेगेक्स पैटर्न, वाइल्डकार्ड और छूटे हुए अक्षरों से खोजें या अर्थ से सही शब्द ढूंढें।",
    },
    es: {
      title: "Solucionadores Avanzados",
      description: "Búsqueda profunda e inversa. Busca con patrones regex, comodines y letras faltantes, o encuentra palabras por su significado.",
    },
    de: {
      title: "Erweiterte Löser",
      description: "Tiefensuche und Rückwärtssuche. Suche mit Regex-Mustern, Platzhaltern und fehlenden Buchstaben oder nach Wortbedeutung.",
    },
    ar: {
      title: "حلول متقدمة",
      description: "بحث متقدم وبحث عكسي. ابحث بأنماط ريجكس والرموز البديلة والحروف الناقصة، أو اعثر على الكلمة من معناها.",
    },
    pt: {
      title: "Solucionadores Avançados",
      description: "Busca avançada e reversa. Pesquise com padrões regex, coringas e letras ausentes, ou encontre palavras pelo significado.",
    },
    id: {
      title: "Pemecah Lanjutan",
      description: "Pencarian mendalam dan pencarian terbalik. Cari dengan pola regex, wildcard, dan huruf hilang, atau cari kata dari maknanya.",
    },
    ru: {
      title: "Продвинутые Решатели",
      description: "Глубокий и обратный поиск. Поиск по регулярным выражениям, маскам, пропущенным буквам или по смыслу слова.",
    },
  },
  "dictionary-tools": {
    en: {
      title: "Dictionary Tools",
      description: "Comprehensive English dictionary tools. Look up definitions, word origins, phonetic transcriptions and collocations.",
    },
    hi: {
      title: "शब्दकोश टूल्स",
      description: "विस्तृत अंग्रेजी शब्दकोश टूल्स। परिभाषाएं, शब्द उत्पत्ति (व्युत्पत्ति), ध्वन्यात्मक प्रतिलेखन और कोलोकेशन देखें।",
    },
    es: {
      title: "Herramientas de Diccionario",
      description: "Herramientas de diccionario completas. Consulta definiciones, orígenes de palabras, transcripciones fonéticas y colocaciones.",
    },
    de: {
      title: "Wörterbuch-Tools",
      description: "Umfassende Wörterbuch-Tools. Schlage Definitionen, Wortherkunft, phonetische Transkriptionen und Kollokationen nach.",
    },
    ar: {
      title: "أدوات المعاجم",
      description: "معاجم لغوية شاملة. ابحث عن المعاني، أصول الكلمات، النسخ الصوتي، والتعبيرات الاصطلاحية.",
    },
    pt: {
      title: "Ferramentas de Dicionário",
      description: "Ferramentas completas de dicionário. Consulte significados, origens de palavras, transcrições fonéticas e colocações.",
    },
    id: {
      title: "Alat Kamus",
      description: "Alat kamus bahasa lengkap. Cari definisi, asal-usul kata, transkripsi fonetik, dan kolokasi kata.",
    },
    ru: {
      title: "Словарные Инструменты",
      description: "Полные словарные инструменты. Узнавайте значения, происхождение слов, фонетическую транскрипцию и словосочетания.",
    },
  },
  "grammar-tools": {
    en: {
      title: "Grammar & Style Tools",
      description: "Fix grammar mistakes, correct spelling errors, polish punctuation and convert passive sentences to active voice instantly.",
    },
    hi: {
      title: "व्याकरण और शैली टूल्स",
      description: "व्याकरण की गलतियाँ सुधारें, वर्तनी ठीक करें, विराम चिह्न सही करें और पैसिव वाक्यों को एक्टिव वॉइस में बदलें।",
    },
    es: {
      title: "Herramientas de Gramática y Estilo",
      description: "Corrige errores gramaticales y ortográficos, ajusta la puntuación y convierte oraciones pasivas a voz activa al instante.",
    },
    de: {
      title: "Grammatik- & Stil-Tools",
      description: "Korrigiere Grammatik- und Rechtschreibfehler, optimiere Zeichensetzung und wandle Passivsätze in Aktiv um.",
    },
    ar: {
      title: "أدوات القواعد والأسلوب",
      description: "صحح الأخطاء النحوية والإملائية، اضبط علامات الترقيم، وحول الجمل من المبني للمجهول إلى المبني للمعلوم فوراً.",
    },
    pt: {
      title: "Ferramentas de Gramática e Estilo",
      description: "Corrija erros gramaticais e ortográficos, ajuste pontuação e converta voz passiva para voz ativa instantaneamente.",
    },
    id: {
      title: "Alat Tata Bahasa & Gaya",
      description: "Perbaiki kesalahan tata bahasa, ejaan, tanda baca, dan ubah kalimat pasif menjadi kalimat aktif secara instan.",
    },
    ru: {
      title: "Грамматика и Стиль",
      description: "Исправляйте грамматические и орфографические ошибки, пунктуацию и преобразуйте пассивный залог в активный.",
    },
  },
  "puzzle-solvers": {
    en: {
      title: "Puzzle Game Solvers",
      description: "Cheats and solutions for popular mobile word games: Word Cookies, Wordscapes, CodyCross, 7 Little Words and Wheel of Fortune.",
    },
    hi: {
      title: "पहेली गेम सॉल्वर्स",
      description: "लोकप्रिय मोबाइल वर्ड गेम्स के समाधान: Word Cookies, Wordscapes, CodyCross, 7 Little Words और Wheel of Fortune।",
    },
    es: {
      title: "Solucionadores de Juegos de Puzle",
      description: "Soluciones y trucos para juegos móviles de palabras: Word Cookies, Wordscapes, CodyCross, 7 Little Words y La Ruleta.",
    },
    de: {
      title: "Puzzlespiel-Löser",
      description: "Lösungen und Hilfen für beliebte Wortspiele: Word Cookies, Wordscapes, CodyCross, 7 Little Words und Glücksrad.",
    },
    ar: {
      title: "حلول ألعاب الألغاز",
      description: "حلول ومساعدات لأشهر ألعاب الكلمات: وورد كوكيز، وورد سكيبس، كودي كروس، 7 كلمات صغيرة وعجلة الحظ.",
    },
    pt: {
      title: "Solucionadores de Jogos de Quebra-Cabeça",
      description: "Respostas e dicas para jogos de palavras para celular: Word Cookies, Wordscapes, CodyCross, 7 Little Words e Roda a Roda.",
    },
    id: {
      title: "Pemecah Game Teka-Teki",
      description: "Solusi dan kunci jawaban game kata seluler populer: Word Cookies, Wordscapes, CodyCross, 7 Little Words, dan Wheel of Fortune.",
    },
    ru: {
      title: "Решатели Головоломок",
      description: "Ответы и подсказки для популярных мобильных игр со словами: Word Cookies, Wordscapes, CodyCross, 7 Little Words и Поле Чудес.",
    },
  },
  "random-generators": {
    en: {
      title: "Random Generators",
      description: "Generate random letters, words, sentences, paragraphs, verbs and creative writing prompts at the click of a button.",
    },
    hi: {
      title: "रैंडम जनरेटर्स",
      description: "एक क्लिक में रैंडम अक्षर, शब्द, वाक्य, पैराग्राफ, क्रियाएं और रचनात्मक लेखन प्रॉम्प्ट उत्पन्न करें।",
    },
    es: {
      title: "Generadores Aleatorios",
      description: "Genera letras, palabras, oraciones, párrafos, verbos e ideas de escritura creativa al azar con un solo clic.",
    },
    de: {
      title: "Zufallsgeneratoren",
      description: "Generiere zufällige Buchstaben, Wörter, Sätze, Absätze, Verben und Schreibideen mit einem Klick.",
    },
    ar: {
      title: "المولدات العشوائية",
      description: "أنشئ حروفاً، كلمات، جملاً، فقرات، أفعالاً، وأفكاراً إبداعية للكتابة بنقرة زر واحدة.",
    },
    pt: {
      title: "Geradores Aleatórios",
      description: "Gere letras, palavras, frases, parágrafos, verbos e temas criativos aleatórios com um único clique.",
    },
    id: {
      title: "Generator Acak",
      description: "Hasilkan huruf, kata, kalimat, paragraf, kata kerja, dan ide penulisan kreatif secara acak dengan satu klik.",
    },
    ru: {
      title: "Генераторы Случайных Данных",
      description: "Генерируйте случайные буквы, слова, предложения, абзацы, глаголы и темы для творчества в один клик.",
    },
  },
  "name-generators": {
    en: {
      title: "Name Generators",
      description: "Find creative names for dogs, cats, sports teams, gaming guilds, fantasy clans, characters, demons, witches and sci-fi robots.",
    },
    hi: {
      title: "नेम जनरेटर्स",
      description: "कुत्तों, बिल्लियों, टीमों, गेमिंग गिल्ड, फंतासी कबीलों, पात्रों, दानवों, चुड़ैलों और रोबोटों के लिए रचनात्मक नाम खोजें।",
    },
    es: {
      title: "Generadores de Nombres",
      description: "Encuentra nombres creativos para perros, gatos, equipos, clanes de videojuegos, personajes de fantasía y robots.",
    },
    de: {
      title: "Namensgeneratoren",
      description: "Finde kreative Namen für Hunde, Katzen, Teams, Gaming-Gilden, Fantasy-Clans, Charaktere, Dämonen und Roboter.",
    },
    ar: {
      title: "مولدات الأسماء",
      description: "اعثر على أسماء مميزة للحيوانات الأليفة، الفرق الرياضية، تحالفات الألعاب، الشخصيات الخيالية والروبوتات.",
    },
    pt: {
      title: "Geradores de Nomes",
      description: "Encontre nomes criativos para cães, gatos, equipes, guildas de jogos, clãs de fantasia, personagens e robôs.",
    },
    id: {
      title: "Generator Nama",
      description: "Temukan nama kreatif untuk anjing, kucing, tim, guild game, klan fantasi, karakter, dan robot sci-fi.",
    },
    ru: {
      title: "Генераторы Имен",
      description: "Генерируйте креативные имена для собак, кошек, команд, игровых гильдий, фэнтези-персонажей и роботов.",
    },
  },
  "word-quizzes": {
    en: {
      title: "Word Quizzes & Learning",
      description: "Test and expand your English skills with interactive vocabulary quizzes, daily words, spelling challenges, synonym and prefix tests.",
    },
    hi: {
      title: "वर्ड क्विज और लर्निंग",
      description: "इंटरैक्टिव शब्दावली क्विज़, आज का शब्द, स्पेलिंग टेस्ट, पर्यायवाची और उपसर्ग परीक्षणों के साथ अपनी अंग्रेजी निखारें।",
    },
    es: {
      title: "Cuestionarios y Aprendizaje",
      description: "Pon a prueba tu vocabulario en inglés con cuestionarios interactivos, palabra del día, retos de ortografía y prefijos.",
    },
    de: {
      title: "Wort-Quiz & Lernen",
      description: "Teste deine Englischkenntnisse mit Vokabel-Quizzen, Wort des Tages, Rechtschreib- und Synonym-Tests.",
    },
    ar: {
      title: "اختبارات الكلمات والتعلم",
      description: "اختبر وطور مهاراتك الإنجليزية باختبارات المفردات التفاعلية، كلمة اليوم، تحديات الإملاء والمرادفات.",
    },
    pt: {
      title: "Quizzes de Palavras e Aprendizado",
      description: "Teste seu vocabulário em inglês com quizzes interativos, palavra do dia, testes de ortografia e sinônimos.",
    },
    id: {
      title: "Kuis Kata & Pembelajaran",
      description: "Uji dan tingkatkan kemampuan bahasa Inggris Anda dengan kuis kosakata interaktif, kata harian, dan tes ejaan.",
    },
    ru: {
      title: "Тесты и Обучение",
      description: "Проверяйте и расширяйте словарный запас с помощью интерактивных тестов, слова дня и викторин по правописанию.",
    },
  },
  "ai-tools": {
    en: {
      title: "AI Tools",
      description: "Powered by Gemini & DeepSeek AI. Explain words, generate sentences and examples, write stories and poems, and build custom quizzes.",
    },
    hi: {
      title: "एआई टूल्स",
      description: "AI की शक्ति से शब्दों को समझें, उदाहरण वाक्य बनाएं, कहानियां और कविताएं लिखें, और कस्टम क्विज व फ्लैशकार्ड बनाएं।",
    },
    es: {
      title: "Herramientas de IA",
      description: "Potenciado por IA. Explica palabras, genera oraciones y ejemplos, escribe historias y poemas, y crea cuestionarios personalizados.",
    },
    de: {
      title: "KI-Werkzeuge",
      description: "Mit KI-Power: Wörter erklären, Beispielsätze generieren, Geschichten und Gedichte schreiben und Lernkarten erstellen.",
    },
    ar: {
      title: "أدوات الذكاء الاصطناعي",
      description: "مدعومة بالذكاء الاصطناعي. اشرح الكلمات، أنشئ جملاً وأمثلة، اكتب قصصاً وقصائد، وأنشئ اختبارات وبطاقات تعليمية مخصصة.",
    },
    pt: {
      title: "Ferramentas de IA",
      description: "Com tecnologia de IA. Explique palavras, crie frases e exemplos, escreva histórias e poemas e crie quizzes de estudo.",
    },
    id: {
      title: "Alat AI",
      description: "Didukung oleh AI. Jelaskan kata, buat contoh kalimat, tulis cerita dan puisi, serta buat kuis dan kartu belajar kustom.",
    },
    ru: {
      title: "Инструменты ИИ",
      description: "На базе ИИ. Объясняйте слова, создавайте примеры предложений, пишите рассказы и стихи, генерируйте тесты и карточки.",
    },
  },
  "literary-tools": {
    en: {
      title: "Literary & Phonics Tools",
      description: "Explore poetic devices and phonics: alliteration, assonance, tongue twisters, CVC words, sight words and word ladders.",
    },
    hi: {
      title: "साहित्यिक और फोनिक्स टूल्स",
      description: "काव्य शैलियों और ध्वन्यात्मकता की खोज करें: अनुप्रास, स्वर साम्य, टंग ट्विस्टर, CVC शब्द, साइट वर्ड्स और वर्ड लैडर।",
    },
    es: {
      title: "Herramientas Literarias y Fonética",
      description: "Explora recursos poéticos y fonética: aliteraciones, asonancias, trabalenguas, palabras CVC y escaleras de palabras.",
    },
    de: {
      title: "Literatur- & Phonik-Tools",
      description: "Poetische Stilmittel und Phonik entdecken: Alliterationen, Assonanzen, Zungenbrecher, CVC-Wörter und Wortleitern.",
    },
    ar: {
      title: "أدوات الأدب والصوتيات",
      description: "استكشف الأساليب البلاغية والصوتيات: الجناس، السجع، التواءات اللسان، كلمات CVC وسلالم الكلمات.",
    },
    pt: {
      title: "Ferramentas Literárias e Fonética",
      description: "Recursos poéticos e fonética: aliterações, assonâncias, trava-línguas, palavras CVC e escadas de palavras.",
    },
    id: {
      title: "Alat Sastra & Fonik",
      description: "Jelajahi perangkat puitis dan fonik: aliterasi, asonansi, pembelit lidah, kata CVC, dan tangga kata.",
    },
    ru: {
      title: "Литературные и Фонетические Инструменты",
      description: "Поэтические приемы и фонетика: аллитерация, ассонанс, скороговорки, простые слова и словесные лестницы.",
    },
  },
};

export function getLocalizedCategory(
  category: { slug: string; title: string; description: string },
  locale: string = DEFAULT_LOCALE,
): LocalizedCategoryInfo {
  if (locale === DEFAULT_LOCALE) {
    return { title: category.title, description: category.description };
  }
  const match = CATEGORY_TRANSLATIONS[category.slug]?.[locale.toLowerCase()];
  if (match) return match;
  return { title: category.title, description: category.description };
}
