import { Box, Button, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { sanitizeURL } from "../../../utils/Constants";
import { useState } from "react";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";

interface NewsCardProps {
  id: number;
  image: string;
  title: string;
  blurry_image: string;
}

const NewsCardWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  borderRadius: "12px",
  overflow: "hidden",
  position: "relative",
  display: "flex",
  alignItems: "flex-end",
});

const ImageContainer = styled(Box)({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  zIndex: 1,
  overflow: "hidden",
});

const ShadeLayer = styled(Box)({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  zIndex: 111,
  cursor: "pointer",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
});

const InformationBox = styled(Box)({
  zIndex: 999,
  width: "75%",
  padding: "15px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const Title = styled(Typography)({
  fontSize: "1.3rem",
  textWrap: "wrap",
  fontFamily: "VAGRundschriftD",
  letterSpacing: "1px",
  color: "whitesmoke",
});

const More = styled(Button)({
  width: "fit-content",
  borderRadius: "50px",
  padding: "5px 20px",
  textTransform: "capitalize",
  fontFamily: "Inter",
  fontSize: "0.85rem",
  fontStyle: "italic",
  gap: "8px",
});

export default function NewsCard({
  id,
  image,
  title,
  blurry_image,
}: NewsCardProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [onHover, setOnHover] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const isArabic = i18n.language === "ar";

  return (
    <NewsCardWrapper
      tabIndex={0}
      onClick={() =>
        navigate(`/niseko-accommodation-deals/${id}/${sanitizeURL(title)}`)
      }
    >
      <ImageContainer>
        <img
          src={isLoaded ? image : blurry_image}
          alt="News Article Image"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            opacity: isLoaded ? 1 : 0.5,
            scale: onHover ? "1.1" : "1",
            transition: "all 0.35s ease-in-out",
          }}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      </ImageContainer>
      <ShadeLayer
        onMouseOver={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
      ></ShadeLayer>
      <InformationBox>
        <Title>{title || "Placeholder"}</Title>
        <More
          variant="contained"
          endIcon={isArabic ? <WestIcon /> : <EastIcon />}
          onClick={() =>
            navigate(`/niseko-accommodation-deals/${id}/${sanitizeURL(title)}`)
          }
        >
          {t("home.news_section.more")}
        </More>
      </InformationBox>
    </NewsCardWrapper>
  );
}
