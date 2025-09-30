import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { general_pages } from "./general_pages";
import { auth_pages } from "./auth_pages";
import { user_pages } from "./user_pages";
import { item_pages } from "./item_pages";
import Main from "../layouts/Main";
import Generic from "../layouts/Generic";
import Loader from "../components/Loader";
import Auth from "../features/auth/Auth";
import { useTranslation } from "react-i18next";

export default function Router() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t("title");
  }, [i18n.language]);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<Auth />}>
            {user_pages.map((page) => {
              return (
                <Route
                  path={page.path}
                  element={<page.element />}
                  key={page.path}
                />
              );
            })}
          </Route>
          <Route element={<Main />}>
            {general_pages.map((page) => {
              return (
                <Route
                  path={page.path}
                  element={<page.element />}
                  key={page.path}
                />
              );
            })}
            {item_pages.map((page) => {
              return (
                <Route
                  path={page.path}
                  element={<page.element />}
                  key={page.path}
                />
              );
            })}
          </Route>
          <Route element={<Generic />}>
            {auth_pages.map((page) => {
              return (
                <Route
                  path={page.path}
                  element={<page.element />}
                  key={page.path}
                />
              );
            })}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
