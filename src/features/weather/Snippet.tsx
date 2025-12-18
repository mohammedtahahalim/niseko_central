import { Box, styled } from "@mui/material";
import { useContext, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { UIContext } from "../../context/MiniContext";

declare global {
  interface Window {
    __TOMORROW__?: {
      renderWidget: () => void;
    };
  }
}

const SnippetWrapper = styled(Box)({
  width: "100%",
  minHeight: "148px",
  overflow: "hidden",
});

export default function Snippet() {
  const { i18n } = useTranslation();
  const { currentTheme } = useContext(UIContext);
  const parentRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!parentRef.current) return;
    // Remove Previous Weather widget
    parentRef.current.innerHTML = "";
    document
      .querySelectorAll('script[src*="tomorrow.io/v1/widget/sdk"]')
      .forEach((s) => s.remove());

    // Create a new One
    const weatherElement = document.createElement("div");
    weatherElement.className = "tomorrow";
    weatherElement.setAttribute("data-location-id", "067098");
    weatherElement.setAttribute("data-language", i18n.language.toUpperCase());
    weatherElement.setAttribute("data-unit-system", "METRIC");
    weatherElement.setAttribute("data-skin", currentTheme ?? "light");
    weatherElement.setAttribute("data-widget-type", "upcoming");
    parentRef.current.appendChild(weatherElement);
    // Inject Weather API Script
    (function (d, s, id) {
      if (d.getElementById(id)) {
        if (window.__TOMORROW__) {
          window.__TOMORROW__.renderWidget();
        }
        return;
      }
      const fjs = d.getElementsByTagName(s)[0];
      const js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = "https://www.tomorrow.io/v1/widget/sdk/sdk.bundle.min.js";
      if (fjs.parentNode) {
        fjs.parentNode.insertBefore(js, fjs);
      }
    })(document, "script", "tomorrow-sdk");

    // Remove Weather API tag
    const adsTag = document.querySelectorAll("a[href*=tomorrow]");
    adsTag.forEach((tag) => tag.remove());
  }, [i18n.language, currentTheme]);

  return <SnippetWrapper ref={parentRef}></SnippetWrapper>;
}
