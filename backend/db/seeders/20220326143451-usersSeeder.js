'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {

    const demoUser = {
      firstName: 'Juan',
      lastName: 'Perez',
      username: 'TheBreeder',
      email: 'puppy@breeder.com',
      imageProfile: '',
      hashedPassword: bcrypt.hashSync('password'),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return queryInterface.bulkInsert('Users', [demoUser], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Users', null, {});

  }
};
