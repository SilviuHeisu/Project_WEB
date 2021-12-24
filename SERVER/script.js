"use strict";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

require("./models/student");
require("./models/teams");
require("./models/user");
require("./models/project");

const sequelize = require("./sequelize");
const Student = require("./models/student");
const Teams = require("./models/teams");
const Jury = require("./models/jury");
const User = require("./models/user");
const Project = require("./models/project");
const { use } = require("express/lib/application");
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.listen(7000, async () => {
  console.log("Server start on 7000");
  try {
    await sequelize.authenticate();
    console.log("Connection has been established!");
  } catch (err) {
    console.log("Unable to connect to the database: " + err);
  }
});

Teams.hasMany(Student, { foreignKey: "teamId" });
Student.belongsTo(Teams, { foreignKey: "teamId" });

Teams.hasOne(Project, { foreignKey: "teamId" });
Project.belongsTo(Teams, { foreignKey: "teamId" });

Project.hasMany(Jury, { foreignKey: "projectId" });
Jury.belongsTo(Project, { foreignKey: "projectId" });

Student.hasOne(Jury, { foreignKey: "userId" });
Jury.belongsTo(Student, { foreignKey: "userId" });

Student.hasOne(User, { foreignKey: "userId" });
User.belongsTo(Student, { foreignKey: "userId" });

var users = [];
app.use(bodyParser.json());

//-----------------------------------USER---------------------------------------------------
app.get("/user", async (req, res) => {
  try {
    users = await User.findAll();

    res.status(201).json(users);
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "ERROR" });
  }
});
app.post("/user", async (req, res) => {
  try {
    const user = req.body;
    await User.create(user);

    res.status(201).json(users);
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "ERROR" });
  }
});

app.put("/user/:userId", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (user) {
      await user.update(req.body, {
        fields: ["password"],
      });
      res.status(202).json({ message: "accepted" });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "ERROR" });
  }
});

app.delete("/user/:userId", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (user) {
      await user.destroy();
      res.status(202).json({ message: "accepted" });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error occured" });
  }
});

//-----------------------------------STUDENT---------------------------------------------------
var students = null;

app.get("/student", async (req, res) => {
  try {
    students = await Student.findAll();

    res.status(201).json(students);
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "ERROR" });
  }
});
app.post("/student", async (req, res) => {
  try {
    const student = req.body;
    await Student.create(student);
    res.status(201).json(students);
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "ERROR" });
  }
});

app.put("/student/:userId", async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.userId);
    if (student) {
      await student.update(req.body, {
        fields: [
          "firstName",
          "lastName",
          "CNP",
          "yearOfStudy",
          "birthYear",
          "faculty",
          "email",
        ],
      });
      res.status(202).json({ message: "accepted" });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "ERROR" });
  }
});

app.delete("/student/:userId", async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.userId);
    if (student) {
      await student.destroy();
      res.status(202).json({ message: "accepted" });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error occured" });
  }
});
var juries = null;
//--------------------------------JURY--------------
app.get("/jury", async (req, res) => {
  try {
    juries = await User.findAll();

    res.status(201).json(juries);
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "ERROR" });
  }
});
app.post("/jury", async (req, res) => {
  try {
    const jury = req.body;
    await Jury.create(jury);
    res.status(201).json(jury);
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "ERROR" });
  }
});

app.put("/jury/:userId", async (req, res) => {
  try {
    const jury = await User.findByPk(req.params.userId);
    if (jury) {
      await jury.update(req.body, {
        fields: ["grade"],
      });
      res.status(202).json({ message: "accepted" });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "ERROR" });
  }
});
//------------------------Projects-------------------
//--------------------------------JURY--------------
var projects = null;
app.get("/project", async (req, res) => {
  try {
    projects = await Project.findAll();

    res.status(201).json(projects);
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "ERROR" });
  }
});
app.post("/project", async (req, res) => {
  try {
    const project = req.body;
    await Project.create(project);
    res.status(201).json(project);
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "ERROR" });
  }
});

app.put("/jury/:projectId", async (req, res) => {
  try {
    const project = await User.findByPk(req.params.projectId);
    if (project) {
      await project.update(req.body, {
        fields: ["projectName", "teamId"],
      });
      res.status(202).json({ message: "accepted" });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "ERROR" });
  }
});
//--------------------TEAMS-----------------
var teams = null;
app.get("/team", async (req, res) => {
  try {
    teams = await Teams.findAll();

    res.status(201).json(teams);
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "ERROR" });
  }
});
app.post("/team", async (req, res) => {
  try {
    const team = req.body;
    await Teams.create(team);
    res.status(201).json(team);
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "ERROR" });
  }
});

app.put("/team/:teamId", async (req, res) => {
  try {
    const team = await Teams.findByPk(req.params.teamId);
    if (team) {
      await team.update(req.body, {
        fields: ["teamName"],
      });
      res.status(202).json({ message: "accepted" });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "ERROR" });
  }
});
