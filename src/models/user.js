// models/user.js
const { Sequelize } = require('sequelize');
const db = require('../config/database');
const { unsignedDecimalNumber } = require('docx');
const refreshToken = require('../utils/refresh-token');

const { DataTypes } = Sequelize;

const Users = db.define('users', {
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
    unique: true,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nik: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
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
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // access_token: {
  //   type: DataTypes.TEXT,
  //   allowNull: true,
  // },
  refresh_token: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  reset_pass_token: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

}, {
  freezeTableName: true,
  // timestamps: false,
});

module.exports = Users;