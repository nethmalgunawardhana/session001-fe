import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';
import { RootState } from 'store/reducer';
import { IAccessToken } from 'store/auth/types';

const auth = (state: RootState) => {
  return state.auth.auth;
};

const authState = (state: RootState) => {
  return state.auth;
};

export const accessToken = createDraftSafeSelector(
  auth,
  (state) => state?.token
);

export const user = createDraftSafeSelector(auth, (state) => state?.user);

export const tokenType = createDraftSafeSelector(authState, (state) => state.tokenType || 'Bearer');

export const tokenExpiresIn = createDraftSafeSelector(accessToken, (token) =>
  token ? jwtDecode<IAccessToken>(token).exp : null
);

export const userId = createDraftSafeSelector(user, (userObj) =>
  userObj ? userObj.userID : null
);

export const userRole = createDraftSafeSelector(user, (userObj) =>
  userObj ? userObj.role : null
);

export const userRoleId = createDraftSafeSelector(user, (userObj) =>
  userObj ? userObj.roleId : null
);

export const accessTokenWithType = createDraftSafeSelector(
  [tokenType, accessToken],
  (type, token) => (type && token ? `${type} ${token}` : null)
);

export const isTokenValid = createDraftSafeSelector(tokenExpiresIn, (expires) =>
  expires ? moment.unix(expires).isSameOrAfter(moment()) : false
);

export const isAuthorized = createDraftSafeSelector(
  [isTokenValid, user],
  (valid, userObj) => valid && userObj?.username !== undefined
);

export const isAuthenticated = createDraftSafeSelector(
  authState,
  (state) => state.isAuthenticated
);

// For backward compatibility - returns user role as permission
export const permission = (state: RootState) => {
  const userObj = state?.auth?.auth?.user;
  if (!userObj) return null;
  
  // Return role information in a compatible format
  return {
    role: userObj.role,
    roleId: userObj.roleId,
  };
};
