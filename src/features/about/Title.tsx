import { Box, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const TitleWrapper = styled(Box)({
  width: "100%",
  textAlign: "center",
  textTransform: "capitalize",
});

const TitleContent = styled(Typography)({
  fontFamily: "VAGRundschriftD",
});

export default function Title() {
  const { t } = useTranslation();
  return (
    <TitleWrapper>
      <TitleContent variant="h4" color="primary">
        {t("about.title")}
      </TitleContent>
    </TitleWrapper>
  );
}
