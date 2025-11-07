import { Box, Skeleton, styled, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import RenderOnView from "../render_on_view/RenderOnView";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useTranslation } from "react-i18next";
import Modal from "../modal/Modal";

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

const MapButton = styled(Button)({
  padding: "0px",
});

const MapContainer = styled(Box)(({ theme }) => ({
  maxWidth: "75vw",
  maxHeight: "75vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    maxWidth: "100vw",
    aspectRatio: 1,
    maxHeight: "50vh",
  },
}));

const Book = styled(Button)({
  width: "fit-content",
  alignSelf: "flex-end",
  borderRadius: "50px",
  padding: "12px 24px",
  backgroundColor: "#374151",
});

export default function MainTitle() {
  const { t, i18n } = useTranslation();
  const { loading, propertyData } = useSelector(
    (state: RootState) => state.propertySlice
  );
  const { translations, map } = propertyData || {};

  return (
    <MainTitleContainer>
      <RenderOnView animationDirection="right">
        <>
          {loading && (
            <Skeleton
              variant="text"
              sx={{ minHeight: "80px", width: "100%", height: "100%" }}
            />
          )}
          {!loading && translations && (
            <Content>
              <Info>
                <Title variant="h6">
                  {translations[i18n.language].type}{" "}
                  <span>{translations[i18n.language].title}</span>
                </Title>
                <Map variant="body1">
                  {translations[i18n.language].location}{" "}
                  <Modal
                    trigger={
                      <MapButton variant="text">{t("property.map")}</MapButton>
                    }
                    fullScreenWrapper={true}
                    disableScroll={true}
                    isTransparent={true}
                  >
                    <MapContainer>
                      <iframe
                        src={map}
                        width="100%"
                        height="100%"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </MapContainer>
                  </Modal>
                </Map>
              </Info>
              <Book variant="contained" endIcon={<ArrowOutwardIcon />}>
                {t("property.book_now")}
              </Book>
            </Content>
          )}
        </>
      </RenderOnView>
    </MainTitleContainer>
  );
}
