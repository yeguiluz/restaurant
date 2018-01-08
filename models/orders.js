'use strict';

const mongoose = require('mongoose');

const Dining = require('./menu');

const OrderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true
    },
    client: {
      type: String,
      required: true,
    },
    payment: {
      type: String,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    dining: [Dining.schema]
  }
);

module.exports = mongoose.model('Order', OrderSchema,'order');
