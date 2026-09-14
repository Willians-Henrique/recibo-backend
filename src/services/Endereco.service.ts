import type { Endereco, NovoEndereco, AtualizarEndereco } from '../types/Endereco/Endereco.types';
import {
    criarEndereco as criarEnderecoRepo,
    buscarEnderecoPorId as buscarEnderecoPorIdRepo,
    listarEnderecos as listarEnderecosRepo,
    atualizarEndereco as atualizarEnderecoRepo,
    removerEndereco as removerEnderecoRepo
} from '../repositories/Endereco.repository';
import { enderecoSchema } from '../schemas/Endereco.schema';

export const buscarEnderecoPorId = async (id: string): Promise<Endereco | null> => {
    return buscarEnderecoPorIdRepo(id);
}

export const listarEnderecos = async (): Promise<Endereco[]> => {
    return listarEnderecosRepo();
}

export const criarEndereco = async (dados: unknown): Promise<Endereco> => {
    const resultado = enderecoSchema.safeParse(dados);

    if (!resultado.success) {
        throw new Error(resultado.error.issues.map((issue) => issue.message).join('; '));
    }

    const novoEndereco: NovoEndereco = resultado.data;

    return criarEnderecoRepo(novoEndereco);
}

export const atualizarEndereco = async (id: string, dados: unknown): Promise<Endereco> => {
    const resultado = enderecoSchema.partial().safeParse(dados);

    if (!resultado.success) {
        throw new Error(resultado.error.issues.map((issue) => issue.message).join('; '));
    }

    const dadosAtualizados: AtualizarEndereco = resultado.data;

    return atualizarEnderecoRepo(id, dadosAtualizados);
}

export const removerEndereco = async (id: string): Promise<void> => {
    await removerEnderecoRepo(id);
}


