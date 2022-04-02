'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    const litter_01 = {
      name: 'Willis-Moore',
      description: "This are the cuttest puppies you'll ever see",
      imageHeader: 'https://images.unsplash.com/photo-1583073972411-4a2eae2634cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1966&q=80',
      address: 'password',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return queryInterface.bulkInsert('Litter', [litter_01], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Litter', null, {});

  }
};
