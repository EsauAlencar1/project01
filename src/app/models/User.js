import Sequelize, { Model } from 'sequelize';

import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // só existe do lado do codigo
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    // será executado antes de salvar - trexos baseados no modulo
    this.addHook('beforeSave', async user => {
      if (user.password) {
        // verificar
        user.password_hash = await bcrypt.hash(user.password, 8); // criptografando a senha
      }
    });
    return this;
  }

  // método para verificar a senha está ok
  // recebe senha, retorna o método compare para comparar a senha que está tentando
  // logar com a senha criptografada no banco
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
