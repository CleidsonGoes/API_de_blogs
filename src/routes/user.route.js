const { Router } = require('express');
// // const authMiddleware = require('../middlewares/auth.middlewares');
const userController = require('../controllers/user.controller');

const userRouter = Router();

// // requisito 03
userRouter.post('/user', userController.createUserController);

module.exports = userRouter;