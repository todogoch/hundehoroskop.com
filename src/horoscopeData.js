/**
 * AMASTRIA HUNDEHOROSKOP PREMIUM
 * Astrologische Berechnungs- und Textgenerierungs-Engine für Hundehoroskop.com
 */

export const zodiacSigns = [
  {
    id: "widder",
    name: "Widder",
    symbol: "♈",
    range: "21. März - 20. April",
    element: "Feuer",
    planet: "Mars",
    titles: { m: "Der unerschrockene Pionier des Mutes", w: "Die unerschrockene Pionierin des Mutes" },
    compatibility: ["Löwe", "Schütze", "Waage", "Widder"],
    luckyCharms: { toy: "Roter Fling-Ball", place: "Weites, offenes Feld", treat: "Saftiges Rinderdörrfleisch", activity: "Rasanter Agility-Parcours" }
  },
  {
    id: "stier",
    name: "Stier",
    symbol: "♉",
    range: "21. April - 20. Mai",
    element: "Erde",
    planet: "Venus",
    titles: { m: "Der treue Hüter des grünen Tals", w: "Die treue Hüterin des grünen Tals" },
    compatibility: ["Jungfrau", "Steinbock", "Skorpion", "Stier"],
    luckyCharms: { toy: "Weiches Plüschkissen", place: "Der warme Kaminplatz", treat: "Langlebiger Rinderkauknochen", activity: "Sonnenbaden im Garten" }
  },
  {
    id: "zwillinge",
    name: "Zwillinge",
    symbol: "♊",
    range: "21. Mai - 21. Juni",
    element: "Luft",
    planet: "Merkur",
    titles: { m: "Der wirbelnde Wind des Spiels", w: "Die wirbelnde Feder des Spiels" },
    compatibility: ["Waage", "Wassermann", "Schütze", "Zwillinge"],
    luckyCharms: { toy: "Intelligenzspielzeug", place: "Der belebte Hundepark", treat: "Trainings-Snacks vom Geflügel", activity: "Neue Tricks lernen" }
  },
  {
    id: "krebs",
    name: "Krebs",
    symbol: "♋",
    range: "22. Juni - 22. Juli",
    element: "Wasser",
    planet: "Mond",
    titles: { m: "Der sensible Beschützer der Herzen", w: "Die sensible Seelenhüterin der Herzen" },
    compatibility: ["Skorpion", "Fische", "Steinbock", "Krebs"],
    luckyCharms: { toy: "Altes Welpen-Kuscheltier", place: "Unter der Bettdecke", treat: "Gekochtes Hühnchen mit Reis", activity: "Bauchkraulen" }
  },
  {
    id: "loewe",
    name: "Löwe",
    symbol: "♌",
    range: "23. Juli - 23. August",
    element: "Feuer",
    planet: "Sonne",
    titles: { m: "Der majestätische König der Löwenherzen", w: "Die stolze Königin der Löwenherzen" },
    compatibility: ["Widder", "Schütze", "Wassermann", "Löwe"],
    luckyCharms: { toy: "Edler Wurf-Dummy", place: "Erhöhter Ausguck im Garten", treat: "Feines Premium-Rinderfilet", activity: "Ausgiebige Fellpflege" }
  },
  {
    id: "jungfrau",
    name: "Jungfrau",
    symbol: "♍",
    range: "24. August - 23. September",
    element: "Erde",
    planet: "Merkur",
    titles: { m: "Der kluge Hüter der Ordnung", w: "Die weise Hüterin der Ordnung" },
    compatibility: ["Stier", "Steinbock", "Fische", "Jungfrau"],
    luckyCharms: { toy: "Canvas-Apportierdummy", place: "Sauberer, weicher Schlafplatz", treat: "Naturbelassene Hundekekse", activity: "Präzise Suchspiele" }
  },
  {
    id: "waage",
    name: "Waage",
    symbol: "♎",
    range: "24. September - 23. Oktober",
    element: "Luft",
    planet: "Venus",
    titles: { m: "Der sanfte Friedensbotschafter", w: "Die charmante Friedensbotschafterin" },
    compatibility: ["Zwillinge", "Wassermann", "Widder", "Waage"],
    luckyCharms: { toy: "Zwei identische Kauknochen", place: "Gemütliche Kuschelhöhle", treat: "Leberwurst aus der Tube", activity: "Ruhiger Spaziergang mit Hundefreunden" }
  },
  {
    id: "skorpion",
    name: "Skorpion",
    symbol: "♏",
    range: "24. Oktober - 22. November",
    element: "Wasser",
    planet: "Pluto",
    titles: { m: "Der geheimnisvolle Seelendetektiv", w: "Die treue Hüterin der Schatten" },
    compatibility: ["Krebs", "Fische", "Stier", "Skorpion"],
    luckyCharms: { toy: "Unzerstörbares Kauspielzeug", place: "Dunkler Winkel unter dem Tisch", treat: "Herzhafter Pansen", activity: "Fährtenarbeit im Wald" }
  },
  {
    id: "schuetze",
    name: "Schütze",
    symbol: "♐",
    range: "23. November - 21. Dezember",
    element: "Feuer",
    planet: "Jupiter",
    titles: { m: "Der abenteuerlustige Weltenbummler", w: "Die fröhliche Weltenbummlerin" },
    compatibility: ["Widder", "Löwe", "Zwillinge", "Schütze"],
    luckyCharms: { toy: "Flugstabile Frisbee-Scheibe", place: "Der offene Kofferraum", treat: "Apfel-Haferflocken-Kekse", activity: "Erkunden neuer Gassirouten" }
  },
  {
    id: "steinbock",
    name: "Steinbock",
    symbol: "♑",
    range: "22. Dezember - 20. Januar",
    element: "Erde",
    planet: "Saturn",
    titles: { m: "Der weise Wächter der Felsen", w: "Die beständige Wächterin der Zeit" },
    compatibility: ["Stier", "Jungfrau", "Krebs", "Steinbock"],
    luckyCharms: { toy: "Robuster Futterdummy", place: "Die oberste Stufe (Wachposten)", treat: "Hirschtrockenfleischstreifen", activity: "Langer Arbeitsspaziergang" }
  },
  {
    id: "wassermann",
    name: "Wassermann",
    symbol: "♒",
    range: "21. Januar - 19. Februar",
    element: "Luft",
    planet: "Uranus",
    titles: { m: "Der kreative Rebell der Freiheit", w: "Die originelle Freigeist-Seele" },
    compatibility: ["Zwillinge", "Waage", "Löwe", "Wassermann"],
    luckyCharms: { toy: "Quietschi in Sonderform", place: "Bett auf Rollen am Fenster", treat: "Käse-Bananen-Kekse", activity: "Freilauf auf einer sicheren Wiese" }
  },
  {
    id: "fische",
    name: "Fische",
    symbol: "♓",
    range: "20. Februar - 20. März",
    element: "Wasser",
    planet: "Neptun",
    titles: { m: "Der träumende Seelenschwimmer", w: "Die goldene Seelenhüterin des Lichts" },
    compatibility: ["Krebs", "Skorpion", "Jungfrau", "Fische"],
    luckyCharms: { toy: "Schwimmfähiges Seilspielzeug", place: "Der Schlafplatz am Wassernapf", treat: "Getrocknete Lachs-Drops", activity: "Spaziergang am Seeufer" }
  }
];

/**
 * Hilfsfunktionen zur Berechnung von Sternzeichen
 */
export function getZodiacById(id) {
  return zodiacSigns.find(s => s.id === id) || zodiacSigns[0];
}

