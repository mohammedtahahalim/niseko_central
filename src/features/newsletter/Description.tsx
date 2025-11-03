import { Box, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const DescriptionWrapper = styled(Box)({
  width: "100%",
  maxWidth: "650px",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  alignItems: "center",
  textAlign: "center",
  padding: "10px",
});

const Title = styled(Typography)(({ theme }) => ({
  fontFamily: "VAGRundschriftD",
  lineHeight: "2.25rem",
  fontSize: "1.875rem",
  color: theme.palette.textColor?.main,
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  textTransform: "capitalize",
  fontFamily: "Segoe UI",
  color: theme.palette.textColor?.main,
  fontWeight: "300",
}));

export default function Description() {
  const { t } = useTranslation();
  return (
    <DescriptionWrapper>
      <Title variant="h5">{t("footer.newsletter.title")}</Title>
      <Subtitle variant="body1" tabIndex={0}>
        {t("footer.newsletter.subtitle")}
      </Subtitle>
    </DescriptionWrapper>
  );
}
