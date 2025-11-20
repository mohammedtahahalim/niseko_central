import { Box, styled, Typography } from "@mui/material";
import type { ConciergeArticle } from "./conciergeSlice";
import { niceUrl } from "../../utils/Constants";
import { useContext } from "react";
import { countContext } from "../../pages/general_pages/Concierge";

const SectionWrapper = styled(Box)({
  width: "100%",
  border: "1px solid white",
  textTransform: "capitalize",
  flex: "1",
  minHeight: "450px",
});

const Title = styled(Typography)({
  fontFamily: "Figtree",
});

const Carousel = styled(Box)<{ maxHeight: string }>(({ maxHeight }) => ({
  maxHeight: maxHeight ?? "300px",
  flex: 1,
  width: "100%",
}));

export default function Section({ category, deals }: ConciergeArticle) {
  const { slideCount, maxHeight } = useContext(countContext);
  return (
    <SectionWrapper>
      <Title>{niceUrl(category)}</Title>
    </SectionWrapper>
  );
}
