const { getAllPostService, getPostIdService,
  findPostUpdated, putPostIdService } = require('../services/blogPost.service');

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
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  await putPostIdService(id, req.body);
  const postId = await findPostUpdated(id);
  return res.status(postId.status).json(postId.message);
}

module.exports = {
  getAllPostController, getPostIdController, putPostIdController,
};