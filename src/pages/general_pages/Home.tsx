import { Box, styled } from "@mui/material";
import Plan from "../../components/Plan";
import Hero from "../../features/hero/Hero";

const HomeWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  minHeight: "100vh",
});

export default function Home() {
  return (
    <HomeWrapper>
      <Plan />
      <Hero />
    </HomeWrapper>
  );
}
