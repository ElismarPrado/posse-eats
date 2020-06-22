const {Schema, model} = require('mongoose')

const RequestSchema = new Schema({

    idplace: String,
    iduser: String,
    nomeuser: String,
    fotouser: String,
    foneuser: String,
    
    produto:[],

    end: String,
    numero: String,
    complemento: String,
    referencia: String,
    lat: String,
    lgt: String,
    total: Number,
    identregador: {
        type: String,
        default: 'null',
    },
    pagamento: {
        type: Boolean,
        default: false,
    },
    status: String,
    repasse: {
        type: Boolean,
        default: false,
    },
    frete: {
        type: Number,
        default: 0
    },
    cont1: {
        type: Number,
        default: 0
    },
    cont2: {
        type: Number,
        default: 0
    },
    createAt:{
        type: Date,
        default: Date.now,
    }, 

})

module.exports = model('Request', RequestSchema)