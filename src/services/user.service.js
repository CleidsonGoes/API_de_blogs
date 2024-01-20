const { User } = require('../models');

async function userCreateService(emailRequest) {
  const foundForEmail = await User
    .findOne({ where: { email: emailRequest } });
  console.log('Olha aqui', foundForEmail);
  return foundForEmail;
}

module.exports = {
  userCreateService,
};