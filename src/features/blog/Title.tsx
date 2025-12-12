import { Box, styled, Skeleton, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import type { TLanguage } from "../languages/changeLanguage";
import { format_date } from "../../utils/Constants";

const TitleContainer = styled(Box)({
  maxWidth: "750px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "5px",
});

const TitleWrapper = styled(Box)({
  width: "100%",
  minHeight: "75px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const TitleName = styled(Typography)(({ theme }) => ({
  fontFamily: "Figtree",
  fontSize: "1.7rem",
  fontWeight: "bold",
  textAlign: "center",
  textTransform: "capitalize",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
  },
}));

const SkeletonTitle = styled(Skeleton)({
  width: "100%",
  minHeight: "75px",
  minWidth: "450px",
});

const DateWrapper = styled(Typography)(({ theme }) => ({
  fontFamily: "Figtree",
  fontSize: "0.9rem",
  fontStyle: "italic",
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8rem",
  },
}));

const SkeletonDate = styled(Skeleton)({
  width: "100%",
  minHeight: "40px",
  minWidth: "450px",
});

export default function Title() {
  const { i18n, t } = useTranslation();
  const { loading } = useSelector((state: RootState) => state.blogs);
  const { blogs } = useSelector((state: RootState) => state.blogs.data) || {};
  const title = blogs ? blogs[0][i18n.language as TLanguage].title : "";
  const date =
    typeof blogs === "object" && blogs !== null && "date" in blogs[0]
      ? blogs[0].date
      : "";

  return (
    <TitleContainer>
      <Button
        variant="text"
        color="primary"
        component={Link}
        to={"/blogs"}
        sx={{
          fontFamily: "Figtree",
          width: "fit-content",
          fontSize: "0.8rem",
          padding: "0rem",
        }}
      >
        {t("blogs.special")}
      </Button>
      <TitleWrapper>
        {loading ? (
          <SkeletonTitle variant="text"></SkeletonTitle>
        ) : (
          <TitleName variant="body1" tabIndex={0}>
            {title}
          </TitleName>
        )}
      </TitleWrapper>
      {loading ? (
        <SkeletonDate variant="text" />
      ) : (
        <DateWrapper tabIndex={0}>
          {date && format_date(new Date(date), i18n.language as TLanguage)}
        </DateWrapper>
      )}
    </TitleContainer>
  );
}
