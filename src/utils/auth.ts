// Authentication utility functions

export const TOKEN_KEY = 'token';
export const USER_KEY = 'user';

export interface User {
  userId: number;
  fullName: string;
  email: string;
  role: string;
  emailConfirmed: boolean;
}

// Get token from localStorage
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

// Set token in localStorage
export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Remove token from localStorage
export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

// Get user from localStorage
export const getUser = (): User | null => {
  const userStr = localStorage.getItem(USER_KEY);
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

// Set user in localStorage
export const setUser = (user: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

// Remove user from localStorage
export const removeUser = (): void => {
  localStorage.removeItem(USER_KEY);
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = getToken();
  return !!token;
};

// Logout function
export const logout = (): void => {
  removeToken();
  removeUser();
  window.location.href = '/login';
};

// Login function
export const login = (token: string, user: User): void => {
  setToken(token);
  setUser(user);
};
