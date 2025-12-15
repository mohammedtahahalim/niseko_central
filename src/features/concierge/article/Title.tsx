import { Box, Skeleton, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import type { idArticle } from "../conciergeSlice";
import type { TLanguage } from "../../languages/changeLanguage";

const TitleContainer = styled(Box)({
  width: "100%",
  maxWidth: "650px",
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  margin: "0 auto",
});

const MainTitle = styled(Typography)({
  fontWeight: "bold",
  fontFamily: "VAGRundschriftD",
});

const MainSkeleton = styled(Skeleton)({
  width: "100%",
  maxWidth: "600px",
  height: "60px",
});

const Subtitle = styled(Typography)({
  fontFamily: "Inter",
  textTransform: "capitalize",
  fontStyle: "italic",
  fontSize: "1.1rem",
});

const SubSkeleton = styled(Skeleton)({
  width: "100%",
  maxWidth: "600px",
  height: "105px",
});

export default function Title() {
  const { i18n } = useTranslation();
  const { loading, articles } = useSelector(
    (state: RootState) => state.concierge
  );

  const currContent =
    articles && (articles as idArticle)[i18n.language as TLanguage];
  const title = currContent && currContent.title;
  const subtitle = currContent && currContent.subtitle;

  return (
    <TitleContainer>
      {loading ? (
        <MainSkeleton variant="text" />
      ) : (
        <MainTitle variant="h4" color="textColor" tabIndex={0}>
          {title}
        </MainTitle>
      )}
      {loading ? (
        <SubSkeleton variant="text" />
      ) : (
        <Subtitle variant="subtitle1" color="icons" tabIndex={0}>
          {subtitle}
        </Subtitle>
      )}
    </TitleContainer>
  );
}
