import { Box, styled } from "@mui/material";
import Plan from "../../components/Plan";
import Hero from "../../features/home/hero/Hero";
import Services from "../../components/Services";
import Suggestions from "../../features/home/suggestions/Suggestions";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { fetchSuggestions } from "../../features/home/suggestions/suggestionsSlice";
import { fetchNews } from "../../features/home/news/newsSlice";
import { useEffect } from "react";
import Loader from "../../components/Loader";
import RenderOnView from "../../features/render_on_view/RenderOnView";
import News from "../../features/home/news/News";
import NisekoPassport from "../../components/NisekoPassport";

const HomeWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  minHeight: "100vh",
  backgroundColor: theme.palette.mainbody?.main,
  [theme.breakpoints.down("nav_break")]: {
    "& > :last-of-type": {
      paddingBottom: "75px",
    },
  },
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

  useEffect(() => {
    dispatch(fetchSuggestions({ queries: { limit: 14, category: "general" } }));
    dispatch(fetchNews({}));
  }, []);

  return (
    <HomeWrapper>
      <Plan />
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
    </HomeWrapper>
  );
}
