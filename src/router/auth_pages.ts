import { lazy } from "react";
const Login = lazy(() => import("../pages/auth_pages/Login"));
const SignUp = lazy(() => import("../pages/auth_pages/SignUp"));
import type { TRoutes } from "../utils/Types";

export const auth_pages: TRoutes[] = [
  {
    path: "/login",
    element: Login,
  },
  {
    path: "/signup",
    element: SignUp,
  },
];
