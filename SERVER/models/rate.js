const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize/dist");

const Rate = sequelize.define("Rate", {
    rateId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    mark: { type: DataTypes.INTEGER, allowNull: false },
    person: {type:DataTypes.STRING, allowNull: false},
    teamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    
  });


  module.exports = Rate;