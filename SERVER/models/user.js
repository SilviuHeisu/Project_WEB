const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize/dist");

const User = sequelize.define("User", {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
  password: { type: DataTypes.STRING, allowNull: false },
  isProfessor: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
module.exports = User;
