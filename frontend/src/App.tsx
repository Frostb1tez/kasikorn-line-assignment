import { CssBaseline, ThemeProvider } from "@mui/material";
import LoadingScreen from "./components/LoadingScreen";
import theme from "./theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LoadingScreen />
    </ThemeProvider>
  );
}

export default App;
