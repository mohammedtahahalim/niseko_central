import { Container, styled, Box } from "@mui/material";
import LinkTitle from "../../components/LinkTitle";

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
  gap: "20px",
  margin: "0 auto",
});

export default function Live() {
  return (
    <LiveContainer>
      <LinkTitle />
    </LiveContainer>
  );
}
