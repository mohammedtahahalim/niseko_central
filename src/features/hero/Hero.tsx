import { useRef } from "react";
import { Box, styled } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import "swiper/css";
import DesktopSlide from "./DesktopSlide";

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
  border: "1px solid white",
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
  left: "8%",
  translate: "-50% 0%",
  zIndex: 1,
  height: "29px",
  overflow: "hidden",
  display: "flex",
  gap: "15px",
  cursor: "pointer",
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
  border: `2px solid ${theme.palette.icons?.main}`,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
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
            <DesktopSliderWrapper>
              <DesktopSlide />
            </DesktopSliderWrapper>
            <MobileSliderWrapper>Mobile</MobileSliderWrapper>
          </>
        </SwiperSlide>
        <SwiperSlide>
          <>
            <DesktopSliderWrapper>
              <DesktopSlide />
            </DesktopSliderWrapper>
            <MobileSliderWrapper>Mobile</MobileSliderWrapper>
          </>
        </SwiperSlide>
        <SwiperSlide>
          <>
            <DesktopSliderWrapper>
              <DesktopSlide />
            </DesktopSliderWrapper>
            <MobileSliderWrapper>Mobile</MobileSliderWrapper>
          </>
        </SwiperSlide>
      </Swiper>
      <ControlNav>
        <NavButton onClick={() => swiperRef.current?.slidePrev()}>
          <WestIcon fontSize="small" />
        </NavButton>
        <NavButton onClick={() => swiperRef.current?.slideNext()}>
          <EastIcon fontSize="small" />
        </NavButton>
      </ControlNav>
    </HeroWrapper>
  );
}
