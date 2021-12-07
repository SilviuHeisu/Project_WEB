const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize/dist");
const Student = sequelize.define("Student", {
  StudentId: {
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

const Jury = sequelize.define("Juries", {
  juryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userID: {
    type: DataTypes.INTEGER,
  },
  projectId: {
    type: DataTypes.INTEGER,
  },
  grade: {
    type: DataTypes.REAL,
  },
});
Student.hasOne(Jury);
module.exports = Student;
