import { z } from 'zod';
import { cpf } from 'cpf-cnpj-validator';
import { isValidPhoneNumber } from "libphonenumber-js";

export const formSchema = z.object({
  name: z.string().min(3, 'O nome completo é obrigatório.'),
  cpf: z.string().min(1, 'O CPF é obrigatório.').refine(val => cpf.isValid(val), {message: 'CPF inválido ou inexistente!'}),

  escola: z.string().min(2, 'O nome da escola é obrigatório.'), // corrigir com escolas cadastradas

  school_year: z.string().refine(val => ['9_fundamental', '3_medio'].includes(val), { 
    message: 'Selecione uma série válida.' 
  }),

  phone: z.string()
    .min(1, 'O WhatsApp é obrigatório.').refine((val) => {

      const apenasNumeros = val.replace(/\D/g, '');
      const isRepetido = /^(\d)\1+$/.test(apenasNumeros);
      return !isRepetido; 

    }, { message: 'Por favor, insira um número real.' })
    .refine((val) => isValidPhoneNumber(val, 'BR'), { message: 'Número de telefone inválido.' }),

  email: z.string().email('Digite um e-mail válido.')
});

export const maskCPF = (value) => {
  return value
    .replace(/\D/g, '') // Remove tudo o que não é dígito
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca ponto
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca ponto
    .replace(/(\d{3})(\d{1,2})/, '$1-$2') // Coloca hífen
    .replace(/(-\d{2})\d+?$/, '$1'); // Trava o tamanho
};

export const maskPhone = (value) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
};