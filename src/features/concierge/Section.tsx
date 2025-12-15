import { Box, styled, Typography } from "@mui/material";
import { niceUrl } from "../../utils/Constants";
import { useContext, useRef } from "react";
import { countContext } from "../../context/CountContext";
import { Swiper, SwiperSlide } from "swiper/react";
import type { fullArticle } from "./conciergeSlice";
import Article from "./Article";
import { useTranslation } from "react-i18next";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import type { Swiper as SwiperType } from "swiper";
import { useNavigate } from "react-router-dom";

interface SectionProps {
  category: string;
  deals: fullArticle["articles"];
}

const SectionWrapper = styled(Box)({
  width: "100%",
  textTransform: "capitalize",
  flex: "1",
  minHeight: "450px",
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
  cursor: "pointer",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
  },
  "&:hover": {
    textDecoration: "underline",
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

const Carousel = styled(Swiper)({
  width: "100%",
  flex: "1",
  display: "flex",
});

const Slide = styled(SwiperSlide, {
  shouldForwardProp: (prop) => prop !== "maxHeight",
})<{ maxHeight: string }>(({ maxHeight }) => ({
  aspectRatio: "1",
  maxHeight: maxHeight || "450px",
  position: "relative",
  borderRadius: "8px",
  overflow: "hidden",
}));

export default function Section({ category, deals }: SectionProps) {
  const { slideCount, maxHeight } = useContext(countContext);
  const { t, i18n } = useTranslation();
  const tr_category = t(`concierge.categories.${category}`);
  const isArabic = i18n.language === "ar";
  const swiperRef = useRef<SwiperType | null>(null);
  const navigate = useNavigate();

  return (
    <SectionWrapper>
      <TitleContainer>
        <Title
          variant="h6"
          color="inherit"
          onClick={() => navigate(`/concierge/${category}`)}
        >
          {niceUrl(tr_category)}
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
      <Carousel
        slidesPerView={slideCount}
        spaceBetween={10}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {deals.map((deal) => {
          return (
            <Slide maxHeight={maxHeight} key={deal.id}>
              <Article {...deal} />
            </Slide>
          );
        })}
      </Carousel>
    </SectionWrapper>
  );
}
