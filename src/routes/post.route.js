const { Router } = require('express');
const validateJWT = require('../middlewares/validateJWT');

const validationField = require('../middlewares/validationPostCreate');
const postController = require('../controllers/blogPost.controller');

const postRouter = Router();

// // requisito 03
postRouter.get('/post', validateJWT, postController.getAllPostController);
postRouter.get('/post/:id', validateJWT, postController.getPostIdController);
postRouter.put('/post/:id', validateJWT, postController.putPostIdController);
postRouter.post('/post', validateJWT, validationField, postController.addPostController);
// categoryRouter.post('/user', userController.createUserController);

module.exports = postRouter;