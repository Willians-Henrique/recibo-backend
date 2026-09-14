import { z } from 'zod';
import {
    TIPOS_LOCACAO_VALIDOS,
    GARANTIAS_VALIDAS,
    STATUS_CONTRATO_VALIDOS,
    type NovoContrato
} from '../types/Contrato/Contrato.types';

export const contratoSchema = z.object({
    imovelId: z.string().min(1),
    inquilinoId: z.string().min(1),
    destinatarioId: z.string().min(1),
    tipoLocacao: z.enum(TIPOS_LOCACAO_VALIDOS),
    garantia: z.enum(GARANTIAS_VALIDAS),
    dataInicio: z.string().min(1),
    duracaoMeses: z.number().int().positive(),
    dataFim: z.string().min(1),
    valorAluguel: z.string().min(1),
    taxaAdministracao: z.string().min(1),
    diaVencimento: z.number().int().min(1).max(31),
    proximoReajuste: z.string().min(1),
    acrescimoInquilino: z.string().min(1),
    admAcrescimoInquilino: z.string().min(1),
    descontoInquilino: z.string().min(1),
    admDescontoInquilino: z.string().min(1),
    acrescimoProprietario: z.string().min(1),
    descontoProprietario: z.string().min(1),
    iptu: z.string().min(1),
    iptuProprietario: z.string().min(1),
    condominio: z.string().min(1),
    condominioProprietario: z.string().min(1),
    seguroFianca: z.string().min(1),
    seguroIncendio: z.string().min(1).default('0'),
    parcelaCaucao: z.string().min(1),
    observacoes: z.string().optional(),
    pix: z.string().optional(),
    agenciaConta: z.string().optional(),
    retirada: z.boolean(),
    ativo: z.enum(STATUS_CONTRATO_VALIDOS).default('ativo'),
}) satisfies z.ZodType<NovoContrato>;

