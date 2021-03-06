"use strict";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

require("./models/student");
require("./models/teams");
require("./models/user");
require("./models/project");
require("./models/rate");
require("./models/Deliverable");

const sequelize = require("./sequelize");
const Student = require("./models/student");
const Teams = require("./models/teams");
const Jury = require("./models/jury");
const User = require("./models/user");
const Project = require("./models/project");
const Rate = require("./models/rate");
const Deliverable = require("./models/Deliverable");
const { use } = require("express/lib/application");
const { where } = require("sequelize/dist");
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

Teams.hasMany(Rate, { foreignKey: "teamId" });
Rate.belongsTo(Teams, { foreignKey: "teamId" });

Project.hasMany(Deliverable, { foreignKey: "teamId" });
Deliverable.belongsTo(Project, { foreignKey: "teamId" });

// Student.hasOne(User, { foreignKey: "userId" });
// User.belongsTo(Student, { foreignKey: "userId" });

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
let studentByTeamId = [];
app.get("/student/:teamId", async (req, res) => {
  try {
    studentByTeamId = await Student.findAll({
      where: {
        teamId: req.params.teamId,
      },
    });
    if (studentByTeamId) {
      res.status(200).json(studentByTeamId);
    } else res.status(404).json({ message: "not found" });
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
var students = [];

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
app.post("/upload", (req, res) => {
  setTimeout(() => {
    console.log("file uploaded!");
    return req
      .status(200)
      .json({ result: true, msg: "file was uploaded" }, 3000);
  });
});
app.delete("/upload", (req, res) => {
  console.log("file deleted");
  return res.status(200).json({ result: true, msg: "file deleted" });
});

// ---------------------------RATE--------------------------------
var rates = [];

app.get("/rate", async (req, res) => {
  try {
    rates = await Rate.findAll();

    res.status(201).json(rates);
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "ERROR" });
  }
});
app.post("/rate", async (req, res) => {
  try {
    const rate = req.body;
    await Rate.create(rate);
    res.status(201).json(rates);
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "ERROR" });
  }
});

app.put("/rate/:rateId", async (req, res) => {
  try {
    const rate = await Rate.findByPk(req.params.rateId);
    if (rate) {
      await rate.update(req.body, {
        fields: ["mark"],
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
let rateFiltered = [];
app.get("/rate/:teamId", async (req, res) => {
  try {
    rateFiltered = await Rate.findAll({
      where: {
        teamId: req.params.teamId,
      },
    });
    if (rateFiltered) {
      res.status(200).json(rateFiltered);
    } else res.status(404).json({ message: "not found" });
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "ERROR" });
  }
});
app.delete("/rate/:rateId", async (req, res) => {
  try {
    const rate = await Rate.findByPk(req.params.rateId);
    if (rate) {
      await rate.destroy();
      res.status(202).json({ message: "accepted" });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "some error occured" });
  }
});

let rateByTeamId = [];
app.get("/deliverable/:projectId", async (req, res) => {
  try {
    rateByTeamId = await Rate.findAll({
      where: {
        teamId: req.params.teamId,
      },
    });
    if (rateByTeamId) {
      res.status(200).json(rateByTeamId);
    } else res.status(404).json({ message: "not found" });
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "ERROR" });
  }
});
let deliverables = [];
app.get("/deliverable", async (req, res) => {
  try {
    deliverables = await Deliverable.findAll();

    res.status(201).json(deliverables);
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "ERROR" });
  }
});

app.post("/deliverable", async (req, res) => {
  try {
    const deliverable = req.body;
    await Deliverable.create(deliverable);

    res.status(201).json(deliverable);
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "ERROR" });
  }
});
app.get("/deliverable/:projectId", async (req, res) => {
  try {
    deliverablesByProject = await Deliverable.findAll({
      where: {
        projectId: req.params.projectId,
      },
    });
    if (deliverablesByProject) {
      res.status(200).json(deliverablesByProject);
    } else res.status(404).json({ message: "not found" });
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "ERROR" });
  }
});
