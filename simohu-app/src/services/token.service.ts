let authToken: string | null = null;

export const TokenService = {
  setToken(token: string | null) {
    authToken = token;
  },
  getToken(): string | null {
    return authToken;
  },
  clearToken() {
    authToken = null;
  },
};

