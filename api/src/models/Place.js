const {Schema, model} = require('mongoose')

const aws = require('aws-sdk');
const s3 = new aws.S3();

const PlaceSchema = new Schema({
    name: String,
    size: Number,
    key: String,
    url: String,
    
    iduser: String,
    nome: String,
    descricao: String,
    categoria: String,
    ssh1: String,
    ssh2: String,
    sh1: String,
    sh2: String,
    dh1: String,
    dh2: String,
    lat: String,
    lgt: String,
    open: {
        type: Boolean,
        default: false,
    },
    avaliacao:{
        type: Number,
        default: 5,
    },
})

PlaceSchema.pre('remove', function() {
    return s3.deleteObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: this.key,
    }).promise()
});

module.exports = model('Place', PlaceSchema)