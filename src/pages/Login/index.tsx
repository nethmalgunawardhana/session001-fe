import React, { useState } from "react";
import { AuthService, LoginUserDto, AuthResponseDto } from "../../services/authService";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login } from "../../utils/auth";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/";

  const [formData, setFormData] = useState<LoginUserDto>({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response: AuthResponseDto = await AuthService.login(formData);

      // Store token and user info
      login(response.token, response.user);

      // Redirect to the page they tried to visit or dashboard
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error("Login error:", err);

      // In development mode, use mock login when backend is not available
      if (process.env.NODE_ENV === 'development' &&
          formData.email === "demo@example.com" &&
          formData.password === "Demo@123") {

        // Create mock auth response
        const mockResponse: AuthResponseDto = {
          token: "mock-dev-token-" + Date.now(),
          user: {
            userId: 1,
            fullName: "Demo User",
            email: "demo@example.com",
            role: "Admin",
            emailConfirmed: true
          }
        };

        // Store mock token and user info
        login(mockResponse.token, mockResponse.user);

        console.warn("Using mock authentication (backend not available)");

        // Redirect to the page they tried to visit or dashboard
        navigate(from, { replace: true });
      } else {
        setError(err?.response?.data || err.message || "Login failed. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDemoLogin = () => {
    setFormData({
      email: "demo@example.com",
      password: "Demo@123"
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <input
              name="email"
              type="email"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-4"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              name="password"
              type="password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-4"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {error && <div className="text-red-600 text-center">{error}</div>}
          <div className="space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
            {process.env.NODE_ENV === 'development' && (
              <button
                type="button"
                onClick={handleDemoLogin}
                className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Use Demo Credentials
              </button>
            )}
          </div>
        </form>
        <div className="text-center">
          <a href="/register" className="text-indigo-600 hover:text-indigo-800">Don't have an account? Register</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
