import { Box, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const EmptyWrapper = styled(Box)({
  width: "100%",
  maxWidth: "750px",
  minHeight: "250px",
  padding: "40px 10px",
  display: "flex",
  justifyContent: "center",
  textAlign: "center",
});

const Message = styled(Typography)(({ theme }) => ({
  fontFamily: "Source Code Pro",
  fontSize: "1.3rem",
  color: theme.palette.error.main,
  fontStyle: "italic",
  fontWeight: "bold",
  textTransform: "capitalize",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.1rm",
  },
}));

export default function Empty() {
  const { t } = useTranslation();
  return (
    <EmptyWrapper>
      <Message variant="h6">{t("accommodation.empty")} ...</Message>
    </EmptyWrapper>
  );
}
