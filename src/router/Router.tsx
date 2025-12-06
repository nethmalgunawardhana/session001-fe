import { BrowserRouter, Navigate, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import * as routes from "../constants/routes";
import { Lazy } from "../components/base";
import { AppLayout } from "layouts";
import routeItems from "./routes";
import { isAuthenticated } from "../utils/auth";
import { useEffect } from "react";

// Component to handle authentication redirects
const AuthRedirect: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated()) {
      // If already logged in and trying to access login/register, redirect to dashboard
      navigate(routes.TOOLS_DASHBOARD, { replace: true });
    }
  }, [navigate, location]);

  return null;
};

// Protected Route Component
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  if (!isAuthenticated()) {
    // Redirect to login while saving the attempted location
    return <Navigate to={routes.LOGIN} state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

// Public Route Component (for login/register - redirect if already authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (isAuthenticated()) {
    // Already logged in, redirect to dashboard
    return <Navigate to={routes.TOOLS_DASHBOARD} replace />;
  }

  return <>{children}</>;
};

export const ClientRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes - Redirect to dashboard if already logged in */}
        <Route 
          path={routes.LOGIN} 
          element={
            <PublicRoute>
              <Lazy page="Login" />
            </PublicRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <PublicRoute>
              <Lazy page="Register" />
            </PublicRoute>
          } 
        />

        {/* Protected Routes - Require authentication */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          {/* Dashboard and other protected routes */}
          {routeItems.map((route, key) => {
            return (
              <Route
                path={route?.path}
                index={route?.path === routes.TOOLS_DASHBOARD}
                key={key}
                element={route?.component ? <Lazy page={route.component} /> : null}
              />
            );
          })}
        </Route>

        {/* Catch all - redirect to dashboard if authenticated, otherwise to login */}
        <Route
          path="*"
          element={
            isAuthenticated() ?
              <Navigate to={routes.TOOLS_DASHBOARD} replace /> :
              <Navigate to={routes.LOGIN} replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
