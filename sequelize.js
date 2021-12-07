const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./sqlite/databaseProject.db",
  define: {
    timestamps: false,
  },
});
sequelize.sync().then(() => {
  console.log("All models have been sync");
});
module.exports = sequelize;
