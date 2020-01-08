import express from 'express';
import routes from './routes';

import './database'; // conectar com o index.js

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.routes();
  }

  routes() {
    this.server.use(routes);
  }
}
export default new App().server;
