"use strict";
const express = require("express");
const app = express();
require("./models/student");
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
