import { styled } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UIContext } from "../../context/MiniContext";

const LogoWrapper = styled(Link)({
  height: "90%",
  overflow: "hidden",
  padding: "10px",
});

export default function Logo() {
  const { currentTheme } = useContext(UIContext);
  return (
    <LogoWrapper to={"/"} aria-label="Home - Niseko Central">
      <img
        src={
          currentTheme === "light"
            ? "/img/niseko_logo_light.webp"
            : "/img/niseko_logo_dark.webp"
        }
        alt="Niseko Central"
        width={"100%"}
        height={"100%"}
      />
    </LogoWrapper>
  );
}
