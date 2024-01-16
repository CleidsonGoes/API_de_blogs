// const jwt = require('jsonwebtoken');
const { User } = require('../models');

// requisito 03
const login = async (req, res) => {
  const { email, password } = req.body;
  //   const user = User.findOne({ where: { email } });
  if (!email === undefined || !password === undefined) {
    return res.status(400).json({
      message: 'Some required fields are missing',
    });
  }
};
// requisito 03
const getAll = async (req, res) => {
  const { email } = req.body;

  const users = await User.findAll({ include: [
    { model: User, attributes: email },
  ],
  });
    
  if (!users) {
    return res.status(400).json({
      message: 'Invalid fields',
    });
  }
  // const token =
};

module.exports = {
  login, getAll,
};