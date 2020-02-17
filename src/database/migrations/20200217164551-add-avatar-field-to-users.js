module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users', // qual tabela quero adicionar a columna
      'avatar_id', // nome da coluna
      {
        type: Sequelize.INTEGER, // int pq vai referenciar apenas o id da imagem
        references: { model: 'files', key: 'id' }, // chave estrangeira, essa
        // tabela referência tabela 'files', e a chave que vai referênciar 'id
        // todo avatar_id tbm vai ser um id contido na tabela files
        onUpdate: 'CASCADE', // o que irá acontecer caso seja alterado na tabela
        onDelete: 'SET NULL', // caso seja deletado
        allowNull: true,
      }
    );
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'avatar_id');
  },
};
