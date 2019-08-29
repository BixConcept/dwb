import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import de from "./de.json";
import en from "./en.json";

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

  ns: ["translations"],
  defaultNS: "translations",

  keySeparator: true,

  interpolation: {
    formatSeparator: ","
  },

  react: {
    wait: true
  }
});

export default i18n;
