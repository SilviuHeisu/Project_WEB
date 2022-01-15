const sequelize = require("../sequelize");
const DataTypes = require("sequelize/dist");
const Deliverable = sequelize.define("Deliverable", {
  deliverableId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nameOfFile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  studentWhoUploaded: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  teamId: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Deliverable;
