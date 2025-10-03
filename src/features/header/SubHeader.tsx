import { Box, styled } from "@mui/material";

const SubHeaderWrapper = styled(Box)({
  border: "1px solid black",
  width: "100%",
  height: "40px",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
});

export default function SubHeader() {
  return <SubHeaderWrapper>SubHeader</SubHeaderWrapper>;
}
