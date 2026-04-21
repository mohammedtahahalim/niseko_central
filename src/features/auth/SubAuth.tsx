import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";
import LineSeparator from "../../components/LineSeparator";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { LinearProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

interface SubAuthProps {
  h?: number;
  dir?: "v" | "h";
  w?: number;
}

const SubAuthWrapper = styled(Box)({
  display: "flex",
  gap: "5px",
  height: "100%",
  alignItems: "center",
});

const LinkWrapper = styled(Link)({
  textDecoration: "none",
  fontSize: "0.7rem",
  fontFamily: "Inter",
  textTransform: "capitalize",
  color: "inherit",
});

export default function SubAuth({ dir = "v", h = 50, w = 1 }: SubAuthProps) {
  const { isAuthenticated, status } = useSelector(
    (state: RootState) => state.auth,
  );
  const { t } = useTranslation();
  const loading = status === "loading";

  return (
    <SubAuthWrapper>
      {loading && (
        <LinearProgress
          color="primary"
          sx={{ width: "125px", height: "4px" }}
        />
      )}
      {!loading && !isAuthenticated && (
        <>
          <LinkWrapper to={"/login"}>{t("header.login")}</LinkWrapper>
          <LineSeparator dir={dir} w={w} h={h} />
          <LinkWrapper to={"/signup"}>{t("header.signup")}</LinkWrapper>
        </>
      )}
      {isAuthenticated && <LinkWrapper to={"/profile"}>My Profile</LinkWrapper>}
    </SubAuthWrapper>
  );
}
