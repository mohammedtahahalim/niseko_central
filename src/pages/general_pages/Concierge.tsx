import { Container, styled } from "@mui/material";
import LinkTitle from "../../components/LinkTitle";
import Title from "../../components/Title";
import Suggestions from "../../features/suggestions/Suggestions";
import { fetchConcierge } from "../../features/concierge/conciergeSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { createContext, useEffect } from "react";
import useArticleCount from "../../features/concierge/useArticleCount";
import Error from "../../components/Error";

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
  const { error, articles } = useSelector(
    (state: RootState) => state.concierge
  );
  const { slideCount, maxHeight } = useArticleCount();

  console.log(articles);

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
        {error && <Error errorMessage={error} />}
        <Suggestions />
      </ConciergeContainer>
    </countContext.Provider>
  );
}
