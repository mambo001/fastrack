import { createTheme } from "@mui/material";

export const appTheme = createTheme({
  colorSchemes: {
    light: true,
    dark: true,
  },
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
});
