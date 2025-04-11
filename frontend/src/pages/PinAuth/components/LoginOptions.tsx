import { Stack, Typography } from "@mui/material";
import React from "react";

export const LoginOptions: React.FC = () => {
  return (
    <Stack spacing={2}>
      <Typography
        component="a"
        href="#"
        sx={{
          color: "#fff",
          textAlign: "center",
          textDecoration: "none",
        }}
        variant="body1"
      >
        Login with ID / Password
      </Typography>
      <Typography
        sx={{
          color: "#fff",
          textAlign: "center",
        }}
        variant="body1"
      >
        Powered by TestLab
      </Typography>
    </Stack>
  );
};
