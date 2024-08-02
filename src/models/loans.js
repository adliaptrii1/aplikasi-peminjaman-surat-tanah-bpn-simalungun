const { Sequelize } = require('sequelize');
const db = require('../config/database');
const { unsignedDecimalNumber } = require('docx');
const Kelurahan = require('./kelurahan');
const RightsType = require('./rights-type');
const Services = require('./services');
const Users = require('./user');

const { DataTypes } = Sequelize;

const Loans = db.define('loans', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    id_kelurahan: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: Kelurahan,
            key: 'id',
        },

    },
    id_rights_type: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: RightsType,
            key: 'id',
        },
    },
    id_service: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: Services,
            key: 'id',
        },
    },
    id_user: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: Users,
            key: 'id',
        },
    },
    file_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    right_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    file: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    information: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    history: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    freezeTableName: true,
});

Loans.belongsTo(Kelurahan, {
    foreignKey: 'id_kelurahan',
});
Loans.belongsTo(RightsType, {
    foreignKey: 'id_rights_type',
});
Loans.belongsTo(Services, {
    foreignKey: 'id_service',
});
Loans.belongsTo(Users, {
    foreignKey: 'id_user',
});

module.exports = Loans;