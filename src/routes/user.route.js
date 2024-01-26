const { Router } = require('express');
const validateJWT = require('../middlewares/validateJWT');

// // const authMiddleware = require('../middlewares/auth.middlewares');
const userController = require('../controllers/user.controller');
const validationFields = require('../middlewares/validationUserCreate');
const deleteUser = require('../controllers/me');

const userRouter = Router();

// // requisito 03
userRouter.get(
  '/user',
  validateJWT, 
  userController.getAllUserController,
);
userRouter.get('/user/:id', validateJWT, userController.getIdUserController);
userRouter.post('/user', validationFields, userController.createUserController);
userRouter.delete('/user/me', validateJWT, deleteUser);

module.exports = userRouter;