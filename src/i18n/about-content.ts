// Localized About page content (machine-translated from the English source
// in src/routes/about.tsx; proper nouns — Firoz Khan, FK Digital Media,
// AllWordTools, game names — intentionally kept in English).
// {count} and {cats} placeholders are replaced at render time with the live
// tool/category counts.

export type AboutPart =
  | { t: string }
  | { b: string }
  | { a: string; to: string }
  | { email: string }
  | { url: string };

export type AboutBlock =
  | { p: AboutPart[] }
  | { ul: AboutPart[][] }
  | { card: true };

export interface AboutLocaleContent {
  crumb: string;
  pageTitle: string;
  pageIntro: string;
  metaTitle: string;
  metaDescription: string;
  authorRole: string;
  viewProfile: string;
  sections: { heading: string; blocks: AboutBlock[] }[];
}

export const ABOUT_CONTENT: Record<string, AboutLocaleContent> = {
  "es": {
    "crumb": "Acerca de",
    "pageTitle": "Acerca de AllWordTools",
    "pageIntro": "Una colección independiente de solucionadores de juegos de palabras, ayudas de lenguaje y utilidades de escritura gratuitos.",
    "metaTitle": "Acerca de",
    "metaDescription": "AllWordTools reúne cientos de solucionadores de juegos de palabras gratuitos y herramientas de idioma inglés en un lugar rápido y bellamente organizado.",
    "authorRole": "Desarrollador y mantenedor Full Stack · FK Digital Media",
    "viewProfile": "Ver perfil completo del autor →",
    "sections": [
      {
        "heading": "¿Qué es AllWordTools?",
        "blocks": [
          {
            "p": [
              {
                "b": "AllWordTools.com"
              },
              {
                "t": "es un conjunto de herramientas web independiente que proporciona {count} solucionadores de juegos de palabras, buscadores de letras, ayudas de vocabulario, utilidades de análisis de texto y ayudas de escritura creativa en línea gratuitos en {cats} categorías distintas."
              }
            ]
          },
          {
            "p": [
              {
                "t": "Ya sea que esté descifrando letras para un juego casual de Scrabble, buscando combinaciones de cinco letras para Wordle, contando sílabas para un poema o verificando definiciones de palabras, AllWordTools organiza estas utilidades en una plataforma rápida y accesible sin necesidad de registro de usuario, instalaciones de escritorio o suscripciones pagas."
              }
            ]
          }
        ]
      },
      {
        "heading": "¿Quién lo crea y lo mantiene?",
        "blocks": [
          {
            "p": [
              {
                "t": "AllWordTools.com es creado, desarrollado y mantenido técnicamente por"
              },
              {
                "b": "Firoz Khan"
              },
              {
                "t": ", un desarrollador Full Stack, bajo su marca independiente de desarrollo digital."
              },
              {
                "b": "FK Digital Media"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "Acerca de Firoz Khan",
        "blocks": [
          {
            "card": true
          },
          {
            "p": [
              {
                "b": "Firoz Khan"
              },
              {
                "t": "es un desarrollador Full Stack que diseña aplicaciones web y utilidades de software interactivo. Su función técnica en AllWordTools abarca arquitectura de sitios web de pila completa, desarrollo de interfaz de usuario frontend, implementación de solucionador algorítmico, consultas de bases de datos, ajuste del rendimiento y mantenimiento continuo."
              }
            ]
          },
          {
            "p": [
              {
                "t": "Firoz aborda el sitio web estrictamente desde una perspectiva algorítmica y de ingeniería de software. No reclama credenciales como lingüista, lexicógrafo, profesor académico u oficial de torneo. En cambio, se centra en escribir algoritmos de búsqueda eficientes que cotejen las entradas del usuario con conjuntos de datos estructurados de forma precisa y rápida."
              }
            ]
          },
          {
            "p": [
              {
                "t": "Obtenga más información en su página de autor dedicada:"
              },
              {
                "a": "Firoz Khan — Perfil de autor y mantenedor",
                "to": "/about/firoz-khan"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "Acerca de FK Digital Media",
        "blocks": [
          {
            "p": [
              {
                "b": "FK Digital Media"
              },
              {
                "t": "es la marca independiente de desarrollo digital asociada con los proyectos web de Firoz Khan, incluido el desarrollo y mantenimiento de herramientas y aplicaciones web en línea."
              }
            ]
          },
          {
            "p": [
              {
                "t": "Bajo el lema FK Digital Media, los proyectos se crean poniendo énfasis en la velocidad, interfaces de usuario limpias, arquitectura respetuosa con la privacidad y utilidad práctica."
              }
            ]
          }
        ]
      },
      {
        "heading": "Lo que construimos",
        "blocks": [
          {
            "p": [
              {
                "t": "Actualmente, la plataforma ofrece {count} herramientas agrupadas en {cats} categorías organizadas:"
              }
            ]
          },
          {
            "ul": [
              [
                {
                  "b": "Solucionadores de palabras:"
                },
                {
                  "t": "Descodificadores, solucionadores de anagramas, ayudas de crucigramas y asistentes Wordle."
                }
              ],
              [
                {
                  "b": "Herramientas de letras:"
                },
                {
                  "t": "Busque palabras que comiencen, terminen o contengan letras, cuente caracteres y haga coincidir patrones de comodines."
                }
              ],
              [
                {
                  "b": "Herramientas de escritura:"
                },
                {
                  "t": "Buscadores de rimas, contadores de sílabas, buscadores de sinónimos y generadores de antónimos."
                }
              ],
              [
                {
                  "b": "Ayudantes del juego:"
                },
                {
                  "t": "Ayudantes de puntuación y tablero para Scrabble, Words With Friends, Boggle y Text Twist."
                }
              ],
              [
                {
                  "b": "Solucionadores avanzados:"
                },
                {
                  "t": "Búsqueda de patrones de expresiones regulares, buscadores de letras faltantes, reorganizadores de letras y búsquedas de diccionario inverso."
                }
              ],
              [
                {
                  "b": "Análisis de texto:"
                },
                {
                  "t": "Analizadores de frecuencia de letras, contadores de vocales/consonantes y clasificadores alfabéticos."
                }
              ],
              [
                {
                  "b": "Diccionario y referencia:"
                },
                {
                  "t": "Significados de las palabras, pronunciaciones IPA, orígenes de las palabras y oraciones de ejemplo."
                }
              ],
              [
                {
                  "b": "Gramática y estilo:"
                },
                {
                  "t": "Conversores de voz, correctores de voz pasivos y herramientas de revisión de puntuación."
                }
              ],
              [
                {
                  "b": "Solucionadores de rompecabezas:"
                },
                {
                  "t": "Solucionadores para Word Cookies, Wordscapes, CodyCross y 7 Little Words."
                }
              ],
              [
                {
                  "b": "Generadores y cuestionarios:"
                },
                {
                  "t": "Palabras aleatorias, temas, generadores de letras y pruebas de vocabulario."
                }
              ],
              [
                {
                  "b": "Herramientas de escritura de IA:"
                },
                {
                  "t": "Explicadores de palabras con IA, creadores de oraciones, indicaciones de historias y generadores de tarjetas didácticas."
                }
              ]
            ]
          },
          {
            "p": [
              {
                "t": "Puedes consultar todo el catálogo en nuestro"
              },
              {
                "a": "Directorio de todas las herramientas",
                "to": "/tools"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "Cómo funcionan nuestras herramientas",
        "blocks": [
          {
            "p": [
              {
                "t": "La mayoría de los solucionadores de AllWordTools se basan en algoritmos deterministas escritos en TypeScript y JavaScript. Cuando ingresa un término de búsqueda, la herramienta traduce su consulta en reglas algorítmicas (como permutaciones de anagramas, filtros comodín de expresiones regulares o matrices de recuento de letras) y consulta conjuntos de datos léxicos seleccionados para encontrar coincidencias válidas."
              }
            ]
          },
          {
            "p": [
              {
                "t": "Las coincidencias se clasifican según criterios explícitos: longitud de la letra, valores de puntos de mosaico Scrabble u orden alfabético."
              }
            ]
          }
        ]
      },
      {
        "heading": "Listas de palabras y transparencia de datos",
        "blocks": [
          {
            "p": [
              {
                "t": "Para generar resultados, AllWordTools incorpora conjuntos de datos léxicos disponibles públicamente, listas de palabras de código abierto (como ENABLE, listas derivadas de TWL y listas de juegos compatibles con SOWPODS/CSW) y datos fonéticos/de pronunciación."
              }
            ]
          },
          {
            "p": [
              {
                "b": "Estado independiente:"
              },
              {
                "t": "AllWordTools es un proyecto independiente. No está afiliado, respaldado ni patrocinado por Hasbro, Mattel, The New York Times, Zynga ni por ningún editor de juegos de mesa. Las menciones de marcas comerciales como \"Scrabble\", \"Words With Friends\" o \"Wordle\" se utilizan únicamente con fines descriptivos para identificar reglas de juego compatibles."
              }
            ]
          },
          {
            "p": [
              {
                "t": "Para obtener un desglose técnico exhaustivo de cada conjunto de datos, método de cálculo, regla de puntuación del juego y limitación de las 92 herramientas, visite nuestro"
              },
              {
                "a": "Guía de metodología y datos de Word",
                "to": "/methodology"
              },
              {
                "t": "y lee nuestro"
              },
              {
                "a": "Guía de limitaciones de datos",
                "to": "/data-limitations"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "Precisión y pruebas",
        "blocks": [
          {
            "p": [
              {
                "t": "Los resultados se generan a partir de listas de palabras, conjuntos de datos, algoritmos y reglas utilizados por la herramienta seleccionada. Si bien los algoritmos se prueban periódicamente con respecto a puntos de referencia estándar para garantizar una puntuación y una coincidencia de patrones correctas, ninguna herramienta automatizada puede garantizar el 100% de integridad para cada variante o dialecto del diccionario localizado."
              }
            ]
          },
          {
            "p": [
              {
                "t": "Se recomienda a los usuarios que verifiquen los resultados críticos de forma independiente para exámenes formales, disputas sobre reglas de torneos o trabajos académicos. Por favor lea nuestro completo"
              },
              {
                "a": "Limitaciones de datos",
                "to": "/data-limitations"
              },
              {
                "t": "y"
              },
              {
                "a": "Descargo de responsabilidad",
                "to": "/disclaimer"
              },
              {
                "t": "para detalles adicionales."
              }
            ]
          }
        ]
      },
      {
        "heading": "Transparencia de las herramientas de IA",
        "blocks": [
          {
            "p": [
              {
                "t": "Nuestra sección educativa y de escritura creativa incluye herramientas impulsadas por inteligencia artificial (como el"
              },
              {
                "a": "Explicador de palabras con IA",
                "to": "/tool/ai-word-explainer"
              },
              {
                "t": "y"
              },
              {
                "a": "Generador de historias de IA",
                "to": "/tool/ai-story-generator"
              },
              {
                "t": ")."
              }
            ]
          },
          {
            "ul": [
              [
                {
                  "b": "Generación automatizada:"
                },
                {
                  "t": "Los resultados de la IA son producidos por grandes modelos de lenguaje y, en ocasiones, pueden producir información inexacta, desactualizada o sesgada."
                }
              ],
              [
                {
                  "b": "Resultado de la revisión:"
                },
                {
                  "t": "Revise y edite siempre el texto generado por IA antes de confiar en él para estudiarlo o publicarlo."
                }
              ],
              [
                {
                  "b": "Confidencialidad:"
                },
                {
                  "t": "No envíe información personal sensible, confidencial o privada en las indicaciones de entrada de la herramienta de IA. El texto enviado es procesado por proveedores externos de API de IA."
                }
              ]
            ]
          },
          {
            "p": [
              {
                "t": "Obtenga más información sobre nuestra arquitectura de IA en nuestro sitio dedicado"
              },
              {
                "a": "Página de transparencia de herramientas de IA",
                "to": "/ai-tools"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "Privacidad y procesamiento de datos",
        "blocks": [
          {
            "p": [
              {
                "t": "Creemos en la divulgación técnica transparente sobre cómo se manejan sus datos:"
              }
            ]
          },
          {
            "ul": [
              [
                {
                  "b": "Herramientas algorítmicas del lado del cliente:"
                },
                {
                  "t": "Los solucionadores principales (como el contador de letras, el contador de sílabas y el clasificador alfabético) procesan su entrada completamente en su navegador. Su texto ingresado no se almacena en nuestros servidores."
                }
              ],
              [
                {
                  "b": "Herramientas asistidas por servidor y de IA:"
                },
                {
                  "t": "Las herramientas que requieren una indexación de diccionario extensa o una inferencia de modelos de IA transmiten parámetros de consulta a funciones backend sin servidor o API de terceros autorizadas para devolver resultados."
                }
              ],
              [
                {
                  "b": "Sin cuentas obligatorias:"
                },
                {
                  "t": "AllWordTools no requiere que usted cree una cuenta ni proporcione datos de contacto personales para acceder a ninguna herramienta."
                }
              ]
            ]
          },
          {
            "p": [
              {
                "t": "Para obtener detalles completos sobre cookies, publicidad y análisis, consulte nuestra"
              },
              {
                "a": "Política de privacidad",
                "to": "/privacy"
              },
              {
                "t": "y"
              },
              {
                "a": "Política de cookies",
                "to": "/cookie-policy"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "Informar un error/problema de Word",
        "blocks": [
          {
            "p": [
              {
                "t": "El lenguaje evoluciona y el software puede contener errores. Si nota alguno de los siguientes:"
              }
            ]
          },
          {
            "ul": [
              [
                {
                  "t": "Una palabra incorrecta o mal escrita"
                }
              ],
              [
                {
                  "t": "Falta una palabra válida para un diccionario de juego específico"
                }
              ],
              [
                {
                  "t": "Una definición o pronunciación incorrecta"
                }
              ],
              [
                {
                  "t": "Un recuento de sílabas o una puntuación del juego inexacta"
                }
              ],
              [
                {
                  "t": "Una función rota o un error inesperado del solucionador"
                }
              ]
            ]
          },
          {
            "p": [
              {
                "t": "Háganos saber para que podamos investigar y actualizar el conjunto de datos o el código. Visita nuestro dedicado"
              },
              {
                "a": "Informar una página de error de Word o herramienta",
                "to": "/report-error"
              },
              {
                "t": "para enviar detalles directamente a Firoz Khan."
              }
            ]
          }
        ]
      },
      {
        "heading": "Contacto y enlaces sociales verificados",
        "blocks": [
          {
            "p": [
              {
                "t": "Para consultas técnicas, informes de errores, discusiones comerciales o comentarios, puede comunicarse a través de:"
              }
            ]
          },
          {
            "ul": [
              [
                {
                  "b": "Correo electrónico directo:"
                },
                {
                  "t": ""
                },
                {
                  "email": "hello@allwordtools.com"
                }
              ],
              [
                {
                  "b": "Formulario de contacto y error:"
                },
                {
                  "t": ""
                },
                {
                  "a": "Página de contacto",
                  "to": "/contact"
                },
                {
                  "t": "o"
                },
                {
                  "a": "Informar un error",
                  "to": "/report-error"
                }
              ],
              [
                {
                  "b": "Perfil GitHub:"
                },
                {
                  "t": ""
                },
                {
                  "url": "https://github.com/fkdigitalmedia"
                }
              ],
              [
                {
                  "b": "LinkedIn:"
                },
                {
                  "t": ""
                },
                {
                  "url": "https://www.linkedin.com/in/firoz-khan-1153358a/"
                }
              ],
              [
                {
                  "b": "Instagram:"
                },
                {
                  "t": ""
                },
                {
                  "url": "https://www.instagram.com/rtibyfiroz/"
                }
              ]
            ]
          }
        ]
      }
    ]
  },
  "hi": {
    "crumb": "के बारे में",
    "pageTitle": "AllWordTools के बारे में",
    "pageIntro": "मुफ़्त शब्द गेम सॉल्वर, भाषा सहायक और लेखन उपयोगिताओं का एक स्वतंत्र संग्रह।",
    "metaTitle": "के बारे में",
    "metaDescription": "AllWordTools सैकड़ों मुफ्त वर्ड गेम सॉल्वर और अंग्रेजी भाषा टूल को एक तेज, खूबसूरती से व्यवस्थित जगह पर एक साथ लाता है।",
    "authorRole": "पूर्ण स्टैक डेवलपर और अनुरक्षक · FK Digital Media",
    "viewProfile": "संपूर्ण लेखक प्रोफ़ाइल देखें →",
    "sections": [
      {
        "heading": "AllWordTools क्या है",
        "blocks": [
          {
            "p": [
              {
                "b": "AllWordTools.com"
              },
              {
                "t": "एक स्वतंत्र वेब टूलकिट है जो {cats} विभिन्न श्रेणियों में {count} निःशुल्क ऑनलाइन शब्द गेम सॉल्वर, अक्षर खोजक, शब्दावली सहायता, पाठ विश्लेषण उपयोगिताएँ और रचनात्मक लेखन सहायक प्रदान करता है।"
              }
            ]
          },
          {
            "p": [
              {
                "t": "चाहे आप Scrabble के एक आकस्मिक गेम के लिए अक्षरों को सुलझा रहे हों, Wordle के लिए पांच-अक्षर संयोजन ढूंढ रहे हों, किसी कविता के लिए अक्षरों की गिनती कर रहे हों, या शब्द परिभाषाओं की जांच कर रहे हों, AllWordTools इन उपयोगिताओं को उपयोगकर्ता पंजीकरण, डेस्कटॉप इंस्टॉलेशन या सशुल्क सदस्यता की आवश्यकता के बिना एक तेज़, सुलभ प्लेटफ़ॉर्म में व्यवस्थित करता है।"
              }
            ]
          }
        ]
      },
      {
        "heading": "इसका निर्माण और रखरखाव कौन करता है",
        "blocks": [
          {
            "p": [
              {
                "t": "AllWordTools.com का निर्माण, विकास और तकनीकी रूप से रखरखाव किया जाता है"
              },
              {
                "b": "Firoz Khan"
              },
              {
                "t": ", एक पूर्ण स्टैक डेवलपर, अपने स्वतंत्र डिजिटल-विकास ब्रांड के तहत"
              },
              {
                "b": "FK Digital Media"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "Firoz Khan के बारे में",
        "blocks": [
          {
            "card": true
          },
          {
            "p": [
              {
                "b": "Firoz Khan"
              },
              {
                "t": "एक पूर्ण स्टैक डेवलपर है जो वेब एप्लिकेशन और इंटरैक्टिव सॉफ़्टवेयर उपयोगिताओं को इंजीनियर करता है। AllWordTools में उनकी तकनीकी भूमिका में फुल-स्टैक वेबसाइट आर्किटेक्चर, फ्रंटएंड यूआई डेवलपमेंट, एल्गोरिथम सॉल्वर कार्यान्वयन, डेटाबेस क्वेरीज़, प्रदर्शन ट्यूनिंग और निरंतर रखरखाव शामिल है।"
              }
            ]
          },
          {
            "p": [
              {
                "t": "फ़िरोज़ वेबसाइट को सॉफ़्टवेयर इंजीनियरिंग और एल्गोरिथम परिप्रेक्ष्य से सख्ती से देखता है। वह एक भाषाविद्, कोशकार, अकादमिक प्रोफेसर या टूर्नामेंट अधिकारी के रूप में अपनी योग्यता का दावा नहीं करता है। इसके बजाय, वह कुशल खोज एल्गोरिदम लिखने पर ध्यान केंद्रित करता है जो संरचित डेटासेट के विरुद्ध उपयोगकर्ता इनपुट का सटीक और तेजी से मिलान करता है।"
              }
            ]
          },
          {
            "p": [
              {
                "t": "उनके समर्पित लेखक पृष्ठ पर और जानें:"
              },
              {
                "a": "Firoz Khan - लेखक और अनुरक्षक प्रोफ़ाइल",
                "to": "/about/firoz-khan"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "FK Digital Media के बारे में",
        "blocks": [
          {
            "p": [
              {
                "b": "FK Digital Media"
              },
              {
                "t": "Firoz Khan की वेब परियोजनाओं से जुड़ा स्वतंत्र डिजिटल-विकास ब्रांड है, जिसमें ऑनलाइन टूल और वेब एप्लिकेशन का विकास और रखरखाव शामिल है।"
              }
            ]
          },
          {
            "p": [
              {
                "t": "FK Digital Media बैनर के तहत, परियोजनाएं गति, स्वच्छ यूजर इंटरफेस, गोपनीयता-अनुकूल वास्तुकला और व्यावहारिक उपयोगिता पर जोर देने के साथ बनाई जाती हैं।"
              }
            ]
          }
        ]
      },
      {
        "heading": "हम क्या बनाते हैं",
        "blocks": [
          {
            "p": [
              {
                "t": "प्लेटफ़ॉर्म वर्तमान में {cats} संगठित श्रेणियों में समूहीकृत {count} टूल प्रदान करता है:"
              }
            ]
          },
          {
            "ul": [
              [
                {
                  "b": "शब्द समाधानकर्ता:"
                },
                {
                  "t": "अनस्क्रैम्बलर्स, एनाग्राम सॉल्वर्स, क्रॉसवर्ड हेल्पर्स और Wordle असिस्टेंट।"
                }
              ],
              [
                {
                  "b": "पत्र उपकरण:"
                },
                {
                  "t": "शब्दों को आरंभ, अंत या अक्षरों से युक्त करके खोजें, वर्णों की गिनती करें और वाइल्डकार्ड पैटर्न का मिलान करें।"
                }
              ],
              [
                {
                  "b": "लेखन उपकरण:"
                },
                {
                  "t": "तुक खोजक, शब्दांश काउंटर, पर्यायवाची खोजक, और एंटोनिम जेनरेटर।"
                }
              ],
              [
                {
                  "b": "खेल सहायक:"
                },
                {
                  "t": "Scrabble, Words With Friends, Boggle, और Text Twist के लिए स्कोरिंग और बोर्ड सहायक।"
                }
              ],
              [
                {
                  "b": "उन्नत सॉल्वर:"
                },
                {
                  "t": "रेगेक्स पैटर्न खोज, गुम अक्षर खोजक, अक्षर पुनर्व्यवस्थित, और रिवर्स डिक्शनरी लुकअप।"
                }
              ],
              [
                {
                  "b": "पाठ विश्लेषण:"
                },
                {
                  "t": "अक्षर आवृत्ति विश्लेषक, स्वर/व्यंजन काउंटर, और वर्णमाला सॉर्टर।"
                }
              ],
              [
                {
                  "b": "शब्दकोश एवं संदर्भ:"
                },
                {
                  "t": "शब्द के अर्थ, IPA उच्चारण, शब्द की उत्पत्ति और उदाहरण वाक्य।"
                }
              ],
              [
                {
                  "b": "व्याकरण एवं शैली:"
                },
                {
                  "t": "वॉयस कन्वर्टर्स, पैसिव वॉयस चेकर्स और विराम चिह्न समीक्षा उपकरण।"
                }
              ],
              [
                {
                  "b": "पहेली सुलझाने वाले:"
                },
                {
                  "t": "Word Cookies, Wordscapes, CodyCross, और 7 Little Words के लिए सॉल्वर।"
                }
              ],
              [
                {
                  "b": "जेनरेटर और क्विज़:"
                },
                {
                  "t": "यादृच्छिक शब्द, विषय, अक्षर जनरेटर, और शब्दावली परीक्षण प्रश्नोत्तरी।"
                }
              ],
              [
                {
                  "b": "एआई लेखन उपकरण:"
                },
                {
                  "t": "एआई शब्द व्याख्याकार, वाक्य निर्माता, कहानी संकेत और फ्लैशकार्ड जनरेटर।"
                }
              ]
            ]
          },
          {
            "p": [
              {
                "t": "आप हमारे यहां संपूर्ण कैटलॉग का निरीक्षण कर सकते हैं"
              },
              {
                "a": "सभी उपकरण निर्देशिका",
                "to": "/tools"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "हमारे उपकरण कैसे काम करते हैं",
        "blocks": [
          {
            "p": [
              {
                "t": "AllWordTools पर अधिकांश सॉल्वर TypeScript और JavaScript में लिखे नियतात्मक एल्गोरिदम पर भरोसा करते हैं। जब आप कोई खोज शब्द दर्ज करते हैं, तो टूल आपकी क्वेरी को एल्गोरिथम नियमों (जैसे एनाग्राम क्रमपरिवर्तन, नियमित अभिव्यक्ति वाइल्डकार्ड फ़िल्टर, या अक्षर गणना मैट्रिक्स) में अनुवादित करता है और वैध मिलान खोजने के लिए क्यूरेटेड लेक्सिकल डेटासेट पर क्वेरी करता है।"
              }
            ]
          },
          {
            "p": [
              {
                "t": "मिलानों को स्पष्ट मानदंडों के अनुसार क्रमबद्ध किया जाता है: अक्षर की लंबाई, Scrabble टाइल बिंदु मान, या वर्णमाला क्रम।"
              }
            ]
          }
        ]
      },
      {
        "heading": "शब्द सूचियाँ और डेटा पारदर्शिता",
        "blocks": [
          {
            "p": [
              {
                "t": "परिणाम उत्पन्न करने के लिए, AllWordTools सार्वजनिक रूप से उपलब्ध लेक्सिकल डेटासेट, ओपन-सोर्स शब्द सूचियाँ (जैसे ENABLE, TWL-व्युत्पन्न सूचियाँ, और SOWPODS/CSW-संगत गेम सूचियाँ), और ध्वन्यात्मक/उच्चारण डेटा शामिल करता है।"
              }
            ]
          },
          {
            "p": [
              {
                "b": "स्वतंत्र स्थिति:"
              },
              {
                "t": "AllWordTools एक स्वतंत्र परियोजना है। यह Hasbro, Mattel, The New York Times, Zynga, या किसी भी बोर्ड गेम प्रकाशक से संबद्ध, समर्थित या प्रायोजित नहीं है। \"Scrabble,\" \"Words With Friends,\" या \"Wordle\" जैसे ट्रेडमार्क का उल्लेख केवल संगत गेमप्ले नियमों की पहचान करने के लिए वर्णनात्मक उद्देश्यों के लिए किया जाता है।"
              }
            ]
          },
          {
            "p": [
              {
                "t": "प्रत्येक डेटासेट, गणना पद्धति, गेम स्कोरिंग नियम और सभी 92 टूल की सीमा की विस्तृत तकनीकी जानकारी के लिए, हमारी वेबसाइट पर जाएँ।"
              },
              {
                "a": "कार्यप्रणाली एवं वर्ड डेटा गाइड",
                "to": "/methodology"
              },
              {
                "t": "और हमारा पढ़ें"
              },
              {
                "a": "डेटा सीमाएं गाइड",
                "to": "/data-limitations"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "सटीकता एवं परीक्षण",
        "blocks": [
          {
            "p": [
              {
                "t": "परिणाम शब्द सूचियों, डेटासेट, एल्गोरिदम और चयनित टूल द्वारा उपयोग किए गए नियमों से उत्पन्न होते हैं। जबकि सही स्कोरिंग और पैटर्न मिलान सुनिश्चित करने के लिए एल्गोरिदम को मानक बेंचमार्क के खिलाफ नियमित रूप से परीक्षण किया जाता है, कोई भी स्वचालित उपकरण प्रत्येक स्थानीयकृत शब्दकोश संस्करण या बोली के लिए 100% पूर्णता की गारंटी नहीं दे सकता है।"
              }
            ]
          },
          {
            "p": [
              {
                "t": "उपयोगकर्ताओं को औपचारिक परीक्षाओं, टूर्नामेंट नियम विवादों या शैक्षणिक कार्यों के लिए महत्वपूर्ण परिणामों को स्वतंत्र रूप से सत्यापित करने की सलाह दी जाती है। कृपया हमारा पूरा पढ़ें"
              },
              {
                "a": "डेटा सीमाएँ",
                "to": "/data-limitations"
              },
              {
                "t": "और"
              },
              {
                "a": "अस्वीकरण",
                "to": "/disclaimer"
              },
              {
                "t": "अतिरिक्त विवरण के लिए."
              }
            ]
          }
        ]
      },
      {
        "heading": "एआई उपकरण पारदर्शिता",
        "blocks": [
          {
            "p": [
              {
                "t": "हमारे रचनात्मक लेखन और शैक्षिक अनुभाग में कृत्रिम बुद्धिमत्ता द्वारा संचालित उपकरण शामिल हैं (जैसे"
              },
              {
                "a": "एआई शब्द व्याख्याकार",
                "to": "/tool/ai-word-explainer"
              },
              {
                "t": "और"
              },
              {
                "a": "एआई स्टोरी जेनरेटर",
                "to": "/tool/ai-story-generator"
              },
              {
                "t": ")."
              }
            ]
          },
          {
            "ul": [
              [
                {
                  "b": "स्वचालित पीढ़ी:"
                },
                {
                  "t": "एआई आउटपुट बड़े भाषा मॉडल द्वारा निर्मित होते हैं और कभी-कभी गलत, पुरानी या पक्षपातपूर्ण जानकारी उत्पन्न कर सकते हैं।"
                }
              ],
              [
                {
                  "b": "समीक्षा आउटपुट:"
                },
                {
                  "t": "अध्ययन या प्रकाशन के लिए एआई-जनरेटेड टेक्स्ट पर भरोसा करने से पहले हमेशा उसकी समीक्षा करें और संपादित करें।"
                }
              ],
              [
                {
                  "b": "गोपनीयता:"
                },
                {
                  "t": "एआई टूल इनपुट प्रॉम्प्ट में संवेदनशील, गोपनीय या निजी व्यक्तिगत जानकारी सबमिट न करें। प्रस्तुत पाठ बाहरी एआई एपीआई प्रदाताओं द्वारा संसाधित किया जाता है।"
                }
              ]
            ]
          },
          {
            "p": [
              {
                "t": "हमारे समर्पित एआई आर्किटेक्चर के बारे में और जानें"
              },
              {
                "a": "एआई उपकरण पारदर्शिता पृष्ठ",
                "to": "/ai-tools"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "गोपनीयता और डेटा प्रोसेसिंग",
        "blocks": [
          {
            "p": [
              {
                "t": "आपके डेटा को कैसे प्रबंधित किया जाता है, इसके संबंध में हम पारदर्शी तकनीकी प्रकटीकरण में विश्वास करते हैं:"
              }
            ]
          },
          {
            "ul": [
              [
                {
                  "b": "क्लाइंट-साइड एल्गोरिथम उपकरण:"
                },
                {
                  "t": "कोर सॉल्वर (जैसे लेटर काउंटर, सिलेबल काउंटर और अल्फाबेटिकल सॉर्टर) आपके इनपुट को पूरी तरह से आपके ब्राउज़र में प्रोसेस करते हैं। आपका इनपुट टेक्स्ट हमारे सर्वर पर संग्रहीत नहीं है।"
                }
              ],
              [
                {
                  "b": "सर्वर-सहायता प्राप्त और AI उपकरण:"
                },
                {
                  "t": "जिन उपकरणों को व्यापक शब्दकोश अनुक्रमण या एआई मॉडल अनुमान की आवश्यकता होती है, वे क्वेरी पैरामीटर को बैकएंड सर्वर रहित फ़ंक्शन या परिणाम वापस करने के लिए अधिकृत तृतीय-पक्ष एपीआई तक पहुंचाते हैं।"
                }
              ],
              [
                {
                  "b": "कोई अनिवार्य खाता नहीं:"
                },
                {
                  "t": "AllWordTools के लिए आपको किसी टूल तक पहुंचने के लिए खाता बनाने या व्यक्तिगत संपर्क विवरण प्रदान करने की आवश्यकता नहीं है।"
                }
              ]
            ]
          },
          {
            "p": [
              {
                "t": "कुकीज़, विज्ञापन और विश्लेषण पर पूरी जानकारी के लिए कृपया हमसे परामर्श लें"
              },
              {
                "a": "गोपनीयता नीति",
                "to": "/privacy"
              },
              {
                "t": "और"
              },
              {
                "a": "कुकी नीति",
                "to": "/cookie-policy"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "किसी त्रुटि/शब्द समस्या की रिपोर्ट करें",
        "blocks": [
          {
            "p": [
              {
                "t": "भाषा विकसित होती है, और सॉफ़्टवेयर में बग हो सकते हैं। यदि आप निम्नलिखित में से कोई भी नोटिस करते हैं:"
              }
            ]
          },
          {
            "ul": [
              [
                {
                  "t": "गलत या गलत वर्तनी वाला शब्द"
                }
              ],
              [
                {
                  "t": "किसी विशिष्ट खेल शब्दकोश के लिए एक अनुपलब्ध वैध शब्द"
                }
              ],
              [
                {
                  "t": "ग़लत परिभाषा या उच्चारण"
                }
              ],
              [
                {
                  "t": "ग़लत शब्दांश गणना या गेम स्कोर"
                }
              ],
              [
                {
                  "t": "एक टूटी हुई सुविधा या अप्रत्याशित सॉल्वर त्रुटि"
                }
              ]
            ]
          },
          {
            "p": [
              {
                "t": "कृपया हमें बताएं ताकि हम डेटासेट या कोड की जांच और अपडेट कर सकें। हमारे समर्पित पर जाएँ"
              },
              {
                "a": "किसी वर्ड या टूल त्रुटि पृष्ठ की रिपोर्ट करें",
                "to": "/report-error"
              },
              {
                "t": "विवरण सीधे Firoz Khan पर जमा करने के लिए।"
              }
            ]
          }
        ]
      },
      {
        "heading": "संपर्क एवं सत्यापित सामाजिक लिंक",
        "blocks": [
          {
            "p": [
              {
                "t": "तकनीकी पूछताछ, बग रिपोर्ट, व्यावसायिक चर्चा या फीडबैक के लिए, आप इसके माध्यम से संपर्क कर सकते हैं:"
              }
            ]
          },
          {
            "ul": [
              [
                {
                  "b": "सीधा ईमेल:"
                },
                {
                  "t": ""
                },
                {
                  "email": "hello@allwordtools.com"
                }
              ],
              [
                {
                  "b": "संपर्क एवं त्रुटि प्रपत्र:"
                },
                {
                  "t": ""
                },
                {
                  "a": "संपर्क पृष्ठ",
                  "to": "/contact"
                },
                {
                  "t": "या"
                },
                {
                  "a": "त्रुटि की रिपोर्ट करें",
                  "to": "/report-error"
                }
              ],
              [
                {
                  "b": "GitHub प्रोफ़ाइल:"
                },
                {
                  "t": ""
                },
                {
                  "url": "https://github.com/fkdigitalmedia"
                }
              ],
              [
                {
                  "b": "LinkedIn:"
                },
                {
                  "t": ""
                },
                {
                  "url": "https://www.linkedin.com/in/firoz-khan-1153358a/"
                }
              ],
              [
                {
                  "b": "Instagram:"
                },
                {
                  "t": ""
                },
                {
                  "url": "https://www.instagram.com/rtibyfiroz/"
                }
              ]
            ]
          }
        ]
      }
    ]
  },
  "ar": {
    "crumb": "حول",
    "pageTitle": "حول AllWordTools",
    "pageIntro": "مجموعة مستقلة من أدوات حل ألعاب الكلمات المجانية والمساعدين اللغويين وأدوات الكتابة المساعدة.",
    "metaTitle": "حول",
    "metaDescription": "يجمع AllWordTools المئات من أدوات حل ألعاب الكلمات المجانية وأدوات اللغة الإنجليزية معًا في مكان واحد سريع ومنظم بشكل جميل.",
    "authorRole": "مطور ومشرف Full Stack · FK Digital Media",
    "viewProfile": "عرض ملف تعريف المؤلف الكامل →",
    "sections": [
      {
        "heading": "ما هو AllWordTools",
        "blocks": [
          {
            "p": [
              {
                "b": "AllWordTools.com"
              },
              {
                "t": "عبارة عن مجموعة أدوات ويب مستقلة توفر {count} حلولًا مجانية لألعاب الكلمات عبر الإنترنت، ومكتشفات الحروف، وأدوات مساعدة للمفردات، وأدوات مساعدة لتحليل النص، ومساعدين للكتابة الإبداعية عبر {cats} فئات متميزة."
              }
            ]
          },
          {
            "p": [
              {
                "t": "سواء كنت تقوم بتفكيك الحروف للعبة عادية من Scrabble، أو العثور على مجموعات من خمسة أحرف لـ Wordle، أو عد المقاطع لقصيدة، أو التحقق من تعريفات الكلمات، فإن AllWordTools ينظم هذه الأدوات المساعدة في نظام أساسي سريع يمكن الوصول إليه دون الحاجة إلى تسجيل المستخدم أو عمليات تثبيت سطح المكتب أو الاشتراكات المدفوعة."
              }
            ]
          }
        ]
      },
      {
        "heading": "من ينشئها ويحافظ عليها",
        "blocks": [
          {
            "p": [
              {
                "t": "تم إنشاء AllWordTools.com وتطويره وصيانته تقنيًا بواسطة"
              },
              {
                "b": "Firoz Khan"
              },
              {
                "t": "، مطور Full Stack، تحت علامته التجارية المستقلة للتطوير الرقمي"
              },
              {
                "b": "FK Digital Media"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "حول Firoz Khan",
        "blocks": [
          {
            "card": true
          },
          {
            "p": [
              {
                "b": "Firoz Khan"
              },
              {
                "t": "هو مطور Full Stack يقوم بتصميم تطبيقات الويب وأدوات البرامج التفاعلية. يشمل دوره الفني في AllWordTools بنية موقع الويب الكاملة، وتطوير واجهة المستخدم الأمامية، وتنفيذ الحلول الخوارزمية، واستعلامات قاعدة البيانات، وضبط الأداء، والصيانة المستمرة."
              }
            ]
          },
          {
            "p": [
              {
                "t": "يتعامل فيروز مع الموقع بشكل صارم من منظور هندسة البرمجيات والخوارزميات. لا يطالب بأوراق اعتماده باعتباره لغويًا أو معجميًا أو أستاذًا أكاديميًا أو مسؤولًا في البطولة. وبدلاً من ذلك، يركز على كتابة خوارزميات بحث فعالة تطابق مدخلات المستخدم مع مجموعات البيانات المنظمة بدقة وسرعة."
              }
            ]
          },
          {
            "p": [
              {
                "t": "تعرف على المزيد على صفحة المؤلف المخصصة له:"
              },
              {
                "a": "Firoz Khan — ملف تعريف المؤلف والمشرف",
                "to": "/about/firoz-khan"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "حول FK Digital Media",
        "blocks": [
          {
            "p": [
              {
                "b": "FK Digital Media"
              },
              {
                "t": "هي العلامة التجارية المستقلة للتطوير الرقمي المرتبطة بمشاريع الويب الخاصة بـ Firoz Khan، بما في ذلك تطوير وصيانة الأدوات عبر الإنترنت وتطبيقات الويب."
              }
            ]
          },
          {
            "p": [
              {
                "t": "تحت شعار FK Digital Media، يتم إنشاء المشاريع مع التركيز على السرعة وواجهات المستخدم النظيفة والبنية الصديقة للخصوصية والفائدة العملية."
              }
            ]
          }
        ]
      },
      {
        "heading": "ما نبنيه",
        "blocks": [
          {
            "p": [
              {
                "t": "يقدم النظام الأساسي حاليًا أدوات {count} مجمعة في فئات منظمة {cats}:"
              }
            ]
          },
          {
            "ul": [
              [
                {
                  "b": "حلول الكلمات:"
                },
                {
                  "t": "أدوات فك التشفير، وحل الجناس الناقص، ومساعدي الكلمات المتقاطعة، ومساعدي Wordle."
                }
              ],
              [
                {
                  "b": "أدوات الرسالة:"
                },
                {
                  "t": "ابحث عن الكلمات عن طريق البدء أو النهاية أو احتواء الحروف، وعدد الأحرف، ومطابقة أنماط أحرف البدل."
                }
              ],
              [
                {
                  "b": "أدوات الكتابة:"
                },
                {
                  "t": "مكتشفو القافية، وعدادات المقاطع، ومكتشفو المرادفات، ومولدات المتضادات."
                }
              ],
              [
                {
                  "b": "مساعدو اللعبة:"
                },
                {
                  "t": "مساعدو التسجيل واللوحة لـ Scrabble وWords With Friends وBoggle وText Twist."
                }
              ],
              [
                {
                  "b": "الحلول المتقدمة:"
                },
                {
                  "t": "البحث عن نمط Regex، ومكتشفي الحروف المفقودة، وإعادة ترتيب الحروف، وعمليات البحث العكسي في القاموس."
                }
              ],
              [
                {
                  "b": "تحليل النص:"
                },
                {
                  "t": "محللات تردد الحروف، وعدادات حروف العلة/الحروف الساكنة، وفرز الحروف الأبجدية."
                }
              ],
              [
                {
                  "b": "القاموس والمرجع:"
                },
                {
                  "t": "معاني الكلمات، ونطق IPA، وأصول الكلمات، وأمثلة الجمل."
                }
              ],
              [
                {
                  "b": "القواعد والأسلوب:"
                },
                {
                  "t": "محولات الصوت، ومدققات الصوت السلبية، وأدوات مراجعة علامات الترقيم."
                }
              ],
              [
                {
                  "b": "أدوات حل الألغاز:"
                },
                {
                  "t": "أدوات حل Word Cookies وWordscapes وCodyCross و7 Little Words."
                }
              ],
              [
                {
                  "b": "المولدات والاختبارات:"
                },
                {
                  "t": "كلمة عشوائية، والموضوع، ومولدات الرسالة، ومسابقات اختبار المفردات."
                }
              ],
              [
                {
                  "b": "أدوات الكتابة بالذكاء الاصطناعي:"
                },
                {
                  "t": "أدوات شرح الكلمات التي تعمل بالذكاء الاصطناعي، ومنشئو الجمل، ومطالبات القصة، ومولدات البطاقات التعليمية."
                }
              ]
            ]
          },
          {
            "p": [
              {
                "t": "يمكنك فحص الكتالوج بأكمله على موقعنا"
              },
              {
                "a": "دليل جميع الأدوات",
                "to": "/tools"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "كيف تعمل أدواتنا",
        "blocks": [
          {
            "p": [
              {
                "t": "تعتمد غالبية الحلول على AllWordTools على الخوارزميات الحتمية المكتوبة باللغتين TypeScript وJavaScript. عند إدخال مصطلح بحث، تقوم الأداة بترجمة استعلامك إلى قواعد خوارزمية (مثل تبديلات الجناس الناقص، أو مرشحات أحرف البدل للتعبير العادي، أو مصفوفات عدد الأحرف) والاستعلام عن مجموعات البيانات المعجمية المنسقة للعثور على التطابقات الصالحة."
              }
            ]
          },
          {
            "p": [
              {
                "t": "يتم فرز المطابقات وفقًا لمعايير واضحة: طول الحرف، أو قيم نقاط التجانب Scrabble، أو الترتيب الأبجدي."
              }
            ]
          }
        ]
      },
      {
        "heading": "قوائم الكلمات وشفافية البيانات",
        "blocks": [
          {
            "p": [
              {
                "t": "لتوليد النتائج، يتضمن AllWordTools مجموعات البيانات المعجمية المتاحة للجمهور، وقوائم الكلمات مفتوحة المصدر (مثل ENABLE، والقوائم المشتقة من TWL، وقوائم الألعاب المتوافقة مع SOWPODS/CSW)، والبيانات الصوتية/النطق."
              }
            ]
          },
          {
            "p": [
              {
                "b": "الحالة المستقلة:"
              },
              {
                "t": "AllWordTools هو مشروع مستقل. إنها ليست تابعة أو معتمدة من قبل أو مدعومة من قبل Hasbro أو Mattel أو The New York Times أو Zynga أو أي ناشر لألعاب الطاولة. يتم استخدام الإشارات إلى العلامات التجارية مثل \"Scrabble\" أو \"Words With Friends\" أو \"Wordle\" فقط لأغراض وصفية لتحديد قواعد اللعب المتوافقة."
              }
            ]
          },
          {
            "p": [
              {
                "t": "للحصول على تفاصيل فنية شاملة لكل مجموعة بيانات، وطريقة حسابية، وقاعدة تسجيل اللعبة، والقيود عبر جميع الأدوات الـ 92، قم بزيارة موقعنا"
              },
              {
                "a": "دليل المنهجية وبيانات الكلمات",
                "to": "/methodology"
              },
              {
                "t": "وقراءة لدينا"
              },
              {
                "a": "دليل قيود البيانات",
                "to": "/data-limitations"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "الدقة والاختبار",
        "blocks": [
          {
            "p": [
              {
                "t": "يتم إنشاء النتائج من قوائم الكلمات ومجموعات البيانات والخوارزميات والقواعد التي تستخدمها الأداة المحددة. في حين يتم اختبار الخوارزميات بانتظام مقابل المعايير القياسية لضمان التسجيل الصحيح ومطابقة الأنماط، لا توجد أداة آلية يمكنها ضمان اكتمال 100% لكل متغير أو لهجة قاموس محلية."
              }
            ]
          },
          {
            "p": [
              {
                "t": "يُنصح المستخدمون بالتحقق من النتائج المهمة بشكل مستقل للامتحانات الرسمية أو النزاعات حول قواعد البطولة أو العمل الأكاديمي. يرجى قراءة كامل لدينا"
              },
              {
                "a": "قيود البيانات",
                "to": "/data-limitations"
              },
              {
                "t": "و"
              },
              {
                "a": "إخلاء المسؤولية",
                "to": "/disclaimer"
              },
              {
                "t": "للحصول على تفاصيل إضافية."
              }
            ]
          }
        ]
      },
      {
        "heading": "شفافية أدوات الذكاء الاصطناعي",
        "blocks": [
          {
            "p": [
              {
                "t": "يشتمل قسم الكتابة الإبداعية والتعليم لدينا على أدوات مدعومة بالذكاء الاصطناعي (مثل"
              },
              {
                "a": "مفسر الكلمات بالذكاء الاصطناعي",
                "to": "/tool/ai-word-explainer"
              },
              {
                "t": "و"
              },
              {
                "a": "مولد قصة الذكاء الاصطناعي",
                "to": "/tool/ai-story-generator"
              },
              {
                "t": ")."
              }
            ]
          },
          {
            "ul": [
              [
                {
                  "b": "الجيل الآلي:"
                },
                {
                  "t": "يتم إنتاج مخرجات الذكاء الاصطناعي بواسطة نماذج لغوية كبيرة وقد تنتج أحيانًا معلومات غير دقيقة أو قديمة أو متحيزة."
                }
              ],
              [
                {
                  "b": "مراجعة الإخراج:"
                },
                {
                  "t": "قم دائمًا بمراجعة وتحرير النص الذي تم إنشاؤه بواسطة الذكاء الاصطناعي قبل الاعتماد عليه للدراسة أو النشر."
                }
              ],
              [
                {
                  "b": "السرية:"
                },
                {
                  "t": "لا ترسل معلومات شخصية حساسة أو سرية أو خاصة إلى مطالبات إدخال أداة الذكاء الاصطناعي. تتم معالجة النص المقدم من قبل موفري AI API الخارجيين."
                }
              ]
            ]
          },
          {
            "p": [
              {
                "t": "تعرف على المزيد حول بنية الذكاء الاصطناعي الخاصة بنا على موقعنا المخصص"
              },
              {
                "a": "صفحة الشفافية لأدوات الذكاء الاصطناعي",
                "to": "/ai-tools"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "الخصوصية ومعالجة البيانات",
        "blocks": [
          {
            "p": [
              {
                "t": "نحن نؤمن بالإفصاح الفني الشفاف فيما يتعلق بكيفية التعامل مع بياناتك:"
              }
            ]
          },
          {
            "ul": [
              [
                {
                  "b": "أدوات الخوارزمية من جانب العميل:"
                },
                {
                  "t": "تقوم أدوات الحل الأساسية (مثل عداد الحروف وعداد المقاطع والفارز الأبجدي) بمعالجة إدخالاتك بالكامل في متصفحك. لا يتم تخزين نص الإدخال الخاص بك على خوادمنا."
                }
              ],
              [
                {
                  "b": "أدوات مساعدة الخادم والذكاء الاصطناعي:"
                },
                {
                  "t": "تقوم الأدوات التي تتطلب فهرسة قاموسية واسعة النطاق أو استنتاج نموذج الذكاء الاصطناعي بإرسال معلمات الاستعلام إلى وظائف الواجهة الخلفية بدون خادم أو واجهات برمجة التطبيقات المعتمدة من جهة خارجية لإرجاع النتائج."
                }
              ],
              [
                {
                  "b": "لا توجد حسابات إلزامية:"
                },
                {
                  "t": "لا يتطلب منك AllWordTools إنشاء حساب أو تقديم تفاصيل اتصال شخصية للوصول إلى أي أداة."
                }
              ]
            ]
          },
          {
            "p": [
              {
                "t": "للحصول على تفاصيل كاملة حول ملفات تعريف الارتباط والإعلانات والتحليلات، يرجى الرجوع إلى موقعنا"
              },
              {
                "a": "سياسة الخصوصية",
                "to": "/privacy"
              },
              {
                "t": "و"
              },
              {
                "a": "سياسة ملفات تعريف الارتباط",
                "to": "/cookie-policy"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "الإبلاغ عن خطأ / مشكلة Word",
        "blocks": [
          {
            "p": [
              {
                "t": "تتطور اللغة، ويمكن أن تحتوي البرامج على أخطاء. إذا لاحظت أيًا مما يلي:"
              }
            ]
          },
          {
            "ul": [
              [
                {
                  "t": "كلمة غير صحيحة أو بها أخطاء إملائية"
                }
              ],
              [
                {
                  "t": "كلمة صالحة مفقودة لقاموس لعبة معينة"
                }
              ],
              [
                {
                  "t": "تعريف أو نطق غير صحيح"
                }
              ],
              [
                {
                  "t": "عدد مقطع لفظي غير دقيق أو نتيجة اللعبة"
                }
              ],
              [
                {
                  "t": "ميزة معطلة أو خطأ غير متوقع في الحل"
                }
              ]
            ]
          },
          {
            "p": [
              {
                "t": "يرجى إعلامنا حتى نتمكن من التحقيق في مجموعة البيانات أو الكود وتحديثها. قم بزيارة موقعنا المخصص"
              },
              {
                "a": "الإبلاغ عن صفحة خطأ في Word أو أداة",
                "to": "/report-error"
              },
              {
                "t": "لإرسال التفاصيل مباشرة إلى Firoz Khan."
              }
            ]
          }
        ]
      },
      {
        "heading": "الاتصال والروابط الاجتماعية التي تم التحقق منها",
        "blocks": [
          {
            "p": [
              {
                "t": "للاستفسارات الفنية أو تقارير الأخطاء أو مناقشات الأعمال أو التعليقات، يمكنك التواصل عبر:"
              }
            ]
          },
          {
            "ul": [
              [
                {
                  "b": "البريد الإلكتروني المباشر:"
                },
                {
                  "t": ""
                },
                {
                  "email": "hello@allwordtools.com"
                }
              ],
              [
                {
                  "b": "نموذج الاتصال والخطأ:"
                },
                {
                  "t": ""
                },
                {
                  "a": "صفحة الاتصال",
                  "to": "/contact"
                },
                {
                  "t": "أو"
                },
                {
                  "a": "الإبلاغ عن خطأ",
                  "to": "/report-error"
                }
              ],
              [
                {
                  "b": "الملف الشخصي GitHub:"
                },
                {
                  "t": ""
                },
                {
                  "url": "https://github.com/fkdigitalmedia"
                }
              ],
              [
                {
                  "b": "LinkedIn:"
                },
                {
                  "t": ""
                },
                {
                  "url": "https://www.linkedin.com/in/firoz-khan-1153358a/"
                }
              ],
              [
                {
                  "b": "Instagram:"
                },
                {
                  "t": ""
                },
                {
                  "url": "https://www.instagram.com/rtibyfiroz/"
                }
              ]
            ]
          }
        ]
      }
    ]
  },
  "de": {
    "crumb": "Über",
    "pageTitle": "Über AllWordTools",
    "pageIntro": "Eine unabhängige Sammlung kostenloser Wortspiellöser, Sprachhilfen und Schreibhilfsprogramme.",
    "metaTitle": "Über",
    "metaDescription": "AllWordTools vereint Hunderte kostenloser Wortspiellöser und Englisch-Sprachtools an einem schnellen, schön organisierten Ort.",
    "authorRole": "Full-Stack-Entwickler und -Betreuer · FK Digital Media",
    "viewProfile": "Vollständiges Autorenprofil anzeigen →",
    "sections": [
      {
        "heading": "Was AllWordTools ist",
        "blocks": [
          {
            "p": [
              {
                "b": "AllWordTools.com"
              },
              {
                "t": "ist ein unabhängiges Web-Toolkit, das {count} kostenlose Online-Wortspiellöser, Buchstabenfinder, Vokabelhilfen, Textanalyse-Dienstprogramme und kreative Schreibhilfen in {cats} verschiedenen Kategorien bereitstellt."
              }
            ]
          },
          {
            "p": [
              {
                "t": "Egal, ob Sie Buchstaben für ein Gelegenheitsspiel Scrabble entschlüsseln, Fünf-Buchstaben-Kombinationen für Wordle finden, Silben für ein Gedicht zählen oder Wortdefinitionen überprüfen, AllWordTools organisiert diese Dienstprogramme auf einer schnellen, zugänglichen Plattform, ohne dass eine Benutzerregistrierung, Desktop-Installationen oder kostenpflichtige Abonnements erforderlich sind."
              }
            ]
          }
        ]
      },
      {
        "heading": "Wer es erstellt und pflegt",
        "blocks": [
          {
            "p": [
              {
                "t": "AllWordTools.com wird erstellt, entwickelt und technisch gewartet von"
              },
              {
                "b": "Firoz Khan"
              },
              {
                "t": ", ein Full-Stack-Entwickler, unter seiner unabhängigen Marke für digitale Entwicklung"
              },
              {
                "b": "FK Digital Media"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "Über Firoz Khan",
        "blocks": [
          {
            "card": true
          },
          {
            "p": [
              {
                "b": "Firoz Khan"
              },
              {
                "t": "ist ein Full-Stack-Entwickler, der Webanwendungen und interaktive Software-Dienstprogramme entwickelt. Seine technische Rolle bei AllWordTools umfasst die Full-Stack-Website-Architektur, Frontend-UI-Entwicklung, algorithmische Solver-Implementierung, Datenbankabfragen, Leistungsoptimierung und kontinuierliche Wartung."
              }
            ]
          },
          {
            "p": [
              {
                "t": "Firoz geht die Website ausschließlich aus softwaretechnischer und algorithmischer Sicht an. Er erhebt keinen Anspruch auf Qualifikationen als Linguist, Lexikograph, akademischer Professor oder Turnierfunktionär. Stattdessen konzentriert er sich darauf, effiziente Suchalgorithmen zu schreiben, die Benutzereingaben genau und schnell mit strukturierten Datensätzen abgleichen."
              }
            ]
          },
          {
            "p": [
              {
                "t": "Erfahren Sie mehr auf seiner speziellen Autorenseite:"
              },
              {
                "a": "Firoz Khan – Profil des Autors und Betreuers",
                "to": "/about/firoz-khan"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "Über FK Digital Media",
        "blocks": [
          {
            "p": [
              {
                "b": "FK Digital Media"
              },
              {
                "t": "ist die unabhängige Marke für digitale Entwicklung, die mit den Webprojekten von Firoz Khan verbunden ist, einschließlich der Entwicklung und Wartung von Online-Tools und Webanwendungen."
              }
            ]
          },
          {
            "p": [
              {
                "t": "Unter dem Banner FK Digital Media werden Projekte mit Schwerpunkt auf Geschwindigkeit, sauberen Benutzeroberflächen, datenschutzfreundlicher Architektur und praktischem Nutzen erstellt."
              }
            ]
          }
        ]
      },
      {
        "heading": "Was wir bauen",
        "blocks": [
          {
            "p": [
              {
                "t": "Die Plattform bietet derzeit {count} Tools, die in {cats} organisierte Kategorien gruppiert sind:"
              }
            ]
          },
          {
            "ul": [
              [
                {
                  "b": "Wortlöser:"
                },
                {
                  "t": "Entschlüssler, Anagrammlöser, Kreuzworträtsel-Helfer und Wordle-Assistenten."
                }
              ],
              [
                {
                  "b": "Buchstaben-Tools:"
                },
                {
                  "t": "Suchen Sie nach Wörtern, indem Sie Buchstaben beginnen, enden oder enthalten, zählen Sie Zeichen und suchen Sie nach Platzhaltermustern."
                }
              ],
              [
                {
                  "b": "Schreibwerkzeuge:"
                },
                {
                  "t": "Reimfinder, Silbenzähler, Synonymfinder und Antonymgeneratoren."
                }
              ],
              [
                {
                  "b": "Spielhelfer:"
                },
                {
                  "t": "Scoring- und Board-Helfer für Scrabble, Words With Friends, Boggle und Text Twist."
                }
              ],
              [
                {
                  "b": "Erweiterte Löser:"
                },
                {
                  "t": "Regex-Mustersuche, Suche nach fehlenden Buchstaben, Neuanordnung von Buchstaben und umgekehrte Wörterbuchsuche."
                }
              ],
              [
                {
                  "b": "Textanalyse:"
                },
                {
                  "t": "Buchstabenfrequenzanalysatoren, Vokal-/Konsonantenzähler und alphabetische Sortierer."
                }
              ],
              [
                {
                  "b": "Wörterbuch & Referenz:"
                },
                {
                  "t": "Wortbedeutungen, IPA Aussprachen, Wortherkunft und Beispielsätze."
                }
              ],
              [
                {
                  "b": "Grammatik und Stil:"
                },
                {
                  "t": "Sprachkonverter, passive Sprachprüfer und Tools zur Interpunktionsüberprüfung."
                }
              ],
              [
                {
                  "b": "Rätsellöser:"
                },
                {
                  "t": "Solver für Word Cookies, Wordscapes, CodyCross und 7 Little Words."
                }
              ],
              [
                {
                  "b": "Generatoren und Quiz:"
                },
                {
                  "t": "Zufällige Wort-, Themen-, Buchstabengeneratoren und Vokabeltests."
                }
              ],
              [
                {
                  "b": "KI-Schreibwerkzeuge:"
                },
                {
                  "t": "KI-Worterklärer, Satzersteller, Story-Eingabeaufforderungen und Lernkartengeneratoren."
                }
              ]
            ]
          },
          {
            "p": [
              {
                "t": "Den gesamten Katalog können Sie bei uns einsehen"
              },
              {
                "a": "Verzeichnis „Alle Tools“.",
                "to": "/tools"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "Wie unsere Tools funktionieren",
        "blocks": [
          {
            "p": [
              {
                "t": "Die meisten Solver auf AllWordTools basieren auf deterministischen Algorithmen, die in TypeScript und JavaScript geschrieben sind. Wenn Sie einen Suchbegriff eingeben, übersetzt das Tool Ihre Abfrage in algorithmische Regeln (z. B. Anagrammpermutationen, Platzhalterfilter für reguläre Ausdrücke oder Matrizen zur Buchstabenanzahl) und fragt kuratierte lexikalische Datensätze ab, um gültige Übereinstimmungen zu finden."
              }
            ]
          },
          {
            "p": [
              {
                "t": "Übereinstimmungen werden nach expliziten Kriterien sortiert: Buchstabenlänge, Scrabble-Kachelpunktwerte oder alphabetische Reihenfolge."
              }
            ]
          }
        ]
      },
      {
        "heading": "Wortlisten und Datentransparenz",
        "blocks": [
          {
            "p": [
              {
                "t": "Um Ergebnisse zu generieren, integriert AllWordTools öffentlich verfügbare lexikalische Datensätze, Open-Source-Wortlisten (wie ENABLE, von TWL abgeleitete Listen und SOWPODS/CSW-kompatible Spielelisten) sowie Phonetik-/Aussprachedaten."
              }
            ]
          },
          {
            "p": [
              {
                "b": "Unabhängiger Status:"
              },
              {
                "t": "AllWordTools ist ein unabhängiges Projekt. Es ist nicht mit Hasbro, Mattel, The New York Times, Zynga oder einem anderen Brettspielherausgeber verbunden, wird von diesen nicht unterstützt oder gesponsert. Erwähnungen von Marken wie „Scrabble“, „Words With Friends“ oder „Wordle“ werden ausschließlich zu beschreibenden Zwecken verwendet, um kompatible Spielregeln zu identifizieren."
              }
            ]
          },
          {
            "p": [
              {
                "t": "Eine ausführliche technische Aufschlüsselung aller Datensätze, Berechnungsmethoden, Spielbewertungsregeln und Einschränkungen aller 92 Tools finden Sie auf unserer Website"
              },
              {
                "a": "Leitfaden zur Methodik und Word-Daten",
                "to": "/methodology"
              },
              {
                "t": "und lesen Sie unsere"
              },
              {
                "a": "Leitfaden zu Datenbeschränkungen",
                "to": "/data-limitations"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "Genauigkeit und Prüfung",
        "blocks": [
          {
            "p": [
              {
                "t": "Ergebnisse werden aus den Wortlisten, Datensätzen, Algorithmen und Regeln generiert, die vom ausgewählten Tool verwendet werden. Während Algorithmen regelmäßig anhand von Standard-Benchmarks getestet werden, um eine korrekte Bewertung und Musterübereinstimmung sicherzustellen, kann kein automatisiertes Tool eine 100-prozentige Vollständigkeit für jede lokalisierte Wörterbuchvariante oder jeden lokalisierten Dialekt garantieren."
              }
            ]
          },
          {
            "p": [
              {
                "t": "Benutzern wird empfohlen, kritische Ergebnisse bei formellen Prüfungen, Streitigkeiten über Turnierregeln oder bei akademischen Arbeiten unabhängig zu überprüfen. Bitte lesen Sie unsere vollständige"
              },
              {
                "a": "Datenbeschränkungen",
                "to": "/data-limitations"
              },
              {
                "t": "und"
              },
              {
                "a": "Haftungsausschluss",
                "to": "/disclaimer"
              },
              {
                "t": "für weitere Details."
              }
            ]
          }
        ]
      },
      {
        "heading": "Transparenz bei KI-Tools",
        "blocks": [
          {
            "p": [
              {
                "t": "Unser Bereich für kreatives Schreiben und Bildung umfasst Tools, die auf künstlicher Intelligenz basieren (z. B"
              },
              {
                "a": "KI-Worterklärer",
                "to": "/tool/ai-word-explainer"
              },
              {
                "t": "und"
              },
              {
                "a": "KI-Story-Generator",
                "to": "/tool/ai-story-generator"
              },
              {
                "t": ")."
              }
            ]
          },
          {
            "ul": [
              [
                {
                  "b": "Automatisierte Generierung:"
                },
                {
                  "t": "KI-Ausgaben werden von großen Sprachmodellen erzeugt und können gelegentlich ungenaue, veraltete oder voreingenommene Informationen liefern."
                }
              ],
              [
                {
                  "b": "Rezensionsergebnis:"
                },
                {
                  "t": "Überprüfen und bearbeiten Sie immer KI-generierten Text, bevor Sie ihn zum Studium oder zur Veröffentlichung verwenden."
                }
              ],
              [
                {
                  "b": "Vertraulichkeit:"
                },
                {
                  "t": "Geben Sie keine sensiblen, vertraulichen oder privaten persönlichen Informationen an die Eingabeaufforderungen von KI-Tools weiter. Der übermittelte Text wird von externen AI-API-Anbietern verarbeitet."
                }
              ]
            ]
          },
          {
            "p": [
              {
                "t": "Erfahren Sie mehr über unsere KI-Architektur auf unserer speziellen Seite"
              },
              {
                "a": "AI Tools-Transparenzseite",
                "to": "/ai-tools"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "Datenschutz und Datenverarbeitung",
        "blocks": [
          {
            "p": [
              {
                "t": "Wir legen großen Wert auf eine transparente technische Offenlegung des Umgangs mit Ihren Daten:"
              }
            ]
          },
          {
            "ul": [
              [
                {
                  "b": "Clientseitige algorithmische Tools:"
                },
                {
                  "t": "Kernlöser (wie der Buchstabenzähler, der Silbenzähler und der alphabetische Sortierer) verarbeiten Ihre Eingaben vollständig in Ihrem Browser. Ihr eingegebener Text wird nicht auf unseren Servern gespeichert."
                }
              ],
              [
                {
                  "b": "Servergestützte und KI-Tools:"
                },
                {
                  "t": "Tools, die eine umfassende Wörterbuchindizierung oder KI-Modellinferenz erfordern, übertragen Abfrageparameter an serverlose Back-End-Funktionen oder autorisierte APIs von Drittanbietern, um Ergebnisse zurückzugeben."
                }
              ],
              [
                {
                  "b": "Keine Pflichtkonten:"
                },
                {
                  "t": "AllWordTools erfordert nicht, dass Sie ein Konto erstellen oder persönliche Kontaktdaten angeben, um auf ein Tool zuzugreifen."
                }
              ]
            ]
          },
          {
            "p": [
              {
                "t": "Ausführliche Informationen zu Cookies, Werbung und Analysen finden Sie in unserem"
              },
              {
                "a": "Datenschutzrichtlinie",
                "to": "/privacy"
              },
              {
                "t": "und"
              },
              {
                "a": "Cookie-Richtlinie",
                "to": "/cookie-policy"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "Melden Sie einen Fehler/ein Wortproblem",
        "blocks": [
          {
            "p": [
              {
                "t": "Sprache entwickelt sich weiter und Software kann Fehler enthalten. Wenn Sie Folgendes bemerken:"
              }
            ]
          },
          {
            "ul": [
              [
                {
                  "t": "Ein falsches oder falsch geschriebenes Wort"
                }
              ],
              [
                {
                  "t": "Ein gültiges Wort für ein bestimmtes Spielwörterbuch fehlt"
                }
              ],
              [
                {
                  "t": "Eine falsche Definition oder Aussprache"
                }
              ],
              [
                {
                  "t": "Eine ungenaue Silbenzählung oder ein ungenauer Spielstand"
                }
              ],
              [
                {
                  "t": "Eine defekte Funktion oder ein unerwarteter Solver-Fehler"
                }
              ]
            ]
          },
          {
            "p": [
              {
                "t": "Bitte teilen Sie uns dies mit, damit wir den Datensatz oder Code untersuchen und aktualisieren können. Besuchen Sie unser engagiertes"
              },
              {
                "a": "Melden Sie eine Word- oder Tool-Fehlerseite",
                "to": "/report-error"
              },
              {
                "t": "um Details direkt an Firoz Khan zu übermitteln."
              }
            ]
          }
        ]
      },
      {
        "heading": "Kontakt und verifizierte soziale Links",
        "blocks": [
          {
            "p": [
              {
                "t": "Für technische Anfragen, Fehlerberichte, geschäftliche Diskussionen oder Feedback können Sie uns erreichen über:"
              }
            ]
          },
          {
            "ul": [
              [
                {
                  "b": "Direkte E-Mail:"
                },
                {
                  "t": ""
                },
                {
                  "email": "hello@allwordtools.com"
                }
              ],
              [
                {
                  "b": "Kontakt- und Fehlerformular:"
                },
                {
                  "t": ""
                },
                {
                  "a": "Kontaktseite",
                  "to": "/contact"
                },
                {
                  "t": "oder"
                },
                {
                  "a": "Melden Sie einen Fehler",
                  "to": "/report-error"
                }
              ],
              [
                {
                  "b": "GitHub Profil:"
                },
                {
                  "t": ""
                },
                {
                  "url": "https://github.com/fkdigitalmedia"
                }
              ],
              [
                {
                  "b": "LinkedIn:"
                },
                {
                  "t": ""
                },
                {
                  "url": "https://www.linkedin.com/in/firoz-khan-1153358a/"
                }
              ],
              [
                {
                  "b": "Instagram:"
                },
                {
                  "t": ""
                },
                {
                  "url": "https://www.instagram.com/rtibyfiroz/"
                }
              ]
            ]
          }
        ]
      }
    ]
  },
  "pt": {
    "crumb": "Sobre",
    "pageTitle": "Sobre AllWordTools",
    "pageIntro": "Uma coleção independente de solucionadores de jogos de palavras gratuitos, auxiliares de linguagem e utilitários de escrita.",
    "metaTitle": "Sobre",
    "metaDescription": "AllWordTools reúne centenas de solucionadores de jogos de palavras gratuitos e ferramentas do idioma inglês em um local rápido e bem organizado.",
    "authorRole": "Desenvolvedor e Mantenedor Full Stack · FK Digital Media",
    "viewProfile": "Ver perfil completo do autor →",
    "sections": [
      {
        "heading": "O que é AllWordTools",
        "blocks": [
          {
            "p": [
              {
                "b": "AllWordTools.com"
              },
              {
                "t": "é um kit de ferramentas da web independente que fornece {count} solucionadores de jogos de palavras online gratuitos, localizadores de letras, auxílios de vocabulário, utilitários de análise de texto e auxiliares de escrita criativa em {cats} categorias distintas."
              }
            ]
          },
          {
            "p": [
              {
                "t": "Esteja você desembaralhando letras para um jogo casual de Scrabble, encontrando combinações de cinco letras para Wordle, contando sílabas para um poema ou verificando definições de palavras, AllWordTools organiza esses utilitários em uma plataforma rápida e acessível sem exigir registro de usuário, instalações de desktop ou assinaturas pagas."
              }
            ]
          }
        ]
      },
      {
        "heading": "Quem cria e mantém",
        "blocks": [
          {
            "p": [
              {
                "t": "AllWordTools.com é criado, desenvolvido e tecnicamente mantido por"
              },
              {
                "b": "Firoz Khan"
              },
              {
                "t": ", um desenvolvedor Full Stack, sob sua marca independente de desenvolvimento digital"
              },
              {
                "b": "FK Digital Media"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "Sobre Firoz Khan",
        "blocks": [
          {
            "card": true
          },
          {
            "p": [
              {
                "b": "Firoz Khan"
              },
              {
                "t": "é um desenvolvedor Full Stack que desenvolve aplicações web e utilitários de software interativos. Sua função técnica no AllWordTools abrange arquitetura de site full-stack, desenvolvimento de UI frontend, implementação de solucionador algorítmico, consultas de banco de dados, ajuste de desempenho e manutenção contínua."
              }
            ]
          },
          {
            "p": [
              {
                "t": "Firoz aborda o site estritamente de uma perspectiva algorítmica e de engenharia de software. Ele não reivindica credenciais como lingüista, lexicógrafo, professor acadêmico ou oficial de torneio. Em vez disso, ele se concentra em escrever algoritmos de pesquisa eficientes que combinem as entradas do usuário com conjuntos de dados estruturados com precisão e rapidez."
              }
            ]
          },
          {
            "p": [
              {
                "t": "Saiba mais em sua página dedicada ao autor:"
              },
              {
                "a": "Firoz Khan - Perfil do autor e mantenedor",
                "to": "/about/firoz-khan"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "Sobre FK Digital Media",
        "blocks": [
          {
            "p": [
              {
                "b": "FK Digital Media"
              },
              {
                "t": "é a marca independente de desenvolvimento digital associada aos projetos web da Firoz Khan, incluindo o desenvolvimento e manutenção de ferramentas online e aplicações web."
              }
            ]
          },
          {
            "p": [
              {
                "t": "Sob a bandeira FK Digital Media, os projetos são construídos com ênfase na velocidade, interfaces de usuário limpas, arquitetura amigável à privacidade e utilidade prática."
              }
            ]
          }
        ]
      },
      {
        "heading": "O que construímos",
        "blocks": [
          {
            "p": [
              {
                "t": "A plataforma oferece atualmente {count} ferramentas agrupadas em categorias organizadas de {cats}:"
              }
            ]
          },
          {
            "ul": [
              [
                {
                  "b": "Solucionadores de palavras:"
                },
                {
                  "t": "Desembaralhadores, solucionadores de anagramas, auxiliares de palavras cruzadas e assistentes Wordle."
                }
              ],
              [
                {
                  "b": "Ferramentas de carta:"
                },
                {
                  "t": "Pesquise palavras começando, terminando ou contendo letras, conte caracteres e combine padrões de curinga."
                }
              ],
              [
                {
                  "b": "Ferramentas de escrita:"
                },
                {
                  "t": "Localizadores de rimas, contadores de sílabas, localizadores de sinônimos e geradores de antônimos."
                }
              ],
              [
                {
                  "b": "Ajudantes de jogo:"
                },
                {
                  "t": "Auxiliares de pontuação e placar para Scrabble, Words With Friends, Boggle e Text Twist."
                }
              ],
              [
                {
                  "b": "Solucionadores avançados:"
                },
                {
                  "t": "Pesquisa de padrões Regex, localizadores de letras ausentes, reorganizadores de letras e pesquisas reversas de dicionário."
                }
              ],
              [
                {
                  "b": "Análise de texto:"
                },
                {
                  "t": "Analisadores de frequência de letras, contadores de vogais/consoantes e classificadores alfabéticos."
                }
              ],
              [
                {
                  "b": "Dicionário e Referência:"
                },
                {
                  "t": "Significados das palavras, pronúncias de IPA, origens das palavras e frases de exemplo."
                }
              ],
              [
                {
                  "b": "Gramática e estilo:"
                },
                {
                  "t": "Conversores de voz, verificadores de voz passivos e ferramentas de revisão de pontuação."
                }
              ],
              [
                {
                  "b": "Solucionadores de quebra-cabeças:"
                },
                {
                  "t": "Solucionadores para Word Cookies, Wordscapes, CodyCross e 7 Little Words."
                }
              ],
              [
                {
                  "b": "Geradores e questionários:"
                },
                {
                  "t": "Palavras aleatórias, tópicos, geradores de letras e questionários de teste de vocabulário."
                }
              ],
              [
                {
                  "b": "Ferramentas de escrita de IA:"
                },
                {
                  "t": "Explicadores de palavras de IA, criadores de frases, prompts de histórias e geradores de flashcards."
                }
              ]
            ]
          },
          {
            "p": [
              {
                "t": "Você pode inspecionar todo o catálogo em nosso"
              },
              {
                "a": "Diretório de todas as ferramentas",
                "to": "/tools"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "Como funcionam nossas ferramentas",
        "blocks": [
          {
            "p": [
              {
                "t": "A maioria dos solucionadores em AllWordTools dependem de algoritmos determinísticos escritos em TypeScript e JavaScript. Quando você insere um termo de pesquisa, a ferramenta traduz sua consulta em regras algorítmicas (como permutações de anagramas, filtros curinga de expressões regulares ou matrizes de contagem de letras) e consulta conjuntos de dados lexicais selecionados para encontrar correspondências válidas."
              }
            ]
          },
          {
            "p": [
              {
                "t": "As correspondências são classificadas de acordo com critérios explícitos: comprimento da letra, valores de pontos do bloco Scrabble ou ordem alfabética."
              }
            ]
          }
        ]
      },
      {
        "heading": "Listas de palavras e transparência de dados",
        "blocks": [
          {
            "p": [
              {
                "t": "Para gerar resultados, AllWordTools incorpora conjuntos de dados lexicais disponíveis publicamente, listas de palavras de código aberto (como ENABLE, listas derivadas de TWL e listas de jogos compatíveis com SOWPODS/CSW) e dados fonéticos/de pronúncia."
              }
            ]
          },
          {
            "p": [
              {
                "b": "Status Independente:"
              },
              {
                "t": "AllWordTools é um projeto independente. Não é afiliado, endossado ou patrocinado por Hasbro, Mattel, The New York Times, Zynga ou qualquer editor de jogos de tabuleiro. Menções a marcas registradas como \"Scrabble\", \"Words With Friends\" ou \"Wordle\" são usadas apenas para fins descritivos para identificar regras de jogo compatíveis."
              }
            ]
          },
          {
            "p": [
              {
                "t": "Para uma análise técnica exaustiva de cada conjunto de dados, método de cálculo, regra de pontuação de jogo e limitação em todas as 92 ferramentas, visite nosso"
              },
              {
                "a": "Metodologia e guia de dados do Word",
                "to": "/methodology"
              },
              {
                "t": "e leia nosso"
              },
              {
                "a": "Guia de limitações de dados",
                "to": "/data-limitations"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "Precisão e testes",
        "blocks": [
          {
            "p": [
              {
                "t": "Os resultados são gerados a partir de listas de palavras, conjuntos de dados, algoritmos e regras usadas pela ferramenta selecionada. Embora os algoritmos sejam testados regularmente em relação a benchmarks padrão para garantir a pontuação correta e a correspondência de padrões, nenhuma ferramenta automatizada pode garantir 100% de integridade para cada variante ou dialeto de dicionário localizado."
              }
            ]
          },
          {
            "p": [
              {
                "t": "Os usuários são aconselhados a verificar os resultados críticos de forma independente para exames formais, disputas sobre regras de torneios ou trabalhos acadêmicos. Por favor, leia nosso completo"
              },
              {
                "a": "Limitações de dados",
                "to": "/data-limitations"
              },
              {
                "t": "e"
              },
              {
                "a": "Isenção de responsabilidade",
                "to": "/disclaimer"
              },
              {
                "t": "para obter detalhes adicionais."
              }
            ]
          }
        ]
      },
      {
        "heading": "Transparência de ferramentas de IA",
        "blocks": [
          {
            "p": [
              {
                "t": "Nossa seção educacional e de redação criativa inclui ferramentas alimentadas por inteligência artificial (como o"
              },
              {
                "a": "Explicador de palavras AI",
                "to": "/tool/ai-word-explainer"
              },
              {
                "t": "e"
              },
              {
                "a": "Gerador de histórias de IA",
                "to": "/tool/ai-story-generator"
              },
              {
                "t": ")."
              }
            ]
          },
          {
            "ul": [
              [
                {
                  "b": "Geração Automatizada:"
                },
                {
                  "t": "Os resultados da IA são produzidos por grandes modelos de linguagem e podem ocasionalmente produzir informações imprecisas, desatualizadas ou tendenciosas."
                }
              ],
              [
                {
                  "b": "Resultado da revisão:"
                },
                {
                  "t": "Sempre revise e edite o texto gerado pela IA antes de confiar nele para estudo ou publicação."
                }
              ],
              [
                {
                  "b": "Confidencialidade:"
                },
                {
                  "t": "Não envie informações pessoais sensíveis, confidenciais ou privadas nos prompts de entrada da ferramenta de IA. O texto enviado é processado por provedores externos de API de IA."
                }
              ]
            ]
          },
          {
            "p": [
              {
                "t": "Saiba mais sobre nossa arquitetura de IA em nosso site dedicado"
              },
              {
                "a": "Página de transparência das ferramentas de IA",
                "to": "/ai-tools"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "Privacidade e processamento de dados",
        "blocks": [
          {
            "p": [
              {
                "t": "Acreditamos na divulgação técnica transparente sobre como seus dados são tratados:"
              }
            ]
          },
          {
            "ul": [
              [
                {
                  "b": "Ferramentas algorítmicas do lado do cliente:"
                },
                {
                  "t": "Os solucionadores principais (como contador de letras, contador de sílabas e classificador alfabético) processam sua entrada inteiramente em seu navegador. Seu texto inserido não é armazenado em nossos servidores."
                }
              ],
              [
                {
                  "b": "Ferramentas assistidas por servidor e IA:"
                },
                {
                  "t": "Ferramentas que exigem extensa indexação de dicionário ou inferência de modelo de IA transmitem parâmetros de consulta para funções backend sem servidor ou APIs de terceiros autorizadas para retornar resultados."
                }
              ],
              [
                {
                  "b": "Sem contas obrigatórias:"
                },
                {
                  "t": "AllWordTools não exige que você crie uma conta ou forneça detalhes de contato pessoal para acessar qualquer ferramenta."
                }
              ]
            ]
          },
          {
            "p": [
              {
                "t": "Para obter detalhes completos sobre cookies, publicidade e análises, consulte nosso"
              },
              {
                "a": "Política de Privacidade",
                "to": "/privacy"
              },
              {
                "t": "e"
              },
              {
                "a": "Política de Cookies",
                "to": "/cookie-policy"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "Relatar um erro/problema com palavras",
        "blocks": [
          {
            "p": [
              {
                "t": "A linguagem evolui e o software pode conter bugs. Se você notar algum dos seguintes:"
              }
            ]
          },
          {
            "ul": [
              [
                {
                  "t": "Uma palavra incorreta ou com erro ortográfico"
                }
              ],
              [
                {
                  "t": "Falta uma palavra válida para um dicionário de jogo específico"
                }
              ],
              [
                {
                  "t": "Uma definição ou pronúncia incorreta"
                }
              ],
              [
                {
                  "t": "Uma contagem de sílabas ou pontuação de jogo imprecisa"
                }
              ],
              [
                {
                  "t": "Um recurso quebrado ou erro inesperado do solucionador"
                }
              ]
            ]
          },
          {
            "p": [
              {
                "t": "Informe-nos para que possamos investigar e atualizar o conjunto de dados ou código. Visite nosso dedicado"
              },
              {
                "a": "Reportar uma página de erro de palavra ou ferramenta",
                "to": "/report-error"
              },
              {
                "t": "para enviar detalhes diretamente para Firoz Khan."
              }
            ]
          }
        ]
      },
      {
        "heading": "Contato e links sociais verificados",
        "blocks": [
          {
            "p": [
              {
                "t": "Para consultas técnicas, relatórios de bugs, discussões de negócios ou feedback, você pode entrar em contato através de:"
              }
            ]
          },
          {
            "ul": [
              [
                {
                  "b": "E-mail direto:"
                },
                {
                  "t": ""
                },
                {
                  "email": "hello@allwordtools.com"
                }
              ],
              [
                {
                  "b": "Formulário de contato e erro:"
                },
                {
                  "t": ""
                },
                {
                  "a": "Página de contato",
                  "to": "/contact"
                },
                {
                  "t": "ou"
                },
                {
                  "a": "Informar um erro",
                  "to": "/report-error"
                }
              ],
              [
                {
                  "b": "Perfil GitHub:"
                },
                {
                  "t": ""
                },
                {
                  "url": "https://github.com/fkdigitalmedia"
                }
              ],
              [
                {
                  "b": "LinkedIn:"
                },
                {
                  "t": ""
                },
                {
                  "url": "https://www.linkedin.com/in/firoz-khan-1153358a/"
                }
              ],
              [
                {
                  "b": "Instagram:"
                },
                {
                  "t": ""
                },
                {
                  "url": "https://www.instagram.com/rtibyfiroz/"
                }
              ]
            ]
          }
        ]
      }
    ]
  },
  "id": {
    "crumb": "Tentang",
    "pageTitle": "Tentang AllWordTools",
    "pageIntro": "Koleksi independen pemecah permainan kata gratis, pembantu bahasa, dan utilitas penulisan.",
    "metaTitle": "Tentang",
    "metaDescription": "AllWordTools menyatukan ratusan pemecah permainan kata gratis dan alat bahasa Inggris dalam satu tempat yang cepat dan terorganisir dengan indah.",
    "authorRole": "Pengembang & Pemelihara Tumpukan Penuh · FK Digital Media",
    "viewProfile": "Lihat Profil Penulis Lengkap →",
    "sections": [
      {
        "heading": "Apa itu AllWordTools",
        "blocks": [
          {
            "p": [
              {
                "b": "AllWordTools.com"
              },
              {
                "t": "adalah perangkat web independen yang menyediakan {count} pemecah permainan kata online gratis, pencari huruf, bantuan kosa kata, utilitas analisis teks, dan bantuan menulis kreatif di {cats} kategori berbeda."
              }
            ]
          },
          {
            "p": [
              {
                "t": "Baik Anda mengacak huruf untuk permainan kasual Scrabble, menemukan kombinasi lima huruf untuk Wordle, menghitung suku kata untuk puisi, atau memeriksa definisi kata, AllWordTools mengatur utilitas ini ke dalam platform yang cepat dan mudah diakses tanpa memerlukan registrasi pengguna, instalasi desktop, atau langganan berbayar."
              }
            ]
          }
        ]
      },
      {
        "heading": "Siapa yang Menciptakan dan Memeliharanya",
        "blocks": [
          {
            "p": [
              {
                "t": "AllWordTools.com dibuat, dikembangkan, dan dikelola secara teknis oleh"
              },
              {
                "b": "Firoz Khan"
              },
              {
                "t": ", seorang Pengembang Full Stack, di bawah merek pengembangan digital independennya"
              },
              {
                "b": "FK Digital Media"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "Tentang Firoz Khan",
        "blocks": [
          {
            "card": true
          },
          {
            "p": [
              {
                "b": "Firoz Khan"
              },
              {
                "t": "adalah Pengembang Full Stack yang merekayasa aplikasi web dan utilitas perangkat lunak interaktif. Peran teknisnya di AllWordTools mencakup arsitektur situs web full-stack, pengembangan UI frontend, implementasi pemecah algoritmik, kueri database, penyesuaian kinerja, dan pemeliharaan berkelanjutan."
              }
            ]
          },
          {
            "p": [
              {
                "t": "Firoz mendekati situs web secara ketat dari perspektif rekayasa perangkat lunak dan algoritmik. Dia tidak mengklaim kredensial sebagai ahli bahasa, ahli kamus, profesor akademis, atau pejabat turnamen. Sebaliknya, ia berfokus pada penulisan algoritme penelusuran efisien yang mencocokkan masukan pengguna dengan kumpulan data terstruktur secara akurat dan cepat."
              }
            ]
          },
          {
            "p": [
              {
                "t": "Pelajari lebih lanjut di halaman penulis khusus miliknya:"
              },
              {
                "a": "Firoz Khan — Profil Penulis & Pengelola",
                "to": "/about/firoz-khan"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "Tentang FK Digital Media",
        "blocks": [
          {
            "p": [
              {
                "b": "FK Digital Media"
              },
              {
                "t": "adalah merek pengembangan digital independen yang terkait dengan proyek web Firoz Khan, termasuk pengembangan dan pemeliharaan alat online dan aplikasi web."
              }
            ]
          },
          {
            "p": [
              {
                "t": "Di bawah bendera FK Digital Media, proyek dibangun dengan penekanan pada kecepatan, antarmuka pengguna yang bersih, arsitektur ramah privasi, dan utilitas praktis."
              }
            ]
          }
        ]
      },
      {
        "heading": "Apa yang Kami Bangun",
        "blocks": [
          {
            "p": [
              {
                "t": "Platform saat ini menawarkan alat {count} yang dikelompokkan ke dalam kategori terorganisir {cats}:"
              }
            ]
          },
          {
            "ul": [
              [
                {
                  "b": "Pemecah Kata:"
                },
                {
                  "t": "Pengurai, pemecah anagram, pembantu teka-teki silang, dan asisten Wordle."
                }
              ],
              [
                {
                  "b": "Alat Surat:"
                },
                {
                  "t": "Cari kata dengan memulai, mengakhiri, atau mengandung huruf, menghitung karakter, dan mencocokkan pola wildcard."
                }
              ],
              [
                {
                  "b": "Alat Tulis:"
                },
                {
                  "t": "Pencari rima, penghitung suku kata, pencari sinonim, dan generator antonim."
                }
              ],
              [
                {
                  "b": "Pembantu Permainan:"
                },
                {
                  "t": "Penilaian dan pembantu papan untuk Scrabble, Words With Friends, Boggle, dan Text Twist."
                }
              ],
              [
                {
                  "b": "Pemecah Tingkat Lanjut:"
                },
                {
                  "t": "Pencarian pola regex, pencari huruf yang hilang, penataan ulang huruf, dan pencarian kamus terbalik."
                }
              ],
              [
                {
                  "b": "Analisis Teks:"
                },
                {
                  "t": "Penganalisis frekuensi huruf, penghitung vokal/konsonan, dan penyortir alfabet."
                }
              ],
              [
                {
                  "b": "Kamus & Referensi:"
                },
                {
                  "t": "Arti kata, pengucapan IPA, asal kata, dan contoh kalimat."
                }
              ],
              [
                {
                  "b": "Tata Bahasa & Gaya:"
                },
                {
                  "t": "Konverter suara, pemeriksa suara pasif, dan alat peninjau tanda baca."
                }
              ],
              [
                {
                  "b": "Pemecah Teka-teki:"
                },
                {
                  "t": "Pemecah untuk Word Cookies, Wordscapes, CodyCross, dan 7 Little Words."
                }
              ],
              [
                {
                  "b": "Generator & Kuis:"
                },
                {
                  "t": "Kata acak, topik, pembuat huruf, dan kuis pengujian kosa kata."
                }
              ],
              [
                {
                  "b": "Alat Penulisan AI:"
                },
                {
                  "t": "Penjelas kata AI, pembuat kalimat, petunjuk cerita, dan generator kartu flash."
                }
              ]
            ]
          },
          {
            "p": [
              {
                "t": "Anda dapat memeriksa seluruh katalog di kami"
              },
              {
                "a": "Semua direktori Alat",
                "to": "/tools"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "Cara Kerja Alat Kami",
        "blocks": [
          {
            "p": [
              {
                "t": "Mayoritas pemecah di AllWordTools mengandalkan algoritma deterministik yang ditulis dalam TypeScript dan JavaScript. Saat Anda memasukkan istilah penelusuran, alat ini menerjemahkan kueri Anda ke dalam aturan algoritmik (seperti permutasi anagram, filter karakter pengganti ekspresi reguler, atau matriks jumlah huruf) dan kueri kumpulan data leksikal yang dikurasi untuk menemukan kecocokan yang valid."
              }
            ]
          },
          {
            "p": [
              {
                "t": "Kecocokan diurutkan berdasarkan kriteria eksplisit: panjang huruf, nilai titik ubin Scrabble, atau urutan abjad."
              }
            ]
          }
        ]
      },
      {
        "heading": "Daftar Kata & Transparansi Data",
        "blocks": [
          {
            "p": [
              {
                "t": "Untuk menghasilkan hasil, AllWordTools menggabungkan kumpulan data leksikal yang tersedia untuk umum, daftar kata sumber terbuka (seperti ENABLE, daftar turunan TWL, dan daftar permainan yang kompatibel dengan SOWPODS/CSW), dan data fonetik/pengucapan."
              }
            ]
          },
          {
            "p": [
              {
                "b": "Status Independen:"
              },
              {
                "t": "AllWordTools adalah proyek independen. Itu tidak berafiliasi dengan, didukung oleh, atau disponsori oleh Hasbro, Mattel, The New York Times, Zynga, atau penerbit permainan papan mana pun. Penyebutan merek dagang seperti \"Scrabble\", \"Words With Friends\", atau \"Wordle\" digunakan semata-mata untuk tujuan deskriptif guna mengidentifikasi aturan permainan yang kompatibel."
              }
            ]
          },
          {
            "p": [
              {
                "t": "Untuk perincian teknis menyeluruh dari setiap kumpulan data, metode perhitungan, aturan penilaian permainan, dan batasan di seluruh 92 alat, kunjungi kami"
              },
              {
                "a": "Metodologi & Panduan Data Kata",
                "to": "/methodology"
              },
              {
                "t": "dan baca kami"
              },
              {
                "a": "Panduan Batasan Data",
                "to": "/data-limitations"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "Akurasi & Pengujian",
        "blocks": [
          {
            "p": [
              {
                "t": "Hasil dihasilkan dari daftar kata, kumpulan data, algoritme, dan aturan yang digunakan oleh alat yang dipilih. Meskipun algoritme diuji secara rutin berdasarkan tolok ukur standar untuk memastikan penilaian yang benar dan pencocokan pola, tidak ada alat otomatis yang dapat menjamin kelengkapan 100% untuk setiap varian kamus atau dialek yang dilokalkan."
              }
            ]
          },
          {
            "p": [
              {
                "t": "Pengguna disarankan untuk memverifikasi hasil penting secara independen untuk ujian formal, perselisihan peraturan turnamen, atau tugas akademis. Silakan baca selengkapnya"
              },
              {
                "a": "Keterbatasan Data",
                "to": "/data-limitations"
              },
              {
                "t": "dan"
              },
              {
                "a": "Penafian",
                "to": "/disclaimer"
              },
              {
                "t": "untuk rincian tambahan."
              }
            ]
          }
        ]
      },
      {
        "heading": "Transparansi Alat AI",
        "blocks": [
          {
            "p": [
              {
                "t": "Bagian penulisan kreatif dan pendidikan kami mencakup alat yang didukung oleh kecerdasan buatan (seperti"
              },
              {
                "a": "Penjelasan Kata AI",
                "to": "/tool/ai-word-explainer"
              },
              {
                "t": "dan"
              },
              {
                "a": "Pembuat Cerita AI",
                "to": "/tool/ai-story-generator"
              },
              {
                "t": ")."
              }
            ]
          },
          {
            "ul": [
              [
                {
                  "b": "Generasi Otomatis:"
                },
                {
                  "t": "Keluaran AI dihasilkan oleh model bahasa besar dan terkadang menghasilkan informasi yang tidak akurat, ketinggalan jaman, atau bias."
                }
              ],
              [
                {
                  "b": "Hasil Tinjauan:"
                },
                {
                  "t": "Selalu tinjau dan edit teks yang dihasilkan AI sebelum mengandalkannya untuk dipelajari atau dipublikasikan."
                }
              ],
              [
                {
                  "b": "Kerahasiaan:"
                },
                {
                  "t": "Jangan mengirimkan informasi pribadi yang sensitif, rahasia, atau pribadi ke dalam perintah masukan alat AI. Teks yang dikirimkan diproses oleh penyedia AI API eksternal."
                }
              ]
            ]
          },
          {
            "p": [
              {
                "t": "Pelajari lebih lanjut tentang arsitektur AI kami di situs khusus kami"
              },
              {
                "a": "Halaman Transparansi Alat AI",
                "to": "/ai-tools"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "Privasi & Pemrosesan Data",
        "blocks": [
          {
            "p": [
              {
                "t": "Kami percaya pada pengungkapan teknis yang transparan mengenai cara penanganan data Anda:"
              }
            ]
          },
          {
            "ul": [
              [
                {
                  "b": "Alat Algoritma Sisi Klien:"
                },
                {
                  "t": "Pemecah inti (seperti Penghitung Huruf, Penghitung Suku Kata, dan Penyortir Abjad) memproses masukan Anda seluruhnya di browser Anda. Teks masukan Anda tidak disimpan di server kami."
                }
              ],
              [
                {
                  "b": "Alat AI & Bantuan Server:"
                },
                {
                  "t": "Alat yang memerlukan pengindeksan kamus ekstensif atau inferensi model AI mengirimkan parameter kueri ke fungsi tanpa server backend atau API pihak ketiga resmi untuk memberikan hasil."
                }
              ],
              [
                {
                  "b": "Tidak Ada Akun Wajib:"
                },
                {
                  "t": "AllWordTools tidak mengharuskan Anda membuat akun atau memberikan detail kontak pribadi untuk mengakses alat apa pun."
                }
              ]
            ]
          },
          {
            "p": [
              {
                "t": "Untuk detail lengkap tentang cookie, periklanan, dan analitik, silakan berkonsultasi dengan kami"
              },
              {
                "a": "Kebijakan Privasi",
                "to": "/privacy"
              },
              {
                "t": "dan"
              },
              {
                "a": "Kebijakan Cookie",
                "to": "/cookie-policy"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "Laporkan Kesalahan / Masalah Kata",
        "blocks": [
          {
            "p": [
              {
                "t": "Bahasa berkembang, dan perangkat lunak dapat mengandung bug. Jika Anda memperhatikan salah satu hal berikut:"
              }
            ]
          },
          {
            "ul": [
              [
                {
                  "t": "Kata yang salah atau salah eja"
                }
              ],
              [
                {
                  "t": "Kata valid yang hilang untuk kamus game tertentu"
                }
              ],
              [
                {
                  "t": "Definisi atau pengucapan yang salah"
                }
              ],
              [
                {
                  "t": "Jumlah suku kata atau skor permainan yang tidak akurat"
                }
              ],
              [
                {
                  "t": "Fitur rusak atau kesalahan pemecah yang tidak terduga"
                }
              ]
            ]
          },
          {
            "p": [
              {
                "t": "Harap beri tahu kami agar kami dapat menyelidiki dan memperbarui kumpulan data atau kode. Kunjungi dedikasi kami"
              },
              {
                "a": "Laporkan Halaman Kesalahan Kata atau Alat",
                "to": "/report-error"
              },
              {
                "t": "untuk mengirimkan detail langsung ke Firoz Khan."
              }
            ]
          }
        ]
      },
      {
        "heading": "Kontak & Tautan Sosial Terverifikasi",
        "blocks": [
          {
            "p": [
              {
                "t": "Untuk pertanyaan teknis, laporan bug, diskusi bisnis, atau masukan, Anda dapat menghubungi melalui:"
              }
            ]
          },
          {
            "ul": [
              [
                {
                  "b": "Email Langsung:"
                },
                {
                  "t": ""
                },
                {
                  "email": "hello@allwordtools.com"
                }
              ],
              [
                {
                  "b": "Formulir Kontak & Kesalahan:"
                },
                {
                  "t": ""
                },
                {
                  "a": "Halaman Kontak",
                  "to": "/contact"
                },
                {
                  "t": "atau"
                },
                {
                  "a": "Laporkan Kesalahan",
                  "to": "/report-error"
                }
              ],
              [
                {
                  "b": "Profil GitHub:"
                },
                {
                  "t": ""
                },
                {
                  "url": "https://github.com/fkdigitalmedia"
                }
              ],
              [
                {
                  "b": "LinkedIn:"
                },
                {
                  "t": ""
                },
                {
                  "url": "https://www.linkedin.com/in/firoz-khan-1153358a/"
                }
              ],
              [
                {
                  "b": "Instagram:"
                },
                {
                  "t": ""
                },
                {
                  "url": "https://www.instagram.com/rtibyfiroz/"
                }
              ]
            ]
          }
        ]
      }
    ]
  },
  "ru": {
    "crumb": "О",
    "pageTitle": "О AllWordTools",
    "pageIntro": "Независимая коллекция бесплатных программ для решения словесных игр, языковых помощников и утилит для письма.",
    "metaTitle": "О",
    "metaDescription": "AllWordTools объединяет сотни бесплатных программ для решения словесных игр и инструментов английского языка в одном быстром и прекрасно организованном месте.",
    "authorRole": "Full Stack разработчик и сопровождающий · FK Digital Media",
    "viewProfile": "Просмотреть полный профиль автора →",
    "sections": [
      {
        "heading": "Что такое AllWordTools",
        "blocks": [
          {
            "p": [
              {
                "b": "AllWordTools.com"
              },
              {
                "t": "— это независимый веб-инструментарий, предоставляющий {count} бесплатных онлайн-решатели словесных игр, средства поиска букв, словарные пособия, утилиты для анализа текста и помощники в творческом письме в различных категориях: {cats}."
              }
            ]
          },
          {
            "p": [
              {
                "t": "Независимо от того, расшифровываете ли вы буквы для казуальной игры Scrabble, находите пятибуквенные комбинации для Wordle, считаете слоги в стихотворении или проверяете определения слов, AllWordTools объединяет эти утилиты в быструю и доступную платформу, не требующую регистрации пользователя, установки на рабочий стол или платной подписки."
              }
            ]
          }
        ]
      },
      {
        "heading": "Кто его создает и поддерживает",
        "blocks": [
          {
            "p": [
              {
                "t": "AllWordTools.com создан, разработан и технически поддерживается"
              },
              {
                "b": "Firoz Khan"
              },
              {
                "t": ", Full Stack разработчик, под своим независимым брендом цифровых разработок."
              },
              {
                "b": "FK Digital Media"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "О Firoz Khan",
        "blocks": [
          {
            "card": true
          },
          {
            "p": [
              {
                "b": "Firoz Khan"
              },
              {
                "t": "— Full Stack Developer, занимающийся разработкой веб-приложений и интерактивных программных утилит. Его техническая роль в AllWordTools включает в себя полнофункциональную архитектуру веб-сайта, разработку пользовательского интерфейса, реализацию алгоритмического решателя, запросы к базе данных, настройку производительности и постоянное обслуживание."
              }
            ]
          },
          {
            "p": [
              {
                "t": "Фироз подходит к веб-сайту строго с точки зрения разработки программного обеспечения и алгоритмов. Он не претендует на звание лингвиста, лексикографа, академического профессора или официального лица турнира. Вместо этого он сосредотачивается на написании эффективных алгоритмов поиска, которые точно и быстро сопоставляют вводимые пользователем данные со структурированными наборами данных."
              }
            ]
          },
          {
            "p": [
              {
                "t": "Узнайте больше на его специальной авторской странице:"
              },
              {
                "a": "Firoz Khan — Профиль автора и сопровождающего",
                "to": "/about/firoz-khan"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "О FK Digital Media",
        "blocks": [
          {
            "p": [
              {
                "b": "FK Digital Media"
              },
              {
                "t": "— это независимый бренд цифровых разработок, связанный с веб-проектами Firoz Khan, включая разработку и поддержку онлайн-инструментов и веб-приложений."
              }
            ]
          },
          {
            "p": [
              {
                "t": "Под баннером FK Digital Media проекты создаются с упором на скорость, понятные пользовательские интерфейсы, архитектуру, обеспечивающую конфиденциальность, и практическую полезность."
              }
            ]
          }
        ]
      },
      {
        "heading": "Что мы строим",
        "blocks": [
          {
            "p": [
              {
                "t": "В настоящее время платформа предлагает инструменты: {count}, сгруппированные в организованные категории: {cats}:"
              }
            ]
          },
          {
            "ul": [
              [
                {
                  "b": "Решатели слов:"
                },
                {
                  "t": "Расшифровщики, решатели анаграмм, помощники по кроссвордам и помощники Wordle."
                }
              ],
              [
                {
                  "b": "Инструменты для письма:"
                },
                {
                  "t": "Ищите слова по началу, окончанию или содержанию букв, подсчету символов и сопоставлению шаблонов подстановочных знаков."
                }
              ],
              [
                {
                  "b": "Инструменты для письма:"
                },
                {
                  "t": "Поисковики рифм, счетчики слогов, поиск синонимов и генераторы антонимов."
                }
              ],
              [
                {
                  "b": "Помощники в игре:"
                },
                {
                  "t": "Помощники по подсчету очков и доске для Scrabble, Words With Friends, Boggle и Text Twist."
                }
              ],
              [
                {
                  "b": "Расширенные решатели:"
                },
                {
                  "t": "Поиск по шаблону регулярных выражений, поиск отсутствующих букв, перестановка букв и обратный поиск по словарю."
                }
              ],
              [
                {
                  "b": "Анализ текста:"
                },
                {
                  "t": "Анализаторы частоты букв, счетчики гласных/согласных и сортировщики по алфавиту."
                }
              ],
              [
                {
                  "b": "Словарь и справочник:"
                },
                {
                  "t": "Значения слов, произношение IPA, происхождение слов и примеры предложений."
                }
              ],
              [
                {
                  "b": "Грамматика и стиль:"
                },
                {
                  "t": "Преобразователи голоса, пассивные средства проверки голоса и инструменты проверки пунктуации."
                }
              ],
              [
                {
                  "b": "Решатели головоломок:"
                },
                {
                  "t": "Решатели для Word Cookies, Wordscapes, CodyCross и 7 Little Words."
                }
              ],
              [
                {
                  "b": "Генераторы и викторины:"
                },
                {
                  "t": "Генераторы случайных слов, тем, букв и тесты для проверки словарного запаса."
                }
              ],
              [
                {
                  "b": "Инструменты для письма ИИ:"
                },
                {
                  "t": "Объяснители слов с искусственным интеллектом, создатели предложений, подсказки для рассказов и генераторы карточек."
                }
              ]
            ]
          },
          {
            "p": [
              {
                "t": "Весь каталог вы можете посмотреть на нашем сайте."
              },
              {
                "a": "Каталог всех инструментов",
                "to": "/tools"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "Как работают наши инструменты",
        "blocks": [
          {
            "p": [
              {
                "t": "Большинство решателей на AllWordTools полагаются на детерминированные алгоритмы, написанные на TypeScript и JavaScript. Когда вы вводите поисковый запрос, инструмент преобразует ваш запрос в алгоритмические правила (такие как перестановки анаграмм, фильтры подстановочных знаков регулярных выражений или матрицы количества букв) и запрашивает тщательно подобранные наборы лексических данных для поиска действительных совпадений."
              }
            ]
          },
          {
            "p": [
              {
                "t": "Совпадения сортируются по явным критериям: длине букв, значениям точек плитки Scrabble или алфавитному порядку."
              }
            ]
          }
        ]
      },
      {
        "heading": "Списки слов и прозрачность данных",
        "blocks": [
          {
            "p": [
              {
                "t": "Для получения результатов AllWordTools включает общедоступные наборы лексических данных, списки слов с открытым исходным кодом (такие как ENABLE, списки, полученные из TWL, и списки игр, совместимые с SOWPODS/CSW), а также данные фонетики/произношения."
              }
            ]
          },
          {
            "p": [
              {
                "b": "Независимый статус:"
              },
              {
                "t": "AllWordTools — независимый проект. Он не связан, не одобрен и не спонсируется Hasbro, Mattel, The New York Times, Zynga или каким-либо издателем настольных игр. Упоминания таких товарных знаков, как «Scrabble», «Words With Friends» или «Wordle», используются исключительно в описательных целях для определения совместимых правил игрового процесса."
              }
            ]
          },
          {
            "p": [
              {
                "t": "Чтобы получить исчерпывающую техническую информацию о каждом наборе данных, методе расчета, правиле подсчета очков и ограничениях для всех 92 инструментов, посетите наш"
              },
              {
                "a": "Руководство по методологии и данным Word",
                "to": "/methodology"
              },
              {
                "t": "и прочитайте наш"
              },
              {
                "a": "Руководство по ограничению данных",
                "to": "/data-limitations"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "Точность и тестирование",
        "blocks": [
          {
            "p": [
              {
                "t": "Результаты генерируются на основе списков слов, наборов данных, алгоритмов и правил, используемых выбранным инструментом. Хотя алгоритмы регулярно проверяются на соответствие стандартным критериям для обеспечения правильной оценки и сопоставления с образцом, ни один автоматизированный инструмент не может гарантировать 100% полноту для каждого локализованного варианта словаря или диалекта."
              }
            ]
          },
          {
            "p": [
              {
                "t": "Пользователям рекомендуется самостоятельно проверять важные результаты для официальных экзаменов, споров по правилам турниров или академической работы. Пожалуйста, прочитайте наш полный"
              },
              {
                "a": "Ограничения данных",
                "to": "/data-limitations"
              },
              {
                "t": "и"
              },
              {
                "a": "Отказ от ответственности",
                "to": "/disclaimer"
              },
              {
                "t": "для получения дополнительной информации."
              }
            ]
          }
        ]
      },
      {
        "heading": "Прозрачность инструментов искусственного интеллекта",
        "blocks": [
          {
            "p": [
              {
                "t": "В нашем творческом и образовательном разделе представлены инструменты, работающие на основе искусственного интеллекта (такие как"
              },
              {
                "a": "Объяснитель слов AI",
                "to": "/tool/ai-word-explainer"
              },
              {
                "t": "и"
              },
              {
                "a": "Генератор историй с искусственным интеллектом",
                "to": "/tool/ai-story-generator"
              },
              {
                "t": ")."
              }
            ]
          },
          {
            "ul": [
              [
                {
                  "b": "Автоматизированная генерация:"
                },
                {
                  "t": "Результаты ИИ создаются с помощью больших языковых моделей и иногда могут давать неточную, устаревшую или предвзятую информацию."
                }
              ],
              [
                {
                  "b": "Результаты обзора:"
                },
                {
                  "t": "Всегда просматривайте и редактируйте текст, созданный ИИ, прежде чем использовать его для изучения или публикации."
                }
              ],
              [
                {
                  "b": "Конфиденциальность:"
                },
                {
                  "t": "Не отправляйте конфиденциальную, конфиденциальную или частную личную информацию в подсказки для ввода инструментов искусственного интеллекта. Отправленный текст обрабатывается внешними поставщиками AI API."
                }
              ]
            ]
          },
          {
            "p": [
              {
                "t": "Узнайте больше о нашей архитектуре искусственного интеллекта на нашем специальном"
              },
              {
                "a": "Страница прозрачности инструментов искусственного интеллекта",
                "to": "/ai-tools"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "Конфиденциальность и обработка данных",
        "blocks": [
          {
            "p": [
              {
                "t": "Мы верим в прозрачное техническое раскрытие информации о том, как обрабатываются ваши данные:"
              }
            ]
          },
          {
            "ul": [
              [
                {
                  "b": "Алгоритмические инструменты на стороне клиента:"
                },
                {
                  "t": "Основные решатели (такие как счетчик букв, счетчик слогов и алфавитный сортировщик) полностью обрабатывают вводимые вами данные в браузере. Введенный вами текст не хранится на наших серверах."
                }
              ],
              [
                {
                  "b": "Серверные инструменты и инструменты искусственного интеллекта:"
                },
                {
                  "t": "Инструменты, требующие расширенного словарного индексирования или вывода модели искусственного интеллекта, передают параметры запроса серверным бессерверным функциям или авторизованным сторонним API для возврата результатов."
                }
              ],
              [
                {
                  "b": "Нет обязательных счетов:"
                },
                {
                  "t": "AllWordTools не требует от вас создания учетной записи или предоставления личных контактных данных для доступа к любому инструменту."
                }
              ]
            ]
          },
          {
            "p": [
              {
                "t": "Для получения полной информации о файлах cookie, рекламе и аналитике обратитесь к нашему"
              },
              {
                "a": "Политика конфиденциальности",
                "to": "/privacy"
              },
              {
                "t": "и"
              },
              {
                "a": "Политика использования файлов cookie",
                "to": "/cookie-policy"
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "heading": "Сообщить об ошибке/проблеме со словом",
        "blocks": [
          {
            "p": [
              {
                "t": "Язык развивается, и программное обеспечение может содержать ошибки. Если вы заметили что-либо из следующего:"
              }
            ]
          },
          {
            "ul": [
              [
                {
                  "t": "Неправильное или неправильно написанное слово"
                }
              ],
              [
                {
                  "t": "Отсутствует допустимое слово для определенного игрового словаря."
                }
              ],
              [
                {
                  "t": "Неправильное определение или произношение"
                }
              ],
              [
                {
                  "t": "Неточный подсчет слогов или счет игры."
                }
              ],
              [
                {
                  "t": "Неисправная функция или непредвиденная ошибка решателя"
                }
              ]
            ]
          },
          {
            "p": [
              {
                "t": "Сообщите нам, чтобы мы могли изучить и обновить набор данных или код. Посетите наш посвященный"
              },
              {
                "a": "Сообщить о странице ошибки Word или инструмента",
                "to": "/report-error"
              },
              {
                "t": "чтобы отправить подробную информацию непосредственно в Firoz Khan."
              }
            ]
          }
        ]
      },
      {
        "heading": "Контакты и проверенные социальные ссылки",
        "blocks": [
          {
            "p": [
              {
                "t": "По техническим вопросам, отчетам об ошибках, деловым обсуждениям или отзывам вы можете обращаться по следующему адресу:"
              }
            ]
          },
          {
            "ul": [
              [
                {
                  "b": "Прямая электронная почта:"
                },
                {
                  "t": ""
                },
                {
                  "email": "hello@allwordtools.com"
                }
              ],
              [
                {
                  "b": "Контактная форма и форма ошибки:"
                },
                {
                  "t": ""
                },
                {
                  "a": "Контактная страница",
                  "to": "/contact"
                },
                {
                  "t": "или"
                },
                {
                  "a": "Сообщить об ошибке",
                  "to": "/report-error"
                }
              ],
              [
                {
                  "b": "GitHub Профиль:"
                },
                {
                  "t": ""
                },
                {
                  "url": "https://github.com/fkdigitalmedia"
                }
              ],
              [
                {
                  "b": "LinkedIn:"
                },
                {
                  "t": ""
                },
                {
                  "url": "https://www.linkedin.com/in/firoz-khan-1153358a/"
                }
              ],
              [
                {
                  "b": "Instagram:"
                },
                {
                  "t": ""
                },
                {
                  "url": "https://www.instagram.com/rtibyfiroz/"
                }
              ]
            ]
          }
        ]
      }
    ]
  }
};

export function getAboutContent(locale: string): AboutLocaleContent | null {
  return ABOUT_CONTENT[locale] ?? null;
}
