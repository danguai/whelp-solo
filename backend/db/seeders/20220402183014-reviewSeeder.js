'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    const review_01_WillisMoore = {
      title: 'Great Litter',
      message: 'So cute',
      score: 5,
      userId: 3,
      litterId: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return queryInterface.bulkInsert('Reviews', [review_01_WillisMoore], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Reviews', null, {});

  }
};
