import { Box, styled } from "@mui/material";
import PropertyCard from "./PropertyCard";

const BookingsWrapper = styled(Box)({
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
  placeContent: "center",
  gap: "1rem",
});

export default function Bookings() {
  return (
    <BookingsWrapper>
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
    </BookingsWrapper>
  );
}
