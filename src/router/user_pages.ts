import { lazy } from "react";
const MyBookings = lazy(() => import("../pages/user_pages/MyBookings"));
const Payment = lazy(() => import("../pages/user_pages/Payment"));
const Profile = lazy(() => import("../pages/user_pages/Profile"));
const Settings = lazy(() => import("../pages/user_pages/Settings"));
import type { TRoutes } from "../utils/Types";

export const user_pages: TRoutes[] = [
  {
    path: "/mybookings",
    element: MyBookings,
  },
  {
    path: "/payment",
    element: Payment,
  },
  {
    path: "/profile",
    element: Profile,
  },
  {
    path: "/settings",
    element: Settings,
  },
];
