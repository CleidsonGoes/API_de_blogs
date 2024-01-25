// REQUISITO 12
// const Sequelize = require('sequelize');
// const { BlogPost, User, Category, PostCategory } = require('../models');

// // Suponha que o userId seja 1 por exemplo
// const userId = 1;

// // Use uma transação para garantir atomicidade
// Sequelize.transaction(async (t) => {
//   // Crie o novo blog post
//   const newBlogPost = await BlogPost.create({
//     title: requestData.title,
//     content: requestData.content,
//     userId,
//     published: new Date(),
//     updated: new Date(),
//   }, { transaction: t });

//   // Associe o novo blog post às categorias
//   await Promise.all(requestData.categoryIds.map(async (categoryId) => {
//     await PostCategory.create({ postId: newBlogPost.id, categoryId,
//     }, { transaction: t });
//   }));
//   // Consulte o novo blog post com associações
//   const result = await BlogPost.findOne({ where: { id: newBlogPost.id },
//     include: [
//       { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
//       { model: Category, through: PostCategory, as: 'categories', attributes: ['id', 'name'] },
//     ],
//     transaction: t });
//   return result;
// }).then((result) => { console.log(result); })
//   .catch((error) => { console.error('Error creating blog post:', error); });

// module.exports = { createBlogPost };