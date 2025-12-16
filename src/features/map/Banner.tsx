import { Box, styled } from "@mui/material";
import { useState } from "react";

const BannerWrapper = styled(Box)({
  width: "100%",
  overflow: "hidden",
});

const MapImage = styled("img")({
  width: "100%",
  objectFit: "cover",
  transition: "all 0.75s ease-in-out",
});

export default function Banner() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  return (
    <BannerWrapper>
      <MapImage
        src={
          isLoaded
            ? "https://d1z517741srsht.cloudfront.net/maps/_2048xAUTO_crop_center-center_none/336468/250613_NC_propertiesMap_EN.webp"
            : "data:image/jpeg;base64,UklGRnYAAABXRUJQVlA4IGoAAABwBACdASoUACMAPm0ukUYkIqGhKqwAgA2JaQAASzf/ydx9EPgRf+QtamYRQAD++j+gsn/Dw6n6XCbM+4AeajhStYtKOOmfNcm+/FK9HgRTKBpY8kkUUPBq8flaEoNOvlcLWHDbcmae0gAA"
        }
        alt="Map Image"
        onLoad={() => setIsLoaded(true)}
        sx={{ opacity: isLoaded ? 1 : 0.75 }}
      />
    </BannerWrapper>
  );
}
