const Sequelize = require('sequelize');

module.exports = class Board_reply extends Sequelize.Model {
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
        modelName: 'Board_reply',
        tableName: 'board_reply',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate(db) {
    db.Board_reply.belongsTo(db.User, {
      foreignKey: 'writer',
      targetKey: 'id',
    });
    db.Board_reply.belongsTo(db.Board, {
      foreignKey: 'p_id',
      targetKey: 'post_id',
    });
  }
};
