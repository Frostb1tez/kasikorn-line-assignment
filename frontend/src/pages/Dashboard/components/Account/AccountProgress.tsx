import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

interface AccountProgressProps {
  progress: number;
}

const AccountProgress: React.FC<AccountProgressProps> = ({ progress }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex", mt: 2 }}>
      <CircularProgress
        variant="determinate"
        value={progress}
        size={60}
        sx={{ color: "text.white" }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" color="text.white">
          {progress}%
        </Typography>
      </Box>
    </Box>
  );
};

export default AccountProgress;
