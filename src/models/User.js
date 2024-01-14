const UserModel = (sequelize, DataTypes) => {
  const model = sequelize.define('User', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    display_name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    image: {
      allowNull: true,
      type: DataTypes.STRING,
    }
  }, {
    timestamps: false,
    underscored: true,
  });

  User.associate = (models) => {
    User.hasOne(models.Address,
      { foreignKey: 'userId', as: '*****' });
  };
  return model;
};

module.exports = UserModel;