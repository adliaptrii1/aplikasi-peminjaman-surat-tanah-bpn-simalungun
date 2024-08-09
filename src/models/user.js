// models/user.js
const { Sequelize } = require('sequelize');
const db = require('../config/database');
const { unsignedDecimalNumber } = require('docx');

const { DataTypes } = Sequelize;

const Users = db.define('users', {
  // CREATE TABLE `users` (
  //   `id` int(11) UNSIGNED NOT NULL,
  //   `name` varchar(100) NOT NULL,
  //   `email` varchar(50) NOT NULL,
  //   `phone_number` varchar(20) NOT NULL,
  //   `password` varchar(255) NOT NULL,
  //   `isAdmin` tinyint(1) NOT NULL DEFAULT 0,
  //   `access_token` text DEFAULT NULL,
  //   `refresh_token` text DEFAULT NULL
  // ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unsignedDecimalNumber: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: false,
  },
  // access_token: {
  //   type: DataTypes.TEXT,
  //   allowNull: true,
  // },
  refresh_token: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

}, {
  freezeTableName: true,
  // timestamps: false,
});

module.exports = Users;