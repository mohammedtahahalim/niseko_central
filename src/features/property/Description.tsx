import { Box, styled } from "@mui/material";

const DescriptionContainer = styled(Box)({
  width: "90%",
  minHeight: "80px",
  alignSelf: "center",
  border: "1px solid white",
});

export default function Description() {
  return <DescriptionContainer>Description</DescriptionContainer>;
}
