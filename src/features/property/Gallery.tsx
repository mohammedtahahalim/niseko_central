import { Box, styled } from "@mui/material";

const GalleryWrapper = styled(Box)(({ theme }) => ({
  width: "90%",
  display: "flex",
  gap: "10px",
  alignSelf: "center",
  [theme.breakpoints.down("lg")]: {
    width: "100%",
  },
}));

const MainPicture = styled(Box)({
  flex: "1",
  aspectRatio: "1",
  border: "1px solid white",
});

const Thumbnails = styled(Box)(({ theme }) => ({
  flex: "1",
  aspectRatio: "1",
  border: "1px solid white",
  [theme.breakpoints.down("middle_break")]: {
    display: "none",
  },
}));

export default function Gallery() {
  return (
    <GalleryWrapper>
      <MainPicture></MainPicture>
      <Thumbnails></Thumbnails>
    </GalleryWrapper>
  );
}
