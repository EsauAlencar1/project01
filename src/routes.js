import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

// lógica ficará dentro do controller

// função assincrona, sequelize ao criar algo no banco de dados é necessário
// usar o await antes
routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Esau alencar 123',
    email: 'esaualencar123@gmail.com',
    password_hash: '1234567890dsdsd',
  });
  return res.json(user);
});

export default routes;
