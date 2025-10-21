import { Box, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper/types";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import useSlideCount from "./useSlideCount";
import Card from "./Card";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";

const SuggestionsWrapper = styled(Box)({
  width: "100%",
  padding: "25px 15px",
  minHeight: "250px",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
});

const TitleContainer = styled(Box)({
  width: "100%",
  display: "flex",
  gap: "5px",
  alignItems: "center",
  padding: "10px",
  position: "relative",
});

const Title = styled(Typography)(({ theme }) => ({
  height: "100%",
  fontFamily: "VAGRundschriftD",
  fontSize: "1.5rem",
  letterSpacing: "1px",
  fontWeight: "lighter",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
  },
}));

const NavControl = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isArabic",
})<{ isArabic: boolean }>(({ theme, isArabic }) => ({
  position: "absolute",
  ...(isArabic ? { left: "0px" } : { right: "0px" }),
  top: "0px",
  height: "100%",
  padding: "10px",
  display: "flex",
  flexDirection: isArabic ? "row-reverse" : "row",
  justifyContent: "space-between",
  gap: "10px",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    gap: "5px",
  },
}));

const ControlButton = styled(Box)(({ theme }) => ({
  height: "90%",
  aspectRatio: "1",
  border: `1px solid ${theme.palette.icons?.main}`,
  borderRadius: "50px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
}));

const SuggestionSlider = styled(Swiper)(({ theme }) => ({
  width: "95%",
  minHeight: "150px",
  display: "flex",
  gap: "2px",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const SuggestionSlide = styled(SwiperSlide)({
  height: "100%",
});

export default function Suggestions() {
  const { t, i18n } = useTranslation();
  const swiperRef = useRef<SwiperType | null>(null);
  const { slideCount } = useSlideCount();
  const { suggestionsBookings } = useSelector(
    (state: RootState) => state.suggestions
  );
  const isArabic = i18n.language === "ar";

  return (
    <SuggestionsWrapper>
      <TitleContainer>
        <Title variant="h6" color="inherit">
          {t("suggestions.title")}
        </Title>
        {isArabic ? (
          <ArrowBackIosIcon sx={{ fontSize: "0.95rem" }} />
        ) : (
          <ArrowForwardIosIcon sx={{ fontSize: "0.95rem" }} />
        )}
        <NavControl isArabic={isArabic}>
          <ControlButton onClick={() => swiperRef.current?.slidePrev()}>
            <WestIcon fontSize="small" color="inherit" />
          </ControlButton>
          <ControlButton onClick={() => swiperRef.current?.slideNext()}>
            <EastIcon fontSize="small" color="inherit" />
          </ControlButton>
        </NavControl>
      </TitleContainer>
      <SuggestionSlider
        slidesPerView={slideCount}
        style={{ display: "flex" }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        loop={true}
        speed={250}
        spaceBetween={12}
      >
        {suggestionsBookings.map((booking, idx) => {
          return (
            <SuggestionSlide key={idx}>
              <Card {...booking[i18n.language as keyof typeof booking]} />
            </SuggestionSlide>
          );
        })}
      </SuggestionSlider>
    </SuggestionsWrapper>
  );
}
