import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
  resources: {
    en: {
      translations: {
        "home.showcase.title": "digital white board",
        "home.showcase.subtitle":
          "your collaborative assignment management tool",
        "home.showcase.btn": "find out more",
        "home.features.title": "<0>features</0> we offer",

        "home.features.0.title": "saving time",
        "home.features.0.text":
          "due to the fact that assignments are shared and only one person has to add an assignment everyone else profits by saving time on more important things ;)",

        "home.features.1.title": "saving money",
        "home.features.1.text":
          "our service is entirely free. no one has to pay anything. lol",

        "home.features.2.title": "data visualization",
        "home.features.2.text":
          "the only real reason we developed this service is cool graphs. it is really important for us. there are cOoL gRaPhS.",

        // HOME: team
        "home.team.title": "<0>about</0> us",
        "home.team.text":
          "we are a small team of german students creating this tool as a cs project in 9th grade.",

        "home.team.members.0": "3nt3 - duck",
        "home.team.members.1": "goat - määh",
        "home.team.members.2": "goat* - määääh"
      }
    },
    de: {
      translations: {
        "home.showcase.title": "digitales weißes brett",
        "home.showcase.subtitle": "das kollaborative hausaufgabenhäft",
        "home.showcase.btn": "mehr anzeigen",

        
        // HOME: features
        "home.features.title": "<0>funktionen</0>",
        "home.features.0.title": "zeit sparen",
        "home.features.0.text":
          'da aufgaben innerhalb des teams geteilt werder muss nur eine person den "aufwand" betreiben, eine aufgabe hinzuzufügen. jede andere person profitiert durch zeit für wichtigere dinge ;)',
        "home.features.1.title": "geld sparen",
        "home.features.1.text":
          "im gegensatz zu anderen anbietern verzichten wir komplett auf profit.",
        "home.features.2.title": "daten visualisieren",
        "home.features.2.text":
          "der einzige wirkliche grund, aus dem wir dieses tool entwickelten ist, aufgaben in form von diagrammen zu visualisieren.",

        
        // HOME: team
        "home.team.title": "<0>über</0> uns",
        "home.team.text":
          "wir sind ein aus menschen bestehendes team, dass dieses tool als informatikprojekt entwickelt.",
        "home.team.members.0": "3nt3 - duck",
        "home.team.members.1": "goat - määh",
        "home.team.members.2": "goat* - määääh"
      }
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
