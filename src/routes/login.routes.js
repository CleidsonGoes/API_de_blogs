const { Router } = require('express');
const authMiddleware = require('../middlewares/auth.middlewares');
const { userController } = require('../controllers/user.controllers');

const loginRouter = Router();

// requisito 03
loginRouter.post('/login', authMiddleware, userController);

module.exports = loginRouter;