'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    const litter_01 = {
      name: 'Willis-Moore',
      description: "This are the cuttest puppies you'll ever see",
      imageHeader: 'https://images.unsplash.com/photo-1583073972411-4a2eae2634cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1966&q=80',
      address: '19 Fisher St',
      city: "Providence",
      state: "Rhode Island",
      zipcode: '02906',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const litter_02 = {
      name: 'Two Little Siblings',
      description: "Two are better than one.",
      imageHeader: 'https://images.unsplash.com/photo-1606833694770-40a04762ac16?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1351&q=80',
      address: '570 Westminster Rd',
      city: "Brooklyn",
      state: "New York",
      zipcode: '11230',
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const litter_03 = {
      name: 'The Five Farmers',
      description: "Very hard-working family",
      imageHeader: 'https://images.unsplash.com/photo-1582068955580-dcc6c0812b21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      address: '19 Fisher St',
      city: "Providence",
      state: "Rhode Island",
      zipcode: '02906',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return queryInterface.bulkInsert('Litter', [litter_01, litter_02, litter_03], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Litter', null, {});

  }
};
