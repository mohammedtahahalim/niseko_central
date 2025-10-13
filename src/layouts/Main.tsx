import { Outlet } from "react-router-dom";
import { Box, Container, styled } from "@mui/material";
import Header from "../features/header/Header";
import Footer from "../features/footer/Footer";

const MainContainer = styled(Container)({
  width: "100%",
  height: "100%",
  minHeight: "150vh",
  display: "flex",
  flexDirection: "column",
});

const BodyWrapper = styled(Box)({
  flex: "1",
  marginTop: "115px",
  minHeight: "100vh",
  "@media (max-height: 600px)": {
    minHeight: "calc(100vh + 125px)",
  },
});

export default function Main() {
  return (
    <MainContainer maxWidth="xl" disableGutters>
      <Header />
      <BodyWrapper>
        <Outlet />
      </BodyWrapper>
      <Footer />
    </MainContainer>
  );
}
