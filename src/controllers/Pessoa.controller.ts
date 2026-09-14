import { Request, Response, NextFunction } from 'express';
import {
    buscarPessoaPorId,
    listarPessoas,
    criarPessoa,
    atualizarPessoa,
    removerPessoa
} from '../services/Pessoa.service';
import { tratarErroController } from '../utils/tratarErroController';

export const buscarPessoa = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pessoa = await buscarPessoaPorId(req.params.id as string);

        if (!pessoa) {
            res.status(404).json({ error: 'Pessoa não encontrada' });
            return;
        }

        res.status(200).json(pessoa);
    } catch (error) {
        next(error);
    }
}

export const listarTodasPessoas = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pessoas = await listarPessoas();
        res.status(200).json(pessoas);
    } catch (error) {
        next(error);
    }
}

export const criarNovaPessoa = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pessoa = await criarPessoa(req.body);
        res.status(201).json(pessoa);
    } catch (error) {
        tratarErroController(error, res, next);
    }
}

export const atualizarPessoaExistente = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pessoa = await atualizarPessoa(req.params.id as string, req.body);
        res.status(200).json(pessoa);
    } catch (error) {
        tratarErroController(error, res, next);
    }
}

export const removerPessoaExistente = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await removerPessoa(req.params.id as string);
        res.status(204).send();
    } catch (error) {
        tratarErroController(error, res, next);
    }
}
