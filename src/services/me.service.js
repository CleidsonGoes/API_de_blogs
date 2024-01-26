const { User } = require('../models');

async function deleteUserService(userId) {
  await User.destroy({
    where: {
      id: userId,
    },
  });
  return { status: 204 };
}

module.exports = deleteUserService;