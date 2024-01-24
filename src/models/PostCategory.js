const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
      postId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'BlogPost',
          key: 'id',
        },
        onDelete: 'CASCADE',
        primaryKey:true
      },
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Category',
          key: 'id',
        },
        onDelete: 'CASCADE',
        primaryKey:true
        },
  }, {
    timestamps: false,
    tableName: 'posts_categories',
    underscored: true,
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
      as: 'categories',
    });
    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId'
    });
  };

  return PostCategory;
};

module.exports = PostCategory;