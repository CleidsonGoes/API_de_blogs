const { Router } = require('express');
const validateJWT = require('../middlewares/validateJWT');

// // const authMiddleware = require('../middlewares/auth.middlewares');
const postController = require('../controllers/blogPost.controller');

const postRouter = Router();

// // requisito 03
postRouter.get('/post', validateJWT, postController.getAllPostController);
postRouter.get('/post/:id', validateJWT, postController.getPostIdController);
postRouter.put('/post/:id', validateJWT, postController.putPostIdController);
// categoryRouter.post('/categories', categoryController.getAllCategoryController);
// categoryRouter.post('/user', userController.createUserController);

module.exports = postRouter;