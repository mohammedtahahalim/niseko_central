import { Box, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";

const SuggestionsWrapper = styled(Box)({
  width: "100%",
  padding: "25px 15px",
  minHeight: "250px",
  border: "2px solid white",
});

const SuggestionSlider = styled(Swiper)({});

const SuggestionSlide = styled(Box)({});

export default function Suggestions() {
  const { t } = useTranslation();
  return <SuggestionsWrapper>Suggestions</SuggestionsWrapper>;
}
