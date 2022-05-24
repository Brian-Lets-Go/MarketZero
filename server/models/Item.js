const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const dateFormat = require('../utils/dateFormat');

const itemSchema = new Schema({
  // name: {
  //   type: String,
  //   required: true,
  //   trim: true
  // },
  description: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => dateFormat(timestamp)
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
  comments: [commentSchema]
},
  {
    toJSON: {
      getters: true
    }
  }
);

itemSchema.virtual('commentCount').get(function()
{
  return this.comments.length;
});

const Item = model('Item', itemSchema);

module.exports = Item;