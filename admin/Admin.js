const Sequelize = require("sequelize");
const connection =  require("../database/connection.js")


const Admin = connection.define("admins",{
    user:{
        type: Sequelize.STRING,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    }
})








module.exports = Admin