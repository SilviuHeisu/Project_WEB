const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize/dist");
const Jury = sequelize.define("Juries", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  studentId: {
    type: DataTypes.INTEGER,
  },
  projectId: {
    type: DataTypes.INTEGER,
  },
  grade: {
    type: DataTypes.REAL,
  },
});
