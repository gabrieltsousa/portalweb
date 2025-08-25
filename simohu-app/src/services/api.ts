import axios from 'axios';
import { normalizeError, NormalizedError } from '../utils/httpError';
import { TokenService } from './token.service';

export const API_BASE_URL = 'https://portalwebapi-simohu.onebox.one';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = TokenService.getToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalized: NormalizedError = normalizeError(error);
    return Promise.reject(normalized);
  }
);