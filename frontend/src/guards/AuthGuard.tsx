import { useState, type ReactNode } from "react";

import LoadingScreen from "@/components/LoadingScreen";
import useAuth from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

import { PATH_PAGE } from "@/routes/paths";

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isInitialized } = useAuth();
  const { pathname } = useLocation();

  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null
  );

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Navigate to={PATH_PAGE.home} />;
  }

  return <>{children}</>;
}
