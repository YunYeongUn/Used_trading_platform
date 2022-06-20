const Sequelize = require('sequelize');

module.exports = class Board extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        post_id: {
          autoIncrement: true,
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        content: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        regdate: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        title: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        views: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        recommends: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Board',
        tableName: 'board',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate(db) {
    db.Board.belongsTo(db.User, { foreignKey: 'writer', targetKey: 'id' });
    db.Board.hasMany(db.Board_reply, {
      foreignKey: 'p_id',
      targetKey: 'post_id',
    });
  }
};
