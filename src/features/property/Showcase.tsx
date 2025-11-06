import { Box, styled } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const ShowcaseWrapper = styled(Box)({
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
});

const ControlRoom = styled(Box)({
  width: "100%",
  height: "75px",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
});

const MainUnit = styled(Box)({
  flex: "1",
  width: "100%",
  display: "flex",
  gap: "5px",
  position: "relative",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
});

const LeftNav = styled(Box)(({ theme }) => ({
  width: "5%",
  minWidth: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  [theme.breakpoints.down("md")]: {
    position: "absolute",
    left: "5px",
    top: "50%",
    translate: "0% -50%",
    aspectRatio: "1",
  },
}));

const Carousel = styled(Box)(({ theme }) => ({
  flex: "1",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    width: "100vw",
  },
}));

const SliderWrapper = styled(Box)(({ theme }) => ({
  border: "1px solid red",
  width: "100%",
  height: "100%",
  [theme.breakpoints.down("md")]: {
    maxHeight: "450px",
    aspectRatio: "1",
  },
}));

const RightNav = styled(Box)(({ theme }) => ({
  width: "5%",
  minWidth: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  [theme.breakpoints.down("md")]: {
    position: "absolute",
    right: "5px",
    top: "50%",
    translate: "0% -50%",
    aspectRatio: "1",
  },
}));

const Collection = styled(Box)({
  width: "100%",
  height: "75px",
  border: "1px solid white",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  gap: "5px",
  justifyContent: "center",
  padding: "2px",
});

const CollSlide = styled(Box)({
  height: "100%",
  aspectRatio: "4.5/3",
  border: "1px solid white",
  borderRadius: "5px",
});

export default function Showcase() {
  return (
    <ShowcaseWrapper>
      <ControlRoom></ControlRoom>
      <MainUnit>
        <LeftNav>
          <ArrowBackIosIcon fontSize="small" color="success" />
        </LeftNav>
        <Carousel>
          <SliderWrapper></SliderWrapper>
        </Carousel>
        <RightNav>
          <ArrowForwardIosIcon fontSize="small" color="success" />
        </RightNav>
      </MainUnit>
      <Collection>
        <CollSlide></CollSlide>
        <CollSlide></CollSlide>
        <CollSlide></CollSlide>
        <CollSlide></CollSlide>
        <CollSlide></CollSlide>
      </Collection>
    </ShowcaseWrapper>
  );
}
