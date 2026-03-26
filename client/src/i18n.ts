import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./messages/en.json";
import ru from "./messages/ru.json";
import am from "./messages/am.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    am: { translation: am },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
