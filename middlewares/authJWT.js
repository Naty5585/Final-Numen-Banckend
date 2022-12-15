const jwt = require("jsonwebtoken")
require("dotenv").config()
const { User } = require("../models/user")

module.exports = authJWT = async (req, res, next) => {
  const token = req.headers["x-token"] || req.cookies.usuarioEnSesion.token
  if (!token) {
    return res.status(401).json({msg: "No hay token en la peticion",})
  }
  try {
    const { body } = jwt.verify(token, process.env.TOKEN_SECRET)
    // Verificar el id
    const user = await User.findById(body.id)
    if (user === null) {
      return res.status(401).json({
        msg: "Este token no pertenece a este ID",
      });
    }
    next();
  } catch (error) {
    res.status(401).json({
      msg: "Token inválido",
      error,
    })
  }
};