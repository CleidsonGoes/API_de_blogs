const { Router } = require('express');
// const authMiddleware = require('../middlewares/auth.middlewares');
const { getUserController } = require('../controllers/user.controller');

const loginRouter = Router();

// requisito 03
loginRouter.post('/login', getUserController);

module.exports = loginRouter;