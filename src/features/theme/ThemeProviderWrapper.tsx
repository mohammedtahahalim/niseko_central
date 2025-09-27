import { CssBaseline, ThemeProvider } from "@mui/material";
import { MiniContext } from "./miniContext";
import useTheme from "./useTheme";

interface ThemeProviderWrapperProps {
  children: React.ReactNode;
}

export default function ThemeProviderWrapper({
  children,
}: ThemeProviderWrapperProps) {
  const { NisekoTheme, currentTheme, changeTheme } = useTheme({
    cooldown: 500,
  });
  return (
    <ThemeProvider theme={NisekoTheme}>
      <MiniContext.Provider value={{ currentTheme, changeTheme }}>
        <CssBaseline />
        {children}
      </MiniContext.Provider>
    </ThemeProvider>
  );
}
