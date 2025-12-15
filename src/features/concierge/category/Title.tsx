import { Box, styled, Skeleton, Button, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { niceUrl } from "../../../utils/Constants";

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

const TextWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
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

const Subtitle = styled(Typography)(({ theme }) => ({
  fontFamily: "Figtree",
  fontSize: "1.5rem",
  fontWeight: "bold",
  textAlign: "center",
  textTransform: "capitalize",
  color: theme.palette.icons?.main,
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
  const { category } = useParams();
  const { t } = useTranslation();
  const { loading } = useSelector((state: RootState) => state.concierge);

  return (
    <TitleContainer>
      <Button
        variant="text"
        color="primary"
        component={Link}
        to={"/concierge"}
        sx={{
          fontFamily: "Figtree",
          width: "fit-content",
          fontSize: "0.8rem",
          padding: "0rem",
        }}
      >
        {t("concierge.special")}
      </Button>
      <TitleWrapper>
        {loading ? (
          <SkeletonTitle variant="text" />
        ) : (
          <TextWrapper>
            <TitleName variant="body1" tabIndex={0}>
              {niceUrl(t(`concierge.categories.${category}`) || "")}
            </TitleName>
            <Subtitle variant="body1" tabIndex={0}>
              {t(`concierge.${category}`)}
            </Subtitle>
          </TextWrapper>
        )}
      </TitleWrapper>
    </TitleContainer>
  );
}
