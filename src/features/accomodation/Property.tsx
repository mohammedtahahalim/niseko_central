import { Box, styled } from "@mui/material";

const PropertyWrapper = styled(Box)({
  minWidth: "min(100%, 400px)",
  border: "1px solid white",
  aspectRatio: "1",
  borderRadius: "8px",
  overflow: "hidden",
});

export default function Property() {
  return <PropertyWrapper tabIndex={0}>Property</PropertyWrapper>;
}
