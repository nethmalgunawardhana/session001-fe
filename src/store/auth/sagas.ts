import { takeLatest, put, call } from "redux-saga/effects";
import { axiosInstance } from "config";
import toast from "react-hot-toast";

import {
  loginRequested,
  loginSuccess,
  loginFailure,
  registerRequested,
  registerSuccess,
  registerFailure,
} from "./authSlice";
import { IAuthResponse } from "./types";

function* loginEffect(action: ReturnType<typeof loginRequested>): Generator<any, void, any> {
  try {
    const { data } = yield call(
      axiosInstance.post,
      `/auth/login`,
      action.payload
    );

    if (data && data.token) {
      yield put(loginSuccess(data as IAuthResponse));
      toast.success("Login successful!");
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    } else {
      const errorMessage = data?.message || "Login failed";
      toast.error(errorMessage);
      yield put(loginFailure(errorMessage));
    }
  } catch (error: any) {
    const errorMessage = 
      error?.response?.data?.message || 
      error?.response?.data?.error ||
      error.message || 
      "Login failed. Please check your credentials.";
    toast.error(errorMessage);
    yield put(loginFailure(errorMessage));
  }
}

function* registerEffect(action: ReturnType<typeof registerRequested>): Generator<any, void, any> {
  try {
    const { data } = yield call(
      axiosInstance.post,
      `/auth/register`,
      action.payload
    );

    if (data && data.token) {
      yield put(registerSuccess(data as IAuthResponse));
      toast.success("Registration successful!");
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    } else {
      const errorMessage = data?.message || "Registration failed";
      toast.error(errorMessage);
      yield put(registerFailure(errorMessage));
    }
  } catch (error: any) {
    const errorMessage = 
      error?.response?.data?.message || 
      error?.response?.data?.error ||
      error.message || 
      "Registration failed. Please try again.";
    toast.error(errorMessage);
    yield put(registerFailure(errorMessage));
  }
}

export function* authSaga(): Generator<any, void, any> {
  yield takeLatest(loginRequested, loginEffect);
  yield takeLatest(registerRequested, registerEffect);
}
