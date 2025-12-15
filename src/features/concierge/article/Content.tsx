import { Box, Skeleton, styled } from "@mui/material";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { useTranslation } from "react-i18next";
import type { idArticle } from "../conciergeSlice";
import type { TLanguage } from "../../languages/changeLanguage";

const ContentContainer = styled(Box)({
  width: "100%",
  maxWidth: "950px",
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  margin: "0 auto",
});

const UnsafeContent = styled(Box)({
  width: "100%",
});

const ContentSkeleton = styled(Skeleton)({
  width: "100%",
  height: "450px",
});

export default function Content() {
  const contentRef = useRef<HTMLElement | null>(null);
  const shadowRef = useRef<ShadowRoot | null>(null);
  const { i18n } = useTranslation();
  const { loading, articles } = useSelector(
    (state: RootState) => state.concierge
  );

  const currContent =
    articles && (articles as idArticle)[i18n.language as TLanguage];
  const content = currContent && currContent.content;

  useEffect(() => {
    try {
      if (!content || !contentRef.current) return;
      if (!shadowRef.current) {
        shadowRef.current = contentRef.current.attachShadow({
          mode: "open",
        });
      }
      const dangerousContent = JSON.parse(content)
        .replaceAll("gray-800", "gray-500")
        .replaceAll("gray-700", "gray-500")
        .replaceAll("bg-gray-100", "")
        .replace(/<svg(.|\n)*\/svg>/g, "");
      shadowRef.current.innerHTML = `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@%5E2/dist/tailwind.min.css">
    ${dangerousContent}
    `;
    } catch (err) {
      console.log(err);
    }
  }, [articles, i18n.language]);

  return (
    <ContentContainer>
      {loading ? (
        <ContentSkeleton variant="rectangular" />
      ) : (
        <UnsafeContent ref={contentRef} />
      )}
    </ContentContainer>
  );
}
