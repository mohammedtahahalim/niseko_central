import { styled, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const SubtitleWrapper = styled(Box)({
  width: "100%",
});

const SubtitleText = styled(Typography)(({ theme }) => ({
  fontFamily: "Figtree",
  fontWeight: "bold",
  color: theme.palette.icons?.main,
}));

export default function Subtitle() {
  const { t } = useTranslation();
  return (
    <SubtitleWrapper>
      <SubtitleText variant="h6">{t("cam.subtitle")}</SubtitleText>
    </SubtitleWrapper>
  );
}
