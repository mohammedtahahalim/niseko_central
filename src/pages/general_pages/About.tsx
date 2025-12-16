import { Box, Container, styled } from "@mui/material";
import LinkTitle from "../../components/LinkTitle";
import Title from "../../features/about/Title";
import Subtitle from "../../features/about/Subtitle";
import Body from "../../features/about/Body";
import Mission from "../../features/about/Mission";
import Suggestions from "../../features/suggestions/Suggestions";

const AboutContainer = styled(Container)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "25px",
  padding: "1rem",
  backgroundColor: theme.palette.mainbody?.main,
  [theme.breakpoints.down("md")]: {
    padding: "5px",
    gap: "15px",
  },
}));

const AboutWrapper = styled(Box)({
  width: "100%",
  maxWidth: "900px",
  display: "flex",
  flexDirection: "column",
  gap: "30px",
  margin: "0 auto",
});

export default function About() {
  return (
    <AboutContainer maxWidth="xl">
      <LinkTitle />
      <AboutWrapper>
        <Title />
        <Subtitle />
        <Body />
        <Mission />
      </AboutWrapper>
      <Suggestions />
    </AboutContainer>
  );
}
