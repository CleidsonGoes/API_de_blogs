// src/controllers/me.js

const deleteUserService = require('../services/me.service');

async function deleteUser(req, res) {
  const { user } = req;

  const userDeleted = await deleteUserService(user);
  
  //   const { username, admin } = req.user;
  //   console.log({ username, admin });
  
  /* Por fim, retornamos as informações */
  res.status(userDeleted.status).end();
}

module.exports = deleteUser;