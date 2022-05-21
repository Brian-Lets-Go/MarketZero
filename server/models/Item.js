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
    condition_its_condition_is_in: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Condition',
        required: true,
      }
    ],
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
      }
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;