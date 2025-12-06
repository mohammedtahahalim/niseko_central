import { Box, Container, styled } from "@mui/material";
import LinkTitle from "../../components/LinkTitle";
import Title from "../../components/Title";
import Suggestions from "../../features/suggestions/Suggestions";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { useEffect } from "react";
import { fetchNews } from "../../features/home/news/newsSlice";
import useSlideAndHeightCount from "../../features/home/news/useSlideAndHeightCount";
import Skelton from "../../features/deals/Skelton";
import RenderOnView from "../../features/render_on_view/RenderOnView";
import Error from "../../components/Error";
import NewsCard from "../../features/home/news/NewsCard";
import { useTranslation } from "react-i18next";

const DealsContainer = styled(Container)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "9px",
  minHeight: "100vh",
  padding: "1rem",
  backgroundColor: theme.palette.mainbody?.main,
  [theme.breakpoints.down("md")]: {
    padding: "5px",
    gap: "15px",
  },
}));

const CardsContainer = styled(Box)({
  width: "100%",
  flex: "1",
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  justifyContent: "center",
});

const CardWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "maxHeight" && prop !== "slideCount",
})<{ maxHeight: string; slideCount: number }>(
  ({ maxHeight, slideCount, theme }) => ({
    width: "100%",
    maxWidth: `min(calc(100% / ${slideCount} - 8px), 656px)`,
    minHeight: "150px",
    aspectRatio: "1",
    maxHeight: maxHeight ?? "350px",
    backgroundColor: theme.palette.icons?.main,
    borderRadius: "12px",
    overflow: "hidden",
    [theme.breakpoints.down("middle_break")]: {
      maxWidth: `calc(100% / ${slideCount})`,
    },
  })
);

export default function Deals() {
  const { i18n } = useTranslation();
  const { slideCount, maxHeight } = useSlideAndHeightCount();
  const { newsLoading, error, news } = useSelector(
    (state: RootState) => state.news
  );
  const dispatch = useDispatch<AppDispatch>();

  console.log(maxHeight);

  useEffect(() => {
    const dealsRequest = dispatch(fetchNews({}));
    return () => {
      dealsRequest.abort();
    };
  }, []);

  return (
    <DealsContainer maxWidth="xl">
      <LinkTitle />
      <Title page="deals" />
      <RenderOnView animationDirection="top">
        <CardsContainer>
          {newsLoading && (
            <Skelton skeltonNum={slideCount} maxHeight={maxHeight} />
          )}
          {!newsLoading &&
            news &&
            news.map((news) => {
              return (
                <CardWrapper
                  maxHeight={maxHeight}
                  slideCount={slideCount}
                  key={news.id}
                >
                  <NewsCard
                    id={news.id}
                    title={
                      news.article[i18n.language as keyof typeof news.article]
                        .title
                    }
                    image={news.image}
                    blurry_image={news.blur_image}
                  />
                </CardWrapper>
              );
            })}
          {error && <Error errorMessage={error} />}
        </CardsContainer>
      </RenderOnView>
      <Suggestions />
    </DealsContainer>
  );
}
