'use strict';
const bcrypt = require('bcryptjs')
const moment = require('moment')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('admin', [{
      id: 1,
      username: 'superadmin',
      password: bcrypt.hashSync('admin'),
      role: 1,
      createdAt: moment(Date.now())
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('People', null, {});
  }
};
