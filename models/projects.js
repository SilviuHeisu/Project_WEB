const sequelize = require("../sequelize");
const DataTypes = require("sequelize/dist");
const Project = sequelize.define("Project", {
  className: { type: DataTypes.STRING },
  studentId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  projectId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});
