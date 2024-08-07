const { Sequelize } = require('sequelize');
const db = require('../config/database');
const { unsignedDecimalNumber } = require('docx');

const { DataTypes } = Sequelize;

// CREATE TABLE `officers` (
//     `id` int(11) NOT NULL,
//     `name` varchar(50) NOT NULL,
//     `position` varchar(50) NOT NULL,
//     `nip` int(11) NOT NULL,
//     `golongan` varchar(50) DEFAULT NULL
//   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

const Officers = db.define('officers', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nip: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    golongan: {
        type: DataTypes.STRING,
    },
}, {
    freezeTableName: true,
    timestamps: false,
});

module.exports = Officers;