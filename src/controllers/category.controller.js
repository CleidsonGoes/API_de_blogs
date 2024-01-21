const { createCategoryService } = require('../services/category.service');

async function createCategoryController(req, res) {
  const { name } = req.body;
  console.log(name);

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  const createdCategory = await createCategoryService(name);
  return res.status(201).json(createdCategory);
}

module.exports = {
  createCategoryController,
};