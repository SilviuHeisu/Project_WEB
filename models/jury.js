const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize/dist");
const Jury = sequelize.define("Juries", {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true
   
  },
 
  projectId: {
    type: DataTypes.INTEGER,
  },
  grade: {
    type: DataTypes.REAL,
  },
});

module.exports = Jury;