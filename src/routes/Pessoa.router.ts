import express from 'express';
import {
    buscarPessoa,
    listarTodasPessoas,
    criarNovaPessoa,
    atualizarPessoaExistente,
    removerPessoaExistente
} from '../controllers/Pessoa.controller';

const router = express.Router();

router.get('/', listarTodasPessoas);
router.get('/:id', buscarPessoa);
router.post('/', criarNovaPessoa);
router.put('/:id', atualizarPessoaExistente);
router.delete('/:id', removerPessoaExistente);

export default router;
