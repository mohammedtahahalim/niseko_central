import { Box, styled, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { sanitizeURL } from "../../../utils/Constants";
import { useState } from "react";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

interface ArticleProps {
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

const BlogContent = styled(Box)({
  position: "absolute",
  bottom: "0",
  left: "0",
  width: "100%",
  height: "fit-content",
  overflow: "hidden",
  zIndex: 1111,
  padding: "15px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const Title = styled(Typography)({
  fontFamily: "Source Code Pro",
  fontSize: "1.25rem",
  fontWeight: "bold",
  letterSpacing: "1.1px",
  flexWrap: "wrap",
  color: "whitesmoke",
  paddingRight: "75px",
});

const Date = styled(Typography)({
  fontFamily: "Source Code Pro",
  fontStyle: "italic",
  display: "flex",
  alignItems: "center",
  gap: "5px",
  color: "whitesmoke",
  fontSize: "0.8rem",
});

export default function Article({ title, image, date }: ArticleProps) {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <ArticleWrapper
      onClick={() => navigate(`${sanitizeURL(title)}`)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
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
      <BlogContent>
        <Title variant="h6">{title}</Title>
        <Date>
          <CalendarMonthOutlinedIcon fontSize="small" />
          {date}
        </Date>
      </BlogContent>
    </ArticleWrapper>
  );
}
