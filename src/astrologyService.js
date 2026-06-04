/**
 * Astrologie-API & Gemini-API Service für Hundehoroskop.com
 * Bindet https://astrology-api.io (astrologyapi.com) v3 ein für hochpräzise astronomische Daten
 * und generiert Premium-Horoskope direkt via Gemini 1.5/2.5 Flash im Frontend.
 */

export const API_CONFIG = {
  apiKey: "ask_827f5d14c1aaa7e365dd96256e4c2b50859e535ccc02ef375c034a722399211c", // Echter astrology-api.io v3 Key
  geminiKey: "AIzaSyCMJ_12fxLU1x7eiv2HrsKyVwdNcYJ4AyU", // Echter bezahlter Gemini API-Key aus Amastria
  useApi: true // Aktiviert! Abfragen laufen jetzt live über die echte API
};

// Geodaten-Datenbank für wichtige deutschsprachige Städte
const CITY_COORDINATES = {
  "zürich": { lat: 47.3769, lon: 8.5417, timezone: "Europe/Zurich" },
  "zurich": { lat: 47.3769, lon: 8.5417, timezone: "Europe/Zurich" },
  "berlin": { lat: 52.5200, lon: 13.4050, timezone: "Europe/Berlin" },
  "münchen": { lat: 48.1351, lon: 11.5820, timezone: "Europe/Berlin" },
  "munchen": { lat: 48.1351, lon: 11.5820, timezone: "Europe/Berlin" },
  "wien": { lat: 48.2082, lon: 16.3738, timezone: "Europe/Vienna" },
  "hamburg": { lat: 53.5511, lon: 9.9937, timezone: "Europe/Berlin" },
  "köln": { lat: 50.9375, lon: 6.9603, timezone: "Europe/Berlin" },
  "koln": { lat: 50.9375, lon: 6.9603, timezone: "Europe/Berlin" },
  "frankfurt": { lat: 50.1109, lon: 8.6821, timezone: "Europe/Berlin" },
  "stuttgart": { lat: 48.7758, lon: 9.1829, timezone: "Europe/Berlin" },
  "düsseldorf": { lat: 51.2271, lon: 6.7735, timezone: "Europe/Berlin" },
  "dusseldorf": { lat: 51.2271, lon: 6.7735, timezone: "Europe/Berlin" },
  "bern": { lat: 46.9480, lon: 7.4474, timezone: "Europe/Zurich" },
  "graz": { lat: 47.0707, lon: 15.4395, timezone: "Europe/Vienna" }
};

// Übersetzungsmatrix für englische Sternzeichen (fallunabhängig & Abkürzungen)
const TRANSLATE_SIGN = {
  "Aries": "Widder", "aries": "Widder", "ari": "Widder",
  "Taurus": "Stier", "taurus": "Stier", "tau": "Stier",
  "Gemini": "Zwillinge", "gemini": "Zwillinge", "gem": "Zwillinge",
  "Cancer": "Krebs", "cancer": "Krebs", "can": "Krebs",
  "Leo": "Löwe", "leo": "Löwe",
  "Virgo": "Jungfrau", "virgo": "Jungfrau", "vir": "Jungfrau",
  "Libra": "Waage", "libra": "Waage", "lib": "Waage",
  "Scorpio": "Skorpion", "scorpio": "Skorpion", "sco": "Skorpion",
  "Sagittarius": "Schütze", "sagittarius": "Schütze", "sag": "Schütze",
  "Capricorn": "Steinbock", "capricorn": "Steinbock", "cap": "Steinbock",
  "Aquarius": "Wassermann", "aquarius": "Wassermann", "aqu": "Wassermann",
  "Pisces": "Fische", "pisces": "Fische", "pis": "Fische"
};

/**
 * Fragt die echten Planetenkonstellationen über astrology-api.io v3 ab.
 * Fallback auf Lokalberechnung bei Inaktivität oder Verbindungsfehlern.
 */
