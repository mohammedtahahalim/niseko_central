import type {
  PaletteOptions,
  PaletteColor,
  PaletteColorOptions,
} from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    headfoot?: PaletteColor;
    hero?: PaletteColor;
    mainbody?: PaletteColor;
    icons?: PaletteColor;
  }
  interface PaletteOptions {
    headfoot?: PaletteColorOptions;
    hero?: PaletteColorOptions;
    mainbody?: PaletteColorOptions;
    icons?: PaletteColorOptions;
  }
}

export const lightPalette: PaletteOptions = {
  primary: {
    main: "#F06549",
    contrastText: "#FCFFFF",
  },
  secondary: {
    main: "#1F2937",
    contrastText: "#E1E3E8",
  },
  info: {
    main: "#FFFFFF",
    contrastText: "#1F2937",
  },
  divider: "#D1D5DB",
  headfoot: {
    main: "#F9FAFB",
  },
  hero: {
    main: "#E2E8F0",
  },
  mainbody: {
    main: "#FFFFFF",
  },
  icons: {
    main: "#64748B",
  },
};

export const darkPalette: PaletteOptions = {
  primary: {
    main: "#F06549",
    contrastText: "#FCFFFF",
  },
  secondary: {
    main: "#1F2937",
    contrastText: "#E1E3E8",
  },
  info: {
    main: "#F9FAFB",
    contrastText: "#1F2937",
  },
  divider: "#1F2937",
  headfoot: {
    main: "#111827",
  },
  hero: {
    main: "#18212F",
  },
  mainbody: {
    main: "#1F2937",
  },
  icons: {
    main: "#94A3B8",
  },
};
