import { Box, styled } from "@mui/material";
import LinkTitle from "../../features/accomodation/LinkTitle";
import Title from "../../features/accomodation/Title";
import Categories from "../../features/accomodation/Categories";
import Sorters from "../../features/accomodation/Sorters";
import Bookings from "../../features/accomodation/Bookings";

const ReservationsWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "5px 25px",
  [theme.breakpoints.down("md")]: {
    padding: "5px",
    gap: "15px",
  },
}));

export default function Reservations() {
  return (
    <ReservationsWrapper>
      <LinkTitle />
      <Title />
      <Categories />
      <Sorters />
      <Bookings />
    </ReservationsWrapper>
  );
}
