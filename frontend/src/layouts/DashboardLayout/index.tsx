import { Box, useTheme } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import PageContainer from "../../components/PageContainer";
import DashboardHeader from "./components/DashboardHeader";

const DashboardLayout: React.FC = () => {
  const theme = useTheme();

  return (
    <PageContainer fullHeight>
      <DashboardHeader />
      <Outlet />
      <Box sx={{ ...theme.mixins.toolbar }} />
    </PageContainer>
  );
};

export default DashboardLayout;
