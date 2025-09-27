import { createContext } from "react";
import type { TTheme } from "../../utils/Types";

interface MiniContextProps {
  currentTheme: TTheme;
  changeTheme: () => void;
}

export const MiniContext = createContext<MiniContextProps | undefined>(
  undefined
);
