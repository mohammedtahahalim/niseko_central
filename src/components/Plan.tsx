import { useRef, useState, useEffect } from "react";
import { Box, styled, Button } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Modal from "../features/modal/Modal";
import QuickReservation from "../features/quick_calendar/QuickReservation";
import { useTranslation } from "react-i18next";

const PlanWrapper = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("nav_break")]: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    zIndex: 8888,
    transition: "top 0.2s ease",
  },
}));

const PlanStayWrapper = styled(Button)({
  borderRadius: "50px",
  minWidth: "200px",
  padding: "5px 30px",
  fontFamily: "VAGRundschriftD",
  lineHeight: "2.25rem",
  fontSize: "1.1rem",
  display: "flex",
  gap: "8px",
});

export default function Plan() {
  const { t } = useTranslation();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [fixed, setFixed] = useState(true);
  const [offsetTop, setOffsetTop] = useState(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const parent = wrapper.parentElement;
    if (!parent) return;
    const handleScroll = () => {
      const parentBottom = parent.getBoundingClientRect().bottom;
      const viewportHeight = window.innerHeight;
      if (parentBottom <= viewportHeight) {
        setFixed(false);
        setOffsetTop(parentBottom - wrapper.offsetHeight);
      } else {
        setFixed(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <PlanWrapper
      ref={wrapperRef}
      sx={{
        position: fixed ? "fixed" : "",
        bottom: fixed ? "0px" : "auto",
        top: fixed ? "auto" : offsetTop,
        paddingBottom: fixed ? "15px" : "25px",
      }}
    >
      <Modal
        trigger={
          <PlanStayWrapper variant="contained" color="primary">
            <CalendarMonthOutlinedIcon fontSize="medium" />
            {t("header.plan_stay")}
          </PlanStayWrapper>
        }
        blurBackground={true}
        disableScroll={false}
        br={true}
      >
        <QuickReservation />
      </Modal>
    </PlanWrapper>
  );
}
