import { Box, styled } from "@mui/material";
import { useTranslation } from "react-i18next";

const SubscribedWrapper = styled(Box)(({ theme }) => ({
  color: theme.palette.success.main,
  fontFamily: "VAGRundschriftD",
  fontStyle: "italic",
  padding: "18px",
  fontSize: "1.1rem",
  maxWidth: "550px",
  alignSelf: "center",
  textAlign: "center",
}));

export default function Subscribed() {
  const { t } = useTranslation();
  return (
    <SubscribedWrapper>
      {t("footer.newsletter.form.subsribed_message")}
    </SubscribedWrapper>
  );
}
