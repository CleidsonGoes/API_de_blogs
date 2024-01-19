const { Router } = require('express');
// // const authMiddleware = require('../middlewares/auth.middlewares');
const loginController = require('../controllers/login.controller');

const loginRouter = Router();

// // requisito 03
loginRouter.post('/login', loginController.getUserController);

module.exports = loginRouter;