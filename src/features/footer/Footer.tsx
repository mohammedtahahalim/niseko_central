import { styled, Container } from "@mui/material";
import NewsLetter from "../newsletter/NewsLetter";
import Menu from "./Menu";
import Copyrights from "./Copyrights";

const FooterWrapper = styled("footer")(({ theme }) => ({
  width: "100vw",
  backgroundColor: theme.palette.headfoot?.main,
  borderTop: `1px solid ${theme.palette.divider}`,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
}));

const FooterContainer = styled(Container)(({ theme }) => ({
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
  overflow: "hidden",
  [theme.breakpoints.down("nav_break")]: {
    justifyContent: "center",
  },
}));

export default function Footer() {
  return (
    <FooterWrapper role="contentinfo">
      <FooterContainer maxWidth={"xl"}>
        <NewsLetter />
        <Menu />
        <Copyrights />
      </FooterContainer>
    </FooterWrapper>
  );
}
