const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.69
  },
  condition_its_condition_is_in:  {
    type: String,
  },
  category: {
    type: String,
  },

  // username: {
  //   type: String,
  //   required: true
  // }
  }
);


const Item = model('Item', itemSchema);

module.exports = Item;