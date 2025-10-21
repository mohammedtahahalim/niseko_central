import { Box, styled, Typography, Button } from "@mui/material";
import type { THeroContent } from "../../../utils/Types";
import { useNavigate } from "react-router-dom";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import { useTranslation } from "react-i18next";

interface MobileSlideBg {
  src: string;
}

const MobileSlideWrapper = styled(Box)<MobileSlideBg>(({ src }) => ({
  width: "100%",
  height: "100%",
  position: "relative",
  backgroundImage: `url(${src})`,
  backgroundPosition: "center center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const ShadeLayer = styled(Box)({
  width: "100%",
  height: "100%",
  backgroundColor: "black",
  position: "absolute",
  top: "0",
  left: "0",
  border: "2px solid black",
  opacity: "0.3",
});

const ContentLayer = styled(Box)({
  zIndex: 1111,
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  alignItems: "center",
  textAlign: "center",
});

const Title = styled(Typography)({
  fontSize: "2rem",
  textTransform: "capitalize",
  maxWidth: "95%",
  overflow: "hidden",
  textWrap: "wrap",
  fontFamily: "VAGRundschriftD",
  color: "whitesmoke",
});

const Subtitle = styled(Typography)({
  textTransform: "capitalize",
  maxWidth: "85%",
  overflow: "hidden",
  textWrap: "wrap",
  letterSpacing: "1.1px",
  fontFamily: "Figtree",
  fontSize: "1.5rem",
  color: "whitesmoke",
});

const More = styled(Button)({
  width: "fit-content",
  borderRadius: "50px",
  textTransform: "capitalize",
  fontSize: "1rem",
  fontFamily: "VAGRundschriftD",
  padding: "8px 18px",
  letterSpacing: "1.2px",
  gap: "8px",
});

export default function MobileSlide({
  title,
  subtitle,
  image,
  link,
  more,
}: THeroContent) {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <MobileSlideWrapper src={image}>
      <ShadeLayer></ShadeLayer>
      <ContentLayer>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
        <More
          variant="contained"
          color="info"
          endIcon={
            isArabic ? (
              <WestIcon color="inherit" sx={{ maxHeight: "16px" }} />
            ) : (
              <EastIcon color="inherit" sx={{ maxHeight: "16px" }} />
            )
          }
          onClick={() => navigate(link)}
        >
          {more}
        </More>
      </ContentLayer>
    </MobileSlideWrapper>
  );
}
