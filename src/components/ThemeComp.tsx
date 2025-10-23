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
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      changeTheme();
    }
  };
  return (
    <ThemeCompWrapper
      onClick={changeTheme}
      role="button"
      aria-label="Change Theme"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {currentTheme === "light" && <DarkModeIcon fontSize="small" />}
      {currentTheme === "dark" && <LightModeIcon fontSize="small" />}
    </ThemeCompWrapper>
  );
}
