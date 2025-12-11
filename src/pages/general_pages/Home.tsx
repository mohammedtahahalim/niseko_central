import { Box, styled } from "@mui/material";
import Plan from "../../components/Plan";
import Hero from "../../features/home/hero/Hero";
import Services from "../../components/Services";
import Suggestions from "../../features/suggestions/Suggestions";
import News from "../../features/home/news/News";
import NisekoPassport from "../../components/NisekoPassport";
import Blog from "../../features/home/blog/Blog";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { useEffect } from "react";
import { fetchSuggestions } from "../../features/suggestions/suggestionsSlice";
import { fetchNews } from "../../features/home/news/newsSlice";
import { fetchBlogs } from "../../features/home/blog/blogSlice";

const HomeWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  minHeight: "100vh",
  backgroundColor: theme.palette.mainbody?.main,
}));

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const suggestion = dispatch(fetchSuggestions({ queries: { limit: 12 } }));
    const news = dispatch(fetchNews({ queries: { limit: 7 } }));
    const blogs = dispatch(fetchBlogs({}));
    return () => {
      suggestion.abort();
      news.abort();
      blogs.abort();
    };
  }, []);

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
