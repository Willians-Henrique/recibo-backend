import { Request, Response, NextFunction } from 'express';
import {
    buscarContratoPorId,
    buscarReciboContrato,
    listarContratos,
    listarContratosResumo,
    criarContrato,
    atualizarContrato,
    removerContrato
} from '../services/Contrato.service';
import { STATUS_CONTRATO_VALIDOS, type StatusContrato } from '../types/Contrato/Contrato.types';
import { tratarErroController } from '../utils/tratarErroController';

export const buscarContrato = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contrato = await buscarContratoPorId(req.params.id as string);

        if (!contrato) {
            res.status(404).json({ error: 'Contrato não encontrado' });
            return;
        }

        res.status(200).json(contrato);
    } catch (error) {
        next(error);
    }
}

export const buscarContratoRecibo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contrato = await buscarReciboContrato(req.params.id as string);

        if (!contrato) {
            res.status(404).json({ error: 'Contrato não encontrado' });
            return;
        }

        res.status(200).json(contrato);
    } catch (error) {
        next(error);
    }
}

export const listarTodosContratos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contratos = await listarContratos();
        res.status(200).json(contratos);
    } catch (error) {
        next(error);
    }
}

export const listarResumoContratos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ativo } = req.query;

        if (ativo !== undefined && !STATUS_CONTRATO_VALIDOS.includes(ativo as StatusContrato)) {
            res.status(400).json({ error: `ativo deve ser um de: ${STATUS_CONTRATO_VALIDOS.join(', ')}` });
            return;
        }

        const contratos = await listarContratosResumo(ativo as StatusContrato | undefined);
        res.status(200).json(contratos);
    } catch (error) {
        next(error);
    }
}

export const criarNovoContrato = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contrato = await criarContrato(req.body);
        res.status(201).json(contrato);
    } catch (error) {
        tratarErroController(error, res, next);
    }
}

export const atualizarContratoExistente = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contrato = await atualizarContrato(req.params.id as string, req.body);
        res.status(200).json(contrato);
    } catch (error) {
        tratarErroController(error, res, next);
    }
}

export const removerContratoExistente = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await removerContrato(req.params.id as string);
        res.status(204).send();
    } catch (error) {
        tratarErroController(error, res, next);
    }
}
