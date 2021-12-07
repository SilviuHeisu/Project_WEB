const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize/dist");

const User = sequelize.define("User", {
    userName: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    password:{ type: DataTypes.STRING,
         allowNull: false },
    isProfessor:{
        type: DataTypes.BOOLEAN, 
        allowNull:false
    }
});
module.exports = User;