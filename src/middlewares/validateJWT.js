// src/auth/validateJWT.js
const jwt = require('jsonwebtoken');

const { getIdUserService } = require('../services/user.service');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

/* Esta função extrai o token do header/Authorization */
function extractToken(bearerToken) {
  return bearerToken.split(' ')[1];
}

module.exports = async (req, res, next) => {
  const bearerToken = req.header('Authorization');

  if (!bearerToken) {
    return res.status(401).json({ message: 'Token not found',
    });
  }

  /* Utilizamos a função para extrair o token */
  const token = extractToken(bearerToken);

  try {
    const decoded = jwt.verify(token, secret);
    /*
      A variável decoded será o seguinte:
      {
        data: {
          userId: 1
        },
        iat: 1656616422,
        exp: 1657221222
      }
    */
    const user = await getIdUserService(decoded.data.userId);
    // console.log('log user', user);
    req.user = user.message.id; // Chave "req.user" criada para requisição com id do usuário criador do post, e assim comparar com outros IDs para evitar que além do criador alterem o post já criado
    if (!user) {
      return res.status(401).json({ message: 'Erro ao procurar usuário do token.' });
    }

    /* O usuário existe! Colocamos ele em um campo no objeto req.
       Dessa forma, o usuário estará disponível para outros middlewares que
       executem em sequência */
    // req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};