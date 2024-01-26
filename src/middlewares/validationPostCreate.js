const { Category } = require('../models');

async function validationField(req, res, next) {
  const { title, content, categoryIds } = req.body;
  if (!title || !content || !categoryIds) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  const existIds = await categoryIds.every(async (id) => Category.findByPk(id));
  if (!existIds) {
    return { status: 400, message: { message: 'one or more "categoryIds" not found' } };
  }
  next();
}

module.exports = validationField;