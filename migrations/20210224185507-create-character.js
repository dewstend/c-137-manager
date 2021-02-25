'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Characters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      species: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.ENUM('Female', 'Male', 'Genderless', 'unknown')
      },
      status: {
        type: Sequelize.ENUM('Alive', 'Dead', 'unknown')
      },
      image: {
        type: Sequelize.STRING
      },
      location_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Locations',
          key: 'id',
          as: 'location_id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Characters');
  }
};