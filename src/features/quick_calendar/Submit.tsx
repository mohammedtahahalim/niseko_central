import { Box, Button, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { submitReservation } from "./quickReservationSlice";

const SubmitWrapper = styled(Box)({
  alignSelf: "center",
});

const SubmitButton = styled(Button)({
  borderRadius: "50px",
  fontFamily: "VAGRundschriftD",
  fontSize: "1rem",
  padding: "10px 30px",
  letterSpacing: "1.4px",
});

export default function Submit() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  return (
    <SubmitWrapper>
      <SubmitButton
        variant="contained"
        size="large"
        onClick={() => dispatch(submitReservation())}
      >
        {t("quick_reservation.search")}
      </SubmitButton>
    </SubmitWrapper>
  );
}
