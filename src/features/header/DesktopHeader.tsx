import { Box, styled } from "@mui/material";

const DesktopHeaderWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  border: "1px solid black",
});

export default function DesktopHeader() {
  return <DesktopHeaderWrapper>DesktopHeader</DesktopHeaderWrapper>;
}
