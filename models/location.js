'use strict';
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Sequelize.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Character, {
        foreignKey: 'location_id'
      })
    }
  };
  Location.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    dimension: DataTypes.STRING,
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
  }, {
    sequelize,
    modelName: 'Location',
  });
  return Location;
};