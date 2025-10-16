import { Box, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import useSlideAndHeightCount from "./useSlideAndHeightCount";
import NewsCard from "./NewsCard";

const NewsWrapper = styled(Box)({
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
  textTransform: "capitalize",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
  },
}));

const NavControl = styled(Box)(({ theme }) => ({
  position: "absolute",
  right: "0px",
  top: "0px",
  height: "100%",
  padding: "10px",
  display: "flex",
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

const NewsSlider = styled(Swiper)(({ theme }) => ({
  width: "95%",
  minHeight: "150px",
  display: "flex",
  gap: "2px",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const NewsSlide = styled(SwiperSlide, {
  shouldForwardProp: (prop) => prop !== "maxHeight",
})<{ maxHeight: string }>(({ maxHeight }) => ({
  aspectRatio: "1",
  maxHeight,
}));

export default function News() {
  const { t } = useTranslation();
  const swiperRef = useRef<SwiperType | null>(null);
  const { bookings } = useSelector((state: RootState) => state.suggestions);
  const { slideCount, maxHeight } = useSlideAndHeightCount();

  return (
    <NewsWrapper>
      <TitleContainer>
        <Title variant="h6" color="inherit">
          {t("home.news_section.title")}
        </Title>
        <ArrowForwardIosIcon sx={{ fontSize: "0.95rem" }} />
        <NavControl>
          <ControlButton onClick={() => swiperRef.current?.slidePrev()}>
            <WestIcon fontSize="small" color="inherit" />
          </ControlButton>
          <ControlButton onClick={() => swiperRef.current?.slideNext()}>
            <EastIcon fontSize="small" color="inherit" />
          </ControlButton>
        </NavControl>
      </TitleContainer>
      <NewsSlider
        slidesPerView={slideCount}
        style={{ display: "flex" }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        loop={true}
        speed={250}
        spaceBetween={12}
      >
        {bookings.map((_, idx) => {
          return (
            <NewsSlide key={idx} maxHeight={maxHeight}>
              <NewsCard
                title="Selected Properties Come with a Complimentary Shuttle Service 2025-26"
                image="https://d1z517741srsht.cloudfront.net/blog/_1280xAUTO_crop_center-center_none/270844/20240516_Niseko_Flower_Nature_Stock_%E4%B8%89%E5%B3%B6_DSC9946_Lores_5.webp"
                link=""
              />
            </NewsSlide>
          );
        })}
      </NewsSlider>
    </NewsWrapper>
  );
}
