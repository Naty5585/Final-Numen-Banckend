const { User } = require('../models/user')
const { Log } = require('../models/logs')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const generateJWT = require('../helpers/generateJWT')
const axios = require('axios')

const controllers = {
//REGISTRO NUEVO USUARIO
newUser: async (req, res) => {
  try {
    const error = validationResult(req)
    if (error.isEmpty()) {
      // Validar emai
      const isEmailExist = await User.findOne({ email: req.body.email })
      if (isEmailExist) {
        return res.status(400).json({ error: "El email ya está registrado" })
      }
      // Encriptar contraseña
      let salt = bcrypt.genSaltSync(10)
      const saveUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt)
      })
      await saveUser.save()
      res.status(201).json(saveUser)
    } else {
      res.status(501).json(error)
    }
  } catch (err) {
    res.status(501).json({msg: "Registro inválido, intente más tarde", err})
  }
},
//VER USUARIOS
allUsers: async (req, res) => {
  const users = await User.find()
  res.status(200).json({ users })
},
//VER USUARIO DETERMINADO
user: async (req, res) => {
  const user = await User.findById(req.params.id)
  res.status(200).json({ user })
},
//EDITAR CONTRASEÑA
editPassword: async (req,res) => {
  try {
    const error = validationResult(req)
    if (error.isEmpty()) {
      const {id} = req.params;

      let salt = bcrypt.genSaltSync(10)
      let newPassword = bcrypt.hashSync(req.body.password, salt)

      await User.findByIdAndUpdate(id, {password: newPassword})
      res.status(202).json({msg: 'La contraseña se actualizó correctamente'})
    } else {
      res.status(501).json(error)
    }
  } catch (error) {
    res.status(501).json({msg: 'Error al intentar actualizar la contraseña', error})
  }
},
//BORRAR USUARIO
deleteUser: async (req, res) => {
try {
  const user = await User.findByIdAndDelete(req.params.id)
  res.status(202).json({msg: 'Se ha eliminado el siguiente usuario', user})
} catch (error) {
  res.status(400).json({msg: 'No se ha podido eliminar la informacion'})
}
},
//LOGIN
login: async (req, res) => {
  const error = validationResult(req)
  if (error.isEmpty()) {
    const usuario = await User.findOne({ email: req.body.email })
    // Validaciones
    if(usuario == null) {
      res.status(401).json({ msg: "El email o la contraseña son incorrectos" })
    }
    if(!bcrypt.compareSync(req.body.password, usuario.password)){
      res.status(401).json({ msg: "El email o la contraseña son incorrectos" })
    }
    // Token
    const token = await generateJWT({
      id: usuario._id,
      name: usuario.name,
    })

    const userSession = {
      _id: usuario._id,
      name: usuario.name,
      email: usuario.email,
      token: token,
    }
    //Guardar sesion
    req.session.usuario = userSession
    if(req.body.remember) {
      //COOKIE 
      res.cookie('usuarioEnSesion', userSession, {maxAge: 60000 * 60 * 24 * 60})
    }
    // Guardar historial de login
    const saveLogs = new Log({
      type: 'login',
      userId: usuario._id,
      email: usuario.email,
    })
    await saveLogs.save()
    res.status(201).json({ userSession, log: true, msg: "Usuario logueado" })
  } else {
    res.status(501).json(error)
  }
},
//LOGOUT
logout: async (req, res) => {
  //historial de login
  const usuario = req.cookies.usuarioEnSesion
  const saveLogs = new Log({
    type: 'logout',
    userId: usuario._id,
    email: usuario.email,
  })
  await saveLogs.save()
  res.clearCookie("usuarioEnSesion")
  req.session.destroy()
  res.status(200).json({ log: false, msg: "Sesión cerrada" })
},
//CONSULTAR COOKIE
consultarCookie: async (req, res) => {
  try {
    res.status(200).json(req.cookies.usuarioEnSesion)
  } catch (error) {
    res.status(204).json({ msg: "No hay cookies guardadas", error })
  }
},
//INFORMACION DE LOGS
allLogs: async (req, res) => {
  const logs = await Log.find()
  res.status(200).json({ logs })
},
//INFORMACION DE LOGS DE UN USUARIO PARTICULAR
userLogs: async (req, res) => {
  const userLogs = await Log.find({ userId: req.params.id })
  res.status(200).json({ userLogs })
},
//CONSULTA AXIOS 
consultaAxios: async (req, res) => {
  try {
    const respuesta = await axios.get ("https://pokeapi.co/api/v2/pokemon/"+ req.params.name, { timeout: 60000})
      res.json({status: respuesta.status, data: respuesta.data})
  } catch (error) {
    res.json({status: error.response.status, data: error.response.data})
  }
}
}

module.exports = controllers