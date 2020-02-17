module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('files', {
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
      path: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // não permite path repetido
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
    return queryInterface.dropTable('files');
  },
};
