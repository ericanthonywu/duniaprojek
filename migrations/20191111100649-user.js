'use strict';

const {DataTypes} = require('sequelize')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
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
      email_st: DataTypes.BOOLEAN,
      email_token: DataTypes.MEDIUMINT.UNSIGNED,
      email_expire_token: DataTypes.DATE,
      profile_picture: DataTypes.STRING,
      rating: DataTypes.SMALLINT.UNSIGNED,
      website: DataTypes.STRING,
      location: DataTypes.JSON,
      created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
