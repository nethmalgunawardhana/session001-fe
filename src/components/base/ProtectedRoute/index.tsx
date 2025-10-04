import React from "react";
import { Navigate } from "react-router-dom";
import { LOGIN } from "constants/routes";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
}) => {
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;

  if (requireAuth && !isAuthenticated) {
    return <Navigate to={LOGIN} replace />;
  }

  if (!requireAuth && isAuthenticated) {
    // If user is already authenticated and trying to access login/register
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
