import express from 'express'
import helmet from 'helmet';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import mainRouter from './routes/main.router';
import { errorHandler, notFoundRequest } from './routes/errorHandler.router';
import { prismaConnect } from './repositories/prismaClient';

//import {initializeAdminUser} from './database/initializeAdminUser'

dotenv.config();
prismaConnect();

const server = express();                                       // instance of a server
//const swaggerDocument = YAML.load('./docs/swagger.yaml');       // loads the swagger file
const CAMINHO_FRONTEND = path.join(__dirname, '../../frontend/dist/frontend/browser');

server.use(helmet());                                           // adding helmet for server protection
server.use(cors());
server.use(express.json());                                     // configures the response header to be json 
server.use(express.urlencoded({extended: true}));               // extends express functions, we can get data for any type of request
                                                                
server.use(express.static(CAMINHO_FRONTEND));                    // serve o build de produção do Angular

//server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 

server.use('/api', mainRouter);                                 // acessa a rota principal da API

server.get('/api/version', (req, res) => {
    res.json({ version: require('../package.json').version });
});

// fallback do SPA: qualquer GET fora de /api cai no index.html pro Angular Router assumir
server.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(CAMINHO_FRONTEND, 'index.html'));
});

server.use(notFoundRequest);                                    // route for not found
server.use(errorHandler);                                       // route for api request errors

  
//initializeAdminUser();                                          // create user admin as SuperUsuario 

const PORT_SERVER = process.env.PORT
server.listen (PORT_SERVER || 2000, () => {                     // starts the server on port 2000
    console.log(`Servidor rodando em localhost:${PORT_SERVER}/`);
});