const blogPost = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      content: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      published: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      }
    }, {
      timestamps: false,
      underscored: true,
    });
  
    BlogPost.associate = (models) => {
      BlogPost.belongsTo(models.User,
        { foreignKey: 'id', as: 'User' });

      BlogPost.belongsToMany(models.Category, {
        through: models.PostCategory,
        foreignKey: 'post_id',
        otherKey: 'category_id,'
      })
    };
    
    return BlogPost;
  };
  
  module.exports = blogPost;