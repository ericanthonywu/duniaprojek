'use strict';

const {DataTypes} = require('sequelize')

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('chat', {
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            to: {
                type: DataTypes.BIGINT.UNSIGNED,
                references: {
                    model: 'users',
                    key: "id"
                }
            },
            from: {
                type: DataTypes.BIGINT.UNSIGNED,
                references: {
                    model: 'users',
                    key: "id"
                }
            },
            message: DataTypes.BIGINT.UNSIGNED,
            read: DataTypes.BOOLEAN,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('chat');
    }
};
