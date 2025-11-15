import { Box, Skeleton, styled, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import RenderOnView from "../render_on_view/RenderOnView";
import NorthWestIcon from "@mui/icons-material/NorthWest";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { useTranslation } from "react-i18next";

const MainTitleContainer = styled(Box)(({ theme }) => ({
  width: "90%",
  minHeight: "80px",
  alignSelf: "center",
  color: theme.palette.textColor?.main,
  gap: "10px",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const Content = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "15px",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const Info = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
});

const Title = styled(Typography)(({ theme }) => ({
  fontFamily: "VAGRundschriftD",
  fontSize: "1.8rem",
  fontWeight: "bold",
  letterSpacing: "1.1px",
  "& span": {
    color: theme.palette.primary.main,
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "1.5rem",
  },
}));

const Map = styled(Typography)({
  fontFamily: "Inter",
  fontSize: "0.9rem",
  fontStyle: "italic",
});

const Book = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isArabic",
})<{ isArabic: boolean }>(({ theme, isArabic }) => ({
  width: "fit-content",
  alignSelf: "center",
  borderRadius: "50px",
  padding: "12px 24px",
  backgroundColor: "#374151",
  gap: isArabic ? "10px" : "0px",
  [theme.breakpoints.down("md")]: {
    alignSelf: "flex-end",
  },
}));

const SkeltonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  gap: "15px",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const SkeltonText = styled(Skeleton)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  height: "90px",
});

const SkeltonButton = styled(Skeleton)(({ theme }) => ({
  width: "fit-content",
  alignSelf: "center",
  borderRadius: "50px",
  padding: "12px 24px",
  backgroundColor: "#374151",
  height: "50px",
  minWidth: "150px",
  [theme.breakpoints.down("md")]: {
    alignSelf: "flex-end",
  },
}));

export default function MainTitle() {
  const { t, i18n } = useTranslation();
  const { loading, propertyData } = useSelector(
    (state: RootState) => state.property
  );
  const { translations } = propertyData || {};

  return (
    <MainTitleContainer>
      <RenderOnView animationDirection="right">
        <>
          {loading && (
            <SkeltonContainer>
              <SkeltonText variant="text" />
              <SkeltonButton variant="rectangular" />
            </SkeltonContainer>
          )}
          {!loading && translations && (
            <Content>
              <Info>
                <Title variant="h6" tabIndex={0}>
                  {translations[i18n.language].type}{" "}
                  <span>{translations[i18n.language].title}</span>
                </Title>
                <Map variant="body1">
                  {translations[i18n.language].location}{" "}
                </Map>
              </Info>
              <Book
                variant="contained"
                endIcon={
                  i18n.language === "ar" ? (
                    <NorthWestIcon fontSize="small" />
                  ) : (
                    <NorthEastIcon fontSize="small" />
                  )
                }
                isArabic={i18n.language === "ar"}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href =
                    "https://reservations.nisekocentral.com/en/";
                }}
              >
                {t("property.book_now")}
              </Book>
            </Content>
          )}
        </>
      </RenderOnView>
    </MainTitleContainer>
  );
}
