import { PrismaClient } from '../../generated/prisma';

export const prisma = new PrismaClient();

export const prismaConnect = async () => {
    try {
        console.log('Conectando ao banco via Prisma...');
        await prisma.$connect();
        console.log('Prisma conectado com sucesso...');
    } catch (error) {
        console.log('Erro de conexão ao banco (Prisma):', error);
    }
}
