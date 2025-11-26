import { Box, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const InfoSnippetWrapper = styled(Box)({
  padding: "10px 0px",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
});

const InfoPiece = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const Info = styled(Typography)({
  fontWeight: "400",
  fontFamily: "Figtree",
  fontSize: "0.95rem",
});

const Link = styled("a")(({ theme }) => ({
  color: theme.palette.textColor?.main,
  fontSize: "1rem",
}));

export default function InfoSnippet() {
  const { t } = useTranslation();
  return (
    <InfoSnippetWrapper>
      <InfoPiece>
        <Info>{t("contact.snippet.reservation_label")}</Info>
        <Info>
          {t("contact.snippet.reservation")}{" "}
          <Link href="mailto:stay@nisekocentral.com">
            stay@nisekocentral.com
          </Link>
          {"  "}
          <Link href="tel:+81136212558">+81 (0) 136 21 2558</Link>
        </Info>
      </InfoPiece>
      <InfoPiece>
        <Info>{t("contact.snippet.front_desk_label")}</Info>
        <Info>{t("contact.snippet.front_desk")}</Info>
      </InfoPiece>
      <Link
        href="https://www.google.com/maps/place/Niseko+Central/@42.8617846,140.7036263,282m/data=!3m1!1e3!4m9!3m8!1s0x5f0ab00dbc3a74cd:0xa01c4d7a212f8de!5m2!4m1!1i2!8m2!3d42.8610875!4d140.7034242!16s%2Fg%2F11y22sfkhy?entry=tts&g_ep=EgoyMDI1MTAxMy4wIPu8ASoASAFQAw%3D%3D&skid=3fafd808-7066-4cab-88a8-c165d2ccba67"
        target="_blank"
      >
        {t("contact.snippet.address")}
      </Link>
    </InfoSnippetWrapper>
  );
}
