import { Box, styled } from "@mui/material";
import LinkTitle from "../../features/accomodation/LinkTitle";
import Title from "../../features/accomodation/Title";
import Filters from "../../features/accomodation/Filters";
import Sorters from "../../features/accomodation/Sorters";
import Bookings from "../../features/accomodation/Bookings";

const ReservationsWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  gap: "9px",
  padding: "5px 25px",
  backgroundColor: theme.palette.mainbody?.main,
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
      <Filters />
      <Sorters />
      <Bookings />
    </ReservationsWrapper>
  );
}
