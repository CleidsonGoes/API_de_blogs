const { User } = require('../models/User');

const getUsersService = async (email, password) => {
  User.findAll({
    where: {
      email,
      password,
    },
  });
  // SELECT * FROM post WHERE authorId = 2;  return users;
};
console.log(getUsersService);

// const getById = async (id) => {
//   const book = await Book.findByPk(id);
//   return book;
// };
  
module.exports = {
  getUsersService,
//   getById,
};