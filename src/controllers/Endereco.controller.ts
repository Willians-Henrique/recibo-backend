import { Request, Response, NextFunction } from 'express';
import {
    buscarEnderecoPorId,
    listarEnderecos,
    criarEndereco,
    atualizarEndereco,
    removerEndereco
} from '../services/Endereco.service';
import { tratarErroController } from '../utils/tratarErroController';

export const buscarEndereco = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const endereco = await buscarEnderecoPorId(req.params.id as string);

        if (!endereco) {
            res.status(404).json({ error: 'Endereço não encontrado' });
            return;
        }

        res.status(200).json(endereco);
    } catch (error) {
        next(error);
    }
}

export const listarTodosEnderecos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const enderecos = await listarEnderecos();
        res.status(200).json(enderecos);
    } catch (error) {
        next(error);
    }
}

export const criarNovoEndereco = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const endereco = await criarEndereco(req.body);
        res.status(201).json(endereco);
    } catch (error) {
        tratarErroController(error, res, next);
    }
}

export const atualizarEnderecoExistente = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const endereco = await atualizarEndereco(req.params.id as string, req.body);
        res.status(200).json(endereco);
    } catch (error) {
        tratarErroController(error, res, next);
    }
}

export const removerEnderecoExistente = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await removerEndereco(req.params.id as string);
        res.status(204).send();
    } catch (error) {
        tratarErroController(error, res, next);
    }
}