export async function fetchNatalPlacements(birthdateStr, timeStr, cityStr) {
  if (!API_CONFIG.useApi || !API_CONFIG.apiKey) {
    return null; 
  }

  try {
    // 1. Datum parsen
    const birthDate = new Date(birthdateStr);
    if (isNaN(birthDate.getTime())) return null;

    const day = birthDate.getDate();
    const month = birthDate.getMonth() + 1;
    const year = birthDate.getFullYear();

    // 2. Zeit parsen (Standard: 12:00 Mittag)
    let hour = 12;
    let minute = 0;
    if (timeStr) {
      const [h, m] = timeStr.split(":").map(Number);
      if (!isNaN(h)) hour = h;
      if (!isNaN(m)) minute = m;
    }

    // 3. Geodaten der Stadt bestimmen (Default: Frankfurt am Main)
    let lat = 50.1109;
    let lon = 8.6821;
    let timezone = "Europe/Berlin";

    const cleanCity = (cityStr || "").trim().toLowerCase();
    if (CITY_COORDINATES[cleanCity]) {
      lat = CITY_COORDINATES[cleanCity].lat;
      lon = CITY_COORDINATES[cleanCity].lon;
      timezone = CITY_COORDINATES[cleanCity].timezone;
    } else if (cleanCity.includes("zürich") || cleanCity.includes("zurich") || cleanCity.includes("bern") || cleanCity.includes("basel")) {
      lat = 47.3769;
      lon = 8.5417;
      timezone = "Europe/Zurich";
    } else if (cleanCity.includes("wien") || cleanCity.includes("salzburg") || cleanCity.includes("graz")) {
      lat = 48.2082;
      lon = 16.3738;
      timezone = "Europe/Vienna";
    }

    // 4. API Request Body für v3 Charts Natal vorbereiten
    const requestData = {
      subject: {
        name: "Hund",
        birth_data: {
          year,
          month,
          day,
          hour,
          minute,
          latitude: lat,
          longitude: lon,
          timezone
        }
      }
    };

    // 5. Abfrage an astrology-api.io v3 Charts Natal
    const response = await fetch("https://api.astrology-api.io/api/v3/charts/natal", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_CONFIG.apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      console.warn(`Astrology-API v3 lieferte Fehlercode: ${response.status}. Nutze lokalen mathematischen Fallback.`);
      return null;
    }

    const astroData = await response.json();
    const chartData = astroData?.chart_data || astroData?.data?.chart_data || {};
    const positions = chartData.planetary_positions || [];

    // Finde Himmelskörper
    const sunNode = positions.find(p => p.name === "Sun");
    const moonNode = positions.find(p => p.name === "Moon");
    const ascNode = positions.find(p => p.name === "Ascendant");

    const subjData = astroData?.subject_data || astroData?.data?.subject_data || {};

    const sunSign = sunNode ? sunNode.sign : (subjData.sun?.sign || null);
    const moonSign = moonNode ? moonNode.sign : (subjData.moon?.sign || null);
    const ascSign = ascNode ? ascNode.sign : (subjData.ascendant?.sign || null);

    if (!sunSign) {
      console.warn("Sonne konnte nicht aus der API-Antwort extrahiert werden.");
      return null;
    }

    // 6. Placements übersetzen und zurückgeben
    return {
      sun: (TRANSLATE_SIGN[sunSign] || sunSign).toLowerCase(),
      moon: moonSign ? (TRANSLATE_SIGN[moonSign] || moonSign).toLowerCase() : null,
      ascendant: ascSign ? (TRANSLATE_SIGN[ascSign] || ascSign).toLowerCase() : null
    };

  } catch (error) {
    console.error("Fehler bei der Abfrage von astrology-api.io v3:", error);
    return null; // Fallback auslösen
  }
}

/**
 * Generiert das Hundehoroskop live via Gemini API im JSON-Format.
 */
