import { CssBaseline, ThemeProvider } from "@mui/material";
import { UIContext } from "./MiniContext";
import useTheme from "../features/theme/useTheme";
import useLanguage from "../features/languages/changeLanguage";

interface ContextProviderProps {
  children: React.ReactNode;
}

export default function ContextProvider({ children }: ContextProviderProps) {
  const { NisekoTheme, changeTheme } = useTheme({
    cooldown: 250,
  });
  const { changeLanguage } = useLanguage({ cooldown: 250 });
  return (
    <ThemeProvider theme={NisekoTheme}>
      <UIContext.Provider value={{ changeTheme, changeLanguage }}>
        <CssBaseline />
        {children}
      </UIContext.Provider>
    </ThemeProvider>
  );
}
