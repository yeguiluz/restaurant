// Users controllers
'use strict';

const db = require('mongodb');
const User = require('../models/users');

function create(req, res) {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    rol: req.body.rol,
  });
  user.save()
    .then(user => res.status(200).jsonp(user))
    .catch(error => res.status(400).jsonp(error));
}
function list(req,res){
  User.find({})
    .then(usr=> res.status(200).jsonp(usr))
    .catch(error=> res.status(500).jsonp());
}

function userDetail(req,res){
  User.findById(req.params.id)
    .then(user=> {
      if (!user) return res.status(404).send();
      res.status(200).jsonp(user);
    })
    .catch(error=> res.status(400).jsonp(error));
}

module.exports= {
  create,
  list,
  userDetail
};
