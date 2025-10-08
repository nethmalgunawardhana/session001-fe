import axios from 'axios';
import { accessTokenWithType } from 'store/auth/selector';
import { apiURL } from './urls';
import { getToken, logout } from '../utils/auth';

export const axiosInstance = axios.create({
  baseURL: apiURL,

  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
});

// Add request interceptor to attach token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, logout user
      logout();
    }
    return Promise.reject(error);
  }
);

export function createAxios({ getState }: { getState: any }) {
  axiosInstance.interceptors.request.use(
    (config: any) => {
      const { useAuth, ...headers } = config.headers;

      const state = getState();
      const stateToken = accessTokenWithType(state);
      const localToken = getToken();
      
      // Use token from state if available, otherwise use from localStorage
      headers.Authorization = stateToken || (localToken ? `Bearer ${localToken}` : '');

      return { ...config, headers };
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}
