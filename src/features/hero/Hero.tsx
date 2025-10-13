import { useRef } from "react";
import { Box, styled } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import "swiper/css";
import DesktopSlide from "./DesktopSlide";
import { useTranslation } from "react-i18next";
import type { THeroContent } from "../../utils/Types";

const HeroWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: "425px",
  aspectRatio: "1",
  maxHeight: "600px",
  position: "relative",
  backgroundColor: theme.palette.hero?.main,
  [theme.breakpoints.down("nav_break")]: {
    translate: "0% -65px",
  },
}));

const DesktopSliderWrapper = styled(Box)(({ theme }) => ({
  width: "99.9%",
  height: "99.9%",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down("nav_break")]: {
    display: "none",
  },
}));

const MobileSliderWrapper = styled(Box)(({ theme }) => ({
  width: "99.9%",
  height: "99.9%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.up("nav_break")]: {
    display: "none",
  },
}));

const ControlNav = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: "40px",
  left: "7%",
  translate: "-50% 0%",
  zIndex: 1,
  height: "29px",
  overflow: "hidden",
  display: "flex",
  gap: "15px",
  [theme.breakpoints.down("nav_break")]: {
    bottom: "-50px",
    left: "50%",
  },
}));

const NavButton = styled(Box)(({ theme }) => ({
  color: theme.palette.icons?.main,
  height: "100%",
  aspectRatio: 1,
  borderRadius: "50px",
  border: `1px solid ${theme.palette.icons?.main}`,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
}));

export default function Hero() {
  const swiperRef = useRef<SwiperType | null>(null);
  const { t } = useTranslation();

  return (
    <HeroWrapper>
      <Swiper
        slidesPerView={1}
        autoplay={true}
        loop={true}
        style={{ width: "100%", height: "100%" }}
        spaceBetween={0}
        speed={250}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {(
          t("hero_slides.content", { returnObjects: true }) as THeroContent[]
        ).map((slide) => {
          return (
            <SwiperSlide key={slide.title}>
              <>
                <DesktopSliderWrapper>
                  <DesktopSlide {...slide} />
                </DesktopSliderWrapper>
                <MobileSliderWrapper>Mobile</MobileSliderWrapper>
              </>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <ControlNav>
        <NavButton onClick={() => swiperRef.current?.slidePrev()}>
          <WestIcon sx={{ fontSize: "1.05rem" }} />
        </NavButton>
        <NavButton onClick={() => swiperRef.current?.slideNext()}>
          <EastIcon sx={{ fontSize: "1.05rem" }} />
        </NavButton>
      </ControlNav>
    </HeroWrapper>
  );
}
