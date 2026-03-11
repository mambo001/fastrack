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
          paper: "#071010",
        },
        primary: {
          main: "#9EC8B9",
        },
        secondary: {
          main: "#5C8374",
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
  },
});
