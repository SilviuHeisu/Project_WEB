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
  teamID: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
const Teams = sequelize.define("Teams", {
  teamID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: { type: DataTypes.STRING, allowNull: false },
});
const Project = sequelize.define("Project", {
  projectId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  projectName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const User = sequelize.define("User", {
  userName: {
    type: DataTypes.STRING,
    primaryKey: true,
    autoIncrement: true,
  },
  password: { type: DataTypes.STRING, allowNull: false },
  isProfessor: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Teams.hasMany(Student);
Student.belongsTo(Teams);

Teams.hasOne(Project);
Project.belongsTo(Teams);

Project.hasMany(Jury);
Jury.belongsTo(Project);

Jury.hasOne(Student);
Student.belongsTo(Jury);

Student.hasOne(User);
User.belongsTo(Student);

module.exports = Student;
module.exports = User;
module.exports = Teams;
module.exports = Project;
module.exports = Jury;
