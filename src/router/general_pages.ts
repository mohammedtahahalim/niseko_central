import { lazy } from "react";
const Concierge = lazy(() => import("../pages/general_pages/Concierge"));
const Contact = lazy(() => import("../pages/general_pages/Contact"));
const Deals = lazy(() => import("../pages/general_pages/Deals"));
const FAQ = lazy(() => import("../pages/general_pages/FAQ"));
const Home = lazy(() => import("../pages/general_pages/Home"));
const NotFound = lazy(() => import("../pages/general_pages/NotFound"));
const Reservations = lazy(() => import("../pages/general_pages/Reservations"));
import type { TRoutes } from "../utils/Types";
import Blogs from "../pages/general_pages/Blogs";

export const general_pages: TRoutes[] = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/concierge",
    element: Concierge,
  },
  {
    path: "/contact",
    element: Contact,
  },
  {
    path: "/niseko-accommodation-deals",
    element: Deals,
  },
  {
    path: "/faq",
    element: FAQ,
  },
  {
    path: "*",
    element: NotFound,
  },
  {
    path: "/niseko-accommodation",
    element: Reservations,
  },
  {
    path: "/blog",
    element: Blogs,
  },
];
