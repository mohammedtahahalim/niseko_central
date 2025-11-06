import { Box, styled } from "@mui/material";
import Modal from "../modal/Modal";
import Showcase from "./Showcase";

const GalleryWrapper = styled(Box)(({ theme }) => ({
  width: "90%",
  display: "flex",
  gap: "10px",
  alignSelf: "center",
  cursor: "pointer",
  [theme.breakpoints.down("lg")]: {
    width: "100%",
  },
}));

const MainPicture = styled(Box)({
  flex: "1",
  aspectRatio: "1",
  border: "1px solid white",
  borderRadius: "8px",
  overflow: "hidden",
});

const Thumbnails = styled(Box)(({ theme }) => ({
  flex: "1",
  aspectRatio: "1",
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  [theme.breakpoints.down("middle_break")]: {
    display: "none",
  },
}));

const ThumbnailImage = styled(Box)({
  width: "48%",
  height: "50%",
  border: "1px solid white",
  borderRadius: "8px",
  overflow: "hidden",
});

export default function Gallery() {
  return (
    <Modal
      trigger={
        <GalleryWrapper>
          <MainPicture></MainPicture>
          <Thumbnails>
            {Array.from({ length: 4 }).map((_, idx) => {
              return <ThumbnailImage key={idx}></ThumbnailImage>;
            })}
          </Thumbnails>
        </GalleryWrapper>
      }
      blurBackground={true}
      disableScroll={true}
      isTransparent={true}
    >
      <Showcase />
    </Modal>
  );
}
