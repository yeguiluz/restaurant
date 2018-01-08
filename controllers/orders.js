// Orders controllers

'use strict';

const db = require('mongodb');
const Order = require('../models/orders');

function create(req, res) {
  const order = new Order({
    status: 'c',
    client: req.body.client,
    payment: req.body.payment,
    total: req.body.Total,
    dining: req.body.dining
  });
  order
    .save()
    .then(order => res.status(200).jsonp(order))
    .catch(error => res.status(400).jsonp(error));
}
function list(req,res){

  Order.find({status: { $ne: 't' }})
    .then(ord=> res.status(200).jsonp(ord))
    .catch(error=> res.status(500).jsonp());
}

function orderDetail(req,res){
  Order.findById(req.params.id)
    .then(order=> {
      if (!order) return res.status(404).send();
      res.status(200).jsonp(order);
    })
    .catch(error=> res.status(400).jsonp(error));
}

function changeStatus(req,res){
  Order.findByIdAndUpdate(
    req.params.id,
    { $set: { status: req.params.status} },
    { new: true }
  )
    .then(order => {
      if (!order) {
        return res.status(404).send();
      }
      res
        .status(200)
        .jsonp({ success: true });
    })
    .catch(e => {
      res.status(500).send();
    });
}

module.exports= {
  create,
  list,
  orderDetail,
  changeStatus
};
