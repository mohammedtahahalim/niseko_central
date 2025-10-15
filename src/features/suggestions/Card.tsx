import { Box, styled } from "@mui/material";
import type { SuggestionBookingData } from "./suggestionsSlice";

const CardContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100",
  border: `1px solid ${theme.palette.primary.main}`,
  minHeight: "150px",
  aspectRatio: "1",
  maxHeight: "350px",
  borderRadius: "12px",
  overflow: "hidden",
}));

export default function Card({
  booking_main_image,
  booking_title,
  booking_location,
  tag,
}: SuggestionBookingData) {
  console.log(booking_main_image, booking_title, booking_location, tag);
  return <CardContainer>Card</CardContainer>;
}
