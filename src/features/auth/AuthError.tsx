import { Box, styled, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { checkAuthentication } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AuthErrorWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: "15px",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

export default function AuthError() {
  const dispatch = useDispatch<AppDispatch>();
  const navigator = useNavigate();
  const { t } = useTranslation();
  return (
    <AuthErrorWrapper>
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch(checkAuthentication())}
      >
        {t("auth_fails.try_again")}
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigator("/")}
      >
        {t("auth_fails.return_homepage")}
      </Button>
    </AuthErrorWrapper>
  );
}
