import { z } from 'zod';
import { ESTADOS_CIVIS_VALIDOS, type NovaPessoa } from '../types/Pessoa/Pessoa.types';

export const pessoaSchema = z.object({
    enderecoId: z.string().min(1),
    nome: z.string().min(1),
    telefone: z.string().min(1),
    email: z.email(),
    cpf: z.string().min(1),
    rg: z.string().min(1),
    orgaoEmissor: z.string().min(1),
    ufEmissorRg: z.string().min(1),
    estadoCivil: z.enum(ESTADOS_CIVIS_VALIDOS),
    nacionalidade: z.string().min(1),
}) satisfies z.ZodType<NovaPessoa>;

