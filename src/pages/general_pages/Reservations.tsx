import { Container, styled } from "@mui/material";
import Filters from "../../features/accomodation/Filters";
import Sorters from "../../features/accomodation/Sorters";
import Bookings from "../../features/accomodation/Bookings";
import LinkTitle from "../../components/LinkTitle";
import Title from "../../components/Title";

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
      <Title page={"accommodation"} />
      <Filters />
      <Sorters />
      <Bookings />
    </ReservationsWrapper>
  );
}
