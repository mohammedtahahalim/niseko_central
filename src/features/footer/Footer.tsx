import { Box, styled } from "@mui/material";

const FooterWrapper = styled(Box)({
  minHeight: "75px",
  width: "100%",
  border: "1px solid black",
});

export default function Footer() {
  return <FooterWrapper>Footer</FooterWrapper>;
}
