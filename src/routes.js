import { Router } from 'express';

import UserController from './app/controllers/UserController';

import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// usado como middleware global, só vai valer para as rotas após ela
routes.use(authMiddleware);

// metodo update para fazer alteração dos dados cadastrados
routes.put('/users', UserController.update);

export default routes;
