import type { Pessoa, NovaPessoa, AtualizarPessoa } from '../types/Pessoa/Pessoa.types';
import {
    criarPessoa as criarPessoaRepo,
    buscarPessoaPorId as buscarPessoaPorIdRepo,
    listarPessoas as listarPessoasRepo,
    atualizarPessoa as atualizarPessoaRepo,
    removerPessoa as removerPessoaRepo
} from '../repositories/Pessoa.repository';
import { pessoaSchema } from '../schemas/Pessoa.schema';

export const buscarPessoaPorId = async (id: string): Promise<Pessoa | null> => {
    return buscarPessoaPorIdRepo(id);
}

export const listarPessoas = async (): Promise<Pessoa[]> => {
    return listarPessoasRepo();
}

export const criarPessoa = async (dados: unknown): Promise<Pessoa> => {
    const resultado = pessoaSchema.safeParse(dados);

    if (!resultado.success) {
        throw new Error(resultado.error.issues.map((issue) => issue.message).join('; '));
    }

    const novaPessoa: NovaPessoa = resultado.data;

    return criarPessoaRepo(novaPessoa);
}

export const atualizarPessoa = async (id: string, dados: unknown): Promise<Pessoa> => {
    const resultado = pessoaSchema.partial().safeParse(dados);

    if (!resultado.success) {
        throw new Error(resultado.error.issues.map((issue) => issue.message).join('; '));
    }

    const dadosAtualizados: AtualizarPessoa = resultado.data;

    return atualizarPessoaRepo(id, dadosAtualizados);
}

export const removerPessoa = async (id: string): Promise<void> => {
    await removerPessoaRepo(id);
}
