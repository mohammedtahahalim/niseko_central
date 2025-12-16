import { Box, Container, styled } from "@mui/material";
import LinkTitle from "../../components/LinkTitle";
import Suggestions from "../../features/suggestions/Suggestions";
import Title from "../../features/general_information/Title";
import Subtitle from "../../features/general_information/Subtitle";
import Content from "../../features/general_information/Content";

const GeneralContainer = styled(Container)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  padding: "1rem",
  backgroundColor: theme.palette.mainbody?.main,
  [theme.breakpoints.down("md")]: {
    padding: "5px",
    gap: "15px",
  },
}));

const GeneralWrapper = styled(Box)({
  width: "100%",
  maxWidth: "900px",
  display: "flex",
  flexDirection: "column",
  gap: "40px",
  margin: "0 auto",
  minHeight: "100vh",
});

export default function GeneralInformation() {
  return (
    <GeneralContainer maxWidth="xl">
      <LinkTitle />
      <GeneralWrapper>
        <Title />
        <Subtitle />
        <Content />
      </GeneralWrapper>
      <Suggestions />
    </GeneralContainer>
  );
}
