import { Box, styled } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import useScroll from "./useScroll";
import SubHeader from "./SubHeader";
import NavMenu from "./NavMenu";

const MainHeaderWrapper = styled(Box)(({ theme }) => ({
  flex: "1",
  height: "100%",
  maxWidth: "75%",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("nav_break")]: {
    display: "none",
  },
}));

const SubHeaderMotion = motion.create(SubHeader);

export default function MainHeader() {
  const { isScrolling } = useScroll();
  return (
    <MainHeaderWrapper role="navigation" aria-label="Navigation Menu">
      <AnimatePresence>
        {!isScrolling && (
          <SubHeaderMotion
            initial={{ height: "30px" }}
            animate={{ height: "0px" }}
            exit={{ height: "0px" }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
      <NavMenu />
    </MainHeaderWrapper>
  );
}
