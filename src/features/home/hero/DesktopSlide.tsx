import { Box, Button, styled, Typography } from "@mui/material";
import type { THeroContent } from "../../../utils/Types";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";

const DesktopSlideWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
});

const InfoSlide = styled(Box)({
  flex: "1.22",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  justifyContent: "center",
  padding: "0px 5%",
});

const ImageSlide = styled(Box)({
  flex: "2",
  height: "100%",
});

const Tag = styled(Typography)(({ theme }) => ({
  padding: "15px 0px",
  borderBottom: `1px solid ${theme.palette.icons?.main}`,
  color: theme.palette.icons?.main,
  width: "fit-content",
  fontSize: "0.9rem",
  fontFamily: "Figtree",
  textTransform: "uppercase",
  fontWeight: "400",
}));

const ContentContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "0px",
});

const Title = styled(Typography)({
  fontSize: "2rem",
  textTransform: "capitalize",
  maxWidth: "95%",
  overflow: "hidden",
  textWrap: "wrap",
  fontFamily: "VAGRundschriftD",
});

const Subtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.icons?.main,
  textTransform: "capitalize",
  maxWidth: "85%",
  overflow: "hidden",
  textWrap: "wrap",
  letterSpacing: "1.1px",
  fontFamily: "Figtree",
  fontSize: "1.5rem",
}));

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

export default function DesktopSlide({
  tag,
  title,
  subtitle,
  image,
  more,
  link,
}: THeroContent) {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <DesktopSlideWrapper
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === "") {
          navigate("/niseko-accomodation");
        }
      }}
      role="region"
      aria-label={title}
    >
      <InfoSlide>
        <Tag>{tag}</Tag>
        <ContentContainer>
          <Title color="primary">{title}</Title>
          <Subtitle variant="h5">{subtitle}</Subtitle>
        </ContentContainer>
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
          tabIndex={-1}
        >
          {more}
        </More>
      </InfoSlide>
      <ImageSlide>
        <img
          src={image}
          alt="Slider Image"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          decoding="async"
          loading="lazy"
        />
      </ImageSlide>
    </DesktopSlideWrapper>
  );
}
