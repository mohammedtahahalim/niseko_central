import { Box, styled, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import useSlideCount from "./useSlideCount";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import Article from "./Article";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";

const BlogWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: "25px 15px",
  minHeight: "250px",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  [theme.breakpoints.down("nav_break")]: {
    justifySelf: "center",
  },
}));

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

const BlogSlider = styled(Swiper)(({ theme }) => ({
  width: "95%",
  minHeight: "150px",
  display: "flex",
  gap: "2px",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const BlogSlide = styled(SwiperSlide)({
  height: "100%",
});

export default function Blog() {
  const { t } = useTranslation();
  const { slideCount } = useSlideCount();
  const swiperRef = useRef<SwiperType | null>(null);
  const { blogs } = useSelector((state: RootState) => state.latestBlogs);
  console.log(blogs);

  return (
    <BlogWrapper>
      <TitleContainer>
        <Title variant="h6" color="inherit">
          {t("home.blog.title")}
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
      <BlogSlider
        slidesPerView={slideCount}
        style={{ display: "flex" }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        speed={250}
        spaceBetween={12}
      >
        {blogs.map((blog, idx) => {
          return (
            <BlogSlide key={idx}>
              <Article {...blog} />
            </BlogSlide>
          );
        })}
      </BlogSlider>
    </BlogWrapper>
  );
}
