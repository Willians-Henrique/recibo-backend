import express from 'express';
import {
    buscarImovel,
    listarTodosImoveis,
    criarNovoImovel,
    atualizarImovelExistente,
    removerImovelExistente
} from '../controllers/Imovel.controller';

const router = express.Router();

router.get('/', listarTodosImoveis);
router.get('/:id', buscarImovel);
router.post('/', criarNovoImovel);
router.put('/:id', atualizarImovelExistente);
router.delete('/:id', removerImovelExistente);

export default router;
