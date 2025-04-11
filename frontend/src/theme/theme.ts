import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    account: {
      saving: string;
      savingSecondary: string;
      loan: string;
      goal: string;
      repay: string;
    };
  }

  interface PaletteOptions {
    account?: {
      saving: string;
      savingSecondary: string;
      loan: string;
      goal: string;
      repay: string;
    };
  }

  interface TypeText {
    white: string;
  }
}

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
  account: {
    saving: "#24c875",
    savingSecondary: "#15bbc7",
    loan: "#f88355",
    goal: "#9366ed",
    repay: "#557bf2",
  },
  text: {
    primary: "#222",
    secondary: "#97999e",
    white: "#ffffff",
  },
  background: {
    default: "#fff",
    paper: "#fff",
    lightGrey: "#f5f5f5",
  },
  grey: {
    100: "#f2f3f7",
    200: "#d0dae4",
    300: "#c0c1c4",
  },
  action: {
    buttonOutlinedHover: "rgba(255, 255, 255, 0.8)",
    buttonOutlined: "rgba(255, 255, 255, 0.5)",
  },
};

const theme = createTheme({
  palette: {
    primary: colors.primary,
    secondary: colors.secondary,
    text: colors.text,
    background: colors.background,
    grey: colors.grey,
    account: colors.account,
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
    h4: {
      fontSize: "3.4rem",
      lineHeight: "normal",
      fontWeight: 600,
    },
    h5: {
      fontSize: "2.4rem",
      lineHeight: "normal",
      fontWeight: 400,
    },
    h6: {
      fontSize: "1.8rem",
      lineHeight: "2.8rem",
      fontWeight: 700,
    },
    body1: {
      fontSize: "1.5rem",
      lineHeight: "normal",
      fontWeight: 400,
    },
    body2: {
      fontSize: "1.3rem",
      lineHeight: "normal",
      color: colors.text.secondary,
    },
    caption: {
      fontSize: "1.1rem",
      lineHeight: "1.5rem",
    },
    button: {
      fontSize: "1.2rem",
      lineHeight: "1.4rem",
      fontWeight: 700,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 10,
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
          wordBreak: "break-word",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1.2rem",
          lineHeight: "1.4rem",
          fontWeight: 700,
          textTransform: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: "none",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "25px 22px 22px",
          "&:last-child": {
            paddingBottom: "22px",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: 8,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.grey[200],
        },
      },
    },
  },
});

export default theme;
