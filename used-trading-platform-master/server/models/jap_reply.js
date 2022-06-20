const Sequelize = require('sequelize');

module.exports = class Jap_reply extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        reply_id: {
          autoIncrement: true,
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        content: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        regdate: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Jap_reply',
        tableName: 'jap_reply',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Jap_reply.belongsTo(db.User, { foreignKey: 'writer', targetKey: 'id' });
  }
};
