'use strict';
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Episode extends Sequelize.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Episode.init({
    name: DataTypes.STRING,
    air_date: DataTypes.STRING,
    episode: DataTypes.STRING,
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
    modelName: 'Episode',
  });
  return Episode;
};