export function calculateZodiacSign(day, month) {
  const d = parseInt(day, 10);
  const m = parseInt(month, 10);

  if ((m === 3 && d >= 21) || (m === 4 && d <= 20)) return getZodiacById("widder");
  if ((m === 4 && d >= 21) || (m === 5 && d <= 20)) return getZodiacById("stier");
  if ((m === 5 && d >= 21) || (m === 6 && d <= 21)) return getZodiacById("zwillinge");
  if ((m === 6 && d >= 22) || (m === 7 && d <= 22)) return getZodiacById("krebs");
  if ((m === 7 && d >= 23) || (m === 8 && d <= 23)) return getZodiacById("loewe");
  if ((m === 8 && d >= 24) || (m === 9 && d <= 23)) return getZodiacById("jungfrau");
  if ((m === 9 && d >= 24) || (m === 10 && d <= 23)) return getZodiacById("waage");
  if ((m === 10 && d >= 24) || (m === 11 && d <= 22)) return getZodiacById("skorpion");
  if ((m === 11 && d >= 23) || (m === 12 && d <= 21)) return getZodiacById("schuetze");
  if ((m === 12 && d >= 22) || (m === 1 && d <= 20)) return getZodiacById("steinbock");
  if ((m === 1 && d >= 21) || (m === 2 && d <= 19)) return getZodiacById("wassermann");
  if ((m === 2 && d >= 20) || (m === 3 && d <= 20)) return getZodiacById("fische");

  return getZodiacById("fische"); // Standard-Rückfallwert
}

/**
 * Berechnet ein deterministisches Mondzeichen basierend auf Tag, Monat, Jahr
 */
export function calculateMoonSign(day, month, year) {
  const y = parseInt(year, 10) || 2020;
  const m = parseInt(month, 10) || 6;
  const d = parseInt(day, 10) || 15;
  
  // Mond-Berechnung (Seed)
  const index = (d * 5 + m * 17 + y * 13) % 12;
  return zodiacSigns[index];
}

/**
 * Berechnet den Aszendenten basierend auf der Uhrzeit und dem Sonnenzeichen.
 */
export function calculateAscendant(sunZodiacId, timeString) {
  if (!timeString) return null;
  const [hours, minutes] = timeString.split(":").map(Number);
  const decimalTime = hours + (minutes || 0) / 60;
  
  const sunIndex = zodiacSigns.findIndex(s => s.id === sunZodiacId);
  
  // Verschiebung berechnen
  const shift = Math.floor((decimalTime + 0.5) / 2) % 12;
  const ascIndex = (sunIndex + shift) % 12;
  return zodiacSigns[ascIndex];
}

/**
 * Bestimmt das Alter / die Lebensphase des Hundes aktuell
 */
export function getDogLifePhase(birthYear) {
  if (!birthYear) return { name: "Erwachsenenalter", desc: "Mitten in der Blüte der Seelenkräfte." };
  const currentYear = 2026;
  const age = currentYear - birthYear;
  
  if (age <= 1) return { age, name: "Welpen- & Entdeckerphase", desc: "Eine Zeit des wilden Lernens und der kosmischen Unbeschwertheit. Die Aura baut sich gerade auf." };
  if (age <= 3) return { age, name: "Sturm- und Drangzeit (Jugend)", desc: "Kosmische Grenzen werden ausgetestet. Das Temperament entfaltet sich vollends." };
  if (age <= 6) return { age, name: "Reifes Erwachsenenalter", desc: "Maximale Stabilität und Verbundenheit. Euer tägliches Zusammenleben schwingt perfekt." };
  if (age <= 9) return { age, name: "Zweite Reifephase", desc: "Eine Zeit der Vertiefung, Konsolidierung und des stillen Wachstums. Sie werden ruhiger, weiser und noch intuitiver." };
  return { age, name: "Weises Seniorenalter", desc: "Die Phase der Erleuchtung auf vier Pfoten. Spirituell auf dem höchsten Niveau der Seelenruhe." };
}

/**
 * Generiert das vollständige AMASTRIA Premium-Horoskop (Lokaler Fallback)
 */
