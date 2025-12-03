import { Box, Container, styled, Typography } from "@mui/material";
import LinkTitle from "../../components/LinkTitle";
import { useTranslation } from "react-i18next";
import Accordion from "../../components/Accordion";

interface SectionProp {
  heading: string;
  questions: {
    q: string;
    a: string;
  }[];
}

const FAQContainer = styled(Container)(({ theme }) => ({
  width: "100%",
  height: "100%",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  gap: "9px",
  padding: "1rem",
  backgroundColor: theme.palette.mainbody?.main,
  [theme.breakpoints.down("md")]: {
    padding: "5px",
    gap: "15px",
  },
}));

const FAQWrapper = styled(Container)({
  minHeight: "100%",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const Title = styled(Typography)({
  width: "100%",
  textAlign: "center",
  fontSize: "1.5rem",
  fontWeight: "bolder",
  textTransform: "capitalize",
});

const Subtitle = styled(Typography)(({ theme }) => ({
  width: "100%",
  textAlign: "center",
  fontSize: "1.2rem",
  fontWeight: "bold",
  fontStyle: "italic",
  color: theme.palette.icons?.main,
  marginBottom: "30px",
}));

const Section = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const SectionTitle = styled(Typography)({
  fontSize: "1.2rem",
  fontFamily: "Source Code Pro",
  fontWeight: "bold",
});

const SectionDivider = styled(Box)({
  width: "100%",
  height: "25px",
});

export default function FAQ() {
  const { t } = useTranslation();
  return (
    <FAQContainer maxWidth="xl">
      <LinkTitle />
      <FAQWrapper disableGutters maxWidth="nav_break">
        <Title role="heading" aria-level={1}>
          {t("faq.title")}
        </Title>
        <Subtitle tabIndex={0}>{t("faq.subtitle")}</Subtitle>
        {(t("faq.q&a", { returnObjects: true }) as SectionProp[]).map(
          (section) => {
            return (
              <Section key={section.heading}>
                <SectionTitle tabIndex={0}>{section.heading}</SectionTitle>
                {section.questions.map((question) => {
                  return (
                    <Accordion
                      title={question.q}
                      content={question.a}
                      key={question.q}
                    />
                  );
                })}
                <SectionDivider />
              </Section>
            );
          }
        )}
      </FAQWrapper>
    </FAQContainer>
  );
}
