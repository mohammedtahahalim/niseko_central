import { Box, styled, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { setAdults, setChildren, setInfants } from "./quickReservationSlice";

const GuestsContainer = styled(Box)({
  width: "80%",
  alignSelf: "center",
  display: "flex",
  gap: "5px",
});

const FieldWrapper = styled(Box)({
  flex: "1",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

const StyledLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.textColor?.main,
  alignSelf: "center",
  fontFamily: "Inter",
  fontStyle: "italic",
}));

const StyledTextField = styled(TextField)({
  width: "100%",
  flex: "1",
});

export default function Guests() {
  const { t } = useTranslation();
  const { adults, children, infants } = useSelector(
    (state: RootState) => state.quickReservation
  );
  const dispatch = useDispatch<AppDispatch>();
  return (
    <GuestsContainer>
      <FieldWrapper>
        <StyledLabel variant="body2">
          {t("quick_reservation.adults")}
        </StyledLabel>
        <StyledTextField
          type="number"
          value={adults}
          onChange={(e) => dispatch(setAdults(Number(e.target.value)))}
        />
      </FieldWrapper>
      <FieldWrapper>
        <StyledLabel variant="body2">
          {t("quick_reservation.children")}
        </StyledLabel>
        <StyledTextField
          type="number"
          value={children}
          onChange={(e) => dispatch(setChildren(Number(e.target.value)))}
        />
      </FieldWrapper>
      <FieldWrapper>
        <StyledLabel variant="body2">
          {t("quick_reservation.infants")}
        </StyledLabel>
        <StyledTextField
          type="number"
          value={infants}
          onChange={(e) => dispatch(setInfants(Number(e.target.value)))}
        />
      </FieldWrapper>
    </GuestsContainer>
  );
}
