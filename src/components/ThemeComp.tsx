import { useContext } from "react";
import { UIContext } from "../context/MiniContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Box, styled } from "@mui/material";

const ThemeCompWrapper = styled(Box)({
  height: "100%",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export default function ThemeComp() {
  const { currentTheme, changeTheme } = useContext(UIContext);
  return (
    <ThemeCompWrapper onClick={changeTheme}>
      {currentTheme === "light" && <DarkModeIcon />}
      {currentTheme === "dark" && <LightModeIcon />}
    </ThemeCompWrapper>
  );
}
