const {Schema, model} = require('mongoose')

const AddressSchema = new Schema({
    iduser: String,
    name: String,
    logradouro: String,
    numero: Number,
    complemento: String,
    referencia: String,
    lat: String,
    lgt: String,
    status: Boolean,
})

module.exports = model('Address', AddressSchema)