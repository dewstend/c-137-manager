'use strict';
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Sequelize.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Location, {
        foreignKey: 'location_id',
        onDelete: 'CASCADE'
      })
    }
  };
  Character.init({
    name: DataTypes.STRING,
    species: DataTypes.STRING,
    type: DataTypes.STRING,
    gender: DataTypes.ENUM('Female', 'Male', 'Genderless', 'unknown'),
    status: DataTypes.ENUM('Alive', 'Dead', 'unknown'),
    image: DataTypes.STRING,
    location_id: DataTypes.INTEGER,
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
    modelName: 'Character',
  });
  return Character;
};