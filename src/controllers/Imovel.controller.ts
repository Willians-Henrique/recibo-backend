import { Request, Response, NextFunction } from 'express';
import {
    buscarImovelPorId,
    listarImoveis,
    criarImovel,
    atualizarImovel,
    removerImovel
} from '../services/Imovel.service';
import { tratarErroController } from '../utils/tratarErroController';

export const buscarImovel = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const imovel = await buscarImovelPorId(req.params.id as string);

        if (!imovel) {
            res.status(404).json({ error: 'Imóvel não encontrado' });
            return;
        }

        res.status(200).json(imovel);
    } catch (error) {
        next(error);
    }
}

export const listarTodosImoveis = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const imoveis = await listarImoveis();
        res.status(200).json(imoveis);
    } catch (error) {
        next(error);
    }
}

export const criarNovoImovel = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const imovel = await criarImovel(req.body);
        res.status(201).json(imovel);
    } catch (error) {
        tratarErroController(error, res, next);
    }
}

export const atualizarImovelExistente = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const imovel = await atualizarImovel(req.params.id as string, req.body);
        res.status(200).json(imovel);
    } catch (error) {
        tratarErroController(error, res, next);
    }
}

export const removerImovelExistente = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await removerImovel(req.params.id as string);
        res.status(204).send();
    } catch (error) {
        tratarErroController(error, res, next);
    }
}
