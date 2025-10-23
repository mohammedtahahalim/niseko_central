import { Box, styled } from "@mui/material";
import Logo from "./Logo";
import SubAuth from "../auth/SubAuth";
import Languages from "../languages/Languages";
import ThemeComp from "../../components/ThemeComp";
import LineSeparator from "../../components/LineSeparator";
import { useTranslation } from "react-i18next";
import type { MobileMenuItemType } from "../../utils/Types";
import MobileMenuItem from "./MobileMenuItem";

const MobileHeaderWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

const LogoWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "75px",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const MainMenuWrapper = styled(Box)({
  width: "100%",
  flex: "1",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridTemplateRows: "repeat(2, 1fr)",
  gap: "10px",
  maxHeight: "calc(100vh - 125px)",
});

const ControlWrapper = styled(Box)(({ theme }) => ({
  height: "50px",
  width: "100%",
  color: theme.palette.icons?.main,
  padding: "0px 25px",
  borderTop: `1px solid ${theme.palette.divider}`,
  display: "flex",
  justifyContent: "space-between",
}));

const UIControlWrapper = styled(Box)({
  height: "100%",
  display: "flex",
  alignItems: "center",
  gap: "10px",
});

const MenuDivision = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "10px",
});

export default function MobileHeader() {
  const { t } = useTranslation();
  return (
    <MobileHeaderWrapper>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <MainMenuWrapper role="navigation">
        {(
          t("header.mobile_nav_menu", {
            returnObjects: true,
          }) as MobileMenuItemType[]
        ).map((structurePath: MobileMenuItemType) => {
          return (
            <MenuDivision key={structurePath.path}>
              <MobileMenuItem
                path={structurePath.path}
                element={structurePath.element}
                children={structurePath.children}
              />
            </MenuDivision>
          );
        })}
      </MainMenuWrapper>
      <ControlWrapper>
        <SubAuth h={25} />
        <UIControlWrapper>
          <ThemeComp />
          <LineSeparator dir={"v"} h={40} w={1} />
          <Languages />
        </UIControlWrapper>
      </ControlWrapper>
    </MobileHeaderWrapper>
  );
}
