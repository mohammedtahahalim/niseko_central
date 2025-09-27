import { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";

interface UseLanguageProps {
  cooldown?: number;
}

export type TLanguage = "en" | "ja" | "ar" | "fr";

interface UseLanguageReturn {
  changeLanguage: (newLang: TLanguage) => void;
}

const possibleLang = ["en", "ja", "ar", "fr"];

export default function useLanguage({
  cooldown = 500,
}: UseLanguageProps): UseLanguageReturn {
  const { i18n } = useTranslation();
  const cooldownRef = useRef<boolean>(false);
  const changeLanguage = useCallback(
    (newLang: TLanguage) => {
      if (!possibleLang.includes(newLang)) return;
      if (cooldownRef.current) return;
      cooldownRef.current = true;
      i18n.changeLanguage(newLang);
      setTimeout(() => {
        cooldownRef.current = false;
      }, cooldown);
    },
    [i18n]
  );

  return { changeLanguage };
}
