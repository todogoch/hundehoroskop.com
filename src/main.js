import { generateAmastriaPremiumHoroscope, calculateZodiacSign, calculateMoonSign, calculateAscendant, getZodiacById } from './horoscopeData.js';
import { initConstellations } from './constellations.js';
import { getStaticSchema, updateDynamicSchema } from './seoSchema.js';
import { fetchNatalPlacements, generateGeminiHoroscope } from './astrologyService.js';

function cleanText(val) {
  if (typeof val !== "string") return val;
  // Entferne alle Markdown-Asterisken (*, **) und Unterstriche (_)
  return val.replace(/[\*_]/g, "");
}

document.addEventListener("DOMContentLoaded", () => {
  
  // --- Währungserkennung und dynamische Preisanzeige ---
  function detectUserCurrency() {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz === "Europe/Zurich" || tz === "Europe/Vaduz") {
        return "CHF";
      }
      const lang = navigator.language || "";
      if (
        lang.endsWith("-CH") ||
        lang.endsWith("-LI") ||
        lang.endsWith("-ch") ||
        lang.endsWith("-li")
      ) {
        return "CHF";
      }
    } catch (e) {
      console.error("Failed to detect currency", e);
    }
    return "EUR";
  }

  const userCurrency = detectUserCurrency();
  const priceString = userCurrency === "CHF" ? "CHF 19.90" : "19,90 €";
  document.querySelectorAll(".dynamic-price").forEach(el => {
    el.textContent = priceString;
  });

  // 1. Initialisiere Sternenhimmel Canvas
  initConstellations("constellations-bg");

  // 2. Injiziere statisches SEO Schema
  const staticSchemaScript = document.getElementById("static-seo-schema");
  if (staticSchemaScript) {
    staticSchemaScript.text = JSON.stringify(getStaticSchema());
  }

  // 3. UI-Elemente referenzieren
  const form = document.getElementById("horoscope-form");
  const dogNameInput = document.getElementById("dog-name");
  const dogBreedInput = document.getElementById("dog-breed");
  const rescueCheckbox = document.getElementById("rescue-checkbox");
  
  const birthdateGroup = document.getElementById("birthdate-group");
  const dogBirthdate = document.getElementById("dog-birthdate");
  
  const birthtimeGroup = document.getElementById("birthtime-group");
  const dogBirthtime = document.getElementById("dog-birthtime");
  
  const birthplaceGroup = document.getElementById("birthplace-group");
  const dogBirthplace = document.getElementById("dog-birthplace");
  
  const dogTraitsInput = document.getElementById("dog-traits");
  const rescueQuizContainer = document.getElementById("rescue-quiz-container");
  
  // Halter
  const ownerNameInput = document.getElementById("owner-name");
  const ownerEmailInput = document.getElementById("owner-email");
  const ownerBirthdate = document.getElementById("owner-birthdate");
  const ownerBirthplace = document.getElementById("owner-birthplace");
  const ownerBirthtime = document.getElementById("owner-birthtime");
  const simulationCheckbox = document.getElementById("simulation-checkbox");

  // Dev/Simulation Auto-detection
  const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.search.includes('dev=true');
  if (isDev && simulationCheckbox) {
    simulationCheckbox.checked = true;
    console.log("Dev mode detected: simulationCheckbox checked automatically.");
  }

  // Reset-Button referenzieren
  const newBtn = document.getElementById("btn-new");

  // Loader & Ergebnisse
  const loaderOverlay = document.getElementById("magic-loader");
  const loaderText = document.getElementById("loader-text");
  const resultSection = document.getElementById("horoscope-result");
  const calculatorCard = document.getElementById("calculator-card");
  
  // Geschlechtswahl (Hund)
  const genderMaleBtn = document.getElementById("gender-male");
  const genderFemaleBtn = document.getElementById("gender-female");
  let selectedGender = "m"; // Default: Rüde

  genderMaleBtn.addEventListener("click", () => {
    genderMaleBtn.classList.add("active");
    genderFemaleBtn.classList.remove("active");
    selectedGender = "m";
  });

  genderFemaleBtn.addEventListener("click", () => {
    genderFemaleBtn.classList.add("active");
    genderMaleBtn.classList.remove("active");
    selectedGender = "w";
  });

  // Rollenwahl (Halter)
  const ownerGenderMaleBtn = document.getElementById("owner-gender-male");
  const ownerGenderFemaleBtn = document.getElementById("owner-gender-female");
  let selectedOwnerGender = "w"; // Default: Frauchen

  ownerGenderMaleBtn.addEventListener("click", () => {
    ownerGenderMaleBtn.classList.add("active");
    ownerGenderFemaleBtn.classList.remove("active");
    selectedOwnerGender = "m";
  });

  ownerGenderFemaleBtn.addEventListener("click", () => {
    ownerGenderFemaleBtn.classList.add("active");
    ownerGenderMaleBtn.classList.remove("active");
    selectedOwnerGender = "w";
  });

  // Geburtsdaten-Modus Tab-Umschalter
  const modeDateBtn = document.getElementById("mode-date-btn");
  const modeRescueBtn = document.getElementById("mode-rescue-btn");

  modeDateBtn.addEventListener("click", () => {
    modeDateBtn.classList.add("active");
    modeRescueBtn.classList.remove("active");
    rescueCheckbox.checked = false;
    const event = new Event('change');
    rescueCheckbox.dispatchEvent(event);
  });

  modeRescueBtn.addEventListener("click", () => {
    modeRescueBtn.classList.add("active");
    modeDateBtn.classList.remove("active");
    rescueCheckbox.checked = true;
    const event = new Event('change');
    rescueCheckbox.dispatchEvent(event);
  });

  // --- Wizard Logic ---
  let currentStep = 1;

  function validateStep(stepNum) {
    const stepContainer = document.querySelector(`.form-step[data-step="${stepNum}"]`);
    if (!stepContainer) return true;
    const inputs = stepContainer.querySelectorAll("input, select, textarea");
    for (const input of inputs) {
      if (!input.checkValidity()) {
        input.reportValidity();
        return false;
      }
    }
    return true;
  }

  function updateWizardSteps() {
    // Hide all steps, show active
    document.querySelectorAll(".form-step").forEach(step => {
      step.classList.remove("active");
    });
    const activeStep = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    if (activeStep) {
      activeStep.classList.add("active");
    }

    // Update wizard progress indicators
    document.querySelectorAll(".wizard-step-indicator").forEach(indicator => {
      const stepIdx = parseInt(indicator.getAttribute("data-step-indicator"), 10);
      indicator.classList.remove("active", "completed");
      if (stepIdx === currentStep) {
        indicator.classList.add("active");
      } else if (stepIdx < currentStep) {
        indicator.classList.add("completed");
      }
    });
  }

  // Next Buttons click listeners
  document.querySelectorAll(".btn-wizard-next").forEach(btn => {
    btn.addEventListener("click", () => {
      const nextStep = parseInt(btn.getAttribute("data-next-step"), 10);
      if (validateStep(currentStep)) {
        currentStep = nextStep;
        updateWizardSteps();
        
        if (calculatorCard) {
          calculatorCard.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  // Back Buttons click listeners
  document.querySelectorAll(".btn-wizard-back").forEach(btn => {
    btn.addEventListener("click", () => {
      const prevStep = parseInt(btn.getAttribute("data-prev-step"), 10);
      currentStep = prevStep;
      updateWizardSteps();
      
      if (calculatorCard) {
        calculatorCard.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // 3b. Beispiel-Horoskop (Muster) laden
  const loadSampleBtn = document.getElementById("btn-load-sample");
  const loadSampleHeroBtn = document.getElementById("btn-load-sample-hero");
  const previewBanner = document.getElementById("sample-preview-banner");

  const loadSampleHandler = () => {
    const sampleInput = {
      dogName: "Dante",
      dogGender: "m",
      dogBreed: "Labrador",
      isRescue: false,
      dogBirthdate: "2025-12-06", // Schütze
      dogBirthtime: "14:30",
      dogBirthplace: "Zürich",
      dogTraits: "",
      ownerName: "Claudia",
      ownerGender: "w",
      ownerBirthdate: "1990-06-05", // Zwillinge
      ownerBirthplace: "Zürich",
      ownerBirthtime: "08:15"
    };

    // Generiere das Musterhoroskop
    const sampleHoroscope = generateAmastriaPremiumHoroscope(sampleInput, null);

    // Befülle die Sektionen im DOM
    renderPremiumResult(sampleHoroscope);

    // Zeige das Vorschau-Banner an
    if (previewBanner) {
      previewBanner.style.display = "block";
    }

    // Benenne den Reset-Button um für die Vorschau
    if (newBtn) {
      newBtn.textContent = "Persönliches Hundehoroskop berechnen";
    }

    // Zeige das Ergebnis
    if (resultSection) {
      resultSection.style.display = "block";
      resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (loadSampleBtn) {
    loadSampleBtn.addEventListener("click", loadSampleHandler);
  }
  if (loadSampleHeroBtn) {
    loadSampleHeroBtn.addEventListener("click", loadSampleHandler);
  }

  // Tierschutz / Rescue Dog Modus umschalten
  rescueCheckbox.addEventListener("change", () => {
    if (rescueCheckbox.checked) {
      birthdateGroup.style.display = "none";
      birthtimeGroup.style.display = "none";
      birthplaceGroup.style.display = "none";
      
      dogBirthdate.removeAttribute("required");
      rescueQuizContainer.style.display = "block";
    } else {
      birthdateGroup.style.display = "flex";
      birthtimeGroup.style.display = "flex";
      birthplaceGroup.style.display = "flex";
      
      dogBirthdate.setAttribute("required", "");
      rescueQuizContainer.style.display = "none";
    }
  });

  // Rescue Quiz Antwort-Auswahl steuern
  const quizQuestions = document.querySelectorAll(".quiz-options");
  quizQuestions.forEach(questionBox => {
    const buttons = questionBox.querySelectorAll(".quiz-btn");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });
  });

  // 4. Accordion Funktionalität (für Tierkreiszeichen und FAQ)
  const accordions = document.querySelectorAll(".accordion-header");
  accordions.forEach(header => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const isActive = item.classList.contains("active");

      // Schließe alle anderen im gleichen Wrapper
      const parentWrapper = item.parentElement;
      const siblingItems = parentWrapper.querySelectorAll(".accordion-item");
      siblingItems.forEach(sib => sib.classList.remove("active"));

      // Umschalten des aktuellen Elements
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });

  // 4b. Zodiac Grid Card Selection & Teaser Drawer Logic
  const zodiacCards = document.querySelectorAll(".zodiac-card");
  const zodiacTeaserCard = document.getElementById("zodiac-teaser-card");
  const teaserCloseBtn = document.getElementById("zodiac-teaser-close");
  const teaserIcon = document.getElementById("teaser-zodiac-icon");
  const teaserName = document.getElementById("teaser-zodiac-name");
  const teaserDate = document.getElementById("teaser-zodiac-date");
  const teaserElementContainer = document.getElementById("teaser-zodiac-element-container");
  const teaserText = document.getElementById("teaser-zodiac-text");
  const teaserCalculateBtn = document.getElementById("btn-teaser-calculate");
  const teaserNameBtn = document.getElementById("teaser-zodiac-name-btn");

  const zodiacPrefillDates = {
    widder: "2025-04-05",
    stier: "2025-05-05",
    zwillinge: "2025-06-05",
    krebs: "2025-07-05",
    loewe: "2025-08-05",
    jungfrau: "2025-09-05",
    waage: "2025-10-05",
    skorpion: "2025-11-05",
    schuetze: "2025-12-05",
    steinbock: "2025-01-05",
    wassermann: "2025-02-05",
    fische: "2025-03-05"
  };

  if (teaserCloseBtn && zodiacTeaserCard) {
    teaserCloseBtn.addEventListener("click", () => {
      zodiacTeaserCard.style.display = "none";
      zodiacCards.forEach(c => c.classList.remove("active"));
    });
  }

  zodiacCards.forEach(card => {
    const header = card.querySelector(".zodiac-card-header");
    if (header) {
      header.addEventListener("click", () => {
        // Toggle active styling on grid cards
        zodiacCards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");

        const zodiacId = card.getAttribute("data-zodiac");
        const titleText = card.querySelector(".zodiac-card-header h3").textContent;
        const dateRangeText = card.querySelector(".zodiac-date").textContent;
        
        // Clone elements safely
        const svgElement = card.querySelector(".zodiac-svg").cloneNode(true);
        const elementBadge = card.querySelector(".accordion-badge").cloneNode(true);
        const descriptionText = card.querySelector(".zodiac-card-content p").textContent;

        // Populate Teaser Card
        if (teaserIcon) {
          teaserIcon.innerHTML = "";
          teaserIcon.appendChild(svgElement);
        }
        if (teaserName) teaserName.textContent = titleText;
        if (teaserDate) teaserDate.textContent = dateRangeText;
        if (teaserElementContainer) {
          teaserElementContainer.innerHTML = "";
          teaserElementContainer.appendChild(elementBadge);
        }
        if (teaserText) teaserText.textContent = descriptionText;
        if (teaserNameBtn) teaserNameBtn.textContent = titleText;
        if (teaserCalculateBtn) {
          teaserCalculateBtn.setAttribute("data-zodiac-select", zodiacId);
        }

        // Display and scroll
        if (zodiacTeaserCard) {
          zodiacTeaserCard.style.display = "block";
          zodiacTeaserCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      });
    }
  });

  if (teaserCalculateBtn) {
    teaserCalculateBtn.addEventListener("click", () => {
      const zodiacId = teaserCalculateBtn.getAttribute("data-zodiac-select");
      const targetDate = zodiacPrefillDates[zodiacId];
      if (targetDate && dogBirthdate) {
        dogBirthdate.value = targetDate;
        
        // Select "Geburtsdatum bekannt" tab (trigger click on modeDateBtn)
        if (modeDateBtn) {
          modeDateBtn.click();
        }
        
        // Transition wizard to Step 2
        currentStep = 2;
        updateWizardSteps();
        
        // Scroll to calculator card
        if (calculatorCard) {
          calculatorCard.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        
        // Apply flash gold class to input field for a visual highlight
        dogBirthdate.classList.add("flash-gold-input");
        setTimeout(() => {
          dogBirthdate.classList.remove("flash-gold-input");
        }, 3000);

        // Hide teaser card
        if (zodiacTeaserCard) {
          zodiacTeaserCard.style.display = "none";
          zodiacCards.forEach(c => c.classList.remove("active"));
        }
      }
    });
  }


  // 5. Formularabsendung steuern (Berechnung)
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Verberge das Vorschau-Banner bei einer echten Berechnung
    if (previewBanner) {
      previewBanner.style.display = "none";
    }


    if (newBtn) {
      newBtn.textContent = "✦ Weiteres Horoskop berechnen";
    }

    try {
      const dogName = dogNameInput.value.trim();
      if (!dogName) return;

      const formattedDogName = dogName.charAt(0).toUpperCase() + dogName.slice(1);
      const isFemale = selectedGender === "w";
      const isRescue = rescueCheckbox.checked;

      // Hund Geburtsdaten-Validierung (falls nicht Rescue)
      if (!isRescue && !dogBirthdate.value) {
        alert("Bitte gib ein Geburtsdatum für deinen Hund an oder wähle den 'Rescue'-Modus.");
        return;
      }

      let rescueElement = "Erde";
      let rescueAge = "adult";
      if (isRescue) {
        // Bestimme dominantes Element aus dem Quiz (unter Ausschluss des Alters-Selectors)
        const selectedAnswers = [];
        const activeQuizBtns = rescueQuizContainer.querySelectorAll(".quiz-options:not(#rescue-age-container) .quiz-btn.active");
        activeQuizBtns.forEach(btn => {
          selectedAnswers.push(btn.getAttribute("data-value"));
        });

        const counts = { Feuer: 0, Erde: 0, Luft: 0, Wasser: 0 };
        selectedAnswers.forEach(elem => {
          counts[elem] = (counts[elem] || 0) + 1;
        });

        let maxCount = -1;
        for (const [elem, count] of Object.entries(counts)) {
          if (count > maxCount) {
            maxCount = count;
            rescueElement = elem;
          }
        }

        // Bestimme geschätztes Alter
        const activeAgeBtn = document.querySelector("#rescue-age-container .quiz-btn.active");
        if (activeAgeBtn) {
          rescueAge = activeAgeBtn.getAttribute("data-value");
        }
      }

      // Erfasse alle Parameter
      const inputData = {
        dogName: formattedDogName,
        dogGender: selectedGender,
        dogBreed: dogBreedInput.value.trim() || "Mischling",
        isRescue,
        rescueElement,
        rescueAge,
        dogBirthdate: dogBirthdate.value,
        dogBirthtime: dogBirthtime.value,
        dogBirthplace: dogBirthplace.value.trim(),
        dogTraits: dogTraitsInput.value.trim(),
        
        ownerName: ownerNameInput.value.trim() || "Halter:in",
        ownerGender: selectedOwnerGender,
        ownerBirthdate: ownerBirthdate.value,
        ownerBirthplace: ownerBirthplace.value.trim(),
        ownerBirthtime: ownerBirthtime.value
      };

      // Starte echten API-Abruf oder Stripe Checkout
      const isSimulation = simulationCheckbox && simulationCheckbox.checked;

      if (!isSimulation) {
        // Zeige magischen Ladezustand für die Weiterleitung zur Zahlung
        loaderOverlay.style.display = "flex";
        document.body.style.overflow = "hidden";
        loaderText.textContent = "Sicheres Zahlungsportal (Stripe) wird geladen...";

        try {
          const backendUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? 'http://localhost:3000'
            : 'https://app.amastria.com';

          const response = await fetch(`${backendUrl}/api/orakel/checkout`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              itemType: "report_hundehoroskop",
              email: ownerEmailInput ? ownerEmailInput.value.trim() : "",
              dogName: formattedDogName,
              dogGender: selectedGender,
              dogBreed: dogBreedInput.value.trim() || "Mischling",
              isRescue,
              rescueElement,
              rescueAge,
              dogBirthdate: dogBirthdate.value,
              dogBirthtime: dogBirthtime.value,
              dogBirthplace: dogBirthplace.value.trim(),
              dogTraits: dogTraitsInput.value.trim(),
              ownerName: ownerNameInput.value.trim() || "Halter:in",
              ownerGender: selectedOwnerGender,
              ownerBirthdate: ownerBirthdate.value,
              ownerBirthplace: ownerBirthplace.value.trim(),
              ownerBirthtime: ownerBirthtime.value,
              currency: userCurrency.toLowerCase()
            })
          });

          if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || "Fehler beim Erstellen der Zahlungssitzung.");
          }

          const checkoutSession = await response.json();
          if (checkoutSession.url) {
            window.location.href = checkoutSession.url;
          } else if (checkoutSession.sessionId) {
            // Direct subscription bypass success redirect
            window.location.href = `${backendUrl}/orakel/hundehoroskop/success?sessionId=${checkoutSession.sessionId}`;
          } else {
            throw new Error("Ungültige Antwort vom Server erhalten.");
          }
        } catch (checkoutErr) {
          console.error("Checkout-Initiierung fehlgeschlagen:", checkoutErr);
          alert("Fehler bei der Checkout-Initiierung:\n" + checkoutErr.message);
          loaderOverlay.style.display = "none";
          document.body.style.overflow = "auto";
        }
        return; // Stoppe lokale Generierung im Browser!
      }

      // Falls Simulationsmodus aktiv ist, führen wir die Offline-Generierung wie gewohnt aus
      let apiPlacementsPromise = null;
      if (!isSimulation && !isRescue && dogBirthdate.value) {
        apiPlacementsPromise = fetchNatalPlacements(dogBirthdate.value, dogBirthtime.value, dogBirthplace.value);
      }

      // Zeige magischen Ladezustand
      startLoader(async () => {
        try {
          let apiPlacements = null;
          if (apiPlacementsPromise) {
            try {
              apiPlacements = await apiPlacementsPromise;
            } catch (err) {
              console.error("Astrology-API fetch failed in background:", err);
            }
          }

          // 1. Lokale/API-astrologische Platzierungen berechnen
          let computedPlacements = {
            sun: "widder",
            moon: "steinbock",
            ascendant: "krebs",
            ownerZodiac: "waage"
          };

          if (apiPlacements && apiPlacements.sun) {
            computedPlacements = {
              sun: apiPlacements.sun,
              moon: apiPlacements.moon || "steinbock",
              ascendant: apiPlacements.ascendant || "krebs",
              ownerZodiac: "waage"
            };
          } else if (isRescue) {
            const elem = rescueElement || "Erde";
            const mapping = { Feuer: "loewe", Erde: "stier", Luft: "zwillinge", Wasser: "krebs" };
            computedPlacements.sun = mapping[elem] || "stier";
            computedPlacements.moon = "steinbock";
            computedPlacements.ascendant = "krebs";
          } else {
            const dogBirth = new Date(dogBirthdate.value);
            const day = dogBirth.getDate();
            const month = dogBirth.getMonth() + 1;
            const birthYear = dogBirth.getFullYear();
            const sunObj = calculateZodiacSign(day, month);
            const moonObj = calculateMoonSign(day, month, birthYear);
            const ascObj = dogBirthtime.value ? calculateAscendant(sunObj.id, dogBirthtime.value) : { id: "krebs" };
            
            computedPlacements.sun = sunObj.id;
            computedPlacements.moon = moonObj.id;
            computedPlacements.ascendant = ascObj.id;
          }

          const ownerBirth = new Date(ownerBirthdate.value);
          const ownerDay = ownerBirth.getDate();
          const ownerMonth = ownerBirth.getMonth() + 1;
          const ownerSunObj = calculateZodiacSign(ownerDay, ownerMonth);
          computedPlacements.ownerZodiac = ownerSunObj.id;

          // 2. Premium-Horoskop über Gemini generieren, bei Simulationsmodus oder Fehler lokaler Fallback
          let premiumHoroscope;
          if (isSimulation) {
            console.log("Simulations-Modus aktiv: Generiere offline...");
            premiumHoroscope = generateAmastriaPremiumHoroscope(inputData, null);
          } else {
            try {
              const geminiRaw = await generateGeminiHoroscope(inputData, computedPlacements);
              
              // Konvertiere die Gemini-Antwort in unser Datenformat
              premiumHoroscope = {
                dogName: inputData.dogName,
                isFemale: (inputData.dogGender === "w"),
                genderTerm: inputData.dogGender === "w" ? "Hündin" : "Rüde",
                breed: inputData.dogBreed || "Mischling",
                ownerName: inputData.ownerName,
                generatedDate: new Date().toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" }),
                
                dogSun: getZodiacById(computedPlacements.sun),
                dogMoon: getZodiacById(computedPlacements.moon),
                dogAsc: getZodiacById(computedPlacements.ascendant),
                
                cosmicTitle: geminiRaw.cosmicTitle,
                basicEnergyText: geminiRaw.basicEnergyText,
                strengths: geminiRaw.strengths,
                challenges: geminiRaw.challenges,
                needs: geminiRaw.needs,
                
                energyLevel: geminiRaw.energyLevel,
                healthZone: geminiRaw.healthZone,
                strengthenEnergy: geminiRaw.strengthenEnergy,
                
                loveHuman: geminiRaw.loveHuman,
                loveAnimals: geminiRaw.loveAnimals,
                loveShow: geminiRaw.loveShow,
                
                connectionSignature: geminiRaw.connectionSignature,
                synastryAspects: geminiRaw.synastryAspects,
                dogNeedsFromOwner: geminiRaw.dogNeedsFromOwner,
                ownerLearnsFromDog: geminiRaw.ownerLearnsFromDog,
                
                currentPhase: geminiRaw.currentPhase,
                
                tipp1: geminiRaw.tipp1,
                tipp2: geminiRaw.tipp2,
                tipp3: geminiRaw.tipp3,
                
                cosmicAdvice: geminiRaw.cosmicAdvice,
                jointRitual: geminiRaw.jointRitual,
                
                kompass: geminiRaw.kompass
              };
              
              console.log("Horoskop erfolgreich über Gemini generiert.");
            } catch (geminiErr) {
              console.warn("Gemini Live-Generierung fehlgeschlagen. Nutze lokalen Fallback:", geminiErr);
              premiumHoroscope = generateAmastriaPremiumHoroscope(inputData, apiPlacements);
            }
          }
          
          // Befülle die Premium Sektionen im DOM
          renderPremiumResult(premiumHoroscope);

          // Dynamisches SEO-Schema updaten
          updateDynamicSchema(
            premiumHoroscope.dogName, 
            premiumHoroscope.dogSun.name, 
            premiumHoroscope.dogSun.element, 
            premiumHoroscope.cosmicTitle, 
            premiumHoroscope.generatedDate
          );

          // Smooth scroll zum Ergebnis
          resultSection.style.display = "block";
          resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
        } catch (loaderErr) {
          console.error("Fehler bei der Horoskoperstellung:", loaderErr);
          alert("Fehler während der Horoskop-Erstellung:\n" + (loaderErr.stack || loaderErr.message));
          // Loader im Fehlerfall schließen
          loaderOverlay.style.display = "none";
          document.body.style.overflow = "auto";
        }
      });
    } catch (submitErr) {
      console.error("Fehler bei Formularübermittlung:", submitErr);
      alert("Fehler bei Formularübermittlung:\n" + (submitErr.stack || submitErr.message));
    }
  });

  // 6. Ladeanimation steuern
  function startLoader(onComplete) {
    loaderOverlay.style.display = "flex";
    document.body.style.overflow = "hidden"; // Scrollen verhindern

    const steps = [
      { text: "Kosmische Konstellationen werden analysiert...", delay: 0 },
      { text: "Elementare Schwingungen werden abgeglichen...", delay: 800 },
      { text: "Tagesform-Aura für Fellnase wird berechnet...", delay: 1600 },
      { text: "Kosmischer Kauknochen wird perfekt ausgerichtet...", delay: 2400 }
    ];

    steps.forEach(step => {
      setTimeout(() => {
        loaderText.textContent = step.text;
      }, step.delay);
    });

    // Ende des Ladevorgangs
    setTimeout(() => {
      loaderOverlay.style.display = "none";
      document.body.style.overflow = "auto";
      if (onComplete) onComplete();
    }, 3200);
  }

  // 7. Hilfsfunktion zum Rendern der Sterne
  function generateStarsHtml(rating) {
    let starsHtml = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        starsHtml += `<span class="rating-star-active">★</span> `;
      } else {
        starsHtml += `<span>☆</span> `;
      }
    }
    return starsHtml;
  }

  // 8. Ergebnisse ins DOM schreiben (9 Premium Sektionen)
  function renderPremiumResult(data) {
    const isFemale = data.isFemale;

    // Sektion 1: KOSMISCHES WESEN
    document.getElementById("res-tagline").textContent = "Deine kosmische Seelenreise mit deinem Hund";
    document.getElementById("res-dog-name").textContent = data.dogName.toUpperCase();
    document.getElementById("res-subtitle").textContent = `KOSMISCHE GEBURTSKARTE • ${data.genderTerm.toUpperCase()} • ${data.breed.toUpperCase()}`;
    document.getElementById("res-cosmic-title").textContent = `„${data.dogName} – ${cleanText(data.cosmicTitle)}“`;
    
    // Triple Badge
    const moonText = data.dogMoon ? `${data.dogMoon.name} 🌙` : "Unbekannt";
    const ascText = data.dogAsc ? `${data.dogAsc.name} 🪐` : "Krebs 🪐";
    document.getElementById("res-dog-sun").textContent = `${data.dogSun.name} ☀️`;
    document.getElementById("res-dog-moon").textContent = moonText;
    document.getElementById("res-dog-asc").textContent = ascText;

    // Badges & Beschreibung
    const elemBadge = document.getElementById("res-element-badge");
    elemBadge.textContent = `Element: ${data.dogSun.element}`;
    elemBadge.className = `meta-badge element-${data.dogSun.element.toLowerCase()}`;
    document.getElementById("res-planet-badge").textContent = `Herrscherplanet: ${data.dogSun.planet}`;
    document.getElementById("res-basic-energy").textContent = cleanText(data.basicEnergyText);

    // Sektion 2: PERSÖNLICHKEIT & CHARAKTER
    // Dynamische Überschriften basierend auf Rüde/Hündin
    document.getElementById("header-strengths").textContent = isFemale ? "Ihre grössten Stärken" : "Seine grössten Stärken";
    document.getElementById("header-challenges").textContent = isFemale ? "Ihre Herausforderungen" : "Seine Herausforderungen";
    document.getElementById("header-needs").textContent = isFemale ? "Was sie wirklich braucht" : "Was er wirklich braucht";

    document.getElementById("res-strengths").textContent = cleanText(data.strengths);
    document.getElementById("res-challenges").textContent = cleanText(data.challenges);
    document.getElementById("res-needs").textContent = cleanText(data.needs);

    // Sektion 3: GESUNDHEIT & VITALITÄT
    document.getElementById("res-energy-level").textContent = cleanText(data.energyLevel);
    document.getElementById("res-health-zone").textContent = cleanText(data.healthZone);
    document.getElementById("res-strengthen-energy").textContent = cleanText(data.strengthenEnergy);

    // Sektion 4: HERZENSBINDUNG & RUDELLEBEN
    document.getElementById("res-love-human").textContent = cleanText(data.loveHuman);
    document.getElementById("res-love-animals").textContent = cleanText(data.loveAnimals);
    document.getElementById("res-love-show").textContent = cleanText(data.loveShow);

    // Sektion 5: MENSCH-HUND SEELENVERBINDUNG
    document.getElementById("res-synastry-names").textContent = `${data.ownerName} & ${data.dogName}`;
    document.getElementById("res-conn-signature").textContent = cleanText(data.connectionSignature);
    document.getElementById("res-synastry-aspects").textContent = cleanText(data.synastryAspects);
    
    // Dynamische Überschriften für Sektion 5
    document.getElementById("header-dog-needs").textContent = `Was ${data.dogName} von dir braucht`;
    document.getElementById("header-owner-learns").textContent = `Was du von ${data.dogName} lernen kannst`;

    document.getElementById("res-dog-needs").textContent = cleanText(data.dogNeedsFromOwner);
    document.getElementById("res-owner-learns").textContent = cleanText(data.ownerLearnsFromDog);

    // Sektion 6: AKTUELLE KOSMISCHE PHASE
    document.getElementById("res-current-phase").textContent = cleanText(data.currentPhase);

    // Sektion 7: DEINE 3 KOSMISCHEN ALLTAGSTIPPS
    document.getElementById("res-tipp1").innerHTML = cleanText(data.tipp1);
    document.getElementById("res-tipp2").innerHTML = cleanText(data.tipp2);
    document.getElementById("res-tipp3").innerHTML = cleanText(data.tipp3);

    // Sektion 8: RAT DES KOSMOS
    document.getElementById("res-cosmic-advice").textContent = `„${cleanText(data.cosmicAdvice)}“`;
    document.getElementById("res-joint-ritual").textContent = cleanText(data.jointRitual);

    // Sektion 9: HUNDE-KOMPASS PREMIUM
    document.getElementById("k-stone").textContent = cleanText(data.kompass.stone);
    document.getElementById("k-element").textContent = cleanText(data.kompass.elementPlace);
    document.getElementById("k-color").textContent = cleanText(data.kompass.color);
    document.getElementById("k-word").textContent = cleanText(data.kompass.word);
    document.getElementById("k-essence").textContent = `„${cleanText(data.kompass.essence)}“`;
    document.getElementById("k-time").textContent = cleanText(data.kompass.bestTime);
    document.getElementById("k-planet").textContent = cleanText(data.kompass.planet);
    document.getElementById("k-environment").textContent = cleanText(data.kompass.environment);
  }


  // 10. Zurück zum Rechner (Neues Horoskop berechnen)
  if (newBtn) {
    newBtn.addEventListener("click", () => {
    form.reset();
    
    selectedGender = "m";
    genderMaleBtn.classList.add("active");
    genderFemaleBtn.classList.remove("active");
    
    selectedOwnerGender = "w";
    ownerGenderFemaleBtn.classList.add("active");
    ownerGenderMaleBtn.classList.remove("active");
    
    rescueCheckbox.checked = false;
    if (simulationCheckbox) {
      simulationCheckbox.checked = isDev;
    }
    modeDateBtn.classList.add("active");
    modeRescueBtn.classList.remove("active");
    birthdateGroup.style.display = "flex";
    birthtimeGroup.style.display = "flex";
    birthplaceGroup.style.display = "flex";
    
    dogBirthdate.setAttribute("required", "");
    rescueQuizContainer.style.display = "none";
    
    const quizContainers = rescueQuizContainer.querySelectorAll(".quiz-options");
    quizContainers.forEach(container => {
      const btns = container.querySelectorAll(".quiz-btn");
      btns.forEach((btn, idx) => {
        if (idx === 0) btn.classList.add("active");
        else btn.classList.remove("active");
      });
    });

    // Reset wizard back to Step 1
    currentStep = 1;
    updateWizardSteps();

    // Verberge das Vorschau-Banner bei Reset
    if (previewBanner) {
      previewBanner.style.display = "none";
    }


    if (newBtn) {
      newBtn.textContent = "✦ Weiteres Horoskop berechnen";
    }

    calculatorCard.scrollIntoView({ behavior: "smooth", block: "center" });

    setTimeout(() => {
      resultSection.style.display = "none";
    }, 600);
  });
}

  // 11. Geocoding Autocomplete für Geburtsorte initialisieren
  function initCityAutocomplete(inputId, suggestionsId) {
    const input = document.getElementById(inputId);
    const suggestionsContainer = document.getElementById(suggestionsId);
    if (!input || !suggestionsContainer) return;

    // Erstelle Lade-Spinner im Container
    const loader = document.createElement("div");
    loader.className = "autocomplete-loader";
    input.parentNode.appendChild(loader);

    let debounceTimeout = null;
    let shouldFetch = true;

    input.addEventListener("input", (e) => {
      const val = e.target.value.trim();
      clearTimeout(debounceTimeout);
      
      if (!shouldFetch) {
        shouldFetch = true;
        return;
      }

      if (val.length < 3) {
        suggestionsContainer.style.display = "none";
        suggestionsContainer.innerHTML = "";
        loader.style.display = "none";
        return;
      }

      loader.style.display = "block";

      debounceTimeout = setTimeout(async () => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(val)}&format=json&limit=5&addressdetails=1`,
            {
              headers: {
                "User-Agent": "Amastria-Hundehoroskop-Geocoder"
              }
            }
          );
          if (response.ok) {
            const data = await response.json();
            const uniqueNames = new Set();
            data.forEach((item) => {
              const address = item.address || {};
              const place = address.suburb || address.neighbourhood || address.village || address.town || address.city || address.municipality || "";
              const parent = (place !== address.city && place !== address.town && place !== address.village)
                ? (address.city || address.town || address.village || address.municipality || "")
                : "";
              const country = address.country || "";
              
              let displayName = "";
              if (place && parent && country && place.toLowerCase() !== parent.toLowerCase()) {
                displayName = `${place} (${parent}), ${country}`;
              } else if (place && country) {
                displayName = `${place}, ${country}`;
              } else {
                displayName = item.display_name.split(",").slice(0, 3).join(",").trim();
              }

              if (displayName) {
                uniqueNames.add(displayName);
              }
            });

            renderSuggestions(Array.from(uniqueNames));
          }
        } catch (err) {
          console.error("Error fetching city suggestions:", err);
        } finally {
          loader.style.display = "none";
        }
      }, 400);
    });

    function renderSuggestions(list) {
      suggestionsContainer.innerHTML = "";
      if (list.length === 0) {
        suggestionsContainer.style.display = "none";
        return;
      }

      list.forEach((item) => {
        const div = document.createElement("div");
        div.className = "autocomplete-suggestion-item";
        div.textContent = item;
        div.addEventListener("click", () => {
          shouldFetch = false; // Verhindert erneutes Feuern nach Auswahl
          input.value = item;
          suggestionsContainer.style.display = "none";
          suggestionsContainer.innerHTML = "";
        });
        suggestionsContainer.appendChild(div);
      });

      suggestionsContainer.style.display = "block";
    }

    document.addEventListener("click", (e) => {
      if (e.target !== input && !suggestionsContainer.contains(e.target)) {
        suggestionsContainer.style.display = "none";
      }
    });

    input.addEventListener("focus", () => {
      if (input.value.trim().length >= 3 && suggestionsContainer.children.length > 0) {
        suggestionsContainer.style.display = "block";
      }
    });
  }

  // Initialisiere Autocomplete für beide Geburtsorte
  initCityAutocomplete("dog-birthplace", "dog-birthplace-suggestions");
  initCityAutocomplete("owner-birthplace", "owner-birthplace-suggestions");

  // --- Contact Form Submission ---
  const contactForm = document.getElementById("contact-form");
  const contactSuccess = document.getElementById("contact-success");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector("button[type='submit']");
      const nameInput = document.getElementById("contact-name");
      const emailInput = document.getElementById("contact-email");
      const messageInput = document.getElementById("contact-message");
      
      if (!nameInput || !emailInput || !messageInput) return;
      
      // Disable inputs and show loading state
      submitBtn.disabled = true;
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = "Sende Nachricht... ✉";
      
      const inputs = contactForm.querySelectorAll("input, textarea");
      inputs.forEach(i => i.disabled = true);
      
      try {
        const backendUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
          ? 'http://localhost:3000'
          : 'https://app.amastria.com';

        const response = await fetch(`${backendUrl}/api/orakel/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim()
          })
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || "Fehler beim Senden der Nachricht.");
        }

        // Hide form and show success message
        contactForm.style.display = "none";
        if (contactSuccess) {
          contactSuccess.style.display = "block";
        }
      } catch (err) {
        console.error("Kontaktformular Fehler:", err);
        alert("Fehler beim Senden der Nachricht:\n" + err.message);
        
        // Re-enable form
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
        inputs.forEach(i => i.disabled = false);
      }
    });
  }

  // --- Cookie Consent Banner Logic ---
  const cookieBanner = document.getElementById("cookie-consent-banner");
  const acceptAllBtn = document.getElementById("cookie-accept-all");
  const acceptEssentialBtn = document.getElementById("cookie-accept-essential");

  if (cookieBanner) {
    let consent = null;
    try {
      consent = localStorage.getItem("cookie-consent");
    } catch (e) {
      console.warn("Could not read cookie-consent from localStorage:", e);
    }

    if (!consent) {
      setTimeout(() => {
        cookieBanner.style.display = "block";
        // Trigger reflow for CSS transition
        cookieBanner.offsetHeight;
        cookieBanner.classList.add("show");
      }, 1000);
    } else if (consent === "all") {
      enableTracking();
    }

    acceptAllBtn.addEventListener("click", () => {
      try {
        localStorage.setItem("cookie-consent", "all");
      } catch (e) {
        console.warn("Could not save cookie-consent to localStorage:", e);
      }
      cookieBanner.classList.remove("show");
      setTimeout(() => {
        cookieBanner.style.display = "none";
      }, 400);
      enableTracking();
    });

    acceptEssentialBtn.addEventListener("click", () => {
      try {
        localStorage.setItem("cookie-consent", "essential");
      } catch (e) {
        console.warn("Could not save cookie-consent to localStorage:", e);
      }
      cookieBanner.classList.remove("show");
      setTimeout(() => {
        cookieBanner.style.display = "none";
      }, 400);
    });
  }

  // --- Mobile Navigation Toggle ---
  const mobileToggleBtn = document.getElementById("mobile-nav-toggle");
  const headerNav = document.getElementById("header-nav");
  const navOverlay = document.getElementById("nav-overlay");

  if (mobileToggleBtn && headerNav) {
    const toggleMenu = (open) => {
      const show = typeof open === 'boolean' ? open : !headerNav.classList.contains("mobile-open");
      
      mobileToggleBtn.classList.toggle("open", show);
      headerNav.classList.toggle("mobile-open", show);
      if (navOverlay) {
        navOverlay.classList.toggle("active", show);
      }
    };

    mobileToggleBtn.addEventListener("click", () => toggleMenu());
    if (navOverlay) {
      navOverlay.addEventListener("click", () => toggleMenu(false));
    }

    // Close menu when any nav link is clicked
    const navLinks = headerNav.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
      link.addEventListener("click", () => toggleMenu(false));
    });
  }

  function enableTracking() {
    console.log("Tracking aktiviert (Google Analytics etc.)");
    if (!window.gtagInitialized) {
      window.gtagInitialized = true;
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-XKCTF0R6R8";
      document.head.appendChild(script);
      
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XKCTF0R6R8', { 'anonymize_ip': true });
    }
  }

});

