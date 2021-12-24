const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize/dist");

const Student = sequelize.define("Student", {
  studentId: {
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
  teamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Student;
// module.exports = User;
// module.exports = Teams;
// module.exports = Project;
// module.exports = Jury;
