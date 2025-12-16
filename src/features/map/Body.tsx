import { Box, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const BodyWrapper = styled(Box)({
  width: "100%",
});

const BodyText = styled(Typography)({
  fontFamily: "Inter",
  fontStyle: "italic",
});

export default function Body() {
  const { t } = useTranslation();
  return (
    <BodyWrapper>
      <BodyText tabIndex={0}>{t("map.body")}</BodyText>
    </BodyWrapper>
  );
}
