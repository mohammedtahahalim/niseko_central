import { Box, styled } from "@mui/material";
import Plan from "../../components/Plan";
import Hero from "../../features/hero/Hero";
import Services from "../../components/Services";

const HomeWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  minHeight: "100vh",
  backgroundColor: theme.palette.mainbody?.main,
}));

export default function Home() {
  return (
    <HomeWrapper>
      <Plan />
      <Hero />
      <Services />
    </HomeWrapper>
  );
}
