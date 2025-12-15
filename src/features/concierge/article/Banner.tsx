import { Box, Skeleton, styled } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import type { idArticle } from "../conciergeSlice";

const BannerContainer = styled(Box)({
  width: "100%",
  maxWidth: "950px",
  aspectRatio: "16/9",
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  margin: "0 auto",
  overflow: "hidden",
  borderRadius: "8px",
});

const Image = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "all 1s ease-in-out",
});

const ImageSkeleton = styled(Skeleton)({
  width: "100%",
  height: "100%",
});

export default function Banner() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { loading, articles } = useSelector(
    (state: RootState) => state.concierge
  );
  const { image, blur_image } = (articles as idArticle) || {};
  return (
    <BannerContainer>
      {loading ? (
        <ImageSkeleton variant="rectangular" />
      ) : (
        <Image
          src={isLoaded ? image : blur_image}
          sx={{ opacity: isLoaded ? 1 : 0.5 }}
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </BannerContainer>
  );
}
