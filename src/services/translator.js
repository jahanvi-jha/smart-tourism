// src/services/translator.js

const key = import.meta.env.VITE_AZURE_TRANSLATOR_KEY;
const endpoint = "https://api.cognitive.microsofttranslator.com/translate";
const region = import.meta.env.VITE_AZURE_TRANSLATOR_REGION;

/**
 * Translate text to the given language.
 * @param {string} text - The text to translate
 * @param {string} toLanguage - Target language code (e.g., "hi", "fr")
 * @returns {Promise<string>} Translated text
 */
export async function translateText(text, toLanguage = "en") {
  try {
    const response = await fetch(
      `${endpoint}?api-version=3.0&to=${toLanguage}`,
      {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": key,
          "Ocp-Apim-Subscription-Region": region,
          "Content-Type": "application/json"
        },
        body: JSON.stringify([{ Text: text }])
      }
    );

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }

    const data = await response.json();
    return data[0]?.translations[0]?.text || text;
  } catch (err) {
    console.error("Translator error:", err);
    return text; // fallback to original text
  }
}
