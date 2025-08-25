import axios from 'axios';
import { onlyDigits } from '../utils/format';

export type ViaCepResponse = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string; // municipio
  uf: string;
  ddd?: string;
  ibge?: string;
  siafi?: string;
  gia?: string;
  erro?: boolean;
};

export const ViaCepService = {
  async lookup(cep: string): Promise<ViaCepResponse | null> {
    const digits = onlyDigits(cep);
    if (digits.length !== 8) return null;
    const url = `https://viacep.com.br/ws/${digits}/json/`;
    const resp = await axios.get<ViaCepResponse>(url, { timeout: 10000 });
    if ((resp.data as any)?.erro) return null;
    return resp.data;
  },
};

