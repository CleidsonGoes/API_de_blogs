const userService = require('../services/user.service');

// function validateField(res, displayName, email, password) {
// }

async function createUserController(req, res) {
  const { displayName, email, password } = req.body;
  
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
  
  const returnUserService = await userService.userCreateService(res, req.body);
  return returnUserService;
}

module.exports = {
  createUserController,
};