import { useRef } from "react";
import { Box, Button, styled } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
const HeroWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: "425px",
  aspectRatio: "1",
  maxHeight: "600px",
  border: "1px solid crimson",
  position: "relative",
  [theme.breakpoints.down("nav_break")]: {
    translate: "0% -65px",
  },
}));

const DesktopSliderWrapper = styled(Box)(({ theme }) => ({
  width: "99.9%",
  height: "99.9%",
  display: "flex",
  justifyContent: "center",
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
  left: "10%",
  translate: "-50% 0%",
  border: "1px solid white",
  padding: "5px",
  zIndex: 9999,
  [theme.breakpoints.down("nav_break")]: {
    bottom: "-50px",
    left: "50%",
  },
}));

export default function Hero() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <HeroWrapper>
      <Swiper
        slidesPerView={1}
        autoplay={true}
        loop={true}
        style={{ width: "100%", height: "100%" }}
        spaceBetween={0}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        <SwiperSlide>
          <>
            <DesktopSliderWrapper>Desktop</DesktopSliderWrapper>
            <MobileSliderWrapper>Mobile</MobileSliderWrapper>
          </>
        </SwiperSlide>
        <SwiperSlide>
          <>
            <DesktopSliderWrapper>Desktop</DesktopSliderWrapper>
            <MobileSliderWrapper>Mobile</MobileSliderWrapper>
          </>
        </SwiperSlide>
        <SwiperSlide>
          <>
            <DesktopSliderWrapper>Desktop</DesktopSliderWrapper>
            <MobileSliderWrapper>Mobile</MobileSliderWrapper>
          </>
        </SwiperSlide>
      </Swiper>
      <ControlNav>
        <Button></Button>
        <Button></Button>
      </ControlNav>
    </HeroWrapper>
  );
}
