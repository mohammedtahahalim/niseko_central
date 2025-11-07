import { styled } from "@mui/material";
import { useState } from "react";

interface GalleryImageProps {
  image: string;
  blurred_image: string;
}

const GalleryImageContainer = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "all 0.3s linear",
  "&:hover": {
    scale: 1.1,
  },
});

export default function GalleryImage({
  image,
  blurred_image,
}: GalleryImageProps) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  return (
    <GalleryImageContainer
      src={isLoaded ? image : blurred_image}
      alt="Gallery Image"
      onLoad={() => setIsLoaded(true)}
      sx={{ opacity: isLoaded ? 1 : 0.2 }}
    />
  );
}
