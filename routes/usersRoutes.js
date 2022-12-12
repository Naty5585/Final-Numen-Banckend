const express = require('express')
const { check } = require('express-validator')
const { validateId } = require('../middlewares/validateId')
const userRouter = express.Router()
const controller = require('../controllers/userController')
const authJWT = require('../middlewares/authJWT')
const authSession = require('../middlewares/authSession')


/* GET users listing. */
userRouter.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//GET
//ver todos
userRouter.get('/allusers', authSession, authJWT, controller.allUsers)
//ver un usuario
userRouter.get('/user/:id', authSession, authJWT, validateId, controller.user)
//logs
userRouter.get('/logs', authSession, authJWT, controller.allLogs)
//user logs
userRouter.get('/log/:id', authSession, authJWT, validateId, controller.userLogs)
//consultar cookie
userRouter.get('/cookie', controller.consultarCookie)
//consulta axios
userRouter.get('/axios', controller.consultaAxios)

//POST
//registrar
userRouter.post('/newuser', [
  check("name").not().isEmpty().withMessage("Debes ingresar un nombre"),
  check("email").not().isEmpty().withMessage("Debes ingresar un email").isEmail().withMessage("Debes ingresar un email válido"),
  check("password").not().isEmpty().withMessage("Debes ingresar una contraseña").isLength({ min: 8, max: 15 }).withMessage("La contraseña debe contener entre 8 y 15 caracteres."),
], controller.newUser)
//login
userRouter.post('/login', [
  check('email').not().isEmpty().withMessage('Debes ingresar un email').isEmail().withMessage('Debes ingresar un email válido'),
  check('password').not().isEmpty().withMessage('Debes ingresar una contraseña'),
], controller.login)

//PUT
//editar
userRouter.put('/editpassword/:id', authSession, authJWT, validateId, [
  check("password").not().isEmpty().withMessage("El campo esta vacio").isLength({ min: 8, max: 15 }).withMessage("La contraseña debe contener entre 8 y 15 caracteres."),
], controller.editPassword)

//DELETE
//borrar usuario
userRouter.delete('/delete/:id', authSession, authJWT, validateId, controller.deleteUser)
//logout
userRouter.delete('/logout', authSession, authJWT, controller.logout)


module.exports = userRouter;
