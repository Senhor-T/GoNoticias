let mongoose = require('mongoose')
let Schema = mongoose.Schema
const shortid = require('shortid');

let postSchema = new Schema({
    _id: Schema.Types.ObjectId,
    shortid:{
        'type': String,
  'default': shortid.generate
    },
    titulo:{
        type: String,
        required: true
    },
    conteudo:{
        type: String,
        required: true
    },
    views:{
        type: Number,
    },
    image:{
        type: String,
        required: true
    },
    slug:{
        type:String,
        required: true
    },
    genero:Object,     
    user: Object,
    createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
},{collection:'Posts'})

let Posts = mongoose.model('Posts', postSchema)

module.exports = Posts