const Sequelize = require("sequelize");
const connection =  require("../database/connection.js")


const Politicians = connection.define("politicians",{
    name:{
        type: Sequelize.STRING,
        allowNull:false
    },
    votes:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
})







module.exports = Politicians