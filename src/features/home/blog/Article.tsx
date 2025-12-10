import { Box, styled, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { format_date, sanitizeURL } from "../../../utils/Constants";
import { useState } from "react";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { useTranslation } from "react-i18next";
import type { TLanguage } from "../../languages/changeLanguage";

interface ArticleProps {
  id: number;
  title: string;
  image: string;
  date: string;
}

const ArticleWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  aspectRatio: "1",
  maxHeight: "475px",
  position: "relative",
  overflow: "hidden",
  borderRadius: "10px",
  cursor: "pointer",
});

const ImageWrapper = styled(Box)({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  zIndex: 1,
});

const ShadeOverlay = styled(Box)({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  overflow: "hidden",
  zIndex: 111,
  backgroundColor: "rgba(0, 0, 0, 0.25)",
});

const BlogContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isArabic",
})<{ isArabic: boolean }>(({ isArabic }) => ({
  position: "absolute",
  bottom: "0",
  ...(isArabic ? { right: "0px" } : { left: "0px" }),
  width: "100%",
  height: "fit-content",
  overflow: "hidden",
  zIndex: 1111,
  padding: "15px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}));

const Title = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isArabic",
})<{ isArabic: boolean }>(({ isArabic }) => ({
  fontFamily: "VAGRundschriftD",
  fontSize: "1.15rem",
  fontWeight: "bold",
  letterSpacing: "1.1px",
  flexWrap: "wrap",
  color: "whitesmoke",
  ...(isArabic ? { paddingLeft: "75px" } : { paddingRight: "75px" }),
  maxHeight: "60px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}));

const DateTypography = styled(Typography)({
  fontFamily: "Source Code Pro",
  fontStyle: "italic",
  display: "flex",
  alignItems: "center",
  gap: "5px",
  color: "whitesmoke",
  fontSize: "0.8rem",
});

export default function Article({ title, image, date, id }: ArticleProps) {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const date_format = new Date(date);

  return (
    <ArticleWrapper
      onClick={() => navigate(`/blog/${id}/${sanitizeURL(title)}`)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      tabIndex={0}
      aria-label={title}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === "") {
          navigate(`${sanitizeURL(title)}`);
        }
      }}
    >
      <ImageWrapper>
        <img
          src={image}
          alt="Blog Image"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            scale: isHovering ? 1.1 : 1,
            transition: "all 0.4s ease-in-out",
          }}
        />
      </ImageWrapper>
      <ShadeOverlay />
      <BlogContent isArabic={i18n.language === "ar"}>
        <Title variant="h6" isArabic={i18n.language === "ar"} tabIndex={0}>
          {title}
        </Title>
        <DateTypography tabIndex={0}>
          <CalendarMonthOutlinedIcon fontSize="small" />
          {format_date(date_format, i18n.language as TLanguage)}
        </DateTypography>
      </BlogContent>
    </ArticleWrapper>
  );
}
