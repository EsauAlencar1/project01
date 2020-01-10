// necessário instalar: yarn add jsonwebtoken

import jwt from 'jsonwebtoken'; // importação de modulo vem sempre primeiro

import User from '../models/User';

import authConfig from '../../config/auth';

// informações que precisam ser passadas para validação
class SessionController {
  async store(req, res) {
    // email e senha que recebo no corpo da requisição
    const { email, password } = req.body;
    // findOne procura apenas 1 - verificar se existe 1 email
    const user = await User.findOne({ where: { email } });
    // se o usuário não existe
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    // verificação da senha - se e diferente - método do user checkPassword
    // se a senha não bate, retorna erro
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    // retornar a partir do momento que fizer login, email ja tem
    const { id, name } = user;
    // retorna os dados do usuário
    return res.json({
      user: {
        id,
        name,
        email,
      },
      // metodo para gerar o token, enviar o payload dentro do token,
      // informação pra gerar o token
      // exportando de auth o secret
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn, // exportando de auth o expiresIn
      }), // 2º parametro colocar um String que só eu terei acesso
      // acessar md5online.org - gobarberesau
      // 3º parametro é a data de expiração
    });
  }
}

export default new SessionController();
