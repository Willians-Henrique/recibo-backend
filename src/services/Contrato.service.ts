import type { Contrato, NovoContrato, AtualizarContrato } from '../types/Contrato/Contrato.types';
import {
    criarContrato as criarContratoRepo,
    buscarContratoPorId as buscarContratoPorIdRepo,
    buscarContratoComRelacoesPorId,
    listarContratos as listarContratosRepo,
    listarContratosResumo as listarContratosResumoRepo,
    atualizarContrato as atualizarContratoRepo,
    removerContrato as removerContratoRepo
} from '../repositories/Contrato.repository';
import type { ContratoComRelacoes, ContratoResumo } from '../repositories/Contrato.repository';
import { contratoSchema } from '../schemas/Contrato.schema';
import type { StatusContrato } from '../types/Contrato/Contrato.types';

export const buscarContratoPorId = async (id: string): Promise<Contrato | null> => {
    return buscarContratoPorIdRepo(id);
}

export const buscarReciboContrato = async (id: string): Promise<ContratoComRelacoes | null> => {
    return buscarContratoComRelacoesPorId(id);
}

export const listarContratosResumo = async (ativo?: StatusContrato): Promise<ContratoResumo[]> => {
    return listarContratosResumoRepo(ativo);
}

export const listarContratos = async (): Promise<Contrato[]> => {
    return listarContratosRepo();
}

export const criarContrato = async (dados: unknown): Promise<Contrato> => {
    const resultado = contratoSchema.safeParse(dados);

    if (!resultado.success) {
        throw new Error(resultado.error.issues.map((issue) => issue.message).join('; '));
    }

    const novoContrato: NovoContrato = resultado.data;

    return criarContratoRepo(novoContrato);
}

export const atualizarContrato = async (id: string, dados: unknown): Promise<Contrato> => {
    const resultado = contratoSchema.partial().safeParse(dados);

    if (!resultado.success) {
        throw new Error(resultado.error.issues.map((issue) => issue.message).join('; '));
    }

    const dadosAtualizados: AtualizarContrato = resultado.data;

    return atualizarContratoRepo(id, dadosAtualizados);
}

export const removerContrato = async (id: string): Promise<void> => {
    await removerContratoRepo(id);
}
