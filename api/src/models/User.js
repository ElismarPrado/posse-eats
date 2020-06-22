const {Schema, model} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const UserSchema = new Schema({
    foto: String,
    name: String,
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    fone: String,
    password:{
        type: String,
        required: true,
        select: false,
    },
    createAt:{
        type: Date,
        default: Date.now,
    }, 
    type: String,
    status:{
        type: Boolean,
        default: true,
    },
    operation:{
        type: Boolean,
        default: false,
    },
})

UserSchema.plugin(mongoosePaginate)
module.exports = model('User', UserSchema)