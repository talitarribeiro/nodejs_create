const express = require("express")
const app = express()
const handlebars = require ("express-handlebars").engine
const bodyParser = require("body-parser")
const post = require("./models/post")

app.engine("handlebars", handlebars ({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({extend: false}))
app.set(bodyParser.json())



app.get ("/", function(req, res){
    res.render("primeira_pagina")
})

app.post("/cadastrar", function(req,res){
    post.create({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_cadastro: req.body.data_cadastro,
        observacao: req.body.observacao
    }).then(function(){
        res.redirect("/")
    }).catch(function(erro){
        res.send("Falha ao cadastrar: " + erro)
    })
})

app.get("/consulta", function(req, res){
    post.findAll().then(function(post){
        res.render("consulta",{post})
    }).catch(function(erro){
        console.log("Erro ao carregar dados do banco: " + erro)
    })
})



app.listen(8081, function(){
    console.log("Servidor ativo!")
})
