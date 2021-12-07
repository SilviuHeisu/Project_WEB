const sequelize = require("../sequelize");
const DataTypes = require("sequelize/dist");
const Project = sequelize.define("Project", {
  projectId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  projectName:{
     type: DataTypes.STRING,
     allowNull: false 
  }
});

module.exports = Project;
