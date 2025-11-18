import { Box, styled } from "@mui/material";
import type { ConciergeArticle } from "./conciergeSlice";

const SectionWrapper = styled(Box)({
  width: "100%",
  minHeight: "300px",
  border: "1px solid white",
});

export default function Section({ category, deals }: ConciergeArticle) {
  console.log(category, deals.length);
  return <SectionWrapper>{category}</SectionWrapper>;
}
