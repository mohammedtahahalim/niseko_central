import { Box, Skeleton, styled } from "@mui/material";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import type { idArticle } from "../conciergeSlice";
import { useTranslation } from "react-i18next";
import type { TLanguage } from "../../languages/changeLanguage";

const PriceContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "950px",
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  margin: "0 auto",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "5px",
}));

const PricesSkeleton = styled(Skeleton)({
  width: "100%",
  height: "100px",
});

const UnsafeContent = styled(Box)({
  width: "100%",
});

export default function Price() {
  const priceRef = useRef<HTMLElement | null>(null);
  const shadowRef = useRef<ShadowRoot | null>(null);
  const { i18n } = useTranslation();
  const { loading, articles } = useSelector(
    (state: RootState) => state.concierge,
  );

  const currContent =
    articles && (articles as idArticle)[i18n.language as TLanguage];
  const prices = currContent && currContent.prices;

  useEffect(() => {
    if (!prices || !priceRef.current) return;
    const dangrousContent = JSON.parse(prices)
      .replaceAll("gray-800", "gray-500")
      .replaceAll("gray-700", "gray-500")
      .replaceAll("bg-gray-100", "")
      .replace(/<svg(.|\n)*\/svg>/g, "");
    if (!shadowRef.current) {
      shadowRef.current = priceRef.current.attachShadow({ mode: "open" });
    }
    shadowRef.current.innerHTML = `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@%5E2/dist/tailwind.min.css">
    ${dangrousContent}
    `;
  }, [articles, i18n.language, prices]);

  return (
    <PriceContainer>
      {loading ? (
        <PricesSkeleton variant="rectangular" />
      ) : (
        <UnsafeContent
          ref={priceRef}
          tabIndex={0}
          aria-description="This is an external embedded contant, that list various prices for this location"
        />
      )}
    </PriceContainer>
  );
}
