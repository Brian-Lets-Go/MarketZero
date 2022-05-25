const mongoose = require('mongoose');

const { Schema } = mongoose;

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.69
  },
  condition_its_condition_is_in:  {
    type: String,
    // required: true
    },
  category:
    {
      type: String,
      // required: true
    },
  comments:
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    },
    user:
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;