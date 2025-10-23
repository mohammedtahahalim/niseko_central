import { styled } from "@mui/material";
import NewsLetter from "../newsletter/NewsLetter";
import Menu from "./Menu";
import Copyrights from "./Copyrights";

const FooterWrapper = styled("footer")(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.headfoot?.main,
  borderTop: `1px solid ${theme.palette.divider}`,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
}));

export default function Footer() {
  return (
    <FooterWrapper role="contentinfo">
      <NewsLetter />
      <Menu />
      <Copyrights />
    </FooterWrapper>
  );
}
