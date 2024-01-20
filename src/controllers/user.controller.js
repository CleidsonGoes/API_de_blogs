const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');
const { User } = require('../models');

function validateField(res, displayName, email, password) {
  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  
  if (displayName.length < 8) {
    return res.status(400).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  }
  if (!regexEmail.test(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  if (password.length < 6) {
    return res.status(400).json({
      message: '"password" length must be at least 6 characters long',
    });
  }
}

async function createUserController(req, res) {
  const secret = process.env.JWT_SECRET || 'seusecretdetoken';
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

  const { displayName, email, password } = req.body;
  validateField(res, displayName, email, password);
  
  const returnUserService = await userService.userCreateService(email);
  console.log('bem aquiiiiiii', returnUserService);

  if (returnUserService && returnUserService === email) {
    return res.status(409).json({ message: 'User already registered' });
  }
  await User.create(req.body);
  const tokenCreated = jwt.sign({ data: { userId: returnUserService } }, secret, jwtConfig);
  
  return res.status(201).json({ token: tokenCreated });
}

module.exports = {
  createUserController,
};