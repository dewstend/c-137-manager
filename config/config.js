require('dotenv').config();
module.exports = {
  "development": {
    "dialect": "sqlite",
    "storage": process.env.DB_STORAGE,
    "seederStorage": "sequelize"
  },
  "test": {
    "dialect": "sqlite",
    "storage": ":memory"
  },
  "production": {
    "dialect": "sqlite",
    "storage": process.env.DB_STORAGE
  }
};