// biblioteca de schema validation - forma de definir os campos que estarão no corpo
// da requisição, formato json, tipo por funções
// yarn add yup - não possuí export default
import * as Yup from 'yup';

import User from '../models/User';

// mesma face de um middleware - recebe os dados que serão recebidos do
// insomnia/ react e r.n e criar um novo registro na base de dados

class UserController {
  async store(req, res) {
    // yup segue schema validation
    // validando objeto é req.body. shape = formato
    const schema = Yup.object().shape({
      name: Yup.string().required(), // required = obrigatório
      email: Yup.string()
        .email() // validação de email, se tem @
        .required(), // obrigatório
      password: Yup.string()
        .required()
        .min(6), // pelo menos 6 digitos
    });

    // assincrono = vai retornar true se bater com as regras que forem passadas
    // se não, pegando o schema, passando o req.body e passando as regras com isValid
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

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
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6) // when = validação condicional"Quando" - do yup//
        .when('oldPassword', (oldPassword, field) =>
          // 1º parametro oldPassoword, 2º continuação
          // se old for preenchida ? seja required : se não retorna o field normal
          oldPassword ? field.required() : field
        ),
      // quando o password estiver preenchido,
      confirmPassword: Yup.string().when('password', (password, field) =>
        // password preenchido ? será obrigatorio.oneOf(ref=referindo ao campo password) : se não retorna o field
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

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
