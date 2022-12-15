const { Product } = require('../models/products')
const { validationResult } = require('express-validator')

const controllers = {

newProduct: async (req,res) => {
    try {
      const err = validationResult(req)
      if (err.isEmpty()) {
          const item = new Product(req.body)
          await item.save();
          res.status(201).json({item})
      } else {
          res.status(501).json({err})
      }    
    } catch (error) {
      res.status(501).json({error})
    }
},

allProducts: async (req,res) => {
  const items = await Product.find()
  res.status(200).json({items})
},

viewProduct: async (req,res) => {
  const item = await Product.findById(req.params.id)
  res.status(200).json({item})
},

editProduct: async (req,res) => {
  try {
      const err = validationResult(req)
      if (err.isEmpty()) {
        await Product.findByIdAndUpdate(req.params.id, req.body)
        res.status(201).json({msg:'El producto ha sido actualizado correctamente'})
    } else {
      res.status(501).json({err})
    }    
  } catch (error) {
    res.status(501).json({error})
  }
},

deleteProduct: async (req,res) => {
  const item = await Product.findByIdAndDelete(req.params.id)
  res.status(200).json({msg:"El siguiente item fue eliminado: ", item})
},
};

module.exports = controllers