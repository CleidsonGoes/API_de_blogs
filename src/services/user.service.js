// const jwt = require('jsonwebtoken');
const { User } = require('../models');

async function userCreateService(displayNameUser, emailUser, _passwordUser) {
  // const secret = process.env.JWT_SECRET || 'seusecretdetoken';
  // const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

  // const [user, created] = await User.findOrCreate({
  //   where: { email: emailUser },
  //   defaults: {
  //     displayName: displayNameUser,
  //     email: emailUser,
  //     password: passwordUser,
  //   },
  // });
  // console.log(user.email); // 'sdepold'
  // console.log(user.displayName);
  // console.log(user.email);
  // console.log(user.password); // This may or may not be 'Technical Lead JavaScript'
  // console.log(created); // The boolean indicating whether this instance was just created
  // if (created) {
  //   console.log(user.displayName); // This will certainly be 'Technical Lead JavaScript'
  // }
  const foundForEmail = await User.findOne({ where: { email: emailUser } });
  console.log('Olha aquiii', foundForEmail);
  if (!foundForEmail) {
    return { status: 409, message: { message: 'usuário cadastrado' } };
  }
  return { status: 201, message: { message: 'User already registered' } };
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
// REQUISITO 05 para validateJWT.js
async function getIdUserService(id) {
  const userId = await User.findByPk(id);
  if (userId === null) {
    console.log('Not found!');
  } else {
    console.log(userId instanceof User); // true
    console.log(userId);
    return userId;
  }
}

module.exports = {
  userCreateService, getAllUserService, getIdUserService,
};