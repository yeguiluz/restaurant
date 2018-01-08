'use strict';
const db= require('mongodb');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');
const routes = require('./routes/routes');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use(routes);
mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://admin:restaurant@ds245287.mlab.com:45287/rest_project' ) // mongodb://localhost:27017/restaurant
        .then(()=> console.log('Conexión a BD exitosa'))
        .catch(error=> console.error('Conexión fallida'));

app.listen(8080,() =>
    console.log('Servidor local activo'));
module.exports = app;
