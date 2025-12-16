import { Box, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const SubtitleWrapper = styled(Box)({
  width: "100%",
});

const SubtitleText = styled(Typography)(({ theme }) => ({
  fontFamily: "Inter",
  fontSize: "1.1rem",
  fontWeight: "bold",
  color: theme.palette.icons?.main,
}));

export default function Subtitle() {
  const { t } = useTranslation();
  return (
    <SubtitleWrapper>
      <SubtitleText variant="subtitle1" tabIndex={0}>
        {t("niseko-information.subtitle")}
      </SubtitleText>
    </SubtitleWrapper>
  );
}
