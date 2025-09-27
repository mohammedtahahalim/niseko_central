import { useTranslation } from "react-i18next";
import Loader from "./components/Loader";
import Router from "./router/Router";

function App() {
  const { ready } = useTranslation();

  if (!ready) return <Loader />;

  return <Router />;
}

export default App;
