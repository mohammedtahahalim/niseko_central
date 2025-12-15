import { createContext } from "react";

export const countContext = createContext<{
  slideCount: number;
  maxHeight: string;
}>({
  slideCount: 0,
  maxHeight: "",
});
