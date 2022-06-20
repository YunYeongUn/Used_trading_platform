const Sequelize = require('sequelize');

module.exports = class Team_member extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        mb_id: {
          autoIncrement: true,
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        image: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        mb_tell: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        introduction: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Team_member',
        tableName: 'team_member',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {}
};
