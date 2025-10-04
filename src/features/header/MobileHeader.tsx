import { Box, styled } from "@mui/material";

const MobileHeaderWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  border: "1px solid black",
});

export default function MobileHeader() {
  return <MobileHeaderWrapper>DesktopHeader</MobileHeaderWrapper>;
}
