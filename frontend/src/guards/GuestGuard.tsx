import type { ReactNode } from "react";

import { Navigate } from "react-router-dom";

import LoadingScreen from "../components/LoadingScreen";
import useAuth from "../hooks/useAuth";
import { PATH_PAGE } from "../routes/paths";

// ----------------------------------------------------------------------

type GuestGuardProps = {
  children: ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  const { isAuthenticated, isInitialized } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={PATH_PAGE.dashboard} />;
  }

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
