import { createTheme } from "@mui/material";

export const appTheme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: "#F2EFE7",
        },
        primary: {
          main: "#006A71ff",
        },
        secondary: {
          main: "#48A6A7ff",
        },
        info: {
          main: "#9ACBD0ff",
        },
        error: {
          main: "#bc4749ff",
        },
        warning: {
          main: "#f2e8cfff",
        },
      },
    },
    dark: {
      palette: {
        background: {
          default: "#0d1e1e",
          paper: "#132b2c",
        },
        primary: {
          main: "#48A6A7ff",
        },
        secondary: {
          main: "#9ACBD0ff",
        },
        info: {
          main: "#006A71ff",
        },
        error: {
          main: "#bc4749ff",
        },
        warning: {
          main: "#f2e8cfff",
        },
      },
    },
  },
});
