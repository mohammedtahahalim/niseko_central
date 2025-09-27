import { createContext } from "react";
import type { TLanguage } from "../features/languages/changeLanguage";

interface UIContextProps {
  changeTheme: () => void;
  changeLanguage: (newLang: TLanguage) => void;
}

const initialContextState: UIContextProps = {
  changeLanguage: () => {},
  changeTheme: () => {},
};

export const UIContext = createContext<UIContextProps>(initialContextState);
