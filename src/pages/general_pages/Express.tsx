import { Box, styled, Container, Typography } from "@mui/material";
import LinkTitle from "../../components/LinkTitle";
import Suggestions from "../../features/suggestions/Suggestions";
import { useTranslation } from "react-i18next";

const ExpressContainer = styled(Container)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "25px",
  padding: "1rem",
  backgroundColor: theme.palette.mainbody?.main,
  [theme.breakpoints.down("md")]: {
    padding: "5px",
    gap: "15px",
  },
}));

const ExpressWrapper = styled(Box)({
  width: "100%",
  maxWidth: "900px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  margin: "0 auto",
});

const TitleWrapper = styled(Box)({
  width: "100%",
  textAlign: "center",
});

const TitleText = styled(Typography)({
  fontFamily: "VAGRundschriftD",
});

const SubtitleWrapper = styled(Box)({
  width: "100%",
});

const SubtitleText = styled(Typography)({
  fontFamily: "Inter",
  textTransform: "capitalize",
  "& a": {
    color: "inherit",
    textDecoration: "none",
    fontSize: "0.9rem",
    textTransform: "lowercase",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

const EmbeddedForm = styled(Box)({
  width: "100%",
});

export default function Express() {
  const { t } = useTranslation();
  return (
    <ExpressContainer maxWidth="xl">
      <LinkTitle />
      <ExpressWrapper>
        <TitleWrapper>
          <TitleText variant="h4" color="primary">
            {t("express.title")}
          </TitleText>
        </TitleWrapper>
        <SubtitleWrapper>
          <SubtitleText variant="body1">
            {t("express.subtitle")}{" "}
            <a
              href="https://htmniseko.wufoo.eu/forms/express-checkin-form/"
              target="_blank"
            >
              https://htmniseko.wufoo.eu/forms/express-checkin-form/
            </a>
          </SubtitleText>
        </SubtitleWrapper>
        <EmbeddedForm>
          <iframe
            id="wufooFormx1unft9316db606"
            className="wufoo-form-container"
            height="955"
            sandbox="allow-top-navigation allow-scripts allow-popups allow-forms allow-same-origin allow-popups-to-escape-sandbox"
            src="https://htmniseko.wufoo.com/embed/x1unft9316db606?embedKey=x1unft9316db606392479&amp;entsource=&amp;referrer=https%3Awuslashwuslashwww.nisekocentral.comwuslash"
            style={{
              width: "100%",
            }}
          >
            <a
              href="https://htmniseko.wufoo.com/forms/x1unft9316db606/"
              title="html form"
            >
              Fill out my Wufoo form!
            </a>
          </iframe>
        </EmbeddedForm>
      </ExpressWrapper>
      <Suggestions />
    </ExpressContainer>
  );
}
