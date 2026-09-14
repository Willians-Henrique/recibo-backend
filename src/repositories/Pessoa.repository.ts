import type { Pessoa, NovaPessoa } from '../types/Pessoa/Pessoa.types';
import { prisma } from './prismaClient';

export type { NovaPessoa };

export const criarPessoa = async (dados: NovaPessoa): Promise<Pessoa> => {
    return prisma.pessoa.create({ data: dados }) as Promise<Pessoa>;
}

export const buscarPessoaPorId = async (id: string): Promise<Pessoa | null> => {
    return prisma.pessoa.findUnique({ where: { id } }) as Promise<Pessoa | null>;
}

export const listarPessoas = async (): Promise<Pessoa[]> => {
    return prisma.pessoa.findMany() as Promise<Pessoa[]>;
}

export const atualizarPessoa = async (id: string, dados: Partial<NovaPessoa>): Promise<Pessoa> => {
    return prisma.pessoa.update({ where: { id }, data: dados }) as Promise<Pessoa>;
}

export const removerPessoa = async (id: string): Promise<void> => {
    await prisma.pessoa.delete({ where: { id } });
}
