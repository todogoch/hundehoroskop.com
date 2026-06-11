/**
 * Astrologie-API & Gemini-API Service für Hundehoroskop.com
 * Leitet alle Anfragen an das sichere Backend (Astro App) weiter,
 * um die API-Schlüssel zu schützen.
 */

export const API_CONFIG = {
  useApi: true // Aktiviert! Abfragen laufen jetzt live über die API-Proxies im Backend
};

// Hilfsfunktion zur Ermittlung der Backend-URL
const getBackendUrl = () => {
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : 'https://app.amastria.com';
};

/**
 * Fragt die Planetenkonstellationen über den sicheren Backend-Proxy ab.
 * Fallback auf Lokalberechnung im Frontend bei Verbindungsfehlern.
 */
export async function fetchNatalPlacements(birthdateStr, timeStr, cityStr) {
  if (!API_CONFIG.useApi) {
    return null;
  }

  try {
    const backendUrl = getBackendUrl();
    const response = await fetch(`${backendUrl}/api/orakel/hundehoroskop/placements`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        birthdateStr,
        timeStr,
        cityStr
      })
    });

    if (!response.ok) {
      console.warn(`Backend Placements Proxy lieferte Fehlercode: ${response.status}. Nutze lokalen mathematischen Fallback.`);
      return null;
    }

    return await response.json();

  } catch (error) {
    console.error("Fehler bei der Abfrage des Backend Placements Proxies:", error);
    return null; // Fallback auslösen
  }
}

/**
 * Generiert das Hundehoroskop über den sicheren Backend Gemini-Proxy.
 */
export async function generateGeminiHoroscope(inputData, computedPlacements) {
  try {
    const backendUrl = getBackendUrl();
    const response = await fetch(`${backendUrl}/api/orakel/hundehoroskop/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputData,
        computedPlacements
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini-Proxy lieferte Status: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    console.error("Fehler bei der Gemini-Generierung über das Backend:", error);
    throw error;
  }
}
