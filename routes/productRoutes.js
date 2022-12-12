const express = require('express');
const productRouter = express.Router()
const controller = require('../controllers/productsControllers')
const { validateId } = require('../middlewares/validateId')
const { check } = require('express-validator')

//GET
productRouter.get('/list', controller.allProducts)
productRouter.get('/view/:id', validateId, controller.viewProduct)

//POST
productRouter.post('/new', [
  check('marca').not().isEmpty().withMessage('El campo marca es obligatorio'),
  check('modelo').not().isEmpty().withMessage('El campo modelo es obligatorio').isLength({min:2, max:17}).withMessage('El campo debe tener mas de 2 letras y menos de 17'),
  check('pantalla').not().isEmpty().withMessage('El campo pantalla es obligatorio'),
  check('sistema').not().isEmpty().withMessage('El campo sistema es obligatorio'),
  check('memoria').not().isEmpty().withMessage('El campo memoria es obligatorio'),
  check('camara').not().isEmpty().withMessage('El campo camara es obligatorio'),
  check('procesador').not().isEmpty().withMessage('El campo procesador es obligatorio'),
  check('flash').not().isEmpty().withMessage('El campo flash es obligatorio'),
  check('precio').not().isEmpty().withMessage('El campo precio es obligatorio'),
  check('stock').not().isEmpty().withMessage('El campo stock es obligatorio'),
  check('liberado').not().isEmpty().withMessage('El campo liberado es obligatorio')
], controller.newProduct)

//PUT
productRouter.put('/edit/:id', validateId, [
  check('marca').not().isEmpty().withMessage('El campo marca es obligatorio'),
  check('modelo').not().isEmpty().withMessage('El campo modelo es obligatorio').isLength({min:2, max:17}).withMessage('El campo debe tener mas de 2 letras y menos de 17'),
  check('pantalla').not().isEmpty().withMessage('El campo pantalla es obligatorio'),
  check('sistema').not().isEmpty().withMessage('El campo sistema es obligatorio'),
  check('memoria').not().isEmpty().withMessage('El campo memoria es obligatorio'),
  check('camara').not().isEmpty().withMessage('El campo camara es obligatorio'),
  check('procesador').not().isEmpty().withMessage('El campo procesador es obligatorio'),
  check('flash').not().isEmpty().withMessage('El campo flash es obligatorio'),
  check('precio').not().isEmpty().withMessage('El campo precio es obligatorio'),
  check('stock').not().isEmpty().withMessage('El campo stock es obligatorio'),
  check('liberado').not().isEmpty().withMessage('El campo liberado es obligatorio')
], controller.editProduct)

//DELETE
productRouter.delete('/delete/:id', validateId, controller.deleteProduct)

module.exports = productRouter