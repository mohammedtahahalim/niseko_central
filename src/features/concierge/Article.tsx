import { styled, Box, Typography } from "@mui/material";
import { useState } from "react";
import type { fullArticle } from "./conciergeSlice";
import More from "../../components/More";
import { useTranslation } from "react-i18next";
import type { TLanguage } from "../languages/changeLanguage";
import { useNavigate } from "react-router-dom";
import { sanitizeURL } from "../../utils/Constants";

const ArticleWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  position: "relative",
  borderRadius: "8px",
  overflow: "hidden",
});

const Image = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "all 0.5s ease-in-out",
  zIndex: 1,
});

const ShadeOverlay = styled(Box)({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  background: "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9))",
  zIndex: 10,
  cursor: "pointer",
});

const ContentWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isArabic",
})<{ isArabic: boolean }>(({ isArabic }) => ({
  position: "absolute",
  ...(isArabic ? { right: "0" } : { left: 0 }),
  bottom: "0",
  width: "99.5%",
  padding: "5px 12px",
  zIndex: 100,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "5px",
  minHeight: "100px",
}));

const ArticleTitle = styled(Typography)({
  fontFamily: "Figtree",
  fontSize: "1.2rem",
  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  color: "whitesmoke",
});

export default function Article(props: fullArticle["articles"][number]) {
  const { i18n } = useTranslation();
  const { id, image, blur_image } = props;
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const isArabic = i18n.language === "ar";
  const navigate = useNavigate();

  const handleKeyboardClick = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      navigate(`/concierge/${id}/${sanitizeURL(props["en"].title)}`);
    }
  };

  return (
    <ArticleWrapper>
      <Image
        src={isLoaded ? image : blur_image}
        sx={{ opacity: isLoaded ? 1 : 0.5, scale: isHover ? 1.1 : 1 }}
        onLoad={() => setIsLoaded(true)}
        alt={
          "title" in props[i18n.language as TLanguage]
            ? props[i18n.language as TLanguage].title
            : ""
        }
      />
      <ShadeOverlay
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={() =>
          navigate(`/concierge/${id}/${sanitizeURL(props["en"].title)}`)
        }
        onKeyDown={handleKeyboardClick}
        tabIndex={0}
        role="article"
        aria-labelledby={`${id}`}
      />
      <ContentWrapper isArabic={isArabic}>
        <ArticleTitle id={`${id}`}>
          {props[i18n.language as TLanguage].title}
        </ArticleTitle>
        <More
          url={`/concierge/${id}/${sanitizeURL(props["en"].title)}`}
          content_key="home.news_section.more"
        />
      </ContentWrapper>
    </ArticleWrapper>
  );
}
