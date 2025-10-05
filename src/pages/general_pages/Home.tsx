import { Box, styled } from "@mui/material";

const HomeWrapper = styled(Box)({
  width: "100%",
  overflowX: "hidden",
});

export default function Home() {
  return <HomeWrapper>Home</HomeWrapper>;
}
