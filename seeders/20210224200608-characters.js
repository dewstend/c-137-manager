"use strict";
const models = require("../models/");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Characters = require("../populate/characters.json");
    for (let char of Characters) {
      const location = await models.Location.findOne({
        where: {
          id: char.location_id,
        },
      });
      char.createdAt = new Date();
      char.updatedAt = new Date();
      char.location_id = location.id;
    }
    return queryInterface.bulkInsert("Characters", Characters);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Characters", null);
  },
};
