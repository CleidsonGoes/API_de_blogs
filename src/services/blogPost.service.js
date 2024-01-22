const { BlogPost } = require('../models');
const { User } = require('../models');
const { Category } = require('../models');
const { PostCategory } = require('../models');
// REQUISITO 13
async function getAllPostService() {
  const allPost = await BlogPost.findAll({
    include: [
      { model: User, as: 'User', attributes: ['id', 'displayName', 'email', 'image'] },
      { model: Category, through: PostCategory, as: 'Categories', attributes: ['id', 'name'] },
    ],
    attributes: ['id', 'title', 'content', 'userId', 'published', 'updated'],
  });
  console.log('log findAll do service >>> ', allPost);
  const blogPosts = allPost.map((post) => post);
  console.log('log MAP do service >>> ', blogPosts);
  return blogPosts;
}
// REQUISITO 14
async function getPostIdService(id) {
  const idPost = await BlogPost.findAll({
    include: [
      { model: User, as: 'User', attributes: ['id', 'displayName', 'email', 'image'] },
      { model: Category, through: PostCategory, as: 'Categories', attributes: ['id', 'name'] },
    ],
    attributes: [id, 'title', 'content', 'userId', 'published', 'updated'],
  });

  if (idPost === null) {
    return { status: 404, message: { message: 'Post does not exist' } };
  }
  console.log('log do findAll req 14 >>> ', idPost);
  return { status: 200, message: idPost.dataValues };
}
// REQUISITO 15
async function findPost(idBlogPost) {
  const post = await BlogPost.findOne({ where: { id: idBlogPost },
    include: [{ model: User, as: 'User', attributes: ['id', 'displayName', 'email', 'image'] },
      { model: Category, through: PostCategory, as: 'Categories', attributes: ['id', 'name'] }],
  });
  return post;
}
// REQUISITO 15
async function putPostIdService(idPost, titlePost, contentPost) {
  const findId = await BlogPost.findByPk(idPost);
  if (findId === null) { return { status: 400, message: 'Post not found' }; }
  await BlogPost.update({ title: titlePost, content: contentPost }, { where: { id: idPost } });
  const post = await findPost(idPost);
  const result = { id: post.id,
    title: post.title,
    content: post.content,
    userId: post.userId,
    published: post.published,
    updated: post.updated,
    user: { id: post.User.id,
      displayName: post.User.displayName,
      email: post.User.email,
      image: post.User.image },
    categories: post.Categories.map((categ) => ({ id: categ.id, name: categ.name })) };
  return { status: 200, message: result };
}
module.exports = { getAllPostService, getPostIdService, putPostIdService };