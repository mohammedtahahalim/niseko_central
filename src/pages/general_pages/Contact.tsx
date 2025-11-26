import { Box, Container, styled } from "@mui/material";
import LinkTitle from "../../components/LinkTitle";
import Title from "../../components/Title";
import { useState } from "react";

const ContactContainer = styled(Container)(({ theme }) => ({
  width: "100%",
  height: "100%",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  gap: "9px",
  padding: "1rem",
  backgroundColor: theme.palette.mainbody?.main,
  [theme.breakpoints.down("md")]: {
    padding: "5px",
    gap: "15px",
  },
}));

const ContentContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: "100%",
  height: "100%",
});

const MainImageWrapper = styled(Box)({
  width: "100%",
  maxWidth: "900px",
  aspectRatio: "4.5/3",
  margin: "0 auto",
  borderRadius: "5px",
  overflow: "hidden",
});

export default function Contact() {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  return (
    <ContactContainer maxWidth="xl">
      <LinkTitle />
      <ContentContainer maxWidth="nav_break">
        <Title page="contact" />
        <MainImageWrapper>
          <img
            src="https://d1z517741srsht.cloudfront.net/general/_1024xAUTO_crop_center-center_none/10690/NC-front-desk-with-Meiko-and-Yu.webp"
            alt="Contact Image Alt"
            onLoad={() => setIsImageLoaded(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              opacity: isImageLoaded ? 1 : 0.5,
              transition: "all 0.25s ease-in-out",
            }}
          />
        </MainImageWrapper>
      </ContentContainer>
    </ContactContainer>
  );
}
