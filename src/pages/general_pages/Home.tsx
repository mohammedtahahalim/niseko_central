import { Box, styled } from "@mui/material";
import Plan from "../../components/Plan";
import Hero from "../../features/hero/Hero";
import Services from "../../components/Services";
import Suggestions from "../../features/suggestions/Suggestions";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { fetchSuggestions } from "../../features/suggestions/suggestionsSlice";
import { useEffect } from "react";

const HomeWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  minHeight: "100vh",
  backgroundColor: theme.palette.mainbody?.main,
}));

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { bookings } = useSelector((state: RootState) => state.suggestions);
  useEffect(() => {
    dispatch(fetchSuggestions({ queries: { limit: 14, category: "general" } }));
  }, []);
  return (
    <HomeWrapper>
      <Plan />
      <Hero />
      <Services />
      {bookings.length !== 0 && <Suggestions />}
    </HomeWrapper>
  );
}
