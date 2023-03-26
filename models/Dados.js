const Sequelize = require('sequelize')
const sequelize = require('../bd/conexão') 
const bd = require('../bd/conexão')


const Dados = bd.define('Dados', {
    titulo:{
        type: Sequelize.STRING,
    }, salario:{
        type: Sequelize.STRING,
    }, empresa: {
        type:Sequelize.STRING,

    }, email:{
        type: Sequelize.STRING,

    }, novo:{
        type:Sequelize.INTEGER
    }

  

})

module.exports = Dados