import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation JSON files
import translationAL from "./locales/albanian/translation.json";
import translationEN from "./locales/english/translation.json";
import translationIT from "./locales/italian/translation.json";
import translationMK from "./locales/macedonian/translation.json";
import translationEL from "./locales/greek/translation.json";

export const resources = {
  en: { translation: translationEN },
  al: { translation: translationAL },
  el: { translation: translationEL },
  it: { translation: translationIT },
  mk: { translation: translationMK },
};

i18n
  .use(LanguageDetector) // auto-detects browser language
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    detection: {
      order: ["localStorage"], // ONLY check localStorage
      caches: ["localStorage"], // persist language in localStorage
    },
    resources,
    fallbackLng: "al", // fallback language
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
