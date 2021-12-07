const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize/dist");
const Jury = sequelize.define("Juries", {
  juryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userID: {
    type: DataTypes.INTEGER,
  },
  projectId: {
    type: DataTypes.INTEGER,
  },
  grade: {
    type: DataTypes.REAL,
  },
});
