module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false, // não permite nulo
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false, // não permite valores vazios
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // não permite e-mail repetido
      },
      password_hash: {
        // armazena a senha em forma de hash
        type: Sequelize.STRING,
        allowNull: false, // não permite usuário sem senha
      },
      provider: {
        // quando verdadeiro será um prestador de serviço
        type: Sequelize.BOOLEAN,
        defaultValue: false, // todo usuário vai ser um cliente
        allowNull: false,
      },
      created_at: {
        // sequelizze carrega essas informações automatico
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  // vá usar o roolback
  down: queryInterface => {
    return queryInterface.dropTable('users');
  },
};
