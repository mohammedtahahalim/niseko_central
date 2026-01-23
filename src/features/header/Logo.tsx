import { styled } from "@mui/material";
import { Link } from "react-router-dom";

const LogoWrapper = styled(Link)({
  height: "90%",
  overflow: "hidden",
  padding: "10px",
});

export default function Logo() {
  return (
    <LogoWrapper to={"/"} aria-label="Home - Booking Nest">
      <img
        src={"/img/logo.png"}
        alt="Booking Nest"
        width={"100%"}
        height={"100%"}
        style={{ scale: "2" }}
      />
    </LogoWrapper>
  );
}
