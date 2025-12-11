import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import Loader from "./components/Loader";
import Router from "./router/Router";

function App() {
  const { ready, i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language === "ar") {
      document.dir = "rtl";
    } else {
      document.dir = "ltr";
    }
  }, [i18n.language]);

  if (!ready) return <Loader />;

  return <Router />;
}

export default App;
