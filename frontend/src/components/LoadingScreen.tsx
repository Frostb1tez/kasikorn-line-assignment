import { Box, styled } from "@mui/material";

const Loader = styled("div")(({ theme }) => ({
  width: "50px",
  aspectRatio: "1",
  background: `
    radial-gradient(farthest-side, ${theme.palette.primary.main} 94%, transparent) 0 0,
    radial-gradient(farthest-side, ${theme.palette.primary.main} 94%, transparent) 100% 0,
    radial-gradient(farthest-side, ${theme.palette.primary.main} 94%, transparent) 100% 100%,
    radial-gradient(farthest-side, ${theme.palette.primary.main} 94%, transparent) 0 100%
  `,
  backgroundSize: "40% 40%",
  backgroundRepeat: "no-repeat",
  animation: "loading 0.5s infinite",
  "@keyframes loading": {
    "100%": {
      backgroundPosition: "100% 0, 100% 100%, 0 100%, 0 0",
    },
  },
}));

const SplashContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flex: 1,
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 30,
  backgroundColor: theme.palette.background.default,
}));

interface LoadingScreenProps {
  fullScreen?: boolean;
}

const LoadingScreen = ({ fullScreen = true }: LoadingScreenProps) => {
  if (!fullScreen) {
    return <Loader />;
  }

  return (
    <SplashContainer>
      <Loader />
    </SplashContainer>
  );
};

export default LoadingScreen;
