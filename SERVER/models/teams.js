const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize/dist");

const Teams = sequelize.define("Teams", {
  teamId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: { type: DataTypes.STRING, allowNull: true },
});
module.exports = Teams;
