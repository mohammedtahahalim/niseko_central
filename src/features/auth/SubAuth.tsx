import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";
import LineSeparator from "../../components/LineSeparator";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { useEffect } from "react";
import { checkAuthentication } from "./authSlice";
import { LinearProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

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
  color: "inherit",
  textTransform: "capitalize",
});

export default function SubAuth() {
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (isAuthenticated === null) {
      dispatch(checkAuthentication());
    }
  }, [isAuthenticated, dispatch]);
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
          <LineSeparator dir="v" w={1} h={50} />
          <LinkWrapper to={"/signup"}>{t("header.signup")}</LinkWrapper>
        </>
      )}
      {isAuthenticated && <LinkWrapper to={"/profile"}>My Profile</LinkWrapper>}
    </SubAuthWrapper>
  );
}
