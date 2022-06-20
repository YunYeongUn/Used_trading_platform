const Sequelize = require('sequelize');
const { Product } = require('./product');

module.exports = class Category extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        cat_id: {
          autoIncrement: true,
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        cat_name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: 'cat_name',
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Category',
        tableName: 'category',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Category.hasMany(db.Product, {
      foreignKey: 'cat_id',
      sourceKey: 'cat_id',
    });
  }
};
