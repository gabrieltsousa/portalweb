export type NormalizedError = {
  code: string;
  message: string;
  status?: number;
  details?: unknown;
  raw?: unknown;
};

// Map common HTTP status codes to user-friendly messages
const STATUS_MESSAGES: Record<number, string> = {
  400: 'Requisição inválida',
  401: 'Não autorizado. Verifique suas credenciais.',
  403: 'Acesso negado',
  404: 'Recurso não encontrado',
  408: 'Tempo de requisição esgotado',
  422: 'Dados inválidos',
  429: 'Muitas requisições. Tente novamente mais tarde',
  500: 'Erro interno do servidor',
  502: 'Gateway inválido',
  503: 'Serviço indisponível',
  504: 'Tempo limite excedido no servidor',
};

export function normalizeError(err: unknown): NormalizedError {
  // Handle AxiosError-like object safely without importing axios types
  const anyErr: any = err as any;

  // Axios error shape has isAxiosError flag and response/request
  if (anyErr && anyErr.isAxiosError) {
    const status: number | undefined = anyErr.response?.status;
    const serverMessage: string | undefined =
      anyErr.response?.data?.message || anyErr.response?.data?.error || anyErr.message;

    return {
      code: anyErr.code || `HTTP_${status ?? 'UNKNOWN'}`,
      message: serverMessage || (status ? STATUS_MESSAGES[status] : 'Erro de rede'),
      status,
      details: anyErr.response?.data,
      raw: err,
    };
  }

  // Fetch-like error or generic Error
  if (anyErr && anyErr.name && anyErr.message) {
    return {
      code: anyErr.name,
      message: anyErr.message || 'Ocorreu um erro inesperado',
      raw: err,
    };
  }

  return {
    code: 'UNKNOWN_ERROR',
    message: 'Ocorreu um erro inesperado',
    raw: err,
  };
}