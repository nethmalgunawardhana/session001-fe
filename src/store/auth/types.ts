export interface IUser {
  userID: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: string;
  roleId: number;
  isActive: boolean;
  createdDate: string;
}

export interface IAccessToken {
  exp: number;
  email: string;
  sub: string;
  role: string;
}

export interface IAuthResponse {
  token: string;
  user: IUser;
  expiresAt: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: number;
}

export interface IRole {
  id: number;
  name: string;
  displayName: string;
}
