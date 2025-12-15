import { Box, styled, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { sanitizeURL } from "../../../utils/Constants";
import { useState } from "react";
import More from "../../../components/More";

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

export default function NewsCard({
  id,
  image,
  title,
  blurry_image,
}: NewsCardProps) {
  const navigate = useNavigate();
  const [onHover, setOnHover] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      navigate(`/niseko-accommodation-deals/${id}/${sanitizeURL(title)}`);
    }
  };

  return (
    <NewsCardWrapper
      tabIndex={0}
      onClick={() =>
        navigate(`/niseko-accommodation-deals/${id}/${sanitizeURL(title)}`)
      }
      onKeyDown={onKeyDown}
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
          url={`/niseko-accommodation-deals/${id}/${sanitizeURL(title)}`}
          content_key={"home.news_section.more"}
        />
      </InformationBox>
    </NewsCardWrapper>
  );
}
