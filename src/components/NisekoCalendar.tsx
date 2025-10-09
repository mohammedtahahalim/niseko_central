import { Box, styled, TextField } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import useModal from "../features/modal/useModal";

interface NisekoCalendarProps {
  calendarType?: "single" | "double";
  withInput?: boolean;
}

const NisekoCalendarWrapper = styled(Box)({
  width: "100%",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const CalendarInput = styled(TextField)(({ theme }) => ({
  width: "90%",
  "& input": {
    paddingLeft: "40px",
    cursor: "pointer",
  },
  "& > div": {
    borderRadius: "12px",
    backgroundColor: theme.palette.hero?.main,
  },
}));

const CalendarWrapper = styled(Box)({
  position: "absolute",
  top: "calc(100% + 2px)",
  left: "5%",
  padding: "10px",
  border: "1px solid black",
  width: "90%",
  zIndex: 9999,
  backgroundColor: "whitesmoke",
});

const CalendarMotion = motion.create(CalendarWrapper);

export default function NisekoCalendar({
  calendarType = "double",
  withInput = true,
}: NisekoCalendarProps) {
  const { isOpen, openModal, modalRef, parentRef } = useModal<
    HTMLDivElement,
    HTMLDivElement
  >();
  return (
    <NisekoCalendarWrapper>
      {withInput && (
        <CalendarInput
          type="text"
          value={"Test"}
          ref={parentRef}
          InputProps={{
            readOnly: true,
          }}
          onClick={openModal}
        />
      )}
      <AnimatePresence>
        {withInput && isOpen && (
          <CalendarMotion
            ref={modalRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            Test
          </CalendarMotion>
        )}
      </AnimatePresence>
      {!withInput && <div>calendar</div>}
    </NisekoCalendarWrapper>
  );
}
