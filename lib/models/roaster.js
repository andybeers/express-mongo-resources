const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roaster = new Schema({
  name: {
    type: String,
    required: true
  },
  locations: {
    type: Int,
    default: 1
  }
});

const Roaster = mongoose.model('Roaster', roaster);

module.exports = Roaster;
