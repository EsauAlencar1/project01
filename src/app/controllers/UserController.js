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

  // metodo update para fazer alteração dos dados cadastrados
  async update(req, res) {
    // console.log(req.userId); // buscar usuário e fazer o update na base de dados
    const { email, oldPassword } = req.body;

    // buscar o usuário pelo id - primary key
    const user = await User.findByPk(req.userId);

    // verificação se quiser alterar o e-mail
    // email informado !== do email cadastrado
    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    // se informar o oldPassword e ele for diferente
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password doest not match' });
    }

    // se tudo deu certo
    // atualizar os dados do usuário que estão em req.body
    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
