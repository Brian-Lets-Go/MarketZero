const commentSchema = require('./Comment');
const { Schema, model } = require('mongoose');

const itemSchema = new Schema(
  {
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
    username: {
      type: String,
      required: true
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
    comments: [commentSchema]
},
{
  toJSON: {
    getters: true
  }
}
);

itemSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

const Item = model('Item', itemSchema);

module.exports = Item;