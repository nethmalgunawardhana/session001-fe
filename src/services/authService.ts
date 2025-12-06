import { axiosInstance as axios } from '../config/axios';

export interface RegisterUserDto {
  fullName: string;
  email: string;
  password: string;
  role: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface UserDto {
  userId: number;
  fullName: string;
  email: string;
  role: string;
  emailConfirmed: boolean;
}

export interface AuthResponseDto {
  token: string;
  user: UserDto;
}

export class AuthService {
  static async register(data: RegisterUserDto): Promise<UserDto> {
    const response = await axios.post('/api/Auth/register', data);
    return response.data;
  }

  static async login(data: LoginUserDto): Promise<AuthResponseDto> {
    const response = await axios.post('/api/Auth/login', data);
    return response.data;
  }
}
