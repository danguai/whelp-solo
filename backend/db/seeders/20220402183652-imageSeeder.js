'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const puppy_1_1_images = {
      image_01: 'https://images.unsplash.com/photo-1600804340584-c7db2eacf0bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      image_02: 'https://images.unsplash.com/photo-1620189507187-1ecc7e2e9cff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      image_03: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      image_04: 'https://images.unsplash.com/photo-1602250798140-fb1513d8f6a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      puppyId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const puppy_1_2_images = {
      image_01: 'https://images.unsplash.com/photo-1565726166189-e9814a05ffde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
      image_02: 'https://images.unsplash.com/photo-1530667912788-f976e8ee0bd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80',
      image_03: '',
      image_04: '',
      puppyId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const puppy_1_3_images = {
      image_01: 'https://images.unsplash.com/photo-1625794084867-8ddd239946b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
      image_02: 'https://images.unsplash.com/photo-1589441161120-8781d5644435?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2525&q=80',
      image_03: 'https://images.unsplash.com/photo-1524641234638-4c303747c310?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
      image_04: '',
      puppyId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const puppy_2_1_images = {
      image_01: 'https://images.unsplash.com/photo-1600804340584-c7db2eacf0bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      image_02: 'https://images.unsplash.com/photo-1620189507187-1ecc7e2e9cff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      image_03: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      image_04: 'https://images.unsplash.com/photo-1602250798140-fb1513d8f6a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      puppyId: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const puppy_2_2_images = {
      image_01: 'https://images.unsplash.com/photo-1565726166189-e9814a05ffde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
      image_02: 'https://images.unsplash.com/photo-1530667912788-f976e8ee0bd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80',
      image_03: '',
      image_04: '',
      puppyId: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const puppy_3_1_images = {
      image_01: 'https://images.unsplash.com/photo-1625794084867-8ddd239946b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
      image_02: 'https://images.unsplash.com/photo-1589441161120-8781d5644435?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2525&q=80',
      image_03: 'https://images.unsplash.com/photo-1524641234638-4c303747c310?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
      image_04: '',
      puppyId: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const puppy_3_2_images = {
      image_01: 'https://images.unsplash.com/photo-1625794084867-8ddd239946b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
      image_02: 'https://images.unsplash.com/photo-1589441161120-8781d5644435?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2525&q=80',
      image_03: 'https://images.unsplash.com/photo-1524641234638-4c303747c310?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
      image_04: '',
      puppyId: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const puppy_3_3_images = {
      image_01: 'https://images.unsplash.com/photo-1600804340584-c7db2eacf0bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      image_02: 'https://images.unsplash.com/photo-1620189507187-1ecc7e2e9cff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      image_03: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      image_04: '',
      puppyId: 8,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const puppy_3_4_images = {
      image_01: 'https://images.unsplash.com/photo-1565726166189-e9814a05ffde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
      image_02: '',
      image_03: '',
      image_04: '',
      puppyId: 9,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const puppy_3_5_images = {
      image_01: 'https://images.unsplash.com/photo-1625794084867-8ddd239946b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
      image_02: 'https://images.unsplash.com/photo-1589441161120-8781d5644435?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2525&q=80',
      image_03: 'https://images.unsplash.com/photo-1524641234638-4c303747c310?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
      image_04: '',
      puppyId: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return queryInterface.bulkInsert('Images', [
      puppy_1_1_images,
      puppy_1_2_images,
      puppy_1_3_images,
      puppy_2_1_images,
      puppy_2_2_images,
      puppy_3_1_images,
      puppy_3_2_images,
      puppy_3_3_images,
      puppy_3_4_images,
      puppy_3_5_images,
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Images', null, {});

  }
};
