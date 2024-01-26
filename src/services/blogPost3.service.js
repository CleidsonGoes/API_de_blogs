const Sequelize = require('sequelize');

const { Op } = Sequelize;

const { BlogPost, User, Category, PostCategory } = require('../models');

async function searchTermPostService(searchTerm) {
  const allBlogs = await BlogPost.findAll({
    where: { [Op.or]: [
      { title: { [Op.like]: `%${searchTerm}%` } },
      { content: { [Op.like]: `%${searchTerm}%` } },
      // Adicionar mais colunas
    ],
    },
    include: [{ model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
      { model: Category, through: PostCategory, as: 'categories', attributes: ['id', 'name'] },
    ],
  });
  //   const blogs = allBlogs.map((blog) => blog.dataValues).some((blog) => blog.includes(searchTerm));
  console.log('log de todos os blogs >>>', allBlogs);
  
  return { status: 200, message: allBlogs };
}

module.exports = {
  searchTermPostService,
};