const jwt = require('jsonwebtoken');
// const { User } = require('../models');
const { UserServices } = require('../services/user.services');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const isBodyValid = (email, password) => email && password;

// requisito 03
const userController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!isBodyValid(email, password)) {
      return res.status(401).json({ message: 'Some required fields are missing' });
    }

    const user = await UserServices.getByEmail(email); // criar essa função na pasta services

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid fields' });
    }

    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: { userId: user.id } }, secret, jwtConfig);

    res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

module.exports = userController;