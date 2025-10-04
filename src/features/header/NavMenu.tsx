import { Box, Button, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Modal from "../modal/Modal";

interface IsNavActive {
  isActive: boolean;
}

const NavMenuWrapper = styled(Box)({
  flex: "1",
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
});

const PlanStayWrapper = styled(Button)({
  borderRadius: "50px",
  minWidth: "200px",
  padding: "8px",
  fontFamily: "Inter",
  display: "flex",
  gap: "8px",
});

const NavElements = styled(Box)({
  flex: "1",
  maxWidth: "550px",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
  padding: "0px 10px",
  gap: "18px",
});

const NavItem = styled(Link, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<IsNavActive>(({ theme, isActive }) => ({
  textDecoration: "none",
  textTransform: "capitalize",
  fontFamily: "Inter",
  fontWeight: "600",
  color: isActive ? theme.palette.primary.main : "inherit",
  fontSize: "1.2rem",
  "&:hover": {
    color: theme.palette.primary.main,
    transition: "color 0.1s ease-in-out",
  },
}));

export default function NavMenu() {
  const { t } = useTranslation();
  const currentPath = useLocation().pathname;
  return (
    <NavMenuWrapper>
      <NavElements>
        {(t("header.nav_menu", { returnObjects: true }) as any[]).map(
          (navItem) => {
            return (
              <NavItem
                key={navItem.path}
                to={navItem.element}
                isActive={currentPath === navItem.element}
              >
                {navItem.path}
              </NavItem>
            );
          }
        )}
      </NavElements>
      <Modal
        trigger={
          <PlanStayWrapper variant="contained" color="primary">
            <CalendarMonthOutlinedIcon fontSize="medium" />
            {t("header.plan_stay")}
          </PlanStayWrapper>
        }
        blurBackground={true}
        fullScreenModal={true}
        br={true}
      >
        <div style={{}}>Test</div>
      </Modal>
    </NavMenuWrapper>
  );
}
