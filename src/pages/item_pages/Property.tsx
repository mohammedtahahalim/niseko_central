import { Container, styled } from "@mui/material";
import Gallery from "../../features/property/Gallery";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchProperty } from "../../features/property/propertySlice";
import { fetchSuggestions } from "../../features/suggestions/suggestionsSlice";
import Error from "../../components/Error";
import MainTitle from "../../features/property/MainTitle";
import Info from "../../features/property/Info";
import Description from "../../features/property/Description";
import Suggestions from "../../features/suggestions/Suggestions";
import LinkTitle from "../../components/LinkTitle";

const PropertyContainer = styled(Container)({
  width: "100%",
  minHeight: "100%",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

export default function Property() {
  const { id, title } = useParams();
  const { error, shouldRedirect } = useSelector(
    (state: RootState) => state.property
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const property = dispatch(fetchProperty({ id, title }));
    const suggestions = dispatch(fetchSuggestions({ queries: { limit: 5 } }));
    return () => {
      property.abort();
      suggestions.abort();
    };
  }, [id, title]);

  if (shouldRedirect) return <Navigate to={"/404"} replace={true} />;

  if (error) {
    return <Error errorMessage={error} />;
  }

  return (
    <PropertyContainer maxWidth="xl">
      <LinkTitle />
      <MainTitle />
      <Gallery />
      <Info />
      <Description />
      <Suggestions />
    </PropertyContainer>
  );
}
