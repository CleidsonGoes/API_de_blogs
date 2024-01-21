const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const { getAllUserService } = require('../services/user.service');

function validationFields(displayName, email, password) {
  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (displayName.length < 8) {
    return { status: 400,
      message: { message: '"displayName" length must be at least 8 characters long' } }; 
  }
  if (password.length < 6) {
    return { status: 400,
      message: { message: '"password" length must be at least 6 characters long' } };
  }
  if (!regexEmail.test(email)) {
    return { status: 400, message: { message: '"email" must be a valid email' } };
  }
  return { status: 201, message: { message: 'tudo certo' } };
}

async function createUserController(req, res) {
  const { displayName, email, password } = req.body;

  const validation = await validationFields(displayName, email, password);
  return res.status(validation.status).json(validation.message);
  // const returnUserService = await userCreateService(email);
}

// REQUISITO 05
async function getAllUserController(_req, res) {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const allUser = await getAllUserService();
  console.log('log do controller', allUser);
  jwt.sign({ data: { userId: allUser.map((user) => user.id) } }, secret, jwtConfig);

  return res.status(200).json(allUser);
}

module.exports = {
  createUserController, getAllUserController,
};