import { Button, styled } from "@mui/material";
import { useTranslation } from "react-i18next";

const PDFButton = styled(Button)({
  width: "fit-content",
  borderRadius: "50px",
  padding: "15px 30px",
  fontWeight: "bold",
});

export default function Pdf() {
  const { t } = useTranslation();
  return (
    <PDFButton
      variant="outlined"
      color="primary"
      href="https://d1z517741srsht.cloudfront.net/maps/250611_NC_propertiesMap_EN.pdf"
    >
      {t("map.pdf")}
    </PDFButton>
  );
}
