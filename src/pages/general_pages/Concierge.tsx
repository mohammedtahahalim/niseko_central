import { Container, styled } from "@mui/material";
import LinkTitle from "../../components/LinkTitle";
import Title from "../../components/Title";
import Suggestions from "../../features/suggestions/Suggestions";
import Section from "../../features/concierge/Section";
import { fetchConcierge } from "../../features/concierge/conciergeSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { createContext, useEffect } from "react";
import Skeleton from "../../features/concierge/Skeleton";
import useArticleCount from "../../features/concierge/useArticleCount";

export const countContext = createContext<{
  slideCount: number;
  maxHeight: string;
}>({
  slideCount: 0,
  maxHeight: "",
});

const ConciergeContainer = styled(Container)(({ theme }) => ({
  width: "100%",
  height: "100%",
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

export default function Concierge() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, articles } = useSelector(
    (state: RootState) => state.concierge
  );
  const { slideCount, maxHeight } = useArticleCount();

  useEffect(() => {
    const concierge = dispatch(fetchConcierge());
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
            return <Skeleton key={idx} />;
          })}
        {!loading && error && <div>{error}</div>}
        {!loading &&
          articles &&
          Object.values(articles).map((article) => {
            return <Section {...article} key={article.category} />;
          })}
        <Suggestions />
      </ConciergeContainer>
    </countContext.Provider>
  );
}
