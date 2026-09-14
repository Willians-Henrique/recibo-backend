import type { Response, NextFunction } from 'express';
import { Prisma } from '../../generated/prisma';

// centraliza o mapeamento de erro -> status HTTP pra não repetir em cada controller
export const tratarErroController = (error: unknown, res: Response, next: NextFunction) => {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        res.status(404).json({ error: 'Registro não encontrado' });
        return;
    }

    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        return;
    }

    next(error);
}
