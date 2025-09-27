import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { NisekoStore } from "./app/store.ts";
import ThemeProviderWrapper from "./features/theme/ThemeProviderWrapper.tsx";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={NisekoStore}>
      <MantineProvider>
        <ThemeProviderWrapper>
          <App />
        </ThemeProviderWrapper>
      </MantineProvider>
    </Provider>
  </StrictMode>
);
