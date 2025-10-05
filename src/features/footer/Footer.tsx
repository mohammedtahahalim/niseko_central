import { Box, styled } from "@mui/material";

const FooterWrapper = styled(Box)(({ theme }) => ({
  minHeight: "75px",
  width: "100%",
  backgroundColor: theme.palette.headfoot?.main,
  borderTop: `1px solid ${theme.palette.divider}`,
}));

export default function Footer() {
  return <FooterWrapper>Footer</FooterWrapper>;
}
