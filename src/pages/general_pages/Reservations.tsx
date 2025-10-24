import { Box, styled } from "@mui/material";
import { useLocation } from "react-router-dom";

const ReservationsWrapper = styled(Box)({});

export default function Reservations() {
  const queries = new URLSearchParams(useLocation().search);
  console.log(queries);
  return <ReservationsWrapper>Reservations</ReservationsWrapper>;
}
