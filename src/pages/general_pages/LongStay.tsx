import { Container, styled, Box } from "@mui/material";
import LinkTitle from "../../components/LinkTitle";
import Suggestions from "../../features/suggestions/Suggestions";
import { useState } from "react";
import Default from "../../features/long_stay/Default";
import Everything from "../../features/long_stay/Everything";
import Rates from "../../features/long_stay/Rates";
import Sidebar from "../../features/long_stay/Sidebar";
import { useTranslation } from "react-i18next";

const LongStayContainer = styled(Container)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "25px",
  padding: "1rem",
  backgroundColor: theme.palette.mainbody?.main,
  [theme.breakpoints.down("middle_break")]: {
    padding: "5px",
    gap: "15px",
  },
}));

const LongStayWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "fit-content",
  display: "flex",
  gap: "20px",
  margin: "0 auto",
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column-reverse",
  },
}));

const ContentWrapper = styled("article")({
  height: "100%",
  flex: 1,
  minHeight: "100vh",
  overflow: "hidden",
});

const SidebarWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isArabic",
})<{ isArabic: boolean }>(({ theme, isArabic }) => ({
  width: "100%",
  [theme.breakpoints.up("lg")]: {
    ...(isArabic
      ? { borderRight: `1px solid ${theme.palette.divider}` }
      : { borderLeft: `1px solid ${theme.palette.divider}` }),
    maxWidth: "400px",
  },
}));

export default function LongStay() {
  const [articleChosen, setArticleChosen] = useState<number>(0);
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  return (
    <LongStayContainer maxWidth="xl">
      <LinkTitle />
      <LongStayWrapper>
        <ContentWrapper>
          {articleChosen === 0 && <Default />}
          {articleChosen === 1 && <Everything />}
          {articleChosen === 2 && <Rates />}
        </ContentWrapper>
        <SidebarWrapper isArabic={isArabic}>
          <Sidebar
            setArticleChosen={setArticleChosen}
            articleChosen={articleChosen}
          />
        </SidebarWrapper>
      </LongStayWrapper>
      <Suggestions />
    </LongStayContainer>
  );
}
