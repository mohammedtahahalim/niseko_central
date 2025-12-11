import { Box, Skeleton, styled } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { useState } from "react";

const BannerWrapper = styled(Box)({
  width: "100%",
  maxWidth: "900px",
  aspectRatio: "16/9",
  overflow: "hidden",
  borderRadius: "5px",
  margin: "0 auto",
});

const Image = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const SkeletonImage = styled(Skeleton)({
  width: "100%",
  height: "100%",
});

export default function Banner() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const { loading, data } = useSelector((state: RootState) => state.blogs);
  const { image, blur_image } = data?.blogs[0] || {};

  return (
    <BannerWrapper>
      {loading ? (
        <SkeletonImage variant="rounded" />
      ) : (
        <Image
          alt="Promotion Banner"
          src={loaded ? image : blur_image ? blur_image : "image.jpeg"}
          onLoad={() => setLoaded(true)}
          style={{
            opacity: loaded ? 1 : 0.5,
            transition: "all 0.5s ease-in-out",
          }}
        />
      )}
    </BannerWrapper>
  );
}
