import { Box, Container, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface ULLink {
  text: string;
  link: string;
}

const NotFoundContainer = styled(Container)(({ theme }) => ({
  width: "100%",
  height: "100%",
  minHeight: "70vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "25px",
  padding: "3rem",
  backgroundColor: theme.palette.mainbody?.main,
  [theme.breakpoints.down("md")]: {
    padding: "5px",
    gap: "15px",
  },
}));

const ContentContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  gap: "30px",
  alignItems: "center",
  padding: "3rem",
});

const TextWrapper = styled(Box)({
  width: "fit-content",
  display: "flex",
  flexDirection: "column",
  gap: "25px",
});

const Links = styled("ul")<{ isArabic: boolean }>(({ isArabic }) => ({
  ...(isArabic ? { marginRight: "15px" } : { marginLeft: "15px" }),
  display: "flex",
  flexDirection: "column",
  gap: "15px",
}));

const LI = styled("li")({
  textTransform: "capitalize",
});

const A = styled("a")({
  color: "inherit",
  fontSize: "0.9rem",
  opacity: "0.75",
});

export default function NotFound() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  return (
    <NotFoundContainer disableGutters maxWidth="xl">
      <ContentContainer disableGutters maxWidth="middle_break">
        <Typography variant="h5" color="primary" fontFamily={"Source Code Pro"}>
          404
        </Typography>
        <TextWrapper>
          <Typography
            variant="h5"
            color="textContent"
            fontFamily={"Figtree"}
            sx={{ textTransform: "capitalize" }}
          >
            {t("404.title")}
          </Typography>
          <Typography
            variant="body1"
            color="textContent"
            fontFamily={"Figtree"}
            sx={{ textTransform: "capitalize" }}
          >
            {t("404.subtitle1")}
          </Typography>
          <Typography
            variant="subtitle2"
            color="textContent"
            fontFamily={"Figtree"}
            sx={{ textTransform: "capitalize" }}
          >
            {t("404.subtitle2")}
          </Typography>
          <Links isArabic={isArabic}>
            {(t("404.links", { returnObjects: true }) as ULLink[]).map(
              (link) => {
                return (
                  <LI key={link.text}>
                    <A href={link.link} target="_blank">
                      {link.text}
                    </A>
                  </LI>
                );
              }
            )}
          </Links>
          <Typography
            variant="subtitle2"
            color="textContent"
            fontFamily={"Inter"}
            sx={{ textTransform: "capitalize" }}
          >
            {t("404.closure")}
          </Typography>
        </TextWrapper>
      </ContentContainer>
    </NotFoundContainer>
  );
}
