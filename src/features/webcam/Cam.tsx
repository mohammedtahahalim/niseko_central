import { Box, styled } from "@mui/material";

const CamWrapper = styled(Box)({
  width: "100%",
  aspectRatio: "16/9",
  overflow: "hidden",
});

const Frame = styled("iframe")({
  width: "100%",
  height: "100%",
});

export default function Cam() {
  return (
    <CamWrapper role="feed" aria-description="Live feed of Mount Yotei">
      <Frame src="https://yotei.htmniseko.com/"></Frame>
    </CamWrapper>
  );
}
