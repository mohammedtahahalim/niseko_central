import { Box, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { fetchSuggestions } from "../../features/home/suggestions/suggestionsSlice";
import { fetchNews } from "../../features/home/news/newsSlice";
import { fetchBlogs } from "../../features/home/blog/blogSlice";
import { useEffect } from "react";
import Plan from "../../components/Plan";
import Hero from "../../features/home/hero/Hero";
import Services from "../../components/Services";
import Suggestions from "../../features/home/suggestions/Suggestions";
import Loader from "../../components/Loader";
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

const LoaderWrapper = styled(Box)({
  width: "100%",
  padding: "25px 15px",
  minHeight: "250px",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
});

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { suggestionsBookings, suggestionsLoading } = useSelector(
    (state: RootState) => state.suggestions
  );
  const { newsLoading, latestNews } = useSelector(
    (state: RootState) => state.latestNews
  );
  const { blogLoading, blogs } = useSelector(
    (state: RootState) => state.latestBlogs
  );

  useEffect(() => {
    dispatch(fetchSuggestions({ queries: { limit: 10, category: "general" } }));
    dispatch(fetchNews({}));
    dispatch(fetchBlogs({}));
  }, []);

  return (
    <HomeWrapper>
      <Hero />
      <RenderOnView animationDirection="top">
        <Services />
      </RenderOnView>
      {suggestionsLoading && (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
      {suggestionsBookings.length !== 0 && (
        <RenderOnView animationDirection="left">
          <Suggestions />
        </RenderOnView>
      )}
      {newsLoading && (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
      {latestNews.length !== 0 && (
        <RenderOnView animationDirection="right">
          <News />
        </RenderOnView>
      )}
      <RenderOnView animationDirection="bottom">
        <NisekoPassport />
      </RenderOnView>
      {blogLoading && (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
      {blogs.length !== 0 && (
        <RenderOnView animationDirection="top">
          <Blog />
        </RenderOnView>
      )}
      <Plan />
    </HomeWrapper>
  );
}
