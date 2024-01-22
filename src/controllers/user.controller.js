const jwt = require('jsonwebtoken');
const { userCreateService } = require('../services/user.service');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const { getAllUserService, getIdUserService } = require('../services/user.service');

async function createUserController(req, res) {
  const { displayName, email, password } = req.body;
  const { status, payload } = await userCreateService(displayName, email, password);
  return res.status(status).json(payload);
}

// REQUISITO 05
async function getAllUserController(_req, res) {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const allUser = await getAllUserService();
  jwt.sign({ data: { userId: allUser.map((user) => user.id) } }, secret, jwtConfig);

  return res.status(200).json(allUser);
}

// REQUISITO 06
async function getIdUserController(req, res) {
  const { id } = req.params;
  const userId = await getIdUserService(id);
  return res.status(userId.status).json(userId.message);
}

module.exports = {
  createUserController, getAllUserController, getIdUserController,
};