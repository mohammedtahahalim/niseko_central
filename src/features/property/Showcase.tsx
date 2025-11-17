import { Box, styled } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import SwiperCore from "swiper";
import { Controller } from "swiper/modules";

SwiperCore.use([Controller]);

const ShowcaseWrapper = styled(Box)({
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
});

const ControlRoom = styled(Box)({
  width: "100%",
  height: "40px",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
});

const MainUnit = styled(Box)({
  flex: "1",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "5px",
  position: "relative",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  overflow: "hidden",
  padding: "0px 10px",
});

const LeftNav = styled(Box)(({ theme }) => ({
  width: "fit-content",
  aspectRatio: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  zIndex: 111,
  padding: "8px",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  borderRadius: "50px",
  [theme.breakpoints.down("md")]: {
    position: "absolute",
    left: "5px",
    top: "50%",
    translate: "0% -50%",
    padding: "8px",
  },
}));

const SliderWrapper = styled(Swiper)(({ theme }) => ({
  flex: "1",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  maxWidth: "min(100%, 1300px)",
  maxHeight: "95%",
  [theme.breakpoints.down("md")]: {
    width: "100vw",
  },
}));

const RightNav = styled(Box)(({ theme }) => ({
  width: "fit-content",
  aspectRatio: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  zIndex: 111,
  padding: "8px",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  borderRadius: "50px",
  marginRight: "15px",
  [theme.breakpoints.down("md")]: {
    position: "absolute",
    right: "5px",
    top: "50%",
    translate: "0% -50%",
    marginRight: "0px",
  },
}));

const CollectionWrapper = styled(Box)({
  height: "75px",
  width: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
});

const Collection = styled(Swiper)({
  width: "fit-content",
  maxWidth: "min(100%, 850px)",
  height: "75px",
  cursor: "pointer",
});

const CollSlide = styled(SwiperSlide)(({ theme }) => ({
  height: "75px",
  maxWidth: "125px",
  borderRadius: "5px",
  overflow: "hidden",
  "&.swiper-slide-active": {
    border: `3px solid  ${theme.palette.primary.main}`,
  },
}));

const CustomImage = styled("img")({
  height: "75px",
  width: "125px",
  objectFit: "cover",
  transition: "all 0.2s linear",
  userSelect: "none",
  "&:hover": {
    scale: 1.1,
  },
});

const SliderImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  userSelect: "none",
});

export default function Showcase() {
  const { images } = useSelector(
    (state: RootState) => state.property.propertyData
  );
  const mainSwiperRef = useRef<SwiperType | null>(null);
  const thumbSwiperRef = useRef<SwiperType | null>(null);

  return (
    <ShowcaseWrapper>
      <ControlRoom></ControlRoom>
      <MainUnit>
        <LeftNav onClick={() => mainSwiperRef.current?.slidePrev()}>
          <ArrowBackIosNewIcon fontSize="small" color="success" />
        </LeftNav>
        <SliderWrapper
          slidesPerView={1}
          onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
          controller={{ control: thumbSwiperRef.current }}
        >
          {images.map((image: string) => {
            return (
              <SwiperSlide>
                <SliderImage src={image} />
              </SwiperSlide>
            );
          })}
        </SliderWrapper>
        <RightNav onClick={() => mainSwiperRef.current?.slideNext()}>
          <ArrowForwardIosIcon fontSize="small" color="success" />
        </RightNav>
      </MainUnit>
      <CollectionWrapper>
        <Collection
          centeredSlides={true}
          slidesPerView="auto"
          spaceBetween={10}
          grabCursor={true}
          onSwiper={(swiper) => (thumbSwiperRef.current = swiper)}
          controller={{ control: mainSwiperRef.current }}
        >
          {images.map((element: string, idx: number) => {
            return (
              <CollSlide
                onClick={() => mainSwiperRef.current?.slideToLoop(idx)}
              >
                <CustomImage src={element} alt="Image" />
              </CollSlide>
            );
          })}
        </Collection>
      </CollectionWrapper>
    </ShowcaseWrapper>
  );
}
