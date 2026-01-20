import { Box, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { Navigate, useLocation } from "react-router-dom";
import { fetchBookings, setFilter } from "./bookingsSlice";
import { useEffect } from "react";
import PropertySkelton from "./PropertySkelton";
import useSkeltonCount from "./useSkeltonCount";
import Card from "../../components/Card";
import { useTranslation } from "react-i18next";
import Empty from "./Empty";

const propertyTypes: Record<string, number> = {
  allPropertyTypes: 0,
  condominiums: 5,
  "resort-homes": 6,
  premierCollection: 7,
};

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
  const { displayBookings, loading, shouldRedirect } = useSelector(
    (state: RootState) => state.bookings,
  );
  const dispatch = useDispatch<AppDispatch>();
  const { skeltonCount } = useSkeltonCount();
  const { i18n } = useTranslation();

  useEffect(() => {
    const bookings = dispatch(fetchBookings(queries));
    const guests =
      Number(queries["adults"]) +
        Number(queries["children"]) +
        Number(queries["infants"]) || 1;
    dispatch(setFilter({ filter: "max_pax", value: guests || 1 }));
    const propertyType = queries["propertyType"];
    if (propertyType && propertyType in propertyTypes) {
      dispatch(
        setFilter({ filter: "type", value: propertyTypes[propertyType] }),
      );
    }
    return () => {
      bookings.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, dispatch]);

  if (shouldRedirect)
    return <Navigate to={"/niseko-accommodation"} replace={true} />;

  return (
    <BookingsWrapper>
      {loading &&
        Array.from({ length: skeltonCount }).map((_, idx) => (
          <PropertySkelton key={idx} />
        ))}
      {!loading && displayBookings.length === 0 && <Empty />}
      {!loading &&
        displayBookings.length !== 0 &&
        displayBookings.map((displayBookings) => {
          const { id, image, blurred_image, max_pax, lifts_distance } =
            displayBookings;
          const langData =
            displayBookings[i18n.language as keyof typeof displayBookings];
          const title =
            typeof langData === "object" && langData !== null
              ? langData.title
              : "";
          const type =
            typeof langData === "object" && langData !== null
              ? langData.type
              : "";
          return (
            <Card
              key={id}
              id={id}
              image={image}
              blurred_image={blurred_image}
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
