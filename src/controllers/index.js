const loginController = require('./login.controller');
const userController = require('./user.controller');
const categoryController = require('./category.controller');
const me = require('./me');

module.exports = {
  me,
  loginController,
  userController,
  categoryController,
};