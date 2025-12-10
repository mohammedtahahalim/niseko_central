import { Box, Skeleton, styled } from "@mui/material";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const DangerousHTMLWrapper = styled(Box)({
  width: "100%",
  maxWidth: "900px",
  margin: "0 auto",
  minHeight: "450px",
  overflow: "hidden",
  marginBottom: "50px",
});

const ContentWrapper = styled(Box)({
  width: "100%",
  height: "100%",
});

const SkeletonContainer = styled(Box)({
  width: "100%",
  minWidth: "450px",
  height: "100%",
  minHeight: "450px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const SkeletonText = styled(Skeleton)({
  width: "100%",
  height: "75px",
});

const SkeletonRounded = styled(Skeleton)({
  width: "100%",
  flex: "1",
});

export default function DangerousHTML() {
  const { i18n } = useTranslation();
  const { pathname } = useLocation();
  const shadowRef = useRef<HTMLElement | null>(null);
  const { loading, promotion } = useSelector(
    (state: RootState) => state.promotion
  );
  const content_data = promotion[i18n.language as keyof typeof promotion];
  const content =
    typeof content_data === "object" &&
    content_data &&
    "content" in content_data
      ? content_data["content"]
      : "";

  useEffect(() => {
    if (shadowRef.current && content) {
      const shadow =
        shadowRef.current.shadowRoot ||
        shadowRef.current.attachShadow({ mode: "open" });
      let dangerous_content = content ? JSON.parse(content) : "";
      dangerous_content = dangerous_content
        .replaceAll("gray-800", "gray-500")
        .replaceAll("gray-700", "gray-500")
        .replace(/<svg(.|\n)*\/svg>/g, "");
      shadow.innerHTML = `
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@%5E2/dist/tailwind.min.css">
        ${dangerous_content}
      `;
    }
  }, [content]);

  useEffect(() => {
    if (shadowRef.current) {
      const shadow =
        shadowRef.current.shadowRoot ||
        shadowRef.current.attachShadow({ mode: "open" });
      shadow.innerHTML = ``;
    }
  }, [pathname]);

  return (
    <DangerousHTMLWrapper>
      {loading ? (
        <SkeletonContainer>
          <SkeletonText variant="text" />
          <SkeletonText variant="text" />
          <SkeletonRounded variant="rectangular" />
          <SkeletonRounded variant="rectangular" />
        </SkeletonContainer>
      ) : (
        <ContentWrapper ref={shadowRef} />
      )}
    </DangerousHTMLWrapper>
  );
}
