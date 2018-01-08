'use strict';

const Menu = require('../models/menu');

function create(req, res) {
  const dining = new Menu({
    name: req.body.name,
    price: req.body.price
  });

  dining
    .save()
    .then(dining => res.status(200).jsonp(dining))
    .catch(error => res.status(400).jsonp(error));
}

function list(req,res){
  Menu.find().then(dish=> res.status(200).jsonp(dish))
  .catch(error => res.status(500).jsonp());
}

module.exports = {
  create,
  list
};
