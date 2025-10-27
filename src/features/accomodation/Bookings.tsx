import { Box, styled } from "@mui/material";
import Property from "./Property";

const BookingsWrapper = styled(Box)({
  width: "100%",
  padding: "15px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
  placeContent: "center",
  gap: "1rem",
});

export default function Bookings() {
  return (
    <BookingsWrapper>
      <Property />
      <Property />
      <Property />
      <Property />
      <Property />
      <Property />
      <Property />
    </BookingsWrapper>
  );
}
