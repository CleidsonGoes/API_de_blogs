const { BlogPost, User, Category, PostCategory } = require('../models');

async function getAllPostService() {
  const allPost = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
      { model: Category, through: PostCategory, as: 'categories', attributes: ['id', 'name'] },
    ],
    attributes: ['id', 'title', 'content', 'userId', 'published', 'updated'],
  });
  const blogPosts = allPost.map((post) => ({ id: post.dataValues }));
  const posts = blogPosts.map((post) => post.id);
  const blogs = posts.map((post) => ({
    ...post, categories: post.categories.map((cate) => ({ id: cate.id, name: cate.name })),
  }));
  return blogs;
}
// REQUISITO 14
async function getPostIdService(idP) {
  const idPost = await BlogPost.findOne({ where: { id: idP },
    include: [
      { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
      { model: Category, through: PostCategory, as: 'categories', attributes: ['id', 'name'] },
    ],
    attributes: ['id', 'title', 'content', 'userId', 'published', 'updated'],
  });
  if (idPost === null) {
    return { status: 404, message: { message: 'Post does not exist' } };
  }
  return { status: 200, message: idPost.dataValues };
}
// REQUISITO 15
async function putPostIdService(idPost, reqBody) {
  const [updated] = await BlogPost.update(reqBody, {
    where: { id: idPost },
  });
  if (!updated) {
    return 'no update';
  }
  console.log('log do updated do service>>>', updated);
  return updated; 
} 

async function findPostUpdated(idPost) {
  const result = await BlogPost.findOne({ where: { id: idPost },
    include: [
      { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
      { model: Category, through: PostCategory, as: 'categories', attributes: ['id', 'name'] },
    ],
  });
  if (result) { return { status: 200, message: result }; }
  console.log('Post not found');
}

module.exports = { getAllPostService, getPostIdService, findPostUpdated, putPostIdService };