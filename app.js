const express = require('express');
const app = express();
const logger = require('morgan');
const cors = require('cors')
const session = require('express-session')
const cookieParser = require('cookie-parser');
require('dotenv').config()

//CONFIGURACION
app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: true,
  saveUninitialized: true
}))

//CONEXION CON BASE DE DATOS
const { conect } = require('./db/db')
conect()

//RUTAS 
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const userRouter = require('./routes/usersRoutes');
app.use('/users', userRouter);

const productRouter = require('./routes/productRoutes')
app.use('/products', productRouter)

module.exports = app;
