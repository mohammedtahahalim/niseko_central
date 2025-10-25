import { Box, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const TitleWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "700px",
  alignSelf: "center",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  textAlign: "center",
  padding: "5px",
  [theme.breakpoints.down("md")]: {
    padding: "0px",
  },
}));

const Stay = styled(Typography)(({ theme }) => ({
  fontFamily: "VAGRundschriftD",
  color: theme.palette.textColor?.main,
  fontSize: "1.8rem",
  letterSpacing: "1.5px",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.5rem",
  },
}));

const NisekoIntro = styled(Typography)(({ theme }) => ({
  fontFamily: "Figtree",
  fontStyle: "italic",
  color: theme.palette.icons?.main,
  fontSize: "1.5rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.2rem",
  },
}));

export default function Title() {
  const { t } = useTranslation();
  return (
    <TitleWrapper>
      <Stay variant="h6">{t("accomodation.title.head_title")}</Stay>
      <NisekoIntro variant="h6">{t("accomodation.title.content")}</NisekoIntro>
    </TitleWrapper>
  );
}
