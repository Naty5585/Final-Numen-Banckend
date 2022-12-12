const mongoose = require('mongoose')

const Schema = mongoose.Schema
const schema = new Schema ({
  name:{
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  }
},
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', schema)
module.exports = { User }