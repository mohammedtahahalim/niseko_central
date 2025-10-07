import { Box, styled } from "@mui/material";
import SocialLinks from "./SocialLinks";
import Navigation from "./Navigation";

const MenuWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  border: "2px solid white",
  padding: "10px 20px",
  display: "flex",
  gap: "10px",
  [theme.breakpoints.down("nav_break")]: {
    flexDirection: "column-reverse",
  },
}));
export default function Menu() {
  return (
    <MenuWrapper>
      <SocialLinks />
      <Navigation />
    </MenuWrapper>
  );
}
