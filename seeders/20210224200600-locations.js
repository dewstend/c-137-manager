'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const Locations = require('../populate/Locations.json');
    Locations.forEach(location => {
      location.createdAt = new Date();
      location.updatedAt = new Date();
    });
    return queryInterface.bulkInsert('Locations', Locations);
  },
  
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Locations', null);
  }
};