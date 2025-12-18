import { styled, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const ContentWrapper = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const ContentText = styled(Typography)({
  fontFamily: "Inter",
  fontStyle: "italic",
  fontSize: "0.9rem",
});

const CustomLink = styled("a")(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export default function Content() {
  const { t } = useTranslation();
  return (
    <ContentWrapper>
      <ContentText variant="subtitle1" tabIndex={0}>
        {t("cam.content1")}
      </ContentText>
      <ContentText variant="subtitle1" tabIndex={0}>
        {t("cam.content2")}{" "}
        <CustomLink
          href="https://www.instagram.com/nisekocentral/"
          target="_blank"
        >
          #nisekocentral
        </CustomLink>{" "}
        {t("cam.instagram")}
      </ContentText>
    </ContentWrapper>
  );
}
