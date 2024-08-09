const { Sequelize } = require('sequelize');
const db = require('../config/database');
const { unsignedDecimalNumber } = require('docx');
const Kecamatan = require('./kecamatan');

const { DataTypes } = Sequelize;

const Kelurahan = db.define('kelurahan', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_kecamatan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Kecamatan,
            key: 'id',
        },
    },
}, {
    freezeTableName: true,
    timestamps: false,
});

Kelurahan.belongsTo(Kecamatan, {foreignKey: 'id_kecamatan' });

module.exports = Kelurahan;