const express = require('express')
const router = express.Router()
const Dados = require('../models/Dados')

router.get('/test', (req,res)=>{
    res.send('Funcionando normal')
})

//Detalhe da vaga
router.get('/view/:id', (req,res)=> Dados.findOne({
    where:{id: req.params.id}
}).then(px =>{

   res.render('view', {
    px
  })
}).catch(err => console.log(err))
)

//Envio de vaga
router.get('/add',(req, res)=>{
  res.render('add')
})

//add via post

router.post('/add', (req,res)=>{
  let {titulo,salario,empresa,email,novo} = req.body


//inserir
    Dados.create({
    titulo,
    salario,
    empresa,
    email,
    novo,

    })
    .then(()=> res.redirect('/'))
    .catch(err => console.logo(err))
})

module.exports = router