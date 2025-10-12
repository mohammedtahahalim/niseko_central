import { useLocation } from "react-router-dom";

export default function Reservations() {
  const queries = new URLSearchParams(useLocation().search);
  console.log(queries);
  return <div>Reservations</div>;
}
