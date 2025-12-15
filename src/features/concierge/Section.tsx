import { Box, styled, Typography } from "@mui/material";
import { niceUrl } from "../../utils/Constants";
import { useContext } from "react";
import { countContext } from "../../context/CountContext";
import { Swiper, SwiperSlide } from "swiper/react";
import type { fullArticle } from "./conciergeSlice";
import Article from "./Article";
import { useTranslation } from "react-i18next";

interface SectionProps {
  category: string;
  deals: fullArticle["articles"];
}

const SectionWrapper = styled(Box)({
  width: "100%",
  textTransform: "capitalize",
  flex: "1",
  minHeight: "450px",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
});

const Title = styled(Typography)({
  fontFamily: "Figtree",
  fontSize: "1.3rem",
  height: "50px",
  display: "flex",
  alignItems: "center",
});

const Carousel = styled(Swiper)({
  width: "100%",
  flex: "1",
  display: "flex",
});

const Slide = styled(SwiperSlide, {
  shouldForwardProp: (prop) => prop !== "maxHeight",
})<{ maxHeight: string }>(({ maxHeight }) => ({
  aspectRatio: "1",
  maxHeight: maxHeight || "450px",
  position: "relative",
  borderRadius: "8px",
  overflow: "hidden",
}));

const SliderControl = styled(Box)({});

export default function Section({ category, deals }: SectionProps) {
  const { slideCount, maxHeight } = useContext(countContext);
  const { t } = useTranslation();
  const tr_category = t(`concierge.categories.${category}`);

  return (
    <SectionWrapper>
      <Title>{niceUrl(tr_category)}</Title>
      <Carousel slidesPerView={slideCount} spaceBetween={10}>
        {deals.map((deal) => {
          return (
            <Slide maxHeight={maxHeight} key={deal.id}>
              <Article {...deal} />
            </Slide>
          );
        })}
      </Carousel>
    </SectionWrapper>
  );
}
