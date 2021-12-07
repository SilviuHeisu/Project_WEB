const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize/dist");

const Teams = sequelize.define("Teams", {
    teamID: {
        type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    },
    teamName: { type: DataTypes.STRING, allowNull: false }

});
module.exports = Teams;