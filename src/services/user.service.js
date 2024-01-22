const jwt = require('jsonwebtoken');
const { User } = require('../models');

async function userCreateService(displayNameUser, emailUser, passwordUser) {
  const secret = process.env.JWT_SECRET || 'seusecretdetoken';
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

  const [user, isCreate] = await User.findOrCreate({
    where: { email: emailUser },
    defaults: {
      displayName: displayNameUser,
      email: emailUser,
      password: passwordUser,
    },
  });
  console.log(user);

  if (isCreate) {
    const token = jwt.sign({ data: { userId: user.id } }, secret, jwtConfig);
    return { status: 201, payload: { token } };
  }
  return { status: 409, payload: { message: 'User already registered' } };
}

// REQUISITO 05
async function getAllUserService() {
  const allUser = await User.findAll();
  console.log('log do findAll do service >>>>', allUser);
  const users = allUser.map((user) => ({
    id: user.dataValues.id,
    displayName: user.dataValues.displayName,
    email: user.dataValues.email,
    image: user.dataValues.image,
  }));
  console.log('log do map do service', users);
  return users;
}
// REQUISITO 05 para validateJWT.js e para REQUISITO 06
async function getIdUserService(id) {
  const userId = await User.findByPk(id);
  if (userId === null) {
    return { status: 404, message: { message: 'User does not exist' } };
  } 
  const { dataValues } = userId;
  return { status: 200,
    message: {
      id: dataValues.id,
      displayName: dataValues.displayName,
      email: dataValues.email,
      image: dataValues.image } };
}

module.exports = {
  userCreateService, getAllUserService, getIdUserService,
};