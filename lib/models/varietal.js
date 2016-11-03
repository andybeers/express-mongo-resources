const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const varietal = new Schema({
  name: {
    type: String,
    required: true
  },
  regions: {
    type: Array
  }
});

const Varietal = mongoose.model('Varietal', varietal);

module.exports = Varietal;