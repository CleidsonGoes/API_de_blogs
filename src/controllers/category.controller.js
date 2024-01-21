const { createCategoryService, getAllCategoryService } = require('../services/category.service');

async function createCategoryController(req, res) {
  const { name } = req.body;
  console.log(name);

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  const createdCategory = await createCategoryService(name);
  return res.status(201).json(createdCategory);
}

async function getAllCategoryController(_req, res) {
  const allCategory = await getAllCategoryService();
  return res.status(200).json(allCategory);
}

module.exports = {
  createCategoryController, getAllCategoryController,
};