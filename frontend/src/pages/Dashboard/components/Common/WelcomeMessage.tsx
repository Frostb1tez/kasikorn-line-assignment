import { Box, Typography } from "@mui/material";
import React from "react";

interface WelcomeMessageProps {
  greetingMessage: string;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ greetingMessage }) => {
  return (
    <Box sx={{ pt: 2 }}>
      <Typography variant="h5" gutterBottom>
        {greetingMessage}
      </Typography>
    </Box>
  );
};

export default WelcomeMessage;
