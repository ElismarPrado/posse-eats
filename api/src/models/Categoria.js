const {Schema, model} = require('mongoose')

const CategoriaSchema = new Schema({
    categoria: Number,
    image: String,
    name: String,
})

module.exports = model('Categoria', CategoriaSchema)