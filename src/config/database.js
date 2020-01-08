module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gobarber',
  define: {
    timestamps: true, // garantir a coluna create_at
    underscored: true, // para não utilizar o camelcase padrão, abela
    underscoredAll: true, // colunas e relacionamentos
  },
};
