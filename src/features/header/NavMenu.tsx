import { Box, styled } from "@mui/material";

const NavMenuWrapper = styled(Box)({
  flex: "1",
  width: "100%",
  border: "1px solid black",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
});

export default function NavMenu() {
  return <NavMenuWrapper>NavMenu</NavMenuWrapper>;
}
