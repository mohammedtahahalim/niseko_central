import { Box, styled } from "@mui/material";

const NavigationWrapper = styled(Box)({
  flex: "1",
  width: "100%",
  border: "1px solid black",
});

export default function Navigation() {
  return <NavigationWrapper>Navigation</NavigationWrapper>;
}
