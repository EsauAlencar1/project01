// verificar se o usuário está logado
import jwt from 'jsonwebtoken';

// promisify da biblioteca util/ vem com o node
// transforma uma função de callback em uma que possa usar o async/await -
// usar no lugar de verify - callback antigo
import { promisify } from 'util';

// segredo do token
import authConfig from '../../config/auth';

// se chamar o next a rota que estiver usando o método do controler, s
// e ok será chamado
export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // se authHeader n estiver presente retorna erro
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // dividindo o authHeader com desestruturação, a partir do espaço ' '
  // para dividir o retorno Bearer e o token na segunda parte
  // ['Bearer','token']
  const [, token] = authHeader.split(' ');

  //
  try {
    // promisify retorna outra função com o resto dos parametros
    // se não conseguir decifrar o decoded ele cai no catch
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    console.log(decoded);

    // incluir o id do usuário dentro do req -
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
