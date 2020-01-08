// responsável pela conexão com o banco

import Sequelize from 'sequelize';

import User from '../app/models/User';

import databaseConfig from '../config/database'; // importar as configurações do banco de dados

const models = [User]; // array com os models

class Database {
  constructor() {
    this.init();
  }

  init() {
    // conexão com a base de dados e carregar os models
    this.connection = new Sequelize(databaseConfig);

    // para percorrer os models
    // cada model, retorna de cada model um model
    // se referindo ao que está na const Models
    models.map(model => model.init(this.connection));
  }
}

export default new Database(); // exportar a classe criada
