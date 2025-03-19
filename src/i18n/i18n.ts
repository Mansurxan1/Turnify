// src/i18n/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import uz from "./locales/uz.json";
import ru from "./locales/ru.json";
import en from "./locales/en.json";

const resources = {
  uz: { translation: uz },
  ru: { translation: ru },
  en: { translation: en },
};

const savedLanguage = localStorage.getItem("language") || "en";

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage, 
    fallbackLng: "en", 
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;