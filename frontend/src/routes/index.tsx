import { Navigate, useRoutes } from "react-router-dom";

import Loadable from "@/components/Loadable";
import AuthGuard from "@/guards/AuthGuard";
import GuestGuard from "@/guards/GuestGuard";
import DashboardLayout from "@/layouts/DashboardLayout";
import MainLayout from "@/layouts/MainLayout";
import Page404 from "@/pages/Page404";
import Page500 from "@/pages/Page500";
import { lazy } from "react";
const Dashboard = Loadable(lazy(() => import("@/pages/Dashboard")));
const PinAuth = Loadable(lazy(() => import("@/pages/PinAuth")));

export default function Router() {
  return useRoutes([
    {
      path: "",
      element: (
        <GuestGuard>
          <MainLayout />
        </GuestGuard>
      ),
      children: [
        {
          path: "/",
          element: <PinAuth />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [{ path: "", element: <Dashboard /> }],
    },
    {
      path: "*",
      element: <MainLayout />,
      children: [
        { path: "500", element: <Page500 /> },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
