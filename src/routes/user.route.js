const { Router } = require('express');
const validateJWT = require('../middlewares/validateJWT');

// // const authMiddleware = require('../middlewares/auth.middlewares');
const userController = require('../controllers/user.controller');
const validationFields = require('../middlewares/validationUserCreate');

const userRouter = Router();

// // requisito 03
userRouter.get(
  '/user',
  validateJWT, 
  userController.getAllUserController,
);
userRouter.get('/user/:id', userController.getIdUserController);
userRouter.post('/user', validationFields, userController.createUserController);

module.exports = userRouter;