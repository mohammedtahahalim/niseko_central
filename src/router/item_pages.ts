import { lazy } from "react";
const Promotion = lazy(() => import("../pages/item_pages/Promotion"));
const Property = lazy(() => import("../pages/item_pages/Property"));
const Blog = lazy(() => import("../pages/item_pages/Blog"));
const Category = lazy(() => import("../pages/item_pages/Category"));
const Article = lazy(() => import("../pages/item_pages/Article"));
import type { TRoutes } from "../utils/Types";

export const item_pages: TRoutes[] = [
  {
    path: "/niseko-accommodation-deals/:id/:title",
    element: Promotion,
  },
  {
    path: "/concierge/:category",
    element: Category,
  },
  {
    path: "/concierge/:id/:title",
    element: Article,
  },
  {
    path: "/niseko-accommodation/:id/:title?",
    element: Property,
  },
  {
    path: "/blogs/:id/:title",
    element: Blog,
  },
];
