import React, { createContext, useState, useEffect } from "react";
import { isTokenExpired } from "../utils/jwtHelpers";

type AuthContextType = {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
};
export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: React.PropsWithChildren<object>) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [, setToken] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      if (isTokenExpired(accessToken)) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
        setToken(accessToken);
      }
    }
  }, []);

  function login(token: string) {
    setIsLoggedIn(true);
    setToken(token);
    localStorage.setItem("access_token", token);
  }

  function logout() {
    setIsLoggedIn(false);
    setToken("");
    localStorage.removeItem("access_token");
  }

  const authValue = {
    isLoggedIn,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};
