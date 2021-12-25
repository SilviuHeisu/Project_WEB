const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize/dist");

const User = sequelize.define("User", {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
  password: { type: DataTypes.STRING, allowNull: false },
  subject:{type: DataTypes.STRING, allowNull: false}

});
module.exports = User;
