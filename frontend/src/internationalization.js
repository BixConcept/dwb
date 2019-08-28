import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import de from "./internatiolization/de.json";
import en from "./internatiolization/en.json";

i18n.use(LanguageDetector).init({
  resources: {
    en: {
      translations: en
    },
    de: {
      translations: de
    }
  },

  fallbackLng: "en",
  debug: true,

  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ","
  },

  react: {
    wait: true
  }
});

export default i18n;
