'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    const review_01_WillisMoore = {
      title: 'Great Litter',
      message: 'So cute',
      score: 5,
      userId: 2,
      litterId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const review_02_TwoSiblings = {
      title: 'Great Litter',
      message: 'So cute',
      score: 5,
      userId: 1,
      litterId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return queryInterface.bulkInsert('Reviews', [review_01_WillisMoore, review_02_TwoSiblings], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Reviews', null, {});

  }
};
