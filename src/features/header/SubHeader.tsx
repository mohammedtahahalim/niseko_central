import { Box, styled } from "@mui/material";
import Languages from "../languages/Languages";
import SubAuth from "../auth/SubAuth";
import ThemeComp from "../../components/ThemeComp";

const SubHeaderWrapper = styled(Box)({
  border: "1px solid black",
  width: "100%",
  height: "40px",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "10px",
});

export default function SubHeader() {
  return (
    <SubHeaderWrapper>
      <ThemeComp />
      <SubAuth />
      <Languages />
    </SubHeaderWrapper>
  );
}
