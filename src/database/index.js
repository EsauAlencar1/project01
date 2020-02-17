// responsável pela conexão com o banco
import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';

import databaseConfig from '../config/database'; // importar as configurações do banco de dados

const models = [User, File]; // array com os models

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
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  } // PERCORRE OS MODELS, VAI CHAMAR PRA CADA 1 DOS MODELS O ASSOCIATE, so vai chamar se existir o associate
  // só executa a segunda se existir o associate, os models estão dentro de this.connection.models
}

export default new Database(); // exportar a classe criada
