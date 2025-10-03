import { Box, styled, alpha } from "@mui/material";
import useScroll from "./useScroll";
import Logo from "./Logo";
import MenuIcon from "@mui/icons-material/Menu";
import Modal from "../modal/Modal";

interface OnScrollProp {
  isScrolling: boolean;
}

const HeaderWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isScrolling",
})<OnScrollProp>(({ theme, isScrolling }) => ({
  height: isScrolling ? "75px" : "115px",
  width: "100%",
  backgroundColor: isScrolling
    ? alpha(theme.palette.headfoot?.main || "", 0.9)
    : theme.palette.headfoot?.main,
  borderBottom: `1px solid ${theme.palette.divider}`,
  transition: "height 0.2s linear",
  position: "fixed",
  top: "0",
  left: "0",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  overflow: "hidden",
  padding: "0px 25px",
  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
  },
}));

const MenuBarWrapper = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
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
    <HeaderWrapper isScrolling={isScrolling}>
      <Modal
        trigger={
          <MenuBarWrapper>
            <MenuIcon fontSize="large" color="secondary" />
          </MenuBarWrapper>
        }
        fullScreenModal={true}
        fullScreenWrapper={true}
      >
        <div>Test</div>
      </Modal>
      <Logo />
    </HeaderWrapper>
  );
}
