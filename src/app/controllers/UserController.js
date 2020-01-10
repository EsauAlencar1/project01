import User from '../models/User';

// mesma face de um middleware - recebe os dados que serão recebidos do
// insomnia/ react e r.n e criar um novo registro na base de dados

class UserController {
  async store(req, res) {
    // verificar se existe 1 usuário com um email a ser cadastrado
    const userExists = await User.findOne({
      where: { email: req.body.email },
    });
    const userExistsName = await User.findOne({
      where: { name: req.body.name },
    });

    // return bloqueia o fluxo, erro 400 bad request com retorno error:...
    if (userExists) {
      return res.status(400).json({ error: 'User alteready exists. email' });
    }
    if (userExistsName) {
      return res.status(400).json({ error: 'User already exists. name' });
    }

    // informações que desejo retornar de User para o front end, pode ser: const User
    const { id, name, email, provider } = await User.create(req.body);

    // retorna para o front end as informações passadas, são passadas todas as
    // informações da Migration de User para o banco
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
