import { Box, styled } from "@mui/material";
import type { Property } from "./bookingsSlice";
import { useState } from "react";

const PropertyCardWrapper = styled(Box)({
  minWidth: "min(100%, 400px)",
  aspectRatio: "1",
  borderRadius: "8px",
  overflow: "hidden",
  position: "relative",
});

const ImageWrapper = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "all 0.25s linear",
  position: "absolute",
  top: "0",
  left: "0",
  zIndex: 11,
});

const ShadowOverlay = styled(Box)({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: "0",
  left: "0",
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  zIndex: 111,
});

const Content = styled(Box)({
  position: "absolute",
  zIndex: 1111,
  bottom: "0",
  left: "0",
  width: "100%",
  minHeight: "40%",
  border: "1px solid white",
});

export default function PropertyCard({ id, images, blurred_images }: Property) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  return (
    <PropertyCardWrapper tabIndex={0}>
      <ImageWrapper
        src={isLoaded ? images[0] : blurred_images[0]}
        alt={id.toString()}
        onLoad={() => setIsLoaded(true)}
        sx={{ opacity: isLoaded ? 1 : 0.5 }}
      />
      <ShadowOverlay />
      <Content />
    </PropertyCardWrapper>
  );
}
