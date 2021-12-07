const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./sqlite/databaseProject.db",
});
sequelize.sync({ alter: true }).then(() => {
  console.log("All models have been sync");
});
module.exports = sequelize;
