"use client";

import { AuthProvider } from "@/contexts/auth.provider";

const AuthWrapper = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AuthWrapper;
