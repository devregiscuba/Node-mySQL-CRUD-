const db = require("./db")

const Produto = db.sequelize.define("produtos", {
    nome: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    preco: {
        type: db.Sequelize.DOUBLE,
        allowNull: false
    },
    descricao: {
        type: db.Sequelize.TEXT,
        allowNull: false
    }
})

Produto.sync({force: false}); //forca criar a tabela somente uma VEZ, caso ela nao existe

module.exports = Produto;