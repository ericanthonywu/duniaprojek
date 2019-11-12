'use strict';

const {DataTypes} = require('sequelize')

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('workers', {
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            username: DataTypes.STRING,
            password: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                unique: true,
            },
            email_st: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            email_token: DataTypes.MEDIUMINT.UNSIGNED,
            email_expire_token: DataTypes.DATE,
            profile_picture: DataTypes.STRING,
            rating: DataTypes.SMALLINT.UNSIGNED,
            description: DataTypes.STRING,
            website: DataTypes.STRING,
            location: DataTypes.STRING,
            nohp: DataTypes.STRING,
            nohp_st: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('workers');
    }
};
