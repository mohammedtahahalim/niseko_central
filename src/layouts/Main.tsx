import { Outlet } from "react-router-dom";
import { Box, Container, styled } from "@mui/material";
import Header from "../features/header/Header";
import Footer from "../features/footer/Footer";

const MainContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: "100vh",
  backgroundColor: theme.palette.mainbody?.main,
  display: "flex",
  flexDirection: "column",
  maxWidth: "100vw",
  overflowX: "hidden",
}));

const BodyWrapper = styled(Container)({
  flex: "1",
  marginTop: "115px",
  "@media (max-height: 600px)": {
    minHeight: "calc(100vh + 125px)",
  },
});

export default function Main() {
  return (
    <MainContainer>
      <Header />
      <BodyWrapper role="main" maxWidth={"xl"}>
        <Outlet />
      </BodyWrapper>
      <Footer />
    </MainContainer>
  );
}
