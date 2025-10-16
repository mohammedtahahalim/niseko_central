import { Box, styled } from "@mui/material";
import Plan from "../../components/Plan";
import Hero from "../../features/hero/Hero";
import Services from "../../components/Services";
import Suggestions from "../../features/suggestions/Suggestions";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { fetchSuggestions } from "../../features/suggestions/suggestionsSlice";
import { useEffect } from "react";
import Loader from "../../components/Loader";
import RenderOnView from "../../features/render_on_view/RenderOnView";

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

const SuggestionLoader = styled(Box)({
  width: "100%",
  padding: "25px 15px",
  minHeight: "250px",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
});

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { bookings, loading } = useSelector(
    (state: RootState) => state.suggestions
  );
  useEffect(() => {
    dispatch(fetchSuggestions({ queries: { limit: 14, category: "general" } }));
  }, []);
  return (
    <HomeWrapper>
      <Plan />
      <Hero />
      <RenderOnView>
        <Services />
      </RenderOnView>
      {loading && (
        <SuggestionLoader>
          <Loader />
        </SuggestionLoader>
      )}
      {bookings.length !== 0 && (
        <RenderOnView>
          <Suggestions />
        </RenderOnView>
      )}
    </HomeWrapper>
  );
}
