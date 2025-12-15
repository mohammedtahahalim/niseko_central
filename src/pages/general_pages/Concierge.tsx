import { Box, Container, Skeleton, styled } from "@mui/material";
import LinkTitle from "../../components/LinkTitle";
import Title from "../../components/Title";
import Suggestions from "../../features/suggestions/Suggestions";
import {
  fetchConcierge,
  type fullArticle,
} from "../../features/concierge/conciergeSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { useEffect } from "react";
import useArticleCount from "../../features/concierge/useArticleCount";
import Error from "../../components/Error";
import Section from "../../features/concierge/Section";
import { countContext } from "../../context/CountContext";
import RenderOnView from "../../features/render_on_view/RenderOnView";

const ConciergeContainer = styled(Container)(({ theme }) => ({
  width: "100%",
  height: "100%",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  gap: "9px",
  padding: "1rem",
  backgroundColor: theme.palette.mainbody?.main,
  [theme.breakpoints.down("md")]: {
    padding: "5px",
    gap: "15px",
  },
}));

const SectionSkeleton = styled(Box)({
  width: "100%",
  textTransform: "capitalize",
  flex: "1",
  minHeight: "400px",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
});

const TitleSkeleton = styled(Skeleton)({
  width: "150px",
  height: "50px",
});

const ArticleSkeleton = styled(Skeleton)({
  width: "100%",
  flex: "1",
});

export default function Concierge() {
  const dispatch = useDispatch<AppDispatch>();
  const { error, articles, loading } = useSelector(
    (state: RootState) => state.concierge
  );
  const { slideCount, maxHeight } = useArticleCount();

  useEffect(() => {
    const concierge = dispatch(fetchConcierge({ type: "full" }));
    return () => {
      concierge.abort();
    };
  }, [dispatch]);

  return (
    <countContext.Provider value={{ slideCount, maxHeight }}>
      <ConciergeContainer maxWidth="xl">
        <LinkTitle />
        <Title page="concierge" />
        {loading &&
          Array.from({ length: 4 }).map((_, idx) => {
            return (
              <SectionSkeleton key={idx}>
                <TitleSkeleton variant="text" />
                <ArticleSkeleton variant="rectangular" />
              </SectionSkeleton>
            );
          })}
        {!loading && error && <Error errorMessage={error} />}
        {articles &&
          (articles as fullArticle[]).map((article) => {
            return (
              <RenderOnView animationDirection="right" key={article.category}>
                <Section
                  category={article.category}
                  deals={"articles" in article ? article.articles : []}
                />
              </RenderOnView>
            );
          })}
        <Suggestions />
      </ConciergeContainer>
    </countContext.Provider>
  );
}
