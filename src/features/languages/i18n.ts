import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    backend: { loadPath: "/locales/{{lng}}.json" },
    react: { useSuspense: false },
  });

i18n.on("languageChanged", (lng) => {
  const short = lng.split("-")[0];
  if (lng !== short) {
    i18n.changeLanguage(lng.split("-")[0]);
  }
});

export default i18n;
