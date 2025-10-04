import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthResponse, ILoginRequest, IRegisterRequest } from "./types";

interface AuthState {
  loading: boolean;
  auth: IAuthResponse | null;
  error: string | null;
  tokenType: string;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  loading: false,
  auth: null,
  error: null,
  tokenType: "Bearer",
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequested(state, action: PayloadAction<ILoginRequest>) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<IAuthResponse>) {
      state.loading = false;
      state.error = null;
      state.auth = action.payload;
      state.isAuthenticated = true;
      // Store token in localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    registerRequested(state, action: PayloadAction<IRegisterRequest>) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(state, action: PayloadAction<IAuthResponse>) {
      state.loading = false;
      state.error = null;
      state.auth = action.payload;
      state.isAuthenticated = true;
      // Store token in localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logout(state) {
      state.loading = false;
      state.auth = null;
      state.error = null;
      state.isAuthenticated = false;
      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    loadAuthFromStorage(state) {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          state.auth = { token, user, expiresAt: "" };
          state.isAuthenticated = true;
        } catch (error) {
          state.isAuthenticated = false;
        }
      }
    },
  },
});

export const {
  loginRequested,
  loginSuccess,
  loginFailure,
  registerRequested,
  registerSuccess,
  registerFailure,
  logout,
  loadAuthFromStorage,
} = authSlice.actions;

export default authSlice.reducer;

