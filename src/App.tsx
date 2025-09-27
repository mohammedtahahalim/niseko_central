import { useTranslation } from "react-i18next";
import Loader from "./components/Loader";

function App() {
  const { t, ready } = useTranslation();

  if (!ready) return <Loader />;

  return (
    <div className="app">
      <div>{t("title")}</div>
    </div>
  );
}

export default App;
