const Sequelize = require('sequelize');
const { Category } = require('./category');

module.exports = class Product extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        p_id: {
          autoIncrement: true,
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        descript: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        regdate: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        image: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        title: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Product',
        tableName: 'product',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate(db) {
    db.Product.belongsTo(db.User, {
      foreignKey: 'writer',
      targetKey: 'id',
    });
    db.Product.belongsTo(db.Category, {
      foreignKey: 'cat_id',
      targetKey: 'cat_id',
    });
    db.Product.hasMany(db.Product_reply, {
      foreignKey: 'p_id',
      targetKey: 'p_id',
    });
  }
};
