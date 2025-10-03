import { createContext } from "react";
import type { TLanguage } from "../features/languages/changeLanguage";
import type { TTheme } from "../utils/Types";

interface UIContextProps {
  changeTheme: () => void;
  changeLanguage: (newLang: TLanguage) => void;
  currentTheme: TTheme | null;
}

const initialContextState: UIContextProps = {
  changeLanguage: () => {},
  changeTheme: () => {},
  currentTheme: null,
};

export const UIContext = createContext<UIContextProps>(initialContextState);
