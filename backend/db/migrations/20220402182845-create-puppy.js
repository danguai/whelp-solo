'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Puppies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      year: {
        allowNull: false,
        type: Sequelize.STRING(4)
      },
      month: {
        allowNull: false,
        type: Sequelize.STRING(2)
      },
      day: {
        allowNull: false,
        type: Sequelize.STRING(2)
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users' }
      },
      litterId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Litter' }
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
    return queryInterface.dropTable('Puppies');
  }
};
