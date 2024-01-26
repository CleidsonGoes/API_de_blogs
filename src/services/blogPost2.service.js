// REQUISITO 12
const db = require('../models');
const { BlogPost, User, Category, PostCategory } = require('../models');

const newBlogPost = async (title, content, userId, t) => BlogPost.create({
  title,
  content,
  userId,
  published: new Date(),
  updated: new Date(),
}, { transaction: t });

const findNewPost = async (id, t) => BlogPost.findOne({
  where: { id },
  include: [{ model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
    { model: Category, through: PostCategory, as: 'categories', attributes: ['id', 'name'] },
  ],
  transaction: t,
});

async function addPostService(requestData, idUser) {
  const { title, content } = requestData;
  const findAllIds = (await Promise.all(requestData.categoryIds
    .map((id) => Category.findOne({ where: { id } })))); // caso false retorna NULL no indice não criado

  const existIds = findAllIds.every((data) => data);
  if (!existIds) {
    return { status: 400, message: { message: 'one or more "categoryIds" not found' } };
  }

  const transactions = await db.sequelize.transaction(async (t) => {
    const { dataValues: { id } } = await newBlogPost(title, content, idUser, t); // retorna um obj tendo desestruturação dupla
    
    await Promise.all(requestData.categoryIds.map((categoryId) => PostCategory
      .create({ postId: id, categoryId }, { transaction: t }))); // esse create está retornando um array de promessas que passa pela transação 

    return findNewPost(id, t);
  });

  return { status: 201, message: transactions };
}

async function deletePostService(idPost, idUser) {
  const idPostFound = await BlogPost.findByPk(idPost);
  
  if (!idPostFound) {
    return { status: 404, message: { message: 'Post does not exist' } };
  }
  const { dataValues: { userId } } = idPostFound;
  if (userId !== idUser) {
    return { status: 401, message: { message: 'Unauthorized user' } };
  }
  await BlogPost.destroy({ // deve retornar o número de info. deletada
    where: { id: idPost },
  });
  return { status: 204, message: '' };
}

module.exports = { addPostService, deletePostService };