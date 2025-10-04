import "@mui/material/styles";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { TTheme } from "../../utils/Types";
import { lightPalette, darkPalette } from "./MuiSettings";
import { createTheme, type Theme } from "@mui/material";
import { debouncer } from "../../utils/Constants";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    nav_break: true;
    lg: true;
    xl: true;
  }
}

interface UseThemeProps {
  cooldown?: number;
}

interface UseThemeReturns {
  NisekoTheme: Theme;
  currentTheme: TTheme;
  changeTheme: () => void;
}

const getInitialTheme = (): TTheme => {
  try {
    const localStorageTheme = localStorage.getItem("theme");
    if (localStorageTheme && ["light", "dark"].includes(localStorageTheme))
      return localStorageTheme as TTheme;
    const matchMediaTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (matchMediaTheme) return "dark";
    return "light";
  } catch (err) {
    console.warn("Failed to fetch saved preset, defaulting to light...", err);
    return "light";
  }
};

export default function useTheme({
  cooldown = 500,
}: UseThemeProps): UseThemeReturns {
  const [currentTheme, setCurrentTheme] = useState<TTheme>(getInitialTheme);

  useEffect(() => {
    try {
      localStorage.setItem("theme", currentTheme);
    } catch (err) {
      console.log("Failed to save current theme to local storage", err);
    }
  }, [currentTheme]);

  useEffect(() => {
    const syncThemeWithMatchMedia = (e: MediaQueryListEvent) => {
      setCurrentTheme(e.matches ? "dark" : "light");
    };
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", syncThemeWithMatchMedia);
    return () => {
      mediaQuery.removeEventListener("change", syncThemeWithMatchMedia);
    };
  }, []);

  const NisekoTheme = useMemo(() => {
    return createTheme({
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 900,
          nav_break: 1000,
          lg: 1200,
          xl: 1536,
        },
      },
      palette: {
        mode: currentTheme,
        ...(currentTheme === "light" ? lightPalette : darkPalette),
      },
      components: {
        MuiContainer: {
          styleOverrides: {
            root: {},
          },
        },
      },
    });
  }, [currentTheme]);

  const changeTheme = useCallback(
    debouncer(() => {
      setCurrentTheme((currentTheme) =>
        currentTheme === "dark" ? "light" : "dark"
      );
    }, cooldown),
    [cooldown]
  );

  return { NisekoTheme, currentTheme, changeTheme };
}
