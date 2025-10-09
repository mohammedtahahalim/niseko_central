import { Box, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import NisekoCalendar from "../../components/NisekoCalendar";

const QuickReservationWrapper = styled(Box)({
  width: "95vw",
  height: "100%",
  minHeight: "250px",
  maxWidth: "600px",
  paddingTop: "40px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const Title = styled(Typography)({
  textAlign: "center",
  width: "100%",
  fontFamily: "VAGRundschriftD",
  fontSize: "1.5rem",
});

const Description = styled(Typography)({
  textAlign: "center",
  width: "90%",
  fontFamily: "VAGRundschriftD",
  fontSize: "1.3rem",
  alignSelf: "center",
});

const CalendarWrapper = styled(Box)({
  width: "95%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "5px",
  alignSelf: "center",
});

export default function QuickReservation() {
  const { t } = useTranslation();
  return (
    <QuickReservationWrapper>
      <Title variant="h6" color="textColor">
        {t("quick_reservation.title")}
      </Title>
      <Description color="icons">
        {t("quick_reservation.description")}
      </Description>
      <CalendarWrapper>
        <Typography
          variant="subtitle2"
          textTransform={"capitalize"}
          color="textColor"
          fontFamily={"Inter"}
          fontSize={"0.9rem"}
          fontWeight={"700"}
        >
          {t("quick_reservation.select_dates")}
        </Typography>
        <NisekoCalendar />
      </CalendarWrapper>
    </QuickReservationWrapper>
  );
}
