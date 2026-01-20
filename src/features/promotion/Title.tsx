import { Box, Button, Skeleton, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { Link } from "react-router-dom";

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
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
  },
}));

const SkeletonTitle = styled(Skeleton)({
  width: "100%",
  minHeight: "75px",
  minWidth: "450px",
});

export default function Title() {
  const { t, i18n } = useTranslation();
  const { loading, promotion } = useSelector(
    (state: RootState) => state.promotion,
  );

  const promotionData = promotion[i18n.language as keyof typeof promotion];
  const title =
    typeof promotionData === "object" &&
    promotionData !== null &&
    "title" in promotionData
      ? promotionData.title
      : "";

  return (
    <TitleContainer>
      <Button
        variant="text"
        color="primary"
        component={Link}
        to={"/niseko-accommodation-deals"}
        sx={{
          fontFamily: "Figtree",
          width: "fit-content",
          fontSize: "0.8rem",
          padding: "0rem",
        }}
      >
        {t("promotion.special")}
      </Button>
      <TitleWrapper>
        {loading ? (
          <SkeletonTitle variant="text"></SkeletonTitle>
        ) : (
          <TitleName variant="body1">{title}</TitleName>
        )}
      </TitleWrapper>
    </TitleContainer>
  );
}
