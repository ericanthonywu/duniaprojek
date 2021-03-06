'use strict';

const {DataTypes} = require('sequelize')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('projectBids', {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      projects: {
        type: DataTypes.BIGINT.UNSIGNED,
        references: {
          model: 'projects',
          key: "id"
        }
      },
      amount: DataTypes.INTEGER.UNSIGNED,
      message: DataTypes.STRING,
      attachments: DataTypes.STRING,
      users: {
        type: DataTypes.BIGINT.UNSIGNED,
        references: {
          model: 'users',
          key: "id"
        }
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('projectBids');
  }
};
