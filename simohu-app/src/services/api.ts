import axios from 'axios';
import { normalizeError, NormalizedError } from '../utils/httpError';

export const API_BASE_URL = 'https://portalwebapi-simohu.onebox.one';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalized: NormalizedError = normalizeError(error);
    return Promise.reject(normalized);
  }
);