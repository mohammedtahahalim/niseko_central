import { Box, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const WelcomeWrapper = styled(Box)({
  width: "100%",
});

const WelcomeText = styled(Typography)({
  fontFamily: "Figtree",
  fontWeight: "bold",
});

export default function Welcome() {
  const { t } = useTranslation();
  return (
    <WelcomeWrapper>
      <WelcomeText variant="subtitle1">{t("map.welcome")}</WelcomeText>
    </WelcomeWrapper>
  );
}
