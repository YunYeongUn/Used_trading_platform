const Sequelize = require('sequelize');
const User = require('./users');
const Board = require('./board');
const Category = require('./category');
const Product = require('./product');
const Board_reply = require('./board_reply');
const Product_reply = require('./product_reply');
const Team_member = require('./team_member');
const Jap_reply = require('./jap_reply');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Board = Board;
db.Category = Category;
db.Product = Product;
db.Board_reply = Board_reply;
db.Product_reply = Product_reply;
db.Team_member = Team_member;
db.Jap_reply = Jap_reply;

User.init(sequelize);
Board.init(sequelize);
Category.init(sequelize);
Product.init(sequelize);
Board_reply.init(sequelize);
Product_reply.init(sequelize);
Team_member.init(sequelize);
Jap_reply.init(sequelize);

User.associate(db);
Board.associate(db);
Category.associate(db);
Product.associate(db);
Board_reply.associate(db);
Product_reply.associate(db);
Jap_reply.associate(db);

module.exports = db;
