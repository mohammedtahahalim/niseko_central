import { Box, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const BodyWrapper = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
});

const BodyText = styled(Typography)({
  fontSize: "0.9rem",
  fontFamily: "Inter",
  fontWeight: "300",
});

export default function Body() {
  const { t } = useTranslation();
  return (
    <BodyWrapper>
      <BodyText variant="subtitle1">{t("about.body1")}</BodyText>
      <BodyText variant="subtitle1">{t("about.body2")}</BodyText>
    </BodyWrapper>
  );
}