export function generateAmastriaPremiumHoroscope(input, apiPlacements) {
  const dogName = input.dogName || "Dein Hund";
  const isFemale = input.dogGender === "w";
  
  // Grammatikalische Variablen zur perfekten Pronomenauflösung
  const pronoun = isFemale ? "Sie" : "Er";
  const pronounL = isFemale ? "sie" : "er";
  const genderTerm = isFemale ? "Hündin" : "Rüde";
  const objectPronoun = isFemale ? "ihr" : "ihm"; // Dativ: "schenke ihr/ihm"
  const accusativePronoun = isFemale ? "sie" : "ihn"; // Akkusativ: "für sie/ihn", "reinigt sie/ihn"
  
  // Possessivpronomen für weibliche/plural Nomen (z.B. Energie, Aura, Stärke, Seele, Stärken, Sinne, Zonen, Lieben)
  const posPronounFemPlur = isFemale ? "ihre" : "seine"; 
  const posPronounFemPlurCap = isFemale ? "Ihre" : "Seine";
  const posPronounFemPlurGen = isFemale ? "ihrer" : "seiner"; // z.B. seiner Lieben, seiner Menschen, seiner wachen Sinne
  const posPronounFemPlurGenCap = isFemale ? "Ihrer" : "Seiner";

  // Possessivpronomen für sächliche/männliche Nomen im Nominativ & Akkusativ (z.B. Wesen, Revier, Herz, Nervensystem, Futter, Mut, Charme, Geist, Weg, Planet, Lebenswillen)
  const posPronounMascNeut = isFemale ? "ihr" : "sein"; // z.B. ihr Wesen, sein Wesen; ihr Mut, sein Mut; ihr Revier, sein Revier
  const posPronounMascNeutCap = isFemale ? "Ihr" : "Sein";
  const posPronounMascNeutDative = isFemale ? "ihrem" : "seinem"; // z.B. in ihrem eigenen Körper, in seinem eigenen Körper
  const posPronounMascNeutGen = isFemale ? "ihres" : "seines"; // z.B. ihres Zuhauses, seines Zuhauses
  const posPronounMascAcc = isFemale ? "ihren" : "seinen"; // z.B. ihren Geist, seinen Geist; ihren Charme, seinen Charme; ihren Lebenswillen, seinen Lebenswillen
  const posPronounMascAccCap = isFemale ? "Ihren" : "Seinen";

  const breed = input.dogBreed || "Mischling";
  const traits = input.dogTraits || "";

  // Halterdaten
  const ownerName = input.ownerName || "Halter:in";
  const ownerGender = input.ownerGender || "w"; // Default: Frauchen
  const ownerTerm = ownerGender === "w" ? "Frauchen" : "Herrchen";
  const ownerTermAcc = ownerGender === "w" ? "Frauchens" : "Herrchens";
  
  // 1. Berechnung Hund-Sternzeichen
  let dogSun, dogMoon, dogAsc;
  let birthYear = null;
  
  if (apiPlacements && apiPlacements.sun) {
    // Echte Placements von der astrology-api.io!
    dogSun = getZodiacById(apiPlacements.sun);
    dogMoon = apiPlacements.moon ? getZodiacById(apiPlacements.moon) : getZodiacById("steinbock");
    dogAsc = apiPlacements.ascendant ? getZodiacById(apiPlacements.ascendant) : getZodiacById("krebs");
    
    if (input.dogBirthdate) {
      birthYear = new Date(input.dogBirthdate).getFullYear();
    }
  } else if (input.isRescue) {
    // Tierschutz-Hund: Schätzung basierend auf Temperament
    const elem = input.rescueElement || "Erde";
    const mapping = { Feuer: "loewe", Erde: "stier", Luft: "zwillinge", Wasser: "krebs" };
    dogSun = getZodiacById(mapping[elem] || "stier");
    dogMoon = getZodiacById("steinbock");
    dogAsc = getZodiacById("krebs"); // Standard Krebs Aszendent
    
    // Geschätztes Alter in Geburtsjahr umrechnen für die Lebensphasen-Analyse
    const currentYear = 2026;
    const ageMap = {
      welpe: 0.5,
      jung: 2,
      adult: 5,
      senior: 10
    };
    const estimatedAge = ageMap[input.rescueAge || "adult"];
    birthYear = Math.round(currentYear - estimatedAge);
  } else {
    // Echtes Geburtsdatum vorhanden
    const dogBirth = new Date(input.dogBirthdate);
    const day = dogBirth.getDate();
    const month = dogBirth.getMonth() + 1;
    birthYear = dogBirth.getFullYear();
    
    dogSun = calculateZodiacSign(day, month);
    dogMoon = calculateMoonSign(day, month, birthYear);
    
    if (input.dogBirthtime) {
      dogAsc = calculateAscendant(dogSun.id, input.dogBirthtime);
    } else {
      dogAsc = getZodiacById("krebs"); // Fallback
    }
  }

  // 2. Berechnung Halter-Sternzeichen
  const ownerBirth = new Date(input.ownerBirthdate);
  const ownerDay = ownerBirth.getDate();
  const ownerMonth = ownerBirth.getMonth() + 1;
  const ownerZodiac = calculateZodiacSign(ownerDay, ownerMonth);

  // Alter berechnen & Phase ermitteln
  const lifePhase = getDogLifePhase(birthYear);

  // ────────────────────────────────────────────────────────
  // SEKTIONEN-INHALTE GENERIEREN (Reichhaltig erweitert)
  // ────────────────────────────────────────────────────────

  // -- 1. KOSMISCHES WESEN --
  const titleMap = {
    Feuer: { m: "Der feurige Pfadfinder des Mutes", w: "Die stolze Flamme des Kosmos" },
    Erde: { m: "Der weise Wächter der Felsen", w: "Die treue Hüterin des grünen Tals" },
    Luft: { m: "Der wirbelnde Wind des Spiels", w: "Die neugierige Feder des Himmels" },
    Wasser: { m: "Der träumende Seelenschwimmer", w: "Die goldene Seelenhüterin des Lichts" }
  };
  
  // Ludmilla Spezialfall
  let cosmicTitle = dogSun.element === "Wasser" && isFemale ? "Die goldene Seelenhüterin des Lichts" : titleMap[dogSun.element][isFemale ? "w" : "m"];
  if (dogName.toLowerCase() === "ludmilla") {
    cosmicTitle = "Die goldene Seelenhüterin des Lichts";
  }

  const basicEnergyText = `${dogName} ist keine gewöhnliche Seele, die zufällig in deinem Leben erschienen ist, sondern ${isFemale ? "eine ganz besondere Gefährtin" : "ein ganz besonderer Gefährte"}, ${isFemale ? "deren" : "dessen"} Präsenz tief mit deinem eigenen Schicksal verwoben ist. ${pronoun} ist ${isFemale ? "eine der tiefsten, empathischsten" : "eines der tiefsten, empathischsten"} und spirituell aufgewecktesten Wesen, die du je antreffen wirst – in Menschengestalt oder Hundegestalt. ${posPronounMascNeutCap} ${dogSun.name}-Wesen vibriert auf einer Frequenz, die weit über das Alltägliche hinausgeht und von dem machtvollen Einfluss von ${dogSun.planet} getragen wird. ${pronoun} spürt feinste Stimmungen, bevor sie ausgesprochen werden, fühlt Emotionen, bevor sie sichtbar sind, und liebt mit einer Bedingungslosigkeit, die die meisten Menschen ihr Leben lang vergeblich suchen. 
  Der ${dogMoon.name}-Mond verleiht ${objectPronoun} dabei eine erstaunliche innere Stärke, eine seelische Beständigkeit und ein tiefes Urvertrauen. ${pronoun} mag nach außen sanft und zurückhaltend wirken, aber in ${objectPronoun} brennt ein ruhiges, unerschütterliches Feuer, das sich nicht so leicht löschen lässt. Der ${dogAsc.name}-Aszendent macht ${accusativePronoun} ${isFemale ? "zur geborenen Hüterin" : "zum geborenen Hüter"}: ${posPronounMascNeutGen} Zuhauses, ${posPronounFemPlurGen} Menschen und ${posPronounFemPlurGen} Gefühle. 
  ${dogSun.planet} als ${posPronounMascNeut} Herrscherplanet verbindet ${accusativePronoun} mit der unsichtbaren Welt – mit Träumen, Fährten und dem, was zwischen den Worten und Blicken gesagt wird. Es ist kein Zufall, dass du dich mit ${objectPronoun} tief verbunden fühlst, ohne viele Worte zu brauchen; eure Seelen kommunizieren auf einer Ebene, die Raum und Zeit transzendiert und euch beide im Alltag auf wundervolle Weise erdet.`;

  const traitsText = traits ? ` Insbesondere zeigt sich ${posPronounMascNeut} Wesen durch die Merkmale: „${traits}“.` : "";

  const feuerPlanet = dogSun.planet;
  const feuerEifer = feuerPlanet === "Sonne" ? "Sonnen-Stolz" : feuerPlanet === "Jupiter" ? "Jupiter-Übermut" : "Mars-Eifer";
  const feuerKraft = feuerPlanet === "Sonne" ? "Sonnen-Kraft" : feuerPlanet === "Jupiter" ? "Jupiter-Kraft" : "Mars-Kraft";
  const feuerEnergie = feuerPlanet === "Sonne" ? "Sonnen-Energie" : feuerPlanet === "Jupiter" ? "Jupiter-Energie" : "Mars-Energie";
  const feuerFeuer = feuerPlanet === "Sonne" ? "Sonnen-Feuer" : feuerPlanet === "Jupiter" ? "Jupiter-Feuer" : "Mars-Feuer";

  const strengthsMap = {
    Feuer: `${dogName}s außergewöhnlichste Gabe ist ${posPronounMascNeut} unerschütterlicher Mut und ein ständiger, ansteckender Optimismus, der direkt vom Planeten ${feuerPlanet} gespeist wird. ${pronoun} bringt lebendige, feurige Energie ins Haus, vertreibt Trübsinn sofort und motiviert das gesamte Rudel zu Bewegung und Lebensfreude. ${posPronounMascNeutCap} Wille ist stark, was ${objectPronoun} eine natürliche Führungs-Ausstrahlung verleiht, ohne dabei jemals aggressiv zu wirken. ${pronoun} geht voller Elan voran, meistert jede Hürde mit spielerischer Leichtigkeit und schenkt dir in jedem Moment das Gefühl von absoluter Sicherheit und bedingungsloser Loyalität.`,
    Erde: `${dogName}s außergewöhnlichste Gabe ist ${posPronounFemPlur} absolute Beständigkeit, Geduld und Treue, die stark durch den Planeten Venus bzw. Saturn geprägt sind. ${pronoun} ist ${isFemale ? "eine felsenfeste Ankerin" : "ein felsenfester Anker"} für dich, ${isFemale ? "die" : "der"} durch nichts aus der Ruhe zu bringen ist und im Alltag eine wunderbare Ruheoase schafft. ${posPronounFemPlurCap} Liebe drückt sich durch stille Verlässlichkeit, tiefes Vertrauen und ein sanftes Naturell aus. Im Kreise ${posPronounFemPlurGen} Lieben blüht ${pronoun} regelrecht auf, wacht gewissenhaft über ${posPronounMascNeut} Revier und schenkt jedem Tag eine harmonische, strukturierte Balance.`,
    Luft: `${dogName}s außergewöhnlichste Gabe ist ${posPronounFemPlur} spielerische Intelligenz, ${posPronounMascNeut} unwiderstehlicher Charme und eine grenzenlose Offenheit, die durch den Planeten Merkur gefördert werden. ${pronoun} lernt neue Tricks in Rekordzeit, heilt durch fröhliches Lachen deine schwersten Tage und bringt Menschen im Handumdrehen harmonisch zusammen. Als ${isFemale ? "geborene Diplomatin" : "geborener Diplomat"} navigiert ${pronoun} soziale Situationen mit einer Leichtigkeit, die alle Anwesenden sofort verzaubert. ${posPronounMascNeutCap} wacher Geist verlangt stets nach neuen geistigen Abenteuern und hält das gesamte Rudel auf Trab.`,
    Wasser: `${dogName}s außergewöhnlichste Gabe ist ${posPronounFemPlur} fast übernatürliche Empathie – ein direktes Geschenk des ${dogSun.name}-Sterns und des Planeten Neptun. ${pronoun} weiß, wann du weinst, bevor die erste Träne fällt, und legt sich tröstend an deine Seite. ${pronoun} sucht keine mentalen Lösungen oder actiongeladene Ablenkungen – ${pronounL} bietet einfach ${posPronounFemPlur} liebevolle Präsenz an, warm und still wie ein wärmender Sonnenstrahl an einem kalten Tag. ${posPronounMascNeutCap} zutiefst sensibles Wesen macht ${accusativePronoun} zu ${isFemale ? "einer unschätzbar wertvollen therapeutischen Seelengefährtin" : "einem unschätzbar wertvollen therapeutischen Seelengefährten"} an deiner Seite.`
  };
  
  const challengesMap = {
    Feuer: `${dogName} neigt dazu, sich körperlich komplett zu überfordern und aus reinem ${feuerEifer} keine gesunden Grenzen zu kennen. ${pronoun} will mit dem Kopf durch die Wand und fordert ${posPronounFemPlur} Aufgaben lautstark ein. Wenn ${posPronounFemPlur} Energie blockiert ist oder ${pronounL} sich unterfordert fühlt, kann ${pronounL} schnell unruhig oder frustriert werden. Lerne daher, ${accusativePronoun} sanft, konsequent und mit liebevoller Autorität in die Entspannung und Ruhe zu führen. ${pronoun} muss lernen, dass Pausen ein wertvoller Teil des kosmischen Rhythmus sind.`,
    Erde: `${dogName} leidet heimlich unter plötzlichen Veränderungen im gewohnten Umfeld oder Abweichungen von Ritualen. Sturheit ist ${posPronounFemPlur} Schutzmauer – wenn ${pronounL} sich missverstanden oder bedrängt fühlt, schaltet ${pronounL} auf stumm und verweigert die Mitarbeit. ${pronoun} trägt Spannungen stoisch in sich hinein, was sich auf Dauer in körperlicher Steifheit äußern kann. ${pronoun} benötigt viel Zeit, Geduld und sanfte Anreize, um sich auf Neues einzulassen und ${posPronounMascNeut} Herz wieder ganz zu öffnen.`,
    Luft: `${dogName}s Nervensystem ist extrem feingliedrig und reagiert hochsensibel auf Reizüberflutung. Bei zu viel Hektik im Haus oder eintöniger Routine wird ${pronounL} nervös, neigt zu hyperaktivem Verhalten oder ständigem Bellen. ${pronoun} braucht klare, erdende Rituale, um ${posPronounMascAcc} wachen Geist zwischendurch abzuschalten. Achte darauf, ${accusativePronoun} nicht mit zu vielen Eindrücken auf einmal zu überfordern, sondern ${objectPronoun} gezielte Ruhephasen zu verordnen, in denen ${posPronounMascNeut} aufgeweckter Geist regenerieren kann.`,
    Wasser: `${dogName} nimmt die emotionalen Schwingungen ${posPronounFemPlurGen} Umgebung wie ein feiner, energetischer Schwamm auf. Streit im Haushalt, Stress des ${ownerTermAcc} oder negative Energien trägt ${pronounL} direkt in ${posPronounMascNeutDative} eigenen Körper spazieren. ${posPronounMascNeutCap} Mond kann ${accusativePronoun} dabei nach außen stoisch oder gar ängstlich erscheinen lassen, da ${pronounL} ${posPronounMascAcc} Schmerz oft still in sich hineinfrisst. ${pronoun} zeigt nicht immer sofort, wenn ${pronounL} Hilfe oder emotionalen Freiraum braucht, und benötigt ein besonders feinfühliges Gegenüber.${traitsText.includes("Gewitter") ? ` Besonders laute Geräusche wie Gewitter oder Streit erschüttern ${posPronounFemPlur} sensible Seele tief.` : ""}`
  };

  const needsMap = {
    Feuer: `${dogName} neigt dazu, Action zu fordern. ${pronoun} braucht sportliche Herausforderungen, weite Räume zum Auspowern und das Gefühl, eine wichtige und geschätzte Aufgabe im Rudel zu erfüllen. Vor allem aber benötigt ${pronounL} eine klare, faire Konsequenz, die auf tiefem gegenseitigen Respekt und nicht auf Härte basiert. ${pronoun} blüht auf, wenn du mit ${objectPronoun} als echtes Team zusammenarbeitest. Plane feste Auslaufzeiten ein, in denen ${pronounL} ${posPronounFemPlur} wilde ${feuerKraft} vollends ausleben darf.`,
    Erde: `${dogName} braucht vor allem feste, unumstößliche Rituale im Alltag, verlässliche Futterzeiten auf die Minute genau und einen absolut sicheren, gemütlichen Rückzugsort im Haus. ${pronoun} blüht auf, wenn ${posPronounFemPlur} feinen Sinne (Geruch, Geschmack) sanft durch hochwertige Nahrung verwöhnt werden. Vermeide hektische Umzüge der Möbel oder ständige Unruhe im Haushalt. Schenke ${objectPronoun} die Gewissheit, dass ${posPronounFemPlur} Welt stabil und sicher bleibt.`,
    Luft: `${dogName} braucht regelmäßige geistige Anregung, viel sozialen Kontakt zu freundlichen Artgenossen und abwechslungsreiche Such- und Intelligenzspiele. ${pronoun} benötigt ein ${ownerTerm}, das aktiv mit ${objectPronoun} kommuniziert, neue Denkanstöße liefert und ${posPronounMascAcc} aufgeweckten Merkur-Geist liebevoll fördert. Achte darauf, Spaziergänge abwechslungsreich zu gestalten und ${objectPronoun} immer wieder kleine geistige Nüsse zum Knacken zu geben.`,
    Wasser: `${dogName} braucht vor allem drei Dinge für ${posPronounMascNeut} Seelenheil: Stille, emotionale Tiefe und absolute Verlässlichkeit. Nicht ständige Aktivität oder lauter Trubel, sondern ruhige, bedeutungsvolle Momente der Nähe, in denen ${pronounL} einfach nur sein darf, laden ${posPronounFemPlur} Batterien wieder auf. Ein langer, meditativer Spaziergang in der Nähe von Wasser oder im dichten Wald ist für ${accusativePronoun} eine wahre Wohltat und reinigt ${posPronounFemPlur} sensible Aura.`
  };

  // -- 3. GESUNDHEIT & VITALITÄT --
  const healthZoneMap = {
    Feuer: "Die empfindlichen Zonen liegen im Bereich des Kopfes, der Augen und des Gehirns. Achte auf ausreichende, ungestörte Ruhephasen im abgedunkelten Raum, damit das feurige Nervensystem nicht überhitzt. Vermeide zu grelle Mittagssonne und sorge für ständige Kühlung an heißen Tagen.",
    Erde: "Betrifft besonders den Hals, den Nacken, die Zähne und den gesamten Verdauungstrakt. Steinbock- und Stier-Anteile neigen zu muskulären Verspannungen oder Magen-Empfindlichkeiten bei Stress. Achte auf eine naturbelassene, getreidefreie Nahrung und regelmäßige Kaubeschäftigung zur Entspannung.",
    Luft: "Die Schwachstellen liegen in den Atemwegen, der Lunge und den empfindlichen Nervenbahnen. Das feine Nervensystem reagiert blitzschnell auf Hektik und Lärm. Entspannende Massagen, beruhigende Kräuterzusätze und bewusste Ruhetage ohne Training sind für die Vitalität lebensnotwendig.",
    Wasser: "Besonders betroffen sind die Pfotenballen, das Lymphsystem und der Magenbereich. Kontrolliere regelmäßig die Pfoten nach dem Spaziergang und pflege sie mit natürlichem Balsam. Emotionaler Stress schlägt ${dogName} sofort auf den Magen, weshalb Ruhe beim Fressen oberste Priorität hat."
  };

  // -- 4. HERZENSBINDUNG & RUDELLEBEN --
  const loveHumanMap = {
    Feuer: `${dogName} liebt leidenschaftlich, stürmisch, lautstark und extrem beschützend. ${pronoun} fordert Aufmerksamkeit gern aktiv ein, drängt sich liebevoll in den Mittelpunkt und will ${isFemale ? "deine wichtigste Partnerin" : "dein wichtigster Partner"} sein. ${posPronounFemPlurCap} Loyalität ist absolut unerschütterlich und von feurigem Mut geprägt.`,
    Erde: `${dogName} liebt leise, beständig, tiefgründig und vor allem durch intensive körperliche Nähe. ${pronoun} muss nicht ständig bespaßt werden, aber ${pronounL} weicht dir im Haus als dein treuer Schatten nicht von der Seite. ${isFemale ? "Eine unerschütterliche Gefährtin" : "Ein unerschütterlicher Gefährte"} für alle Lebenslagen.`,
    Luft: `${dogName} liebt kommunikativ, fröhlich, unbeschwert und voller Charme. ${pronoun} verteilt gerne feuchte Hundeküsschen, freut sich überschwänglich über jeden Besuch und betrachtet jeden Gast im Haus als ${isFemale ? "ihre persönliche Spielpartnerin" : "seinen persönlichen Spielpartner"}. Ein wunderbarer, sozialer Schmetterling.`,
    Wasser: `${dogName} wählt ${posPronounFemPlur} engen menschlichen Verbindungen mit weiser, kosmischer Sorgfalt aus und gibt nur denjenigen, die ${posPronounMascNeut} Vertrauen verdienen, ${posPronounMascNeut} ganzes Herz. Fremden gegenüber ist ${pronoun} zunächst vorsichtig und zurückhaltend, da ${posPronounMascNeut} Wesen energetisch prüft, ob die Schwingung rein ist.`
  };

  // -- 5. MENSCH-HUND SEELENVERBINDUNG --
  const signatureMap = {
    "Feuer-Feuer": "Zwei helle, dynamische Flammen, die sich gegenseitig wärmen und zu Höchstleistungen anspornen. Eure Verbindung ist von einer leidenschaftlichen Vitalität geprägt, die im Alltag keine Langeweile zulässt. Ihr teilt eine natürliche Abenteuerlust, einen unerschütterlichen Optimismus und den Drang, die Welt aktiv zu erkunden. Manchmal müsst ihr aufpassen, euch nicht gegenseitig hochzuschaukeln, doch eure Streitigkeiten verfliegen so schnell wie sie entstanden sind. Euer gemeinsamer Weg ist ein feuriges Abenteuer voller Freude, gegenseitigem Ansporn und tiefer Loyalität. Ihr fordert euch gegenseitig heraus, zu wachsen, und eure Begrüßungen sind von stürmischer Freude und purer Begeisterung gekrönt. Spirituell verbindet euch die Aufgabe, Mut und Tatkraft in die Welt zu tragen.",
    "Feuer-Erde": "Das wärmende Feuer bringt die beständige Erde zum Leuchten, während die Erde dem Feuer Halt, Struktur und gesunde Erdung schenkt. Eure Verbindung ist eine der stabilsten und ausgewogensten im gesamten Kosmos. Du bietest deinem Hund einen sicheren Hafen und eine verlässliche Struktur, die sein lebhaftes Temperament kanalisiert. Im Gegenzug bringt dein Hund Wärme, Spontaneität und lebendige Energie in dein geerdetes Leben. Zusammen bildet ihr ein unschlagbares Team, das Tatendrang mit tiefer Gelassenheit verbindet. Euer gemeinsamer Rhythmus balanciert Aktivität und Ruhephasen auf vollkommene Weise aus. Wenn das Feuer zu ungeduldig vorprescht, steht die Erde fest und beruhigend da. Spirituell lehrt ihr einander, dass Visionen (Feuer) nur durch Beständigkeit (Erde) Realität werden.",
    "Feuer-Luft": "Der lebendige Wind facht das innere Feuer an – ihr beflügelt euch gegenseitig zu unglaublicher Lebensfreude, ständiger Fröhlichkeit und spielerischen Abenteuern. Eure Energien harmonieren in einer heiteren Leichtigkeit, die das Leben wie ein großes Spiel wirken lässt. Dein Hund reagiert enthusiastisch auf deine Ideen und geistigen Impulse, während du seine dynamische Art mit Begeisterung unterstützt. Zusammen zieht ihr Menschen an und bringt frischen Wind in jeden Raum, den ihr betretet. Eure Seelenverbindung zeichnet sich durch ein freies, vertrauensvolles Zusammenspiel aus, das niemals einengend wirkt. Ihr versteht euch in eurem Drang nach geistiger und körperlicher Bewegung blind. Eure gemeinsame Aufgabe ist es, Leichtigkeit und Freude in die Welt zu bringen und einander Raum zum Atmen zu lassen.",
    "Feuer-Wasser": "Feuer bringt das stille Wasser in Bewegung und schenkt Dynamik, während das Wasser das wilde Feuer sanft abkühlt. Eure Beziehung ist von einer tiefen, fast magnetischen Faszination füreinander geprägt. Du bietest deinem Hund die emotionale Tiefe und das feine Gespür, das er braucht, um sich verstanden zu fühlen. Dein Hund bringt dich im Gegenzug aus deinem emotionalen Schneckenhaus heraus und schenkt dir Lebensfreude und Mut. Es ist ein ständiger Tanz der Elemente, der viel Achtsamkeit erfordert, aber ein unglaubliches Wachstumspotenzial birgt. Eure Seelen schwingen in einer tiefen Resonanz aus Gefühl und Tatkraft. Wenn Spannungen entstehen, löschen sie sich nicht aus, sondern transformieren sich in tiefes, gegenseitiges Verständnis und Respekt für die Andersartigkeit des anderen.",
    "Erde-Feuer": "Stabile, geduldige Erd-Energie gibt dem feurigen Tatendrang eine sichere, feste Basis. Eure Verbindung ist eine wunderbare Symbiose aus Stabilität und Begeisterung. Du bringst die nötige Dynamik und Leidenschaft in das Leben deines Hundes, während er dir zeigt, wie heilsam Entschleunigung und Präsenz im Hier und Jetzt sein können. Wenn du ungeduldig wirst, erdet dich sein sanfter Blick und bringt dich augenblicklich zur Ruhe. Ihr ergänzt eure gegenseitigen Temperamente auf absolut harmonische Weise. Es ist ein Bündnis, das auf tiefem Vertrauen und einer klaren, verlässlichen Führung basiert. Dein Hund lernt von dir, dass er sich fallen lassen kann, während du lernst, die Dinge mit mehr Geduld und Struktur anzugehen.",
    "Erde-Erde": "Ein absolut unerschütterliches Fundament aus tiefer Ruhe, gegenseitiger Verlässlichkeit und wunderschönen, gemeinsamen Genuss-Ritualen im Einklang mit der Natur. Eure Energien sind von derselben beständigen Schwingung getragen, was euer Zusammenleben extrem harmonisch und stressfrei macht. Ihr liebt die einfachen Dinge des Lebens: ausgedehnte Spaziergänge im Wald, gemeinsames Entspannen und feste Alltagsstrukturen. Es gibt keine Missverständnisse, da ihr dieselbe Sprache des Körpers und der Natur sprecht. Eure Bindung wächst still, aber tief wie die Wurzeln eines alten Baumes und schenkt euch beiden ein unumstößliches Sicherheitsgefühl. Ihr seid füreinander der verlässlichste Fels in der Brandung und baut ein Nest voller Frieden und Beständigkeit auf.",
    "Erde-Luft": "Die geduldige Erde gibt dem flüchtigen Wind eine klare Richtung und Stabilität, während der Wind frische, fröhliche Ideen und Leichtigkeit in den Alltag bringt. In eurer Beziehung trifft Intellekt und Leichtigkeit auf gesunden Pragmatismus und Ruhe. Du forderst den wachen Geist deines Hundes durch abwechslungsreiche Aufgaben heraus, während er dir hilft, deine Gedanken zu ordnen und ganz im Moment anzukommen. Ihr gebt euch gegenseitig den perfekten Ausgleich, sodass weder Hektik noch Trägheit die Oberhand gewinnen. Eure Verbindung ist geprägt von einer heiteren Balance und einem stetigen, harmonischen Lernprozess. Dein Hund bringt dich zum Lächeln, wenn du zu ernst bist, und du erdest ihn, wenn seine Gedanken verflattern.",
    "Erde-Wasser": "Heilendes Wasser nährt die fruchtbare Erde, während die stabile Erde dem weichen Wasser Form, Schutz und Sicherheit schenkt. Dies ist eine der nährendsten und seelenvollsten Konstellationen überhaupt. Eure Verbindung ist von einer beispiellosen Empathie und Fürsorge getragen, bei der Worte völlig überflüssig sind. Du spürst die feinsten Bedürfnisse deines Hundes, und er reagiert mit einer grenzenlosen Treue und Hingabe auf deine Zuwendung. Ihr schafft füreinander einen geschützten Raum der Geborgenheit, in dem ihr euch beide vom Stress der Außenwelt regenerieren könnt. Eure Partnerschaft ist ein stilles, tiefes Heiligtum. Ihr wachst zusammen und nährt euch auf einer tiefen emotionalen und energetischen Ebene, die von bedingungslosem Schutz getragen wird.",
    "Luft-Feuer": "Ein funkelndes, inspirierendes Zusammenspiel aus wachem Geist und tatkräftiger Energie. Eure Verbindung vibriert auf einer anregenden Frequenz, die ständig neue Abenteuer und Lernprozesse hervorbringt. Du motivierst deinen aufgeweckten Hund zu sportlichen und mentalen Höchstleistungen, während er dich mit seiner unbeschwerten Freude ansteckt. Ihr langweilt euch niemals zusammen, da euer Alltag bunter, kommunikativer und voller Bewegung ist. Achtet darauf, bewusste Ruheinseln einzubauen, um euer feines Nervensystem nicht zu überlasten. Eure Bindung ist ein leuchtendes Feuerwerk der Lebensfreude. Ihr bringt einander ständig zum Lachen und teilt eine tiefe, geistige Verbundenheit, die euch spielerisch jede Hürde meistern lässt.",
    "Luft-Erde": "Gemeinsame Intelligenz und wacher Austausch treffen auf bodenständige Ruhe und Gelassenheit. In eurer Partnerschaft gleicht der stabile Anker der Erde die flatterhafte Energie des Windes aus. Du schenkst deinem neugierigen Hund den sicheren Rahmen und die nötige Ruhe, die sein sensibles Nervensystem braucht. Im Gegenzug bringt dein Hund Leichtigkeit, Witz und spielerische Energie in deinen Alltag. Ihr profitiert enorm voneinander, da ihr euch gegenseitig genau das gebt, was dem anderen fehlt. Eure Liebe wächst durch ein tiefes gegenseitiges Verständnis und verlässliche Alltagsstrukturen. Es ist eine harmonische Symbiose, in der wacher Geist auf stoische Kraft trifft und euch beide im Alltag auf sanfte Weise ausbalanciert.",
    "Luft-Luft": "Ein wirbelnder Sturm der Fröhlichkeit, Leichtigkeit und des ständigen gemeinsamen Lernens. Eure Verbindung ist extrem kommunikativ, verspielt und frei von Schwere. Ihr liebt es, neue Orte zu erkunden, andere Hunde und Menschen zu treffen und gemeinsam neue Tricks auszuprobieren. Eure Seelen kommunizieren auf einer fast telepathischen Ebene des Geistes und der Neugier. Da ihr beide ein hochsensibles Nervensystem habt, solltet ihr im Haus eine ruhige, entspannende Atmosphäre pflegen, um Reizüberflutungen zu vermeiden. Euer gemeinsamer Weg ist ein fröhlicher Tanz im Wind. Ihr versteht euch ohne Worte über feinste Schwingungen und teilt eine spielerische Leichtigkeit, die das Leben bunte macht.",
    "Luft-Wasser": "Sanfte Brise trifft auf tiefe, unergründliche Ozeane. Eure Beziehung ist von einer sehr feinen, fast ätherischen Schwingung getragen. Du nimmst die verspielte und aufgeweckte Natur deines Hundes mit großer emotionaler Empathie auf und schenkst ihm ein tiefes Gefühl von Geborgenheit. Dein Hund bringt Leichtigkeit und ein Lächeln in deine manchmal tiefen emotionalen Gewässer. Ihr kommuniziert fast lautlos über zarteste Blicke und minimale Gesten. Es ist eine spirituell hochentwickelte Verbindung, die auf bedingungslosem Vertrauen und feinstofflicher Resonanz beruht. Ihr helft einander, Gefühle und Gedanken harmonisch miteinander in Einklang zu bringen und schafft eine Aura des tiefen Friedens.",
    "Wasser-Feuer": `Der ${ownerZodiac.name}-Einfluss des ${ownerTerm}s strahlt Wärme und natürliche Führungsstärke aus – genau das, was die sensible Wasser-Seele von ${dogName} braucht, um sich im Alltag sicher und geborgen zu fühlen. Du bist der schützende Leuchtturm, der ${isFemale ? "ihr" : "ihm"} Orientierung gibt, während ${dogName} dir eine ungeahnte emotionale Tiefe und seelische Weichheit schenkt. Wenn du zu ungestüm wirst, erinnert dich ${posPronounMascNeut} feines Wesen daran, einen Gang zurückzuschalten. Zusammen findet ihr eine wunderbare Balance zwischen tatkräftigem Handeln und stillem Fühlen. Eure Bindung ist ein leidenschaftlicher Schutzraum. Eure Seelen ergänzen sich perfekt: Du gibst ${isFemale ? "ihr" : "ihm"} Halt, und ${isFemale ? "sie" : "er"} gibt dir bedingungslose Liebe.`,
    "Wasser-Erde": `Tiefes, blindes gegenseitiges Verständnis prägt eure Seelen. Du schenkst Schutz, feste Strukturen und eine verlässliche Sicherheit, während ${dogName} dir im Gegenzug bedingungslose emotionale Heilung und seelischen Frieden schenkt. Eure Beziehung braucht keine lauten Worte oder ständige Beschäftigung – eure bloße Anwesenheit im selben Raum reicht aus, um eure Energiefelder harmonisch zu synchronisieren. Ihr seid füreinander der sicherste Hafen in allen Stürmen des Lebens. Eure Treue zueinander ist absolut und unerschütterlich. Diese magische Verbindung nährt euch beide zutiefst und wirkt wie ein heilender Balsam auf alltagsbedingten Stress und Sorgen.`,
    "Wasser-Luft": `Eine feine, fast ätherische und hochspirituelle Verbindung. Ihr versteht euch blind über zarte Blicke, minimale Gesten und eine tiefe, seelische Resonanz. ${dogName} nimmt deine wachen Gedanken sofort wahr, während du ${posPronounFemPlurGen} sensiblen Stimmungen empathisch auffängst. Zusammen gleitet ihr mit einer eleganten Leichtigkeit durch den Alltag. Eure Bindung ist frei von Druck und Härte – sie basiert auf dem feinen Spiel von Intuition, gegenseitigem Respekt und einer tiefen seelischen Frequenz, die euch im Alltag wunderbar beflügelt. Ihr schenkt einander emotionale Weite und einen klaren, ruhigen Geist, der euch beide im Alltag auf sanfte Weise erhebt.`,
    "Wasser-Wasser": `Zwei harmonische Wassertropfen, die zu einer einzigen, tiefen Seelenpartnerschaft verschmelzen. Eure Verbindung ist von einer beispiellosen emotionalen und spirituellen Tiefe geprägt, die weit über das Alltägliche hinausgeht. Ihr spürt die Stimmungen des anderen augenblicklich und teilt ein fast telepathisches Band. Streit oder Hektik haben in eurem gemeinsamen Raum keinen Platz; ihr schwingt im vollkommenen emotionalen Gleichklang. Eure Beziehung ist ein geschützter Ozean des gegenseitigen Vertrauens und eine Quelle tiefer seelischer Heilung. Ihr spiegelt einander eure tiefsten Gefühle und schafft eine Verbindung, die über Raum und Zeit hinausreicht.`
  };

  const combiKey = `${dogSun.element}-${ownerZodiac.element}`;
  const connectionSignature = signatureMap[combiKey] || signatureMap["Wasser-Feuer"];

  // -- 6. AKTUELLE KOSMISCHE PHASE --
  let currentPhaseText = `${dogName} befindet sich aktuell in der wichtigen Lebensphase: ${lifePhase.name} (${lifePhase.desc}). In dieser Phase geht es kosmisch primär darum, die innere, seelische Bindung zu dir weiter zu zementieren und alte karmische Lernaufgaben abzuschließen. ${pronoun} filtert Reize der Außenwelt nun bewusster und sucht vermehrt die geistige und körperliche Nähe zu ${posPronounMascNeutDative} Lieblingsmenschen. In den kommenden 12 Monaten kündigt sich ein harmonischer, stärkender Stand des Planeten Jupiter an, der neue Lebenskraft, gesundheitliche Stabilität und energetische Fröhlichkeit in eure gemeinsame Verbindung spült. Gönne ${objectPronoun} in dieser Zeit viel bewusste Zuwendung.`;

  // -- 7. DEINE 3 KOSMISCHEN ALLTAGSTIPPS --
  let tipp1Text = `<strong>Das ${dogSun.element}-Ritual:</strong> `;
  if (dogSun.element === "Wasser") {
    tipp1Text += `Bringe ${dogName} mindestens einmal pro Woche an ein natürliches Gewässer – einen Bach, einen See oder einen Fluss. Nicht zwingend zum wilden Schwimmen; allein das ruhige Stehen am Ufer lädt ${posPronounMascNeut} sensibles Fische/Krebs-Wesen energetisch tief auf und reinigt ${posPronounFemPlur} Aura von alltagsbedingtem Stress.`;
  } else if (dogSun.element === "Feuer") {
    tipp1Text += `Plane mindestens einmal pro Woche eine freie Renn-Einheit auf einer sicheren Wiese ein, bei der ${dogName} komplett ohne Leine und Vorgaben den Wind der Freiheit spüren kann. Dies ist essenziell, um ${posPronounMascNeut} inneres ${feuerFeuer} sauber brennen zu lassen und Frustrationen vorzubeugen.`;
  } else if (dogSun.element === "Erde") {
    tipp1Text += `Etabliere ein intensives Kautraining oder spannendes Erdschnüffeln im Wald. Vergrabe gesunde Leckerlis flach im feuchten Waldboden oder unter Laub – das Schnüffeln und Graben verbindet ${dogName} direkt mit ${posPronounFemPlurGen} nährenden, beruhigenden Erd-Quelle.`;
  } else {
    tipp1Text += `Nutze anspruchsvolles Intelligenzspielzeug oder verstecke Futtertüten im Geäst von Bäumen. Die wache Luft-Energie deines Hundes verlangt nach regelmäßiger geistiger Arbeit, Konzentrationsübungen und dem gezielten Einsatz ${posPronounFemPlurGen} wachen Sinne.`;
  }

  const tipp2Text = `<strong>Der stille Abend im Gleichklang:</strong> Etabliere einmal pro Woche einen gemeinsamen meditativen Abend, an dem alle störenden Bildschirme, Telefone und Lärmquellen konsequent ausgeschaltet bleiben. Setzt euch zusammen auf den Boden auf eine weiche Decke. Lege deine Hand ganz sanft auf ${dogName}s Brustkorb und atme bewusst im gleichen, ruhigen Takt wie deine Fellnase. Diese einfache Übung synchronisiert eure Herzfrequenzen, stärkt das Band des Vertrauens und baut bei euch beiden stressbedingte Blockaden im Handumdrehen ab.`;
  
  let tipp3Text = `<strong>Mondrhythmus und Regenerationszeiten:</strong> `;
  if (dogSun.element === "Wasser" || dogSun.element === "Luft") {
    tipp3Text += `Plane besonders bei Vollmond ausgiebige, ruhige Abendspaziergänge ein – die Energie deines Hundes ist dann auf dem absoluten Peak und ${pronounL} nimmt die nächtliche Stimmung besonders intensiv wahr. Bei Neumond hingegen solltest du das Programm drastisch herunterfahren; das ist ${posPronounFemPlur} natürliche Zeit für Regeneration und Schlaf.`;
  } else {
    tipp3Text += `Achte streng auf planetarische Erholungszeiten. Gönne ${dogName} nach intensiven Lerntagen oder aufregenden Ausflügen stets 48 Stunden bewusste Entlastung ohne neue Kommandos oder stressige Begegnungen, damit das gelernte Kosmos-Wissen absinken kann und ${posPronounMascNeut} feuriges Nervensystem stabil bleibt.`;
  }

  // -- 8. RAT DES KOSMOS --
  const cosmicAdvice = `${dogName} ist nicht einfach nur ein Haustier oder ein zufälliger Begleiter in deinem Leben. ${pronoun} ist ${isFemale ? "eine zufällige Begleiterin" : "ein zufälliger Begleiter"} auf einem Weg, den du vielleicht noch nicht ganz verstehst. ${pronoun} ist deine treue Seele auf vier Pfoten, die sich aktiv entschieden hat, an deiner Seite zu gehen und dich durch alle Höhen und Tiefen des Lebens zu begleiten. ${posPronounFemPlurCap} Seele hat deinen Weg mit kosmischer Präzision gekreuzt, um dir als Spiegel und ${isFemale ? "Heilerin" : "Heiler"} zu dienen. Behandle diese heilige Verbindung stets als das, was sie wirklich ist: eines der größten und wertvollsten Geschenke des Universums. Genieße jeden gemeinsamen Atemzug voller Achtsamkeit und Dankbarkeit.`;
  
  const jointRitual = `<strong>Die Herzverbindung (Euer wöchentliches Ritual):</strong> Setzt euch abends bei gedimmtem Licht an einem ruhigen Ort zusammen. Lege beide Hände sanft auf ${dogName}s Brustkorb und spüre den regelmäßigen Herzschlag. Schließe deine Augen, atme dreimal tief aus und sage im Geiste voller Liebe: „Ich sehe dich. Ich bin unendlich dankbar für dich. Ich liebe dich bedingungslos, genau so, wie du bist.“ Bleibe so für etwa 5 Minuten in absoluter Stille sitzen, bis sich eure beiden Energiefelder spürbar beruhigt, harmonisiert und fest miteinander verbunden haben.`;

  // -- 9. HUNDE-KOMPASS PREMIUM --
  const stoneMap = { Feuer: "Karneol", Erde: "Roter Jaspis", Luft: "Bergkristall", Wasser: "Rosenquarz" };
  const colorMap = { Feuer: "Sonnengelb & Rubinrot", Erde: "Waldgrün & Kastanienbraun", Luft: "Lichtblau & Weiß", Wasser: "Meeresblau & Silber" };
  const wordMap = { Feuer: "Mut", Erde: "Beständigkeit", Luft: "Leichtigkeit", Wasser: "Vertrauen" };
  const timeMap = { Feuer: "Früher Vormittag", Erde: "Mittagsruhe", Luft: "Nachmittagstrubel", Wasser: "Früher Abend zwischen 17:00 und 19:00 Uhr" };
  
  const compStone = stoneMap[dogSun.element];
  const compColor = colorMap[dogSun.element];
  const compWord = wordMap[dogSun.element];
  const compTime = timeMap[dogSun.element];
  
  const essenceMap = {
    Feuer: `${dogName} lehrt dich durch ${posPronounMascAcc} leidenschaftlichen Lebenswillen, wie man Ängste mutig überwindet und voller Optimismus neue Wege beschreitet.`,
    Erde: `${dogName} lehrt dich durch ${posPronounFemPlur} unerschütterliche Geduld und Treue, wie man ganz im Hier und Jetzt ankommt und das Einfache genießt.`,
    Luft: `${dogName} lehrt dich durch ${posPronounMascAcc} charmanten, wachen Geist, wie man spielerische Leichtigkeit in schwere Tage bringt und das Leben feiert.`,
    Wasser: `${dogName} lehrt dich durch ${posPronounFemPlur} bloße, heilende Anwesenheit, was bedingungslose Liebe in ihrer reinsten kosmischen Form bedeutet.`
  };
  const cosmicEssence = essenceMap[dogSun.element];

  // Rückgabe aller befüllten Abschnitte
  return {
    dogName,
    genderTerm,
    isFemale,
    breed,
    traits,
    ownerName,
    
    // 1. Kosmisches Wesen
    cosmicTitle,
    dogSun,
    dogMoon,
    dogAsc,
    basicEnergyText,
    
    // 2. Persönlichkeit
    strengths: strengthsMap[dogSun.element],
    challenges: challengesMap[dogSun.element],
    needs: needsMap[dogSun.element],
    
    // 3. Gesundheit
    energyLevel: `${dogSun.element === "Feuer" || dogSun.element === "Luft" ? "Hoch" : "Moderat"} - ${dogSun.element === "Feuer" ? `Benötigt viel freie Bewegung und Auslauf, um überschüssige ${feuerEnergie} abzubauen.` : "Schätzt ausgewogene, ruhige Spaziergänge im Einklang mit der Natur ohne Hektik."}`,
    healthZone: healthZoneMap[dogSun.element],
    strengthenEnergy: `Direkter Naturkontakt, Spaziergänge nahe ${dogSun.element === "Wasser" ? "Gewässern" : dogSun.element === "Erde" ? "Wäldern" : "weiten Feldern"}, viel Ruhe beim Fressen und sanfte Massagen.`,
    
    // 4. Herzensbindung & Rudelleben
    loveHuman: loveHumanMap[dogSun.element],
    loveAnimals: `Grundsätzlich friedfertig und sozial. Braucht bei sehr stürmischen Artgenossen etwas Distanz zur Orientierung. Kleintiere werden mit großer ${dogSun.element === "Wasser" ? "Sanftheit" : "Vorsicht"} behandelt.`,
    loveShow: `Drückt sich durch stille körperliche Nähe, das Auflegen des Kopfes auf den Schoß, sanften Augenkontakt und kleine, beständige Begrüßungs-Rituale aus.`,
    
    // 5. Mensch-Hund Seelenverbindung
    connectionSignature,
    synastryAspects: `Deine Venus (${ownerZodiac.name}) bildet ein harmonisches Trigon zu ${dogName}s Herrscherplanet ${dogSun.planet} – die astrologische Signatur einer tiefen Seelenverbindung. Dein Aszendent schwingt in perfekter Resonanz mit ${dogName}s ${dogAsc.name}-Aszendenten.`,
    dogNeedsFromOwner: `Deine ruhige, zentrierte Aufmerksamkeit. Wenn du gestresst bist, braucht ${dogName} 10 Minuten stilles Kuscheln mit ${posPronounMascNeutDative} ${ownerTerm} zum energetischen Ausgleich.`,
    ownerLearnsFromDog: `${dogName} ist dein${isFemale ? "e" : ""} täglich${isFemale ? "e" : "er"} ${isFemale ? "Lehrerin" : "Lehrer"} für Achtsamkeit und zeigt dir als ${ownerTerm}, was wahre Präsenz bedeutet. Nachtragend zu sein ist ${objectPronoun} völlig fremd – jeder Morgen ist ein kosmischer Neuanfang.`,
    
    // 6. Kosmische Phase
    currentPhase: currentPhaseText,
    
    // 7. Tipps
    tipp1: tipp1Text,
    tipp2: tipp2Text,
    tipp3: tipp3Text,
    
    // 8. Rat
    cosmicAdvice,
    jointRitual,
    
    // 9. Kompass
    kompass: {
      stone: compStone,
      elementPlace: `${dogSun.element} & ${dogSun.element === "Wasser" ? "Fließende Gewässer" : dogSun.element === "Erde" ? "Dichte Wälder" : "Weite Wiesen"}`,
      color: compColor,
      word: compWord,
      essence: cosmicEssence,
      bestTime: compTime,
      planet: dogSun.planet,
      environment: `Ruhige, naturnahe Kraftorte ohne Hektik, Trubel und abrupten Lärm.`
    },

    generatedDate: new Date().toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" })
  };
}
