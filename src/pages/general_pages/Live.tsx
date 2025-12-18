import { Container, styled, Box } from "@mui/material";
import LinkTitle from "../../components/LinkTitle";
import Title from "../../features/webcam/Title";
import Subtitle from "../../features/webcam/Subtitle";
import Content from "../../features/webcam/Content";
import Cam from "../../features/webcam/Cam";

const LiveContainer = styled(Container)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "9px",
  minHeight: "100vh",
  padding: "1rem",
  backgroundColor: theme.palette.mainbody?.main,
  [theme.breakpoints.down("md")]: {
    padding: "5px",
    gap: "15px",
  },
}));

const LiveWrapper = styled(Box)({
  width: "100%",
  maxWidth: "900px",
  display: "flex",
  flexDirection: "column",
  gap: "40px",
  margin: "0 auto",
  minHeight: "100vh",
});

export default function Live() {
  return (
    <LiveContainer maxWidth="xl">
      <LinkTitle />
      <LiveWrapper>
        <Title />
        <Subtitle />
        <Content />
        <Cam />
      </LiveWrapper>
    </LiveContainer>
  );
}
