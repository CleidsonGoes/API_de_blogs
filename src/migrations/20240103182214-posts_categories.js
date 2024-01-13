'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('posts_categories', {
      post_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          // model: '*****',
          key: 'id',
        },
      },
      category_id: {
        allowNull: false,
        type: Sequelize.STRING,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          // model: '*****',
          key: 'id',
        },
      }
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('posts_categories');
  }
};
