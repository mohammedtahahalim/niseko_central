import { Box, styled } from "@mui/material";

const DesktopSlideWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
});

const InfoSlide = styled(Box)({
  flex: "1.2",
  border: "1px solid white",
  height: "100%",
  paddingLeft: "6%",
  display: "flex",
  alignItems: "center",
  gap: "10px",
});

const ImageSlide = styled(Box)({
  flex: "2",
  border: "1px solid white",
  height: "100%",
});

export default function DesktopSlide() {
  return (
    <DesktopSlideWrapper>
      <InfoSlide>Info</InfoSlide>
      <ImageSlide>Image</ImageSlide>
    </DesktopSlideWrapper>
  );
}
