const { getAllPostService, getPostIdService,
  putPostIdService } = require('../services/blogPost.service');
const { addPostService, deletePostService } = require('../services/blogPost2.service');
const { searchTermPostService } = require('../services/blogPost3.service');

// REQUISITO 13
async function getAllPostController(_req, res) {
  const allPost = await getAllPostService();
  return res.status(200).json(allPost);
}

// REQUISITO 14
async function getPostIdController(req, res) {
  const { id } = req.params;
  const idPost = await getPostIdService(id);
  return res.status(idPost.status).json(idPost.message);
}

async function putPostIdController(req, res) {
  const { id } = req.params;
  const { user } = req;
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  const postId = await putPostIdService(id, req.body, user);
  return res.status(postId.status).json(postId.message);
}

async function addPostController(req, res) {
  const { user } = req;
  const postAdd = await addPostService(req.body, user);
  return res.status(postAdd.status).json(postAdd.message);
}

async function deletePostController(req, res) {
  const { id } = req.params;
  const { user } = req;
  const post = await deletePostService(id, user);
  return res.status(post.status).json(post.message);
}

const searchTermPostController = async (req, res) => {
  const searchTerm = req.query.q;
  // console.log('log do searchTerm >>>', searchTerm);
  const localizeProduct = await searchTermPostService(searchTerm);
  const { status, message } = localizeProduct;
  return res.status(status).json(message);
};

module.exports = {
  getAllPostController,
  getPostIdController,
  putPostIdController,
  addPostController,
  deletePostController,
  searchTermPostController,
};