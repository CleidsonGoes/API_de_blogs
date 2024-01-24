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
  console.log('log do req14 id do post', idPost.dataValues);
  console.log('log do idPost.dataValues >>> ', idPost.dataValues);
  return { status: 200, message: idPost.dataValues };
}
// REQUISITO 15
// async function findPost(idBlogPost) {
//   const post = await BlogPost.findOne({ where: { id: idBlogPost },
//     include: [{ model: User, as: 'User', attributes: ['id', 'displayName', 'email', 'image'] },
//       { model: Category, through: PostCategory, as: 'Categories', attributes: ['id', 'name'] }],
//   });
//   return post;
// }
async function putPostIdService(idPost, titlePost, contentPost) {
  const blogUpdated = await BlogPost.update({
    title: titlePost, content: contentPost }, { where: { id: idPost } });
  console.log('log do update >>> ', blogUpdated);
  if (!blogUpdated) { return { status: 400, message: 'Post not found' }; }
  const findId = await BlogPost.findByPk(idPost);
  console.log('log findByPk >>>', findId);
  return { status: 200, message: findId };
}
module.exports = { getAllPostService, getPostIdService, putPostIdService };