const jwt = require('jsonwebtoken');
const userModel = require('../models/User');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

async function userCreateService(res, user) {
  try {
    const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

    const foundEmail = await userModel
      .findOne({ where: { displayName: user.displayName, email: user.email } });
    console.log('estou aqui', foundEmail);

    if (foundEmail.dataValues.email === user.email) {
      return res.status(409).json({ message: 'User already registered' });
    }
    await userModel.create(user);

    const token = jwt.sign({ data: { userId: foundEmail.dataValues.id } }, secret, jwtConfig);

    return res.status(201).json({ token });
  } catch (err) {
    return err.message;
  }
}

module.exports = {
  userCreateService,
};