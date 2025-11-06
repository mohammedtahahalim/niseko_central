import { Container, styled } from "@mui/material";
import LinkTitle from "../../features/property/LinkTitle";
import Gallery from "../../features/property/Gallery";

const PropertyContainer = styled(Container)({
  width: "100%",
  minHeight: "100vh",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

export default function Property() {
  return (
    <PropertyContainer disableGutters maxWidth="xl">
      <LinkTitle />
      <Gallery />
    </PropertyContainer>
  );
}
