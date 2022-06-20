const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        user_id: {
          type: Sequelize.STRING(50),
          allowNull: false,
          primaryKey: true,
        },
        nickname: {
          type: Sequelize.STRING(8),
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(32),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        addr: {
          type: Sequelize.STRING(32),
          allowNull: true,
        },
        phone_num: {
          type: Sequelize.INTEGER,
          allowNull: false,
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
        underscored: false,
        modelName: 'User',
        tableName: 'users',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Board, { foreignKey: 'writer', sourceKey: 'id' });
    db.User.hasMany(db.Board_reply, {
      foreignKey: 'writer',
      sourceKey: 'id',
    });
    db.User.hasMany(db.Product, { foreignKey: 'writer', sourceKey: 'id' });
    db.User.hasMany(db.Product_reply, {
      foreignKey: 'writer',
      sourceKey: 'id',
    });
    db.User.hasMany(db.Jap_reply, { foreignKey: 'writer', sourceKey: 'id' });
  }
};
