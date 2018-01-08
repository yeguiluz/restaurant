/*Login Controller*/
'use strict'
const db = require('mongodb');
const Users = require('../models/users');

function login(req,res){
  Users.findOne({email: req.body.email},(err, user)=>{
    if (err){
      console.log('Error');
      return res.status(500).send({resp: err});
    }
    if(!user){
      console.log('No existe');
      return res.status(404).send({ resp: 'No existe el usuario' });
    }
    if (req.body.password != user.password){
      console.log('Pass Incorrecto');
      return res.status(404).send({ resp: 'Password incorrecto' });
    }
    console.log(JSON.stringify(user));
    return res.status(202).jsonp({
      success: true,
      resp: 'Sesión Iniciada',
      name: `${user.name}`,
      rol: `${user.rol}`
    });
  });
}
module.exports = {login};
