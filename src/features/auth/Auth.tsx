import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { useEffect } from "react";
import { checkAuthentication } from "./authSlice";
import { Navigate, Outlet } from "react-router-dom";
import type { THTTPCodes } from "../../utils/Types";
import { backendErrors } from "../../utils/Constants";
import { useTranslation } from "react-i18next";
import AuthError from "./AuthError";
import Loader from "../../components/Loader";
import Error from "../../components/Error";

export default function Auth() {
  const { loading, error, isAuthenticated, redirectTo } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();
  const { i18n } = useTranslation();
  const lang = i18n.language in backendErrors ? i18n.language : "en-US";
  const errorMessage = backendErrors[lang][error as THTTPCodes];

  useEffect(() => {
    document.title = "...";
    dispatch(checkAuthentication());
  }, []);

  if (loading) return <Loader />;
  if (error)
    return (
      <Error errorMessage={errorMessage}>
        <AuthError />
      </Error>
    );
  if (redirectTo) return <Navigate to={redirectTo} replace />;
  if (!isAuthenticated) return <Loader />;
  return <Outlet />;
}
