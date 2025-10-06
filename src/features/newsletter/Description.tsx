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

const Title = styled(Typography)({
  fontFamily: "Segoe UI",
  fontWeight: "800",
  letterSpacing: "1.1px",
  lineClamp: "1rem",
});

const Subtitle = styled(Typography)({
  textTransform: "capitalize",
  fontFamily: "Inter",
  letterSpacing: "1px",
  lineClamp: "1rem",
});

export default function Description() {
  const { t } = useTranslation();
  return (
    <DescriptionWrapper>
      <Title variant="h5">{t("footer.newsletter.title")}</Title>
      <Subtitle variant="body1">{t("footer.newsletter.subtitle")}</Subtitle>
    </DescriptionWrapper>
  );
}
