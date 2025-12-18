import { Container, styled, Box } from "@mui/material";
import LinkTitle from "../../components/LinkTitle";
import Suggestions from "../../features/suggestions/Suggestions";
import Title from "../../features/weather/Title";
import Subtitle from "../../features/weather/Subtitle";
import Snippet from "../../features/weather/Snippet";
import Useful from "../../features/weather/Useful";

const WeatherContainer = styled(Container)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "9px",
  padding: "1rem",
  backgroundColor: theme.palette.mainbody?.main,
  [theme.breakpoints.down("md")]: {
    padding: "5px",
    gap: "15px",
  },
}));

const WeatherWrapper = styled(Box)({
  width: "100%",
  maxWidth: "900px",
  display: "flex",
  flexDirection: "column",
  gap: "30px",
  margin: "0 auto",
});

export default function Weather() {
  return (
    <WeatherContainer maxWidth="xl">
      <LinkTitle />
      <WeatherWrapper>
        <Title />
        <Subtitle />
        <Snippet />
        <Useful />
      </WeatherWrapper>
      <Suggestions />
    </WeatherContainer>
  );
}
