import express from 'express';
import {
    buscarEndereco,
    listarTodosEnderecos,
    criarNovoEndereco,
    atualizarEnderecoExistente,
    removerEnderecoExistente
} from '../controllers/Endereco.controller';

const router = express.Router();

router.get('/', listarTodosEnderecos);
router.get('/:id', buscarEndereco);
router.post('/', criarNovoEndereco);
router.put('/:id', atualizarEnderecoExistente);
router.delete('/:id', removerEnderecoExistente);

export default router;

