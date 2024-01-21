const { Router } = require('express');
// const validateJWT = require('../middlewares/validateJWT');

// // const authMiddleware = require('../middlewares/auth.middlewares');
const userController = require('../controllers/user.controller');

const userRouter = Router();

// // requisito 03
userRouter.get('/user', /* validateJWT , */ userController.getAllUserController);
userRouter.post('/user', userController.createUserController);

module.exports = userRouter;