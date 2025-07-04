"use client";

import checkAuth from "@/app/actions/checkAuth";
import { useState, useEffect } from "react";
import AuthContext from "./auth.context";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const { isAuthenticated, user } = await checkAuth();
        setIsAuthenticated(isAuthenticated);
        setCurrentUser(user);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
