import { Box, styled } from "@mui/material";

const HomeWrapper = styled(Box)({
  width: "100%",
  minHeight: "100vh",
  overflowX: "hidden",
});

export default function Home() {
  return <HomeWrapper>Home</HomeWrapper>;
}
