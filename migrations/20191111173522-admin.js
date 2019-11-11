'use strict';

const {DataTypes} = require('sequelize')

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('admin', {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            username: Sequelize.STRING,
            password: Sequelize.STRING,
            role: DataTypes.TINYINT.UNSIGNED,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('admin');
    }
};
