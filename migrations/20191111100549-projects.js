'use strict';

const {DataTypes} = require('sequelize')

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('projects', {
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            name: DataTypes.STRING,
            type: {
            type: DataTypes.BIGINT.UNSIGNED,
                references: {
                model: 'projectsType',
                    key: 'id'
            },
        },
            description: DataTypes.STRING,
            deadline: DataTypes.DATE,
            weekly_report: DataTypes.BOOLEAN,
            closed: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            published_budget: DataTypes.INTEGER,
            created_by: {
                type: DataTypes.BIGINT.UNSIGNED,
                references: {
                    model: 'user',
                    key: 'id'
                },
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('projects');
    }
};
