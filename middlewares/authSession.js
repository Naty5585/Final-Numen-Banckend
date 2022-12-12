module.exports = (req, res, next) => {
  if (!req.session.usuario) {
    res.json({msg:'no estas en sesion'})
  } else {
    next()
  }
}