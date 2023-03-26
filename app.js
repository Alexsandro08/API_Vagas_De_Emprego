const express = require('express')
const hand = require('express-handlebars')
const path = require('path')
const app = express()
const bD = require('./bd/conexão')
const bodyParser = require('body-parser')
const px = require('./models/Dados')
const { create } = require('domain')
const Sequelize = require('sequelize')
const Op = Sequelize.Op



const porta = 8000

app.listen(porta, ()=>{
    console.log(`Funcionando na porta ${porta}`)
})


//bodyParser
app.use(bodyParser.urlencoded({extended:false}))


//handlebars
app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', hand.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//Arquivos estaticos
app.use(express.static(path.join(__dirname, 'public')))


//banco de dados
bD.authenticate()
   .then(()=>{
    console.log("Banco conectado")
   })
   .catch(err =>{
    console.log("Erro ao conectar", err)
   })

   // rotas

app.get('/', (req,res) =>{
    
    let search = req.query.px
    let query = '%'+search+'%'

    if(!search){
       px.findAll({order:[
        ['createdAt', 'DESC']
    ]})
    .then(px =>{
        res.render('index',{
            px
        })
    }) .catch(err => console.log(err))
    } else{
        px.findAll({
            where:{titulo:{[Op.like]: query}},
            order:[
            ['createdAt', 'DESC']
        ]})
        .then(px =>{
            res.render('index',{
                px, search
            })
        })
        .catch(err => console.log(err))
    }
})

// todas rotas

app.use('/px', require('./rotas/px'))