'use strict';

const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Menu', MenuSchema,'menu');
