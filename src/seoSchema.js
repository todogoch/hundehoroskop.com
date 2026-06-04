/**
 * SEO & KI-Optimierung (JSON-LD Strukturierte Daten) für Hundehoroskop.com
 */

export function getStaticSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.hundehoroskop.com/#website",
        "url": "https://www.hundehoroskop.com/",
        "name": "Hundehoroskop.com",
        "description": "Berechnen Sie das personalisierte Horoskop Ihres Hundes! Exzellente astrologische Analysen für Charakter, Gesundheit, Tagesform und verträgliche Herrchen-Sternzeichen.",
        "inLanguage": "de-DE"
      },
      {
        "@type": "SoftwareApplication",
        "name": "Hundehoroskop Rechner",
        "operatingSystem": "All",
        "applicationCategory": "LifestyleApplication",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "url": "https://www.hundehoroskop.com/",
        "offers": {
          "@type": "Offer",
          "price": "0.00",
          "priceCurrency": "EUR"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Was ist ein Hundehoroskop?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ein Hundehoroskop ist eine astrologische Analyse der Persönlichkeit eines Hundes, die auf seinem Sternzeichen (Tierkreiszeichen) basiert. Ähnlich wie beim Menschen beeinflussen Planetenkonstellationen und die kosmischen Elemente (Feuer, Erde, Luft, Wasser) die Charakterzüge, Macken, Vorlieben und das Verhalten des Hundes."
            }
          },
          {
            "@type": "Question",
            "name": "Wie berechnet man das Sternzeichen eines Hundes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Das Sternzeichen eines Hundes wird exakt wie beim Menschen anhand seines Geburtsdatums bestimmt. Wenn Ihr Hund beispielsweise am 15. Mai geboren wurde, gehört er zum Sternzeichen Stier."
            }
          },
          {
            "@type": "Question",
            "name": "Was tun, wenn das genaue Geburtsdatum des Hundes unbekannt ist (Tierschutz/Rescue)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Das ist sehr häufig bei Tierschutzhunden der Fall. Hundehoroskop.com bietet dafür eine spezielle 'Rescue-Dog'-Funktion. Sie können das Sternzeichen über einen kurzen spielerischen Temperament-Fragebogen (über das Verhalten Ihres Hundes) kosmisch schätzen lassen oder ein Sternzeichen manuell wählen."
            }
          },
          {
            "@type": "Question",
            "name": "Welche Hundebesitzer-Sternzeichen passen am besten zusammen?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Die Kompatibilität richtet sich nach den kosmischen Elementen. Hunde mit dem Element Feuer (z.B. Löwe) passen wunderbar zu Herrchen/Frauchen mit Feuer- oder Luftzeichen. Erd-Hunde (z.B. Steinbock) harmonieren perfekt mit Erd- oder Wasserzeichen."
            }
          }
        ]
      }
    ]
  };
}

/**
 * Injiziert dynamisch strukturierte Daten für das berechnete, personalisierte Hundehoroskop.
 * Dies signalisiert KI-Suchmaschinen (wie Gemini, ChatGPT, Perplexity), dass die App live
 * detaillierte, logisch verknüpfte Informationen anbietet.
 */
export function updateDynamicSchema(dogName, zodiacName, element, personalityTitle, dateStr) {
  // Vorheriges dynamisches Schema löschen, falls vorhanden
  const oldScript = document.getElementById("dynamic-seo-schema");
  if (oldScript) {
    oldScript.remove();
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "id": `https://www.hundehoroskop.com/#profile-${dogName.toLowerCase()}`,
    "name": `Persönliches Hundehoroskop für ${dogName}`,
    "description": `Astrologische Analyse für den Hund ${dogName}. Berechnetes Sternzeichen: ${zodiacName} (${element}). Kosmischer Titel: ${personalityTitle}. Generiert am: ${dateStr}.`,
    "mainEntity": {
      "@type": "CreativeWork",
      "name": `Horoskop-Auswertung von ${dogName}`,
      "author": {
        "@type": "Organization",
        "name": "Hundehoroskop.com"
      },
      "dateCreated": new Date().toISOString().split('T')[0],
      "inLanguage": "de-DE",
      "genre": "Astrologie",
      "abstract": `Detailliertes Geburtsbild des Hundes ${dogName}. Der Hund besitzt die Eigenschaften des Sternzeichens ${zodiacName} und steht unter dem kosmischen Element ${element}.`
    }
  };

  const script = document.createElement("script");
  script.id = "dynamic-seo-schema";
  script.type = "application/ld+json";
  script.text = JSON.stringify(schemaData);
  document.head.appendChild(script);
}
