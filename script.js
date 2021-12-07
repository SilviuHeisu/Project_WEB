"use strict";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const User = require("./models/student");
require("./models/student");
require("./models/teams");
require("./models/user");
require("./models/project");

const sequelize = require("./sequelize");
app.listen(7000, async () => {
  console.log("Server start on 7000");
  try {
    await sequelize.authenticate();
    console.log("Connection has been established!");
  } catch (err) {
    console.log("Unable to connect to the database: " + err);
  }
});
app.use(bodyParser.json());
app.get("/user", async (req, res) => {
  try {
    const users = await User.findAll();

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
