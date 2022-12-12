const mongoose = require('mongoose')


const Schema = mongoose.Schema
const productSchema = new Schema({
  marca:{
    type: String,
    required: true
  },
  modelo:{
    type: String,
    required: true
  },
  pantalla:{
    type: Number,
    required: true
  },
  sistema:{
    type: String,
    required: true
  },
  memoria:{
    type: String,
    required: true
  },
  camara:{
    type: String,
    required: true
  },
  procesador:{
    type: String,
    required: true
  },
  flash:{
    type: Boolean,
    required: true
  },
  precio:{
    type: Number,
    required: true
  },
  stock:{
    type: Number,
    required: true
  },
  liberado:{
    type: Boolean,
    required: true
  },
})

const Product = mongoose.model('Product', productSchema)
module.exports = { Product }