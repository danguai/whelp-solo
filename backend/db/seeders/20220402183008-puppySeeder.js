'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    const puppy_1_1 = {
      name: 'Rumer', description: "The oldest of them all", userId: 1, litterId: 1, year: '2022', month: '1', day: '3', createdAt: new Date(), updatedAt: new Date(),
    };

    const puppy_1_2 = {
      name: 'Scout', description: "The middle pup", userId: 1, litterId: 1, year: '2022', month: '1', day: '3', createdAt: new Date(), updatedAt: new Date(),
    };

    const puppy_1_3 = {
      name: 'Tallullahs', description: "The youngest and craziest", userId: 1, litterId: 1, year: '2022', month: '1', day: '3', createdAt: new Date(), updatedAt: new Date(),
    };

    const puppy_2_1 = {
      name: 'Uno', description: "Like the card game... Yes!", userId: 1, litterId: 2, year: '2022', month: '2', day: '15', createdAt: new Date(), updatedAt: new Date(),
    };

    const puppy_2_2 = {
      name: 'Dos', description: "Is not the card game.", userId: 1, litterId: 2, year: '2022', month: '2', day: '15', createdAt: new Date(), updatedAt: new Date(),
    };

    const puppy_3_1 = {
      name: 'Norman The First', description: "Excellent Farmer", userId: 2, litterId: 3, year: '2022', month: '1', day: '24', createdAt: new Date(), updatedAt: new Date(),
    };

    const puppy_3_2 = {
      name: 'Norman The Second', description: "Good Farmer", userId: 2, litterId: 3, year: '2022', month: '1', day: '24', createdAt: new Date(), updatedAt: new Date(),
    };

    const puppy_3_3 = {
      name: 'Norman The Third', description: "Ok Farmer", userId: 2, litterId: 3, year: '2022', month: '1', day: '24', createdAt: new Date(), updatedAt: new Date(),
    };

    const puppy_3_4 = {
      name: 'Norman The Fourth', description: "Lazy Farmer", userId: 2, litterId: 3, year: '2022', month: '1', day: '24', createdAt: new Date(), updatedAt: new Date(),
    };

    const puppy_3_5 = {
      name: 'Norman The Fifth', description: "Terrible Farmer", userId: 2, litterId: 3, year: '2022', month: '1', day: '24', createdAt: new Date(), updatedAt: new Date(),
    };

    return queryInterface.bulkInsert('Puppies', [
      puppy_1_1,
      puppy_1_2,
      puppy_1_3,
      puppy_2_1,
      puppy_2_2,
      puppy_3_1,
      puppy_3_2,
      puppy_3_3,
      puppy_3_4,
      puppy_3_5
    ], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Puppies', null, {});

  }
};
