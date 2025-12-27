const express = require("express");
const app = express();
const Produtos = require("./models/Produtos");
const bodyParser = require("body-parser");

//configuracao body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/cadastro", function (req, res) {
    Produtos.create({
        nome: req.body.nome,
        preco: req.body.preco,
        descricao: req.body.descricao,
    }).then(function () {
        res.send("cadastrado com sucesso");
    }).catch(function (erro) {
        res.send("houver um erro ao cadastrar", erro)
    });
});

app.get("/", function (req, res) {
    Produtos.findAll().then(function (data) {
        res.send(data)
    }).catch(function (erro) {
        res.send("Erro ao buscar os produtos", erro);
    })
});

app.patch("/atualizar/:id", function (req, res) {
    Produtos.update({
        nome: req.body.nome,
        preco: req.body.preco,
        descricao: req.body.descricao
    },
        { where: { "id": req.params.id } }
    ).then(function () {
        res.send("Sucesso ao atualizar os dados do produto")
    }).catch(function (erro) {
        res.send("Erro ao atualizar o produto")
    })
});

app.delete("/deletar/:id", function (req, res) {
    Produtos.destroy({ where: { "id": req.params.id } }).then(function () {
        res.send("Produto deletado com sucesso")
    }).catch(function (erro) {
        res.send("erro ao deletar o produto")
    })
});

app.get("/:nome", function (req, res) {
    Produtos.findAll({ where: { "nome": req.params.nome } }).then(function (produto) {
        res.send(produto)
    }).catch(function (erro) {
        res.send("Produto nao existe na base ou Erro ao relaizar a consulta")
    })
})

const PORT = process.env.PORT || 8081;

app.listen(PORT, "0.0.0.0", function () {
    console.log('servidor rodando...');
});