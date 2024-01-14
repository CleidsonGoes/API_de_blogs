const blogPost = (sequelize, DataTypes) => {
    const model = sequelize.define('BlogPost', {
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
  
    blogPost.associate = (models) => {
      blogPost.belongsTo(models.User,
        { foreignKey: 'id', as: 'User' });
    };
    return model;
  };
  
  module.exports = blogPost;