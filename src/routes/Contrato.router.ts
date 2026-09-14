import express from 'express';
import {
    buscarContrato,
    buscarContratoRecibo,
    listarTodosContratos,
    listarResumoContratos,
    criarNovoContrato,
    atualizarContratoExistente,
    removerContratoExistente
} from '../controllers/Contrato.controller';

const router = express.Router();

router.get('/', listarTodosContratos);
router.get('/resumo', listarResumoContratos);
router.get('/:id/recibo', buscarContratoRecibo);
router.get('/:id', buscarContrato);
router.post('/', criarNovoContrato);
router.put('/:id', atualizarContratoExistente);
router.delete('/:id', removerContratoExistente);

export default router;
