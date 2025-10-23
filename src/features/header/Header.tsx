import { Box, styled, alpha, Container } from "@mui/material";
import useScroll from "./useScroll";
import Logo from "./Logo";
import MenuIcon from "@mui/icons-material/Menu";
import Modal from "../modal/Modal";
import MainHeader from "./MainHeader";
import MobileHeader from "./MobileHeader";

interface OnScrollProp {
  isScrolling: boolean;
}

const HeaderWrapper = styled("header", {
  shouldForwardProp: (prop) => prop !== "isScrolling",
})<OnScrollProp>(({ theme, isScrolling }) => ({
  width: "100%",
  height: isScrolling ? "75px" : "115px",
  backgroundColor: isScrolling
    ? alpha(theme.palette.headfoot?.main || "", 0.9)
    : theme.palette.headfoot?.main,
  position: "fixed",
  top: "0",
  left: "0",
  borderBottom: `1px solid ${theme.palette.divider}`,
  transition: "height 0.2s linear",
  zIndex: 9999,
}));

const HeaderContainer = styled(Container)(({ theme }) => ({
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  overflow: "hidden",
  [theme.breakpoints.down("nav_break")]: {
    justifyContent: "center",
  },
}));

const MenuBarWrapper = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("nav_break")]: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    left: "0",
    translate: "0% -50%",
    cursor: "pointer",
    padding: "5px",
    height: "65%",
    aspectRatio: "1",
  },
}));
export default function Header() {
  const { isScrolling } = useScroll();

  return (
    <HeaderWrapper isScrolling={isScrolling} role="banner">
      <HeaderContainer maxWidth={"xl"}>
        <Modal
          trigger={
            <MenuBarWrapper>
              <MenuIcon fontSize="large" />
            </MenuBarWrapper>
          }
          fullScreenWrapper={true}
          disableScroll={true}
        >
          <MobileHeader />
        </Modal>
        <Logo />
        <MainHeader />
      </HeaderContainer>
    </HeaderWrapper>
  );
}
