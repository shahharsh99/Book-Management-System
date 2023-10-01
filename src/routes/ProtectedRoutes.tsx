import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRoutesProps {
  children: React.ReactNode;
}

export default function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  return <>{isTokenGenerated() ? <>{children}</> : <Navigate to="/login" />}</>;
}

export function isTokenGenerated(): boolean {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn === "true";
}
