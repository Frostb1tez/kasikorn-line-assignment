import { createTheme } from "@mui/material/styles";

const colors = {
  primary: {
    main: "#24c875",
    light: "#15bbc7",
    dark: "#557bf2",
  },
  secondary: {
    main: "#9366ed",
    light: "#f88355",
  },
  text: {
    primary: "#222",
    secondary: "#97999e",
  },
  background: {
    default: "#fff",
    paper: "#fff",
  },
  grey: {
    100: "#f2f3f7",
    200: "#d0dae4",
    300: "#c0c1c4",
  },
};

const theme = createTheme({
  palette: {
    ...colors,
    mode: "light",
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: "2.4rem",
      fontWeight: 400,
      lineHeight: "normal",
    },
    h2: {
      fontSize: "1.9rem",
      lineHeight: "2.3rem",
      color: colors.text.primary,
    },
    body1: {
      fontSize: "1.5rem",
      lineHeight: "normal",
      fontWeight: 400,
    },
    body2: {
      fontSize: "1.3rem",
      lineHeight: "1.5rem",
      color: colors.text.secondary,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: "10px",
        },
        body: {
          WebkitTapHighlightColor: "transparent",
          WebkitFocusRingColor: "transparent",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        },
      },
    },
  },
});

export default theme;
