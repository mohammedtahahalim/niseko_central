import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { TTheme } from "../../utils/Types";
import { lightPalette, darkPalette } from "./MuiSettings";
import { createTheme, type Theme } from "@mui/material";

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
  const cooldownRef = useRef<boolean>(false);

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
      palette: {
        mode: currentTheme,
        ...(currentTheme === "light" ? lightPalette : darkPalette),
      },
      components: {
        // TODO: add custom component overrides here
      },
    });
  }, [currentTheme]);

  const changeTheme = useCallback(() => {
    if (cooldownRef.current) return;
    cooldownRef.current = true;
    setCurrentTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark"
    );
    setTimeout(() => {
      cooldownRef.current = false;
    }, cooldown);
  }, [cooldown]);

  return { NisekoTheme, currentTheme, changeTheme };
}
