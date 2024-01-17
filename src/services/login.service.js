const { User } = require('../models');

const getUsersService = async (email, password) => User.findOne({
  where: {
    email,
    password,
  },
});
// getUsersService('lewishamilton@gmail.com', '123456').then((data) => console.log(data.dataValues));

// const getById = async (id) => {
//   const book = await Book.findByPk(id);
//   return book;
// };
  
module.exports = {
  getUsersService,
//   getById,
};