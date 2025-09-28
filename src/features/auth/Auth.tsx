import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { useEffect } from "react";
import { checkAuthentication } from "./authSlice";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../../components/Loader";

export default function Auth() {
  const { loading, error, isAuthenticated, redirectTo } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(checkAuthentication());
  }, []);
  if (loading) return <Loader />;
  if (redirectTo) return <Navigate to={redirectTo} />;
  if (error) return <div>{error}</div>;
  if (!isAuthenticated) return null;
  return <Outlet />;
}
