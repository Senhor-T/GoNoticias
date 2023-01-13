let mongoose = require('mongoose')
let Schema = mongoose.Schema

let usersSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name:{
        type: String,
        maxLength: 46,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    admin:{
        type: String
    },
    image: {
        type: String,
        default: '1672159938758.webp'
      },
    eAdmin:{
        type:Boolean,
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        deafult: Date.now
    }
},{collection:'Users'}) 

let Users = mongoose.model('Users',usersSchema)

module.exports = Users