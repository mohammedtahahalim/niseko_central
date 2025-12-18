import { Box, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const TitleContainer = styled(Box)({
  width: "100%",
  textAlign: "center",
  textTransform: "capitalize",
});

const TitleText = styled(Typography)({
  fontFamily: "VAGRundschriftD",
});

export default function Title() {
  const { t } = useTranslation();
  return (
    <TitleContainer>
      <TitleText variant="h4" color="primary">
        {t("cam.title")}
      </TitleText>
    </TitleContainer>
  );
}
