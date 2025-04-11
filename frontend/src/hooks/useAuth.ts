import type { JWTContextType } from "@/types/auth";

import { useContext } from "react";

//
import { AuthContext } from "@/contexts/JWTContext";

// ----------------------------------------------------------------------

const useAuth = () => {
  const context = useContext<JWTContextType | null>(AuthContext);

  if (!context) throw new Error("Auth context must be use inside AuthProvider");

  return context;
};

export default useAuth;
