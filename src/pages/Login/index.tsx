import React, { useEffect } from "react";

export const Login: React.FC = () => {
  useEffect(() => {
    localStorage.clear();
    // Auto-redirect to dashboard since we don't need login
    window.location.href = "/";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Redirecting to Dashboard...</h2>
      </div>
    </div>
  );
};

export default Login;
