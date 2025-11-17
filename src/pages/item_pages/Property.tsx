import { Container, styled } from "@mui/material";
import LinkTitle from "../../features/property/LinkTitle";
import Gallery from "../../features/property/Gallery";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchProperty } from "../../features/property/propertySlice";
import { fetchSuggestions } from "../../features/home/suggestions/suggestionsSlice";
import Error from "../../components/Error";
import MainTitle from "../../features/property/MainTitle";
import Info from "../../features/property/Info";
import Description from "../../features/property/Description";
import Suggestions from "../../features/home/suggestions/Suggestions";
import { niceUrl } from "../../utils/Constants";

const PropertyContainer = styled(Container)({
  width: "100%",
  minHeight: "100vh",
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
  const navigate = useNavigate();

  useEffect(() => {
    const property = dispatch(fetchProperty({ id, title }));
    const suggestions = dispatch(fetchSuggestions({ queries: { limit: 5 } }));
    document.title = `${niceUrl(title || "")}`;
    return () => {
      property.abort();
      suggestions.abort();
    };
  }, [id, title]);

  if (shouldRedirect) {
    navigate("/niseko-accommodation", { replace: true });
  }

  if (error) {
    return <Error errorMessage={error} />;
  }

  return (
    <PropertyContainer disableGutters maxWidth="xl">
      <LinkTitle />
      <MainTitle />
      <Gallery />
      <Info />
      <Description />
      <Suggestions />
    </PropertyContainer>
  );
}
