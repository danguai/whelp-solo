'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    const puppy_01 = {
      name: 'Rumer',
      description: "The oldest of them all",
      birthday: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const puppy_02 = {
      name: 'Scout',
      description: "The middle pup",
      birthday: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const puppy_03 = {
      name: 'Tallullahs',
      description: "The youngest and craziest",
      birthday: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return queryInterface.bulkInsert('Puppies', [puppy_01, puppy_02, puppy_03], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Puppies', null, {});

  }
};