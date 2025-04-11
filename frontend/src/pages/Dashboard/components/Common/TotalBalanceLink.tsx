import { Box, Button } from "@mui/material";
import React from "react";

const TotalBalanceLink: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Button
        variant="outlined"
        size="large"
        onClick={handleScrollToTop}
        sx={{
          color: "black",
          borderColor: "grey.100",
          "&:hover": {
            borderColor: "grey.200",
          },
        }}
      >
        Total Balance
      </Button>
    </Box>
  );
};

export default TotalBalanceLink;
