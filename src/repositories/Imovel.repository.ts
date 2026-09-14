import type { Imovel, NovoImovel } from '../types/Imovel/Imovel.types';
import { prisma } from './prismaClient';

export type { NovoImovel };

export const criarImovel = async (dados: NovoImovel): Promise<Imovel> => {
    return prisma.imovel.create({ data: dados }) as Promise<Imovel>;
}

export const buscarImovelPorId = async (id: string): Promise<Imovel | null> => {
    return prisma.imovel.findUnique({ where: { id } }) as Promise<Imovel | null>;
}

export const listarImoveis = async (): Promise<Imovel[]> => {
    return prisma.imovel.findMany() as Promise<Imovel[]>;
}

export const atualizarImovel = async (id: string, dados: Partial<NovoImovel>): Promise<Imovel> => {
    return prisma.imovel.update({ where: { id }, data: dados }) as Promise<Imovel>;
}

export const removerImovel = async (id: string): Promise<void> => {
    await prisma.imovel.delete({ where: { id } });
}
