'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {

    const demoUser = {
      firstName: 'Juan',
      lastName: 'Perez',
      email: 'puppy@breeder.com',
      imageProfile: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
      hashedPassword: bcrypt.hashSync('password'),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const userTwo = {
      firstName: 'Barack',
      lastName: 'Obama',
      email: 'barack@obama.com',
      imageProfile: 'https://www.biography.com/.image/t_share/MTE4MDAzNDEwNzg5ODI4MTEw/barack-obama-12782369-1-402.jpg',
      hashedPassword: bcrypt.hashSync('password'),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const userThree = {
      firstName: 'Rafaela',
      lastName: 'Carra',
      email: 'rafaela@carra.com',
      imageProfile: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
      hashedPassword: bcrypt.hashSync('password'),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return queryInterface.bulkInsert('Users', [demoUser, userTwo, userThree], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Users', null, {});

  }
};
