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
      underscored: true,
    });
  
    return PostCategory;
  };
  
  module.exports = PostCategory;