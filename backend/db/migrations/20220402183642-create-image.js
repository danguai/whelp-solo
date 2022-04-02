'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      image_01: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      image_02: {
        type: Sequelize.TEXT
      },
      image_03: {
        type: Sequelize.TEXT
      },
      image_04: {
        type: Sequelize.TEXT
      },
      puppyId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Puppies' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Images');
  }
};
