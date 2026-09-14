import express from 'express';
import enderecoRouter from './Endereco.router';
import pessoaRouter from './Pessoa.router';
import imovelRouter from './Imovel.router';
import contratoRouter from './Contrato.router';

const router = express.Router();                            //cria um roteador


router.use('/endereco', enderecoRouter);
router.use('/pessoa', pessoaRouter);
router.use('/imovel', imovelRouter);
router.use('/contrato', contratoRouter);



router.get('/', (req, res)=> {
    res.json({rota: 'main'});
});

router.get('/ping', (req, res) => {
    res.json({pong: true});
});

export default router;