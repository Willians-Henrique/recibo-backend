import type { Endereco, NovoEndereco } from '../types/Endereco/Endereco.types';
import { prisma } from './prismaClient';

export type { NovoEndereco };

export const criarEndereco = async (dados: NovoEndereco): Promise<Endereco> => {
    return prisma.endereco.create({ data: dados }) as Promise<Endereco>;
}

export const buscarEnderecoPorId = async (id: string): Promise<Endereco | null> => {
    return prisma.endereco.findUnique({ where: { id } }) as Promise<Endereco | null>;
}

export const listarEnderecos = async (): Promise<Endereco[]> => {
    return prisma.endereco.findMany() as Promise<Endereco[]>;
}

export const atualizarEndereco = async (id: string, dados: Partial<NovoEndereco>): Promise<Endereco> => {
    return prisma.endereco.update({ where: { id }, data: dados }) as Promise<Endereco>;
}

export const removerEndereco = async (id: string): Promise<void> => {
    await prisma.endereco.delete({ where: { id } });
}
