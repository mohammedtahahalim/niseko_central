import { Box, styled } from "@mui/material";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { fetchSuggestions } from "../../features/home/suggestions/suggestionsSlice";
import { fetchNews } from "../../features/home/news/newsSlice";
import { fetchBlogs } from "../../features/home/blog/blogSlice";
import { useEffect } from "react";
import Plan from "../../components/Plan";
import Hero from "../../features/home/hero/Hero";
import Services from "../../components/Services";
import Suggestions from "../../features/home/suggestions/Suggestions";
import RenderOnView from "../../features/render_on_view/RenderOnView";
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
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchSuggestions({ queries: { limit: 10 } }));
    dispatch(fetchNews({}));
    dispatch(fetchBlogs({}));
  }, []);

  return (
    <HomeWrapper>
      <Hero />
      <RenderOnView animationDirection="top">
        <Services />
      </RenderOnView>
      <RenderOnView animationDirection="left">
        <Suggestions />
      </RenderOnView>
      <RenderOnView animationDirection="right">
        <News />
      </RenderOnView>
      <RenderOnView animationDirection="bottom">
        <NisekoPassport />
      </RenderOnView>
      <RenderOnView animationDirection="top">
        <Blog />
      </RenderOnView>
      <Plan />
    </HomeWrapper>
  );
}
