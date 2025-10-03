import { CssBaseline, ThemeProvider } from "@mui/material";
import { UIContext } from "./MiniContext";
import useTheme from "../features/theme/useTheme";
import useLanguage from "../features/languages/changeLanguage";

interface ContextProviderProps {
  children: React.ReactNode;
}

export default function ContextProvider({ children }: ContextProviderProps) {
  const { NisekoTheme, changeTheme, currentTheme } = useTheme({
    cooldown: 100,
  });
  const { changeLanguage } = useLanguage({ cooldown: 250 });
  return (
    <ThemeProvider theme={NisekoTheme}>
      <UIContext.Provider value={{ changeTheme, changeLanguage, currentTheme }}>
        <CssBaseline />
        {children}
      </UIContext.Provider>
    </ThemeProvider>
  );
}
