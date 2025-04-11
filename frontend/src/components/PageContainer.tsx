import { Box, BoxProps } from "@mui/material";
import React from "react";

interface PageContainerProps extends BoxProps {
  component?: React.ElementType;
  fullHeight?: boolean;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  component = "main",
  fullHeight = true,
  sx,
  ...other
}) => {
  return (
    <Box
      component={component}
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: fullHeight ? "100vh" : "auto",
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
};

export default PageContainer;
