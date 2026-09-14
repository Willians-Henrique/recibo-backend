import type { Imovel, NovoImovel, AtualizarImovel } from '../types/Imovel/Imovel.types';
import {
    criarImovel as criarImovelRepo,
    buscarImovelPorId as buscarImovelPorIdRepo,
    listarImoveis as listarImoveisRepo,
    atualizarImovel as atualizarImovelRepo,
    removerImovel as removerImovelRepo
} from '../repositories/Imovel.repository';
import { imovelSchema } from '../schemas/Imovel.schema';

export const buscarImovelPorId = async (id: string): Promise<Imovel | null> => {
    return buscarImovelPorIdRepo(id);
}

export const listarImoveis = async (): Promise<Imovel[]> => {
    return listarImoveisRepo();
}

export const criarImovel = async (dados: unknown): Promise<Imovel> => {
    const resultado = imovelSchema.safeParse(dados);

    if (!resultado.success) {
        throw new Error(resultado.error.issues.map((issue) => issue.message).join('; '));
    }

    const novoImovel: NovoImovel = resultado.data;

    return criarImovelRepo(novoImovel);
}

export const atualizarImovel = async (id: string, dados: unknown): Promise<Imovel> => {
    const resultado = imovelSchema.partial().safeParse(dados);

    if (!resultado.success) {
        throw new Error(resultado.error.issues.map((issue) => issue.message).join('; '));
    }

    const dadosAtualizados: AtualizarImovel = resultado.data;

    return atualizarImovelRepo(id, dadosAtualizados);
}

export const removerImovel = async (id: string): Promise<void> => {
    await removerImovelRepo(id);
}
