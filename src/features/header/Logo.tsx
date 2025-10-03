import { Box, styled } from "@mui/material";
import { useContext } from "react";
import { UIContext } from "../../context/MiniContext";

const LogoWrapper = styled(Box)({
  height: "100%",
  overflow: "hidden",
  padding: "10px",
});

export default function Logo() {
  const { currentTheme } = useContext(UIContext);
  return (
    <LogoWrapper>
      <img
        src={
          currentTheme === "light"
            ? "/img/niseko_logo_light.webp"
            : "/img/niseko_logo_dark.webp"
        }
        alt="Niseko Logo"
        width={"100%"}
        height={"100%"}
      />
    </LogoWrapper>
  );
}
