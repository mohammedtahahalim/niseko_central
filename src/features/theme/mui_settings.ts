import type {
  PaletteOptions,
  PaletteColor,
  PaletteColorOptions,
} from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    hybrid?: PaletteColor;
    highlight?: PaletteColor;
  }
  interface PaletteOptions {
    hybrid?: PaletteColorOptions;
    highlight?: PaletteColorOptions;
  }
}

export const lightPalette: PaletteOptions = {
  primary: {
    main: "",
    contrastText: "",
  },
  secondary: {
    main: "",
    contrastText: "",
  },
  info: {
    main: "",
    contrastText: "",
  },
  error: {
    main: "",
    contrastText: "",
  },
  success: {
    main: "",
    contrastText: "",
  },
  hybrid: {
    main: "",
    contrastText: "",
  },
  highlight: {
    main: "",
    contrastText: "",
  },
};

export const darkPalette: PaletteOptions = {};
