import { Box, styled } from "@mui/material";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const DefaultWrapper = styled(Box)({
  maxWidth: "100%",
  height: "100%",
});

export default function Default() {
  const defaultRef = useRef<HTMLElement | null>(null);
  const { t, i18n } = useTranslation();
  const content = t("long-stay.default") as string;
  const shadowRef = useRef<ShadowRoot | null>(null);

  useEffect(() => {
    if (!defaultRef.current || !content) return;
    if (!shadowRef.current) {
      shadowRef.current = defaultRef.current.attachShadow({ mode: "open" });
    }
    shadowRef.current.innerHTML = `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@%5E2/dist/tailwind.min.css">
    ${content
      .replaceAll("gray-800", "gray-400")
      .replaceAll("gray-700", "gray-400")
      .replaceAll("bg-gray-100", "")
      .replaceAll("ul", 'ul style="list-style-type: square !important"')
      .replace("lg:border-r", "")}
    `;
  }, [i18n.language]);

  return <DefaultWrapper ref={defaultRef}></DefaultWrapper>;
}
