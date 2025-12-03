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
    textColor?: PaletteColor;
    service?: PaletteColor;
  }
  interface PaletteOptions {
    headfoot?: PaletteColorOptions;
    hero?: PaletteColorOptions;
    mainbody?: PaletteColorOptions;
    icons?: PaletteColorOptions;
    textColor?: PaletteColorOptions;
    service?: PaletteColorOptions;
  }
}

export const lightPalette: PaletteOptions = {
  primary: {
    main: "#C2361F", // darkened enough for AA contrast
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#1F2937",
    contrastText: "#F5F5F5",
  },
  info: {
    main: "#FFFFFF",
    contrastText: "#111827",
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
    main: "#374151",
  },
  textColor: {
    main: "#111827",
  },
  service: {
    main: "#F3F4F6",
  },
};

export const darkPalette: PaletteOptions = {
  primary: {
    main: "#F06549",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#1F2937",
    contrastText: "#F5F5F5",
  },
  info: {
    main: "#374151",
    contrastText: "#FFFFFF",
  },
  divider: "#4B5563",
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
    main: "#CBD5E1", // bright enough for contrast on dark bg
  },
  textColor: {
    main: "#E5E7EB", // readable on dark bg
  },
  service: {
    main: "#374151",
  },
};
