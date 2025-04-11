import { Box, Button, Container, styled } from "@mui/material";

export const PinContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  backgroundColor: theme.palette.primary.main,
}));

export const PinTop = styled(Box)(() => ({
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
}));

export const PinBottom = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  height: 370,
  [theme.breakpoints.down("sm")]: {
    height: 310,
  },
}));

export const PinDot = styled(Box)<{ filled?: boolean }>(({ filled }) => ({
  display: "inline-block",
  position: "relative",
  width: 12,
  height: 12,
  margin: "0 12px",
  border: "1px solid rgba(255, 255, 255, 0.5)",
  borderRadius: "50%",
  "&::before": {
    position: "absolute",
    top: -1,
    left: -1,
    width: 14,
    height: 14,
    background: "#fff",
    borderRadius: "50%",
    content: '""',
    transform: filled ? "scale(1)" : "scale(0)",
    transition: "transform 0.1s cubic-bezier(0.15, 0.98, 0.76, 0.62)",
  },
}));

export const PinKeypad = styled(Box)(() => ({
  position: "absolute",
  left: 0,
  bottom: 20,
  width: "100%",
  fontSize: 0,
}));

export const PinKey = styled(Button)(({ theme }) => ({
  display: "inline-block",
  overflow: "hidden",
  position: "relative",
  width: "33.3%",
  height: 63,
  fontSize: "2.6rem",
  lineHeight: "5.3rem",
  color: "#fff",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  [theme.breakpoints.down("sm")]: {
    height: 55,
  },
}));
