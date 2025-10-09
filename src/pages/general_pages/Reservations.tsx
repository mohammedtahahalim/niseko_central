import { useLocation } from "react-router-dom";

export default function Reservations() {
  const queries = new URLSearchParams(useLocation().search);
  console.log(queries.get("adults"));
  return <div>Reservations</div>;
}
