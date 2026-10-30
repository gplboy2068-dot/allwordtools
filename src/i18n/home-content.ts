/**
 * Homepage long-form content translations (benefits, complete guide, FAQs)
 * for non-English locales. English remains in src/data/* and components.
 * Proper nouns and game names (Scrabble, Wordle, Words With Friends,
 * Boggle, Hangman, Text Twist, AllWordTools) stay in English by design.
 */
export interface HomeLocaleContent {
  benefits: { title: string; description: string }[];
  guideEyebrow: string;
  guideTitle: string;
  guideSections: { heading: string; paragraphs: string[] }[];
  faqEyebrow: string;
  faqTitle: string;
  faqDescription: string;
  faqs: { question: string; answer: string }[];
}

export const HOME_CONTENT: Record<string, HomeLocaleContent> = {
  es: {
    benefits: [
      { title: "Resultados instantáneos", description: "Las respuestas aparecen en el momento en que pulsas buscar, sin esperas ni recargas." },
      { title: "Aprende mientras juegas", description: "Las definiciones, las puntuaciones y las palabras relacionadas te ayudan a ampliar tu vocabulario de forma natural." },
      { title: "Diccionarios precisos", description: "Listas de palabras amplias y bien mantenidas, adaptadas a cada juego que juegas." },
      { title: "Pensado para móviles", description: "Una experiencia rápida y adaptable en teléfonos, tabletas y ordenadores por igual." },
      { title: "Siempre gratis", description: "Todas las herramientas son 100 % gratuitas, sin registro y sin límites." },
      { title: "En constante crecimiento", description: "Nuevos solucionadores y herramientas de idioma añadidos con regularidad." },
    ],
    guideEyebrow: "La guía completa",
    guideTitle: "Todo lo que necesitas saber sobre las herramientas de palabras",
    guideSections: [
      {
        heading: "¿Qué son las herramientas de palabras?",
        paragraphs: [
          "Las herramientas de palabras son utilidades en línea diseñadas para ayudarte a jugar a juegos de palabras, resolver crucigramas y mejorar tu dominio del inglés. En esencia, toman las letras, patrones o pistas que ya tienes y buscan en diccionarios enormes y cuidadosamente mantenidos para revelar todas las palabras posibles que encajan. Con un solo clic puedes ordenar un conjunto desordenado de letras, encontrar todos los anagramas, descubrir palabras que empiezan o terminan con una cadena concreta o reducir la respuesta del Wordle de hoy.",
          "Lo que hace tan potentes a las herramientas modernas es la velocidad y la amplitud. En lugar de hojear un diccionario de papel o adivinar, obtienes una lista completa y ordenada de palabras válidas en una fracción de segundo. Los resultados suelen organizarse por longitud y puntuación, para que las jugadas más útiles aparezcan arriba. Seas un jugador ocasional, un entusiasta competitivo de Scrabble, un aficionado a los crucigramas, un escritor, un profesor o un estudiante de idiomas, aquí hay una herramienta creada exactamente para lo que necesitas.",
          "Nuestra plataforma reúne 92 de estas herramientas en 13 categorías muy bien organizadas. Desde solucionadores de palabras y herramientas de letras hasta ayudas para escribir y asistentes específicos para juegos, cada utilidad comparte la misma experiencia rápida, amable y accesible, sin descargas, sin registros y sin desorden.",
        ],
      },
      {
        heading: "Los beneficios de usar herramientas de palabras",
        paragraphs: [
          "El beneficio más evidente es ganar más partidas. Cuando puedes ver al instante la jugada con más puntos de tu atril de Scrabble o los últimos candidatos en Wordle, pasas menos tiempo bloqueado y más tiempo disfrutando del juego. Pero las ventajas van mucho más allá de una sola partida.",
          "Las herramientas de palabras son excelentes ayudas para aprender. Cada vez que ordenas letras o exploras sinónimos, descubres palabras nuevas, refuerzas la ortografía y entiendes qué combinaciones de letras son válidas en inglés. Estudiantes que se preparan para exámenes, escritores que buscan la palabra perfecta y alumnos que ganan fluidez las usan para ampliar su vocabulario de una forma sencilla e incluso divertida.",
          "También son ideales para resolver disputas amistosas. ¿Eso es realmente una palabra? ¿Rima? ¿Cuántas sílabas tiene? En lugar de discutir, obtienes una respuesta instantánea y verificable generada a partir de listas de palabras seleccionadas. Y como todo es gratis y funciona en cualquier dispositivo, la ayuda está siempre a un toque, estés en el sofá, en el tren o en tu escritorio.",
        ],
      },
      {
        heading: "Cómo funcionan las herramientas de palabras",
        paragraphs: [
          "Detrás de cada herramienta hay un diccionario amplio y seleccionado y un motor de búsqueda rápido. Cuando escribes tus letras o tu patrón, la herramienta compara tu entrada con toda la lista de palabras aplicando las reglas del juego o la búsqueda que hayas elegido. Para un descifrador de palabras, eso significa encontrar todas las combinaciones de tus letras que forman una palabra válida. Para una búsqueda por patrón, significa hacer coincidir tus letras conocidas y comodines con palabras de la forma adecuada.",
          "Cada juego acepta palabras diferentes, por eso es importante elegir el diccionario correcto. Scrabble y Words With Friends usan sus propias listas de palabras y valores de letras, mientras que Wordle se centra en respuestas válidas de cinco letras. Nuestras herramientas te permiten elegir el modo adecuado para que los resultados reflejen siempre el juego al que estás jugando.",
          "Una vez encontradas las coincidencias, los resultados se puntúan y se ordenan. Los asistentes de juegos ordenan las jugadas por puntos; las herramientas de letras ordenan por longitud u orden alfabético; las herramientas de escritura agrupan los resultados por significado, sonido o número de sílabas. El trabajo pesado se hace al instante y en privado en tu navegador, por eso las respuestas aparecen en cuanto pulsas buscar.",
        ],
      },
      {
        heading: "Qué juegos y rompecabezas son compatibles",
        paragraphs: [
          "Admitimos los juegos de palabras más queridos. Los jugadores de Scrabble pueden encontrar las jugadas con más puntos usando listas de palabras de estilo torneo y valores precisos de fichas. Los fans de Words With Friends obtienen jugadas ajustadas a los valores de fichas y la lista de palabras únicos de ese juego. Los solucionadores de Wordle reducen la respuesta diaria usando tus pistas verdes, amarillas y grises, mientras que los solucionadores de crucigramas rellenan las casillas que faltan a partir de la longitud de la pista y las letras que ya conoces.",
          "Los amantes de los rompecabezas también están cubiertos. Nuestro solucionador de anagramas y descifrador de palabras resuelven rápidamente los revoltijos de los periódicos y los juegos de letras de las aplicaciones. Los solucionadores de Boggle y Text Twist extraen cada palabra oculta de una cuadrícula o un revoltijo, y el asistente de Hangman sugiere las letras más inteligentes para adivinar a continuación, para que rara vez te quedes sin intentos.",
          "Como la plataforma crece constantemente, la lista de juegos y rompecabezas compatibles sigue ampliándose. Si hay un juego de palabras popular que te gusta, es muy probable que ya tengamos un asistente dedicado para él, y si no, probablemente esté en camino.",
        ],
      },
      {
        heading: "Por qué usar nuestras herramientas de palabras",
        paragraphs: [
          "Hay muchas herramientas de palabras en línea, pero pocas combinan precisión, velocidad y una experiencia realmente agradable como las nuestras. Nuestros diccionarios son amplios y están bien mantenidos, nuestra búsqueda es precisa y nuestra interfaz está diseñada para llevarte a la respuesta con el menor número de toques posible. No hay menús confusos, interrupciones molestas ni páginas lentas entre tú y la palabra que necesitas.",
          "Todo está pensado primero para móviles y es rapidísimo, así que las herramientas se sienten igual de bien en tu teléfono que en un ordenador. El diseño es moderno y legible, con modo claro y oscuro para que juegues cómodamente a cualquier hora del día. Y como cada herramienta es gratis y no requiere cuenta, puedes empezar directamente.",
          "También nos importa ayudarte a aprender, no solo a ganar. Junto a las respuestas, nuestras herramientas muestran contexto útil —definiciones, puntuaciones, sílabas y palabras relacionadas— para que cada búsqueda te deje un poco más fluido que antes.",
        ],
      },
      {
        heading: "Consejos de juego y estrategias prácticas",
        paragraphs: [
          "Así se desarrolla una búsqueda típica. Supón que tu atril de Scrabble tiene R, A, T, I, O, N y S. Pon esas siete letras en el descifrador de palabras, elige el diccionario de Scrabble y verás al instante jugadas de gran valor, incluido el bingo de siete letras que da un bonus de cincuenta puntos. ¿Atascado con una pista de crucigrama de cinco letras con una T en la tercera casilla? Introduce el patrón ??T?? y el solucionador devolverá todas las palabras que coinciden.",
          "Unos pocos consejos prácticos marcan una gran diferencia. Aprende primero las palabras cortas de dos y tres letras; son el arma secreta de los mejores jugadores de Scrabble para conectar jugadas y sacar puntos en tableros apretados. Vigila las fichas de alto valor como Q, Z, X y J, y recuerda el puñado de palabras con Q sin U que pueden salvar un atril bloqueado. En Wordle, empieza con una palabra rica en vocales y consonantes comunes para eliminar el mayor número de posibilidades antes de decidirte.",
          "Para los escritores, usa las herramientas de sinónimos y antónimos para variar tu lenguaje y evitar repeticiones, y apóyate en las herramientas de rima y sílabas para que la poesía y las letras fluyan. Pequeños hábitos como estos, repetidos con el tiempo, convierten el juego ocasional en una habilidad real y te hacen un usuario del inglés más seguro y preciso.",
        ],
      },
    ],
    faqEyebrow: "Preguntas y respuestas",
    faqTitle: "Preguntas frecuentes",
    faqDescription: "Todo lo que podrías querer saber sobre el uso de AllWordTools.",
    faqs: [
      { question: "¿Qué son las herramientas de palabras y cómo funcionan?", answer: "Las herramientas de palabras son utilidades en línea inteligentes que analizan letras, patrones y diccionarios para ayudarte a jugar a juegos de palabras, ampliar tu vocabulario y escribir mejor. Escribes las letras que tienes o el patrón que buscas y la herramienta busca al instante en una lista de palabras amplia y seleccionada para devolverte todas las coincidencias válidas, normalmente ordenadas por longitud, puntos o relevancia. Todo funciona en tu navegador en una fracción de segundo, así que no hay nada que instalar ni que esperar." },
      { question: "¿Qué juegos de palabras admiten estas herramientas?", answer: "Nuestros asistentes están optimizados para los juegos de palabras más populares del mundo, incluidos Scrabble, Words With Friends, Wordle, crucigramas, Boggle, Hangman, Text Twist y numerosos rompecabezas de anagramas y revoltijos de periódicos y aplicaciones. Cada juego usa su propio diccionario y sus propias reglas de puntuación, por eso adaptamos los resultados: Scrabble usa listas de palabras de estilo torneo, mientras que Wordle se centra en respuestas válidas de cinco letras." },
      { question: "¿Usar un descifrador de palabras se considera hacer trampa?", answer: "Es mejor pensar en las herramientas de palabras como ayudas para aprender y practicar que como una forma de hacer trampa. Millones de jugadores las usan para estudiar palabras nuevas, entender por qué una jugada es válida, mejorar su estrategia y resolver disputas amistosas. En partidas informales entre amigos, o cuando practicas en solitario, son una forma fantástica de mejorar. Usarlas o no en un entorno competitivo es siempre tu decisión y depende de las reglas que hayas acordado con los demás jugadores." },
      { question: "¿Las herramientas de palabras son gratuitas?", answer: "Sí. Todas las herramientas de la plataforma son completamente gratuitas y no requieren registro. Puedes descifrar palabras, resolver anagramas, encontrar rimas y mucho más tantas veces como quieras. Mantenemos la experiencia rápida y ligera para que obtengas respuestas al instante en cualquier dispositivo." },
      { question: "¿Qué tan precisos son los resultados?", answer: "Usamos diccionarios amplios y mantenidos regularmente basados en listas de palabras reconocidas, por lo que los resultados son muy precisos para el juego que elijas. Como cada juego acepta palabras diferentes, te permitimos elegir el diccionario adecuado para Scrabble, Words With Friends e inglés general. Si alguna vez ves una palabra que parece fuera de lugar, recuerda que los diccionarios de los juegos a veces incluyen palabras poco comunes pero oficialmente válidas." },
      { question: "¿Puedo buscar palabras por longitud?", answer: "Por supuesto. Muchas herramientas te permiten filtrar por longitud exacta, por ejemplo solo palabras de cinco letras para Wordle, o palabras de siete letras para buscar un bingo en Scrabble. Puedes combinar filtros de longitud con letras iniciales, letras finales y letras contenidas para dar exactamente con las palabras que necesitas." },
      { question: "¿Cuál es la diferencia entre un solucionador de anagramas y un descifrador de palabras?", answer: "Un descifrador de palabras encuentra todas las palabras válidas que puedes formar con un conjunto de letras, incluidas palabras más cortas que usan solo algunas de ellas. Un solucionador de anagramas se centra en reordenamientos que usan todas las letras para formar una palabra o frase nueva. En la práctica ambos se solapan mucho, y nuestras herramientas muestran resultados parciales y de longitud completa para que nunca pierdas una jugada." },
      { question: "¿Cómo uso comodines o fichas en blanco?", answer: "Cuando tienes una ficha en blanco en Scrabble o Words With Friends, o simplemente no conoces una letra, puedes usar un comodín —normalmente un signo de interrogación o un asterisco— para representar cualquier letra. Nuestros solucionadores expanden cada comodín por todo el alfabeto y devuelven todas las palabras que encajan, mostrando claramente qué letras rellenaron los huecos." },
      { question: "¿Estas herramientas pueden ayudarme a mejorar mi vocabulario?", answer: "Definitivamente. Más allá de ganar partidas, las herramientas de palabras son un potente constructor de vocabulario. Descubrir palabras nuevas, ver sus definiciones, explorar sinónimos y antónimos y aprender qué combinaciones de letras son válidas refuerza tus habilidades lingüísticas. Muchos estudiantes, escritores, profesores y estudiantes de idiomas las usan a diario para estudiar ortografía y ampliar su vocabulario." },
      { question: "¿Las herramientas funcionan en teléfonos móviles y tabletas?", answer: "Sí. Toda la plataforma está construida pensando primero en móviles y es totalmente adaptable, así que cada herramienta funciona de maravilla en teléfonos, tabletas, portátiles y ordenadores. El diseño se adapta a tu pantalla, los botones siguen siendo fáciles de tocar y los resultados cargan rápido incluso con conexiones más lentas." },
      { question: "¿Cómo funciona el solucionador de Wordle?", answer: "El solucionador de Wordle reduce las posibles respuestas según las pistas que ya tienes. Introduces las letras que sabes que son correctas y están en la posición adecuada, las letras que están presentes pero mal colocadas y las letras que has descartado. La herramienta filtra entonces la lista de palabras de cinco letras para revelar los candidatos restantes y sugiere siguientes intentos sólidos que eliminan el mayor número de posibilidades." },
      { question: "¿Puedo encontrar palabras que rimen para canciones y poesía?", answer: "Sí. Nuestra herramienta de palabras que riman encuentra rimas perfectas, rimas cercanas y palabras con sonidos similares, ideal para componer canciones, poesía, letras de rap y tarjetas de felicitación. Puedes explorar los resultados por número de sílabas y patrón de acento para que tus versos fluyan con naturalidad." },
      { question: "¿Para qué sirve un contador de sílabas?", answer: "Un contador de sílabas te dice cuántas sílabas tiene una palabra o un pasaje completo de texto. Es invaluable para escribir haikus y otra poesía estructurada, comprobar la legibilidad, enseñar fonética y ajustar letras a una melodía. Simplemente pega tu texto y el contador desglosa cada palabra al instante." },
      { question: "¿Cómo se calcula la palabra de Scrabble con más puntos?", answer: "Nuestro asistente de Scrabble asigna a cada letra su valor oficial en puntos y luego suma las fichas de cada palabra válida que puedes formar con tu atril. Los resultados se ordenan de mayor a menor puntuación para que veas la mejor jugada de un vistazo. Dónde coloques la palabra en el tablero —aprovechando casillas dobles y triples— puede aumentar aún más la puntuación." },
      { question: "¿Añadiréis más herramientas de palabras?", answer: "Sí, constantemente. Estamos construyendo la colección más completa de herramientas de palabras en inglés que existe, y se añaden nuevos solucionadores, generadores y asistentes de idioma con regularidad. Marca el sitio como favorito y consulta la sección de herramientas más recientes en la página principal para ver lo que acaba de lanzarse." },
    ],
  },
  hi: {
    benefits: [
      { title: "तुरंत परिणाम", description: "जैसे ही आप खोज दबाते हैं, उत्तर तुरंत दिखाई देते हैं — कोई प्रतीक्षा नहीं, कोई पुनः लोड नहीं।" },
      { title: "खेलते-खेलते सीखें", description: "परिभाषाएँ, अंक और संबंधित शब्द आपकी शब्दावली को स्वाभाविक रूप से बढ़ाने में मदद करते हैं।" },
      { title: "सटीक शब्दकोश", description: "हर खेल के लिए तैयार की गई बड़ी, अच्छी तरह रखरखाव की गई शब्द सूचियाँ।" },
      { title: "मोबाइल के लिए पहले", description: "फ़ोन, टैबलेट और डेस्कटॉप पर एक तेज़, उत्तरदायी अनुभव।" },
      { title: "हमेशा मुफ़्त", description: "हर टूल 100% मुफ़्त है, बिना साइन-अप और बिना किसी सीमा के।" },
      { title: "लगातार बढ़ता हुआ", description: "नियमित रूप से नए सॉल्वर और भाषा टूल जोड़े जाते हैं।" },
    ],
    guideEyebrow: "संपूर्ण मार्गदर्शिका",
    guideTitle: "शब्द टूल के बारे में आपको जो कुछ भी जानना चाहिए",
    guideSections: [
      {
        heading: "शब्द टूल क्या हैं?",
        paragraphs: [
          "शब्द टूल ऑनलाइन उपयोगिताएँ हैं जो आपको शब्द खेल खेलने, पहेलियाँ हल करने और अंग्रेज़ी भाषा पर अपनी पकड़ बेहतर बनाने में मदद करती हैं। इनके मूल में, ये आपके पास मौजूद अक्षरों, पैटर्न या संकेतों को लेकर विशाल, सावधानीपूर्वक रखरखाव किए गए शब्दकोशों में खोजते हैं और हर संभव शब्द बताते हैं जो फिट बैठता है। एक ही क्लिक में आप बिखरे अक्षरों को सुलझा सकते हैं, हर एनाग्राम खोज सकते हैं, किसी विशेष अक्षर-समूह से शुरू या खत्म होने वाले शब्द खोज सकते हैं, या आज के Wordle का उत्तर सीमित कर सकते हैं।",
          "आधुनिक शब्द टूल को इतना शक्तिशाली बनाने वाली बात है गति और व्यापकता। कागज़ के शब्दकोश के पन्ने पलटने या अनुमान लगाने के बजाय, आपको एक सेकंड के अंश में वैध शब्दों की पूरी, क्रमबद्ध सूची मिलती है। परिणाम आमतौर पर लंबाई और अंक के अनुसार व्यवस्थित होते हैं, ताकि सबसे उपयोगी चालें सीधे ऊपर आ जाएँ। चाहे आप साधारण खिलाड़ी हों, प्रतिस्पर्धी Scrabble प्रेमी हों, क्रॉसवर्ड के शौकीन हों, लेखक हों, शिक्षक हों या भाषा सीखने वाले हों, यहाँ ठीक आपकी ज़रूरत के लिए बना टूल है।",
          "हमारा प्लेटफ़ॉर्म इनमें से 92 टूल को 13 सुंदर ढंग से व्यवस्थित श्रेणियों में एक साथ लाता है। शब्द सॉल्वर और अक्षर टूल से लेकर लेखन सहायक और समर्पित खेल सहायकों तक, हर उपयोगिता एक ही तेज़, मित्रवत और सुलभ अनुभव साझा करती है — कोई डाउनलोड नहीं, कोई साइन-अप नहीं और कोई अव्यवस्था नहीं।",
        ],
      },
      {
        heading: "शब्द टूल उपयोग करने के लाभ",
        paragraphs: [
          "सबसे स्पष्ट लाभ है अधिक खेल जीतना। जब आप अपने Scrabble रैक से सबसे अधिक अंक वाली चाल या Wordle में बचे कुछ उम्मीदवार तुरंत देख सकते हैं, तो आप अटके रहने में कम समय और खेल का आनंद लेने में अधिक समय बिताते हैं। लेकिन लाभ एक ही मैच से कहीं आगे जाते हैं।",
          "शब्द टूल उत्कृष्ट सीखने के सहायक हैं। हर बार जब आप अक्षरों को सुलझाते हैं या समानार्थी शब्द खोजते हैं, तो आप नए शब्दों से परिचित होते हैं, वर्तनी मज़बूत करते हैं और समझते हैं कि अंग्रेज़ी में कौन से अक्षर संयोजन वैध हैं। परीक्षा की तैयारी करने वाले छात्र, सही शब्द खोजने वाले लेखक और धाराप्रवाह बनने वाले शिक्षार्थी इनका उपयोग अपनी शब्दावली बढ़ाने के लिए करते हैं, वह भी सहज और मज़ेदार तरीके से।",
          "ये मित्रवत विवाद सुलझाने के लिए भी बेहतरीन हैं। क्या यह सच में एक शब्द है? क्या यह तुक मिलाता है? इसमें कितने अक्षर-खंड (सिलेबल) हैं? बहस करने के बजाय, आपको चुनी हुई शब्द सूचियों से बना तुरंत, सत्यापित उत्तर मिलता है। और क्योंकि सब कुछ मुफ़्त है और किसी भी डिवाइस पर काम करता है, मदद हमेशा एक टैप दूर है — चाहे आप सोफ़े पर हों, ट्रेन में हों या अपने डेस्क पर।",
        ],
      },
      {
        heading: "शब्द टूल कैसे काम करते हैं",
        paragraphs: [
          "हर टूल के पीछे एक बड़ा, चुना हुआ शब्दकोश और एक तेज़ मिलान इंजन है। जब आप अपने अक्षर या पैटर्न लिखते हैं, तो टूल आपके इनपुट की तुलना पूरी शब्द सूची से करता है और आपके चुने खेल या खोज के नियम लागू करता है। शब्द अनस्क्रैम्बलर के लिए इसका अर्थ है आपके अक्षरों के हर संयोजन को खोजना जो वैध शब्द बनाता हो। पैटर्न खोज के लिए इसका अर्थ है आपके ज्ञात अक्षरों और वाइल्डकार्ड को सही आकार के शब्दों से मिलाना।",
          "अलग-अलग खेल अलग-अलग शब्द स्वीकार करते हैं, इसलिए सही शब्दकोश चुनना महत्वपूर्ण है। Scrabble और Words With Friends अपनी अलग शब्द सूचियाँ और अक्षर मूल्य उपयोग करते हैं, जबकि Wordle वैध पाँच-अक्षर उत्तरों पर केंद्रित है। हमारे टूल आपको सही मोड चुनने देते हैं ताकि परिणाम हमेशा उसी खेल को दर्शाएँ जो आप सच में खेल रहे हैं।",
          "मिलान मिलने के बाद परिणामों को अंक दिए जाते हैं और क्रमबद्ध किया जाता है। खेल सहायक चालों को अंकों के अनुसार रखते हैं; अक्षर टूल लंबाई या वर्णमाला क्रम से क्रमबद्ध करते हैं; लेखन टूल परिणामों को अर्थ, ध्वनि या सिलेबल संख्या के अनुसार समूहित करते हैं। भारी काम आपके ब्राउज़र में तुरंत और निजी रूप से होता है, इसीलिए खोज दबाते ही उत्तर दिखाई देते हैं।",
        ],
      },
      {
        heading: "कौन से खेल और पहेलियाँ समर्थित हैं",
        paragraphs: [
          "हम उन शब्द खेलों का समर्थन करते हैं जिन्हें लोग सबसे अधिक पसंद करते हैं। Scrabble खिलाड़ी टूर्नामेंट-शैली की शब्द सूचियों और सटीक टाइल मूल्यों का उपयोग करके सबसे अधिक अंक वाली चालें खोज सकते हैं। Words With Friends के प्रशंसकों को उस खेल के अनूठे टाइल मूल्यों और शब्द सूची के अनुसार चालें मिलती हैं। Wordle सॉल्वर आपके हरे, पीले और धूसर संकेतों का उपयोग करके दैनिक उत्तर सीमित करते हैं, जबकि क्रॉसवर्ड सॉल्वर संकेत की लंबाई और आपके ज्ञात अक्षरों से खाली वर्ग भरते हैं।",
          "पहेली प्रेमी भी शामिल हैं। हमारा एनाग्राम सॉल्वर और शब्द अनस्क्रैम्बलर अख़बारों के बिखरे शब्दों और ऐप-आधारित अक्षर खेलों को झटपट हल कर देते हैं। Boggle और Text Twist सॉल्वर ग्रिड या स्क्रैम्बल से हर छिपा शब्द निकालते हैं, और Hangman सहायक अगले अनुमान के लिए सबसे समझदार अक्षर सुझाता है ताकि आपके प्रयास शायद ही कभी खत्म हों।",
          "क्योंकि प्लेटफ़ॉर्म हमेशा बढ़ रहा है, समर्थित खेलों और पहेलियों की सूची बढ़ती रहती है। यदि कोई लोकप्रिय शब्द खेल है जिसका आप आनंद लेते हैं, तो बहुत संभावना है कि हमारे पास उसके लिए पहले से समर्पित सहायक है — और यदि नहीं, तो वह संभवतः आने वाला है।",
        ],
      },
      {
        heading: "हमारे शब्द टूल क्यों उपयोग करें",
        paragraphs: [
          "ऑनलाइन कई शब्द टूल हैं, लेकिन कुछ ही सटीकता, गति और सच में सुखद अनुभव को इस तरह जोड़ते हैं जैसे हमारे टूल करते हैं। हमारे शब्दकोश बड़े और अच्छी तरह रखरखाव किए गए हैं, हमारा मिलान सटीक है, और हमारा इंटरफ़ेस आपको सबसे कम टैप में उत्तर तक पहुँचाने के लिए बनाया गया है। आपके और आपकी ज़रूरत के शब्द के बीच कोई भ्रमित करने वाला मेनू, दखल देने वाला व्यवधान या धीरे लोड होने वाला पेज नहीं है।",
          "सब कुछ मोबाइल-प्रथम और बिजली की तरह तेज़ है, इसलिए टूल आपके फ़ोन पर उतने ही अच्छे लगते हैं जितने डेस्कटॉप पर। डिज़ाइन आधुनिक और पठनीय है, हल्के और गहरे मोड के साथ ताकि आप दिन के किसी भी समय आराम से खेल सकें। और क्योंकि हर टूल मुफ़्त है और कोई खाता आवश्यक नहीं है, आप सीधे शुरू कर सकते हैं।",
          "हम आपको केवल जीतने में नहीं, सीखने में भी मदद करने की परवाह करते हैं। उत्तरों के साथ, हमारे टूल उपयोगी संदर्भ भी देते हैं — परिभाषाएँ, अंक, सिलेबल और संबंधित शब्द — ताकि हर खोज आपको पहले से थोड़ा अधिक धाराप्रवाह बना दे।",
        ],
      },
      {
        heading: "खेल के सुझाव और व्यावहारिक रणनीतियाँ",
        paragraphs: [
          "एक सामान्य खोज इस प्रकार होती है। मान लीजिए आपके Scrabble रैक पर R, A, T, I, O, N और S हैं। उन सात अक्षरों को शब्द अनस्क्रैम्बलर में डालें, Scrabble शब्दकोश चुनें, और आपको तुरंत उच्च-मूल्य वाली चालें दिखेंगी — जिसमें सात-अक्षर वाला बिंगो भी है जो पचास अंकों का बोनस देता है। पाँच अक्षरों वाले क्रॉसवर्ड संकेत पर अटके हैं जिसके तीसरे वर्ग में T है? पैटर्न ??T?? डालें और सॉल्वर हर मेल खाता शब्द लौटाएगा।",
          "कुछ व्यावहारिक सुझाव बहुत काम आते हैं। पहले छोटे दो- और तीन-अक्षर वाले शब्द सीखें; ये शीर्ष Scrabble खिलाड़ियों का गुप्त हथियार हैं चालों को जोड़ने और तंग बोर्डों से अंक निकालने के लिए। Q, Z, X और J जैसी उच्च-मूल्य टाइलों पर नज़र रखें, और उन गिने-चुने Q-बिना-U शब्दों को याद रखें जो अटके रैक को बचा सकते हैं। Wordle में, सामान्य स्वरों और व्यंजनों से भरपूर अनुमान से शुरुआत करें ताकि प्रतिबद्ध होने से पहले अधिक से अधिक संभावनाएँ खत्म हो जाएँ।",
          "लेखकों के लिए, अपनी भाषा में विविधता लाने और दोहराव से बचने के लिए समानार्थी और विलोम टूल का उपयोग करें, और कविता और गीतों को बहता रखने के लिए तुक और सिलेबल टूल का सहारा लें। समय के साथ दोहराई गई ऐसी छोटी आदतें साधारण खेल को असली कौशल में बदल देती हैं और आपको अंग्रेज़ी का अधिक तेज़ और आत्मविश्वासी उपयोगकर्ता बनाती हैं।",
        ],
      },
    ],
    faqEyebrow: "प्रश्न और उत्तर",
    faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
    faqDescription: "AllWordTools के उपयोग के बारे में वह सब कुछ जो आप जानना चाहेंगे।",
    faqs: [
      { question: "शब्द टूल क्या हैं और ये कैसे काम करते हैं?", answer: "शब्द टूल स्मार्ट ऑनलाइन उपयोगिताएँ हैं जो अक्षरों, पैटर्न और शब्दकोशों का विश्लेषण करके आपको शब्द खेल खेलने, अपनी शब्दावली बढ़ाने और बेहतर लिखने में मदद करती हैं। आप अपने पास मौजूद अक्षर या वह पैटर्न लिखते हैं जिसे आप खोज रहे हैं, और टूल तुरंत एक बड़ी, चुनी हुई शब्द सूची में खोजकर हर वैध मिलान लौटाता है — आमतौर पर लंबाई, अंकों या प्रासंगिकता के अनुसार क्रमबद्ध। सब कुछ आपके ब्राउज़र में एक सेकंड के अंश में चलता है, इसलिए कुछ भी इंस्टॉल करने की ज़रूरत नहीं है और कोई प्रतीक्षा नहीं है।" },
      { question: "ये टूल कौन से शब्द खेलों का समर्थन करते हैं?", answer: "हमारे सहायक दुनिया के सबसे लोकप्रिय शब्द खेलों के लिए अनुकूलित हैं, जिनमें Scrabble, Words With Friends, Wordle, क्रॉसवर्ड, Boggle, Hangman, Text Twist और अख़बारों और ऐप्स में पाए जाने वाले असंख्य एनाग्राम और जंबल पहेलियाँ शामिल हैं। हर खेल अपने शब्दकोश और अंक नियम उपयोग करता है, इसलिए हम परिणाम उसी के अनुसार तैयार करते हैं — Scrabble टूर्नामेंट-शैली की शब्द सूचियाँ उपयोग करता है, जबकि Wordle वैध पाँच-अक्षर उत्तरों पर केंद्रित है।" },
      { question: "क्या शब्द अनस्क्रैम्बलर का उपयोग करना धोखाधड़ी माना जाता है?", answer: "शब्द टूल को धोखाधड़ी के तरीके के बजाय सीखने और अभ्यास के सहायक के रूप में सोचना सबसे अच्छा है। लाखों खिलाड़ी इनका उपयोग नए शब्द सीखने, यह समझने कि कोई चाल क्यों वैध है, अपनी रणनीति बेहतर बनाने और मित्रवत विवाद सुलझाने के लिए करते हैं। दोस्तों के बीच साधारण खेलों में, या जब आप अकेले अभ्यास कर रहे हों, तो ये बेहतर बनने का शानदार तरीका हैं। प्रतिस्पर्धी माहौल में इनका उपयोग करना है या नहीं, यह हमेशा आपका निर्णय है और उन नियमों पर निर्भर करता है जिन पर आपने अन्य खिलाड़ियों के साथ सहमति बनाई है।" },
      { question: "क्या शब्द टूल उपयोग करने के लिए मुफ़्त हैं?", answer: "हाँ। प्लेटफ़ॉर्म पर हर टूल पूरी तरह मुफ़्त है, बिना किसी साइन-अप के। आप जितनी बार चाहें शब्द सुलझा सकते हैं, एनाग्राम हल कर सकते हैं, तुक खोज सकते हैं और बहुत कुछ कर सकते हैं। हम अनुभव को तेज़ और हल्का रखते हैं ताकि आपको किसी भी डिवाइस पर तुरंत उत्तर मिलें।" },
      { question: "परिणाम कितने सटीक हैं?", answer: "हम मान्यता प्राप्त शब्द सूचियों पर आधारित बड़े, नियमित रूप से रखरखाव किए गए शब्दकोश उपयोग करते हैं, इसलिए आपके चुने खेल के लिए परिणाम अत्यधिक सटीक होते हैं। क्योंकि अलग-अलग खेल अलग-अलग शब्द स्वीकार करते हैं, हम आपको Scrabble, Words With Friends और सामान्य अंग्रेज़ी के लिए सही शब्दकोश चुनने देते हैं। यदि कभी कोई शब्द जगह से बाहर लगे, तो याद रखें कि खेल शब्दकोशों में कभी-कभी अस्पष्ट लेकिन आधिकारिक रूप से वैध शब्द शामिल होते हैं।" },
      { question: "क्या मैं लंबाई के अनुसार शब्द खोज सकता हूँ?", answer: "बिल्कुल। कई टूल आपको सटीक लंबाई के अनुसार फ़िल्टर करने देते हैं — उदाहरण के लिए, Wordle के लिए केवल पाँच-अक्षर शब्द, या Scrabble बिंगो खोजने के लिए सात-अक्षर शब्द। आप लंबाई फ़िल्टर को शुरुआती अक्षरों, अंतिम अक्षरों और शामिल अक्षरों के साथ जोड़कर ठीक उन्हीं शब्दों तक पहुँच सकते हैं जिनकी आपको ज़रूरत है।" },
      { question: "एनाग्राम सॉल्वर और शब्द अनस्क्रैम्बलर में क्या अंतर है?", answer: "शब्द अनस्क्रैम्बलर अक्षरों के समूह से बनाए जा सकने वाले सभी वैध शब्द खोजता है, जिनमें वे छोटे शब्द भी शामिल हैं जो उनमें से केवल कुछ अक्षरों का उपयोग करते हैं। एनाग्राम सॉल्वर उन पुनर्व्यवस्थाओं पर केंद्रित है जो हर अक्षर का उपयोग करके नया शब्द या वाक्यांश बनाती हैं। व्यवहार में दोनों में बहुत अधिक ओवरलैप है, और हमारे टूल आंशिक और पूर्ण-लंबाई दोनों परिणाम दिखाते हैं ताकि आप कोई चाल कभी न चूकें।" },
      { question: "मैं वाइल्डकार्ड या खाली टाइल का उपयोग कैसे करूँ?", answer: "जब आपके पास Scrabble या Words With Friends में खाली टाइल हो, या आपको कोई अक्षर पता न हो, तो आप वाइल्डकार्ड — आमतौर पर प्रश्न चिह्न या तारांकन — का उपयोग किसी भी अक्षर के प्रतिनिधित्व के लिए कर सकते हैं। हमारे सॉल्वर हर वाइल्डकार्ड को पूरे वर्णमाला में विस्तारित करते हैं और हर फिट बैठने वाला शब्द लौटाते हैं, स्पष्ट रूप से दिखाते हुए कि किन अक्षरों ने खाली स्थान भरे।" },
      { question: "क्या ये टूल मेरी शब्दावली बेहतर बनाने में मदद कर सकते हैं?", answer: "निश्चित रूप से। खेल जीतने से आगे, शब्द टूल शक्तिशाली शब्दावली निर्माता हैं। नए शब्द खोजना, उनकी परिभाषाएँ देखना, समानार्थी और विलोम खोजना, और यह सीखना कि कौन से अक्षर संयोजन वैध हैं — ये सब आपके भाषा कौशल को मज़बूत करते हैं। कई छात्र, लेखक, शिक्षक और भाषा सीखने वाले वर्तनी का अध्ययन करने और अपनी शब्दावली बढ़ाने के लिए इनका रोज़ उपयोग करते हैं।" },
      { question: "क्या टूल मोबाइल फ़ोन और टैबलेट पर काम करते हैं?", answer: "हाँ। पूरा प्लेटफ़ॉर्म मोबाइल-प्रथम बनाया गया है और पूरी तरह उत्तरदायी है, इसलिए हर टूल फ़ोन, टैबलेट, लैपटॉप और डेस्कटॉप पर सुंदर ढंग से काम करता है। लेआउट आपकी स्क्रीन के अनुसार ढल जाता है, बटन टैप करने में आसान रहते हैं, और धीमे कनेक्शन पर भी परिणाम जल्दी लोड होते हैं।" },
      { question: "Wordle सॉल्वर कैसे काम करता है?", answer: "Wordle सॉल्वर आपके पास पहले से मौजूद संकेतों के आधार पर संभावित उत्तरों को सीमित करता है। आप वे अक्षर डालते हैं जो सही हैं और सही स्थान पर हैं, वे अक्षर जो मौजूद हैं लेकिन ग़लत स्थान पर हैं, और वे अक्षर जिन्हें आपने ख़ारिज कर दिया है। फिर टूल पाँच-अक्षर शब्द सूची को फ़िल्टर करके बचे उम्मीदवार बताता है और मज़बूत अगले अनुमान सुझाता है जो सबसे अधिक संभावनाओं को खत्म करते हैं।" },
      { question: "क्या मैं गानों और कविता के लिए तुक वाले शब्द खोज सकता हूँ?", answer: "हाँ। हमारा तुक शब्द टूल पूर्ण तुक, निकट तुक और समान ध्वनि वाले शब्द खोजता है, जो गीत लेखन, कविता, रैप गीतों और बधाई कार्ड के लिए आदर्श है। आप सिलेबल संख्या और बलाघात पैटर्न के अनुसार परिणाम देख सकते हैं ताकि आपकी पंक्तियाँ स्वाभाविक रूप से बहती रहें।" },
      { question: "सिलेबल काउंटर किस काम आता है?", answer: "सिलेबल काउंटर आपको बताता है कि किसी शब्द या पूरे पाठ में कितने सिलेबल हैं। यह हाइकु और अन्य संरचित कविता लिखने, पठनीयता जाँचने, ध्वनि-विज्ञान पढ़ाने और गीतों को धुन में फिट करने के लिए अमूल्य है। बस अपना पाठ चिपकाएँ और काउंटर हर शब्द को तुरंत तोड़कर दिखाता है।" },
      { question: "सबसे अधिक अंक वाला Scrabble शब्द कैसे गणना किया जाता है?", answer: "हमारा Scrabble सहायक हर अक्षर को उसका आधिकारिक अंक मूल्य देता है, फिर आपके रैक से बनाए जा सकने वाले हर वैध शब्द की टाइलों का योग करता है। परिणाम सबसे अधिक से सबसे कम अंक के अनुसार क्रमबद्ध होते हैं ताकि आप सबसे बड़ी चाल एक नज़र में देख सकें। आप शब्द को बोर्ड पर कहाँ रखते हैं — दोहरे और तिहरे वर्गों पर — इससे अंक और भी बढ़ सकते हैं।" },
      { question: "क्या आप और शब्द टूल जोड़ेंगे?", answer: "हाँ, लगातार। हम कहीं भी अंग्रेज़ी शब्द टूल का सबसे व्यापक संग्रह बना रहे हैं, और नए सॉल्वर, जनरेटर और भाषा सहायक नियमित रूप से जोड़े जाते हैं। साइट को बुकमार्क करें और होमपेज पर नवीनतम टूल अनुभाग देखें कि अभी क्या लॉन्च हुआ है।" },
    ],
  },
  ar: {
    benefits: [
      { title: "نتائج فورية", description: "تظهر الإجابات لحظة الضغط على بحث — دون انتظار ودون إعادة تحميل." },
      { title: "تعلّم أثناء اللعب", description: "تساعدك التعريفات والنقاط والكلمات ذات الصلة على بناء مفرداتك بشكل طبيعي." },
      { title: "قواميس دقيقة", description: "قوائم كلمات كبيرة ومُصانة جيدًا ومضبوطة لكل لعبة تلعبها." },
      { title: "مصمم للجوال أولًا", description: "تجربة سريعة ومتجاوبة على الهواتف والأجهزة اللوحية وأجهزة الكمبيوتر على حد سواء." },
      { title: "مجاني دائمًا", description: "كل أداة مجانية 100٪ دون تسجيل ودون حدود." },
      { title: "في نمو مستمر", description: "تتم إضافة أدوات حل وأدوات لغة جديدة بانتظام." },
    ],
    guideEyebrow: "الدليل الكامل",
    guideTitle: "كل ما تحتاج معرفته عن أدوات الكلمات",
    guideSections: [
      {
        heading: "ما هي أدوات الكلمات؟",
        paragraphs: [
          "أدوات الكلمات هي أدوات عبر الإنترنت مصممة لمساعدتك على لعب ألعاب الكلمات وحل الألغاز وتحسين إتقانك للغة الإنجليزية. في جوهرها، تأخذ الحروف أو الأنماط أو الأدلة التي لديك وتبحث في قواميس ضخمة ومُصانة بعناية لتكشف كل كلمة ممكنة تناسبها. بنقرة واحدة يمكنك فك تشابك مجموعة من الحروف، أو العثور على جميع الجناسات، أو اكتشاف الكلمات التي تبدأ أو تنتهي بسلسلة معينة، أو تضييق إجابة Wordle اليوم.",
          "ما يجعل أدوات الكلمات الحديثة قوية جدًا هو السرعة والشمول. بدلًا من تقليب قاموس ورقي أو التخمين، تحصل على قائمة كاملة ومرتبة من الكلمات الصالحة في جزء من الثانية. عادة ما تُنظم النتائج حسب الطول والنقاط، حتى تطفو أكثر اللعبات فائدة إلى الأعلى مباشرة. سواء كنت لاعبًا عاديًا، أو متحمسًا تنافسيًا للعبة Scrabble، أو محبًا للكلمات المتقاطعة، أو كاتبًا، أو معلمًا، أو متعلم لغة، فهناك أداة هنا مصممة تمامًا لما تحتاجه.",
          "تجمع منصتنا 92 من هذه الأدوات في 13 فئة منظمة بشكل جميل. من أدوات حل الكلمات وأدوات الحروف إلى مساعدات الكتابة ومساعدي الألعاب المخصصين، تشترك كل أداة في نفس التجربة السريعة والودودة وسهلة الوصول — دون تنزيلات ودون تسجيل ودون فوضى.",
        ],
      },
      {
        heading: "فوائد استخدام أدوات الكلمات",
        paragraphs: [
          "الفائدة الأكثر وضوحًا هي الفوز بمزيد من الألعاب. عندما يمكنك أن ترى فورًا أعلى لعبة نقاطًا من رف Scrabble الخاص بك أو آخر المرشحين المتبقين في Wordle، تقضي وقتًا أقل عالقًا ووقتًا أكثر مستمتعًا باللعبة. لكن المزايا تتجاوز مباراة واحدة بكثير.",
          "أدوات الكلمات مساعدات تعليمية ممتازة. في كل مرة تفك فيها تشابك الحروف أو تستكشف المرادفات، تصادف كلمات جديدة، وتعزز الإملاء، وتفهم أي تركيبات حروف صالحة في الإنجليزية. يستخدمها الطلاب الذين يستعدون للامتحانات، والكتاب الباحثون عن الكلمة المثالية، والمتعلمون الذين يبنون الطلاقة، لتنمية مفرداتهم بطريقة سهلة بل وممتعة.",
          "وهي رائعة أيضًا لحسم النزاعات الودية. هل هذه كلمة حقًا؟ هل تتناغم؟ كم عدد مقاطعها؟ بدلًا من الجدال، تحصل على إجابة فورية وقابلة للتحقق مولدة من قوائم كلمات منسقة. ولأن كل شيء مجاني ويعمل على أي جهاز، فإن المساعدة دائمًا على بعد نقرة، سواء كنت على الأريكة أو في القطار أو على مكتبك.",
        ],
      },
      {
        heading: "كيف تعمل أدوات الكلمات",
        paragraphs: [
          "خلف كل أداة يوجد قاموس كبير منسق ومحرك مطابقة سريع. عندما تكتب حروفك أو نمطك، تقارن الأداة إدخالك بقائمة الكلمات بأكملها، مطبقة قواعد اللعبة أو البحث الذي اخترته. بالنسبة لأداة فك الكلمات، يعني ذلك العثور على كل تركيبة من حروفك تهجئ كلمة صالحة. بالنسبة للبحث بالنمط، يعني ذلك مطابقة حروفك المعروفة وعلامات البدل مع كلمات بالشكل الصحيح.",
          "تقبل الألعاب المختلفة كلمات مختلفة، لذا فإن اختيار القاموس الصحيح مهم. تستخدم كل من Scrabble وWords With Friends قوائم كلمات وقيم حروف مميزة خاصة بها، بينما يركز Wordle على إجابات صالحة من خمسة حروف. تتيح لك أدواتنا اختيار الوضع المناسب حتى تعكس النتائج دائمًا اللعبة التي تلعبها فعليًا.",
          "بمجرد العثور على التطابقات، تُسجل النتائج وتُفرز. يرتب مساعدو ألعاب الكلمات اللعبات حسب النقاط؛ وتفرز أدوات الحروف حسب الطول أو الترتيب الأبجدي؛ وتجمع أدوات الكتابة النتائج حسب المعنى أو الصوت أو عدد المقاطع. يتم العمل الشاق فورًا وبخصوصية في متصفحك، ولهذا تظهر الإجابات لحظة الضغط على بحث.",
        ],
      },
      {
        heading: "الألعاب والألغاز المدعومة",
        paragraphs: [
          "ندعم ألعاب الكلمات التي يحبها الناس أكثر. يمكن للاعبي Scrabble العثور على أعلى اللعبات نقاطًا باستخدام قوائم كلمات بأسلوب البطولات وقيم بلاطات دقيقة. يحصل محبو Words With Friends على حركات مضبوطة لقيم البلاطات وقائمة الكلمات الفريدة لذلك اللعبة. يضيق حلالو Wordle الإجابة اليومية باستخدام أدلتك الخضراء والصفراء والرمادية، بينما يملأ حلالو الكلمات المتقاطعة المربعات المفقودة من طول الدليل والحروف التي تعرفها بالفعل.",
          "محبو الألغاز مشمولون أيضًا. يجعل حلال الجناس وفاك الكلمات لدينا ألغاز الصحف وألعاب الحروف القائمة على التطبيقات قصيرة العمل. يستخرج حلالا Boggle وText Twist كل كلمة مخفية من شبكة أو تشابك، ويقترح مساعد Hangman أذكى الحروف للتخمين التالي حتى نادرًا ما تنفد محاولاتك.",
          "ولأن المنصة تنمو دائمًا، تستمر قائمة الألعاب والألغاز المدعومة في التوسع. إذا كانت هناك لعبة كلمات شعبية تستمتع بها، فهناك فرصة كبيرة جدًا أن لدينا بالفعل مساعدًا مخصصًا لها — وإذا لم يكن كذلك، فهي على الأرجح في الطريق.",
        ],
      },
      {
        heading: "لماذا تستخدم أدوات الكلمات لدينا",
        paragraphs: [
          "هناك العديد من أدوات الكلمات عبر الإنترنت، لكن القليل منها يجمع بين الدقة والسرعة وتجربة ممتعة حقًا مثل أدواتنا. قواميسنا كبيرة ومُصانة جيدًا، ومطابقتنا دقيقة، وواجهتنا مصممة لتوصلك إلى الإجابة بأقل عدد ممكن من النقرات. لا توجد قوائم مربكة أو مقاطعات مزعجة أو صفحات بطيئة التحميل بينك وبين الكلمة التي تحتاجها.",
          "كل شيء مصمم للجوال أولًا وسريع كالبرق، لذا تبدو الأدوات جيدة على هاتفك كما على سطح المكتب. التصميم حديث وقابل للقراءة، مع وضع فاتح وداكن حتى تتمكن من اللعب براحة في أي وقت من اليوم. ولأن كل أداة مجانية ولا تتطلب حسابًا، يمكنك البدء مباشرة.",
          "نهتم أيضًا بمساعدتك على التعلم، وليس فقط الفوز. إلى جانب الإجابات، تعرض أدواتنا سياقًا مفيدًا — تعريفات ونقاط ومقاطع وكلمات ذات صلة — حتى تتركك كل عملية بحث أكثر طلاقة بقليل من قبل.",
        ],
      },
      {
        heading: "نصائح للعب واستراتيجيات عملية",
        paragraphs: [
          "هكذا تسير عملية بحث نموذجية. افترض أن رف Scrabble الخاص بك يحمل R وA وT وI وO وN وS. ضع تلك الحروف السبعة في فاك الكلمات، واختر قاموس Scrabble، وسترى فورًا لعبات عالية القيمة — بما في ذلك البينغو المكون من سبعة حروف الذي يكسب مكافأة خمسين نقطة. عالق في دليل كلمات متقاطعة من خمسة حروف مع T في المربع الثالث؟ أدخل النمط ??T?? وسيعيد الحلال كل كلمة مطابقة.",
          "بعض النصائح العملية تقطع شوطًا طويلًا. تعلم الكلمات القصيرة المكونة من حرفين وثلاثة حروف أولًا؛ فهي السلاح السري لأفضل لاعبي Scrabble لربط اللعبات وانتزاع النقاط من اللوحات الضيقة. راقب البلاطات عالية القيمة مثل Q وZ وX وJ، وتذكر الكلمات القليلة التي تحتوي على Q دون U والتي يمكن أن تنقذ رفًا عالقًا. في Wordle، ابدأ بتخمين غني بالحروف المتحركة والساكنة الشائعة للتخلص من أكبر عدد ممكن من الاحتمالات قبل أن تلتزم.",
          "للكتاب، استخدم أدوات المرادفات والمتضادات لتنويع لغتك وتجنب التكرار، واعتمد على أدوات القافية والمقاطع للحفاظ على تدفق الشعر وكلمات الأغاني. عادات صغيرة مثل هذه، تتكرر مع مرور الوقت، تحول اللعب العادي إلى مهارة حقيقية وتجعلك مستخدمًا أكثر حدة وثقة للإنجليزية.",
        ],
      },
    ],
    faqEyebrow: "أسئلة وأجوبة",
    faqTitle: "الأسئلة الشائعة",
    faqDescription: "كل ما قد ترغب في معرفته عن استخدام AllWordTools.",
    faqs: [
      { question: "ما هي أدوات الكلمات وكيف تعمل؟", answer: "أدوات الكلمات هي أدوات ذكية عبر الإنترنت تحلل الحروف والأنماط والقواميس لمساعدتك على لعب ألعاب الكلمات وتوسيع مفرداتك والكتابة بشكل أفضل. تكتب الحروف التي لديك أو النمط الذي تبحث عنه، وتبحث الأداة فورًا في قائمة كلمات كبيرة ومنسقة لإعادة كل تطابق صالح — عادة مرتبة حسب الطول أو النقاط أو الصلة. يعمل كل شيء في متصفحك في جزء من الثانية، لذلك لا يوجد شيء لتثبيته ولا انتظار." },
      { question: "ما هي ألعاب الكلمات التي تدعمها هذه الأدوات؟", answer: "مساعدونا محسّنون لأشهر ألعاب الكلمات في العالم، بما في ذلك Scrabble وWords With Friends وWordle والكلمات المتقاطعة وBoggle وHangman وText Twist والعديد من ألغاز الجناس والتشابك الموجودة في الصحف والتطبيقات. تستخدم كل لعبة قاموسها وقواعد تسجيلها الخاصة، لذلك نضبط النتائج — تستخدم Scrabble قوائم كلمات بأسلوب البطولات، بينما يركز Wordle على إجابات صالحة من خمسة حروف." },
      { question: "هل يعتبر استخدام فاك الكلمات غشًا؟", answer: "من الأفضل التفكير في أدوات الكلمات كمساعدات للتعلم والممارسة بدلًا من وسيلة للغش. يستخدمها ملايين اللاعبين لدراسة كلمات جديدة وفهم سبب صلاحية لعبة ما وتحسين استراتيجيتهم وحسم النزاعات الودية. في الألعاب العادية بين الأصدقاء، أو عندما تمارس بمفردك، فهي طريقة رائعة للتحسن. ما إذا كنت تستخدمها في بيئة تنافسية هو قرارك دائمًا ويعتمد على القواعد التي اتفقت عليها مع اللاعبين الآخرين." },
      { question: "هل أدوات الكلمات مجانية للاستخدام؟", answer: "نعم. كل أداة على المنصة مجانية تمامًا للاستخدام، دون الحاجة إلى تسجيل. يمكنك فك الكلمات وحل الجناسات والعثور على القوافي والمزيد بقدر ما تريد. نحافظ على التجربة سريعة وخفيفة حتى تحصل على إجابات فورًا على أي جهاز." },
      { question: "ما مدى دقة النتائج؟", answer: "نستخدم قواميس كبيرة تُصان بانتظام بناءً على قوائم كلمات معترف بها، لذا فإن النتائج دقيقة للغاية للعبة التي تختارها. لأن الألعاب المختلفة تقبل كلمات مختلفة، نتيح لك اختيار القاموس المناسب لـ Scrabble وWords With Friends والإنجليزية العامة. إذا رأيت يومًا كلمة تبدو في غير محلها، فتذكر أن قواميس الألعاب تشمل أحيانًا كلمات غامضة لكنها صالحة رسميًا." },
      { question: "هل يمكنني البحث عن الكلمات حسب الطول؟", answer: "بالتأكيد. تتيح لك العديد من الأدوات التصفية حسب الطول الدقيق — على سبيل المثال، كلمات من خمسة حروف فقط لـ Wordle، أو كلمات من سبعة حروف للبحث عن بينغو في Scrabble. يمكنك دمج مرشحات الطول مع الحروف البادئة والحروف المنتهية والحروف المحتواة للوصول بدقة إلى الكلمات التي تحتاجها." },
      { question: "ما الفرق بين حلال الجناس وفاك الكلمات؟", answer: "يجد فاك الكلمات جميع الكلمات الصالحة التي يمكنك تكوينها من مجموعة حروف، بما في ذلك الكلمات الأقصر التي تستخدم بعضها فقط. يركز حلال الجناس على إعادة الترتيب التي تستخدم كل حرف لتكوين كلمة أو عبارة جديدة. في الممارسة العملية، يتداخل الاثنان كثيرًا، وتعرض أدواتنا نتائج جزئية وكاملة الطول حتى لا تفوتك أي لعبة أبدًا." },
      { question: "كيف أستخدم علامات البدل أو البلاطات الفارغة؟", answer: "عندما يكون لديك بلاطة فارغة في Scrabble أو Words With Friends، أو ببساطة لا تعرف حرفًا، يمكنك استخدام علامة بدل — عادة علامة استفهام أو نجمة — لتمثيل أي حرف. يوسع حلالونا كل علامة بدل عبر الأبجدية بأكملها ويعيدون كل كلمة تناسب، موضحين بوضوح أي الحروف ملأت الفراغات." },
      { question: "هل يمكن أن تساعدني هذه الأدوات في تحسين مفرداتي؟", answer: "بالتأكيد. إلى جانب الفوز بالألعاب، أدوات الكلمات هي بانية مفردات قوية. اكتشاف كلمات جديدة ورؤية تعريفاتها واستكشاف المرادفات والمتضادات وتعلم أي تركيبات حروف صالحة يعزز مهاراتك اللغوية. يستخدمها العديد من الطلاب والكتاب والمعلمين ومتعلمي اللغة يوميًا لدراسة الإملاء وتوسيع مفرداتهم." },
      { question: "هل تعمل الأدوات على الهواتف المحمولة والأجهزة اللوحية؟", answer: "نعم. المنصة بأكملها مبنية للجوال أولًا ومتجاوبة تمامًا، لذا تعمل كل أداة بشكل جميل على الهواتف والأجهزة اللوحية وأجهزة الكمبيوتر المحمولة وأجهزة سطح المكتب. يتكيف التخطيط مع شاشتك، وتبقى الأزرار سهلة النقر، وتُحمل النتائج بسرعة حتى على الاتصالات الأبطأ." },
      { question: "كيف يعمل حلال Wordle؟", answer: "يضيق حلال Wordle الإجابات المحتملة بناءً على الأدلة التي لديك بالفعل. تدخل الحروف التي تعرف أنها صحيحة وفي الموضع الصحيح، والحروف الموجودة لكن في غير محلها، والحروف التي استبعدتها. ثم تصفي الأداة قائمة الكلمات ذات الخمسة حروف للكشف عن المرشحين المتبقين وتقترح تخمينات تالية قوية تقضي على أكبر عدد من الاحتمالات." },
      { question: "هل يمكنني العثور على كلمات متناغمة للأغاني والشعر؟", answer: "نعم. تجد أداة الكلمات المتناغمة لدينا قوافي مثالية وقوافي قريبة وكلمات بأصوات مشابهة، وهو مثالي لكتابة الأغاني والشعر وكلمات الراب وبطاقات التهنئة. يمكنك تصفح النتائج حسب عدد المقاطع ونمط النبر للحفاظ على تدفق سطورك بشكل طبيعي." },
      { question: "ما هو عداد المقاطع المستخدم؟", answer: "يخبرك عداد المقاطع بعدد المقاطع في كلمة أو مقطع نصي كامل. إنه لا يقدر بثمن لكتابة الهايكو والشعر المنظم الآخر، والتحقق من قابلية القراءة، وتعليم الصوتيات، وملاءمة كلمات الأغاني مع لحن. ببساطة الصق نصك وسيقوم العداد بتحليل كل كلمة فورًا." },
      { question: "كيف يتم حساب أعلى كلمة نقاطًا في Scrabble؟", answer: "يخصص مساعد Scrabble لدينا لكل حرف قيمته الرسمية من النقاط، ثم يجمع البلاطات لكل كلمة صالحة يمكنك تهجئتها من رفك. تُرتب النتائج من الأعلى إلى الأدنى نقاطًا حتى تتمكن من رؤية أكبر لعبة بنظرة واحدة. حيث تضع الكلمة على اللوحة — عند إصابة المربعات المزدوجة والثلاثية — يمكن أن يعزز النقاط أكثر." },
      { question: "هل ستضيفون المزيد من أدوات الكلمات؟", answer: "نعم، باستمرار. نحن نبني المجموعة الأكثر شمولًا لأدوات الكلمات الإنجليزية في أي مكان، وتتم إضافة حلالات ومولدات ومساعدات لغة جديدة بانتظام. ضع إشارة مرجعية على الموقع وتحقق من قسم أحدث الأدوات على الصفحة الرئيسية لترى ما تم إطلاقه للتو." },
    ],
  },
  de: {
    benefits: [
      { title: "Sofortige Ergebnisse", description: "Antworten erscheinen in dem Moment, in dem du auf Suchen drückst – kein Warten, kein Neuladen." },
      { title: "Lernen beim Spielen", description: "Definitionen, Punktzahlen und verwandte Wörter helfen dir, deinen Wortschatz auf natürliche Weise zu erweitern." },
      { title: "Genaue Wörterbücher", description: "Große, gut gepflegte Wortlisten, abgestimmt auf jedes Spiel, das du spielst." },
      { title: "Mobil zuerst", description: "Ein schnelles, responsives Erlebnis auf Handys, Tablets und Desktops gleichermaßen." },
      { title: "Immer kostenlos", description: "Jedes Tool ist 100 % kostenlos, ohne Anmeldung und ohne Limits." },
      { title: "Ständig wachsend", description: "Neue Solver und Sprachtools werden regelmäßig hinzugefügt." },
    ],
    guideEyebrow: "Der komplette Leitfaden",
    guideTitle: "Alles, was du über Wort-Tools wissen musst",
    guideSections: [
      {
        heading: "Was sind Wort-Tools?",
        paragraphs: [
          "Wort-Tools sind Online-Hilfen, die dir helfen, Wortspiele zu spielen, Rätsel zu lösen und deine Englischkenntnisse zu verbessern. Im Kern nehmen sie die Buchstaben, Muster oder Hinweise, die du bereits hast, und durchsuchen riesige, sorgfältig gepflegte Wörterbücher, um jedes mögliche passende Wort zu zeigen. Mit einem Klick kannst du einen Buchstabensalat entwirren, jedes Anagramm finden, Wörter entdecken, die mit einer bestimmten Zeichenfolge beginnen oder enden, oder die Antwort auf das heutige Wordle eingrenzen.",
          "Was moderne Wort-Tools so leistungsstark macht, ist Geschwindigkeit und Breite. Statt in einem Papierwörterbuch zu blättern oder zu raten, erhältst du in einem Bruchteil einer Sekunde eine vollständige, sortierte Liste gültiger Wörter. Die Ergebnisse sind meist nach Länge und Punktzahl organisiert, sodass die nützlichsten Züge direkt oben stehen. Ob Gelegenheits­spieler, wettbewerbsorientierter Scrabble-Fan, Kreuzworträtsel-Liebhaber, Autor, Lehrer oder Sprachlerner – hier gibt es ein Tool, das genau für deine Bedürfnisse gebaut ist.",
          "Unsere Plattform vereint 92 dieser Tools in 13 übersichtlich organisierten Kategorien. Von Wort-Solvern und Buchstaben-Tools bis zu Schreibhilfen und speziellen Spielhelfern teilt sich jedes Tool dieselbe schnelle, freundliche und zugängliche Erfahrung – keine Downloads, keine Anmeldungen und kein Durcheinander.",
        ],
      },
      {
        heading: "Die Vorteile der Nutzung von Wort-Tools",
        paragraphs: [
          "Der offensichtlichste Vorteil ist, mehr Spiele zu gewinnen. Wenn du sofort den punktstärksten Zug aus deinem Scrabble-Rack oder die letzten Kandidaten in Wordle sehen kannst, verbringst du weniger Zeit festgefahren und mehr Zeit damit, das Spiel zu genießen. Aber die Vorteile gehen weit über ein einzelnes Match hinaus.",
          "Wort-Tools sind hervorragende Lernhilfen. Jedes Mal, wenn du Buchstaben entwirrst oder Synonyme erkundest, begegnest du neuen Wörtern, festigst die Rechtschreibung und verstehst, welche Buchstabenkombinationen im Englischen gültig sind. Schüler, die sich auf Prüfungen vorbereiten, Autoren auf der Suche nach dem perfekten Wort und Lernende, die ihre Sprachkenntnisse ausbauen, nutzen diese Tools, um ihren Wortschatz mühelos und sogar mit Spaß zu erweitern.",
          "Sie sind auch großartig, um freundschaftliche Streitigkeiten zu klären. Ist das wirklich ein Wort? Reimt es sich? Wie viele Silben hat es? Statt zu diskutieren, erhältst du eine sofortige, überprüfbare Antwort aus kuratierten Wortlisten. Und weil alles kostenlos ist und auf jedem Gerät funktioniert, ist Hilfe immer nur einen Tipp entfernt, ob auf dem Sofa, im Zug oder am Schreibtisch.",
        ],
      },
      {
        heading: "Wie Wort-Tools funktionieren",
        paragraphs: [
          "Hinter jedem Tool steht ein großes, kuratiertes Wörterbuch und eine schnelle Abgleich-Engine. Wenn du deine Buchstaben oder dein Muster eingibst, vergleicht das Tool deine Eingabe mit der gesamten Wortliste und wendet die Regeln des von dir gewählten Spiels oder der Suche an. Für einen Wort-Unscrambler bedeutet das, jede Kombination deiner Buchstaben zu finden, die ein gültiges Wort ergibt. Für eine Mustersuche bedeutet das, deine bekannten Buchstaben und Platzhalter mit Wörtern der richtigen Form abzugleichen.",
          "Verschiedene Spiele akzeptieren verschiedene Wörter, deshalb ist die Wahl des richtigen Wörterbuchs wichtig. Scrabble und Words With Friends nutzen jeweils eigene Wortlisten und Buchstabenwerte, während Wordle sich auf gültige Fünf-Buchstaben-Antworten konzentriert. Unsere Tools lassen dich den richtigen Modus wählen, sodass die Ergebnisse immer das Spiel widerspiegeln, das du tatsächlich spielst.",
          "Sobald Treffer gefunden sind, werden die Ergebnisse bewertet und sortiert. Spielhelfer ordnen Züge nach Punkten; Buchstaben-Tools sortieren nach Länge oder alphabetisch; Schreib-Tools gruppieren Ergebnisse nach Bedeutung, Klang oder Silbenzahl. Die schwere Arbeit geschieht sofort und privat in deinem Browser, weshalb die Antworten in dem Moment erscheinen, in dem du auf Suchen drückst.",
        ],
      },
      {
        heading: "Welche Spiele und Rätsel werden unterstützt",
        paragraphs: [
          "Wir unterstützen die Wortspiele, die Menschen am meisten lieben. Scrabble-Spieler finden die punktstärksten Züge mit turnierartigen Wortlisten und präzisen Steinwerten. Fans von Words With Friends erhalten Züge, die auf die einzigartigen Steinwerte und die Wortliste dieses Spiels abgestimmt sind. Wordle-Solver grenzen die tägliche Antwort mit deinen grünen, gelben und grauen Hinweisen ein, während Kreuzworträtsel-Solver fehlende Felder aus der Hinweislänge und den bereits bekannten Buchstaben füllen.",
          "Auch Rätselliebhaber kommen auf ihre Kosten. Unser Anagramm-Solver und Wort-Unscrambler machen kurzen Prozess mit Zeitungsrätseln und app-basierten Buchstabenspielen. Boggle- und Text Twist-Solver graben jedes versteckte Wort aus einem Raster oder Salat aus, und der Hangman-Helfer schlägt die klügsten nächsten Buchstaben vor, sodass dir selten die Versuche ausgehen.",
          "Da die Plattform ständig wächst, erweitert sich die Liste der unterstützten Spiele und Rätsel immer weiter. Wenn es ein beliebtes Wortspiel gibt, das du gern spielst, ist die Chance sehr groß, dass wir bereits einen speziellen Helfer dafür haben – und falls nicht, ist er wahrscheinlich schon auf dem Weg.",
        ],
      },
      {
        heading: "Warum unsere Wort-Tools nutzen",
        paragraphs: [
          "Es gibt viele Wort-Tools online, aber wenige verbinden Genauigkeit, Geschwindigkeit und ein wirklich angenehmes Erlebnis so wie unsere. Unsere Wörterbücher sind groß und gut gepflegt, unser Abgleich ist präzise und unsere Oberfläche ist darauf ausgelegt, dich mit möglichst wenigen Tipps zur Antwort zu bringen. Keine verwirrenden Menüs, aufdringlichen Unterbrechungen oder langsam ladenden Seiten stehen zwischen dir und dem Wort, das du brauchst.",
          "Alles ist mobil zuerst und blitzschnell, sodass sich die Tools auf deinem Handy genauso gut anfühlen wie auf einem Desktop. Das Design ist modern und gut lesbar, mit einem hellen und dunklen Modus, damit du zu jeder Tageszeit bequem spielen kannst. Und weil jedes Tool kostenlos ist und kein Konto erfordert, kannst du direkt loslegen.",
          "Uns ist auch wichtig, dir beim Lernen zu helfen, nicht nur beim Gewinnen. Neben den Antworten zeigen unsere Tools nützlichen Kontext – Definitionen, Punktzahlen, Silben und verwandte Wörter – sodass dich jede Suche ein bisschen sprachgewandter macht als zuvor.",
        ],
      },
      {
        heading: "Spieltipps und praktische Strategien",
        paragraphs: [
          "So läuft eine typische Suche ab. Angenommen, dein Scrabble-Rack lautet R, A, T, I, O, N und S. Gib diese sieben Buchstaben in den Wort-Unscrambler ein, wähle das Scrabble-Wörterbuch, und du siehst sofort hochwertige Züge – einschließlich des Sieben-Buchstaben-Bingos, das einen Fünfzig-Punkte-Bonus bringt. Festgefahren bei einem Kreuzworträtsel-Hinweis mit fünf Buchstaben und einem T im dritten Feld? Gib das Muster ??T?? ein, und der Solver liefert jedes passende Wort zurück.",
          "Ein paar praktische Tipps bringen viel. Lerne zuerst die kurzen Zwei- und Drei-Buchstaben-Wörter; sie sind die Geheimwaffe der besten Scrabble-Spieler, um Züge zu verbinden und Punkte aus engen Brettern zu quetschen. Behalte hochwertige Steine wie Q, Z, X und J im Auge und merke dir die Handvoll Q-ohne-U-Wörter, die ein festgefahrenes Rack retten können. In Wordle beginne mit einem Tipp, der reich an häufigen Vokalen und Konsonanten ist, um so viele Möglichkeiten wie möglich auszuschließen, bevor du dich festlegst.",
          "Für Autoren: Nutze die Synonym- und Antonym-Tools, um deine Sprache zu variieren und Wiederholungen zu vermeiden, und stütze dich auf die Reim- und Silben-Tools, damit Poesie und Liedtexte fließen. Kleine Gewohnheiten wie diese, über die Zeit wiederholt, verwandeln gelegentliches Spielen in echte Fähigkeit und machen dich zu einem schärferen, selbstbewussteren Englisch-Nutzer.",
        ],
      },
    ],
    faqEyebrow: "Fragen & Antworten",
    faqTitle: "Häufig gestellte Fragen",
    faqDescription: "Alles, was du über die Nutzung von AllWordTools wissen möchtest.",
    faqs: [
      { question: "Was sind Wort-Tools und wie funktionieren sie?", answer: "Wort-Tools sind smarte Online-Hilfen, die Buchstaben, Muster und Wörterbücher analysieren, um dir zu helfen, Wortspiele zu spielen, deinen Wortschatz zu erweitern und besser zu schreiben. Du gibst die Buchstaben ein, die du hast, oder das Muster, das du suchst, und das Tool durchsucht sofort eine große, kuratierte Wortliste, um jeden gültigen Treffer zurückzugeben – meist sortiert nach Länge, Punkten oder Relevanz. Alles läuft in deinem Browser in einem Bruchteil einer Sekunde, sodass es nichts zu installieren gibt und kein Warten nötig ist." },
      { question: "Welche Wortspiele unterstützen diese Tools?", answer: "Unsere Helfer sind für die beliebtesten Wortspiele der Welt optimiert, darunter Scrabble, Words With Friends, Wordle, Kreuzworträtsel, Boggle, Hangman, Text Twist und unzählige Anagramm- und Buchstabensalat-Rätsel aus Zeitungen und Apps. Jedes Spiel nutzt sein eigenes Wörterbuch und seine eigenen Punkteregeln, deshalb passen wir die Ergebnisse an – Scrabble nutzt turnierartige Wortlisten, während Wordle sich auf gültige Fünf-Buchstaben-Antworten konzentriert." },
      { question: "Gilt die Nutzung eines Wort-Unscramblers als Schummeln?", answer: "Wort-Tools sind am besten als Lern- und Übungshilfen zu verstehen, nicht als Mittel zum Schummeln. Millionen Spieler nutzen sie, um neue Wörter zu lernen, zu verstehen, warum ein Zug gültig ist, ihre Strategie zu verbessern und freundschaftliche Streitigkeiten zu klären. In lockeren Spielen unter Freunden oder beim alleinigen Üben sind sie eine fantastische Möglichkeit, besser zu werden. Ob du sie in einem wettbewerbsorientierten Umfeld nutzt, ist immer deine Entscheidung und hängt von den Regeln ab, die du mit anderen Spielern vereinbart hast." },
      { question: "Sind die Wort-Tools kostenlos nutzbar?", answer: "Ja. Jedes Tool auf der Plattform ist völlig kostenlos nutzbar, ohne Anmeldung. Du kannst Wörter entwirren, Anagramme lösen, Reime finden und mehr, so oft du willst. Wir halten das Erlebnis schnell und leicht, damit du auf jedem Gerät sofort Antworten erhältst." },
      { question: "Wie genau sind die Ergebnisse?", answer: "Wir nutzen große, regelmäßig gepflegte Wörterbücher auf Basis anerkannter Wortlisten, sodass die Ergebnisse für das von dir gewählte Spiel sehr genau sind. Da verschiedene Spiele verschiedene Wörter akzeptieren, lassen wir dich das richtige Wörterbuch für Scrabble, Words With Friends und allgemeines Englisch wählen. Wenn dir jemals ein Wort fehl am Platz vorkommt, denke daran, dass Spielwörterbücher manchmal obskure, aber offiziell gültige Wörter enthalten." },
      { question: "Kann ich nach Wörtern nach Länge suchen?", answer: "Absolut. Viele Tools lassen dich nach exakter Länge filtern – zum Beispiel nur Fünf-Buchstaben-Wörter für Wordle oder Sieben-Buchstaben-Wörter für die Jagd nach einem Scrabble-Bingo. Du kannst Längenfilter mit Anfangsbuchstaben, Endbuchstaben und enthaltenen Buchstaben kombinieren, um genau die Wörter zu finden, die du brauchst." },
      { question: "Was ist der Unterschied zwischen einem Anagramm-Solver und einem Wort-Unscrambler?", answer: "Ein Wort-Unscrambler findet alle gültigen Wörter, die du aus einem Buchstabensatz bilden kannst, einschließlich kürzerer Wörter, die nur einige davon nutzen. Ein Anagramm-Solver konzentriert sich auf Umstellungen, die jeden Buchstaben nutzen, um ein neues Wort oder eine neue Phrase zu bilden. In der Praxis überschneiden sich beide stark, und unsere Tools zeigen sowohl Teil- als auch Volllängen-Ergebnisse, sodass du nie einen Zug verpasst." },
      { question: "Wie nutze ich Platzhalter oder Blanko-Steine?", answer: "Wenn du in Scrabble oder Words With Friends einen Blanko-Stein hast oder einfach einen Buchstaben nicht kennst, kannst du einen Platzhalter – meist ein Fragezeichen oder Sternchen – für jeden beliebigen Buchstaben verwenden. Unsere Solver erweitern jeden Platzhalter über das gesamte Alphabet und liefern jedes passende Wort zurück, wobei klar gezeigt wird, welche Buchstaben die Lücken gefüllt haben." },
      { question: "Können diese Tools mir helfen, meinen Wortschatz zu verbessern?", answer: "Definitiv. Über das Gewinnen von Spielen hinaus sind Wort-Tools ein starker Wortschatz-Aufbauer. Neue Wörter zu entdecken, ihre Definitionen zu sehen, Synonyme und Antonyme zu erkunden und zu lernen, welche Buchstabenkombinationen gültig sind, stärkt alles deine Sprachfähigkeiten. Viele Schüler, Autoren, Lehrer und Sprachlerner nutzen sie täglich, um Rechtschreibung zu lernen und ihren Wortschatz zu erweitern." },
      { question: "Funktionieren die Tools auf Handys und Tablets?", answer: "Ja. Die gesamte Plattform ist mobil zuerst gebaut und vollständig responsiv, sodass jedes Tool auf Handys, Tablets, Laptops und Desktops wunderbar funktioniert. Das Layout passt sich deinem Bildschirm an, Buttons bleiben leicht antippbar, und Ergebnisse laden schnell, selbst bei langsameren Verbindungen." },
      { question: "Wie funktioniert der Wordle-Solver?", answer: "Der Wordle-Solver grenzt die möglichen Antworten anhand der Hinweise ein, die du bereits hast. Du gibst die Buchstaben ein, die korrekt sind und an der richtigen Position stehen, die Buchstaben, die vorhanden, aber falsch platziert sind, und die Buchstaben, die du ausgeschlossen hast. Das Tool filtert dann die Fünf-Buchstaben-Wortliste, um die verbleibenden Kandidaten zu zeigen, und schlägt starke nächste Tipps vor, die die meisten Möglichkeiten ausschließen." },
      { question: "Kann ich Reimwörter für Songs und Poesie finden?", answer: "Ja. Unser Reimwörter-Tool findet perfekte Reime, nahe Reime und Wörter mit ähnlichen Klängen, ideal für Songwriting, Poesie, Rap-Texte und Grußkarten. Du kannst die Ergebnisse nach Silbenzahl und Betonungsmuster durchsuchen, damit deine Zeilen natürlich fließen." },
      { question: "Wofür wird ein Silbenzähler verwendet?", answer: "Ein Silbenzähler sagt dir, wie viele Silben ein Wort oder ein ganzer Textabschnitt hat. Er ist unschätzbar wertvoll, um Haikus und andere strukturierte Poesie zu schreiben, die Lesbarkeit zu prüfen, Phonik zu lehren und Texte auf eine Melodie zu passen. Füge einfach deinen Text ein, und der Zähler zerlegt jedes Wort sofort." },
      { question: "Wie wird das punktstärkste Scrabble-Wort berechnet?", answer: "Unser Scrabble-Helfer weist jedem Buchstaben seinen offiziellen Punktwert zu und summiert dann die Steine für jedes gültige Wort, das du aus deinem Rack buchstabieren kannst. Die Ergebnisse sind von der höchsten zur niedrigsten Punktzahl sortiert, sodass du den größten Zug auf einen Blick erkennst. Wo du das Wort auf dem Brett platzierst – doppelte und dreifache Felder zu treffen – kann die Punktzahl noch weiter steigern." },
      { question: "Werdet ihr weitere Wort-Tools hinzufügen?", answer: "Ja, ständig. Wir bauen die umfassendste Sammlung englischer Wort-Tools überhaupt auf, und neue Solver, Generatoren und Sprachhelfer werden regelmäßig hinzugefügt. Setze ein Lesezeichen auf die Seite und schaue dir den Bereich Neueste Tools auf der Startseite an, um zu sehen, was gerade gestartet ist." },
    ],
  },
  pt: {
    benefits: [
      { title: "Resultados instantâneos", description: "As respostas aparecem no momento em que você pressiona pesquisar — sem espera, sem recarregar." },
      { title: "Aprenda enquanto joga", description: "Definições, pontuações e palavras relacionadas ajudam você a ampliar seu vocabulário naturalmente." },
      { title: "Dicionários precisos", description: "Listas de palavras grandes e bem mantidas, ajustadas para cada jogo que você joga." },
      { title: "Mobile em primeiro lugar", description: "Uma experiência rápida e responsiva em celulares, tablets e desktops." },
      { title: "Sempre grátis", description: "Todas as ferramentas são 100% gratuitas, sem cadastro e sem limites." },
      { title: "Em constante crescimento", description: "Novos solucionadores e ferramentas de idioma adicionados regularmente." },
    ],
    guideEyebrow: "O guia completo",
    guideTitle: "Tudo o que você precisa saber sobre ferramentas de palavras",
    guideSections: [
      {
        heading: "O que são ferramentas de palavras?",
        paragraphs: [
          "As ferramentas de palavras são utilitários online criados para ajudar você a jogar jogos de palavras, resolver quebra-cabeças e melhorar seu domínio do inglês. Em essência, elas pegam as letras, padrões ou pistas que você já tem e pesquisam em dicionários enormes e cuidadosamente mantidos para revelar todas as palavras possíveis que se encaixam. Com um único clique, você pode desembaralhar um conjunto de letras, encontrar todos os anagramas, descobrir palavras que começam ou terminam com uma sequência específica ou reduzir a resposta do Wordle de hoje.",
          "O que torna as ferramentas modernas tão poderosas é a velocidade e a abrangência. Em vez de folhear um dicionário de papel ou adivinhar, você obtém uma lista completa e classificada de palavras válidas em uma fração de segundo. Os resultados geralmente são organizados por comprimento e pontuação, para que as jogadas mais úteis apareçam no topo. Seja você um jogador casual, um entusiasta competitivo de Scrabble, um devoto de palavras cruzadas, um escritor, um professor ou um estudante de idiomas, há uma ferramenta aqui feita exatamente para o que você precisa.",
          "Nossa plataforma reúne 92 dessas ferramentas em 13 categorias muito bem organizadas. De solucionadores de palavras e ferramentas de letras a auxílios de escrita e ajudantes dedicados a jogos, cada utilitário compartilha a mesma experiência rápida, amigável e acessível — sem downloads, sem cadastros e sem bagunça.",
        ],
      },
      {
        heading: "Os benefícios de usar ferramentas de palavras",
        paragraphs: [
          "O benefício mais óbvio é ganhar mais jogos. Quando você pode ver instantaneamente a jogada de maior pontuação do seu suporte de Scrabble ou os últimos candidatos no Wordle, você passa menos tempo travado e mais tempo aproveitando o jogo. Mas as vantagens vão muito além de uma única partida.",
          "As ferramentas de palavras são excelentes auxílios de aprendizado. Toda vez que você desembaralha letras ou explora sinônimos, você encontra palavras novas, reforça a ortografia e entende quais combinações de letras são válidas em inglês. Alunos se preparando para provas, escritores em busca da palavra perfeita e aprendizes construindo fluência usam essas ferramentas para ampliar seu vocabulário de uma forma fácil e até divertida.",
          "Elas também são ótimas para resolver disputas amigáveis. Isso é realmente uma palavra? Rima? Quantas sílabas tem? Em vez de discutir, você obtém uma resposta instantânea e verificável gerada a partir de listas de palavras selecionadas. E como tudo é grátis e funciona em qualquer dispositivo, a ajuda está sempre a um toque de distância, esteja você no sofá, no trem ou na sua mesa.",
        ],
      },
      {
        heading: "Como funcionam as ferramentas de palavras",
        paragraphs: [
          "Por trás de cada ferramenta há um dicionário grande e selecionado e um mecanismo de correspondência rápido. Quando você digita suas letras ou padrão, a ferramenta compara sua entrada com toda a lista de palavras, aplicando as regras do jogo ou da pesquisa que você escolheu. Para um desembaralhador de palavras, isso significa encontrar todas as combinações das suas letras que formam uma palavra válida. Para uma pesquisa por padrão, significa combinar suas letras conhecidas e curingas com palavras do formato certo.",
          "Jogos diferentes aceitam palavras diferentes, por isso escolher o dicionário correto importa. Scrabble e Words With Friends usam suas próprias listas de palavras e valores de letras, enquanto o Wordle se concentra em respostas válidas de cinco letras. Nossas ferramentas permitem escolher o modo certo para que os resultados sempre reflitam o jogo que você está realmente jogando.",
          "Depois que as correspondências são encontradas, os resultados são pontuados e classificados. Ajudantes de jogos classificam jogadas por pontos; ferramentas de letras classificam por comprimento ou ordem alfabética; ferramentas de escrita agrupam resultados por significado, som ou número de sílabas. O trabalho pesado acontece instantaneamente e de forma privada no seu navegador, por isso as respostas aparecem no momento em que você pressiona pesquisar.",
        ],
      },
      {
        heading: "Quais jogos e quebra-cabeças são suportados",
        paragraphs: [
          "Oferecemos suporte aos jogos de palavras que as pessoas mais amam. Jogadores de Scrabble podem encontrar as jogadas de maior pontuação usando listas de palavras em estilo torneio e valores precisos de peças. Fãs de Words With Friends recebem jogadas ajustadas aos valores de peças e à lista de palavras únicos desse jogo. Solucionadores de Wordle reduzem a resposta diária usando suas pistas verdes, amarelas e cinzas, enquanto solucionadores de palavras cruzadas preenchem os quadrados que faltam a partir do comprimento da pista e das letras que você já conhece.",
          "Os amantes de quebra-cabeças também estão cobertos. Nosso solucionador de anagramas e desembaralhador de palavras resolvem rapidamente os embaralhamentos de jornais e os jogos de letras de aplicativos. Solucionadores de Boggle e Text Twist extraem cada palavra oculta de uma grade ou embaralhamento, e o ajudante de Hangman sugere as letras mais inteligentes para adivinhar a seguir, para que você raramente fique sem tentativas.",
          "Como a plataforma está sempre crescendo, a lista de jogos e quebra-cabeças suportados continua se expandindo. Se há um jogo de palavras popular que você gosta, há uma chance muito boa de já termos um ajudante dedicado para ele — e, se não, provavelmente está a caminho.",
        ],
      },
      {
        heading: "Por que usar nossas ferramentas de palavras",
        paragraphs: [
          "Há muitas ferramentas de palavras online, mas poucas combinam precisão, velocidade e uma experiência genuinamente agradável como as nossas. Nossos dicionários são grandes e bem mantidos, nossa correspondência é precisa e nossa interface foi projetada para levar você à resposta com o menor número possível de toques. Não há menus confusos, interrupções intrusivas ou páginas de carregamento lento entre você e a palavra de que precisa.",
          "Tudo é mobile em primeiro lugar e extremamente rápido, então as ferramentas são tão boas no seu celular quanto em um desktop. O design é moderno e legível, com modo claro e escuro para que você jogue confortavelmente a qualquer hora do dia. E como cada ferramenta é grátis e não exige conta, você pode começar direto.",
          "Também nos importamos em ajudar você a aprender, não apenas a ganhar. Ao lado das respostas, nossas ferramentas exibem contexto útil — definições, pontuações, sílabas e palavras relacionadas — para que cada pesquisa deixe você um pouco mais fluente do que antes.",
        ],
      },
      {
        heading: "Dicas de jogo e estratégias práticas",
        paragraphs: [
          "É assim que uma pesquisa típica se desenrola. Suponha que seu suporte de Scrabble tenha R, A, T, I, O, N e S. Coloque essas sete letras no desembaralhador de palavras, escolha o dicionário de Scrabble e você verá instantaneamente jogadas de alto valor — incluindo o bingo de sete letras que rende um bônus de cinquenta pontos. Travado em uma pista de palavras cruzadas de cinco letras com um T no terceiro quadrado? Digite o padrão ??T?? e o solucionador retornará todas as palavras correspondentes.",
          "Algumas dicas práticas fazem muita diferença. Aprenda primeiro as palavras curtas de duas e três letras; elas são a arma secreta dos melhores jogadores de Scrabble para conectar jogadas e extrair pontos de tabuleiros apertados. Fique de olho em peças de alto valor como Q, Z, X e J, e lembre-se do punhado de palavras com Q sem U que podem salvar um suporte travado. No Wordle, comece com um palpite rico em vogais e consoantes comuns para eliminar o maior número possível de possibilidades antes de se comprometer.",
          "Para escritores, use as ferramentas de sinônimos e antônimos para variar sua linguagem e evitar repetições, e apoie-se nas ferramentas de rima e sílabas para manter poesia e letras fluindo. Pequenos hábitos como esses, repetidos ao longo do tempo, transformam o jogo casual em habilidade real e tornam você um usuário de inglês mais afiado e confiante.",
        ],
      },
    ],
    faqEyebrow: "Perguntas e respostas",
    faqTitle: "Perguntas frequentes",
    faqDescription: "Tudo o que você pode querer saber sobre como usar o AllWordTools.",
    faqs: [
      { question: "O que são ferramentas de palavras e como funcionam?", answer: "As ferramentas de palavras são utilitários online inteligentes que analisam letras, padrões e dicionários para ajudar você a jogar jogos de palavras, expandir seu vocabulário e escrever melhor. Você digita as letras que tem ou o padrão que procura, e a ferramenta pesquisa instantaneamente uma lista de palavras grande e selecionada para retornar todas as correspondências válidas — geralmente classificadas por comprimento, pontos ou relevância. Tudo roda no seu navegador em uma fração de segundo, então não há nada para instalar nem espera." },
      { question: "Quais jogos de palavras essas ferramentas suportam?", answer: "Nossos ajudantes são otimizados para os jogos de palavras mais populares do mundo, incluindo Scrabble, Words With Friends, Wordle, palavras cruzadas, Boggle, Hangman, Text Twist e inúmeros quebra-cabeças de anagramas e embaralhamentos encontrados em jornais e aplicativos. Cada jogo usa seu próprio dicionário e regras de pontuação, por isso adaptamos os resultados — o Scrabble usa listas de palavras em estilo torneio, enquanto o Wordle se concentra em respostas válidas de cinco letras." },
      { question: "Usar um desembaralhador de palavras é considerado trapaça?", answer: "É melhor pensar nas ferramentas de palavras como auxílios de aprendizado e prática, e não como uma forma de trapacear. Milhões de jogadores as usam para estudar palavras novas, entender por que uma jogada é válida, melhorar sua estratégia e resolver disputas amigáveis. Em jogos casuais entre amigos, ou quando você pratica sozinho, elas são uma forma fantástica de melhorar. Usá-las ou não em um ambiente competitivo é sempre sua escolha e depende das regras que você combinou com os outros jogadores." },
      { question: "As ferramentas de palavras são gratuitas?", answer: "Sim. Todas as ferramentas da plataforma são completamente gratuitas, sem necessidade de cadastro. Você pode desembaralhar palavras, resolver anagramas, encontrar rimas e muito mais quantas vezes quiser. Mantemos a experiência rápida e leve para que você obtenha respostas instantaneamente em qualquer dispositivo." },
      { question: "Quão precisos são os resultados?", answer: "Usamos dicionários grandes e mantidos regularmente com base em listas de palavras reconhecidas, então os resultados são altamente precisos para o jogo que você selecionar. Como jogos diferentes aceitam palavras diferentes, permitimos que você escolha o dicionário certo para Scrabble, Words With Friends e inglês geral. Se você alguma vez vir uma palavra que parece fora de lugar, lembre-se de que os dicionários de jogos às vezes incluem palavras obscuras, mas oficialmente válidas." },
      { question: "Posso pesquisar palavras por comprimento?", answer: "Com certeza. Muitas ferramentas permitem filtrar por comprimento exato — por exemplo, apenas palavras de cinco letras para o Wordle, ou palavras de sete letras para buscar um bingo no Scrabble. Você pode combinar filtros de comprimento com letras iniciais, letras finais e letras contidas para chegar exatamente às palavras de que precisa." },
      { question: "Qual é a diferença entre um solucionador de anagramas e um desembaralhador de palavras?", answer: "Um desembaralhador de palavras encontra todas as palavras válidas que você pode formar a partir de um conjunto de letras, incluindo palavras mais curtas que usam apenas algumas delas. Um solucionador de anagramas se concentra em rearranjos que usam todas as letras para formar uma nova palavra ou frase. Na prática, os dois se sobrepõem bastante, e nossas ferramentas mostram resultados parciais e de comprimento total para que você nunca perca uma jogada." },
      { question: "Como uso curingas ou peças em branco?", answer: "Quando você tem uma peça em branco no Scrabble ou no Words With Friends, ou simplesmente não conhece uma letra, pode usar um curinga — geralmente um ponto de interrogação ou asterisco — para representar qualquer letra. Nossos solucionadores expandem cada curinga por todo o alfabeto e retornam todas as palavras que se encaixam, mostrando claramente quais letras preencheram os espaços." },
      { question: "Essas ferramentas podem me ajudar a melhorar meu vocabulário?", answer: "Definitivamente. Além de ganhar jogos, as ferramentas de palavras são um poderoso construtor de vocabulário. Descobrir palavras novas, ver suas definições, explorar sinônimos e antônimos e aprender quais combinações de letras são válidas reforçam suas habilidades linguísticas. Muitos alunos, escritores, professores e estudantes de idiomas as usam diariamente para estudar ortografia e expandir seu vocabulário." },
      { question: "As ferramentas funcionam em celulares e tablets?", answer: "Sim. Toda a plataforma foi construída com mobile em primeiro lugar e é totalmente responsiva, então cada ferramenta funciona muito bem em celulares, tablets, laptops e desktops. O layout se adapta à sua tela, os botões permanecem fáceis de tocar e os resultados carregam rapidamente, mesmo em conexões mais lentas." },
      { question: "Como funciona o solucionador de Wordle?", answer: "O solucionador de Wordle reduz as possíveis respostas com base nas pistas que você já tem. Você insere as letras que sabe que estão corretas e na posição certa, as letras que estão presentes, mas fora do lugar, e as letras que você descartou. A ferramenta então filtra a lista de palavras de cinco letras para revelar os candidatos restantes e sugere palpites seguintes fortes que eliminam o maior número de possibilidades." },
      { question: "Posso encontrar palavras que rimam para músicas e poesia?", answer: "Sim. Nossa ferramenta de palavras que rimam encontra rimas perfeitas, rimas próximas e palavras com sons semelhantes, ideal para composição de músicas, poesia, letras de rap e cartões de felicitação. Você pode navegar pelos resultados por número de sílabas e padrão de acento para manter seus versos fluindo naturalmente." },
      { question: "Para que serve um contador de sílabas?", answer: "Um contador de sílabas diz quantas sílabas há em uma palavra ou em uma passagem inteira de texto. É inestimável para escrever haicais e outra poesia estruturada, verificar a legibilidade, ensinar fonética e ajustar letras a uma melodia. Basta colar seu texto e o contador decompõe cada palavra instantaneamente." },
      { question: "Como é calculada a palavra de Scrabble com maior pontuação?", answer: "Nosso ajudante de Scrabble atribui a cada letra seu valor oficial em pontos e depois soma as peças de cada palavra válida que você pode formar a partir do seu suporte. Os resultados são classificados da maior para a menor pontuação, para que você veja a maior jogada de relance. Onde você coloca a palavra no tabuleiro — atingindo quadrados duplos e triplos — pode aumentar ainda mais a pontuação." },
      { question: "Vocês vão adicionar mais ferramentas de palavras?", answer: "Sim, constantemente. Estamos construindo a coleção mais abrangente de ferramentas de palavras em inglês em qualquer lugar, e novos solucionadores, geradores e ajudantes de idioma são adicionados regularmente. Marque o site como favorito e confira a seção Ferramentas Mais Recentes na página inicial para ver o que acabou de ser lançado." },
    ],
  },
  id: {
    benefits: [
      { title: "Hasil instan", description: "Jawaban muncul saat Anda menekan cari — tanpa menunggu, tanpa memuat ulang." },
      { title: "Belajar sambil bermain", description: "Definisi, skor, dan kata terkait membantu Anda membangun kosakata secara alami." },
      { title: "Kamus akurat", description: "Daftar kata yang besar dan terawat baik, disesuaikan untuk setiap permainan yang Anda mainkan." },
      { title: "Mengutamakan seluler", description: "Pengalaman yang cepat dan responsif di ponsel, tablet, dan desktop." },
      { title: "Selalu gratis", description: "Setiap alat 100% gratis tanpa pendaftaran dan tanpa batas." },
      { title: "Terus berkembang", description: "Pemecah dan alat bahasa baru ditambahkan secara berkala." },
    ],
    guideEyebrow: "Panduan lengkap",
    guideTitle: "Semua yang perlu Anda ketahui tentang alat kata",
    guideSections: [
      {
        heading: "Apa itu alat kata?",
        paragraphs: [
          "Alat kata adalah utilitas online yang dirancang untuk membantu Anda bermain permainan kata, memecahkan teka-teki, dan meningkatkan penguasaan bahasa Inggris Anda. Pada intinya, alat ini mengambil huruf, pola, atau petunjuk yang sudah Anda miliki dan mencari di kamus yang sangat besar dan terawat dengan cermat untuk mengungkapkan setiap kata yang mungkin cocok. Dengan satu klik, Anda dapat menguraikan campuran huruf, menemukan semua anagram, menemukan kata yang dimulai atau diakhiri dengan rangkaian tertentu, atau mempersempit jawaban Wordle hari ini.",
          "Yang membuat alat kata modern sangat kuat adalah kecepatan dan keluasannya. Alih-alih membolak-balik kamus kertas atau menebak, Anda mendapatkan daftar lengkap kata valid yang terurut dalam waktu sepersekian detik. Hasil biasanya diorganisasikan berdasarkan panjang dan skor, sehingga langkah paling berguna langsung muncul di atas. Baik Anda pemain kasual, penggemar Scrabble kompetitif, pecinta teka-teki silang, penulis, guru, atau pembelajar bahasa, ada alat di sini yang dibuat tepat untuk kebutuhan Anda.",
          "Platform kami menyatukan 92 alat ini dalam 13 kategori yang terorganisasi dengan indah. Dari pemecah kata dan alat huruf hingga bantuan menulis dan pembantu permainan khusus, setiap utilitas berbagi pengalaman yang sama cepat, ramah, dan mudah diakses — tanpa unduhan, tanpa pendaftaran, dan tanpa kekacauan.",
        ],
      },
      {
        heading: "Manfaat menggunakan alat kata",
        paragraphs: [
          "Manfaat yang paling jelas adalah memenangkan lebih banyak permainan. Ketika Anda dapat langsung melihat langkah dengan skor tertinggi dari rak Scrabble Anda atau beberapa kandidat terakhir di Wordle, Anda menghabiskan lebih sedikit waktu terjebak dan lebih banyak waktu menikmati permainan. Tetapi keuntungannya jauh melampaui satu pertandingan.",
          "Alat kata adalah bantuan belajar yang luar biasa. Setiap kali Anda menguraikan huruf atau menjelajahi sinonim, Anda menemukan kata-kata baru, memperkuat ejaan, dan memahami kombinasi huruf mana yang valid dalam bahasa Inggris. Siswa yang bersiap untuk ujian, penulis yang mencari kata sempurna, dan pembelajar yang membangun kefasihan semuanya menggunakan alat ini untuk mengembangkan kosakata mereka dengan cara yang terasa mudah dan bahkan menyenangkan.",
          "Alat ini juga bagus untuk menyelesaikan perselisihan ramah. Apakah itu benar-benar sebuah kata? Apakah berima? Berapa suku katanya? Alih-alih berdebat, Anda mendapatkan jawaban instan yang dapat diverifikasi yang dihasilkan dari daftar kata yang dikurasi. Dan karena semuanya gratis dan berfungsi di perangkat apa pun, bantuan selalu hanya sejauh satu ketukan, baik Anda di sofa, di kereta, maupun di meja Anda.",
        ],
      },
      {
        heading: "Cara kerja alat kata",
        paragraphs: [
          "Di balik setiap alat terdapat kamus besar yang dikurasi dan mesin pencocokan yang cepat. Ketika Anda mengetik huruf atau pola Anda, alat membandingkan masukan Anda dengan seluruh daftar kata, menerapkan aturan permainan atau pencarian yang Anda pilih. Untuk pengurai kata, itu berarti menemukan setiap kombinasi huruf Anda yang mengeja kata valid. Untuk pencarian pola, itu berarti mencocokkan huruf yang Anda ketahui dan wildcard dengan kata-kata berbentuk tepat.",
          "Permainan yang berbeda menerima kata yang berbeda, jadi memilih kamus yang benar itu penting. Scrabble dan Words With Friends masing-masing menggunakan daftar kata dan nilai huruf khasnya sendiri, sementara Wordle berfokus pada jawaban lima huruf yang valid. Alat kami memungkinkan Anda memilih mode yang tepat sehingga hasil selalu mencerminkan permainan yang sebenarnya Anda mainkan.",
          "Setelah kecocokan ditemukan, hasil diberi skor dan diurutkan. Pembantu permainan kata mengurutkan langkah berdasarkan poin; alat huruf mengurutkan berdasarkan panjang atau urutan alfabet; alat menulis mengelompokkan hasil berdasarkan makna, bunyi, atau jumlah suku kata. Pekerjaan berat terjadi secara instan dan pribadi di browser Anda, itulah sebabnya jawaban muncul saat Anda menekan cari.",
        ],
      },
      {
        heading: "Permainan dan teka-teki apa yang didukung",
        paragraphs: [
          "Kami mendukung permainan kata yang paling disukai orang. Pemain Scrabble dapat menemukan langkah dengan skor tertinggi menggunakan daftar kata bergaya turnamen dan nilai ubin yang presisi. Penggemar Words With Friends mendapatkan langkah yang disesuaikan dengan nilai ubin dan daftar kata unik permainan itu. Pemecah Wordle mempersempit jawaban harian menggunakan petunjuk hijau, kuning, dan abu-abu Anda, sementara pemecah teka-teki silang mengisi kotak yang hilang dari panjang petunjuk dan huruf yang sudah Anda ketahui.",
          "Pecinta teka-teki juga tercakup. Pemecah anagram dan pengurai kata kami menyelesaikan campuran koran dan permainan huruf berbasis aplikasi dengan cepat. Pemecah Boggle dan Text Twist menggali setiap kata tersembunyi dari grid atau acakan, dan pembantu Hangman menyarankan huruf terpintar untuk ditebak berikutnya sehingga Anda jarang kehabisan kesempatan.",
          "Karena platform selalu berkembang, daftar permainan dan teka-teki yang didukung terus meluas. Jika ada permainan kata populer yang Anda nikmati, ada kemungkinan besar kami sudah memiliki pembantu khusus untuknya — dan jika belum, kemungkinan sedang dalam perjalanan.",
        ],
      },
      {
        heading: "Mengapa menggunakan alat kata kami",
        paragraphs: [
          "Ada banyak alat kata online, tetapi sedikit yang menggabungkan akurasi, kecepatan, dan pengalaman yang benar-benar menyenangkan seperti milik kami. Kamus kami besar dan terawat baik, pencocokan kami presisi, dan antarmuka kami dirancang untuk membawa Anda ke jawaban dengan ketukan sesedikit mungkin. Tidak ada menu yang membingungkan, gangguan yang mengganggu, atau halaman yang lambat dimuat di antara Anda dan kata yang Anda butuhkan.",
          "Semuanya mengutamakan seluler dan sangat cepat, sehingga alat terasa sama baiknya di ponsel Anda seperti di desktop. Desainnya modern dan mudah dibaca, dengan mode terang dan gelap sehingga Anda dapat bermain dengan nyaman kapan saja. Dan karena setiap alat gratis tanpa memerlukan akun, Anda dapat langsung masuk.",
          "Kami juga peduli untuk membantu Anda belajar, bukan hanya menang. Di samping jawaban, alat kami menampilkan konteks yang berguna — definisi, skor, suku kata, dan kata terkait — sehingga setiap pencarian membuat Anda sedikit lebih fasih dari sebelumnya.",
        ],
      },
      {
        heading: "Tips bermain dan strategi praktis",
        paragraphs: [
          "Beginilah pencarian tipikal berlangsung. Misalkan rak Scrabble Anda berisi R, A, T, I, O, N, dan S. Masukkan tujuh huruf itu ke pengurai kata, pilih kamus Scrabble, dan Anda akan langsung melihat langkah bernilai tinggi — termasuk bingo tujuh huruf yang menghasilkan bonus lima puluh poin. Terjebak pada petunjuk teka-teki silang lima huruf dengan T di kotak ketiga? Masukkan pola ??T?? dan pemecah akan mengembalikan setiap kata yang cocok.",
          "Beberapa tips praktis sangat membantu. Pelajari kata-kata pendek dua dan tiga huruf terlebih dahulu; itu adalah senjata rahasia pemain Scrabble terbaik untuk menghubungkan langkah dan memeras poin dari papan yang sempit. Perhatikan ubin bernilai tinggi seperti Q, Z, X, dan J, dan ingat segelintir kata Q-tanpa-U yang dapat menyelamatkan rak yang terjebak. Di Wordle, mulailah dengan tebakan yang kaya vokal dan konsonan umum untuk menghilangkan sebanyak mungkin kemungkinan sebelum Anda berkomitmen.",
          "Untuk penulis, gunakan alat sinonim dan antonim untuk memvariasikan bahasa Anda dan menghindari pengulangan, dan andalkan alat rima dan suku kata untuk menjaga puisi dan lirik tetap mengalir. Kebiasaan kecil seperti ini, diulang dari waktu ke waktu, mengubah permainan kasual menjadi keterampilan nyata dan membuat Anda menjadi pengguna bahasa Inggris yang lebih tajam dan lebih percaya diri.",
        ],
      },
    ],
    faqEyebrow: "Tanya jawab",
    faqTitle: "Pertanyaan yang sering diajukan",
    faqDescription: "Semua yang mungkin ingin Anda ketahui tentang menggunakan AllWordTools.",
    faqs: [
      { question: "Apa itu alat kata dan bagaimana cara kerjanya?", answer: "Alat kata adalah utilitas online pintar yang menganalisis huruf, pola, dan kamus untuk membantu Anda bermain permainan kata, memperluas kosakata, dan menulis lebih baik. Anda mengetik huruf yang Anda miliki atau pola yang Anda cari, dan alat langsung mencari di daftar kata besar yang dikurasi untuk mengembalikan setiap kecocokan valid — biasanya diurutkan berdasarkan panjang, poin, atau relevansi. Semuanya berjalan di browser Anda dalam sepersekian detik, jadi tidak ada yang perlu diinstal dan tidak ada penantian." },
      { question: "Permainan kata apa yang didukung alat ini?", answer: "Pembantu kami dioptimalkan untuk permainan kata paling populer di dunia, termasuk Scrabble, Words With Friends, Wordle, teka-teki silang, Boggle, Hangman, Text Twist, dan banyak teka-teki anagram dan jumble yang ditemukan di koran dan aplikasi. Setiap permainan menggunakan kamus dan aturan penilaiannya sendiri, jadi kami menyesuaikan hasil — Scrabble menggunakan daftar kata bergaya turnamen, sementara Wordle berfokus pada jawaban lima huruf yang valid." },
      { question: "Apakah menggunakan pengurai kata dianggap curang?", answer: "Alat kata paling baik dianggap sebagai bantuan belajar dan latihan daripada cara untuk curang. Jutaan pemain menggunakannya untuk mempelajari kata-kata baru, memahami mengapa suatu langkah valid, meningkatkan strategi mereka, dan menyelesaikan perselisihan ramah. Dalam permainan kasual di antara teman, atau saat Anda berlatih sendiri, alat ini adalah cara yang fantastis untuk menjadi lebih baik. Apakah akan menggunakannya dalam lingkungan kompetitif selalu merupakan pilihan Anda dan tergantung pada aturan yang telah Anda sepakati dengan pemain lain." },
      { question: "Apakah alat kata gratis digunakan?", answer: "Ya. Setiap alat di platform ini sepenuhnya gratis digunakan, tanpa perlu pendaftaran. Anda dapat menguraikan kata, memecahkan anagram, menemukan rima, dan banyak lagi sebanyak yang Anda suka. Kami menjaga pengalaman tetap cepat dan ringan sehingga Anda mendapatkan jawaban secara instan di perangkat apa pun." },
      { question: "Seberapa akurat hasilnya?", answer: "Kami menggunakan kamus besar yang dipelihara secara berkala berdasarkan daftar kata yang diakui, jadi hasilnya sangat akurat untuk permainan yang Anda pilih. Karena permainan yang berbeda menerima kata yang berbeda, kami memungkinkan Anda memilih kamus yang tepat untuk Scrabble, Words With Friends, dan bahasa Inggris umum. Jika Anda pernah melihat kata yang tampak tidak pada tempatnya, ingatlah bahwa kamus permainan terkadang menyertakan kata-kata yang tidak jelas tetapi secara resmi valid." },
      { question: "Dapatkah saya mencari kata berdasarkan panjang?", answer: "Tentu saja. Banyak alat memungkinkan Anda memfilter berdasarkan panjang yang tepat — misalnya, hanya kata lima huruf untuk Wordle, atau kata tujuh huruf untuk berburu bingo Scrabble. Anda dapat menggabungkan filter panjang dengan huruf awal, huruf akhir, dan huruf yang terkandung untuk menemukan tepat kata yang Anda butuhkan." },
      { question: "Apa perbedaan antara pemecah anagram dan pengurai kata?", answer: "Pengurai kata menemukan semua kata valid yang dapat Anda buat dari sekumpulan huruf, termasuk kata yang lebih pendek yang hanya menggunakan sebagian dari mereka. Pemecah anagram berfokus pada penyusunan ulang yang menggunakan setiap huruf untuk membentuk kata atau frasa baru. Dalam praktiknya, keduanya banyak tumpang tindih, dan alat kami menunjukkan hasil parsial dan panjang penuh sehingga Anda tidak pernah melewatkan suatu langkah." },
      { question: "Bagaimana cara menggunakan wildcard atau ubin kosong?", answer: "Ketika Anda memiliki ubin kosong di Scrabble atau Words With Friends, atau Anda hanya tidak tahu sebuah huruf, Anda dapat menggunakan wildcard — biasanya tanda tanya atau bintang — untuk mewakili huruf apa pun. Pemecah kami memperluas setiap wildcard di seluruh alfabet dan mengembalikan setiap kata yang cocok, dengan jelas menunjukkan huruf mana yang mengisi kekosongan." },
      { question: "Dapatkah alat ini membantu saya meningkatkan kosakata saya?", answer: "Pasti. Di luar memenangkan permainan, alat kata adalah pembangun kosakata yang kuat. Menemukan kata-kata baru, melihat definisinya, menjelajahi sinonim dan antonim, dan mempelajari kombinasi huruf mana yang valid semuanya memperkuat keterampilan bahasa Anda. Banyak siswa, penulis, guru, dan pembelajar bahasa menggunakannya setiap hari untuk mempelajari ejaan dan memperluas kosakata mereka." },
      { question: "Apakah alat berfungsi di ponsel dan tablet?", answer: "Ya. Seluruh platform dibangun mengutamakan seluler dan sepenuhnya responsif, jadi setiap alat berfungsi dengan indah di ponsel, tablet, laptop, dan desktop. Tata letak menyesuaikan dengan layar Anda, tombol tetap mudah diketuk, dan hasil dimuat dengan cepat bahkan pada koneksi yang lebih lambat." },
      { question: "Bagaimana cara kerja pemecah Wordle?", answer: "Pemecah Wordle mempersempit jawaban yang mungkin berdasarkan petunjuk yang sudah Anda miliki. Anda memasukkan huruf yang Anda ketahui benar dan berada di posisi yang tepat, huruf yang ada tetapi salah tempat, dan huruf yang telah Anda singkirkan. Alat kemudian memfilter daftar kata lima huruf untuk mengungkapkan kandidat yang tersisa dan menyarankan tebakan berikutnya yang kuat yang menghilangkan paling banyak kemungkinan." },
      { question: "Dapatkah saya menemukan kata berima untuk lagu dan puisi?", answer: "Ya. Alat kata berima kami menemukan rima sempurna, rima dekat, dan kata dengan bunyi serupa, yang ideal untuk penulisan lagu, puisi, lirik rap, dan kartu ucapan. Anda dapat menelusuri hasil berdasarkan jumlah suku kata dan pola tekanan untuk menjaga baris Anda mengalir secara alami." },
      { question: "Untuk apa penghitung suku kata digunakan?", answer: "Penghitung suku kata memberi tahu Anda berapa banyak suku kata dalam sebuah kata atau seluruh bagian teks. Ini sangat berharga untuk menulis haiku dan puisi terstruktur lainnya, memeriksa keterbacaan, mengajarkan fonik, dan menyesuaikan lirik dengan melodi. Cukup tempel teks Anda dan penghitung akan memecah setiap kata secara instan." },
      { question: "Bagaimana kata Scrabble dengan skor tertinggi dihitung?", answer: "Pembantu Scrabble kami memberikan setiap huruf nilai poin resminya, lalu menjumlahkan ubin untuk setiap kata valid yang dapat Anda eja dari rak Anda. Hasil diurutkan dari skor tertinggi ke terendah sehingga Anda dapat melihat langkah terbesar sekilas. Di mana Anda menempatkan kata di papan — mengenai kotak ganda dan rangkap tiga — dapat meningkatkan skor lebih jauh." },
      { question: "Apakah Anda akan menambahkan lebih banyak alat kata?", answer: "Ya, terus-menerus. Kami sedang membangun koleksi alat kata bahasa Inggris paling komprehensif di mana pun, dan pemecah, generator, dan pembantu bahasa baru ditambahkan secara berkala. Tandai situs ini dan periksa bagian Alat Terbaru di beranda untuk melihat apa yang baru saja diluncurkan." },
    ],
  },
  ru: {
    benefits: [
      { title: "Мгновенные результаты", description: "Ответы появляются в тот момент, когда вы нажимаете поиск — без ожидания и перезагрузки." },
      { title: "Учитесь во время игры", description: "Определения, очки и связанные слова помогают естественным образом расширять словарный запас." },
      { title: "Точные словари", description: "Большие, хорошо поддерживаемые списки слов, настроенные для каждой игры, в которую вы играете." },
      { title: "Сначала для мобильных", description: "Быстрый, адаптивный интерфейс на телефонах, планшетах и компьютерах." },
      { title: "Всегда бесплатно", description: "Каждый инструмент на 100% бесплатен, без регистрации и без ограничений." },
      { title: "Постоянно растёт", description: "Новые решатели и языковые инструменты добавляются регулярно." },
    ],
    guideEyebrow: "Полное руководство",
    guideTitle: "Всё, что нужно знать об инструментах для слов",
    guideSections: [
      {
        heading: "Что такое инструменты для слов?",
        paragraphs: [
          "Инструменты для слов — это онлайн-утилиты, созданные, чтобы помогать вам играть в словесные игры, решать головоломки и улучшать владение английским языком. По сути, они берут буквы, шаблоны или подсказки, которые у вас уже есть, и ищут в огромных, тщательно поддерживаемых словарях, чтобы показать каждое возможное подходящее слово. В один клик вы можете расшифровать набор букв, найти все анаграммы, открыть слова, начинающиеся или заканчивающиеся определённой строкой, или сузить ответ сегодняшнего Wordle.",
          "Что делает современные инструменты для слов такими мощными — это скорость и широта. Вместо того чтобы листать бумажный словарь или гадать, вы получаете полный, ранжированный список допустимых слов за долю секунды. Результаты обычно организованы по длине и очкам, поэтому самые полезные ходы сразу оказываются наверху. Будь вы случайный игрок, соревновательный энтузиаст Scrabble, любитель кроссвордов, писатель, учитель или изучающий язык, здесь есть инструмент, созданный именно для того, что вам нужно.",
          "Наша платформа объединяет 92 таких инструмента в 13 красиво организованных категориях. От решателей слов и инструментов для букв до помощников для письма и специальных помощников для игр — каждая утилита разделяет один и тот же быстрый, дружелюбный и доступный опыт: без загрузок, без регистрации и без беспорядка.",
        ],
      },
      {
        heading: "Преимущества использования инструментов для слов",
        paragraphs: [
          "Самое очевидное преимущество — выигрывать больше игр. Когда вы можете мгновенно увидеть ход с наибольшим количеством очков из вашей стойки Scrabble или последние несколько кандидатов в Wordle, вы тратите меньше времени в тупике и больше времени, наслаждаясь игрой. Но преимущества выходят далеко за рамки одного матча.",
          "Инструменты для слов — отличные помощники в обучении. Каждый раз, когда вы расшифровываете буквы или исследуете синонимы, вы встречаете новые слова, укрепляете правописание и понимаете, какие сочетания букв допустимы в английском. Студенты, готовящиеся к экзаменам, писатели, ищущие идеальное слово, и учащиеся, развивающие беглость, используют эти инструменты, чтобы расширять свой словарный запас легко и даже с удовольствием.",
          "Они также отлично подходят для разрешения дружеских споров. Это действительно слово? Оно рифмуется? Сколько в нём слогов? Вместо споров вы получаете мгновенный, проверяемый ответ, созданный из отобранных списков слов. А поскольку всё бесплатно и работает на любом устройстве, помощь всегда в одном касании, будь вы на диване, в поезде или за рабочим столом.",
        ],
      },
      {
        heading: "Как работают инструменты для слов",
        paragraphs: [
          "За каждым инструментом стоит большой отобранный словарь и быстрый механизм сопоставления. Когда вы вводите свои буквы или шаблон, инструмент сравнивает ваш ввод со всем списком слов, применяя правила выбранной вами игры или поиска. Для расшифровщика слов это означает найти каждую комбинацию ваших букв, которая образует допустимое слово. Для поиска по шаблону это означает сопоставить ваши известные буквы и подстановочные знаки со словами правильной формы.",
          "Разные игры принимают разные слова, поэтому выбор правильного словаря важен. Scrabble и Words With Friends используют свои собственные отдельные списки слов и значения букв, в то время как Wordle сосредоточен на допустимых пятибуквенных ответах. Наши инструменты позволяют выбрать правильный режим, чтобы результаты всегда отражали игру, в которую вы на самом деле играете.",
          "После нахождения совпадений результаты оцениваются и сортируются. Помощники для словесных игр ранжируют ходы по очкам; инструменты для букв сортируют по длине или алфавиту; инструменты для письма группируют результаты по значению, звуку или количеству слогов. Тяжёлая работа происходит мгновенно и конфиденциально в вашем браузере, поэтому ответы появляются в момент нажатия поиска.",
        ],
      },
      {
        heading: "Какие игры и головоломки поддерживаются",
        paragraphs: [
          "Мы поддерживаем словесные игры, которые люди любят больше всего. Игроки в Scrabble могут находить ходы с наибольшим количеством очков, используя списки слов в турнирном стиле и точные значения плиток. Поклонники Words With Friends получают ходы, настроенные на уникальные значения плиток и список слов этой игры. Решатели Wordle сужают ежедневный ответ, используя ваши зелёные, жёлтые и серые подсказки, в то время как решатели кроссвордов заполняют недостающие клетки по длине подсказки и буквам, которые вы уже знаете.",
          "Любители головоломок также охвачены. Наш решатель анаграмм и расшифровщик слов быстро справляются с газетными перемешанными словами и буквенными играми из приложений. Решатели Boggle и Text Twist извлекают каждое скрытое слово из сетки или перемешивания, а помощник Hangman предлагает самые умные буквы для следующего угадывания, чтобы у вас редко заканчивались попытки.",
          "Поскольку платформа постоянно растёт, список поддерживаемых игр и головоломок продолжает расширяться. Если есть популярная словесная игра, которая вам нравится, очень вероятно, что у нас уже есть специальный помощник для неё — а если нет, он, вероятно, уже в пути.",
        ],
      },
      {
        heading: "Почему стоит использовать наши инструменты для слов",
        paragraphs: [
          "В интернете много инструментов для слов, но немногие сочетают точность, скорость и по-настоящему приятный опыт так, как наши. Наши словари большие и хорошо поддерживаются, наше сопоставление точно, а наш интерфейс разработан, чтобы привести вас к ответу с наименьшим возможным количеством касаний. Нет запутанных меню, навязчивых прерываний или медленно загружающихся страниц между вами и нужным вам словом.",
          "Всё ориентировано сначала на мобильные устройства и молниеносно быстро, поэтому инструменты одинаково хорошо ощущаются на вашем телефоне и на компьютере. Дизайн современный и читаемый, со светлым и тёмным режимами, чтобы вы могли комфортно играть в любое время дня. А поскольку каждый инструмент бесплатен и не требует учётной записи, вы можете сразу приступить.",
          "Нам также важно помогать вам учиться, а не только выигрывать. Наряду с ответами наши инструменты показывают полезный контекст — определения, очки, слоги и связанные слова — чтобы каждый поиск делал вас немного более беглым, чем раньше.",
        ],
      },
      {
        heading: "Советы по игре и практические стратегии",
        paragraphs: [
          "Вот как проходит типичный поиск. Предположим, ваша стойка Scrabble содержит R, A, T, I, O, N и S. Поместите эти семь букв в расшифровщик слов, выберите словарь Scrabble, и вы мгновенно увидите ходы высокой ценности — включая бинго из семи букв, которое даёт бонус в пятьдесят очков. Застряли на подсказке кроссворда из пяти букв с T в третьей клетке? Введите шаблон ??T??, и решатель вернёт каждое подходящее слово.",
          "Несколько практических советов имеют большое значение. Сначала выучите короткие слова из двух и трёх букв; это секретное оружие лучших игроков в Scrabble для соединения ходов и выжимания очков из тесных досок. Следите за плитками высокой ценности, такими как Q, Z, X и J, и помните горстку слов с Q без U, которые могут спасти застрявшую стойку. В Wordle начните с предположения, богатого общими гласными и согласными, чтобы исключить как можно больше возможностей, прежде чем вы примете решение.",
          "Для писателей используйте инструменты синонимов и антонимов, чтобы разнообразить свой язык и избежать повторений, и опирайтесь на инструменты рифм и слогов, чтобы поэзия и тексты песен текли. Маленькие привычки, подобные этим, повторяемые со временем, превращают случайную игру в настоящее мастерство и делают вас более острым и уверенным пользователем английского.",
        ],
      },
    ],
    faqEyebrow: "Вопросы и ответы",
    faqTitle: "Часто задаваемые вопросы",
    faqDescription: "Всё, что вы можете хотеть знать об использовании AllWordTools.",
    faqs: [
      { question: "Что такое инструменты для слов и как они работают?", answer: "Инструменты для слов — это умные онлайн-утилиты, которые анализируют буквы, шаблоны и словари, чтобы помочь вам играть в словесные игры, расширять словарный запас и писать лучше. Вы вводите буквы, которые у вас есть, или шаблон, который ищете, и инструмент мгновенно ищет в большом отобранном списке слов, чтобы вернуть каждое допустимое совпадение — обычно отсортированное по длине, очкам или релевантности. Всё работает в вашем браузере за долю секунды, поэтому ничего не нужно устанавливать и не нужно ждать." },
      { question: "Какие словесные игры поддерживают эти инструменты?", answer: "Наши помощники оптимизированы для самых популярных словесных игр в мире, включая Scrabble, Words With Friends, Wordle, кроссворды, Boggle, Hangman, Text Twist и бесчисленные головоломки с анаграммами и перемешанными словами, встречающиеся в газетах и приложениях. Каждая игра использует свой словарь и правила подсчёта очков, поэтому мы адаптируем результаты — Scrabble использует списки слов в турнирном стиле, в то время как Wordle сосредоточен на допустимых пятибуквенных ответах." },
      { question: "Считается ли использование расшифровщика слов жульничеством?", answer: "Инструменты для слов лучше всего рассматривать как помощников для обучения и практики, а не как способ жульничать. Миллионы игроков используют их, чтобы изучать новые слова, понимать, почему ход допустим, улучшать свою стратегию и разрешать дружеские споры. В неформальных играх между друзьями или когда вы практикуетесь в одиночку, это фантастический способ стать лучше. Использовать ли их в соревновательной обстановке — всегда ваш выбор и зависит от правил, о которых вы договорились с другими игроками." },
      { question: "Бесплатны ли инструменты для слов?", answer: "Да. Каждый инструмент на платформе полностью бесплатен, без необходимости регистрации. Вы можете расшифровывать слова, решать анаграммы, находить рифмы и многое другое столько раз, сколько захотите. Мы сохраняем опыт быстрым и лёгким, чтобы вы получали ответы мгновенно на любом устройстве." },
      { question: "Насколько точны результаты?", answer: "Мы используем большие, регулярно поддерживаемые словари на основе признанных списков слов, поэтому результаты очень точны для выбранной вами игры. Поскольку разные игры принимают разные слова, мы позволяем вам выбрать правильный словарь для Scrabble, Words With Friends и общего английского. Если вы когда-нибудь увидите слово, которое кажется неуместным, помните, что игровые словари иногда включают малоизвестные, но официально допустимые слова." },
      { question: "Могу ли я искать слова по длине?", answer: "Безусловно. Многие инструменты позволяют фильтровать по точной длине — например, только пятибуквенные слова для Wordle или семибуквенные слова для поиска бинго в Scrabble. Вы можете сочетать фильтры длины с начальными буквами, конечными буквами и содержащимися буквами, чтобы точно найти нужные вам слова." },
      { question: "В чём разница между решателем анаграмм и расшифровщиком слов?", answer: "Расшифровщик слов находит все допустимые слова, которые вы можете составить из набора букв, включая более короткие слова, использующие только некоторые из них. Решатель анаграмм сосредоточен на перестановках, которые используют каждую букву для образования нового слова или фразы. На практике они сильно перекрываются, и наши инструменты показывают как частичные, так и полные по длине результаты, чтобы вы никогда не пропустили ход." },
      { question: "Как использовать подстановочные знаки или пустые плитки?", answer: "Когда у вас есть пустая плитка в Scrabble или Words With Friends, или вы просто не знаете букву, вы можете использовать подстановочный знак — обычно вопросительный знак или звёздочку — для обозначения любой буквы. Наши решатели расширяют каждый подстановочный знак по всему алфавиту и возвращают каждое подходящее слово, чётко показывая, какие буквы заполнили пробелы." },
      { question: "Могут ли эти инструменты помочь мне улучшить словарный запас?", answer: "Определённо. Помимо выигрыша игр, инструменты для слов — мощный строитель словарного запаса. Открытие новых слов, просмотр их определений, исследование синонимов и антонимов и изучение того, какие сочетания букв допустимы, — всё это укрепляет ваши языковые навыки. Многие студенты, писатели, учителя и изучающие язык используют их ежедневно, чтобы изучать правописание и расширять словарный запас." },
      { question: "Работают ли инструменты на мобильных телефонах и планшетах?", answer: "Да. Вся платформа построена с приоритетом мобильных устройств и полностью адаптивна, поэтому каждый инструмент прекрасно работает на телефонах, планшетах, ноутбуках и компьютерах. Макет адаптируется к вашему экрану, кнопки остаются удобными для нажатия, а результаты загружаются быстро даже при более медленных соединениях." },
      { question: "Как работает решатель Wordle?", answer: "Решатель Wordle сужает возможные ответы на основе подсказок, которые у вас уже есть. Вы вводите буквы, которые, как вы знаете, верны и находятся в правильной позиции, буквы, которые присутствуют, но находятся не на месте, и буквы, которые вы исключили. Затем инструмент фильтрует список пятибуквенных слов, чтобы показать оставшихся кандидатов, и предлагает сильные следующие предположения, которые исключают наибольшее количество возможностей." },
      { question: "Могу ли я найти рифмующиеся слова для песен и поэзии?", answer: "Да. Наш инструмент рифмующихся слов находит идеальные рифмы, близкие рифмы и слова с похожими звуками, что идеально подходит для написания песен, поэзии, рэп-текстов и поздравительных открыток. Вы можете просматривать результаты по количеству слогов и шаблону ударения, чтобы ваши строки текли естественно." },
      { question: "Для чего используется счётчик слогов?", answer: "Счётчик слогов говорит вам, сколько слогов в слове или целом отрывке текста. Это бесценно для написания хайку и другой структурированной поэзии, проверки читаемости, преподавания фонетики и подгонки текстов к мелодии. Просто вставьте свой текст, и счётчик мгновенно разберёт каждое слово." },
      { question: "Как рассчитывается слово Scrabble с наибольшим количеством очков?", answer: "Наш помощник Scrabble присваивает каждой букве её официальное значение в очках, затем суммирует плитки для каждого допустимого слова, которое вы можете составить из своей стойки. Результаты ранжируются от наивысшего к низшему счёту, чтобы вы могли увидеть самый большой ход с первого взгляда. То, где вы разместите слово на доске — попадание на двойные и тройные клетки — может ещё больше повысить счёт." },
      { question: "Будете ли вы добавлять больше инструментов для слов?", answer: "Да, постоянно. Мы строим самую полную коллекцию английских инструментов для слов где бы то ни было, и новые решатели, генераторы и языковые помощники добавляются регулярно. Добавьте сайт в закладки и проверьте раздел «Последние инструменты» на главной странице, чтобы увидеть, что только что было запущено." },
    ],
  },
};

export function getHomeContent(locale: string): HomeLocaleContent | null {
  return HOME_CONTENT[locale] ?? null;
}
