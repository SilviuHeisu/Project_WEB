const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize/dist");

const Student = sequelize.define("Student", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  CNP: { type: DataTypes.STRING, allowNull: false },
  yearOfStudy: { type: DataTypes.INTEGER, allowNull: false },
  birthYear: { type: DataTypes.INTEGER, validate: { min: 1900 } },
  faculty: { type: DataTypes.STRING, allowNull: false },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
});
module.exports = Student;
