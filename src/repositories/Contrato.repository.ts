import type { Contrato, NovoContrato, StatusContrato, ContratoComRelacoes, ContratoResumo } from '../types/Contrato/Contrato.types';
import type { Endereco } from '../types/Endereco/Endereco.types';
import { prisma } from './prismaClient';

export type { NovoContrato, ContratoComRelacoes, ContratoResumo };

export const criarContrato = async (dados: NovoContrato): Promise<Contrato> => {
    return prisma.contrato.create({ data: dados }) as Promise<Contrato>;
}

export const buscarContratoPorId = async (id: string): Promise<Contrato | null> => {
    return prisma.contrato.findUnique({ where: { id } }) as Promise<Contrato | null>;
}

export const listarContratosResumo = async (ativo?: StatusContrato): Promise<ContratoResumo[]> => {
    const contratos = await prisma.contrato.findMany({
        where: ativo ? { ativo } : undefined,
        select: {
            id: true,
            inquilinoId: true,
            inquilino: { select: { nome: true } },
            imovel: {
                select: {
                    endereco: true,
                    proprietario: { select: { nome: true } }
                }
            }
        }
    }) as unknown as Array<{
        id: string;
        inquilinoId: string;
        inquilino: { nome: string };
        imovel: { endereco: Endereco; proprietario: { nome: string } };
    }>;

    return contratos.map((contrato) => ({
        id: contrato.id,
        inquilinoId: contrato.inquilinoId,
        inquilinoNome: contrato.inquilino.nome,
        proprietarioNome: contrato.imovel.proprietario.nome,
        endereco: contrato.imovel.endereco
    }));
}


// include separado do buscarContratoPorId de propósito: essa consulta é só pro recibo, não pras demais telas
const contratoComRelacoesInclude = {
    imovel: {
        include: {
            endereco: true,
            proprietario: { include: { endereco: true } }
        }
    },
    inquilino: { include: { endereco: true } },
    destinatario: { include: { endereco: true } }
};

export const buscarContratoComRelacoesPorId = async (id: string): Promise<ContratoComRelacoes | null> => {
    return prisma.contrato.findUnique({
        where: { id },
        include: contratoComRelacoesInclude
    }) as Promise<ContratoComRelacoes | null>;
}

export const listarContratos = async (): Promise<Contrato[]> => {
    return prisma.contrato.findMany() as Promise<Contrato[]>;
}

export const atualizarContrato = async (id: string, dados: Partial<NovoContrato>): Promise<Contrato> => {
    return prisma.contrato.update({ where: { id }, data: dados }) as Promise<Contrato>;
}

export const removerContrato = async (id: string): Promise<void> => {
    await prisma.contrato.delete({ where: { id } });
}
