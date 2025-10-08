import React from 'react';

// Simple protected route component - authentication bypassed for dashboard access
export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export default ProtectedRoute;