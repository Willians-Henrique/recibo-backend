import { z } from 'zod';
import { UFS_VALIDAS, type NovoEndereco } from '../types/Endereco/Endereco.types';

export const enderecoSchema = z.object({
    rua: z.string().min(1),
    numero: z.string().min(1),
    complemento: z.string().optional(),
    bairro: z.string().min(1),
    cidade: z.string().min(1),
    estado: z.enum(UFS_VALIDAS),
    pais: z.string().optional(),
}) satisfies z.ZodType<NovoEndereco>;

