const CategoryModel = (sequelize, DataTypes) => {
    const model = sequelize.define('Category', {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    }, {
      timestamps: false,
      underscored: true, // quando os dados forem inseridos ou selecionados via model devem estar em camelCase, mas quando as queries forem pra o banco os campos das colunas devem estar em snake_case.
    });
  
    return model;
  };
  
  module.exports = CategoryModel;