import { Box, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const SubtitleWrapper = styled(Box)({
  width: "100%",
});

const SubtitleText = styled(Typography)(({ theme }) => ({
  color: theme.palette.icons?.main,
  fontStyle: "italic",
  fontSize: "1.1rem",
  fontWeight: "500",
  fontFamily: "Inter",
}));

export default function Subtitle() {
  const { t } = useTranslation();
  return (
    <SubtitleWrapper>
      <SubtitleText variant="body1">{t("about.subtitle")}</SubtitleText>
    </SubtitleWrapper>
  );
}
