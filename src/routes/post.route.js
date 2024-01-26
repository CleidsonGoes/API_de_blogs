const { Router } = require('express');
const validateJWT = require('../middlewares/validateJWT');

const validationField = require('../middlewares/validationPostCreate');
const postController = require('../controllers/blogPost.controller');

const postRouter = Router();

// // requisito 03
postRouter.get('/post', validateJWT, postController.getAllPostController);
postRouter.get('/post/search', validateJWT, postController.searchTermPostController);
postRouter.get('/post/:id', validateJWT, postController.getPostIdController);
postRouter.put('/post/:id', validateJWT, postController.putPostIdController);
postRouter.post('/post', validateJWT, validationField, postController.addPostController);
postRouter.delete('/post/:id', validateJWT, postController.deletePostController);

module.exports = postRouter;