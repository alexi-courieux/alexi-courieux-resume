import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import English from "../public/locales/en/translation.json";
import French from "../public/locales/fr/translation.json";


const resources = {
  en: {
    translation: English,
  },
  fr: {
    translation: French,
  },
};

i18next.use(initReactI18next).init({
  resources,
  supportedLngs: Object.keys(resources),
  fallbackLng: "en",
  keySeparator: '.',
  backend: {
    loadPath: '/locales/{{lng}}/translation.json',
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;