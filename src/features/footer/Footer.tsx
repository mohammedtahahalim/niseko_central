import { Box, styled } from "@mui/material";
import NewsLetter from "../newsletter/NewsLetter";
import Menu from "./Menu";

const FooterWrapper = styled(Box)(({ theme }) => ({
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
    <FooterWrapper>
      <NewsLetter />
      <Menu />
    </FooterWrapper>
  );
}
