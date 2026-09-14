import { z } from 'zod';
import { TIPOS_IMOVEL_VALIDOS, type NovoImovel } from '../types/Imovel/Imovel.types';

export const imovelSchema = z.object({
    enderecoId: z.string().min(1),
    proprietarioId: z.string().min(1),
    tipo: z.enum(TIPOS_IMOVEL_VALIDOS),
    condominio: z.string().optional(),
    codigoAgua: z.string().optional(),
    codigoEnergia: z.string().optional(),
    codigoIptu: z.string().optional(),
    numeroRegistro: z.string().optional(),
}) satisfies z.ZodType<NovoImovel>;

