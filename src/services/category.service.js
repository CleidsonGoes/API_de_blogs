const { Category } = require('../models');

// REQUISITO 08
async function createCategoryService(nameCategory) {
  await Category.findOrCreate({
    where: { name: nameCategory },
    defaults: {
      name: nameCategory,
    },
  });
  const foundCategory = await Category.findOne({ where: { name: nameCategory } });
  return foundCategory;
  //   console.log(created); // The boolean indicating whether this instance was just created
  //   if (findOrCreate) {
  //     console.log(user.displayName); // This will certainly be 'Technical Lead JavaScript'
}

async function getAllCategoryService() {
  const allCategory = await Category.findAll();
  const categories = allCategory.map((category) => ({
    id: category.dataValues.id,
    name: category.dataValues.name,
  }));
  return categories;
}

module.exports = {
  createCategoryService, getAllCategoryService,
};
