const Sequelize = require('sequelize');

module.exports = class Product_reply extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        reply_id: {
          autoIncrement: true,
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        reply_content: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        regdate: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Product_reply',
        tableName: 'product_reply',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate(db) {
    db.Product_reply.belongsTo(db.User, {
      foreignKey: 'writer',
      targetKey: 'id',
    });
    db.Product_reply.belongsTo(db.Product, {
      foreignKey: 'p_id',
      targetKey: 'p_id',
    });
  }
};
