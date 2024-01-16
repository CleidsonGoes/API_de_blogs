const { Router } = require('express');
const authMiddleware = require('../middlewares/auth.middlewares');
const { login, getAll } = require('../controllers/login.controllers');

const loginRouter = Router();

// requisito 03
loginRouter.post('/login', authMiddleware, login, getAll);

module.exports = loginRouter;