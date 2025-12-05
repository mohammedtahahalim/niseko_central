import { Box, styled } from "@mui/material";
import Plan from "../../components/Plan";
import Hero from "../../features/home/hero/Hero";
import Services from "../../components/Services";
import Suggestions from "../../features/suggestions/Suggestions";
import News from "../../features/home/news/News";
import NisekoPassport from "../../components/NisekoPassport";
import Blog from "../../features/home/blog/Blog";

const HomeWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  minHeight: "100vh",
  backgroundColor: theme.palette.mainbody?.main,
}));

export default function Home() {
  return (
    <HomeWrapper>
      <Hero />
      <Services />
      <Suggestions />
      <News />
      <NisekoPassport />
      <Blog />
      <Plan />
    </HomeWrapper>
  );
}
