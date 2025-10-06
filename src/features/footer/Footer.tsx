import { Box, styled } from "@mui/material";
import NewsLetter from "../newsletter/NewsLetter";

const FooterWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.headfoot?.main,
  borderTop: `1px solid ${theme.palette.divider}`,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export default function Footer() {
  return (
    <FooterWrapper>
      <NewsLetter />
    </FooterWrapper>
  );
}
