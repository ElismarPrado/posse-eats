const {Schema, model} = require('mongoose')

const aws = require('aws-sdk');
const s3 = new aws.S3();

const ProductSchema = new Schema({
    name: String,
    size: Number,
    key: String,
    url: String,

    idplace: String,
    nomeplace: String,
    fotoplace: String,
    foto: String,
    nome: String,
    descricao: String,
    categoria: String,
    valor: Number,
    posicao: {
        type: Number,
        default: 3,
    },
    opcao1: String,
    opcao2: String,
    opcao3: String,
});

ProductSchema.pre('remove', function() {
    return s3.deleteObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: this.key,
    }).promise()
});

module.exports = model('Product', ProductSchema)