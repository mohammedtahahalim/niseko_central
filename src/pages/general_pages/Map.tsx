import { Box, Container, styled } from "@mui/material";
import LinkTitle from "../../components/LinkTitle";
import Title from "../../features/map/Title";
import Welcome from "../../features/map/Welcome";
import Body from "../../features/map/Body";
import Banner from "../../features/map/Banner";
import Pdf from "../../features/map/Pdf";

const MapContainer = styled(Container)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "25px",
  minHeight: "100vh",
  padding: "1rem",
  backgroundColor: theme.palette.mainbody?.main,
  [theme.breakpoints.down("md")]: {
    padding: "5px",
    gap: "15px",
  },
}));

const ContentWrapper = styled(Box)({
  width: "100%",
  maxWidth: "900px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  margin: "0 auto",
});

export default function Map() {
  return (
    <MapContainer maxWidth="xl">
      <LinkTitle />
      <ContentWrapper>
        <Title />
        <Welcome />
        <Body />
        <Banner />
        <Pdf />
      </ContentWrapper>
    </MapContainer>
  );
}
