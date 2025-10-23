import { Box, styled, Typography } from "@mui/material";
import {
  accessibility_language_map,
  possibleLanguages,
} from "../../utils/Constants";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import type { TLanguage } from "./changeLanguage";
import TranslateIcon from "@mui/icons-material/Translate";
import { UIContext } from "../../context/MiniContext";

interface ActiveLanguageProp {
  isActive: boolean;
}

const LanguagesWrapper = styled(Box)({
  height: "100%",
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

const LanguageWrapper = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<ActiveLanguageProp>(({ isActive, theme }) => ({
  color: isActive ? theme.palette.primary.main : "",
  fontFamily: "Segoe UI",
  fontWeight: "600",
  textTransform: "uppercase",
  fontSize: "0.8rem",
  cursor: "pointer",
}));

export default function Languages() {
  const { i18n } = useTranslation();
  const { changeLanguage } = useContext(UIContext);

  const handleKeyDown = (e: React.KeyboardEvent, lang: TLanguage) => {
    if (e.key === "Enter" || e.key === "") {
      e.preventDefault();
      changeLanguage(lang);
    }
  };

  return (
    <LanguagesWrapper>
      <TranslateIcon sx={{ fontSize: "0.9rem" }} />
      {possibleLanguages.map((language) => {
        return (
          <LanguageWrapper
            isActive={language === i18n.language}
            key={language}
            onClick={() => changeLanguage(language as TLanguage)}
            role="button"
            lang={language}
            aria-label={accessibility_language_map[language as TLanguage]}
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, language as TLanguage)}
          >
            {language}
          </LanguageWrapper>
        );
      })}
    </LanguagesWrapper>
  );
}
