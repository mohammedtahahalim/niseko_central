import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import Loader from "./components/Loader";
import Router from "./router/Router";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./app/store";
import { fetchSuggestions } from "./features/suggestions/suggestionsSlice";
import { fetchNews } from "./features/home/news/newsSlice";
import { fetchBlogs } from "./features/home/blog/blogSlice";

function App() {
  const { ready, i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const suggestion = dispatch(fetchSuggestions({ queries: { limit: 12 } }));
    const news = dispatch(fetchNews({ queries: { limit: 5 } }));
    const blogs = dispatch(fetchBlogs({}));
    return () => {
      suggestion.abort();
      news.abort();
      blogs.abort();
    };
  }, []);

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
