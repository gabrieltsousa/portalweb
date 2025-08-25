import { api } from './api';
import { TokenService } from './token.service';

export type LoginPayload = {
  login: string;
  senha: string;
  tipo: 1 | 2; // 1 = PF, 2 = PJ
};

export type LoginResponse = {
  token?: string;
  user?: unknown;
  [key: string]: any;
};

export const AuthService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const response = await api.post('/login', payload);
    const data = response.data as LoginResponse;
    if (data?.token) {
      TokenService.setToken(data.token);
    }
    return data;
  },
};