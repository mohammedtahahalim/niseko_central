import { lazy } from "react";
const Article = lazy(() => import("../pages/item_pages/Article"));
const Promotion = lazy(() => import("../pages/item_pages/Promotion"));
const Property = lazy(() => import("../pages/item_pages/Property"));
import type { TRoutes } from "../utils/Types";

export const item_pages: TRoutes[] = [
  {
    path: "/deals/:deal_title",
    element: Promotion,
  },
  {
    path: "/concierge/:concierge_title",
    element: Article,
  },
  {
    path: "/reservations/:property_title",
    element: Property,
  },
];
