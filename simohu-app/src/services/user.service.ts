import { api } from './api';

export type RegisterPayload = {
  NI_IDPERFIL: number;
  NI_TIPOUSUARIOPORTAL: number;
  VC_LOGIN: string;
  VC_NOME: string;
  VC_SEXO: string;
  VC_CPF: number | string;
  VC_CELULAR: string;
  VC_TELRESIDENCIAL: string;
  DT_NASCIMENTO: string; // dd/mm/yyyy
  VC_CEP: string;
  VC_LOGRADOURO: string;
  NI_NUMERO: number | string;
  VC_BAIRRO: string;
  VC_COMPLEMENTO?: string;
  VC_MUNICIPIO: string;
  VC_UF: string;
  VC_SENHA: string;
};

export const UserService = {
  async create(payload: RegisterPayload) {
    const response = await api.post('/usuarioportal', payload);
    return response.data;
  },
};

