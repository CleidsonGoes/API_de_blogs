// REQUISITO 12
const db = require('../models');
const { BlogPost, User, Category, PostCategory } = require('../models');

async function addPostService(requestData, idUser) {
  const transactions = await db.sequelize.transaction(async (t) => {
    const newBlogPost = await BlogPost.create({ title: requestData.title,
      content: requestData.content,
      userId: idUser,
      published: new Date(),
      updated: new Date() }, { transaction: t });
  
    const post = await Promise.all(requestData.categoryIds.map((categoryId) => PostCategory
      .create({ postId: newBlogPost.dataValues.id, categoryId }, { transaction: t })));
    console.log('dfsdfsdf', post);
    const result = await BlogPost.findOne({ where: { id: newBlogPost.id },
      include: [
        { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
        { model: Category, through: PostCategory, as: 'categories', attributes: ['id', 'name'] },
      ],
      transaction: t });
    return result;
  });
  return { status: 201, message: transactions };
}

//   .then((result) => { console.log(result); })
//   .catch((error) => {
//     console.error('Error creating blog post:', error); 
//   });

module.exports = { addPostService };