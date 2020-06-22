const {Schema, model} = require('mongoose')

const CartSchema = new Schema({
    idplace: String,
    nomeplace: String,
    fotoplace: String,
    foneplace: String,
    iduser: String,
    foto: String,
    nome: String,
    descricao: String,
    categoria: String,
    valor: Number,
    quantidade: Number,
    observacao: String,
    opcao1: String,
    opcao2: String,
    opcao3: String,
})

module.exports = model('Cart', CartSchema)