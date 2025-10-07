import { Box, styled, Button } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Modal from "../features/modal/Modal";
import { useTranslation } from "react-i18next";

const PlanWrapper = styled(Box)(({ theme }) => ({
  display: "none",
  position: "sticky",
  width: "100%",
  top: "calc(100vh - 65px)",
  [theme.breakpoints.down("nav_break")]: {
    display: "flex",
    justifyContent: "center",
    padding: "10px",
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
  return (
    <PlanWrapper>
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
        <div style={{}}>Test</div>
      </Modal>
    </PlanWrapper>
  );
}
