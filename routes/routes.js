'use strict'

const express = require('express');
const controlUsers = require('../controllers/users');
const controlLogin = require('../controllers/login');
const controlMenu = require('../controllers/menu');
const controlOrders = require('../controllers/orders');

const routes = express.Router();
routes.get('/user', controlUsers.list);
routes.get('/user/:id',controlUsers.userDetail);
routes.post('/user',controlUsers.create);

routes.post('/login', controlLogin.login);

routes.get('/dining',controlMenu.list);
routes.post('/dining',controlMenu.create);

routes.get('/orders',controlOrders.list);
routes.get('/orders/:id',controlOrders.orderDetail);
routes.post('/orders/:id/:status',controlOrders.changeStatus);
routes.post('/orders',controlOrders.create);

module.exports = routes
