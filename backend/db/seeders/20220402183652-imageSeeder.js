'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const pup_1_img_1 = {
      image: 'https://images.unsplash.com/photo-1600804340584-c7db2eacf0bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      puppyId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const pup_1_img_2 = {
      image: 'https://images.unsplash.com/photo-1620189507187-1ecc7e2e9cff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      puppyId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const pup_1_img_3 = {
      image: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      puppyId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const pup_1_img_4 = {
      image: 'https://images.unsplash.com/photo-1602250798140-fb1513d8f6a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      puppyId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const pup_2_img_1 = {
      image: 'https://images.unsplash.com/photo-1620189507187-1ecc7e2e9cff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      puppyId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const pup_2_img_2 = {
      image: 'https://images.unsplash.com/photo-1602250798140-fb1513d8f6a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      puppyId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const pup_3_img_1 = {
      image: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      puppyId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const pup_3_img_2 = {
      image: 'https://images.unsplash.com/photo-1602250798140-fb1513d8f6a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      puppyId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const pup_3_img_3 = {
      image: 'https://images.unsplash.com/photo-1620189507187-1ecc7e2e9cff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      puppyId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const pup_3_img_4 = {
      image: 'https://images.unsplash.com/photo-1602250798140-fb1513d8f6a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      puppyId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const pup_4_img_1 = {
      image: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      puppyId: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const pup_4_img_2 = {
      image: 'https://images.unsplash.com/photo-1602250798140-fb1513d8f6a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      puppyId: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const pup_5_img_1 = {
      image: 'https://images.unsplash.com/photo-1620189507187-1ecc7e2e9cff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      puppyId: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const pup_6_img_1 = {
      image: 'https://images.unsplash.com/photo-1602250798140-fb1513d8f6a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      puppyId: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const pup_7_img_1 = {
      image: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      puppyId: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const pup_8_img_1 = {
      image: 'https://images.unsplash.com/photo-1602250798140-fb1513d8f6a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      puppyId: 8,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const pup_9_img_1 = {
      image: 'https://images.unsplash.com/photo-1620189507187-1ecc7e2e9cff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      puppyId: 9,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const pup_10_img_1 = {
      image: 'https://images.unsplash.com/photo-1602250798140-fb1513d8f6a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      puppyId: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    };


    return queryInterface.bulkInsert('Images', [
      pup_1_img_1,
      pup_1_img_2,
      pup_1_img_3,
      pup_1_img_4,
      pup_2_img_1,
      pup_2_img_2,
      pup_3_img_1,
      pup_3_img_2,
      pup_3_img_3,
      pup_3_img_4,
      pup_4_img_1,
      pup_4_img_2,
      pup_5_img_1,
      pup_6_img_1,
      pup_7_img_1,
      pup_8_img_1,
      pup_9_img_1,
      pup_10_img_1,
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Images', null, {});

  }
};
