import { Box, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { useLocation } from "react-router-dom";
import { fetchBookings, setFilter } from "./bookingsSlice";
import { useEffect } from "react";
import PropertySkelton from "./PropertySkelton";
import useSkeltonCount from "./useSkeltonCount";
import Card from "../../components/Card";
import { useTranslation } from "react-i18next";
import Empty from "./Empty";

const BookingsWrapper = styled(Box)({
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
  placeContent: "center",
  placeItems: "center",
  gap: "1rem",
});

export default function Bookings() {
  const location = useLocation().search;
  const queries = Object.fromEntries(new URLSearchParams(location).entries());
  const { displayBookings, loading } = useSelector(
    (state: RootState) => state.bookings
  );
  const dispatch = useDispatch<AppDispatch>();
  const { skeltonCount } = useSkeltonCount();
  const { i18n } = useTranslation();

  useEffect(() => {
    dispatch(fetchBookings(queries));
    const guests =
      Number(queries["adults"]) +
        Number(queries["children"]) +
        Number(queries["infants"]) || 1;
    dispatch(setFilter({ filter: "max_pax", value: guests || 1 }));
  }, [location]);

  return (
    <BookingsWrapper>
      {loading &&
        Array.from({ length: skeltonCount }).map((_, idx) => (
          <PropertySkelton key={idx} />
        ))}
      {displayBookings.length === 0 && <Empty />}
      {!loading &&
        displayBookings.length !== 0 &&
        displayBookings.map((displayBookings) => {
          const { id, images, blurred_images, max_pax, lifts_distance } =
            displayBookings;
          const title =
            displayBookings.translations[
              i18n.language as keyof typeof displayBookings.translations
            ]!.title;
          const type =
            displayBookings.translations[
              i18n.language as keyof typeof displayBookings.translations
            ]!.type;
          return (
            <Card
              key={id}
              id={id}
              images={images}
              blurred_images={blurred_images}
              max_pax={max_pax}
              lifts_distance={lifts_distance}
              title={title}
              type={type}
              tag={Math.floor(Math.random() * 3)}
            />
          );
        })}
    </BookingsWrapper>
  );
}
