const {Schema, model} = require('mongoose')

const FreteSchema = new Schema({
    valor: Number
})

module.exports = model('Frete', FreteSchema)