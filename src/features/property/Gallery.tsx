import { Box, Skeleton, styled } from "@mui/material";
import Modal from "../modal/Modal";
import Showcase from "./Showcase";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import GalleryImage from "./GalleryImage";
import RenderOnView from "../render_on_view/RenderOnView";

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
  borderRadius: "8px",
  overflow: "hidden",
});

const Thumbnails = styled(Box)(({ theme }) => ({
  flex: "1",
  aspectRatio: "1",
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  overflow: "hidden",
  [theme.breakpoints.down("middle_break")]: {
    display: "none",
  },
}));

const ThumbnailImage = styled(Box)({
  width: "48%",
  maxHeight: "49%",
  borderRadius: "8px",
  overflow: "hidden",
});

const CustomSkelton = styled(Skeleton)({
  width: "100%",
  height: "100%",
});

export default function Gallery() {
  const { loading, propertyData } = useSelector(
    (state: RootState) => state.propertySlice
  );
  const { images, blurred_images } = propertyData || {};

  return (
    <RenderOnView animationDirection="top">
      <Modal
        trigger={
          <GalleryWrapper
            role="modal"
            aria-label="Open Gallery"
            aria-live="polite"
          >
            <MainPicture>
              {loading && <CustomSkelton variant="rounded" />}
              {!loading && propertyData && (
                <GalleryImage
                  image={images[0]}
                  blurred_image={blurred_images[0]}
                />
              )}
            </MainPicture>
            <Thumbnails>
              {Array.from({ length: 4 }).map((_, idx) => {
                return (
                  <ThumbnailImage key={idx}>
                    {loading && <CustomSkelton variant="rounded" />}
                    {!loading && propertyData && (
                      <GalleryImage
                        image={images[idx + 1]}
                        blurred_image={blurred_images[idx + 1]}
                        key={images[idx + 1]}
                      />
                    )}
                  </ThumbnailImage>
                );
              })}
            </Thumbnails>
          </GalleryWrapper>
        }
        blurBackground={true}
        isTransparent={true}
        disableScroll={true}
      >
        <Showcase />
      </Modal>
    </RenderOnView>
  );
}
