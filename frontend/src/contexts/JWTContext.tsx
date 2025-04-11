import {
  ActionMap,
  AuthResponse,
  AuthState,
  JWTContextType,
  UserInfo,
} from "@/types/auth";
import apiRequest from "@/utils/axios/request";
import { setSession } from "@/utils/jwt";
import type { ReactNode } from "react";

import { createContext, useEffect, useMemo, useReducer } from "react";

// ----------------------------------------------------------------------

enum Types {
  Initial = "INITIALIZE",
  Logout = "LOGOUT",
}

type JWTAuthPayload = {
  [Types.Initial]: {
    isAuthenticated: boolean;
    user: UserInfo | null;
  };

  [Types.Logout]: undefined;
};

export type JWTActions =
  ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>];

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const JWTReducer = (state: AuthState, action: JWTActions) => {
  switch (action.type) {
    case "INITIALIZE":
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      };

    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
};

const AuthContext = createContext<JWTContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          const response = await apiRequest.get<UserInfo>("users/me");
          const user = response.data;
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: Types.Initial,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const login = async (userId: string) => {
    try {
      const response = await apiRequest.post<AuthResponse>("auth/login", {
        userId,
      });
      const { token } = response.data;
      setSession(token);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const logout = async () => {
    setSession(null);
    dispatch({ type: Types.Logout });
  };

  const contextValue = useMemo(
    () => ({
      ...state,
      method: "jwt" as const,
      logout,
      login,
    }),
    [state, logout, login]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
