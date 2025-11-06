import { Container, styled } from "@mui/material";

const PropertyContainer = styled(Container)({
  width: "100%",
  minHeight: "100vh",
  border: "1px solid white",
});

export default function Property() {
  return (
    <PropertyContainer disableGutters maxWidth="xl">
      Property
    </PropertyContainer>
  );
}
