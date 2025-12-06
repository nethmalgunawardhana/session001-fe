import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../../utils/auth';
import * as routes from '../../../constants/routes';

// Protected route component - requires authentication to access
export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  if (!isAuthenticated()) {
    // User is not authenticated, redirect to login while saving the attempted location
    return <Navigate to={routes.LOGIN} state={{ from: location }} replace />;
  }
  
  // User is authenticated, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