export async function generateGeminiHoroscope(inputData, computedPlacements) {
  if (!API_CONFIG.geminiKey) {
    throw new Error("Gemini API-Schlüssel fehlt.");
  }

  const {
    dogName,
    dogGender,
    dogBreed,
    dogTraits,
    ownerName,
    ownerGender
  } = inputData;

  const isFemale = dogGender === "w";
  const genderLabel = isFemale ? "HÜNDIN" : "RÜDE";

  const { sun, moon, ascendant, ownerZodiac } = computedPlacements;

  const systemPrompt = `Du bist die künstliche Intelligenz des exklusiven Portals "Amastria Hundehoroskop Premium". Deine Aufgabe ist es, ein hochgradig tiefgründiges, personalisiertes und absolut fehlerfreies Premium-Hundehoroskop als JSON-Objekt zu generieren.

ABSOLUT WICHTIG – GESCHLECHT DES HUNDES:
Der Hund ist ein ${genderLabel} (männlich: RÜDE / weiblich: HÜNDIN).
- Wenn der Hund ein RÜDE ist: Du musst konsequent männliche Pronomen und Adjektivendungen verwenden (er, ihn, ihm, sein, seine, seines, seiner, seinen, seinem). Es ist STRENGSTENS VERBOTEN, "sie", "ihr", "ihre", "ihres", "ihrer", "ihren", "ihrem" zu schreiben!
  Halte dich strikt an folgende Beispiele:
  * "sein Wesen" (nicht: seine Wesen, nicht: ihr Wesen)
  * "sein Mut" (nicht: seine Mut, nicht: ihr Mut)
  * "seinen Geist / seinen Charme" (nicht: seine Geist, nicht: ihren Geist)
  * "seine Energie / seine Aura" (nicht: ihr Energie, nicht: ihre Aura)
  * "seines Zuhauses" (nicht: ihres Zuhauses)
  * "seiner Menschen" (nicht: ihrer Menschen)
  * "in seinem eigenen Körper" (nicht: in ihrem eigenen Körper)
  * "zu seinem Lieblingsmenschen" (nicht: zu ihrem Lieblingsmenschen)
  * "mit seinem Frauchen/Herrchen" (nicht: mit ihrem)
  * "er ist dein treuer Begleiter" (nicht: Begleiterin)
  * "Lehrer" (nicht: Lehrerin), "Hüter" (nicht: Hüterin), "Gefährte" (nicht: Gefährtin), "Diplomat" (nicht: Diplomatin), "Partner" (nicht: Partnerin), "Anker" (nicht: Ankerin).

- Wenn der Hund eine HÜNDIN ist: Du musst konsequent weibliche Pronomen und Adjektivendungen verwenden (sie, ihr, ihre, ihres, ihrer, ihren, ihrem). Es ist STRENGSTENS VERBOTEN, "er", "ihn", "ihm", "sein", "seine", "seines", "seiner", "seinen", "seinem" zu schreiben!
  Halte dich strikt an folgende Beispiele:
  * "ihr Wesen" (nicht: ihrere Wesen, nicht: sein Wesen)
  * "ihr Mut" (nicht: ihre Mut, nicht: sein Mut)
  * "ihren Geist / ihren Charme" (nicht: ihr Geist, nicht: seinen Geist)
  * "ihre Energie / ihre Aura" (nicht: seine Energie, nicht: seine Aura)
  * "ihres Zuhauses" (nicht: seines Zuhauses)
  * "ihrer Menschen" (nicht: seiner Menschen)
  * "in ihrem eigenen Körper" (nicht: in seinem eigenen Körper)
  * "zu ihrem Lieblingsmenschen" (nicht: zu seinem Lieblingsmenschen)
  * "mit ihrem Frauchen/Herrchen" (nicht: mit seinem)
  * "sie ist deine treue Begleiterin" (nicht: Begleiter)
  * "Lehrerin" (nicht: Lehrer), "Hüterin" (nicht: Hüter), "Gefährtin" (nicht: Gefährte), "Diplomatin" (nicht: Diplomat), "Partnerin" (nicht: Partner), "Ankerin" (nicht: Anker).

Diese geschlechtsspezifische Regel ist eine ABSOLUTE KONSTANTE und gilt ausnahmslos für jeden einzelnen Satz des gesamten Ausgabetextes. Überprüfe jeden Satz vor der Rückgabe akribisch und dreifach auf korrekte Grammatik und Geschlecht! Do NOT make any exceptions.

WICHTIGER NAMENSSCHUTZ:
Der Hund heißt "${dogName}" und der Halter heißt "${ownerName}".
Du musst diese Namen IMMER EXAKT so schreiben, wie sie angegeben sind.
Jede Abweichung oder Verwendung von Standard-Namen wie "Ludmilla" oder "Bello" (außer der eingegebene Name lautet exakt so) ist ein schwerer Fehler.

STILREGEL:
Verwende KEINE Markdown-Formatierung.
Kein **fett**, kein *kursiv*, keine # Überschriften. Nur reinen Fließtext ausgeben.

ANFORDERUNG AN TEXTTIEFE & ASTROLOGISCHE BEZÜGE:
Der gesamte Horoskop-Text muss extrem ausführlich und detailreich sein (Ziel: ca. 1500–2000 Wörter insgesamt).
Jeder einzelne Textblock MUSS konkrete astrologische/planetarische Bezüge zu den berechneten Konstellationen (Sonne: ${sun}, Mond: ${moon}, Aszendent: ${ascendant}, Herrscherplanet des Hundes, Halter-Sternzeichen: ${ownerZodiac}) aufweisen. Schreibe keine generischen Aussagen, die für jeden Hund gelten könnten.

Halte dich exakt an die folgenden Satzlängen-Vorgaben pro Feld:
- cosmicTitle: Ein kurzer, mystischer Titel auf Premium-Niveau, z.B. "Die goldene Seelenhüterin des Lichts" oder "Der unerschrockene Pionier des Mutes" (max. 10 Wörter).
- basicEnergyText: 6-8 lange, tiefgründige Sätze über das kosmische Wesen des Hundes basierend auf Sonne, Mond, Aszendent und Herrscherplanet.
- strengths: 4-5 Sätze über die größten Stärken des Hundes.
- challenges: 4-5 Sätze über die größten Herausforderungen des Hundes.
- needs: 4-5 Sätze über das, was der Hund wirklich braucht.
- energyLevel: 3-4 Sätze über das Energielevel und den Bewegungsbedarf.
- healthZone: 3-4 Sätze über besondere Körperzonen basierend auf dem Element.
- strengthenEnergy: 3-4 Sätze darüber, was die Lebensenergie des Hundes stärkt.
- loveHuman: 3-4 Sätze über das Verhältnis zu Menschen.
- loveAnimals: 3-4 Sätze über das Verhältnis zu anderen Tieren.
- loveShow: 3-4 Sätze darüber, wie der Hund Zuneigung zeigt und empfängt.
- connectionSignature: 6-8 Sätze über die kosmische Signatur der Hund-Halter-Verbindung, inklusive mindestens 2 konkreten Synastrie-Aspekten (z.B. Trigon von Venus des Halters zu Sonne/Mond des Hundes).
- dogNeedsFromOwner: 4-5 Sätze darüber, was der Hund vom Halter braucht (z.B. ruhige Aufmerksamkeit, feste Rituale).
- ownerLearnsFromDog: 4-5 Sätze darüber, was der Halter vom Hund lernen kann (z.B. Achtsamkeit, Urvertrauen).
- currentPhase: 4-5 Sätze über die aktuelle kosmische Lebensphase des Hundes.
- tipp1: 4-5 Sätze für den 1. Kosmischen Alltagstipp (z.B. ein Element-Ritual).
- tipp2: 4-5 Sätze für den 2. Kosmischen Alltagstipp (z.B. ein gemeinsamer meditativer Abend).
- tipp3: 4-5 Sätze für den 3. Kosmischen Alltagstipp (z.B. Mondphasen beachten).
- cosmicAdvice: 5-6 Sätze mit einem tiefen, aufbauenden kosmischen Rat für den gemeinsamen Weg.
- jointRitual: 4-5 Sätze mit einem konkreten, praxisnahen gemeinsamen Ritual (z.B. "Die Herzverbindung").
- kompass: Ein JSON-Objekt mit exakt diesen Schlüsseln:
    * stone: Ein edler Schutzstein (z.B. "Rosenquarz").
    * elementPlace: Naturelement & Kraftort (z.B. "Fließendes Wasser & Waldseen").
    * color: Energiefarbe (z.B. "Meeresblau & Silber").
    * word: Ein Kraftwort (z.B. "Vertrauen").
    * essence: Ein prägnanter Satz zur kosmischen Essenz (z.B. "Bello lehrt durch seine bloße Anwesenheit...").
    * bestTime: Die beste Tageszeit (z.B. "Früher Abend (17-19 Uhr)").
    * planet: Der Schutzplanet.
    * environment: Das kosmische Umfeld.

Antworte ausnahmslos im folgenden JSON-Format ohne umgebende Codeblöcke und ohne zusätzliche Erklärungen:
{
  "cosmicTitle": "...",
  "basicEnergyText": "...",
  "strengths": "...",
  "challenges": "...",
  "needs": "...",
  "energyLevel": "...",
  "healthZone": "...",
  "strengthenEnergy": "...",
  "loveHuman": "...",
  "loveAnimals": "...",
  "loveShow": "...",
  "connectionSignature": "...",
  "dogNeedsFromOwner": "...",
  "ownerLearnsFromDog": "...",
  "currentPhase": "...",
  "tipp1": "...",
  "tipp2": "...",
  "tipp3": "...",
  "cosmicAdvice": "...",
  "jointRitual": "...",
  "kompass": {
    "stone": "...",
    "elementPlace": "...",
    "color": "...",
    "word": "...",
    "essence": "...",
    "bestTime": "...",
    "planet": "...",
    "environment": "..."
  }
}`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_CONFIG.geminiKey}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: systemPrompt + `\n\nErstelle das Horoskop jetzt für den Hund ${dogName} (${dogBreed}, Wesensmerkmale: ${dogTraits || 'keine'}) und seinen Halter ${ownerName}.`
        }]
      }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.8
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini-API lieferte Status: ${response.status}`);
  }

  const result = await response.json();
  const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!text) {
    throw new Error("Kein Text von der Gemini-API erhalten.");
  }

  return JSON.parse(text);
}

