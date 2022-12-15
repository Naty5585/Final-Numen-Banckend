const { Product } = require('../models/products')


const validateIdProduct = async (req, res, next) => {
  try {
    const item = await Product.findById(req.params.id)
    if (item!== null) {
        next()
    } else {
      res.status(404).json({msg:'El id ingresado no se encuentra en la base de datos'})
    }
  } catch (error) {
    res.status(400).json({msg:"El formato de id ingresado es inválido, revíselo y vuelva a intentarlo", error})
  }
  
}

module.exports = { validateIdProduct }