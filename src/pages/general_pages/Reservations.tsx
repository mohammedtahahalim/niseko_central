import { Container, styled } from "@mui/material";
import Title from "../../features/accomodation/Title";
import Filters from "../../features/accomodation/Filters";
import Sorters from "../../features/accomodation/Sorters";
import Bookings from "../../features/accomodation/Bookings";
import LinkTitle from "../../components/LinkTitle";

const ReservationsWrapper = styled(Container)(({ theme }) => ({
  width: "100%",
  height: "100%",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  gap: "9px",
  padding: "1rem",
  backgroundColor: theme.palette.mainbody?.main,
  [theme.breakpoints.down("md")]: {
    padding: "5px",
    gap: "15px",
  },
}));

export default function Reservations() {
  return (
    <ReservationsWrapper maxWidth="xl">
      <LinkTitle />
      <Title />
      <Filters />
      <Sorters />
      <Bookings />
    </ReservationsWrapper>
  );
}
