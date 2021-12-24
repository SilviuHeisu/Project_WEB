const { Sequelize } = require("sequelize/dist");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./sqlite/databaseProject.db",
  define: {
    timestamps: false,
  },
});
sequelize.sync({ alter: true }).then(() => {
  console.log("All models have been sync");
});
module.exports = sequelize;
