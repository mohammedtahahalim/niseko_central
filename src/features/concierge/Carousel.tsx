import { Box, styled } from "@mui/material";

const CarouselWrapper = styled(Box)({
  width: "100%",
  minHeight: "250px",
  padding: "15px 5px",
  border: "1px solid white",
});

export default function Carousel() {
  return <CarouselWrapper></CarouselWrapper>;
}
