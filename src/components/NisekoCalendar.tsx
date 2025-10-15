import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { Box, styled, TextField, Button } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { DatePicker } from "@mantine/dates";
import { MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import {
  setStartDate,
  setEndDate,
} from "../features/quick_calendar/quickReservationSlice";
import { useTranslation } from "react-i18next";
import { convertDate } from "../utils/Constants";
import type { TLanguage } from "../features/languages/changeLanguage";
import { useMediaQuery } from "@mantine/hooks";
import useModal from "../features/modal/useModal";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

const NisekoCalendarWrapper = styled(Box)({
  width: "100%",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const CalendarInput = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& input": {
    paddingLeft: "40px",
    cursor: "pointer",
    fontFamily: "Inter",
    fontSize: "0.9rem",
  },
  "& > div": {
    borderRadius: "12px",
    backgroundColor: theme.palette.hero?.main,
  },
}));

const CalendarIconContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "5px",
  height: "60%",
  translate: "0% -50%",
  aspectRatio: "1",
  zIndex: 9999,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: theme.palette.icons?.main,
}));

const CalendarWrapper = styled(Box)({
  position: "absolute",
  top: "calc(100% + 2px)",
  left: "0%",
  padding: "10px",
  width: "100%",
  zIndex: 9999,
  backgroundColor: "whitesmoke",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "5px",
  "@media (max-height: 800px)": {
    top: "calc(-150% + 2px)",
  },
});

const CloseButton = styled(Button)({
  marginLeft: "auto",
});

const CalendarMotion = motion.create(CalendarWrapper);

export default function NisekoCalendar() {
  const { isOpen, openModal, modalRef, parentRef, closeModal } = useModal<
    HTMLDivElement,
    HTMLDivElement
  >();
  const { start_date, end_date } = useSelector(
    (state: RootState) => state.quickReservation
  );
  const dispatch = useDispatch<AppDispatch>();
  const { i18n, t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <MantineProvider>
      <DatesProvider settings={{ locale: i18n.language, firstDayOfWeek: 0 }}>
        <NisekoCalendarWrapper>
          <Box sx={{ width: "80%", height: "100%", position: "relative" }}>
            <CalendarInput
              type="text"
              value={`${convertDate(
                new Date(start_date),
                i18n.language as TLanguage
              )} - ${
                end_date
                  ? convertDate(new Date(end_date), i18n.language as TLanguage)
                  : "..."
              }`}
              ref={parentRef}
              InputProps={{
                readOnly: true,
              }}
              onClick={openModal}
            />
            <CalendarIconContainer>
              <CalendarMonthOutlinedIcon fontSize="small" color="inherit" />
            </CalendarIconContainer>
          </Box>
          <AnimatePresence>
            {isOpen && (
              <CalendarMotion
                ref={modalRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <DatePicker
                  type="range"
                  numberOfColumns={isMobile ? 1 : 2}
                  value={[start_date, end_date]}
                  onChange={([start, end]) => {
                    dispatch(setStartDate(start as string));
                    dispatch(setEndDate(end as string));
                  }}
                ></DatePicker>
                <CloseButton
                  variant="contained"
                  size="small"
                  onClick={closeModal}
                >
                  {t("quick_reservation.close")}
                </CloseButton>
              </CalendarMotion>
            )}
          </AnimatePresence>
        </NisekoCalendarWrapper>
      </DatesProvider>
    </MantineProvider>
  );
}
